import type {
  MarketStatsResponse,
  PresetProfileId,
} from "@/lib/schemas/job-market";

export interface PresetDefinition {
  id: PresetProfileId;
  shortTitleEs: string;
  shortTitleEn: string;
  labelEs: string;
  labelEn: string;
  summaryEs: string;
  summaryEn: string;
  badge: string;
  isPrimary?: boolean;
  profileText: string;
}

export interface LoadingStepItem {
  step: string;
  label: string;
  detail: string;
}

export const MATIAS_CORE_TECH: ReadonlySet<string> = new Set([
  "typescript",
  "react",
  "nodejs",
  "nextjs",
  "docker",
  "postgresql",
  "nestjs",
  "mongodb",
  "angular",
  "tailwindcss",
]);

export const MATIAS_CORE_PATTERNS: ReadonlySet<string> = new Set([
  "rest-api",
  "microservices",
  "ci-cd",
  "clean-architecture",
  "bff",
  "event-driven",
  "tdd",
]);

export const PRESET_PROFILES: readonly PresetDefinition[] = [
  {
    id: "matias-fullstack",
    shortTitleEs: "Auditar perfil de Matías",
    shortTitleEn: "Audit Matías's Profile",
    labelEs:
      "Auditar perfil de Matías (Full-Stack: TypeScript, NestJS, Next.js, React, Angular, MongoDB, Docker)",
    labelEn:
      "Audit Matías's Profile (Full-Stack: TypeScript, NestJS, Next.js, React, Angular, MongoDB, Docker)",
    summaryEs:
      "Recomendado para HR & Hiring Managers • Evalúa mi experiencia real en banca (IBM / Itaú), sistemas cloud e inglés C1 frente al mercado actual.",
    summaryEn:
      "Recommended for HR & Hiring Managers • Evaluates my real banking experience (IBM / Itaú), cloud systems, and C1 English against live market demand.",
    badge: "Principal Preset • Zero-Token Cache ($0 Cost)",
    isPrimary: true,
    profileText:
      "Ingeniero en Computación Full-Stack Software Engineer con experiencia en arquitectura de microservicios y BFF con NestJS (IBM Consulting / Banco Itaú), desarrollo web moderno con TypeScript, Next.js (App Router), React, Angular y Tailwind CSS. Base de datos MongoDB Atlas y PostgreSQL, contenedores Docker, pipelines CI/CD, pruebas unitarias automatizadas con Jest (TDD, principios SOLID y Clean Architecture), integración de sistemas distribuidos IoT (ESP32, LoRa, MQTT) e inglés técnico profesional.",
  },
  {
    id: "cloud-microservices",
    shortTitleEs: "Rol: Backend & Cloud Microservices",
    shortTitleEn: "Role: Backend & Cloud Microservices",
    labelEs:
      "Evaluar Rol: Backend & Cloud Microservices (NestJS, BFF, Docker, CI/CD)",
    labelEn:
      "Evaluate Role: Backend & Cloud Microservices (NestJS, BFF, Docker, CI/CD)",
    summaryEs:
      "Ideal para vacantes de Backend Bancario, Fintech o APIs de alta disponibilidad con enfoque en resiliencia y testing automatizado.",
    summaryEn:
      "Ideal for Banking Backend, Fintech, or High-Availability API openings focused on resilience and automated testing.",
    badge: "Backend & BFF Preset • Zero-Token Cache",
    profileText:
      "Backend Software Engineer especializado en Node.js, NestJS y TypeScript. Diseño de capas BFF (Backend For Frontend), microservicios orientados a eventos, APIs RESTful, documentación OpenAPI/Swagger, contenedores Docker, integración continua CI/CD, Redis caché, manejo de resiliencia con Circuit Breakers y testing automatizado con Jest.",
  },
  {
    id: "frontend-nextjs",
    shortTitleEs: "Rol: Frontend & Product Engineer",
    shortTitleEn: "Role: Frontend & Product Engineer",
    labelEs:
      "Evaluar Rol: Frontend & Product Engineer (Next.js, React, TypeScript, Tailwind)",
    labelEn:
      "Evaluate Role: Frontend & Product Engineer (Next.js, React, TypeScript, Tailwind)",
    summaryEs:
      "Ideal para equipos de Producto Digital que buscan interfaces rápidas, accesibles, con SEO técnico y arquitectura escalable.",
    summaryEn:
      "Ideal for Digital Product teams seeking fast, accessible interfaces with technical SEO and scalable architecture.",
    badge: "Frontend & Product Preset • Zero-Token Cache",
    profileText:
      "Frontend & Product Software Engineer con dominio de TypeScript, React 19, Next.js App Router, Server Actions, SSR/ISR, Angular, arquitectura MVVM, diseño de sistemas con Tailwind CSS, optimización de Core Web Vitals y consumo de APIs REST/GraphQL.",
  },
];

export const BASELINE_MARKET_STATS: MarketStatsResponse = {
  totalVectorizedJobs: 25,
  lastIngestedAt: "2026-10-19T06:00:00.000Z",
  queryLatencyMs: 18,
  topTechnologies: [
    { name: "typescript", count: 21, percentage: 84 },
    { name: "react", count: 19, percentage: 76 },
    { name: "nodejs", count: 18, percentage: 72 },
    { name: "nextjs", count: 14, percentage: 56 },
    { name: "docker", count: 13, percentage: 52 },
    { name: "aws", count: 12, percentage: 48 },
    { name: "postgresql", count: 11, percentage: 44 },
    { name: "nestjs", count: 9, percentage: 36 },
    { name: "mongodb", count: 8, percentage: 32 },
    { name: "kubernetes", count: 6, percentage: 24 },
  ],
  topArchitecturePatterns: [
    { name: "rest-api", count: 22, percentage: 88 },
    { name: "microservices", count: 16, percentage: 64 },
    { name: "ci-cd", count: 15, percentage: 60 },
    { name: "clean-architecture", count: 11, percentage: 44 },
    { name: "bff", count: 8, percentage: 32 },
    { name: "event-driven", count: 7, percentage: 28 },
    { name: "serverless", count: 6, percentage: 24 },
    { name: "tdd", count: 5, percentage: 20 },
  ],
  seniorityDistribution: [
    { seniority: "senior", count: 12, percentage: 48 },
    { seniority: "mid", count: 9, percentage: 36 },
    { seniority: "lead", count: 2, percentage: 8 },
    { seniority: "junior", count: 2, percentage: 8 },
  ],
  modalityDistribution: [
    { modality: "remote", count: 17, percentage: 68 },
    { modality: "hybrid", count: 6, percentage: 24 },
    { modality: "onsite", count: 2, percentage: 8 },
  ],
  englishRequiredPercentage: 64,
};

export function getLoadingSteps(isEs: boolean): LoadingStepItem[] {
  return [
    {
      step: "01",
      label: isEs
        ? "1. Generando embedding de 768d..."
        : "1. Generating 768d vector embedding...",
      detail: "Google text-embedding-004 (Dense Vector)",
    },
    {
      step: "02",
      label: isEs
        ? "2. Consultando índice vectorial en MongoDB Atlas..."
        : "2. Querying vector index in MongoDB Atlas...",
      detail: "$vectorSearch • Cosine Similarity (Top 8 ANN)",
    },
    {
      step: "03",
      label: isEs
        ? "3. Sintetizando diagnóstico con Gemini 2.5 Flash..."
        : "3. Synthesizing diagnostic with Gemini 2.5 Flash...",
      detail: "generateObject • Strict Zod Schema Validation",
    },
  ];
}
