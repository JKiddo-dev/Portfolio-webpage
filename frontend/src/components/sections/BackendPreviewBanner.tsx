"use client";

import React from "react";
import Link from "next/link";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
  Server,
  Building2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Code2,
  CheckCircle2,
  Layers,
  Sparkles,
  Database,
  Cpu,
} from "lucide-react";

export default function BackendPreviewBanner() {
  const { language } = usePortfolio();
  const isEs = language === "es";

  return (
    <section id="backend-preview" className="py-20 px-6 md:px-12 max-w-6xl mx-auto w-full relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <SpotlightCard
        spotlightColor="rgba(16, 185, 129, 0.22)"
        className="p-8 md:p-12 border-emerald-500/40 relative z-10 shadow-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Context & Narrative (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-4 shadow-inner">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isEs ? "Especialización Backend & Microservicios" : "Backend & Microservices Specialization"}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
              {isEs ? (
                <>
                  Arquitectura <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">BFF, Resiliencia</span> & Calidad de Código
                </>
              ) : (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">BFF Architecture, Resiliency</span> & Code Quality
                </>
              )}
            </h2>

            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6">
              {isEs
                ? "He separado la consola de arquitectura en su propia página dedicada (`/backend-apis`). Explora los patrones BFF implementados en IBM para Banco Itaú, simula caídas de red con Circuit Breaker, corre la suite de tests en Jest (96.5% de cobertura) y conoce la adopción de principios SOLID durante mi estancia en España."
                : "I have separated the architecture console into its own dedicated page (`/backend-apis`). Explore the BFF patterns engineered at IBM for Itaú Bank, simulate network outages with Circuit Breaker, run live Jest test suites (96.5% coverage), and learn about SOLID adoption in Spain."}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Simulador BFF Itaú</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-blue-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Jest Test Runner (96.5%)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-teal-400">
                <Zap className="w-3.5 h-3.5" />
                <span>API REST Serverless</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-purple-400">
                <Code2 className="w-3.5 h-3.5" />
                <span>Principios SOLID (UJI)</span>
              </span>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/backend-apis"
                className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/25 flex items-center gap-2 hover:scale-102 cursor-pointer"
              >
                <span>{isEs ? "Explorar Página de Backend & APIs" : "Explore Backend & APIs Page"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contacto"
                className="px-5 py-3.5 rounded-xl font-mono text-xs font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
              >
                <span>{isEs ? "Contacto Directo" : "Direct Contact"}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Preview Mini-Dashboard (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 font-mono text-xs shadow-2xl relative overflow-hidden group">
              
              {/* Terminal top dots */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80 text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 font-bold text-zinc-300">NestJS BFF Console</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  LIVE
                </span>
              </div>

              {/* Mini Pipeline Preview */}
              <div className="space-y-2.5 text-[11px]">
                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Itaú Banking BFF Layer</span>
                  </span>
                  <span className="text-emerald-400 font-bold">200 OK</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Circuit Breaker State</span>
                  </span>
                  <span className="text-emerald-400 font-bold">CLOSED (Safe)</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Jest Automated Tests</span>
                  </span>
                  <span className="text-blue-300 font-bold">12/12 PASS</span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/70 text-[10px] text-zinc-400 leading-relaxed">
                  <span className="text-emerald-400 font-bold">Route: </span>
                  <span>https://jkiddo-portfolio.vercel.app/backend-apis</span>
                  <div className="text-zinc-500 mt-1">
                    {isEs ? "Incluye simulador interactivo, métricas de latencia y código TypeScript." : "Includes live simulator, latency metrics & TypeScript source."}
                  </div>
                </div>
              </div>

              {/* Hover overlay hint */}
              <Link
                href="/backend-apis"
                className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]"
              >
                <span className="px-4 py-2 rounded-xl bg-zinc-950 border border-emerald-400 text-emerald-300 font-bold text-xs shadow-2xl flex items-center gap-1.5">
                  <span>Abrir /backend-apis</span>
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
