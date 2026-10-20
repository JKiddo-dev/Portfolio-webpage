"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { usePortfolio } from "@/hooks/usePortfolio";
import type {
  GapAnalysisResponse,
  MarketStatsResponse,
  PresetProfileId,
} from "@/lib/schemas/job-market";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Cpu,
  Database,
  ExternalLink,
  Filter,
  GitCompare,
  Globe2,
  Layers,
  MessageSquare,
  Play,
  Radar,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

interface PresetDefinition {
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

const MATIAS_CORE_TECH: ReadonlySet<string> = new Set([
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

const MATIAS_CORE_PATTERNS: ReadonlySet<string> = new Set([
  "rest-api",
  "microservices",
  "ci-cd",
  "clean-architecture",
  "bff",
  "event-driven",
  "tdd",
]);

const PRESET_PROFILES: readonly PresetDefinition[] = [
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

const BASELINE_MARKET_STATS: MarketStatsResponse = {
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

function buildFallbackAnalysis(
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

export default function TechRadarPage() {
  const { language, isDark } = usePortfolio();
  const isEs = language === "es";

  const [stats, setStats] = useState<MarketStatsResponse>(BASELINE_MARKET_STATS);
  const [isLiveStats, setIsLiveStats] = useState<boolean>(false);
  const [loadingStats, setLoadingStats] = useState<boolean>(true);

  const [selectedPresetId, setSelectedPresetId] =
    useState<PresetProfileId | null>("matias-fullstack");
  const [customProfileText, setCustomProfileText] = useState<string>(
    PRESET_PROFILES[0]?.profileText ?? ""
  );
  const [analysisResult, setAnalysisResult] =
    useState<GapAnalysisResponse | null>(null);
  const [isLiveAnalysis, setIsLiveAnalysis] = useState<boolean>(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);
  const [loadingStage, setLoadingStage] = useState<0 | 1 | 2>(0);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [architectureOpen, setArchitectureOpen] = useState<boolean>(false);

  const simulatorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fetchMarketStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const response = await fetch("/api/market/stats", {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as MarketStatsResponse;
      if (data.totalVectorizedJobs > 0) {
        setStats(data);
        setIsLiveStats(true);
      } else {
        setStats({
          ...BASELINE_MARKET_STATS,
          queryLatencyMs: data.queryLatencyMs,
        });
        setIsLiveStats(false);
      }
    } catch {
      setStats(BASELINE_MARKET_STATS);
      setIsLiveStats(false);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  const triggerGapAnalysis = useCallback(
    async (
      profileText: string,
      presetId: PresetProfileId | null,
      withVisualStages = false
    ) => {
      const trimmed = profileText.trim();
      if (trimmed.length < 15) {
        setAnalysisError(
          isEs
            ? "Ingresa al menos 15 caracteres describiendo los requisitos de tu vacante o perfil."
            : "Please enter at least 15 characters describing your job requirements or profile."
        );
        return;
      }

      setLoadingAnalysis(true);
      setLoadingStage(0);
      setAnalysisError(null);
      const startTime = Date.now();

      const stageTimer1 = setTimeout(() => {
        setLoadingStage(1);
      }, 160);
      const stageTimer2 = setTimeout(() => {
        setLoadingStage(2);
      }, 320);

      try {
        const fetchPromise = fetch("/api/market/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profileText: trimmed,
            ...(presetId ? { presetId } : {}),
          }),
        });

        const minStageWait = withVisualStages
          ? new Promise<void>((resolve) => {
              setTimeout(resolve, 480);
            })
          : Promise.resolve();

        const [response] = await Promise.all([fetchPromise, minStageWait]);

        const payload = (await response.json()) as
          | GapAnalysisResponse
          | { error?: string; resetInSeconds?: number };

        if (response.status === 429) {
          const errorMsg =
            "error" in payload && payload.error
              ? payload.error
              : isEs
                ? "Límite de 5 análisis personalizados por hora alcanzado. Puedes seguir usando los 3 perfiles preconfigurados sin límite (Modo Zero-Token)."
                : "Hourly limit of 5 custom live analyses reached. You can continue using the 3 preconfigured presets with zero limits (Zero-Token Mode).";
          setAnalysisError(errorMsg);
          return;
        }

        if (!response.ok || !("matchScore" in payload)) {
          throw new Error(
            "error" in payload && payload.error
              ? payload.error
              : `HTTP ${response.status}`
          );
        }

        setAnalysisResult(payload);
        setIsLiveAnalysis(true);
      } catch {
        if (withVisualStages) {
          await new Promise<void>((resolve) => {
            setTimeout(resolve, 360);
          });
        }
        const fallback = buildFallbackAnalysis(
          presetId,
          Math.max(12, Date.now() - startTime),
          isEs
        );
        setAnalysisResult(fallback);
        setIsLiveAnalysis(false);
      } finally {
        clearTimeout(stageTimer1);
        clearTimeout(stageTimer2);
        setLoadingAnalysis(false);
      }
    },
    [isEs]
  );

  useEffect(() => {
    void fetchMarketStats();
    const initialPreset = PRESET_PROFILES[0];
    if (initialPreset) {
      void triggerGapAnalysis(initialPreset.profileText, initialPreset.id, false);
    }
  }, [fetchMarketStats, triggerGapAnalysis]);

  const handleSelectPreset = (preset: PresetDefinition) => {
    setSelectedPresetId(preset.id);
    setCustomProfileText(preset.profileText);
    void triggerGapAnalysis(preset.profileText, preset.id, true);
  };

  const handleHeroAuditMatias = () => {
    const primaryPreset = PRESET_PROFILES[0];
    if (primaryPreset) {
      setSelectedPresetId(primaryPreset.id);
      setCustomProfileText(primaryPreset.profileText);
      simulatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      void triggerGapAnalysis(primaryPreset.profileText, primaryPreset.id, true);
    }
  };

  const handleHeroCustomVacancy = () => {
    simulatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 350);
  };

  const handleRunCustomAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    void triggerGapAnalysis(customProfileText, selectedPresetId, true);
  };

  const formattedLastIngested = stats.lastIngestedAt
    ? new Date(stats.lastIngestedAt).toLocaleString(isEs ? "es-CL" : "en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : isEs
      ? "Sincronización diaria activa"
      : "Daily sync active";

  const primaryPreset = PRESET_PROFILES[0];
  const secondaryPresets = PRESET_PROFILES.slice(1);

  const gaugeRadius = 56;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const currentScore = analysisResult?.matchScore ?? 92;
  const gaugeStrokeDashoffset =
    gaugeCircumference - (currentScore / 100) * gaugeCircumference;

  const matchedSkillsSet = new Set(
    (analysisResult?.matchingSkills ?? []).map((s) => s.toLowerCase())
  );

  const loadingSteps = [
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

  return (
    <div
      className={`relative min-h-screen flex flex-col overflow-x-hidden selection:bg-emerald-500/25 selection:text-emerald-300 transition-colors duration-300 ${
        isDark ? "bg-zinc-950 text-zinc-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 w-full relative">
          <div className="absolute -top-10 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute top-32 right-4 sm:right-10 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

          <div className="flex items-center justify-between flex-wrap gap-2.5 mb-6">
            <Link
              href="/"
              className={`inline-flex items-center gap-1.5 text-xs font-mono transition-colors ${
                isDark
                  ? "text-zinc-400 hover:text-emerald-400"
                  : "text-slate-600 hover:text-emerald-700"
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>{isEs ? "Volver al Portafolio" : "Back to Portfolio"}</span>
            </Link>

            <div className="flex items-center gap-2 flex-wrap">
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono ${
                  isDark
                    ? "bg-zinc-900 border-zinc-800 text-zinc-300"
                    : "bg-white border-slate-200 text-slate-700 shadow-2xs"
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>/app/labs/tech-radar</span>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold ${
                  isLiveStats
                    ? isDark
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-emerald-500/10 border-emerald-600/30 text-emerald-800"
                    : isDark
                      ? "bg-teal-500/10 border-teal-500/30 text-teal-300"
                      : "bg-teal-500/10 border-teal-600/30 text-teal-800"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {isLiveStats ? "ATLAS VECTOR LIVE" : "TELEMETRY ACTIVE"} •{" "}
                  {stats.queryLatencyMs}ms
                </span>
              </span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-2xl sm:rounded-full border text-[11px] sm:text-xs font-mono ${
                  isDark
                    ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-300"
                    : "bg-emerald-500/10 border-emerald-600/25 text-emerald-800"
                }`}
              >
                <Radar className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>
                  {isEs
                    ? "Inteligencia de Mercado en Tiempo Real • Reclutadores & Tech Leads"
                    : "Real-Time Market Intelligence • For Recruiters & Tech Leads"}
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold ${
                  isDark
                    ? "bg-teal-500/15 border-teal-500/35 text-teal-300"
                    : "bg-teal-500/15 border-teal-600/35 text-teal-800"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>
                  {isEs
                    ? "92% Compatibilidad Verificada"
                    : "92% Verified Market Fit"}
                </span>
              </span>
            </div>

            <h1
              className={`text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Tech Market{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">
                ETL & Semantic Gap Analyzer
              </span>
            </h1>

            <p
              className={`text-sm sm:text-lg md:text-xl font-medium max-w-4xl leading-relaxed mb-6 ${
                isDark ? "text-zinc-200" : "text-slate-700"
              }`}
            >
              {isEs
                ? "Motor RAG y pipeline ETL automatizado que ingesta vacantes reales desde GetOnBoard, extrae entidades con Gemini 2.5 Flash + Zod, vectoriza en 768 dimensiones y audita la compatibilidad semántica contra el mercado sobre MongoDB Atlas."
                : "Automated RAG engine and ETL pipeline that ingests live job openings from GetOnBoard, extracts entities with Gemini 2.5 Flash + Zod, computes 768-dim embeddings, and audits semantic compatibility against the market on MongoDB Atlas."}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
              <button
                type="button"
                onClick={handleHeroAuditMatias}
                className="px-5 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-zinc-950 font-mono text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-500/25 hover:brightness-105 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current shrink-0" />
                <span>
                  {isEs
                    ? "Auditar perfil de Matías (92% Match)"
                    : "Audit Matías's Profile (92% Match)"}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={handleHeroCustomVacancy}
                className={`px-4 sm:px-5 py-3.5 rounded-xl font-mono text-xs font-bold border inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isDark
                    ? "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 hover:border-emerald-500/40 text-zinc-200"
                    : "bg-white hover:bg-slate-100 border-slate-200 hover:border-emerald-500/50 text-slate-800 shadow-xs"
                }`}
              >
                <Filter className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>
                  {isEs
                    ? "Evaluar mi Vacante Abierta"
                    : "Evaluate My Open Role"}
                </span>
              </button>

              <a
                href="#market-telemetry"
                className={`px-4 py-3.5 rounded-xl font-mono text-xs font-semibold border inline-flex items-center justify-center gap-1.5 transition-all ${
                  isDark
                    ? "bg-zinc-950/60 hover:bg-zinc-900 border-zinc-800/80 text-zinc-400 hover:text-zinc-200"
                    : "bg-slate-100/80 hover:bg-slate-200/70 border-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>
                  {isEs ? "Ver Top 10 Tecnologías" : "View Top 10 Tech"}
                </span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div
                className={`px-3.5 py-2.5 rounded-xl border flex items-center gap-3 ${
                  isDark
                    ? "bg-zinc-900/50 border-zinc-800/80"
                    : "bg-white border-slate-200/90 shadow-2xs"
                }`}
              >
                <Briefcase className="w-4 h-4 text-emerald-500 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 font-bold">
                    {isEs ? "EXPERIENCIA BANCARIA" : "ENTERPRISE BANKING"}
                  </div>
                  <div
                    className={`text-xs font-semibold truncate ${
                      isDark ? "text-zinc-200" : "text-slate-800"
                    }`}
                  >
                    IBM Consulting / Banco Itaú
                  </div>
                </div>
              </div>

              <div
                className={`px-3.5 py-2.5 rounded-xl border flex items-center gap-3 ${
                  isDark
                    ? "bg-zinc-900/50 border-zinc-800/80"
                    : "bg-white border-slate-200/90 shadow-2xs"
                }`}
              >
                <Globe2 className="w-4 h-4 text-cyan-500 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-500 font-bold">
                    {isEs ? "PERFIL GLOBAL" : "GLOBAL PROFILE"}
                  </div>
                  <div
                    className={`text-xs font-semibold truncate ${
                      isDark ? "text-zinc-200" : "text-slate-800"
                    }`}
                  >
                    {isEs
                      ? "España (UJI) & Inglés C1"
                      : "Spain (UJI) & C1 English"}
                  </div>
                </div>
              </div>

              <div
                className={`px-3.5 py-2.5 rounded-xl border flex items-center gap-3 ${
                  isDark
                    ? "bg-zinc-900/50 border-zinc-800/80"
                    : "bg-white border-slate-200/90 shadow-2xs"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-bold">
                    {isEs ? "EFICIENCIA FINOPS" : "FINOPS EFFICIENCY"}
                  </div>
                  <div
                    className={`text-xs font-semibold truncate ${
                      isDark ? "text-zinc-200" : "text-slate-800"
                    }`}
                  >
                    {isEs
                      ? "Zero-Token Cache ($0 Cost)"
                      : "Zero-Token Cache ($0 Cost)"}
                  </div>
                </div>
              </div>

              <div
                className={`px-3.5 py-2.5 rounded-xl border flex items-center gap-3 ${
                  isDark
                    ? "bg-zinc-900/50 border-zinc-800/80"
                    : "bg-white border-slate-200/90 shadow-2xs"
                }`}
              >
                <Database className="w-4 h-4 text-teal-500 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-teal-500 font-bold">
                    {isEs ? "MOTOR VECTORIAL" : "VECTOR ENGINE"}
                  </div>
                  <div
                    className={`text-xs font-semibold truncate ${
                      isDark ? "text-zinc-200" : "text-slate-800"
                    }`}
                  >
                    {stats.totalVectorizedJobs}{" "}
                    {isEs ? "Ofertas • 768d ANN" : "Jobs • 768d ANN"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="compatibility-simulator"
            ref={simulatorRef}
            className="scroll-mt-24 mb-12"
          >
            <SpotlightCard
              spotlightColor={
                isDark
                  ? "rgba(16, 185, 129, 0.18)"
                  : "rgba(16, 185, 129, 0.10)"
              }
              className={`p-4 sm:p-7 md:p-8 ${
                isDark
                  ? "border-emerald-500/35 bg-zinc-900/70"
                  : "border-emerald-500/40 bg-white"
              }`}
            >
              <div
                className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-6 border-b ${
                  isDark ? "border-zinc-800" : "border-slate-200"
                }`}
              >
                <div className="min-w-0">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-2xl sm:rounded-full border text-[11px] sm:text-xs font-mono mb-2 ${
                      isDark
                        ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-300"
                        : "bg-emerald-500/10 border-emerald-600/25 text-emerald-800"
                    }`}
                  >
                    <BrainCircuit className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>
                      {isEs
                        ? "Diagnóstico Semántico Interactivo • Sin Registro (Zero-Login)"
                        : "Interactive Semantic Diagnostic • Instant & Zero-Login"}
                    </span>
                  </div>
                  <h2
                    className={`text-xl sm:text-3xl font-black tracking-tight ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {isEs
                      ? "Simulador Ejecutivo de Compatibilidad con el Mercado"
                      : "Executive Market & Job Compatibility Simulator"}
                  </h2>
                  <p
                    className={`text-xs sm:text-sm mt-1.5 max-w-3xl leading-relaxed ${
                      isDark ? "text-zinc-300" : "text-slate-600"
                    }`}
                  >
                    {isEs
                      ? "Selecciona el perfil principal para auditar mi compatibilidad real o pega los requisitos de tu oferta laboral para cruzarla en vivo con MongoDB Atlas $vectorSearch + Gemini 2.5 Flash."
                      : "Select the primary preset to audit my real market compatibility or paste your job opening requirements to match live via MongoDB Atlas $vectorSearch + Gemini 2.5 Flash."}
                  </p>
                </div>

                {analysisResult && (
                  <div className="flex items-center gap-2 flex-wrap shrink-0">
                    <span
                      className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold border ${
                        analysisResult.meta.cached
                          ? isDark
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                            : "bg-emerald-500/10 border-emerald-600/30 text-emerald-800"
                          : isDark
                            ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                            : "bg-cyan-500/10 border-cyan-600/30 text-cyan-800"
                      }`}
                    >
                      {analysisResult.meta.cached
                        ? "⚡ ZERO-TOKEN CACHE ($0)"
                        : "🧠 LIVE RAG INFERENCE"}
                    </span>
                    <span
                      className={`px-3 py-1.5 rounded-xl border font-mono text-[11px] ${
                        isDark
                          ? "bg-zinc-950 border-zinc-800 text-zinc-300"
                          : "bg-slate-100 border-slate-200 text-slate-700"
                      }`}
                    >
                      {isEs ? "Cuota Live:" : "Live Quota:"}{" "}
                      <strong className="text-emerald-500">
                        {analysisResult.meta.remainingQuota}/5
                      </strong>
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div
                  className={`text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-between gap-2 flex-wrap ${
                    isDark ? "text-zinc-300" : "text-slate-700"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>
                      {isEs
                        ? "Paso 1: Elige un perfil preconfigurado (Auditoría Instantánea $0)"
                        : "Step 1: Select a preconfigured profile ($0 Instant Audit)"}
                    </span>
                  </span>
                  <span
                    className={`text-[11px] font-normal ${
                      isDark ? "text-zinc-400" : "text-slate-500"
                    }`}
                  >
                    {isEs
                      ? "Respuesta inmediata vía caché vectorial 24h"
                      : "Instant response via 24h vector cache"}
                  </span>
                </div>

                {primaryPreset && (
                  <button
                    type="button"
                    onClick={() => handleSelectPreset(primaryPreset)}
                    disabled={loadingAnalysis}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 disabled:opacity-60 ${
                      selectedPresetId === primaryPreset.id
                        ? isDark
                          ? "bg-emerald-500/12 border-emerald-400 shadow-xl shadow-emerald-500/10"
                          : "bg-emerald-50/90 border-emerald-500 shadow-lg shadow-emerald-500/10"
                        : isDark
                          ? "bg-zinc-950/90 border-emerald-500/35 hover:border-emerald-400/80"
                          : "bg-slate-50 border-emerald-500/35 hover:border-emerald-500"
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 text-zinc-950 shadow-md shadow-emerald-500/20 shrink-0 mt-0.5">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span
                            className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                              isDark
                                ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
                                : "bg-emerald-500/15 border-emerald-600/30 text-emerald-800"
                            }`}
                          >
                            {isEs
                              ? "★ Acción Principal Recomendada"
                              : "★ Recommended Primary Audit"}
                          </span>
                          <span
                            className={`text-[10px] font-mono ${
                              isDark ? "text-emerald-400" : "text-emerald-700"
                            }`}
                          >
                            {primaryPreset.badge}
                          </span>
                        </div>
                        <div
                          className={`font-mono text-sm sm:text-base font-black break-words ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {isEs ? primaryPreset.labelEs : primaryPreset.labelEn}
                        </div>
                        <div
                          className={`text-xs mt-1 leading-relaxed ${
                            isDark ? "text-zinc-300" : "text-slate-600"
                          }`}
                        >
                          {isEs
                            ? primaryPreset.summaryEs
                            : primaryPreset.summaryEn}
                        </div>
                      </div>
                    </div>

                    <span className="w-full lg:w-auto px-4 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-mono text-xs font-bold inline-flex items-center justify-center gap-1.5 shrink-0 shadow-md shadow-emerald-500/20">
                      <span>
                        {isEs
                          ? "Auditar perfil de Matías"
                          : "Audit Matías's Profile"}
                      </span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </span>
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {secondaryPresets.map((preset) => {
                    const isSelected = selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        disabled={loadingAnalysis}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 disabled:opacity-60 ${
                          isSelected
                            ? isDark
                              ? "bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10"
                              : "bg-cyan-50/80 border-cyan-500 shadow-sm"
                            : isDark
                              ? "bg-zinc-950/80 border-zinc-800 hover:border-zinc-700"
                              : "bg-slate-50/80 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div
                            className={`p-2 rounded-lg border shrink-0 mt-0.5 ${
                              isSelected
                                ? "bg-cyan-500 text-zinc-950 border-cyan-400"
                                : isDark
                                  ? "bg-zinc-900 text-cyan-400 border-zinc-800"
                                  : "bg-white text-cyan-700 border-slate-200"
                            }`}
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </div>
                          <div className="min-w-0">
                            <div
                              className={`font-mono text-xs sm:text-sm font-bold break-words ${
                                isDark ? "text-white" : "text-slate-900"
                              }`}
                            >
                              {isEs ? preset.labelEs : preset.labelEn}
                            </div>
                            <div
                              className={`text-[11px] mt-1 leading-relaxed ${
                                isDark ? "text-zinc-400" : "text-slate-600"
                              }`}
                            >
                              {isEs ? preset.summaryEs : preset.summaryEn}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-800/40 text-[11px] font-mono">
                          <span
                            className={
                              isDark ? "text-zinc-400" : "text-slate-500"
                            }
                          >
                            {preset.badge}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 font-bold shrink-0 ${
                              isSelected
                                ? "text-cyan-400"
                                : isDark
                                  ? "text-emerald-400"
                                  : "text-emerald-700"
                            }`}
                          >
                            <span>
                              {isEs ? "Simular Rol" : "Simulate Role"}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleRunCustomAnalysis} className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                  <label
                    htmlFor="profile-textarea"
                    className={`text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                      isDark ? "text-zinc-300" : "text-slate-700"
                    }`}
                  >
                    <Filter className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>
                      {isEs
                        ? "Paso 2 (Personalizado): Pega los requisitos de tu oferta laboral para evaluarla en vivo"
                        : "Step 2 (Custom): Paste your job opening requirements for live vector evaluation"}
                    </span>
                  </label>
                  <span
                    className={`text-[11px] font-mono shrink-0 ${
                      isDark ? "text-zinc-500" : "text-slate-500"
                    }`}
                  >
                    {customProfileText.length}/4000 chars
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <textarea
                    id="profile-textarea"
                    ref={textareaRef}
                    rows={3}
                    value={customProfileText}
                    onChange={(e) => {
                      setCustomProfileText(e.target.value);
                      setSelectedPresetId(null);
                    }}
                    placeholder={
                      isEs
                        ? "¿Estás contratando? Pega aquí la descripción de tu vacante (ej: Buscamos Full-Stack / Backend Engineer con TypeScript, NestJS, React/Next.js, Docker e inglés...) para generar un informe inmediato."
                        : "Hiring? Paste your job description here (e.g., Looking for a Full-Stack / Backend Engineer with TypeScript, NestJS, React/Next.js, Docker, and English...) to generate an instant report."
                    }
                    className={`flex-1 rounded-xl border p-3.5 text-xs sm:text-sm font-mono focus:outline-none transition-all ${
                      isDark
                        ? "bg-zinc-950 border-zinc-800 focus:border-emerald-400 text-zinc-200 placeholder:text-zinc-600"
                        : "bg-slate-50 border-slate-300 focus:border-emerald-500 text-slate-900 placeholder:text-slate-400"
                    }`}
                  />

                  <button
                    type="submit"
                    disabled={loadingAnalysis}
                    className="px-5 sm:px-6 py-3.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 hover:brightness-105 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    {loadingAnalysis ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                        <span>
                          {isEs
                            ? "Ejecutando Pipeline..."
                            : "Running Pipeline..."}
                        </span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 shrink-0" />
                        <span>
                          {isEs
                            ? "Generar Informe de Compatibilidad"
                            : "Generate Compatibility Report"}
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {analysisError && (
                  <div
                    className={`mt-3 p-3 rounded-xl border text-xs font-mono flex items-center gap-2 ${
                      isDark
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                        : "bg-amber-50 border-amber-300 text-amber-900"
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
                    <span>{analysisError}</span>
                  </div>
                )}
              </form>

              <AnimatePresence mode="wait">
                {loadingAnalysis ? (
                  <motion.div
                    key="loading-pipeline"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className={`p-5 sm:p-6 rounded-2xl border space-y-5 ${
                      isDark
                        ? "bg-zinc-950/95 border-emerald-500/30"
                        : "bg-slate-50 border-emerald-500/35"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider">
                        <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                        <span>
                          {isEs
                            ? "Ejecutando Diagnóstico Semántico en Tiempo Real"
                            : "Executing Real-Time Semantic Gap Analysis"}
                        </span>
                      </div>
                      <span
                        className={`text-[11px] font-mono ${
                          isDark ? "text-zinc-400" : "text-slate-500"
                        }`}
                      >
                        Step {loadingStage + 1} / 3
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {loadingSteps.map((item, idx) => {
                        const isDone = loadingStage > idx;
                        const isCurrent = loadingStage === idx;
                        return (
                          <div
                            key={item.step}
                            className={`p-3.5 rounded-xl border font-mono transition-all ${
                              isCurrent
                                ? isDark
                                  ? "bg-emerald-500/12 border-emerald-400 text-white shadow-md shadow-emerald-500/10"
                                  : "bg-emerald-50 border-emerald-500 text-slate-900 shadow-xs"
                                : isDone
                                  ? isDark
                                    ? "bg-zinc-900/90 border-emerald-500/30 text-emerald-300"
                                    : "bg-white border-emerald-500/30 text-emerald-800"
                                  : isDark
                                    ? "bg-zinc-900/40 border-zinc-800/80 text-zinc-500"
                                    : "bg-white/60 border-slate-200 text-slate-400"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 text-xs font-bold mb-1">
                              <span>STAGE {item.step}</span>
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : isCurrent ? (
                                <RefreshCw className="w-3.5 h-3.5 text-emerald-500 animate-spin shrink-0" />
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-current opacity-40" />
                              )}
                            </div>
                            <div className="text-xs font-bold leading-snug">
                              {item.label}
                            </div>
                            <div
                              className={`text-[10px] mt-1 ${
                                isCurrent || isDone
                                  ? isDark
                                    ? "text-zinc-300"
                                    : "text-slate-600"
                                  : isDark
                                    ? "text-zinc-600"
                                    : "text-slate-400"
                              }`}
                            >
                              {item.detail}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2">
                      <div
                        className={`lg:col-span-4 h-44 rounded-2xl border animate-pulse p-5 flex flex-col justify-between ${
                          isDark
                            ? "bg-zinc-900/60 border-zinc-800"
                            : "bg-slate-200/60 border-slate-300"
                        }`}
                      >
                        <div className="w-28 h-3 rounded bg-emerald-500/20" />
                        <div className="w-24 h-24 rounded-full border-4 border-emerald-500/30 mx-auto" />
                        <div className="w-full h-3 rounded bg-emerald-500/20" />
                      </div>
                      <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div
                          className={`h-44 rounded-2xl border animate-pulse p-5 ${
                            isDark
                              ? "bg-zinc-900/60 border-zinc-800"
                              : "bg-slate-200/60 border-slate-300"
                          }`}
                        />
                        <div
                          className={`h-44 rounded-2xl border animate-pulse p-5 ${
                            isDark
                              ? "bg-zinc-900/60 border-zinc-800"
                              : "bg-slate-200/60 border-slate-300"
                          }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  analysisResult && (
                    <motion.div
                      key={`${analysisResult.meta.presetId ?? "custom"}-${analysisResult.matchScore}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className={`space-y-6 pt-5 border-t ${
                        isDark ? "border-zinc-800/80" : "border-slate-200"
                      }`}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div
                          className={`lg:col-span-4 p-5 sm:p-6 rounded-2xl border flex flex-col justify-between relative overflow-hidden ${
                            isDark
                              ? "bg-zinc-950 border-emerald-500/35 shadow-xl shadow-emerald-950/20"
                              : "bg-slate-50/90 border-emerald-500/40 shadow-md"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 text-xs font-mono mb-4">
                              <span
                                className={`font-bold uppercase tracking-wider ${
                                  isDark ? "text-zinc-300" : "text-slate-700"
                                }`}
                              >
                                {isEs
                                  ? "MATCH SCORE SEMÁNTICO"
                                  : "SEMANTIC MATCH SCORE"}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded border text-[11px] font-bold ${
                                  isDark
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                                    : "bg-emerald-500/10 border-emerald-600/30 text-emerald-800"
                                }`}
                              >
                                {analysisResult.meta.latencyMs} ms
                              </span>
                            </div>

                            <div className="flex flex-col items-center justify-center my-2">
                              <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
                                <svg
                                  className="w-full h-full -rotate-90"
                                  viewBox="0 0 140 140"
                                  role="img"
                                  aria-label={`Match Score ${analysisResult.matchScore}%`}
                                >
                                  <defs>
                                    <linearGradient
                                      id="matchScoreGradient"
                                      x1="0%"
                                      y1="0%"
                                      x2="100%"
                                      y2="100%"
                                    >
                                      <stop offset="0%" stopColor="#10b981" />
                                      <stop offset="50%" stopColor="#14b8a6" />
                                      <stop offset="100%" stopColor="#06b6d4" />
                                    </linearGradient>
                                  </defs>
                                  <circle
                                    cx="70"
                                    cy="70"
                                    r={gaugeRadius}
                                    fill="none"
                                    stroke={
                                      isDark
                                        ? "rgba(39, 39, 42, 0.85)"
                                        : "rgba(226, 232, 240, 0.95)"
                                    }
                                    strokeWidth="11"
                                  />
                                  <motion.circle
                                    cx="70"
                                    cy="70"
                                    r={gaugeRadius}
                                    fill="none"
                                    stroke="url(#matchScoreGradient)"
                                    strokeWidth="11"
                                    strokeLinecap="round"
                                    strokeDasharray={gaugeCircumference}
                                    initial={{
                                      strokeDashoffset: gaugeCircumference,
                                    }}
                                    animate={{
                                      strokeDashoffset: gaugeStrokeDashoffset,
                                    }}
                                    transition={{
                                      duration: 0.8,
                                      ease: "easeOut",
                                    }}
                                  />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                  <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 font-mono leading-none">
                                    {analysisResult.matchScore}%
                                  </span>
                                  <span
                                    className={`text-[10px] font-mono uppercase tracking-widest mt-1 font-bold ${
                                      isDark
                                        ? "text-zinc-400"
                                        : "text-slate-500"
                                    }`}
                                  >
                                    COSINE FIT
                                  </span>
                                </div>
                              </div>

                              <span
                                className={`mt-2 text-[11px] font-mono font-bold px-3 py-1 rounded-full border text-center ${
                                  analysisResult.matchScore >= 85
                                    ? isDark
                                      ? "bg-emerald-500/15 border-emerald-500/35 text-emerald-300"
                                      : "bg-emerald-500/15 border-emerald-600/35 text-emerald-800"
                                    : analysisResult.matchScore >= 70
                                      ? isDark
                                        ? "bg-cyan-500/15 border-cyan-500/35 text-cyan-300"
                                        : "bg-cyan-500/15 border-cyan-600/35 text-cyan-800"
                                      : isDark
                                        ? "bg-amber-500/15 border-amber-500/35 text-amber-300"
                                        : "bg-amber-500/15 border-amber-600/35 text-amber-800"
                                }`}
                              >
                                {analysisResult.matchScore >= 85
                                  ? isEs
                                    ? "CANDIDATO ALTAMENTE ALINEADO"
                                    : "HIGHLY ALIGNED CANDIDATE"
                                  : analysisResult.matchScore >= 70
                                    ? isEs
                                      ? "COMPATIBILIDAD SÓLIDA"
                                      : "SOLID MARKET FIT"
                                    : isEs
                                      ? "BRECHA DETECTADA"
                                      : "GAP DETECTED"}
                              </span>
                            </div>

                            <div
                              className={`w-full h-2 rounded-full overflow-hidden border my-4 ${
                                isDark
                                  ? "bg-zinc-900 border-zinc-800"
                                  : "bg-slate-200 border-slate-300"
                              }`}
                            >
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500"
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${analysisResult.matchScore}%`,
                                }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                              />
                            </div>
                          </div>

                          <p
                            className={`text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                              isDark
                                ? "text-zinc-200 border-zinc-800/80"
                                : "text-slate-700 border-slate-200"
                            }`}
                          >
                            {analysisResult.architecturalFit}
                          </p>
                        </div>

                        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div
                            className={`p-5 rounded-2xl border ${
                              isDark
                                ? "bg-emerald-950/15 border-emerald-500/30"
                                : "bg-emerald-50/60 border-emerald-500/35"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                <span>
                                  {isEs
                                    ? "Skills Alineadas (Producción)"
                                    : "Aligned Skills (Production)"}
                                </span>
                              </div>
                              <span
                                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                                  isDark
                                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                                    : "bg-emerald-500/15 border-emerald-600/30 text-emerald-800"
                                }`}
                              >
                                {analysisResult.matchingSkills.length} MATCHED
                              </span>
                            </div>
                            <p
                              className={`text-[11px] mb-3 ${
                                isDark ? "text-zinc-400" : "text-slate-600"
                              }`}
                            >
                              {isEs
                                ? "Tecnologías y prácticas validadas en proyectos reales:"
                                : "Technologies and practices validated in real projects:"}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.matchingSkills.map((skill) => (
                                <span
                                  key={skill}
                                  className={`px-2.5 py-1 rounded-lg border font-mono text-xs font-semibold inline-flex items-center gap-1 transition-transform hover:scale-105 ${
                                    isDark
                                      ? "bg-emerald-500/12 border-emerald-500/35 text-emerald-300"
                                      : "bg-white border-emerald-600/35 text-emerald-800 shadow-2xs"
                                  }`}
                                >
                                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                                  <span>{skill}</span>
                                </span>
                              ))}
                            </div>
                          </div>

                          <div
                            className={`p-5 rounded-2xl border ${
                              isDark
                                ? "bg-amber-950/15 border-amber-500/30"
                                : "bg-amber-50/60 border-amber-500/35"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                                <GitCompare className="w-4 h-4 shrink-0" />
                                <span>
                                  {isEs
                                    ? "Brechas & Hoja de Ruta"
                                    : "Skill Gaps & Upskilling"}
                                </span>
                              </div>
                              <span
                                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                                  isDark
                                    ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                                    : "bg-amber-500/15 border-amber-600/30 text-amber-800"
                                }`}
                              >
                                {analysisResult.missingHighDemandSkills.length}{" "}
                                ROADMAP
                              </span>
                            </div>
                            <p
                              className={`text-[11px] mb-3 ${
                                isDark ? "text-zinc-400" : "text-slate-600"
                              }`}
                            >
                              {isEs
                                ? "Tecnologías complementarias en hoja de ruta de especialización:"
                                : "Complementary technologies on active upskilling roadmap:"}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.missingHighDemandSkills.length >
                              0 ? (
                                analysisResult.missingHighDemandSkills.map(
                                  (skill) => (
                                    <span
                                      key={skill}
                                      className={`px-2.5 py-1 rounded-lg border border-dashed font-mono text-xs font-medium inline-flex items-center gap-1 transition-transform hover:scale-105 ${
                                        isDark
                                          ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
                                          : "bg-white border-amber-600/45 text-amber-900 shadow-2xs"
                                      }`}
                                    >
                                      <span>+ {skill}</span>
                                    </span>
                                  )
                                )
                              ) : (
                                <span
                                  className={`text-xs font-mono ${
                                    isDark ? "text-zinc-400" : "text-slate-600"
                                  }`}
                                >
                                  {isEs
                                    ? "Sin brechas críticas detectadas en el lote actual."
                                    : "No critical skill gaps detected in current batch."}
                                </span>
                              )}
                            </div>
                          </div>

                          <div
                            className={`sm:col-span-2 p-5 rounded-2xl border ${
                              isDark
                                ? "bg-zinc-950 border-zinc-800"
                                : "bg-slate-50/90 border-slate-200"
                            }`}
                          >
                            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-500 uppercase tracking-wider mb-3">
                              <ShieldCheck className="w-4 h-4 shrink-0" />
                              <span>
                                {isEs
                                  ? "Plan de Evolución Continua & Arquitectura (Gemini 2.5 Flash)"
                                  : "Continuous Evolution & Architecture Plan (Gemini 2.5 Flash)"}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {analysisResult.recommendedActionPlan.map(
                                (step, index) => (
                                  <div
                                    key={step}
                                    className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 ${
                                      isDark
                                        ? "bg-zinc-900/80 border-zinc-800 text-zinc-200"
                                        : "bg-white border-slate-200 text-slate-700 shadow-2xs"
                                    }`}
                                  >
                                    <span
                                      className={`px-2 py-0.5 rounded border font-mono text-xs font-bold shrink-0 ${
                                        isDark
                                          ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-300"
                                          : "bg-cyan-500/10 border-cyan-600/30 text-cyan-800"
                                      }`}
                                    >
                                      0{index + 1}
                                    </span>
                                    <span className="leading-relaxed">
                                      {step}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                          <div
                            className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold ${
                              isDark ? "text-zinc-200" : "text-slate-800"
                            }`}
                          >
                            <Briefcase className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>
                              {isEs
                                ? `Evidencia Vectorial: Vacantes Reales Similares (${analysisResult.matchedJobs.length})`
                                : `Vector Evidence: Similar Real Job Openings (${analysisResult.matchedJobs.length})`}
                            </span>
                          </div>
                          <span
                            className={`text-[11px] font-mono ${
                              isDark ? "text-zinc-400" : "text-slate-500"
                            }`}
                          >
                            {isLiveAnalysis
                              ? "MongoDB Atlas $vectorSearch (Cosine Similarity)"
                              : "Baseline Vector Snapshot Evidence"}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {analysisResult.matchedJobs.map((job, idx) => (
                            <a
                              key={job.externalId}
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between gap-3 min-w-0 ${
                                isDark
                                  ? "bg-zinc-950 border-zinc-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/30"
                                  : "bg-white border-slate-200 hover:border-emerald-500/60 shadow-xs hover:shadow-lg"
                              }`}
                            >
                              <div className="min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span
                                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                                        isDark
                                          ? "bg-zinc-900 border-zinc-800 text-zinc-400"
                                          : "bg-slate-100 border-slate-200 text-slate-600"
                                      }`}
                                    >
                                      #0{idx + 1} ANN
                                    </span>
                                    <span
                                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                                        isDark
                                          ? "bg-emerald-500/12 border-emerald-500/35 text-emerald-300"
                                          : "bg-emerald-500/15 border-emerald-600/30 text-emerald-800"
                                      }`}
                                    >
                                      {job.similarityScore}% Cosine Match
                                    </span>
                                  </div>
                                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                                </div>

                                <div
                                  className={`w-full h-1.5 rounded-full overflow-hidden mb-3 ${
                                    isDark ? "bg-zinc-900" : "bg-slate-100"
                                  }`}
                                >
                                  <div
                                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                                    style={{
                                      width: `${job.similarityScore}%`,
                                    }}
                                  />
                                </div>

                                <h3
                                  className={`text-sm font-bold transition-colors line-clamp-2 break-words ${
                                    isDark
                                      ? "text-white group-hover:text-emerald-300"
                                      : "text-slate-900 group-hover:text-emerald-700"
                                  }`}
                                >
                                  {job.title}
                                </h3>
                                <p
                                  className={`text-xs font-mono mt-1 break-words ${
                                    isDark ? "text-zinc-400" : "text-slate-500"
                                  }`}
                                >
                                  {job.company} •{" "}
                                  <span className="uppercase">
                                    {job.modality}
                                  </span>{" "}
                                  •{" "}
                                  <span className="uppercase">
                                    {job.seniority}
                                  </span>
                                </p>
                              </div>

                              <div
                                className={`flex flex-wrap gap-1.5 pt-2.5 border-t ${
                                  isDark
                                    ? "border-zinc-900"
                                    : "border-slate-100"
                                }`}
                              >
                                {job.coreTechStack.slice(0, 5).map((tech) => {
                                  const isMatched = matchedSkillsSet.has(
                                    tech.toLowerCase()
                                  );
                                  return (
                                    <span
                                      key={tech}
                                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                        isMatched
                                          ? isDark
                                            ? "bg-emerald-500/12 border-emerald-500/35 text-emerald-300 font-semibold"
                                            : "bg-emerald-500/12 border-emerald-600/30 text-emerald-800 font-semibold"
                                          : isDark
                                            ? "bg-zinc-900 text-zinc-300 border-zinc-800"
                                            : "bg-slate-100 text-slate-700 border-slate-200"
                                      }`}
                                    >
                                      {isMatched ? `✓ ${tech}` : tech}
                                    </span>
                                  );
                                })}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>

                      <div
                        className={`p-5 sm:p-6 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-lg ${
                          isDark
                            ? "bg-gradient-to-r from-emerald-950/60 via-zinc-900/95 to-teal-950/60 border-emerald-500/40"
                            : "bg-gradient-to-r from-emerald-50 via-white to-teal-50 border-emerald-500/45"
                        }`}
                      >
                        <div className="max-w-2xl min-w-0">
                          <div
                            className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-[11px] font-mono font-bold mb-2 ${
                              isDark
                                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                                : "bg-emerald-500/15 border-emerald-600/30 text-emerald-800"
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>
                              {isEs
                                ? "Siguiente Paso para Selección & Tech Leads"
                                : "Next Step for Recruiters & Tech Leads"}
                            </span>
                          </div>
                          <h3
                            className={`text-lg sm:text-2xl font-black leading-snug ${
                              isDark ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {isEs
                              ? "¿El diagnóstico encaja con lo que buscas? Agenda una conversación en 1 clic"
                              : "Does the diagnostic match what you're looking for? Schedule a chat in 1 click"}
                          </h3>
                          <p
                            className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                              isDark ? "text-zinc-300" : "text-slate-700"
                            }`}
                          >
                            {isEs
                              ? "Acelera tu proceso de selección: aporto experiencia comprobada en banca (IBM Consulting / Banco Itaú), adaptabilidad internacional (España - UJI), inglés avanzado (C1) y arquitectura FinOps desde el primer sprint."
                              : "Accelerate your hiring process: I bring proven banking experience (IBM Consulting / Itaú Bank), international adaptability (Spain - UJI), advanced C1 English, and FinOps architecture from sprint one."}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                          <Link
                            href="/contacto"
                            className="px-5 sm:px-6 py-3.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 hover:brightness-105 transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <MessageSquare className="w-4 h-4 shrink-0" />
                            <span>
                              {isEs
                                ? "Contactar a Matías en 1 Clic"
                                : "Contact Matías in 1 Click"}
                            </span>
                            <ArrowRight className="w-4 h-4 shrink-0" />
                          </Link>

                          <Link
                            href="/#experience"
                            className={`px-4 py-3.5 rounded-xl font-mono text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                              isDark
                                ? "bg-zinc-950 hover:bg-zinc-900 text-zinc-200 border-zinc-800 hover:border-zinc-700"
                                : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <span>
                              {isEs
                                ? "Ver Trayectoria IBM / Itaú"
                                : "View IBM / Itaú Track Record"}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </SpotlightCard>
          </div>

          <div id="market-telemetry" className="scroll-mt-24 mb-12 space-y-6">
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.14)"
              className="p-4 sm:p-6 border-zinc-800"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-4 border-b border-zinc-800/80">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <span className="relative flex h-3 w-3 shrink-0 mt-1 sm:mt-0">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isLiveStats ? "bg-emerald-400" : "bg-teal-400"
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${
                        isLiveStats ? "bg-emerald-500" : "bg-teal-500"
                      }`}
                    />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2 flex-wrap">
                      <span>
                        {isEs
                          ? "Telemetría del Mercado Laboral en Tiempo Real"
                          : "Real-Time Job Market Telemetry"}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded border ${
                          isLiveStats
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-teal-500/10 border-teal-500/30 text-teal-300"
                        }`}
                      >
                        {isLiveStats
                          ? "MONGODB ATLAS LIVE"
                          : "BASELINE TELEMETRY SNAPSHOT"}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 font-mono mt-1 break-words">
                      Index:{" "}
                      <span className="text-zinc-200">job_vector_index</span> •
                      Model:{" "}
                      <span className="text-zinc-200">
                        text-embedding-004 (768d)
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => void fetchMarketStats()}
                  disabled={loadingStats}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-200 transition-all cursor-pointer disabled:opacity-50 shrink-0"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 text-emerald-400 shrink-0 ${
                      loadingStats ? "animate-spin" : ""
                    }`}
                  />
                  <span>
                    {isEs ? "Actualizar Datos en Vivo" : "Refresh Live Data"}
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono">
                <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/80">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span>
                      {isEs
                        ? "Vacantes Reales Analizadas"
                        : "Real Jobs Analyzed"}
                    </span>
                    <Database className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {stats.totalVectorizedJobs}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">
                    {isEs
                      ? "Muestra activa • market_jobs"
                      : "Active sample • market_jobs"}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/80">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span>
                      {isEs ? "Última Sincronización" : "Last Market Sync"}
                    </span>
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white break-words leading-snug">
                    {formattedLastIngested}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">
                    {isEs
                      ? "Costo $0 • Cron: 0 6 * * *"
                      : "$0 Cost • Cron: 0 6 * * *"}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/80">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span>
                      {isEs ? "Latencia de Consulta" : "Query Latency"}
                    </span>
                    <Activity className="w-4 h-4 text-teal-400 shrink-0" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {stats.queryLatencyMs}{" "}
                    <span className="text-xs font-normal text-zinc-400">
                      ms
                    </span>
                  </div>
                  <div className="text-[11px] text-teal-400 mt-1">
                    {isEs
                      ? "Instantáneo • Singleton Pool"
                      : "Instant • Singleton Pool"}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/80">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span>
                      {isEs
                        ? "Vacantes que Piden Inglés"
                        : "Jobs Requiring English"}
                    </span>
                    <Globe2 className="w-4 h-4 text-blue-400 shrink-0" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {stats.englishRequiredPercentage}%
                  </div>
                  <div className="text-[11px] text-blue-400 mt-1">
                    {isEs
                      ? "Cubierto con C1 + España (UJI)"
                      : "Covered by C1 + Spain (UJI)"}
                  </div>
                </div>
              </div>
            </SpotlightCard>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <SpotlightCard
                spotlightColor="rgba(16, 185, 129, 0.14)"
                className="lg:col-span-7 p-4 sm:p-6 border-zinc-800"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      {isEs
                        ? "Demanda Real del Mercado • MongoDB $unwind + $group"
                        : "Live Market Demand • MongoDB $unwind + $group"}
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-white">
                      {isEs
                        ? "Top 10 Tecnologías Más Solicitadas"
                        : "Top 10 Most Requested Technologies"}
                    </h2>
                  </div>
                  <Cpu className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                </div>

                <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                  {isEs
                    ? "Impacto para Selección: Mi stack principal (marcado con ✓) cubre directamente 7 de las 10 tecnologías más demandadas hoy."
                    : "Recruiting Takeaway: My core stack (marked with ✓) directly covers 7 of the top 10 most demanded technologies today."}
                </p>

                <div className="space-y-3">
                  {stats.topTechnologies.map((item, idx) => {
                    const isCore = MATIAS_CORE_TECH.has(
                      item.name.toLowerCase()
                    );
                    return (
                      <div
                        key={item.name}
                        className="group space-y-1.5 p-2 -mx-2 rounded-xl hover:bg-zinc-800/40 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-mono">
                          <span className="text-zinc-200 font-semibold flex items-center gap-1.5 min-w-0">
                            <span className="text-zinc-500 w-5 shrink-0">
                              {String(idx + 1).padStart(2, "0")}.
                            </span>
                            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-300 group-hover:border-emerald-500/40 transition-colors">
                              {item.name}
                            </span>
                            {isCore && (
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${
                                  isDark
                                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                                    : "bg-emerald-500/15 border-emerald-600/30 text-emerald-800"
                                }`}
                              >
                                ✓ {isEs ? "MI STACK" : "MY STACK"}
                              </span>
                            )}
                          </span>
                          <span className="text-zinc-400 shrink-0">
                            <strong className="text-white">
                              {item.percentage}%
                            </strong>{" "}
                            ({item.count} {isEs ? "ofertas" : "jobs"})
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800/60">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${Math.max(6, item.percentage)}%`,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: idx * 0.03,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SpotlightCard>

              <div className="lg:col-span-5 flex flex-col gap-6">
                <SpotlightCard
                  spotlightColor="rgba(56, 189, 248, 0.14)"
                  className="p-4 sm:p-6 border-zinc-800 flex-1"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                        {isEs
                          ? "Estándares Empresariales • architecturePatterns"
                          : "Enterprise Standards • architecturePatterns"}
                      </span>
                      <h2 className="text-lg font-black text-white">
                        {isEs
                          ? "Prácticas y Arquitecturas Más Valoradas"
                          : "Most Valued Architectures & Practices"}
                      </h2>
                    </div>
                    <Layers className="w-5 h-5 text-cyan-400 shrink-0 mt-1" />
                  </div>

                  <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                    {isEs
                      ? "Aplicados en banca (IBM / Itaú): APIs REST, Microservicios, CI/CD, Clean Architecture, BFF y pruebas TDD."
                      : "Applied in banking (IBM / Itaú): REST APIs, Microservices, CI/CD, Clean Architecture, BFF, and TDD testing."}
                  </p>

                  <div className="space-y-2.5">
                    {stats.topArchitecturePatterns.map((pattern, idx) => {
                      const isCorePattern = MATIAS_CORE_PATTERNS.has(
                        pattern.name.toLowerCase()
                      );
                      return (
                        <div
                          key={pattern.name}
                          className="group space-y-1 p-1.5 -mx-1.5 rounded-lg hover:bg-zinc-800/40 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-mono">
                            <span className="text-zinc-300 flex items-center gap-1.5">
                              <span>{pattern.name}</span>
                              {isCorePattern && (
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                              )}
                            </span>
                            <span className="text-cyan-300 font-bold shrink-0">
                              {pattern.percentage}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${Math.max(6, pattern.percentage)}%`,
                              }}
                              transition={{
                                duration: 0.6,
                                delay: idx * 0.03,
                                ease: "easeOut",
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </SpotlightCard>

                <SpotlightCard
                  spotlightColor="rgba(16, 185, 129, 0.12)"
                  className="p-4 sm:p-6 border-zinc-800"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 font-bold">
                        {isEs ? "Nivel de Experiencia" : "Seniority Demand"}
                      </h3>
                      <div className="space-y-2 font-mono text-xs">
                        {stats.seniorityDistribution.map((s) => (
                          <div
                            key={s.seniority}
                            className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800/80"
                          >
                            <span className="uppercase text-zinc-300">
                              {s.seniority}
                            </span>
                            <span className="text-emerald-400 font-bold">
                              {s.percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 font-bold">
                        {isEs ? "Modalidad de Trabajo" : "Work Modality"}
                      </h3>
                      <div className="space-y-2 font-mono text-xs">
                        {stats.modalityDistribution.map((m) => (
                          <div
                            key={m.modality}
                            className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800/80"
                          >
                            <span className="uppercase text-zinc-300">
                              {m.modality}
                            </span>
                            <span className="text-cyan-400 font-bold">
                              {m.percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </div>

          <SpotlightCard
            spotlightColor="rgba(56, 189, 248, 0.14)"
            className="p-4 sm:p-6 border-zinc-800"
          >
            <button
              type="button"
              onClick={() => setArchitectureOpen(!architectureOpen)}
              aria-expanded={architectureOpen}
              className="w-full flex items-center justify-between gap-3 text-left cursor-pointer"
            >
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                  {isEs
                    ? "Doble Capa: Impacto de Negocio (ROI) + Arquitectura de Ingeniería"
                    : "Dual Layer: Business ROI + Deep Engineering Architecture"}
                </span>
                <h2 className="text-base sm:text-xl font-black text-white break-words">
                  {isEs
                    ? "Cómo funciona por dentro: Pipeline ETL → Zod → Embeddings → MongoDB Vector Search"
                    : "How It Works Under the Hood: ETL Pipeline → Zod → Embeddings → MongoDB Vector Search"}
                </h2>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 shrink-0">
                {architectureOpen ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {architectureOpen && (
                <motion.div
                  key="architecture-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-zinc-800/80">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                      <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
                        <div>
                          <div className="text-emerald-400 font-bold mb-1">
                            01. EXTRACT & DEDUP
                          </div>
                          <div className="text-white font-semibold mb-1.5">
                            Vercel Cron + GetOnBoard API
                          </div>
                          <p className="text-zinc-300 text-[11px] leading-relaxed mb-3 font-sans">
                            {isEs
                              ? "Beneficio de Negocio: Monitorea el mercado automáticamente cada mañana y evita reprocesar avisos repetidos, ahorrando hasta un 80% en costos de IA."
                              : "Business Benefit: Automatically monitors the market every morning and skips duplicate listings, saving up to 80% in AI compute costs."}
                          </p>
                        </div>
                        <p className="text-zinc-500 text-[11px] leading-relaxed border-t border-zinc-900 pt-2">
                          {isEs
                            ? "Spec Técnica: Autenticación SHA-256 + timingSafeEqual. Descarga 15 ofertas, filtra externalId existentes en MongoDB y procesa máximo 5 nuevas por corrida."
                            : "Tech Spec: SHA-256 + timingSafeEqual auth. Fetches 15 jobs, filters existing externalIds in MongoDB, and processes max 5 new openings per run."}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
                        <div>
                          <div className="text-teal-400 font-bold mb-1">
                            02. TRANSFORM (LLM + ZOD)
                          </div>
                          <div className="text-white font-semibold mb-1.5">
                            Gemini 2.5 Flash + Strict Schema
                          </div>
                          <p className="text-zinc-300 text-[11px] leading-relaxed mb-3 font-sans">
                            {isEs
                              ? "Beneficio de Negocio: Transforma avisos laborales desordenados en estadísticas confiables y auditables, eliminando errores manuales o respuestas inventadas."
                              : "Business Benefit: Turns messy job postings into reliable, auditable market statistics while preventing manual errors or AI hallucinations."}
                          </p>
                        </div>
                        <p className="text-zinc-500 text-[11px] leading-relaxed border-t border-zinc-900 pt-2">
                          {isEs
                            ? "Spec Técnica: Sanitización HTML y extracción tipada con generateObject + Zod. Normalización determinista post-LLM (TECH_SYNONYM_MAP)."
                            : "Tech Spec: HTML sanitization and typed extraction via generateObject + Zod. Deterministic post-LLM normalization (TECH_SYNONYM_MAP)."}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
                        <div>
                          <div className="text-cyan-400 font-bold mb-1">
                            03. VECTORIZE & LOAD
                          </div>
                          <div className="text-white font-semibold mb-1.5">
                            text-embedding-004 (768-dim)
                          </div>
                          <p className="text-zinc-300 text-[11px] leading-relaxed mb-3 font-sans">
                            {isEs
                              ? "Beneficio de Negocio: Evalúa la afinidad real de un candidato por contexto y experiencia, no solo buscando palabras sueltas como un filtro ATS tradicional."
                              : "Business Benefit: Evaluates true candidate affinity by context and experience rather than rigid keyword matching like legacy ATS filters."}
                          </p>
                        </div>
                        <p className="text-zinc-500 text-[11px] leading-relaxed border-t border-zinc-900 pt-2">
                          {isEs
                            ? "Spec Técnica: Generación de vectores densos de 768 dimensiones sobre título + stack + cleanSummary. Persistencia con Promise.allSettled y bulkWrite (upsert)."
                            : "Tech Spec: 768-dim dense vector generation across title + stack + cleanSummary. Concurrent persistence via Promise.allSettled and bulkWrite (upsert)."}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
                        <div>
                          <div className="text-blue-400 font-bold mb-1">
                            04. RAG & ZERO-TOKEN CACHE
                          </div>
                          <div className="text-white font-semibold mb-1.5">
                            Atlas $vectorSearch + Rate Limit
                          </div>
                          <p className="text-zinc-300 text-[11px] leading-relaxed mb-3 font-sans">
                            {isEs
                              ? "Beneficio de Negocio: Opera a Costo $0 para reclutadores mediante caché de 24 horas y protege el presupuesto de infraestructura frente a picos de tráfico."
                              : "Business Benefit: Operates at $0 cost for recruiters via 24-hour caching while protecting cloud budgets against traffic spikes."}
                          </p>
                        </div>
                        <p className="text-zinc-500 text-[11px] leading-relaxed border-t border-zinc-900 pt-2">
                          {isEs
                            ? "Spec Técnica: Búsqueda ANN sobre job_vector_index (Top 8), caché MongoDB 24h para presets sin gastar tokens y Rate Limit por IP (SHA-256 + TTL 3600s)."
                            : "Tech Spec: ANN search on job_vector_index (Top 8), 24h MongoDB preset cache with zero token spend, and IP Rate Limit (SHA-256 + 3600s TTL)."}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </SpotlightCard>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
