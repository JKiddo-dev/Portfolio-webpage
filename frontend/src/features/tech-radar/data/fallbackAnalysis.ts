import type {
  GapAnalysisResponse,
  PresetProfileId,
} from "@/lib/schemas/job-market";

export function buildFallbackAnalysis(
  presetId: PresetProfileId | null,
  latencyMs: number,
  isEs: boolean
): GapAnalysisResponse {
  if (presetId === "cloud-microservices") {
    return {
      matchScore: 86,
      matchingSkills: [
        "typescript",
        "nodejs",
        "nestjs",
        "docker",
        "microservices",
        "bff",
        "rest-api",
        "ci-cd",
      ],
      missingHighDemandSkills: ["kubernetes", "aws", "terraform", "kafka"],
      architecturalFit: isEs
        ? "Valor para el Negocio: Alta confiabilidad para banca y plataformas transaccionales gracias a su experiencia previa en IBM Consulting / Banco Itaú. Detalle Técnico: Sólida alineación con arquitecturas de microservicios empresariales, capas BFF en NestJS, validación tipada y pruebas automatizadas con Jest."
        : "Business Value: High reliability for banking and transactional platforms backed by hands-on experience at IBM Consulting / Itaú Bank. Technical Fit: Strong alignment with enterprise microservice architectures, NestJS BFF layers, strict validation, and automated Jest testing.",
      recommendedActionPlan: isEs
        ? [
            "Desplegar un clúster de microservicios NestJS sobre EKS/GKE con manifiestos Helm y sondas de liveness/readiness.",
            "Incorporar mensajería asíncrona con Kafka o RabbitMQ aplicando el patrón Outbox transaccional sobre MongoDB/PostgreSQL.",
          ]
        : [
            "Deploy a NestJS microservice cluster on EKS/GKE using Helm charts and liveness/readiness probes.",
            "Integrate Kafka or RabbitMQ asynchronous messaging applying the transactional Outbox pattern on MongoDB/PostgreSQL.",
          ],
      matchedJobs: [
        {
          externalId: "gob-backend-lead-01",
          title: "Senior Backend Engineer (Node.js / NestJS)",
          company: "Fintech LatAm Core",
          similarityScore: 93,
          url: "https://www.getonbrd.com/jobs/programming",
          modality: "remote",
          seniority: "senior",
          coreTechStack: [
            "typescript",
            "nestjs",
            "nodejs",
            "docker",
            "postgresql",
          ],
          architecturePatterns: ["microservices", "bff", "ci-cd", "rest-api"],
        },
        {
          externalId: "gob-platform-eng-02",
          title: "Cloud Microservices Software Engineer",
          company: "Global Payments Hub",
          similarityScore: 88,
          url: "https://www.getonbrd.com/jobs/programming",
          modality: "hybrid",
          seniority: "mid",
          coreTechStack: ["nodejs", "typescript", "mongodb", "docker", "aws"],
          architecturePatterns: [
            "event-driven",
            "microservices",
            "clean-architecture",
          ],
        },
      ],
      meta: {
        cached: true,
        presetId,
        latencyMs,
        analyzedAt: new Date().toISOString(),
        remainingQuota: 5,
      },
    };
  }

  if (presetId === "frontend-nextjs") {
    return {
      matchScore: 84,
      matchingSkills: [
        "typescript",
        "react",
        "nextjs",
        "angular",
        "tailwindcss",
        "rest-api",
      ],
      missingHighDemandSkills: [
        "graphql",
        "playwright",
        "aws",
        "micro-frontends",
      ],
      architecturalFit: isEs
        ? "Valor para el Negocio: Entrega rápida de productos digitales orientados a conversión, accesibilidad (100 Lighthouse) y excelente experiencia de usuario. Detalle Técnico: Alta compatibilidad con Next.js App Router y React 19, separación limpia mediante MVVM y optimización de renderizado híbrido SSR/Edge."
        : "Business Value: Fast delivery of conversion-driven digital products with top accessibility (100 Lighthouse) and polished user experience. Technical Fit: High compatibility with Next.js App Router and React 19, clean MVVM separation, and hybrid SSR/Edge rendering optimization.",
      recommendedActionPlan: isEs
        ? [
            "Implementar suites E2E deterministas con Playwright integradas en GitHub Actions para flujos críticos de usuario.",
            "Profundizar en patrones de Module Federation y caché distribuida en el Edge con Next.js Middleware.",
          ]
        : [
            "Implement deterministic Playwright E2E test suites in GitHub Actions for business-critical user flows.",
            "Expand into Module Federation patterns and distributed Edge caching via Next.js Middleware.",
          ],
      matchedJobs: [
        {
          externalId: "gob-frontend-sr-01",
          title: "Senior Frontend Engineer (Next.js & TypeScript)",
          company: "SaaS ScaleUp Studio",
          similarityScore: 92,
          url: "https://www.getonbrd.com/jobs/programming",
          modality: "remote",
          seniority: "senior",
          coreTechStack: ["typescript", "nextjs", "react", "tailwindcss"],
          architecturePatterns: ["ssr", "ci-cd", "rest-api"],
        },
      ],
      meta: {
        cached: true,
        presetId,
        latencyMs,
        analyzedAt: new Date().toISOString(),
        remainingQuota: 5,
      },
    };
  }

  return {
    matchScore: 92,
    matchingSkills: [
      "typescript",
      "nextjs",
      "nestjs",
      "react",
      "angular",
      "mongodb",
      "docker",
      "microservices",
      "bff",
      "ci-cd",
    ],
    missingHighDemandSkills: ["kubernetes", "aws", "terraform"],
    architecturalFit: isEs
      ? "Resumen Ejecutivo: Candidato de rápida incorporación que combina experiencia bancaria comprobada (IBM Consulting / Banco Itaú), inglés avanzado (C1) e intercambio en España (UJI). Nivel de Ingeniería: Dominio Full-Stack en microservicios NestJS/BFF, Next.js App Router y motores de IA vectorial en MongoDB Atlas operando a costo $0."
      : "Executive Summary: Fast-onboarding engineer combining proven banking experience (IBM Consulting / Itaú Bank), advanced C1 English, and international adaptability in Spain (UJI). Engineering Depth: Full-Stack mastery across NestJS/BFF microservices, Next.js App Router, and $0-cost MongoDB Atlas vector AI pipelines.",
    recommendedActionPlan: isEs
      ? [
          "Certificar despliegues multi-etapa con orquestación Kubernetes (K8s) e infraestructura como código (Terraform) sobre AWS.",
          "Expandir la observabilidad distribuida de los microservicios NestJS integrando OpenTelemetry para trazas extremo a extremo.",
        ]
      : [
          "Certify multi-stage deployments with Kubernetes (K8s) orchestration and Terraform IaC on AWS.",
          "Expand distributed observability across NestJS microservices by integrating end-to-end OpenTelemetry tracing.",
        ],
    matchedJobs: [
      {
        externalId: "gob-fullstack-01",
        title: "Full-Stack TypeScript Engineer (Next.js + NestJS)",
        company: "Enterprise Digital Banking",
        similarityScore: 95,
        url: "https://www.getonbrd.com/jobs/programming",
        modality: "remote",
        seniority: "senior",
        coreTechStack: [
          "typescript",
          "nextjs",
          "nestjs",
          "react",
          "mongodb",
          "docker",
        ],
        architecturePatterns: [
          "bff",
          "microservices",
          "clean-architecture",
          "ci-cd",
        ],
      },
      {
        externalId: "gob-ai-data-02",
        title: "Senior Software & Applied AI Engineer",
        company: "LatAm AI Ventures",
        similarityScore: 91,
        url: "https://www.getonbrd.com/jobs/programming",
        modality: "remote",
        seniority: "mid",
        coreTechStack: ["typescript", "nextjs", "nodejs", "mongodb"],
        architecturePatterns: ["serverless", "rest-api", "ci-cd"],
      },
      {
        externalId: "gob-fullstack-03",
        title: "Software Engineer Mid/Senior (React / Node / Docker)",
        company: "Cloud Commerce Platform",
        similarityScore: 87,
        url: "https://www.getonbrd.com/jobs/programming",
        modality: "hybrid",
        seniority: "mid",
        coreTechStack: [
          "typescript",
          "react",
          "nodejs",
          "docker",
          "postgresql",
        ],
        architecturePatterns: ["microservices", "event-driven", "tdd"],
      },
    ],
    meta: {
      cached: true,
      presetId: presetId ?? "matias-fullstack",
      latencyMs,
      analyzedAt: new Date().toISOString(),
      remainingQuota: 5,
    },
  };
}
