import { z } from "zod";

export const EMBEDDING_DIMENSIONS = 768 as const;
export const MAX_CLEAN_SUMMARY_LENGTH = 300 as const;
export const ETL_MAX_BATCH_SIZE = 5 as const;
export const VECTOR_SEARCH_LIMIT = 8 as const;
export const RATE_LIMIT_MAX_REQUESTS_PER_HOUR = 5 as const;
export const RATE_LIMIT_TTL_SECONDS = 3600 as const;

export const JobModalitySchema = z.enum([
  "remote",
  "hybrid",
  "onsite",
  "unknown",
]);
export type JobModality = z.infer<typeof JobModalitySchema>;

export const JobSenioritySchema = z.enum([
  "junior",
  "mid",
  "senior",
  "lead",
  "unknown",
]);
export type JobSeniority = z.infer<typeof JobSenioritySchema>;

export const TECH_SYNONYM_MAP: Readonly<Record<string, string>> = {
  "next.js": "nextjs",
  "nextjs": "nextjs",
  "next": "nextjs",
  "nest.js": "nestjs",
  "nestjs": "nestjs",
  "node.js": "nodejs",
  "nodejs": "nodejs",
  "node": "nodejs",
  "react.js": "react",
  "reactjs": "react",
  "vue.js": "vuejs",
  "vuejs": "vuejs",
  "angular.js": "angular",
  "angularjs": "angular",
  "ts": "typescript",
  "js": "javascript",
  "mongo": "mongodb",
  "mongo db": "mongodb",
  "postgres": "postgresql",
  "postgre": "postgresql",
  "k8s": "kubernetes",
  "golang": "go",
  "c#": "csharp",
  ".net": "dotnet",
  "aws cloud": "aws",
  "amazon web services": "aws",
  "gcp": "google-cloud",
  "google cloud platform": "google-cloud",
  "ci/cd": "ci-cd",
  "cicd": "ci-cd",
  "rest": "rest-api",
  "restful": "rest-api",
  "rest api": "rest-api",
  "micro-services": "microservices",
  "event driven": "event-driven",
};

export function normalizeTechToken(raw: string): string {
  const cleaned = raw.trim().toLowerCase().replace(/\s+/g, " ");
  return TECH_SYNONYM_MAP[cleaned] ?? cleaned;
}

export function normalizeTechArray(items: readonly string[]): string[] {
  const normalized = items
    .map(normalizeTechToken)
    .filter((token) => token.length > 0);
  return Array.from(new Set(normalized));
}

export const ExtractedJobDataSchema = z.object({
  coreTechStack: z
    .array(z.string().trim().min(1))
    .describe(
      "Nombres de tecnologías principales normalizados en minúsculas (ej: 'nextjs', 'nestjs', 'typescript', 'mongodb', 'docker')"
    ),
  architecturePatterns: z
    .array(z.string().trim().min(1))
    .describe(
      "Patrones de arquitectura y prácticas de ingeniería en minúsculas (ej: 'microservices', 'bff', 'event-driven', 'rest-api', 'ci-cd')"
    ),
  englishRequired: z
    .boolean()
    .describe(
      "True si la oferta exige explícitamente inglés intermedio/avanzado o está redactada íntegramente en inglés"
    ),
  cleanSummary: z
    .string()
    .trim()
    .min(10, "El resumen técnico debe contener al menos 10 caracteres")
    .max(
      MAX_CLEAN_SUMMARY_LENGTH,
      `El resumen técnico no puede exceder los ${MAX_CLEAN_SUMMARY_LENGTH} caracteres`
    )
    .describe(
      "Resumen técnico denso de máximo 300 caracteres optimizado para generar embeddings semánticos"
    ),
});
export type ExtractedJobData = z.infer<typeof ExtractedJobDataSchema>;

export const JobLLMExtractionSchema = z.object({
  modality: JobModalitySchema.describe(
    "Modalidad de trabajo inferida: 'remote', 'hybrid', 'onsite' o 'unknown'"
  ),
  seniority: JobSenioritySchema.describe(
    "Seniority requerido para el rol: 'junior', 'mid', 'senior', 'lead' o 'unknown'"
  ),
  extractedData: ExtractedJobDataSchema,
});
export type JobLLMExtraction = z.infer<typeof JobLLMExtractionSchema>;

export const MarketJobDocumentSchema = z.object({
  externalId: z.string().trim().min(1),
  title: z.string().trim().min(1),
  company: z.string().trim().min(1),
  publishedAt: z.coerce.date(),
  url: z.string().url(),
  modality: JobModalitySchema,
  seniority: JobSenioritySchema,
  extractedData: ExtractedJobDataSchema,
  embedding: z
    .array(z.number().finite())
    .length(
      EMBEDDING_DIMENSIONS,
      `El vector de embedding debe tener exactamente ${EMBEDDING_DIMENSIONS} dimensiones (text-embedding-004)`
    ),
  ingestedAt: z.coerce.date(),
});
export type MarketJobDocument = z.infer<typeof MarketJobDocumentSchema>;

export const GetOnBoardCompanyExpandSchema = z.object({
  data: z
    .object({
      id: z.string().optional(),
      attributes: z
        .object({
          name: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

export const GetOnBoardJobItemSchema = z.object({
  id: z.string().min(1),
  attributes: z.object({
    title: z.string().min(1),
    description: z.string().nullable().optional().default(""),
    functions: z.string().nullable().optional().default(""),
    desirable: z.string().nullable().optional().default(""),
    remote: z.boolean().nullable().optional(),
    remote_modality: z.string().nullable().optional(),
    seniority: z
      .union([
        z.string(),
        z.object({
          data: z
            .object({
              id: z.union([z.string(), z.number()]).optional(),
              attributes: z.object({ name: z.string().optional() }).optional(),
            })
            .nullable()
            .optional(),
        }),
      ])
      .nullable()
      .optional(),
    published_at: z.number().int().positive().nullable().optional(),
    company: z
      .union([z.string(), GetOnBoardCompanyExpandSchema])
      .nullable()
      .optional(),
  }),
  links: z
    .object({
      public_url: z.string().url().optional(),
    })
    .optional(),
});
export type GetOnBoardJobItem = z.infer<typeof GetOnBoardJobItemSchema>;

export const GetOnBoardApiResponseSchema = z.object({
  data: z.array(GetOnBoardJobItemSchema),
});
export type GetOnBoardApiResponse = z.infer<typeof GetOnBoardApiResponseSchema>;

export const PresetProfileIdSchema = z.enum([
  "matias-fullstack",
  "cloud-microservices",
  "frontend-nextjs",
]);
export type PresetProfileId = z.infer<typeof PresetProfileIdSchema>;

export const RateLimitDocumentSchema = z.object({
  ipHash: z
    .string()
    .regex(/^[a-f0-9]{64}$/i, "Debe ser un hash SHA-256 hexadecimal válido"),
  endpoint: z.string().trim().min(1),
  createdAt: z.coerce.date(),
});
export type RateLimitDocument = z.infer<typeof RateLimitDocumentSchema>;

export const AnalyzeMarketRequestSchema = z.object({
  profileText: z
    .string()
    .trim()
    .min(15, "La descripción del perfil o vacante debe tener al menos 15 caracteres")
    .max(4000, "El texto del perfil no puede superar los 4000 caracteres"),
  presetId: PresetProfileIdSchema.optional(),
});
export type AnalyzeMarketRequest = z.infer<typeof AnalyzeMarketRequestSchema>;

export const GapAnalysisLLMOutputSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe("Porcentaje global de compatibilidad técnica con el mercado actual (0 a 100)"),
  matchingSkills: z
    .array(z.string().trim().min(1))
    .describe("Habilidades del candidato que coinciden con las ofertas recuperadas"),
  missingHighDemandSkills: z
    .array(z.string().trim().min(1))
    .describe(
      "Brechas técnicas reales de alta demanda presentes en las ofertas pero ausentes en el perfil"
    ),
  architecturalFit: z
    .string()
    .trim()
    .min(20)
    .max(600)
    .describe(
      "Explicación técnica concisa sobre cómo encaja el perfil en las arquitecturas demandadas"
    ),
  recommendedActionPlan: z
    .array(z.string().trim().min(10))
    .min(2)
    .max(2)
    .describe("Exactamente 2 pasos concretos de estudio o arquitectura para cerrar la brecha"),
});
export type GapAnalysisLLMOutput = z.infer<typeof GapAnalysisLLMOutputSchema>;

export const MatchedJobEvidenceSchema = z.object({
  externalId: z.string(),
  title: z.string(),
  company: z.string(),
  similarityScore: z.number().min(0).max(100),
  url: z.string().url(),
  modality: JobModalitySchema,
  seniority: JobSenioritySchema,
  coreTechStack: z.array(z.string()),
  architecturePatterns: z.array(z.string()),
});
export type MatchedJobEvidence = z.infer<typeof MatchedJobEvidenceSchema>;

export const GapAnalysisResponseSchema = GapAnalysisLLMOutputSchema.extend({
  matchedJobs: z.array(MatchedJobEvidenceSchema),
  meta: z.object({
    cached: z.boolean(),
    presetId: PresetProfileIdSchema.nullable(),
    latencyMs: z.number().nonnegative(),
    analyzedAt: z.string(),
    remainingQuota: z.number().int().nonnegative(),
  }),
});
export type GapAnalysisResponse = z.infer<typeof GapAnalysisResponseSchema>;

export const PresetCacheDocumentSchema = z.object({
  presetId: PresetProfileIdSchema,
  profileText: z.string(),
  analysis: GapAnalysisLLMOutputSchema,
  matchedJobs: z.array(MatchedJobEvidenceSchema),
  updatedAt: z.coerce.date(),
  expiresAt: z.coerce.date(),
});
export type PresetCacheDocument = z.infer<typeof PresetCacheDocumentSchema>;

export const TechFrequencyItemSchema = z.object({
  name: z.string(),
  count: z.number().int().nonnegative(),
  percentage: z.number().min(0).max(100),
});
export type TechFrequencyItem = z.infer<typeof TechFrequencyItemSchema>;

export const SeniorityDistributionItemSchema = z.object({
  seniority: JobSenioritySchema,
  count: z.number().int().nonnegative(),
  percentage: z.number().min(0).max(100),
});
export type SeniorityDistributionItem = z.infer<
  typeof SeniorityDistributionItemSchema
>;

export const ModalityDistributionItemSchema = z.object({
  modality: JobModalitySchema,
  count: z.number().int().nonnegative(),
  percentage: z.number().min(0).max(100),
});
export type ModalityDistributionItem = z.infer<
  typeof ModalityDistributionItemSchema
>;

export const MarketStatsResponseSchema = z.object({
  totalVectorizedJobs: z.number().int().nonnegative(),
  lastIngestedAt: z.string().nullable(),
  queryLatencyMs: z.number().nonnegative(),
  topTechnologies: z.array(TechFrequencyItemSchema),
  topArchitecturePatterns: z.array(TechFrequencyItemSchema),
  seniorityDistribution: z.array(SeniorityDistributionItemSchema),
  modalityDistribution: z.array(ModalityDistributionItemSchema),
  englishRequiredPercentage: z.number().min(0).max(100),
});
export type MarketStatsResponse = z.infer<typeof MarketStatsResponseSchema>;
