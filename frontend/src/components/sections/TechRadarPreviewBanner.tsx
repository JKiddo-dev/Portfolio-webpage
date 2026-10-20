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
  const { language } = usePortfolio();
  const isEs = language === "es";

  return (
    <section
      id="tech-radar-preview"
      className="py-12 px-6 md:px-12 max-w-6xl mx-auto w-full relative"
    >
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <SpotlightCard
        spotlightColor="rgba(20, 184, 166, 0.22)"
        className="p-8 md:p-12 border-teal-500/40 relative z-10 shadow-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/25 text-xs font-mono text-teal-300 shadow-inner">
                <Radar className="w-3.5 h-3.5 text-teal-400" />
                <span>
                  {isEs
                    ? "Inteligencia de Mercado en Vivo • Herramienta para Reclutadores & Tech Leads"
                    : "Live Market Intelligence • Tool for Recruiters & Tech Leads"}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>
                  {isEs ? "92% Match con el Mercado" : "92% Market Fit Verified"}
                </span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3 leading-tight">
              Tech Market{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                ETL & Semantic Gap Analyzer
              </span>
            </h2>

            <p className="text-zinc-100 text-base md:text-lg font-medium leading-relaxed mb-4">
              {isEs
                ? "Sistema inteligente que analiza en tiempo real qué tecnologías piden las empresas hoy y demuestra con datos reales por qué mi perfil encaja al 92% con las vacantes del mercado."
                : "Intelligent system that analyzes in real time what technologies companies demand today and proves with live data why my profile matches 92% of active market openings."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
              <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800/90 flex items-center gap-2 text-xs text-zinc-200">
                <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {isEs
                    ? "Respaldo Bancario (IBM / Itaú)"
                    : "Banking Track (IBM / Itaú)"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800/90 flex items-center gap-2 text-xs text-zinc-200">
                <Globe2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  {isEs
                    ? "España (UJI) & Inglés C1"
                    : "Spain (UJI) & C1 English"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800/90 flex items-center gap-2 text-xs text-zinc-200">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {isEs
                    ? "Operación $0 (Caché IA)"
                    : "$0 Cost Ops (AI Cache)"}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 mb-6">
              <div className="text-[11px] font-mono uppercase tracking-wider text-teal-400 font-bold mb-1">
                {isEs
                  ? "Capa de Ingeniería Profunda (Bajo el capó)"
                  : "Deep Engineering Layer (Under the Hood)"}
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {isEs
                  ? "Pipeline ETL en producción (Vercel Cron) que ingesta ofertas reales desde GetOnBoard, extrae entidades normalizadas con Gemini 2.5 Flash + Zod, genera embeddings de 768 dimensiones (text-embedding-004) y cruza perfiles técnicos contra el mercado usando MongoDB Atlas $vectorSearch."
                  : "Production ETL pipeline (Vercel Cron) that ingests real software engineering openings from GetOnBoard, extracts normalized entities with Gemini 2.5 Flash + Zod, generates 768-dim embeddings (text-embedding-004), and matches technical profiles against market demand via MongoDB Atlas $vectorSearch."}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-7 font-mono text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-emerald-400">
                <Database className="w-3.5 h-3.5" />
                <span>MongoDB Atlas $vectorSearch</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-teal-300">
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>Gemini 2.5 Flash + Zod</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-cyan-400">
                <Cpu className="w-3.5 h-3.5" />
                <span>text-embedding-004 (768d)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero-Token Cache + Rate Limit TTL</span>
              </span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/labs/tech-radar"
                className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 hover:brightness-110 transition-all shadow-xl shadow-emerald-500/25 flex items-center gap-2 hover:scale-102 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {isEs
                    ? "Evaluar Vacante o Auditar Perfil de Matías"
                    : "Evaluate Your Job Opening or Audit Matías"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contacto"
                className="px-5 py-3.5 rounded-xl font-mono text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 hover:border-emerald-500/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {isEs
                    ? "¿Contratando? Contáctame en 1 clic"
                    : "Hiring? Contact Me in 1 Click"}
                </span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 font-mono text-xs shadow-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80 text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 font-bold text-zinc-300">
                    {isEs
                      ? "Diagnóstico Ejecutivo & Telemetría"
                      : "Executive Fit & RAG Telemetry"}
                  </span>
                </div>
                <span className="text-[10px] text-teal-300 font-bold px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/25">
                  768-DIM COSINE
                </span>
              </div>

              <div className="space-y-2.5 text-[11px]">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <span className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {isEs
                        ? "Compatibilidad Perfil Matías"
                        : "Matías Profile Market Fit"}
                    </span>
                  </span>
                  <span className="text-emerald-400 font-bold">92% MATCH</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <span className="flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Index: job_vector_index</span>
                  </span>
                  <span className="text-cyan-300 font-bold">TOP 8 ANN</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>
                      {isEs
                        ? "Ahorro de Costos IA (Zero-Token)"
                        : "AI Cost Savings (Zero-Token)"}
                    </span>
                  </span>
                  <span className="text-teal-300 font-bold">$0 COST / 24H</span>
                </div>

                <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-[11px] text-zinc-200 leading-relaxed">
                  <div className="text-emerald-300 font-bold mb-1">
                    {isEs
                      ? "🎯 ¿Tienes una vacante abierta?"
                      : "🎯 Hiring for an open position?"}
                  </div>
                  <div className="text-zinc-300">
                    {isEs
                      ? "Pega los requisitos de tu oferta en el simulador y obtén en segundos un informe ejecutivo de compatibilidad sin registro."
                      : "Paste your job requirements in the simulator and get an instant executive compatibility report with zero login."}
                  </div>
                </div>
              </div>

              <Link
                href="/labs/tech-radar"
                className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]"
              >
                <span className="px-4 py-2 rounded-xl bg-zinc-950 border border-emerald-400 text-emerald-300 font-bold text-xs shadow-2xl flex items-center gap-1.5">
                  <span>
                    {isEs
                      ? "Abrir Simulador de Compatibilidad"
                      : "Open Compatibility Simulator"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
