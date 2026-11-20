"use client";

import React from "react";
import Link from "next/link";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
  ArrowRight,
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  Cpu,
  Database,
  Globe2,
  MessageSquare,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function TechRadarPreviewBanner() {
  const { language } = usePortfolio();
  const isEs = language === "es";

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const scoreOffset = circumference - (92 / 100) * circumference;

  return (
    <section
      id="tech-radar-preview"
      className="border-t border-zinc-800/80 py-20 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="section-eyebrow">
            02 /{" "}
            {isEs
              ? "INTELIGENCIA DE MERCADO EN VIVO"
              : "LIVE MARKET INTELLIGENCE"}
          </div>
          <span className="badge-accent inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>
              {isEs ? "92% Match con el Mercado" : "92% Market Fit Verified"}
            </span>
          </span>
        </div>

        <SpotlightCard className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Narrative & Stack */}
            <div className="lg:col-span-7 min-w-0">
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3 leading-tight">
                Tech Market{" "}
                <span className="text-emerald-400">
                  ETL &amp; Semantic Gap Analyzer
                </span>
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                {isEs
                  ? "Motor RAG y pipeline ETL en tiempo real que analiza qué tecnologías piden las empresas hoy (GetOnBoard) y demuestra con evidencia vectorial por qué mi perfil encaja al 92% con las vacantes activas."
                  : "Real-time RAG engine and ETL pipeline that analyzes what technologies companies demand today (GetOnBoard) and proves with vector evidence why my profile matches 92% of active openings."}
              </p>

              {/* Proof Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
                <div className="p-2.5 rounded-md bg-zinc-950/70 border border-zinc-800 flex items-center gap-2 text-xs font-medium text-zinc-200">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">
                    {isEs ? "Banca (IBM / Itaú)" : "Banking (IBM / Itaú)"}
                  </span>
                </div>
                <div className="p-2.5 rounded-md bg-zinc-950/70 border border-zinc-800 flex items-center gap-2 text-xs font-medium text-zinc-200">
                  <Globe2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">
                    {isEs ? "España (UJI) & C1" : "Spain (UJI) & C1"}
                  </span>
                </div>
                <div className="p-2.5 rounded-md bg-zinc-950/70 border border-zinc-800 flex items-center gap-2 text-xs font-medium text-zinc-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">
                    {isEs ? "Caché IA ($0 Cost)" : "$0 Cost AI Cache"}
                  </span>
                </div>
              </div>

              {/* Technical Tags */}
              <div className="flex flex-wrap gap-2 mb-7">
                <span className="badge-mono inline-flex items-center gap-1.5">
                  <Database className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>MongoDB Atlas $vectorSearch</span>
                </span>
                <span className="badge-mono inline-flex items-center gap-1.5">
                  <BrainCircuit className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Gemini 2.5 Flash + Zod</span>
                </span>
                <span className="badge-mono inline-flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>text-embedding-004 (768d)</span>
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/labs/tech-radar"
                  className="btn-primary px-5 py-3 text-xs font-mono font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {isEs
                      ? "Auditar Perfil o Evaluar Vacante"
                      : "Audit Profile or Evaluate Opening"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>

                <Link
                  href="/contacto"
                  className="btn-secondary px-5 py-3 text-xs font-mono font-medium inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>
                    {isEs ? "Contáctame en 1 clic" : "Contact Me in 1 Click"}
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Column: Semantic Fit Console */}
            <div className="lg:col-span-5 min-w-0">
              <div className="terminal-window p-4 sm:p-5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs">
                <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-zinc-800 text-[11px] text-zinc-400">
                  <span className="font-semibold text-zinc-200 truncate">
                    {isEs
                      ? "Diagnóstico Semántico & RAG"
                      : "Semantic Fit & RAG Console"}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-sm bg-emerald-500/15 border border-emerald-500/30 shrink-0">
                    768D COSINE
                  </span>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-md bg-zinc-900 border border-zinc-800 mb-3">
                  <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                    <svg
                      className="w-20 h-20 -rotate-90"
                      viewBox="0 0 80 80"
                      aria-hidden="true"
                    >
                      <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        fill="none"
                        stroke="rgba(39, 39, 42, 0.9)"
                        strokeWidth="6"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={scoreOffset}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-base font-bold text-white leading-none">
                        92%
                      </span>
                      <span className="text-[8px] text-emerald-400 uppercase mt-0.5">
                        MATCH
                      </span>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
                      {isEs ? "PERFIL AUDITADO" : "AUDITED PROFILE"}
                    </div>
                    <div className="text-xs font-semibold text-white truncate mt-0.5">
                      Matías • Full-Stack &amp; BFF
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                      TypeScript, NestJS, Next.js, React, Docker, MongoDB
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <span className="flex items-center gap-2 min-w-0">
                      <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">Enterprise Digital Banking</span>
                    </span>
                    <span className="text-emerald-400 font-semibold shrink-0">
                      95% Cosine
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <span className="flex items-center gap-2 min-w-0">
                      <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">Index: job_vector_index</span>
                    </span>
                    <span className="text-zinc-200 font-semibold shrink-0">
                      $0 / 24H CACHE
                    </span>
                  </div>
                </div>

                <Link
                  href="/labs/tech-radar"
                  className="mt-3 w-full py-2.5 px-3 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>
                    {isEs
                      ? "Abrir Simulador de Compatibilidad"
                      : "Open Compatibility Simulator"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
