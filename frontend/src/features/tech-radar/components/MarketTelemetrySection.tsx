"use client";

import React from "react";
import { motion } from "motion/react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import type { MarketStatsResponse } from "@/lib/schemas/job-market";
import {
  MATIAS_CORE_PATTERNS,
  MATIAS_CORE_TECH,
} from "@/features/tech-radar/data/presets";
import {
  Activity,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  Globe2,
  Layers,
  RefreshCw,
} from "lucide-react";

export interface MarketTelemetrySectionProps {
  isEs: boolean;
  stats: MarketStatsResponse;
  isLiveStats: boolean;
  loadingStats: boolean;
  formattedLastIngested: string;
  onRefresh: () => void;
}

export default function MarketTelemetrySection({
  isEs,
  stats,
  isLiveStats,
  loadingStats,
  formattedLastIngested,
  onRefresh,
}: MarketTelemetrySectionProps) {
  return (
    <section
      id="market-telemetry"
      className="scroll-mt-24 py-14 sm:py-16 border-t border-zinc-800/80"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="section-eyebrow mb-2">
            02 /{" "}
            {isEs
              ? "TELEMETRÍA DEL MERCADO LABORAL"
              : "LIVE JOB MARKET TELEMETRY"}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {isEs
              ? "Demanda Real de Tecnologías & Patrones"
              : "Live Technology & Architecture Demand"}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1.5 break-words">
            Index: <span className="text-zinc-200">job_vector_index</span> •
            Model:{" "}
            <span className="text-zinc-200">text-embedding-004 (768d)</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <span className="badge-accent inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>
              {isLiveStats
                ? "MONGODB ATLAS LIVE"
                : "BASELINE TELEMETRY SNAPSHOT"}
            </span>
          </span>

          <button
            type="button"
            onClick={onRefresh}
            disabled={loadingStats}
            className="btn-secondary inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-mono cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-emerald-400 shrink-0 ${
                loadingStats ? "animate-spin" : ""
              }`}
            />
            <span>
              {isEs ? "Actualizar Datos" : "Refresh Data"}
            </span>
          </button>
        </div>
      </div>

      {/* 4 KPI Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <SpotlightCard className="p-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span>
              {isEs ? "Vacantes Analizadas" : "Real Jobs Analyzed"}
            </span>
            <Database className="w-4 h-4 text-emerald-400 shrink-0" />
          </div>
          <div className="text-2xl font-bold text-white">
            {stats.totalVectorizedJobs}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">
            {isEs
              ? "Muestra activa • market_jobs"
              : "Active sample • market_jobs"}
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span>{isEs ? "Última Sincronización" : "Last Market Sync"}</span>
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
          </div>
          <div className="text-xs sm:text-sm font-semibold text-white break-words leading-snug">
            {formattedLastIngested}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1.5">
            {isEs ? "Costo $0 • Cron: 0 6 * * *" : "$0 Cost • Cron: 0 6 * * *"}
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span>{isEs ? "Latencia de Consulta" : "Query Latency"}</span>
            <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
          </div>
          <div className="text-2xl font-bold text-white">
            {stats.queryLatencyMs}{" "}
            <span className="text-xs font-normal text-zinc-400">ms</span>
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">
            {isEs
              ? "Instantáneo • Singleton Pool"
              : "Instant • Singleton Pool"}
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span>
              {isEs ? "Vacantes con Inglés" : "Jobs Requiring English"}
            </span>
            <Globe2 className="w-4 h-4 text-emerald-400 shrink-0" />
          </div>
          <div className="text-2xl font-bold text-white">
            {stats.englishRequiredPercentage}%
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">
            {isEs
              ? "Cubierto con C1 + España (UJI)"
              : "Covered by C1 + Spain (UJI)"}
          </div>
        </SpotlightCard>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top 10 Technologies */}
        <SpotlightCard className="lg:col-span-7 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                {isEs
                  ? "MongoDB $unwind + $group"
                  : "MongoDB $unwind + $group"}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                {isEs
                  ? "Top 10 Tecnologías Más Solicitadas"
                  : "Top 10 Most Requested Technologies"}
              </h3>
            </div>
            <Cpu className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
          </div>

          <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
            {isEs
              ? "Mi stack principal (marcado con ✓) cubre directamente 7 de las 10 tecnologías más demandadas hoy."
              : "My core stack (marked with ✓) directly covers 7 of the top 10 most demanded technologies today."}
          </p>

          <div className="space-y-2.5">
            {stats.topTechnologies.map((item, idx) => {
              const isCore = MATIAS_CORE_TECH.has(item.name.toLowerCase());
              return (
                <div
                  key={item.name}
                  className="space-y-1.5 p-2 -mx-2 rounded-md hover:bg-[var(--surface-subtle)] transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-mono">
                    <span className="text-zinc-200 font-semibold flex items-center gap-2 min-w-0">
                      <span className="text-zinc-500 w-5 shrink-0">
                        {String(idx + 1).padStart(2, "0")}.
                      </span>
                      <span className="badge-mono">{item.name}</span>
                      {isCore && (
                        <span className="badge-accent text-[10px]">
                          ✓ {isEs ? "MI STACK" : "MY STACK"}
                        </span>
                      )}
                    </span>
                    <span className="text-zinc-400 shrink-0">
                      <strong className="text-white">{item.percentage}%</strong>{" "}
                      ({item.count} {isEs ? "ofertas" : "jobs"})
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        isCore ? "bg-emerald-500" : "bg-zinc-500"
                      }`}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.max(6, item.percentage)}%`,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.025,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </SpotlightCard>

        {/* Right Column: Architecture Patterns + Distributions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <SpotlightCard className="p-5 sm:p-6 flex-1">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                  {isEs
                    ? "Estándares • architecturePatterns"
                    : "Standards • architecturePatterns"}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {isEs
                    ? "Prácticas y Arquitecturas Valoradas"
                    : "Most Valued Architectures & Practices"}
                </h3>
              </div>
              <Layers className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
            </div>

            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              {isEs
                ? "Aplicados en banca (IBM / Itaú): APIs REST, Microservicios, CI/CD, Clean Architecture, BFF y TDD."
                : "Applied in banking (IBM / Itaú): REST APIs, Microservices, CI/CD, Clean Architecture, BFF, and TDD."}
            </p>

            <div className="space-y-2">
              {stats.topArchitecturePatterns.map((pattern, idx) => {
                const isCorePattern = MATIAS_CORE_PATTERNS.has(
                  pattern.name.toLowerCase()
                );
                return (
                  <div
                    key={pattern.name}
                    className="space-y-1 p-1.5 -mx-1.5 rounded-md hover:bg-[var(--surface-subtle)] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-mono">
                      <span className="text-zinc-300 flex items-center gap-1.5">
                        <span>{pattern.name}</span>
                        {isCorePattern && (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        )}
                      </span>
                      <span className="text-emerald-400 font-semibold shrink-0">
                        {pattern.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          isCorePattern ? "bg-emerald-500" : "bg-zinc-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.max(6, pattern.percentage)}%`,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: idx * 0.025,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-3 font-semibold">
                  {isEs ? "Nivel de Experiencia" : "Seniority Demand"}
                </h3>
                <div className="space-y-2 font-mono text-xs">
                  {stats.seniorityDistribution.map((s) => (
                    <div
                      key={s.seniority}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-zinc-950/70 border border-zinc-800"
                    >
                      <span className="uppercase text-zinc-300">
                        {s.seniority}
                      </span>
                      <span className="text-emerald-400 font-semibold">
                        {s.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-3 font-semibold">
                  {isEs ? "Modalidad de Trabajo" : "Work Modality"}
                </h3>
                <div className="space-y-2 font-mono text-xs">
                  {stats.modalityDistribution.map((m) => (
                    <div
                      key={m.modality}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-zinc-950/70 border border-zinc-800"
                    >
                      <span className="uppercase text-zinc-300">
                        {m.modality}
                      </span>
                      <span className="text-emerald-400 font-semibold">
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
    </section>
  );
}
