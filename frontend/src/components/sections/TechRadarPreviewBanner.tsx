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
  Radar,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export default function TechRadarPreviewBanner() {
  const { language, isDark } = usePortfolio();
  const isEs = language === "es";

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const scoreOffset = circumference - (92 / 100) * circumference;

  return (
    <section
      id="tech-radar-preview"
      className="py-12 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto w-full relative"
    >
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <SpotlightCard
        spotlightColor={
          isDark ? "rgba(20, 184, 166, 0.2)" : "rgba(16, 185, 129, 0.12)"
        }
        className={`p-5 sm:p-8 md:p-10 relative z-10 shadow-2xl overflow-hidden ${
          isDark
            ? "border-teal-500/35 bg-zinc-900/70"
            : "border-emerald-500/35 bg-white/95"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-2xl sm:rounded-full border text-[11px] sm:text-xs font-mono ${
                  isDark
                    ? "bg-teal-500/10 border-teal-500/25 text-teal-300"
                    : "bg-teal-500/10 border-teal-600/25 text-teal-800"
                }`}
              >
                <Radar className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>
                  {isEs
                    ? "Inteligencia de Mercado en Vivo • Reclutadores & Tech Leads"
                    : "Live Market Intelligence • For Recruiters & Tech Leads"}
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono font-bold ${
                  isDark
                    ? "bg-emerald-500/15 border-emerald-500/35 text-emerald-300"
                    : "bg-emerald-500/15 border-emerald-600/35 text-emerald-800"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>
                  {isEs ? "92% Match con el Mercado" : "92% Market Fit Verified"}
                </span>
              </span>
            </div>

            <h2
              className={`text-2xl sm:text-4xl font-black tracking-tight mb-3 leading-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Tech Market{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">
                ETL & Semantic Gap Analyzer
              </span>
            </h2>

            <p
              className={`text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-5 ${
                isDark ? "text-zinc-200" : "text-slate-700"
              }`}
            >
              {isEs
                ? "Motor RAG y pipeline ETL en tiempo real que analiza qué tecnologías piden las empresas hoy (GetOnBoard) y demuestra con evidencia vectorial por qué mi perfil encaja al 92% con las vacantes activas."
                : "Real-time RAG engine and ETL pipeline that analyzes what technologies companies demand today (GetOnBoard) and proves with vector evidence why my profile matches 92% of active openings."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
              <div
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-medium ${
                  isDark
                    ? "bg-zinc-950/70 border-zinc-800/90 text-zinc-200"
                    : "bg-slate-50 border-slate-200 text-slate-800"
                }`}
              >
                <Briefcase className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="truncate">
                  {isEs ? "Banca (IBM / Itaú)" : "Banking (IBM / Itaú)"}
                </span>
              </div>
              <div
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-medium ${
                  isDark
                    ? "bg-zinc-950/70 border-zinc-800/90 text-zinc-200"
                    : "bg-slate-50 border-slate-200 text-slate-800"
                }`}
              >
                <Globe2 className="w-4 h-4 text-cyan-500 shrink-0" />
                <span className="truncate">
                  {isEs ? "España (UJI) & C1" : "Spain (UJI) & C1"}
                </span>
              </div>
              <div
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-medium ${
                  isDark
                    ? "bg-zinc-950/70 border-zinc-800/90 text-zinc-200"
                    : "bg-slate-50 border-slate-200 text-slate-800"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate">
                  {isEs ? "Caché IA ($0 Cost)" : "$0 Cost AI Cache"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 font-mono text-[11px]">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                  isDark
                    ? "bg-zinc-950/90 border-zinc-800 text-emerald-400"
                    : "bg-emerald-500/10 border-emerald-600/25 text-emerald-800"
                }`}
              >
                <Database className="w-3.5 h-3.5 shrink-0" />
                <span>MongoDB Atlas $vectorSearch</span>
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                  isDark
                    ? "bg-zinc-950/90 border-zinc-800 text-teal-300"
                    : "bg-teal-500/10 border-teal-600/25 text-teal-800"
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5 shrink-0" />
                <span>Gemini 2.5 Flash + Zod</span>
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                  isDark
                    ? "bg-zinc-950/90 border-zinc-800 text-cyan-400"
                    : "bg-cyan-500/10 border-cyan-600/25 text-cyan-800"
                }`}
              >
                <Cpu className="w-3.5 h-3.5 shrink-0" />
                <span>text-embedding-004 (768d)</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/labs/tech-radar"
                className="px-5 sm:px-6 py-3.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 hover:brightness-105 transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>
                  {isEs
                    ? "Auditar Perfil de Matías o Evaluar Vacante"
                    : "Audit Matías's Profile or Evaluate Opening"}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>

              <Link
                href="/contacto"
                className={`px-4 sm:px-5 py-3.5 rounded-xl font-mono text-xs font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border-zinc-800 hover:border-emerald-500/40"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 hover:border-emerald-500/50"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>
                  {isEs ? "Contáctame en 1 clic" : "Contact Me in 1 Click"}
                </span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 min-w-0">
            <div className="terminal-window p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 font-mono text-xs shadow-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-zinc-800/80 text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="ml-1.5 font-bold text-zinc-200 truncate">
                    {isEs
                      ? "Diagnóstico Semántico & RAG"
                      : "Semantic Fit & RAG Console"}
                  </span>
                </div>
                <span className="text-[10px] text-teal-300 font-bold px-2 py-0.5 rounded bg-teal-500/15 border border-teal-500/30 shrink-0">
                  768D COSINE
                </span>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 mb-3">
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
                      strokeWidth="7"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={scoreOffset}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-base font-black text-white leading-none">
                      92%
                    </span>
                    <span className="text-[8px] text-emerald-400 uppercase mt-0.5">
                      MATCH
                    </span>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
                    {isEs ? "PERFIL AUDITADO" : "AUDITED PROFILE"}
                  </div>
                  <div className="text-xs font-bold text-white truncate mt-0.5">
                    Matías • Full-Stack & BFF
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                    TypeScript, NestJS, Next.js, React, Docker, MongoDB
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300">
                  <span className="flex items-center gap-2 min-w-0">
                    <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">Enterprise Digital Banking</span>
                  </span>
                  <span className="text-emerald-400 font-bold shrink-0">
                    95% Cosine
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300">
                  <span className="flex items-center gap-2 min-w-0">
                    <Database className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">Index: job_vector_index</span>
                  </span>
                  <span className="text-cyan-300 font-bold shrink-0">
                    $0 / 24H CACHE
                  </span>
                </div>
              </div>

              <Link
                href="/labs/tech-radar"
                className="mt-3 w-full py-2.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
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
    </section>
  );
}
