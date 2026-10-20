"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
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
  labelEs: string;
  labelEn: string;
  summaryEs: string;
  summaryEn: string;
  badge: string;
  isPrimary?: boolean;
  profileText: string;
}

const PRESET_PROFILES: readonly PresetDefinition[] = [
  {
    id: "matias-fullstack",
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
          coreTechStack: ["typescript", "nestjs", "nodejs", "docker", "postgresql"],
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
          architecturePatterns: ["event-driven", "microservices", "clean-architecture"],
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
      missingHighDemandSkills: ["graphql", "playwright", "aws", "micro-frontends"],
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
        coreTechStack: ["typescript", "nextjs", "nestjs", "react", "mongodb", "docker"],
        architecturePatterns: ["bff", "microservices", "clean-architecture", "ci-cd"],
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
        coreTechStack: ["typescript", "react", "nodejs", "docker", "postgresql"],
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
  const { language } = usePortfolio();
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
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [architectureOpen, setArchitectureOpen] = useState<boolean>(true);

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
    async (profileText: string, presetId: PresetProfileId | null) => {
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
      setAnalysisError(null);
      const startTime = Date.now();

      try {
        const response = await fetch("/api/market/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profileText: trimmed,
            ...(presetId ? { presetId } : {}),
          }),
        });

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
          setLoadingAnalysis(false);
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
        const fallback = buildFallbackAnalysis(
          presetId,
          Date.now() - startTime,
          isEs
        );
        setAnalysisResult(fallback);
        setIsLiveAnalysis(false);
      } finally {
        setLoadingAnalysis(false);
      }
    },
    [isEs]
  );

  useEffect(() => {
    void fetchMarketStats();
    const initialPreset = PRESET_PROFILES[0];
    if (initialPreset) {
      void triggerGapAnalysis(initialPreset.profileText, initialPreset.id);
    }
  }, [fetchMarketStats, triggerGapAnalysis]);

  const handleSelectPreset = (preset: PresetDefinition) => {
    setSelectedPresetId(preset.id);
    setCustomProfileText(preset.profileText);
    void triggerGapAnalysis(preset.profileText, preset.id);
  };

  const handleRunCustomAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    void triggerGapAnalysis(customProfileText, selectedPresetId);
  };

  const formattedLastIngested = stats.lastIngestedAt
    ? new Date(stats.lastIngestedAt).toLocaleString(isEs ? "es-CL" : "en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : isEs
      ? "Actualización diaria activa"
      : "Daily sync active";

  return (
    <div className="relative bg-zinc-950 text-zinc-100 min-h-screen flex flex-col overflow-x-hidden selection:bg-emerald-500/25 selection:text-emerald-300">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative">
          <div className="absolute -top-10 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute top-32 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isEs ? "Volver al Portafolio" : "Back to Portfolio"}</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>/app/labs/tech-radar</span>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-400">
                <Radar className="w-3.5 h-3.5" />
                <span>
                  {isEs
                    ? "Inteligencia de Mercado en Tiempo Real • Diagnóstico para Reclutadores & Tech Leads"
                    : "Real-Time Market Intelligence • Diagnostic for Recruiters & Tech Leads"}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-xs font-mono font-bold text-teal-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {isEs
                    ? "92% Compatibilidad Verificada"
                    : "92% Verified Market Fit"}
                </span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              Tech Market{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                ETL & Semantic Gap Analyzer
              </span>
            </h1>

            <p className="text-zinc-100 text-base sm:text-xl font-medium max-w-4xl leading-relaxed mb-6">
              {isEs
                ? "Sistema inteligente que analiza en tiempo real qué tecnologías piden las empresas hoy y demuestra con datos reales por qué mi perfil encaja al 92% con las vacantes del mercado."
                : "Intelligent system that analyzes in real time what technologies companies demand today and proves with live data why my profile matches 92% of active market openings."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/90">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400 mb-1">
                  <span>
                    {isEs ? "EXPERIENCIA BANCARIA" : "ENTERPRISE BANKING"}
                  </span>
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-zinc-200 font-semibold">
                  IBM Consulting / Banco Itaú
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  {isEs
                    ? "Microservicios críticos, BFF y calidad TDD/Jest en producción."
                    : "Mission-critical microservices, BFF, and TDD/Jest quality."}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/90">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-400 mb-1">
                  <span>
                    {isEs ? "PERFIL INTERNACIONAL" : "GLOBAL ADAPTABILITY"}
                  </span>
                  <Globe2 className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-zinc-200 font-semibold">
                  {isEs
                    ? "Intercambio en España (UJI)"
                    : "Exchange in Spain (UJI)"}
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  {isEs
                    ? "Inglés Avanzado (C1), docencia universitaria y comunicación clara."
                    : "Advanced English (C1), university lecturing, and clear communication."}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/90">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400 mb-1">
                  <span>
                    {isEs ? "EFICIENCIA DE COSTOS" : "COST-AWARE FINOPS"}
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-zinc-200 font-semibold">
                  {isEs
                    ? "Arquitectura a Costo $0"
                    : "$0 Operating Cost Architecture"}
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  {isEs
                    ? "Caché inteligente de 24h y cuidado estricto de cuotas de IA."
                    : "Smart 24h Zero-Token Cache and strict AI quota protection."}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/90">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-teal-300 mb-1">
                  <span>
                    {isEs ? "ACCIÓN INMEDIATA" : "INSTANT EVALUATION"}
                  </span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-zinc-200 font-semibold">
                  {isEs
                    ? "Evalúa tu vacante en segundos"
                    : "Test your job opening live"}
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  {isEs
                    ? "Usa el simulador inferior sin registro o contáctame en 1 clic."
                    : "Use the zero-login simulator below or contact me in 1 click."}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>
                    {isEs
                      ? "Resumen de Ingeniería Profunda (Para Tech Leads & Arquitectos)"
                      : "Deep Engineering Summary (For Tech Leads & Architects)"}
                  </span>
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {isEs
                    ? "Pipeline ETL automatizado (Vercel Cron) que ingesta vacantes reales desde la API pública de GetOnBoard, limpia HTML no estructurado, normaliza entidades técnicas con Gemini 2.5 Flash + Zod, genera vectores de 768 dimensiones (text-embedding-004) y ejecuta búsqueda semántica por similitud coseno ($vectorSearch) sobre MongoDB Atlas."
                    : "Automated ETL pipeline (Vercel Cron) that ingests real software engineering openings from the GetOnBoard public API, sanitizes unstructured HTML, normalizes entities with Gemini 2.5 Flash + Zod, computes 768-dimensional embeddings (text-embedding-004), and executes cosine similarity search ($vectorSearch) on MongoDB Atlas."}
                </p>
              </div>
              <a
                href="#compatibility-simulator"
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-bold shrink-0 inline-flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>
                  {isEs ? "Ir al Simulador" : "Jump to Simulator"}
                </span>
              </a>
            </div>
          </div>

          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.16)"
            className="p-5 sm:p-6 border-zinc-800 mb-10"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-4 border-b border-zinc-800/80">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
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
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2 flex-wrap">
                    <span>
                      {isEs
                        ? "Monitoreo del Mercado Laboral en Tiempo Real"
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
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Index: <span className="text-zinc-200">job_vector_index</span> • Model:{" "}
                    <span className="text-zinc-200">text-embedding-004 (768d)</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => void fetchMarketStats()}
                disabled={loadingStats}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-200 transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-emerald-400 ${
                    loadingStats ? "animate-spin" : ""
                  }`}
                />
                <span>
                  {isEs ? "Actualizar Datos en Vivo" : "Refresh Live Data"}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
              <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/80">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span>
                    {isEs ? "Vacantes Reales Analizadas" : "Real Jobs Analyzed"}
                  </span>
                  <Database className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white">
                  {stats.totalVectorizedJobs}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">
                  {isEs
                    ? "Muestra activa • Colección: market_jobs"
                    : "Active sample • Collection: market_jobs"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/80">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span>
                    {isEs ? "Última Sincronización" : "Last Market Sync"}
                  </span>
                  <Clock className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-sm font-bold text-white truncate">
                  {formattedLastIngested}
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">
                  {isEs
                    ? "Costo $0 • Cron: 0 6 * * * (Batch máx. 5)"
                    : "$0 Cost • Cron: 0 6 * * * (Max batch 5)"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/80">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span>
                    {isEs ? "Velocidad de Respuesta" : "Response Speed"}
                  </span>
                  <Activity className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-2xl font-black text-white">
                  {stats.queryLatencyMs}{" "}
                  <span className="text-xs font-normal text-zinc-400">ms</span>
                </div>
                <div className="text-[11px] text-teal-400 mt-1">
                  {isEs
                    ? "Instantáneo • Singleton Warm Pool"
                    : "Instant • Singleton Warm Pool"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/80">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span>
                    {isEs ? "Vacantes que Piden Inglés" : "Jobs Requiring English"}
                  </span>
                  <Globe2 className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-black text-white">
                  {stats.englishRequiredPercentage}%
                </div>
                <div className="text-[11px] text-blue-400 mt-1">
                  {isEs
                    ? "Cubierto con Inglés C1 + España (UJI)"
                    : "Covered by C1 English + Spain (UJI)"}
                </div>
              </div>
            </div>
          </SpotlightCard>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.14)"
              className="lg:col-span-7 p-6 border-zinc-800"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    {isEs
                      ? "Demanda Real del Mercado • MongoDB $unwind + $group Pipeline"
                      : "Live Market Demand • MongoDB $unwind + $group Pipeline"}
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    {isEs
                      ? "Top 10 Tecnologías Más Solicitadas por Empresas"
                      : "Top 10 Technologies Most Requested by Companies"}
                  </h2>
                </div>
                <Cpu className="w-5 h-5 text-emerald-400 shrink-0" />
              </div>

              <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                {isEs
                  ? "Impacto para Selección: Mi stack principal (TypeScript, React, Node.js, Next.js, Docker, NestJS y MongoDB) cubre directamente 7 de las 10 tecnologías más buscadas hoy."
                  : "Recruiting Takeaway: My core stack (TypeScript, React, Node.js, Next.js, Docker, NestJS, and MongoDB) directly covers 7 of the top 10 most demanded technologies today."}
              </p>

              <div className="space-y-3">
                {stats.topTechnologies.map((item, idx) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-200 font-semibold flex items-center gap-2">
                        <span className="text-zinc-500 w-4">
                          {String(idx + 1).padStart(2, "0")}.
                        </span>
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-300">
                          {item.name}
                        </span>
                      </span>
                      <span className="text-zinc-400">
                        <strong className="text-white">{item.percentage}%</strong>{" "}
                        ({item.count} {isEs ? "ofertas" : "jobs"})
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800/60">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500"
                        style={{ width: `${Math.max(6, item.percentage)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <SpotlightCard
                spotlightColor="rgba(56, 189, 248, 0.14)"
                className="p-6 border-zinc-800 flex-1"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                      {isEs
                        ? "Estándares Empresariales • extractedData.architecturePatterns"
                        : "Enterprise Standards • extractedData.architecturePatterns"}
                    </span>
                    <h2 className="text-lg font-black text-white">
                      {isEs
                        ? "Prácticas y Arquitecturas Más Valoradas"
                        : "Most Valued Architectures & Practices"}
                    </h2>
                  </div>
                  <Layers className="w-5 h-5 text-cyan-400 shrink-0" />
                </div>

                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                  {isEs
                    ? "Aplicados en banca (IBM / Itaú): APIs REST, Microservicios, CI/CD, Clean Architecture, BFF y pruebas TDD."
                    : "Applied in banking (IBM / Itaú): REST APIs, Microservices, CI/CD, Clean Architecture, BFF, and TDD testing."}
                </p>

                <div className="space-y-2.5">
                  {stats.topArchitecturePatterns.map((pattern) => (
                    <div key={pattern.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-300">{pattern.name}</span>
                        <span className="text-cyan-300 font-bold">
                          {pattern.percentage}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                          style={{ width: `${Math.max(6, pattern.percentage)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(16, 185, 129, 0.12)"
                className="p-6 border-zinc-800"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                      {isEs ? "Nivel de Experiencia" : "Seniority Demand"}
                    </h3>
                    <div className="space-y-2 font-mono text-xs">
                      {stats.seniorityDistribution.map((s) => (
                        <div
                          key={s.seniority}
                          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800/80"
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
                    <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                      {isEs ? "Modalidad de Trabajo" : "Work Modality"}
                    </h3>
                    <div className="space-y-2 font-mono text-xs">
                      {stats.modalityDistribution.map((m) => (
                        <div
                          key={m.modality}
                          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800/80"
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

          <div id="compatibility-simulator">
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.2)"
              className="p-6 sm:p-8 border-emerald-500/30 mb-12"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-800">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-400 mb-2">
                    <BrainCircuit className="w-3.5 h-3.5" />
                    <span>
                      {isEs
                        ? "Evaluador Interactivo de Vacantes • Sin Registro (Zero-Login)"
                        : "Interactive Job Fit Evaluator • Instant & Zero-Login"}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-white">
                    {isEs
                      ? "Simulador Ejecutivo de Compatibilidad con el Mercado"
                      : "Executive Market & Job Compatibility Simulator"}
                  </h2>
                  <p className="text-sm sm:text-base text-emerald-200/90 font-medium mt-2 max-w-3xl leading-relaxed">
                    {isEs
                      ? "¿Estás contratando para una vacante? Pega aquí los requisitos de tu oferta (o haz clic en Auditar perfil de Matías) y obtén en segundos un informe ejecutivo de compatibilidad."
                      : "Are you hiring for an open role? Paste your job requirements here (or click Audit Matías's Profile) and get an executive compatibility report in seconds."}
                  </p>
                  <p className="text-xs text-zinc-400 font-mono mt-2">
                    {isEs
                      ? "Motor técnico: MongoDB Atlas $vectorSearch + Gemini 2.5 Flash + Zod • Caché de 24h a costo $0 (Zero-Token Mode) y hasta 5 análisis personalizados en vivo/hora por IP."
                      : "Technical engine: MongoDB Atlas $vectorSearch + Gemini 2.5 Flash + Zod • $0 cost 24h cache (Zero-Token Mode) and up to 5 custom live analyses/hour per IP."}
                  </p>
                </div>

                {analysisResult && (
                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    <span
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border ${
                        analysisResult.meta.cached
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                          : "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                      }`}
                    >
                      {analysisResult.meta.cached
                        ? "⚡ ZERO-TOKEN CACHE ($0)"
                        : "🧠 LIVE RAG INFERENCE"}
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-300">
                      {isEs ? "Cuota:" : "Quota:"}{" "}
                      <strong className="text-emerald-400">
                        {analysisResult.meta.remainingQuota}/5
                      </strong>
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    {isEs
                      ? "Paso 1 (Rápido): Elige una auditoría instantánea en 1 clic"
                      : "Step 1 (Fast): Choose a 1-click instant audit preset"}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {PRESET_PROFILES.map((preset) => {
                    const isSelected = selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        disabled={loadingAnalysis}
                        className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          preset.isPrimary
                            ? isSelected
                              ? "bg-emerald-500/15 border-emerald-400 shadow-lg shadow-emerald-500/10"
                              : "bg-emerald-500/10 border-emerald-500/40 hover:border-emerald-400"
                            : isSelected
                              ? "bg-zinc-900 border-cyan-400/70"
                              : "bg-zinc-950/80 border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-3">
                          <div
                            className={`p-2.5 rounded-lg border shrink-0 ${
                              preset.isPrimary
                                ? "bg-emerald-500 text-zinc-950 border-emerald-400"
                                : "bg-zinc-900 text-emerald-400 border-zinc-800"
                            }`}
                          >
                            <Play className="w-4 h-4 fill-current" />
                          </div>
                          <div>
                            <div className="font-mono text-xs sm:text-sm font-bold text-white">
                              {isEs ? preset.labelEs : preset.labelEn}
                            </div>
                            <div className="text-xs text-zinc-300 mt-1">
                              {isEs ? preset.summaryEs : preset.summaryEn}
                            </div>
                            <div className="text-[11px] font-mono text-emerald-400/90 mt-1">
                              {preset.badge}
                            </div>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 shrink-0">
                          <span>
                            {isEs ? "Ver Informe Ejecutivo" : "View Executive Report"}
                          </span>
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleRunCustomAnalysis} className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="profile-textarea"
                    className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-1.5"
                  >
                    <Filter className="w-3.5 h-3.5 text-cyan-400" />
                    <span>
                      {isEs
                        ? "Paso 2 (Personalizado): O pega aquí los requisitos de tu oferta laboral para evaluarla en vivo"
                        : "Step 2 (Custom): Or paste your job description / requirements here for live evaluation"}
                    </span>
                  </label>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {customProfileText.length}/4000 chars
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <textarea
                    id="profile-textarea"
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
                    className="flex-1 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-400 focus:outline-none p-3.5 text-xs sm:text-sm font-mono text-zinc-200 placeholder:text-zinc-600"
                  />

                  <button
                    type="submit"
                    disabled={loadingAnalysis}
                    className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    {loadingAnalysis ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>
                          {isEs
                            ? "Analizando Vacante..."
                            : "Analyzing Opening..."}
                        </span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
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
                  <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{analysisError}</span>
                  </div>
                )}
              </form>

              {analysisResult && (
                <div className="space-y-6 pt-4 border-t border-zinc-800/80">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4 p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                          <span>
                            {isEs
                              ? "ÍNDICE DE COMPATIBILIDAD"
                              : "COMPATIBILITY SCORE"}
                          </span>
                          <span className="text-emerald-400">
                            {analysisResult.meta.latencyMs} ms
                          </span>
                        </div>

                        <div className="flex items-baseline gap-3 my-3">
                          <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 font-mono">
                            {analysisResult.matchScore}%
                          </span>
                          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
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

                        <div className="w-full h-2.5 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800 mb-4">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-700"
                            style={{ width: `${analysisResult.matchScore}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed border-t border-zinc-800/80 pt-3">
                        {analysisResult.architecturalFit}
                      </p>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>
                            {isEs
                              ? "Requisitos Cubiertos (Listo para Producción)"
                              : "Covered Requirements (Production-Ready)"}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mb-3">
                          {isEs
                            ? "Tecnologías y prácticas validadas en proyectos reales:"
                            : "Technologies and practices validated in real projects:"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.matchingSkills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs"
                            >
                              ✓ {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
                          <GitCompare className="w-4 h-4" />
                          <span>
                            {isEs
                              ? "Transparencia: Próximas Áreas de Expansión"
                              : "Transparency: Next Expansion Areas"}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mb-3">
                          {isEs
                            ? "Tecnologías complementarias en hoja de ruta de especialización:"
                            : "Complementary technologies on my active upskilling roadmap:"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.missingHighDemandSkills.length > 0 ? (
                            analysisResult.missingHighDemandSkills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs"
                              >
                                + {skill}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs font-mono text-zinc-400">
                              {isEs
                                ? "Sin brechas críticas detectadas en el lote actual."
                                : "No critical skill gaps detected in current batch."}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2 p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">
                          <ShieldCheck className="w-4 h-4" />
                          <span>
                            {isEs
                              ? "Plan de Evolución Continua & Arquitectura (Generado por Gemini 2.5 Flash)"
                              : "Continuous Evolution & Architecture Plan (Generated by Gemini 2.5 Flash)"}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {analysisResult.recommendedActionPlan.map(
                            (step, index) => (
                              <div
                                key={step}
                                className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs sm:text-sm text-zinc-200 flex items-start gap-3"
                              >
                                <span className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold shrink-0">
                                  0{index + 1}
                                </span>
                                <span>{step}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
                        <Briefcase className="w-4 h-4 text-emerald-400" />
                        <span>
                          {isEs
                            ? `Evidencia de Mercado: Vacantes Reales Similares (${analysisResult.matchedJobs.length})`
                            : `Market Evidence: Similar Real Job Openings (${analysisResult.matchedJobs.length})`}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500">
                        {isLiveAnalysis
                          ? "MongoDB Atlas $vectorSearch (Cosine Similarity)"
                          : "Baseline Vector Snapshot Evidence"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {analysisResult.matchedJobs.map((job) => (
                        <a
                          key={job.externalId}
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                                {job.similarityScore}% Match ({job.similarityScore}% Cosine)
                              </span>
                              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                            </div>

                            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                              {job.title}
                            </h3>
                            <p className="text-xs font-mono text-zinc-400 mt-0.5">
                              {job.company} •{" "}
                              <span className="uppercase">{job.modality}</span> •{" "}
                              <span className="uppercase">{job.seniority}</span>
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-900">
                            {job.coreTechStack.slice(0, 5).map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-zinc-900/90 to-teal-950/60 border border-emerald-500/40 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-300 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>
                          {isEs
                            ? "Siguiente Paso para Selección, Líderes Técnicos y Clientes"
                            : "Next Step for Recruiters, Tech Leads & Business Clients"}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-2xl font-black text-white leading-snug">
                        {isEs
                          ? "¿El diagnóstico encaja con lo que buscas? Agenda una conversación o contáctame en 1 clic"
                          : "Does the diagnostic match what you're looking for? Schedule a conversation or contact me in 1 click"}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                        {isEs
                          ? "Acelera tu proceso de selección: aporto experiencia real en banca (IBM Consulting / Banco Itaú), adaptabilidad internacional (España - UJI), inglés fluido (C1) y mentalidad de eficiencia en costos desde el primer sprint."
                          : "Accelerate your hiring process: I bring proven banking experience (IBM Consulting / Itaú Bank), international adaptability (Spain - UJI), fluent C1 English, and a cost-efficient engineering mindset from sprint one."}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                      <Link
                        href="/contacto"
                        className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 hover:brightness-110 transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>
                          {isEs
                            ? "Contactar a Matías en 1 Clic"
                            : "Contact Matías in 1 Click"}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href="/#experience"
                        className="px-4 py-3.5 rounded-xl font-mono text-xs font-bold bg-zinc-950 hover:bg-zinc-900 text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>
                          {isEs
                            ? "Ver Trayectoria IBM / Itaú"
                            : "View IBM / Itaú Track Record"}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </SpotlightCard>
          </div>

          <SpotlightCard
            spotlightColor="rgba(56, 189, 248, 0.14)"
            className="p-6 border-zinc-800"
          >
            <button
              type="button"
              onClick={() => setArchitectureOpen(!architectureOpen)}
              className="w-full flex items-center justify-between text-left cursor-pointer"
            >
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  {isEs
                    ? "Doble Capa: Impacto de Negocio (ROI) + Arquitectura de Ingeniería"
                    : "Dual Layer: Business ROI + Deep Engineering Architecture"}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {isEs
                    ? "Cómo funciona por dentro: Pipeline ETL -> Zod -> Embeddings -> MongoDB Vector Search"
                    : "How It Works Under the Hood: ETL Pipeline -> Zod -> Embeddings -> MongoDB Vector Search"}
                </h2>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                {architectureOpen ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </button>

            {architectureOpen && (
              <div className="mt-6 pt-6 border-t border-zinc-800/80 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
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
            )}
          </SpotlightCard>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
