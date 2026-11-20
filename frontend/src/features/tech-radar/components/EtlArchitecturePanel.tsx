"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface EtlArchitecturePanelProps {
  isEs: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export default function EtlArchitecturePanel({
  isEs,
  isOpen,
  onToggle,
}: EtlArchitecturePanelProps) {
  const stages = [
    {
      index: "01. EXTRACT & DEDUP",
      title: "Vercel Cron + GetOnBoard API",
      business: isEs
        ? "Monitorea el mercado automáticamente cada mañana y evita reprocesar avisos repetidos, ahorrando hasta un 80% en costos de IA."
        : "Automatically monitors the market every morning and skips duplicate listings, saving up to 80% in AI compute costs.",
      spec: isEs
        ? "SHA-256 + timingSafeEqual auth. Descarga 15 ofertas, filtra externalId existentes en MongoDB y procesa máximo 5 nuevas por corrida."
        : "SHA-256 + timingSafeEqual auth. Fetches 15 jobs, filters existing externalIds in MongoDB, and processes max 5 new openings per run.",
    },
    {
      index: "02. TRANSFORM (LLM + ZOD)",
      title: "Gemini 2.5 Flash + Strict Schema",
      business: isEs
        ? "Transforma avisos laborales desordenados en estadísticas confiables y auditables, eliminando errores manuales o respuestas inventadas."
        : "Turns messy job postings into reliable, auditable market statistics while preventing manual errors or AI hallucinations.",
      spec: isEs
        ? "Sanitización HTML y extracción tipada con generateObject + Zod. Normalización determinista post-LLM (TECH_SYNONYM_MAP)."
        : "HTML sanitization and typed extraction via generateObject + Zod. Deterministic post-LLM normalization (TECH_SYNONYM_MAP).",
    },
    {
      index: "03. VECTORIZE & LOAD",
      title: "text-embedding-004 (768-dim)",
      business: isEs
        ? "Evalúa la afinidad real de un candidato por contexto y experiencia, no solo buscando palabras sueltas como un filtro ATS tradicional."
        : "Evaluates true candidate affinity by context and experience rather than rigid keyword matching like legacy ATS filters.",
      spec: isEs
        ? "Generación de vectores densos de 768 dimensiones sobre título + stack + cleanSummary. Persistencia con Promise.allSettled y bulkWrite."
        : "768-dim dense vector generation across title + stack + cleanSummary. Concurrent persistence via Promise.allSettled and bulkWrite.",
    },
    {
      index: "04. RAG & ZERO-TOKEN CACHE",
      title: "Atlas $vectorSearch + Rate Limit",
      business: isEs
        ? "Opera a Costo $0 para reclutadores mediante caché de 24 horas y protege el presupuesto de infraestructura frente a picos de tráfico."
        : "Operates at $0 cost for recruiters via 24-hour caching while protecting cloud budgets against traffic spikes.",
      spec: isEs
        ? "Búsqueda ANN sobre job_vector_index (Top 8), caché MongoDB 24h para presets sin gastar tokens y Rate Limit por IP (SHA-256 + TTL 3600s)."
        : "ANN search on job_vector_index (Top 8), 24h MongoDB preset cache with zero token spend, and IP Rate Limit (SHA-256 + 3600s TTL).",
    },
  ];

  return (
    <section
      id="etl-architecture"
      className="py-14 sm:py-16 border-t border-zinc-800/80"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
      <div className="mb-4">
        <div className="section-eyebrow">
          03 /{" "}
          {isEs
            ? "ARQUITECTURA ETL & RAG"
            : "ETL & RAG SYSTEM ARCHITECTURE"}
        </div>
      </div>

      <SpotlightCard className="p-0 overflow-hidden">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer"
        >
          <div className="min-w-0">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
              {isEs
                ? "Doble Capa: Impacto de Negocio (ROI) + Ingeniería"
                : "Dual Layer: Business ROI + Engineering Spec"}
            </span>
            <h2 className="text-base sm:text-xl font-bold text-white break-words">
              {isEs
                ? "Cómo funciona por dentro: Pipeline ETL → Zod → Embeddings → MongoDB Vector Search"
                : "How It Works Under the Hood: ETL Pipeline → Zod → Embeddings → MongoDB Vector Search"}
            </h2>
          </div>

          <div className="p-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 shrink-0">
            {isOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="architecture-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-5 sm:p-6 pt-5 border-t border-zinc-800">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                  {stages.map((stage) => (
                    <div
                      key={stage.index}
                      className="p-4 rounded-md bg-zinc-950/70 border border-zinc-800 flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="text-emerald-400 font-semibold mb-1">
                          {stage.index}
                        </div>
                        <div className="text-white font-semibold mb-2">
                          {stage.title}
                        </div>
                        <p className="text-zinc-300 text-[11px] leading-relaxed font-sans">
                          {stage.business}
                        </p>
                      </div>
                      <p className="text-zinc-400 text-[11px] leading-relaxed border-t border-zinc-800 pt-2.5">
                        {stage.spec}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SpotlightCard>
      </div>
    </section>
  );
}
