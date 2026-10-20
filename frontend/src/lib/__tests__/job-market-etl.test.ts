jest.mock("ai", () => ({
  generateObject: jest.fn(),
  embed: jest.fn(),
}));

jest.mock("@ai-sdk/google", () => ({
  google: Object.assign(jest.fn(), {
    embedding: jest.fn(),
  }),
}));

import { embed, generateObject } from "ai";
import {
  AnalyzeMarketRequestSchema,
  EMBEDDING_DIMENSIONS,
  ExtractedJobDataSchema,
  GapAnalysisLLMOutputSchema,
  GetOnBoardApiResponseSchema,
  type GetOnBoardJobItem,
  JobLLMExtractionSchema,
  MarketJobDocumentSchema,
  normalizeTechArray,
  normalizeTechToken,
  RateLimitDocumentSchema,
} from "@/lib/schemas/job-market";
import {
  buildCleanedJobCorpus,
  buildEmbeddingInput,
  extractCompanyName,
  extractJobEntitiesWithGemini,
  filterNewJobsForBatch,
  resolveJobUrl,
  resolvePublishedDate,
  stripHtmlAndNormalizeText,
} from "@/lib/services/job-etl";
import {
  computeCosineSimilarity,
  generateStructuredGapDiagnosis,
} from "@/lib/services/market-analytics";
import { extractClientIp, hashClientIp } from "@/lib/services/rate-limit";

function createMockGetOnBoardJob(
  overrides: Partial<GetOnBoardJobItem> = {}
): GetOnBoardJobItem {
  return {
    id: "senior-fullstack-engineer-santiago",
    attributes: {
      title: "Senior Full-Stack Engineer",
      description: "<p>Buscamos un <strong>Senior Engineer</strong> con experiencia en Next.JS y Nest.js.</p>",
      functions: "<ul><li>Diseñar microservicios</li><li>Implementar CI/CD</li></ul>",
      desirable: "<p>Experiencia con MongoDB Atlas &amp; Docker.</p>",
      remote: true,
      remote_modality: "remote",
      seniority: "Senior",
      published_at: 1760000000,
      company: {
        data: {
          id: "acme-corp",
          attributes: {
            name: "Acme Tech LatAm",
          },
        },
      },
    },
    links: {
      public_url: "https://www.getonbrd.com/jobs/senior-fullstack-engineer-santiago",
    },
    ...overrides,
  };
}

describe("ETL HTML Sanitization & Text Normalization", () => {
  it("strips script, style, nested HTML tags and decodes HTML entities", () => {
    const dirtyHtml = `
      <div class="job-body">
        <script>window.alert("xss")</script>
        <style>.hidden { display: none; }</style>
        <h2>Requisitos&nbsp;Técnicos</h2>
        <p>Dominio de <strong>TypeScript</strong> &amp; <em>Next.js</em> &lt;v15+&gt;.</p>
        <ul>
          <li>Arquitectura &#39;Clean&#39; &mdash; Microservicios</li>
          <li>Código &#65;&#x42;</li>
        </ul>
      </div>
    `;

    const cleaned = stripHtmlAndNormalizeText(dirtyHtml);

    expect(cleaned).not.toContain("<script>");
    expect(cleaned).not.toContain("window.alert");
    expect(cleaned).not.toContain("<style>");
    expect(cleaned).not.toContain("<h2>");
    expect(cleaned).toBe(
      "Requisitos Técnicos Dominio de TypeScript & Next.js <v15+>. Arquitectura 'Clean' - Microservicios Código AB"
    );
  });

  it("handles null, undefined and empty HTML strings safely", () => {
    expect(stripHtmlAndNormalizeText(null)).toBe("");
    expect(stripHtmlAndNormalizeText(undefined)).toBe("");
    expect(stripHtmlAndNormalizeText("   ")).toBe("");
  });

  it("extracts company name from expanded object, plain string, or falls back to Confidential Company", () => {
    const expandedJob = createMockGetOnBoardJob();
    expect(extractCompanyName(expandedJob)).toBe("Acme Tech LatAm");

    const stringCompanyJob = createMockGetOnBoardJob({
      attributes: {
        ...expandedJob.attributes,
        company: "Direct Company String",
      },
    });
    expect(extractCompanyName(stringCompanyJob)).toBe("Direct Company String");

    const anonymousJob = createMockGetOnBoardJob({
      attributes: {
        ...expandedJob.attributes,
        company: null,
      },
    });
    expect(extractCompanyName(anonymousJob)).toBe("Confidential Company");
  });

  it("builds a combined cleaned corpus and embedding input deterministically", () => {
    const job = createMockGetOnBoardJob();
    const corpus = buildCleanedJobCorpus(job);

    expect(corpus).toContain("Buscamos un Senior Engineer");
    expect(corpus).toContain("Diseñar microservicios");
    expect(corpus).toContain("MongoDB Atlas & Docker");

    const embeddingInput = buildEmbeddingInput({
      title: "Senior Full-Stack Engineer",
      coreTechStack: ["Next.JS", "Nest.js", "TypeScript", "MongoDB"],
      architecturePatterns: ["Micro-Services", "CI/CD"],
      cleanSummary: "Desarrollo de plataforma SaaS distribuida con Next.js y NestJS.",
    });

    expect(embeddingInput).toContain("Core Tech Stack: nextjs, nestjs, typescript, mongodb");
    expect(embeddingInput).toContain("Architecture Patterns: microservices, ci-cd");
  });

  it("resolves fallback job URLs and epoch dates accurately", () => {
    const jobWithoutLink = createMockGetOnBoardJob({ links: undefined });
    expect(resolveJobUrl(jobWithoutLink)).toBe(
      "https://www.getonbrd.com/jobs/senior-fullstack-engineer-santiago"
    );

    const parsedDate = resolvePublishedDate(1760000000);
    expect(parsedDate.toISOString()).toBe(new Date(1760000000 * 1000).toISOString());
  });
});

describe("Synonym Normalization & Early Batch Deduplication", () => {
  it("normalizes technology synonyms and deduplicates tokens", () => {
    expect(normalizeTechToken("  Next.JS ")).toBe("nextjs");
    expect(normalizeTechToken("Nest.js")).toBe("nestjs");
    expect(normalizeTechToken("CI/CD")).toBe("ci-cd");
    expect(normalizeTechToken("Mongo DB")).toBe("mongodb");
    expect(normalizeTechToken("K8s")).toBe("kubernetes");

    const deduplicated = normalizeTechArray([
      "Next.JS",
      "nextjs",
      "Next",
      "TypeScript",
      "TS",
      "Nest.js",
      "CI/CD",
      "cicd",
      "   ",
    ]);

    expect(deduplicated).toEqual(["nextjs", "typescript", "nestjs", "ci-cd"]);
  });

  it("filters out already-existing externalIds and respects ETL_MAX_BATCH_SIZE", () => {
    const jobsBatch: GetOnBoardJobItem[] = Array.from({ length: 10 }, (_, idx) =>
      createMockGetOnBoardJob({ id: `job-${idx + 1}` })
    );

    const existingIds = new Set<string>(["job-1", "job-2", "job-4"]);
    const filtered = filterNewJobsForBatch(jobsBatch, existingIds, 5);

    expect(filtered).toHaveLength(5);
    expect(filtered.map((j) => j.id)).toEqual([
      "job-3",
      "job-5",
      "job-6",
      "job-7",
      "job-8",
    ]);
  });
});

describe("Zod Schema Validation Against Malformed LLM & API Responses", () => {
  it("accepts a valid JobLLMExtractionSchema payload", () => {
    const validExtraction = {
      modality: "remote",
      seniority: "senior",
      extractedData: {
        coreTechStack: ["typescript", "nextjs", "nestjs", "mongodb"],
        architecturePatterns: ["microservices", "bff", "ci-cd"],
        englishRequired: true,
        cleanSummary:
          "Rol Senior Full-Stack enfocado en microservicios NestJS, BFF y aplicaciones Next.js sobre MongoDB Atlas.",
      },
    };

    const parsed = JobLLMExtractionSchema.parse(validExtraction);
    expect(parsed.modality).toBe("remote");
    expect(parsed.seniority).toBe("senior");
    expect(parsed.extractedData.englishRequired).toBe(true);
  });

  it("rejects malformed LLM outputs with invalid enums or cleanSummary exceeding 300 chars", () => {
    const invalidEnumPayload = {
      modality: "work-from-anywhere",
      seniority: "principal-staff",
      extractedData: {
        coreTechStack: ["typescript"],
        architecturePatterns: ["rest-api"],
        englishRequired: false,
        cleanSummary: "Resumen técnico válido para pruebas de validación.",
      },
    };

    expect(JobLLMExtractionSchema.safeParse(invalidEnumPayload).success).toBe(
      false
    );

    const tooLongSummaryPayload = {
      res: ExtractedJobDataSchema.safeParse({
        coreTechStack: ["typescript"],
        architecturePatterns: ["rest-api"],
        englishRequired: true,
        cleanSummary: "A".repeat(305),
      }),
    };

    expect(tooLongSummaryPayload.res.success).toBe(false);
  });

  it("validates 768-dimensional embeddings and rejects wrong vector dimensions", () => {
    const validVector = Array.from({ length: EMBEDDING_DIMENSIONS }, () => 0.015);

    const validDoc = {
      externalId: "job-123",
      title: "Senior Software Engineer",
      company: "Tech Corp",
      publishedAt: new Date().toISOString(),
      url: "https://www.getonbrd.com/jobs/job-123",
      modality: "hybrid",
      seniority: "senior",
      extractedData: {
        coreTechStack: ["typescript", "nodejs"],
        architecturePatterns: ["microservices"],
        englishRequired: false,
        cleanSummary: "Ingeniero de software senior para plataforma de pagos.",
      },
      embedding: validVector,
      ingestedAt: new Date().toISOString(),
    };

    expect(MarketJobDocumentSchema.safeParse(validDoc).success).toBe(true);

    const wrongDimensionDoc = {
      ...validDoc,
      embedding: [0.1, 0.2, 0.3],
    };

    expect(MarketJobDocumentSchema.safeParse(wrongDimensionDoc).success).toBe(
      false
    );
  });

  it("rejects malformed GapAnalysisLLMOutputSchema payloads", () => {
    const validGapOutput = {
      matchScore: 88,
      matchingSkills: ["typescript", "nextjs", "mongodb"],
      missingHighDemandSkills: ["kubernetes", "aws"],
      architecturalFit:
        "Excelente alineación con arquitecturas BFF y microservicios modernos en la nube.",
      recommendedActionPlan: [
        "Implementar despliegues declarativos en Kubernetes con Helm.",
        "Integrar trazabilidad distribuida con OpenTelemetry en NestJS.",
      ],
    };

    expect(GapAnalysisLLMOutputSchema.safeParse(validGapOutput).success).toBe(
      true
    );

    const invalidScoreAndPlan = {
      ...validGapOutput,
      matchScore: 140,
      recommendedActionPlan: ["Un solo paso incompleto"],
    };

    expect(
      GapAnalysisLLMOutputSchema.safeParse(invalidScoreAndPlan).success
    ).toBe(false);
  });

  it("validates GetOnBoard API responses and AnalyzeMarketRequest payloads", () => {
    const apiPayload = {
      data: [createMockGetOnBoardJob()],
    };
    expect(GetOnBoardApiResponseSchema.safeParse(apiPayload).success).toBe(true);
    expect(GetOnBoardApiResponseSchema.safeParse({ data: [{ id: "" }] }).success).toBe(
      false
    );

    expect(
      AnalyzeMarketRequestSchema.safeParse({
        profileText: "Short",
      }).success
    ).toBe(false);

    expect(
      AnalyzeMarketRequestSchema.safeParse({
        profileText:
          "Full-Stack Engineer con experiencia en TypeScript, Next.js, NestJS y MongoDB.",
        presetId: "matias-fullstack",
      }).success
    ).toBe(true);
  });
});

describe("Vector Cosine Similarity & Rate Limit IP Hashing", () => {
  it("computes cosine similarity accurately for identical and orthogonal vectors", () => {
    const vecA = [1, 0, 0];
    const vecB = [1, 0, 0];
    const vecOrthogonal = [0, 1, 0];

    expect(computeCosineSimilarity(vecA, vecB)).toBeCloseTo(1, 5);
    expect(computeCosineSimilarity(vecA, vecOrthogonal)).toBeCloseTo(0, 5);
    expect(computeCosineSimilarity([], [])).toBe(0);
  });

  it("extracts client IP from x-forwarded-for and hashes it into a valid SHA-256 RateLimitDocument", () => {
    const request = new Request("https://example.com/api/market/analyze", {
      headers: {
        "x-forwarded-for": "190.160.10.25, 10.0.0.1",
      },
    });

    const ip = extractClientIp(request);
    expect(ip).toBe("190.160.10.25");

    const ipHash = hashClientIp(ip);
    expect(ipHash).toHaveLength(64);

    const parsedRecord = RateLimitDocumentSchema.safeParse({
      ipHash,
      endpoint: "/api/market/analyze",
      createdAt: new Date(),
    });
    expect(parsedRecord.success).toBe(true);
  });

  it("normalizes LLM output deterministically after generateObject in ETL and Gap Analysis", async () => {
    const mockedGenerateObject = jest.mocked(generateObject);
    void embed;

    mockedGenerateObject.mockResolvedValueOnce({
      object: {
        modality: "remote",
        seniority: "senior",
        extractedData: {
          coreTechStack: ["Next.JS", "nextjs", "Nest.js", "Mongo DB"],
          architecturePatterns: ["Micro-Services", "CI/CD", "REST API"],
          englishRequired: true,
          cleanSummary: "S".repeat(340),
        },
      },
    } as never);

    const extracted = await extractJobEntitiesWithGemini({
      title: "Senior Full-Stack Engineer",
      company: "Acme Corp",
      cleanCorpus: "Next.JS, Nest.js, MongoDB",
      modalityHint: "remote",
      seniorityHint: "Senior",
    });

    expect(extracted.extractedData.coreTechStack).toEqual([
      "nextjs",
      "nestjs",
      "mongodb",
    ]);
    expect(extracted.extractedData.architecturePatterns).toEqual([
      "microservices",
      "ci-cd",
      "rest-api",
    ]);
    expect(extracted.extractedData.cleanSummary.length).toBeLessThanOrEqual(300);

    mockedGenerateObject.mockResolvedValueOnce({
      object: {
        matchScore: 91,
        matchingSkills: ["Next.JS", "Nest.js", "TypeScript", "TS"],
        missingHighDemandSkills: ["K8s", "kubernetes", "AWS Cloud"],
        architecturalFit:
          "Alto grado de compatibilidad con arquitecturas de microservicios y BFF en la nube.",
        recommendedActionPlan: [
          "Profundizar en despliegues de clústeres Kubernetes sobre AWS EKS.",
          "Implementar observabilidad distribuida con OpenTelemetry.",
        ],
      },
    } as never);

    const diagnosis = await generateStructuredGapDiagnosis({
      profileText: "Ingeniero Full-Stack con Next.js, NestJS y TypeScript",
      matchedJobs: [],
    });

    expect(diagnosis.matchingSkills).toEqual(["nextjs", "nestjs", "typescript"]);
    expect(diagnosis.missingHighDemandSkills).toEqual(["kubernetes", "aws"]);
  });
});
