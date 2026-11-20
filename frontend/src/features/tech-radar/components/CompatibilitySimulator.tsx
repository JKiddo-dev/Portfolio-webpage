"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Filter,
  GitCompare,
  MessageSquare,
  Play,
  RefreshCw,
  ShieldCheck,
  Zap,
} from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import type {
  GapAnalysisResponse,
  PresetProfileId,
} from "@/lib/schemas/job-market";
import type {
  LoadingStepItem,
  PresetDefinition,
} from "@/features/tech-radar/data/presets";

export interface CompatibilitySimulatorProps {
  isEs: boolean;
  simulatorRef: React.RefObject<HTMLDivElement | null>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  primaryPreset: PresetDefinition | undefined;
  secondaryPresets: readonly PresetDefinition[];
  selectedPresetId: PresetProfileId | null;
  customProfileText: string;
  analysisResult: GapAnalysisResponse | null;
  isLiveAnalysis: boolean;
  loadingAnalysis: boolean;
  loadingStage: 0 | 1 | 2;
  loadingSteps: LoadingStepItem[];
  analysisError: string | null;
  onSelectPreset: (preset: PresetDefinition) => void;
  onCustomTextChange: (value: string) => void;
  onRunCustomAnalysis: (e: React.FormEvent) => void;
}

const GAUGE_RADIUS = 54;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;

export default function CompatibilitySimulator({
  isEs,
  simulatorRef,
  textareaRef,
  primaryPreset,
  secondaryPresets,
  selectedPresetId,
  customProfileText,
  analysisResult,
  isLiveAnalysis,
  loadingAnalysis,
  loadingStage,
  loadingSteps,
  analysisError,
  onSelectPreset,
  onCustomTextChange,
  onRunCustomAnalysis,
}: CompatibilitySimulatorProps) {
  const matchedSkillsSet = useMemo(() => {
    const list = analysisResult?.matchingSkills ?? [];
    return new Set(list.map((skill) => skill.toLowerCase()));
  }, [analysisResult]);

  const matchScore = analysisResult?.matchScore ?? 0;
  const gaugeStrokeDashoffset =
    GAUGE_CIRCUMFERENCE - (matchScore / 100) * GAUGE_CIRCUMFERENCE;

  return (
    <section
      id="compatibility-simulator"
      ref={simulatorRef}
      className="border-t border-zinc-800/80 py-14 sm:py-16 scroll-mt-20 w-full"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <SpotlightCard className="p-5 sm:p-7 md:p-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 mb-6 border-b border-zinc-800">
            <div className="min-w-0">
              <div className="section-eyebrow mb-2">
                <span>
                  {isEs
                    ? "01 / DIAGNÓSTICO SEMÁNTICO INTERACTIVO (ZERO-LOGIN)"
                    : "01 / INTERACTIVE SEMANTIC DIAGNOSTIC (ZERO-LOGIN)"}
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                {isEs
                  ? "Simulador Ejecutivo de Compatibilidad con el Mercado"
                  : "Executive Market & Job Compatibility Simulator"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 max-w-3xl leading-relaxed">
                {isEs
                  ? "Selecciona el perfil principal para auditar mi compatibilidad real o pega los requisitos de tu oferta laboral para cruzarla en vivo con MongoDB Atlas $vectorSearch + Gemini 2.5 Flash."
                  : "Select the primary preset to audit my real market compatibility or paste your job opening requirements to match live via MongoDB Atlas $vectorSearch + Gemini 2.5 Flash."}
              </p>
            </div>

            {analysisResult && (
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="badge-accent">
                  {analysisResult.meta.cached
                    ? "ZERO-TOKEN CACHE ($0)"
                    : "LIVE RAG INFERENCE"}
                </span>
                <span className="badge-mono">
                  {isEs ? "Cuota Live:" : "Live Quota:"}{" "}
                  <strong className="text-emerald-400">
                    {analysisResult.meta.remainingQuota}/5
                  </strong>
                </span>
              </div>
            )}
          </div>

          {/* Step 1: Presets */}
          <div className="space-y-3 mb-7">
            <div className="text-xs font-mono uppercase tracking-wider font-semibold text-zinc-300 flex items-center justify-between gap-2 flex-wrap">
              <span>
                {isEs
                  ? "Paso 1: Elige un perfil preconfigurado (Auditoría Instantánea $0)"
                  : "Step 1: Select a preconfigured profile ($0 Instant Audit)"}
              </span>
              <span className="text-[11px] font-normal normal-case tracking-normal text-zinc-500">
                {isEs
                  ? "Respuesta inmediata vía caché vectorial 24h"
                  : "Instant response via 24h vector cache"}
              </span>
            </div>

            {primaryPreset && (
              <button
                type="button"
                onClick={() => onSelectPreset(primaryPreset)}
                disabled={loadingAnalysis}
                className={`w-full text-left p-4 sm:p-5 rounded-lg border transition-colors cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 disabled:opacity-60 ${
                  selectedPresetId === primaryPreset.id
                    ? "bg-[var(--surface-subtle)] border-emerald-500"
                    : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-[var(--surface-subtle)]"
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-md bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] flex items-center justify-center shrink-0 mt-0.5">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="badge-accent">
                        {isEs
                          ? "Acción Principal Recomendada"
                          : "Recommended Primary Audit"}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {primaryPreset.badge}
                      </span>
                    </div>
                    <div className="font-mono text-sm sm:text-base font-bold text-white break-words">
                      {isEs ? primaryPreset.labelEs : primaryPreset.labelEn}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {isEs ? primaryPreset.summaryEs : primaryPreset.summaryEn}
                    </div>
                  </div>
                </div>

                <span className="btn-primary h-9 px-4 text-xs font-mono w-full lg:w-auto shrink-0">
                  <span>
                    {isEs
                      ? "Auditar perfil de Matías"
                      : "Audit Matías's Profile"}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
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
                    onClick={() => onSelectPreset(preset)}
                    disabled={loadingAnalysis}
                    className={`w-full text-left p-4 rounded-lg border transition-colors cursor-pointer flex flex-col justify-between gap-3 disabled:opacity-60 ${
                      isSelected
                        ? "bg-[var(--surface-subtle)] border-emerald-500"
                        : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-[var(--surface-subtle)]"
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] border-transparent"
                            : "bg-zinc-900 text-emerald-400 border-zinc-800"
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-xs sm:text-sm font-semibold text-white break-words">
                          {isEs ? preset.labelEs : preset.labelEn}
                        </div>
                        <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          {isEs ? preset.summaryEs : preset.summaryEn}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-zinc-800/80 text-[11px] font-mono">
                      <span className="text-zinc-500">{preset.badge}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-400 shrink-0">
                        <span>{isEs ? "Simular Rol" : "Simulate Role"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Custom Vacancy Form */}
          <form onSubmit={onRunCustomAnalysis} className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
              <label
                htmlFor="profile-textarea"
                className="text-xs font-mono uppercase tracking-wider font-semibold text-zinc-300 flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  {isEs
                    ? "Paso 2 (Personalizado): Pega los requisitos de tu oferta laboral para evaluarla en vivo"
                    : "Step 2 (Custom): Paste your job opening requirements for live vector evaluation"}
                </span>
              </label>
              <span className="text-[11px] font-mono text-zinc-500 shrink-0">
                {customProfileText.length}/4000 chars
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <textarea
                id="profile-textarea"
                ref={textareaRef}
                rows={3}
                value={customProfileText}
                onChange={(e) => onCustomTextChange(e.target.value)}
                placeholder={
                  isEs
                    ? "¿Estás contratando? Pega aquí la descripción de tu vacante (ej: Buscamos Full-Stack / Backend Engineer con TypeScript, NestJS, React/Next.js, Docker e inglés...) para generar un informe inmediato."
                    : "Hiring? Paste your job description here (e.g., Looking for a Full-Stack / Backend Engineer with TypeScript, NestJS, React/Next.js, Docker, and English...) to generate an instant report."
                }
                className="flex-1 rounded-md border border-zinc-800 bg-zinc-950 p-3.5 text-xs sm:text-sm font-mono text-zinc-200 placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none transition-colors"
              />

              <button
                type="submit"
                disabled={loadingAnalysis}
                className="btn-primary px-5 py-3.5 text-xs font-mono cursor-pointer disabled:opacity-50 shrink-0"
              >
                {loadingAnalysis ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                    <span>
                      {isEs ? "Ejecutando Pipeline..." : "Running Pipeline..."}
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
                role="alert"
                className="mt-3 p-3 rounded-md border border-amber-500/40 bg-amber-500/10 text-xs font-mono text-amber-400 flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{analysisError}</span>
              </div>
            )}
          </form>

          {/* Staged Loading or Results */}
          <AnimatePresence mode="wait">
            {loadingAnalysis ? (
              <motion.div
                key="loading-pipeline"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="terminal-window p-5 sm:p-6 rounded-lg bg-zinc-950 border border-zinc-800 space-y-5"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                    <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                    <span>
                      {isEs
                        ? "Ejecutando Diagnóstico Semántico en Tiempo Real"
                        : "Executing Real-Time Semantic Gap Analysis"}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">
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
                        className={`p-3.5 rounded-md border font-mono transition-colors ${
                          isCurrent
                            ? "bg-zinc-900 border-emerald-500 text-white"
                            : isDone
                              ? "bg-zinc-900 border-zinc-700 text-emerald-400"
                              : "bg-zinc-950 border-zinc-800 text-zinc-500"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs font-semibold mb-1">
                          <span>STAGE {item.step}</span>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : isCurrent ? (
                            <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin shrink-0" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-zinc-700" />
                          )}
                        </div>
                        <div className="text-xs font-semibold leading-snug text-zinc-100">
                          {item.label}
                        </div>
                        <div className="text-[11px] mt-1 text-zinc-400">
                          {item.detail}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              analysisResult && (
                <motion.div
                  key={`${analysisResult.meta.presetId ?? "custom"}-${analysisResult.matchScore}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 pt-6 border-t border-zinc-800"
                >
                  {/* Score Gauge + Skill Breakdown */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* Score Terminal Frame */}
                    <div className="lg:col-span-4 terminal-window p-5 sm:p-6 rounded-lg bg-zinc-950 border border-zinc-800 flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs font-mono mb-4">
                          <span className="font-semibold uppercase tracking-wider text-zinc-300">
                            {isEs
                              ? "MATCH SCORE SEMÁNTICO"
                              : "SEMANTIC MATCH SCORE"}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[11px] font-semibold text-emerald-400">
                            {analysisResult.meta.latencyMs} ms
                          </span>
                        </div>

                        <div className="flex flex-col items-center justify-center my-2">
                          <div className="relative w-36 h-36 flex items-center justify-center">
                            <svg
                              className="w-full h-full -rotate-90"
                              viewBox="0 0 140 140"
                              role="img"
                              aria-label={`Match Score ${analysisResult.matchScore}%`}
                            >
                              <circle
                                cx="70"
                                cy="70"
                                r={GAUGE_RADIUS}
                                fill="none"
                                stroke="#27272a"
                                strokeWidth="10"
                              />
                              <motion.circle
                                cx="70"
                                cy="70"
                                r={GAUGE_RADIUS}
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={GAUGE_CIRCUMFERENCE}
                                initial={{
                                  strokeDashoffset: GAUGE_CIRCUMFERENCE,
                                }}
                                animate={{
                                  strokeDashoffset: gaugeStrokeDashoffset,
                                }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                              <span className="text-3xl font-bold text-white font-mono leading-none">
                                {analysisResult.matchScore}%
                              </span>
                              <span className="text-[10px] font-mono uppercase tracking-widest mt-1 text-zinc-400">
                                COSINE FIT
                              </span>
                            </div>
                          </div>

                          <span
                            className={`mt-3 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md border text-center ${
                              analysisResult.matchScore >= 85
                                ? "bg-zinc-900 border-emerald-500/50 text-emerald-400"
                                : analysisResult.matchScore >= 70
                                  ? "bg-zinc-900 border-cyan-500/50 text-cyan-400"
                                  : "bg-zinc-900 border-amber-500/50 text-amber-400"
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

                        <div className="w-full h-1.5 rounded-full overflow-hidden bg-zinc-800 my-4">
                          <motion.div
                            className="h-full rounded-full bg-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${analysisResult.matchScore}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 border-t border-zinc-800 pt-3">
                        {analysisResult.architecturalFit}
                      </p>
                    </div>

                    {/* Aligned Skills + Gaps + Evolution Plan */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Aligned Skills */}
                      <div className="p-5 rounded-lg bg-zinc-950/60 border border-zinc-800">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>
                              {isEs
                                ? "Skills Alineadas (Producción)"
                                : "Aligned Skills (Production)"}
                            </span>
                          </div>
                          <span className="badge-accent shrink-0">
                            {analysisResult.matchingSkills.length} MATCHED
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mb-3">
                          {isEs
                            ? "Tecnologías y prácticas validadas en proyectos reales:"
                            : "Technologies and practices validated in real projects:"}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {analysisResult.matchingSkills.map((skill) => (
                            <span
                              key={skill}
                              className="badge-accent font-mono text-xs"
                            >
                              <CheckCircle2 className="w-3 h-3 shrink-0" />
                              <span>{skill}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Skill Gaps */}
                      <div className="p-5 rounded-lg bg-zinc-950/60 border border-zinc-800">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
                            <GitCompare className="w-4 h-4 shrink-0" />
                            <span>
                              {isEs
                                ? "Brechas & Hoja de Ruta"
                                : "Skill Gaps & Upskilling"}
                            </span>
                          </div>
                          <span className="badge-mono shrink-0">
                            {analysisResult.missingHighDemandSkills.length}{" "}
                            ROADMAP
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mb-3">
                          {isEs
                            ? "Tecnologías complementarias en hoja de ruta de especialización:"
                            : "Complementary technologies on active upskilling roadmap:"}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {analysisResult.missingHighDemandSkills.length > 0 ? (
                            analysisResult.missingHighDemandSkills.map(
                              (skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-0.5 rounded-md border border-dashed border-amber-500/45 bg-amber-500/10 text-amber-400 font-mono text-xs font-medium"
                                >
                                  + {skill}
                                </span>
                              )
                            )
                          ) : (
                            <span className="text-xs font-mono text-zinc-400">
                              {isEs
                                ? "Sin brechas críticas detectadas en el lote actual."
                                : "No critical skill gaps detected in current batch."}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Plan */}
                      <div className="sm:col-span-2 p-5 rounded-lg bg-zinc-950/60 border border-zinc-800">
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-200 uppercase tracking-wider mb-3">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
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
                                className="p-3.5 rounded-md bg-zinc-900/70 border border-zinc-800 text-xs sm:text-sm text-zinc-300 flex items-start gap-3"
                              >
                                <span className="badge-accent shrink-0">
                                  0{index + 1}
                                </span>
                                <span className="leading-relaxed">{step}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vector Evidence: Matched Job Openings */}
                  <div>
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-zinc-200">
                        <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>
                          {isEs
                            ? `Evidencia Vectorial: Vacantes Reales Similares (${analysisResult.matchedJobs.length})`
                            : `Vector Evidence: Similar Real Job Openings (${analysisResult.matchedJobs.length})`}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500">
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
                          className="surface-card group p-4 sm:p-5 flex flex-col justify-between gap-3 min-w-0"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-2.5">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="badge-mono">
                                  #0{idx + 1} ANN
                                </span>
                                <span className="badge-accent">
                                  {job.similarityScore}% Match
                                </span>
                              </div>
                              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                            </div>

                            <div className="w-full h-1 rounded-full overflow-hidden bg-zinc-800 mb-3">
                              <div
                                className="h-full rounded-full bg-emerald-500"
                                style={{ width: `${job.similarityScore}%` }}
                              />
                            </div>

                            <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 break-words">
                              {job.title}
                            </h3>
                            <p className="text-xs font-mono text-zinc-400 mt-1 break-words">
                              {job.company} •{" "}
                              <span className="uppercase">{job.modality}</span>{" "}
                              •{" "}
                              <span className="uppercase">{job.seniority}</span>
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/80">
                            {job.coreTechStack.slice(0, 5).map((tech) => {
                              const isMatched = matchedSkillsSet.has(
                                tech.toLowerCase()
                              );
                              return (
                                <span
                                  key={tech}
                                  className={
                                    isMatched ? "badge-accent" : "badge-mono"
                                  }
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

                  {/* Next Step Hiring CTA Strip */}
                  <div className="p-5 sm:p-6 rounded-lg bg-zinc-950/70 border border-zinc-800 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    <div className="max-w-2xl min-w-0">
                      <div className="section-eyebrow mb-1.5">
                        <span>
                          {isEs
                            ? "SIGUIENTE PASO PARA SELECCIÓN & TECH LEADS"
                            : "NEXT STEP FOR RECRUITERS & TECH LEADS"}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                        {isEs
                          ? "¿El diagnóstico encaja con lo que buscas? Agenda una conversación en 1 clic"
                          : "Does the diagnostic match what you're looking for? Schedule a chat in 1 click"}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
                        {isEs
                          ? "Acelera tu proceso de selección: aporto experiencia comprobada en banca (IBM Consulting / Banco Itaú), adaptabilidad internacional (España - UJI), inglés avanzado (C1) y arquitectura FinOps desde el primer sprint."
                          : "Accelerate your hiring process: I bring proven banking experience (IBM Consulting / Itaú Bank), international adaptability (Spain - UJI), advanced C1 English, and FinOps architecture from sprint one."}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <Link
                        href="/contacto"
                        className="btn-primary h-10 px-5 text-xs font-mono"
                      >
                        <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {isEs
                            ? "Contactar a Matías"
                            : "Contact Matías"}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </Link>

                      <Link
                        href="/#experience"
                        className="btn-secondary h-10 px-4 text-xs font-mono"
                      >
                        <span>
                          {isEs
                            ? "Ver Trayectoria IBM / Itaú"
                            : "View IBM / Itaú Track Record"}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </SpotlightCard>
      </div>
    </section>
  );
}
