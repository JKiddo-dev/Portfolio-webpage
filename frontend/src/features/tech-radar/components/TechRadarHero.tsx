"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Database,
  Filter,
  Globe2,
  Play,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import type { MarketStatsResponse } from "@/lib/schemas/job-market";

export interface TechRadarHeroProps {
  isEs: boolean;
  stats: MarketStatsResponse;
  isLiveStats: boolean;
  onAuditMatias: () => void;
  onEvaluateCustomVacancy: () => void;
}

export default function TechRadarHero({
  isEs,
  stats,
  isLiveStats,
  onAuditMatias,
  onEvaluateCustomVacancy,
}: TechRadarHeroProps) {
  const highlights = [
    {
      label: isEs ? "EXPERIENCIA BANCARIA" : "ENTERPRISE BANKING",
      value: "IBM Consulting / Banco Itaú",
      icon: Briefcase,
    },
    {
      label: isEs ? "PERFIL GLOBAL" : "GLOBAL PROFILE",
      value: isEs ? "España (UJI) & Inglés C1" : "Spain (UJI) & C1 English",
      icon: Globe2,
    },
    {
      label: isEs ? "EFICIENCIA FINOPS" : "FINOPS EFFICIENCY",
      value: "Zero-Token Cache ($0 Cost)",
      icon: ShieldCheck,
    },
    {
      label: isEs ? "MOTOR VECTORIAL" : "VECTOR ENGINE",
      value: `${stats.totalVectorizedJobs} ${isEs ? "Ofertas • 768d ANN" : "Jobs • 768d ANN"}`,
      icon: Database,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full pb-14 sm:pb-16">
      {/* Breadcrumb & Telemetry Status Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <nav
          aria-label={isEs ? "Ruta de navegación" : "Breadcrumb"}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span>{isEs ? "Volver al Portafolio" : "Back to Portfolio"}</span>
          </Link>
          <span className="text-zinc-600" aria-hidden="true">
            /
          </span>
          <span className="text-emerald-400 font-semibold">Tech Radar</span>
        </nav>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="badge-mono">
            <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>/labs/tech-radar</span>
          </span>
          <span className="badge-accent">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-emerald-500"
            />
            <span>
              {isLiveStats ? "ATLAS VECTOR LIVE" : "TELEMETRY ACTIVE"} •{" "}
              {stats.queryLatencyMs}ms
            </span>
          </span>
        </div>
      </div>

      {/* Eyebrow & Fit Summary */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="section-eyebrow">
          {isEs
            ? "TECH RADAR • INTELIGENCIA DE MERCADO & RAG"
            : "TECH RADAR • MARKET INTELLIGENCE & RAG"}
        </span>
        <span className="badge-accent">
          {isEs ? "92% Compatibilidad Verificada" : "92% Verified Market Fit"}
        </span>
      </div>

      {/* Headline & Lead */}
      <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight mb-4 leading-[1.08] max-w-4xl">
        Tech Market{" "}
        <span className="text-emerald-400">ETL &amp; Semantic Gap Analyzer</span>
      </h1>

      <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed mb-8">
        {isEs
          ? "Motor RAG y pipeline ETL automatizado que ingesta vacantes reales desde GetOnBoard, extrae entidades con Gemini 2.5 Flash + Zod, vectoriza en 768 dimensiones y audita la compatibilidad semántica contra el mercado sobre MongoDB Atlas."
          : "Automated RAG engine and ETL pipeline that ingests live job openings from GetOnBoard, extracts entities with Gemini 2.5 Flash + Zod, computes 768-dim embeddings, and audits semantic compatibility against the market on MongoDB Atlas."}
      </p>

      {/* Primary Action Row */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        <button
          type="button"
          onClick={onAuditMatias}
          className="btn-primary h-10 px-4 sm:px-5 text-xs font-mono cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current shrink-0" />
          <span>
            {isEs
              ? "Auditar perfil de Matías (92% Match)"
              : "Audit Matías's Profile (92% Match)"}
          </span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </button>

        <button
          type="button"
          onClick={onEvaluateCustomVacancy}
          className="btn-secondary h-10 px-4 text-xs font-mono cursor-pointer"
        >
          <Filter className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            {isEs ? "Evaluar mi Vacante Abierta" : "Evaluate My Open Role"}
          </span>
        </button>

        <a
          href="#market-telemetry"
          className="btn-secondary h-10 px-4 text-xs font-mono"
        >
          <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{isEs ? "Ver Top 10 Tecnologías" : "View Top 10 Tech"}</span>
        </a>
      </div>

      {/* 4-Column Engineering Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="p-4 rounded-lg bg-zinc-900/70 border border-zinc-800 flex items-start gap-3 min-w-0"
            >
              <Icon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  {item.label}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-0.5 truncate">
                  {item.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
