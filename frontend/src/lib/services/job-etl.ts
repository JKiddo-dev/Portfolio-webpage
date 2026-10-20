import { embed, generateObject } from "ai";
import { google } from "@ai-sdk/google";
import type { AnyBulkWriteOperation } from "mongodb";
import {
  ensureDatabaseIndexes,
  getMarketJobsCollection,
} from "@/lib/mongodb";
import {
  EMBEDDING_DIMENSIONS,
  ETL_MAX_BATCH_SIZE,
  GetOnBoardApiResponseSchema,
  type GetOnBoardJobItem,
  JobLLMExtractionSchema,
  type JobLLMExtraction,
  MarketJobDocumentSchema,
  type MarketJobDocument,
  MAX_CLEAN_SUMMARY_LENGTH,
  normalizeTechArray,
} from "@/lib/schemas/job-market";

const GETONBOARD_PROGRAMMING_JOBS_URL =
  'https://www.getonbrd.com/api/v0/categories/programming/jobs?per_page=15&expand=["company"]';

const HTML_ENTITY_MAP: Readonly<Record<string, string>> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&ndash;": "-",
  "&mdash;": "-",
  "&bull;": " ",
  "&rsquo;": "'",
  "&lsquo;": "'",
  "&ldquo;": '"',
  "&rdquo;": '"',
};

export interface EtlFailureDetail {
  externalId: string;
  reason: string;
}

export interface EtlExecutionReport {
  fetchedCount: number;
  alreadyExistingCount: number;
  attemptedCount: number;
  persistedCount: number;
  failedCount: number;
  processedExternalIds: string[];
  failures: EtlFailureDetail[];
  durationMs: number;
  executedAt: string;
}

export function stripHtmlAndNormalizeText(
  rawHtml: string | null | undefined
): string {
  if (!rawHtml) {
    return "";
  }

  const withoutScriptsOrStyles = rawHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ");

  const withBlockSpacing = withoutScriptsOrStyles.replace(
    /<\/?(?:p|div|br|li|ul|ol|h[1-6]|tr|td|section|article|header|footer|blockquote)\b[^>]*>/gi,
    " "
  );

  const withoutTags = withBlockSpacing.replace(/<[^>]+>/g, " ");

  const decodedNamedEntities = withoutTags.replace(
    /&(?:nbsp|amp|lt|gt|quot|#39|apos|ndash|mdash|bull|rsquo|lsquo|ldquo|rdquo);/gi,
    (match) => HTML_ENTITY_MAP[match.toLowerCase()] ?? " "
  );

  const decodedNumericEntities = decodedNamedEntities
    .replace(/&#(\d+);/g, (_, dec: string) => {
      const code = Number.parseInt(dec, 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : " ";
    })
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => {
      const code = Number.parseInt(hex, 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : " ";
    });

  return decodedNumericEntities.replace(/\s+/g, " ").trim();
}

export function extractCompanyName(job: GetOnBoardJobItem): string {
  const companyField = job.attributes.company;
  if (typeof companyField === "string" && companyField.trim().length > 0) {
    return companyField.trim();
  }
  if (companyField && typeof companyField === "object") {
    const expandedName = companyField.data?.attributes?.name?.trim();
    if (expandedName && expandedName.length > 0) {
      return expandedName;
    }
  }
  return "Confidential Company";
}

export function resolveJobUrl(job: GetOnBoardJobItem): string {
  const publicUrl = job.links?.public_url?.trim();
  if (publicUrl) {
    return publicUrl;
  }
  return `https://www.getonbrd.com/jobs/${encodeURIComponent(job.id)}`;
}

export function resolvePublishedDate(
  publishedAtEpochSeconds: number | null | undefined
): Date {
  if (
    typeof publishedAtEpochSeconds === "number" &&
    Number.isFinite(publishedAtEpochSeconds) &&
    publishedAtEpochSeconds > 0
  ) {
    return new Date(publishedAtEpochSeconds * 1000);
  }
  return new Date();
}

export function resolveSeniorityHint(job: GetOnBoardJobItem): string {
  const seniorityField = job.attributes.seniority;
  if (typeof seniorityField === "string") {
    return seniorityField.trim();
  }
  if (seniorityField && typeof seniorityField === "object") {
    return seniorityField.data?.attributes?.name?.trim() ?? "";
  }
  return "";
}

export function resolveModalityHint(job: GetOnBoardJobItem): string {
  const remoteModality = job.attributes.remote_modality?.trim();
  if (remoteModality) {
    return remoteModality;
  }
  if (job.attributes.remote === true) {
    return "remote";
  }
  if (job.attributes.remote === false) {
    return "onsite";
  }
  return "";
}

export function buildCleanedJobCorpus(job: GetOnBoardJobItem): string {
  const sections = [
    stripHtmlAndNormalizeText(job.attributes.description),
    stripHtmlAndNormalizeText(job.attributes.functions),
    stripHtmlAndNormalizeText(job.attributes.desirable),
  ].filter((section) => section.length > 0);

  return sections.join(" | ").slice(0, 6000);
}

export function buildEmbeddingInput(params: {
  title: string;
  coreTechStack: readonly string[];
  architecturePatterns: readonly string[];
  cleanSummary: string;
}): string {
  const normalizedTech = normalizeTechArray(params.coreTechStack);
  const normalizedPatterns = normalizeTechArray(params.architecturePatterns);

  return [
    `Role: ${params.title.trim()}`,
    `Core Tech Stack: ${normalizedTech.join(", ")}`,
    `Architecture Patterns: ${normalizedPatterns.join(", ")}`,
    `Technical Summary: ${params.cleanSummary.trim()}`,
  ].join("\n");
}

export function filterNewJobsForBatch(
  jobs: readonly GetOnBoardJobItem[],
  existingExternalIds: ReadonlySet<string>,
  maxBatchSize: number = ETL_MAX_BATCH_SIZE
): GetOnBoardJobItem[] {
  const seenInBatch = new Set<string>();
  const filtered: GetOnBoardJobItem[] = [];

  for (const job of jobs) {
    const id = job.id.trim();
    if (!id || existingExternalIds.has(id) || seenInBatch.has(id)) {
      continue;
    }
    seenInBatch.add(id);
    filtered.push(job);
    if (filtered.length >= maxBatchSize) {
      break;
    }
  }

  return filtered;
}

export async function fetchGetOnBoardJobs(): Promise<GetOnBoardJobItem[]> {
  const response = await fetch(GETONBOARD_PROGRAMMING_JOBS_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `GetOnBoard API error: HTTP ${response.status} ${response.statusText}`
    );
  }

  const rawPayload: unknown = await response.json();
  const parsed = GetOnBoardApiResponseSchema.parse(rawPayload);
  return parsed.data;
}

export async function extractJobEntitiesWithGemini(params: {
  title: string;
  company: string;
  cleanCorpus: string;
  modalityHint: string;
  seniorityHint: string;
}): Promise<JobLLMExtraction> {
  const { object } = await generateObject({
    model: google("gemini-2.5-flash"),
    schema: JobLLMExtractionSchema,
    temperature: 0.1,
    prompt: [
      "Eres un Principal Data Engineer especializado en extracción de entidades técnicas de ofertas de ingeniería de software.",
      "Analiza la siguiente oferta laboral y devuelve únicamente el objeto estructurado requerido.",
      "Reglas estrictas:",
      "1. Normaliza todos los nombres de tecnologías en minúsculas y sin puntuación superflua (ejemplo: 'Next.JS' -> 'nextjs', 'Nest.js' -> 'nestjs', 'Node.js' -> 'nodejs', 'TypeScript' -> 'typescript', 'MongoDB' -> 'mongodb', 'CI/CD' -> 'ci-cd').",
      "2. En architecturePatterns incluye únicamente patrones arquitectónicos o prácticas de ingeniería detectables (ejemplo: 'microservices', 'bff', 'event-driven', 'rest-api', 'graphql', 'clean-architecture', 'hexagonal-architecture', 'ci-cd', 'tdd', 'ddd', 'serverless').",
      `3. cleanSummary debe ser un resumen técnico denso en español o inglés de máximo ${MAX_CLEAN_SUMMARY_LENGTH} caracteres, enfocado en stack, arquitectura y responsabilidades clave para búsqueda vectorial.`,
      "",
      `Título: ${params.title}`,
      `Empresa: ${params.company}`,
      `Pista de modalidad en API: ${params.modalityHint || "no especificada"}`,
      `Pista de seniority en API: ${params.seniorityHint || "no especificada"}`,
      `Contenido limpio de la oferta: ${params.cleanCorpus || params.title}`,
    ].join("\n"),
  });

  const normalizedSummary =
    object.extractedData.cleanSummary.length > MAX_CLEAN_SUMMARY_LENGTH
      ? object.extractedData.cleanSummary
          .slice(0, MAX_CLEAN_SUMMARY_LENGTH - 3)
          .trimEnd() + "..."
      : object.extractedData.cleanSummary;

  return JobLLMExtractionSchema.parse({
    ...object,
    extractedData: {
      ...object.extractedData,
      coreTechStack: normalizeTechArray(object.extractedData.coreTechStack),
      architecturePatterns: normalizeTechArray(
        object.extractedData.architecturePatterns
      ),
      cleanSummary: normalizedSummary,
    },
  });
}

export async function generateJobEmbeddingVector(
  textToEmbed: string
): Promise<number[]> {
  const { embedding } = await embed({
    model: google.embedding("text-embedding-004"),
    value: textToEmbed,
    providerOptions: {
      google: {
        outputDimensionality: EMBEDDING_DIMENSIONS,
        taskType: "RETRIEVAL_DOCUMENT",
      },
    },
  });

  return embedding;
}

export async function transformJobItemToDocument(
  job: GetOnBoardJobItem
): Promise<MarketJobDocument> {
  const title = stripHtmlAndNormalizeText(job.attributes.title);
  const company = extractCompanyName(job);
  const cleanCorpus = buildCleanedJobCorpus(job);
  const modalityHint = resolveModalityHint(job);
  const seniorityHint = resolveSeniorityHint(job);

  const llmExtraction = await extractJobEntitiesWithGemini({
    title,
    company,
    cleanCorpus,
    modalityHint,
    seniorityHint,
  });

  const embeddingInput = buildEmbeddingInput({
    title,
    coreTechStack: llmExtraction.extractedData.coreTechStack,
    architecturePatterns: llmExtraction.extractedData.architecturePatterns,
    cleanSummary: llmExtraction.extractedData.cleanSummary,
  });

  const embedding = await generateJobEmbeddingVector(embeddingInput);

  return MarketJobDocumentSchema.parse({
    externalId: job.id.trim(),
    title,
    company,
    publishedAt: resolvePublishedDate(job.attributes.published_at),
    url: resolveJobUrl(job),
    modality: llmExtraction.modality,
    seniority: llmExtraction.seniority,
    extractedData: llmExtraction.extractedData,
    embedding,
    ingestedAt: new Date(),
  });
}

export async function runMarketJobsEtlPipeline(): Promise<EtlExecutionReport> {
  const startedAt = Date.now();

  await ensureDatabaseIndexes();

  const fetchedJobs = await fetchGetOnBoardJobs();
  const candidateIds = fetchedJobs.map((job) => job.id.trim()).filter(Boolean);

  const jobsCollection = await getMarketJobsCollection();
  const existingDocs = await jobsCollection
    .find(
      { externalId: { $in: candidateIds } },
      { projection: { externalId: 1, _id: 0 } }
    )
    .toArray();

  const existingIdsSet = new Set<string>(
    existingDocs.map((doc) => doc.externalId)
  );

  const jobsToProcess = filterNewJobsForBatch(
    fetchedJobs,
    existingIdsSet,
    ETL_MAX_BATCH_SIZE
  );

  if (jobsToProcess.length === 0) {
    return {
      fetchedCount: fetchedJobs.length,
      alreadyExistingCount: existingIdsSet.size,
      attemptedCount: 0,
      persistedCount: 0,
      failedCount: 0,
      processedExternalIds: [],
      failures: [],
      durationMs: Date.now() - startedAt,
      executedAt: new Date().toISOString(),
    };
  }

  const settlementResults = await Promise.allSettled(
    jobsToProcess.map((job) => transformJobItemToDocument(job))
  );

  const validDocuments: MarketJobDocument[] = [];
  const failures: EtlFailureDetail[] = [];

  settlementResults.forEach((result, index) => {
    const sourceJob = jobsToProcess[index];
    if (result.status === "fulfilled") {
      validDocuments.push(result.value);
    } else {
      const errorMessage =
        result.reason instanceof Error
          ? result.reason.message
          : String(result.reason);
      failures.push({
        externalId: sourceJob?.id ?? "unknown",
        reason: errorMessage,
      });
    }
  });

  let persistedCount = 0;

  if (validDocuments.length > 0) {
    const bulkOperations: AnyBulkWriteOperation<MarketJobDocument>[] =
      validDocuments.map((doc) => ({
        updateOne: {
          filter: { externalId: doc.externalId },
          update: { $set: doc },
          upsert: true,
        },
      }));

    const bulkResult = await jobsCollection.bulkWrite(bulkOperations, {
      ordered: false,
    });

    persistedCount = bulkResult.upsertedCount + bulkResult.modifiedCount;
  }

  return {
    fetchedCount: fetchedJobs.length,
    alreadyExistingCount: existingIdsSet.size,
    attemptedCount: jobsToProcess.length,
    persistedCount,
    failedCount: failures.length,
    processedExternalIds: validDocuments.map((doc) => doc.externalId),
    failures,
    durationMs: Date.now() - startedAt,
    executedAt: new Date().toISOString(),
  };
}
