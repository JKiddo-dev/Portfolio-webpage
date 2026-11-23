"use client";

import React, { useId, useState } from "react";
import type { Language, ProjectCaseStudy } from "@/types/portfolio";
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  GitBranch,
  Scale,
  ShieldCheck,
} from "lucide-react";

interface ProjectCaseStudyPanelProps {
  caseStudy: ProjectCaseStudy;
  language: Language;
}

export default function ProjectCaseStudyPanel({
  caseStudy,
  language,
}: ProjectCaseStudyPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const isEs = language === "es";

  return (
    <div className="mt-6 pt-5 border-t border-zinc-800/80">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full sm:w-auto px-3.5 py-2 rounded-md border border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-[var(--surface-subtle)] text-xs font-mono font-medium text-zinc-200 inline-flex items-center justify-between sm:justify-start gap-2.5 transition-colors cursor-pointer"
      >
        <span className="inline-flex items-center gap-2">
          <GitBranch className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            {isOpen
              ? isEs
                ? "Ocultar Arquitectura & Trade-offs"
                : "Hide Architecture & Trade-offs"
              : isEs
                ? "Ver Arquitectura & Trade-offs"
                : "View Architecture & Trade-offs"}
          </span>
        </span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        )}
      </button>

      {isOpen && (
        <div id={panelId} className="mt-4 space-y-4">
          {/* End-to-End Architecture Flow Diagram */}
          <div className="terminal-window rounded-lg bg-zinc-950 border border-zinc-800 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-zinc-800">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400">
                {isEs
                  ? "Flujo de Arquitectura End-to-End"
                  : "End-to-End Architecture Flow"}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
                {caseStudy.flowSteps.length}{" "}
                {isEs ? "ETAPAS" : "STAGES"}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-stretch gap-2">
              {caseStudy.flowSteps.map((step, idx) => (
                <React.Fragment key={`${step.label}-${idx}`}>
                  <div className="flex-1 min-w-0 p-3 rounded-md bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-semibold text-emerald-400">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="text-xs font-mono font-semibold text-white mt-0.5 leading-snug">
                        {step.label}
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-zinc-400 mt-1.5 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  {idx < caseStudy.flowSteps.length - 1 && (
                    <>
                      <div
                        aria-hidden="true"
                        className="hidden lg:flex items-center justify-center text-emerald-400/75 shrink-0 px-0.5"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                      <div
                        aria-hidden="true"
                        className="flex lg:hidden items-center justify-center text-emerald-400/75 shrink-0 py-0.5"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </div>
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Engineering Trade-Off */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider font-semibold text-zinc-400">
              <Scale className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                {isEs ? "Trade-off de Ingeniería" : "Engineering Trade-off"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-md bg-zinc-950/70 border border-zinc-800">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
                  {isEs ? "Problema" : "Problem"}
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {caseStudy.tradeOff.problem}
                </p>
              </div>

              <div className="p-3.5 rounded-md bg-zinc-950/70 border border-emerald-500/35">
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1.5">
                  {isEs ? "Decisión" : "Decision"}
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  {caseStudy.tradeOff.decision}
                </p>
              </div>

              <div className="p-3.5 rounded-md bg-zinc-950/70 border border-zinc-800">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
                  {isEs ? "Alternativa Descartada" : "Alternative Rejected"}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {caseStudy.tradeOff.alternativeRejected}
                </p>
              </div>
            </div>
          </div>

          {/* Security & Quality Gates */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold text-zinc-400 mr-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                {isEs ? "Seguridad & Calidad:" : "Security & Quality:"}
              </span>
            </span>
            {caseStudy.securityAndQuality.map((gate) => (
              <span key={gate} className="badge-accent">
                {gate}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
