"use client";

import React from "react";
import Link from "next/link";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
  Building2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Code2,
  CheckCircle2,
} from "lucide-react";

export default function BackendPreviewBanner() {
  const { language } = usePortfolio();
  const isEs = language === "es";

  return (
    <section
      id="backend-preview"
      className="border-t border-zinc-800/80 py-20 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="section-eyebrow">
            03 /{" "}
            {isEs
              ? "ESPECIALIZACIÓN BACKEND & MICROSERVICIOS"
              : "BACKEND & MICROSERVICES SPECIALIZATION"}
          </div>
        </div>

        <SpotlightCard className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Context & Narrative */}
            <div className="lg:col-span-7 min-w-0">
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
                {isEs ? (
                  <>
                    Arquitectura{" "}
                    <span className="text-emerald-400">BFF, Resiliencia</span>{" "}
                    &amp; Calidad de Código
                  </>
                ) : (
                  <>
                    <span className="text-emerald-400">
                      BFF Architecture, Resiliency
                    </span>{" "}
                    &amp; Code Quality
                  </>
                )}
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                {isEs
                  ? "He separado la consola de arquitectura en su propia página dedicada (`/backend-apis`). Explora los patrones BFF implementados en IBM para Banco Itaú, simula caídas de red con Circuit Breaker, corre la suite de tests en Jest (96.5% de cobertura) y conoce la adopción de principios SOLID durante mi estancia en España."
                  : "I have separated the architecture console into its own dedicated page (`/backend-apis`). Explore the BFF patterns engineered at IBM for Itaú Bank, simulate network outages with Circuit Breaker, run live Jest test suites (96.5% coverage), and learn about SOLID adoption in Spain."}
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2 mb-7">
                <span className="badge-mono inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{isEs ? "Simulador BFF Itaú" : "Itaú BFF Simulator"}</span>
                </span>
                <span className="badge-mono inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Jest Test Runner (96.5%)</span>
                </span>
                <span className="badge-mono inline-flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{isEs ? "API REST Serverless" : "Serverless REST API"}</span>
                </span>
                <span className="badge-mono inline-flex items-center gap-1.5">
                  <Code2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{isEs ? "Principios SOLID (UJI)" : "SOLID Principles (UJI)"}</span>
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/backend-apis"
                  className="btn-primary px-5 py-3 text-xs font-mono font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {isEs
                      ? "Explorar Backend & APIs"
                      : "Explore Backend & APIs"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>

                <Link
                  href="/contacto"
                  className="btn-secondary px-5 py-3 text-xs font-mono font-medium inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isEs ? "Contacto Directo" : "Direct Contact"}</span>
                </Link>
              </div>
            </div>

            {/* Right Column: NestJS BFF Console Preview */}
            <div className="lg:col-span-5 min-w-0">
              <div className="terminal-window p-4 sm:p-5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs">
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-800 text-[11px] text-zinc-400">
                  <span className="font-semibold text-zinc-200 truncate">
                    NestJS BFF Console
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-sm bg-emerald-500/15 border border-emerald-500/30 shrink-0">
                    LIVE
                  </span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <span className="flex items-center gap-2 min-w-0">
                      <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">Itaú Banking BFF Layer</span>
                    </span>
                    <span className="text-emerald-400 font-semibold shrink-0">
                      200 OK
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <span className="flex items-center gap-2 min-w-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">Circuit Breaker State</span>
                    </span>
                    <span className="text-emerald-400 font-semibold shrink-0">
                      CLOSED
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                    <span className="flex items-center gap-2 min-w-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">Jest Automated Tests</span>
                    </span>
                    <span className="text-zinc-200 font-semibold shrink-0">
                      12/12 PASS
                    </span>
                  </div>

                  <div className="p-3 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 leading-relaxed">
                    <span className="text-emerald-400 font-semibold">Route: </span>
                    <span className="text-zinc-200">/backend-apis</span>
                    <div className="text-zinc-400 mt-1">
                      {isEs
                        ? "Incluye simulador interactivo, métricas de latencia y código TypeScript."
                        : "Includes live simulator, latency metrics & TypeScript source."}
                    </div>
                  </div>
                </div>

                <Link
                  href="/backend-apis"
                  className="mt-3 w-full py-2.5 px-3 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>
                    {isEs ? "Abrir /backend-apis" : "Open /backend-apis"}
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
