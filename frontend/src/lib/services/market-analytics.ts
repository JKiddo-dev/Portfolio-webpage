import { embed, generateObject } from "ai";
import { google } from "@ai-sdk/google";
import type { Document } from "mongodb";
import {
  getMarketJobsCollection,
  VECTOR_SEARCH_INDEX_NAME,
} from "@/lib/mongodb";
import {
  EMBEDDING_DIMENSIONS,
  GapAnalysisLLMOutputSchema,
  type GapAnalysisLLMOutput,
  GapAnalysisResponseSchema,
  type GapAnalysisResponse,
  JobModalitySchema,
  JobSenioritySchema,
  MarketStatsResponseSchema,
  type MarketStatsResponse,
  MatchedJobEvidenceSchema,
  type MatchedJobEvidence,
  normalizeTechArray,
  type PresetProfileId,
  RATE_LIMIT_MAX_REQUESTS_PER_HOUR,
  VECTOR_SEARCH_LIMIT,
} from "@/lib/schemas/job-market";
import {
  consumeRateLimitQuota,
  getCachedPresetResult,
  hashClientIp,
  setCachedPresetResult,
} from "@/lib/services/rate-limit";

interface OverviewFacetRow {
  totalJobs: number;
  lastIngestedAt: Date | null;
  englishRequiredCount: number;
}

interface CountBucketRow {
  _id: string | null;
  count: number;
}

interface MarketFacetAggregationResult {
  overview: OverviewFacetRow[];
  topTechnologies: CountBucketRow[];
  topArchitecturePatterns: CountBucketRow[];
  seniorityDistribution: CountBucketRow[];
  modalityDistribution: CountBucketRow[];
}

interface VectorSearchProjectionRow {
  externalId: string;
  title: string;
  company: string;
  url: string;
  modality: string;
  seniority: string;
  extractedData: {
    coreTechStack: string[];
    architecturePatterns: string[];
    cleanSummary: string;
  };
  score: number;
}

function calculatePercentage(count: number, total: number): number {
  if (total <= 0 || count <= 0) {
    return 0;
  }
  return Math.min(100, Math.round((count / total) * 1000) / 10);
}

export function computeCosineSimilarity(
  vecA: readonly number[],
  vecB: readonly number[]
): number {
  if (vecA.length === 0 || vecA.length !== vecB.length) {
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    const a = vecA[i] ?? 0;
    const b = vecB[i] ?? 0;
    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) {
    return 0;
  }

  return dotProduct / denominator;
}

export async function getMarketAnalyticsStats(): Promise<MarketStatsResponse> {
  const startTime = Date.now();
  const jobsCollection = await getMarketJobsCollection();

  const pipeline: Document[] = [
    {
      $facet: {
        overview: [
          {
            $group: {
              _id: null,
              totalJobs: { $sum: 1 },
              lastIngestedAt: { $max: "$ingestedAt" },
              englishRequiredCount: {
                $sum: {
                  $cond: [
                    { $eq: ["$extractedData.englishRequired", true] },
                    1,
                    0,
                  ],
                },
              },
            },
          },
        ],
        topTechnologies: [
          { $unwind: "$extractedData.coreTechStack" },
          {
            $group: {
              _id: "$extractedData.coreTechStack",
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1, _id: 1 } },
          { $limit: 10 },
        ],
        topArchitecturePatterns: [
          { $unwind: "$extractedData.architecturePatterns" },
          {
            $group: {
              _id: "$extractedData.architecturePatterns",
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1, _id: 1 } },
          { $limit: 8 },
        ],
        seniorityDistribution: [
          {
            $group: {
              _id: "$seniority",
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1, _id: 1 } },
        ],
        modalityDistribution: [
          {
            $group: {
              _id: "$modality",
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1, _id: 1 } },
        ],
      },
    },
  ];

  const [facetResult] = await jobsCollection
    .aggregate<MarketFacetAggregationResult>(pipeline)
    .toArray();

  const overview = facetResult?.overview?.[0];
  const totalVectorizedJobs = overview?.totalJobs ?? 0;
  const lastIngestedAt =
    overview?.lastIngestedAt instanceof Date
      ? overview.lastIngestedAt.toISOString()
      : null;
  const englishRequiredCount = overview?.englishRequiredCount ?? 0;

  const topTechnologies = (facetResult?.topTechnologies ?? [])
    .filter((item): item is { _id: string; count: number } =>
      Boolean(item._id && item._id.trim().length > 0)
    )
    .map((item) => ({
      name: item._id,
      count: item.count,
      percentage: calculatePercentage(item.count, totalVectorizedJobs),
    }));

  const topArchitecturePatterns = (
    facetResult?.topArchitecturePatterns ?? []
  )
    .filter((item): item is { _id: string; count: number } =>
      Boolean(item._id && item._id.trim().length > 0)
    )
    .map((item) => ({
      name: item._id,
      count: item.count,
      percentage: calculatePercentage(item.count, totalVectorizedJobs),
    }));

  const seniorityDistribution = (facetResult?.seniorityDistribution ?? []).map(
    (item) => {
      const parsedSeniority = JobSenioritySchema.safeParse(item._id);
      return {
        seniority: parsedSeniority.success
          ? parsedSeniority.data
          : ("unknown" as const),
        count: item.count,
        percentage: calculatePercentage(item.count, totalVectorizedJobs),
      };
    }
  );

  const modalityDistribution = (facetResult?.modalityDistribution ?? []).map(
    (item) => {
      const parsedModality = JobModalitySchema.safeParse(item._id);
      return {
        modality: parsedModality.success
          ? parsedModality.data
          : ("unknown" as const),
        count: item.count,
        percentage: calculatePercentage(item.count, totalVectorizedJobs),
      };
    }
  );

  return MarketStatsResponseSchema.parse({
    totalVectorizedJobs,
    lastIngestedAt,
    queryLatencyMs: Date.now() - startTime,
    topTechnologies,
    topArchitecturePatterns,
    seniorityDistribution,
    modalityDistribution,
    englishRequiredPercentage: calculatePercentage(
      englishRequiredCount,
      totalVectorizedJobs
    ),
  });
}

export async function embedCandidateProfile(
  profileText: string
): Promise<number[]> {
  const { embedding } = await embed({
    model: google.embedding("text-embedding-004"),
    value: profileText.trim(),
    providerOptions: {
      google: {
        outputDimensionality: EMBEDDING_DIMENSIONS,
        taskType: "RETRIEVAL_QUERY",
      },
    },
  });

  return embedding;
}

export async function findTopMatchingJobsByVector(
  queryVector: number[],
  limit: number = VECTOR_SEARCH_LIMIT
): Promise<MatchedJobEvidence[]> {
  const jobsCollection = await getMarketJobsCollection();

  try {
    const vectorPipeline: Document[] = [
      {
        $vectorSearch: {
          index: VECTOR_SEARCH_INDEX_NAME,
          path: "embedding",
          queryVector,
          numCandidates: Math.max(limit * 8, 64),
          limit,
        },
      },
      {
        $project: {
          _id: 0,
          externalId: 1,
          title: 1,
          company: 1,
          url: 1,
          modality: 1,
          seniority: 1,
          extractedData: {
            coreTechStack: 1,
            architecturePatterns: 1,
            cleanSummary: 1,
          },
          score: { $meta: "vectorSearchScore" },
        },
      },
    ];

    const vectorResults = await jobsCollection
      .aggregate<VectorSearchProjectionRow>(vectorPipeline)
      .toArray();

    if (vectorResults.length > 0) {
      return vectorResults.map((row) =>
        MatchedJobEvidenceSchema.parse({
          externalId: row.externalId,
          title: row.title,
          company: row.company,
          similarityScore: Math.round(
            Math.max(0, Math.min(1, row.score ?? 0)) * 100
          ),
          url: row.url,
          modality: JobModalitySchema.catch("unknown").parse(row.modality),
          seniority: JobSenioritySchema.catch("unknown").parse(row.seniority),
          coreTechStack: row.extractedData?.coreTechStack ?? [],
          architecturePatterns: row.extractedData?.architecturePatterns ?? [],
        })
      );
    }
  } catch (vectorError: unknown) {
    void vectorError;
  }

  const candidateDocs = await jobsCollection
    .find({})
    .sort({ ingestedAt: -1 })
    .limit(100)
    .toArray();

  const scoredDocs = candidateDocs
    .map((doc) => ({
      doc,
      similarity: computeCosineSimilarity(queryVector, doc.embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);

  return scoredDocs.map(({ doc, similarity }) =>
    MatchedJobEvidenceSchema.parse({
      externalId: doc.externalId,
      title: doc.title,
      company: doc.company,
      similarityScore: Math.round(
        Math.max(0, Math.min(1, similarity)) * 100
      ),
      url: doc.url,
      modality: doc.modality,
      seniority: doc.seniority,
      coreTechStack: doc.extractedData.coreTechStack,
      architecturePatterns: doc.extractedData.architecturePatterns,
    })
  );
}

export async function generateStructuredGapDiagnosis(params: {
  profileText: string;
  matchedJobs: readonly MatchedJobEvidence[];
}): Promise<GapAnalysisLLMOutput> {
  const jobsContext =
    params.matchedJobs.length > 0
      ? params.matchedJobs
          .map(
            (job, index) =>
              `${index + 1}. [${job.company}] ${job.title} (Similitud: ${job.similarityScore}%, Seniority: ${job.seniority}, Modalidad: ${job.modality}) | Stack: ${job.coreTechStack.join(", ")} | Arquitectura: ${job.architecturePatterns.join(", ")}`
          )
          .join("\n")
      : "No hay ofertas activas registradas aún en la colección market_jobs; evalúa contra estándares actuales del mercado para roles Full-Stack/Cloud.";

  const { object } = await generateObject({
    model: google("gemini-2.5-flash"),
    schema: GapAnalysisLLMOutputSchema,
    temperature: 0.15,
    prompt: [
      "Eres un Staff Software Engineer y Technical Hiring Manager realizando un Gap Analysis Semántico basado en evidencia real del mercado.",
      "Cruza el siguiente perfil técnico contra las ofertas reales recuperadas mediante búsqueda vectorial en MongoDB Atlas.",
      "Instrucciones:",
      "1. Calcula un matchScore realista de 0 a 100.",
      "2. Identifica matchingSkills (tecnologías presentes tanto en el perfil como en las ofertas).",
      "3. Identifica missingHighDemandSkills (tecnologías o patrones frecuentes en las ofertas recuperadas que no figuran en el perfil).",
      "4. Redacta en español un diagnóstico técnico conciso en architecturalFit (entre 20 y 600 caracteres) explicando el encaje arquitectónico.",
      "5. Entrega exactamente 2 pasos técnicos accionables de arquitectura o ingeniería en recommendedActionPlan.",
      "",
      `Perfil Analizado:\n${params.profileText}`,
      "",
      `Ofertas Reales Recuperadas ($vectorSearch Top ${params.matchedJobs.length}):\n${jobsContext}`,
    ].join("\n"),
  });

  return GapAnalysisLLMOutputSchema.parse({
    ...object,
    matchingSkills: normalizeTechArray(object.matchingSkills),
    missingHighDemandSkills: normalizeTechArray(object.missingHighDemandSkills),
  });
}

export type ExecuteGapAnalysisOutcome =
  | {
      status: "ok";
      data: GapAnalysisResponse;
    }
  | {
      status: "rate_limited";
      resetInSeconds: number;
    };

export async function executeSemanticGapAnalysis(params: {
  profileText: string;
  presetId?: PresetProfileId;
  clientIp: string;
}): Promise<ExecuteGapAnalysisOutcome> {
  const startedAt = Date.now();

  if (params.presetId) {
    const cachedPreset = await getCachedPresetResult(params.presetId);
    if (cachedPreset) {
      return {
        status: "ok",
        data: GapAnalysisResponseSchema.parse({
          ...cachedPreset.analysis,
          matchedJobs: cachedPreset.matchedJobs,
          meta: {
            cached: true,
            presetId: params.presetId,
            latencyMs: Date.now() - startedAt,
            analyzedAt: cachedPreset.updatedAt.toISOString(),
            remainingQuota: RATE_LIMIT_MAX_REQUESTS_PER_HOUR,
          },
        }),
      };
    }
  }

  const ipHash = hashClientIp(params.clientIp);
  const quotaCheck = await consumeRateLimitQuota(ipHash, "/api/market/analyze");

  if (!quotaCheck.allowed) {
    return {
      status: "rate_limited",
      resetInSeconds: quotaCheck.resetInSeconds,
    };
  }

  const queryEmbedding = await embedCandidateProfile(params.profileText);
  const matchedJobs = await findTopMatchingJobsByVector(
    queryEmbedding,
    VECTOR_SEARCH_LIMIT
  );

  const diagnosis = await generateStructuredGapDiagnosis({
    profileText: params.profileText,
    matchedJobs,
  });

  if (params.presetId) {
    await setCachedPresetResult({
      presetId: params.presetId,
      profileText: params.profileText,
      analysis: diagnosis,
      matchedJobs,
    });
  }

  const nowIso = new Date().toISOString();

  return {
    status: "ok",
    data: GapAnalysisResponseSchema.parse({
      ...diagnosis,
      matchedJobs,
      meta: {
        cached: false,
        presetId: params.presetId ?? null,
        latencyMs: Date.now() - startedAt,
        analyzedAt: nowIso,
        remainingQuota: quotaCheck.remainingQuota,
      },
    }),
  };
}
