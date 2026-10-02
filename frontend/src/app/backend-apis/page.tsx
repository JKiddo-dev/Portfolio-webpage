"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import BackendArchitectureSection from "@/components/sections/BackendArchitectureSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { usePortfolio } from "@/hooks/usePortfolio";
import {
  Server,
  ShieldCheck,
  Building2,
  Globe2,
  Radio,
  ArrowLeft,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
  Zap,
  Sparkles,
  GitBranch,
  Terminal,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function BackendApisPage() {
  const { language } = usePortfolio();
  const isEs = language === "es";

  const [expandedAdr, setExpandedAdr] = useState<string | null>("adr-1");

  const toggleAdr = (id: string) => {
    setExpandedAdr(expandedAdr === id ? null : id);
  };

  const adrs = [
    {
      id: "adr-1",
      title: isEs ? "ADR-01: ¿Por qué NestJS sobre Express plano para microservicios?" : "ADR-01: Why NestJS over plain Express for microservices?",
      status: "APPROVED / PRODUCTION",
      decision: isEs
        ? "NestJS proporciona un contenedor de Inyección de Dependencias (IoC) nativo, arquitectura modular estandarizada y decorators para validación tipada (class-validator). Esto evita que equipos grandes caigan en espagueti arquitectónico y garantiza que los servicios sean 100% testeables con mocks en Jest."
        : "NestJS delivers a native Dependency Injection (IoC) container, standardized modular boundaries, and strongly typed validation decorators (class-validator). This prevents large teams from drifting into architectural debt and ensures every domain service is unit testable with Jest mocks.",
      impact: isEs ? "Mantenibilidad a largo plazo y reducción del 40% en bugs de integración." : "Long-term maintainability & 40% reduction in integration defects.",
    },
    {
      id: "adr-2",
      title: isEs ? "ADR-02: ¿Por qué el patrón BFF en lugar de un API Gateway genérico?" : "ADR-02: Why BFF pattern instead of a generic API Gateway?",
      status: "APPROVED / PRODUCTION",
      decision: isEs
        ? "En Itaú Bank, las interfaces web y móviles requieren agregaciones distintas. En vez de sobrecargar el cliente con 5 llamadas HTTP separadas o forzar a los microservicios core a mutar sus contratos, el BFF orquesta con Promise.allSettled y entrega un payload consolidado optimizado para la vista."
        : "At Itaú Bank, web and mobile client views demand distinct data shapes. Rather than burdening client devices with 5 sequential HTTP requests or polluting core banking domains with presentation logic, the BFF concurrently fans out with Promise.allSettled and returns an optimized, single-trip payload.",
      impact: isEs ? "Reducción de latencia en cliente de ~650ms a ~35ms y menor consumo de batería/datos móviles." : "Client round-trip latency dropped from ~650ms to ~35ms with zero overfetching.",
    },
    {
      id: "adr-3",
      title: isEs ? "ADR-03: Resiliencia con Circuit Breakers & Caché Degradada" : "ADR-03: Resiliency with Circuit Breakers & Degraded Fallbacks",
      status: "APPROVED / PRODUCTION",
      decision: isEs
        ? "Los proveedores externos de divisas (FX) y servicios legacy ocasionalmente presentan lentitud. El Circuit Breaker evita que los hilos del event loop de Node.js se agoten esperando timeouts; ante 3 fallos consecutivos, transiciona a OPEN y entrega datos de Redis con la bandera '_staleFallback: true'."
        : "External FX rates and legacy downstream services can suffer transient throttling. The Circuit Breaker protects Node.js event-loop workers from connection pool exhaustion; upon 3 consecutive failures, it trips to OPEN and delivers fresh-enough Redis snapshots with an explicit '_staleFallback: true' contract.",
      impact: isEs ? "Disponibilidad del 99.98% de la banca online durante caídas de terceros." : "99.98% uptime SLA preserved during third-party provider outages.",
    },
    {
      id: "adr-4",
      title: isEs ? "ADR-04: Estrategia de Testing y Pirámide de Calidad con Jest" : "ADR-04: Testing Strategy & Quality Pyramid with Jest",
      status: "APPROVED / PRODUCTION",
      decision: isEs
        ? "Adoptamos TDD con Jest y ts-jest. Cobertura estricta mayor al 90% en lógica de negocio (agregadores, guards, interceptores y procesadores de telemetría). Los tests de integración verifican contratos de entrada DTO y serialización segura."
        : "Adopted TDD with Jest and ts-jest. Strict >90% code coverage threshold enforced on core domain logic (BFF aggregators, JWT guards, resilience interceptors, and LoRa parsers). Integration tests validate DTO serialization contracts.",
      impact: isEs ? "Pipeline de CI/CD en GitHub Actions verde y cero regresiones en producción." : "Passing GitHub Actions CI/CD pipelines and zero production regression rollbacks.",
    },
  ];

  return (
    <div className="relative bg-zinc-950 text-zinc-100 min-h-screen flex flex-col overflow-x-hidden selection:bg-emerald-500/25 selection:text-emerald-300">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        {/* ========================================================================= */}
        {/* HERO SECTION DE LA PÁGINA DEDICADA                                        */}
        {/* ========================================================================= */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative mb-16">
          
          {/* Ambient Lighting Gradients */}
          <div className="absolute -top-10 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isEs ? "Volver al Portafolio" : "Back to Home"}</span>
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-emerald-400 font-semibold">{isEs ? "Arquitectura Backend & APIs" : "Backend Architecture & APIs"}</span>
          </div>

          {/* Page Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-4 shadow-inner">
            <Server className="w-3.5 h-3.5 animate-pulse" />
            <span>{isEs ? "Especialización de Ingeniería de Software" : "Software Engineering Specialization"}</span>
          </div>

          {/* Main Title & Lead */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-[1.1]">
            {isEs ? (
              <>
                Ingeniería Backend, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">Patrones BFF</span> & Resiliencia en la Nube
              </>
            ) : (
              <>
                Backend Engineering, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">BFF Patterns</span> & Cloud Resiliency
              </>
            )}
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed mb-8">
            {isEs
              ? "Profundización técnica sobre mi experiencia diseñando microservicios empresariales en IBM Consulting para Banco Itaú, la adopción de Clean Architecture y principios SOLID durante mi intercambio en España (UJI), y la plataforma distribuida de telemetría IoT LoRa Mesh."
              : "Technical deep-dive covering my engineering work designing enterprise microservices at IBM Consulting for Itaú Bank, adopting Clean Architecture and SOLID principles during academic exchange in Spain (UJI), and distributed IoT LoRa mesh telemetry."}
          </p>

          {/* Metric Highlights Pill Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm">
              <div className="text-[11px] font-mono text-zinc-400 uppercase font-bold">Enterprise Client</div>
              <div className="text-base font-bold text-white mt-0.5 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>Itaú Bank (IBM)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm">
              <div className="text-[11px] font-mono text-zinc-400 uppercase font-bold">Test Coverage</div>
              <div className="text-base font-bold text-white mt-0.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>96.5% Jest Suite</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm">
              <div className="text-[11px] font-mono text-zinc-400 uppercase font-bold">Academic Exchange</div>
              <div className="text-base font-bold text-white mt-0.5 flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-teal-400" />
                <span>UJI (España)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm">
              <div className="text-[11px] font-mono text-zinc-400 uppercase font-bold">IoT Telemetry</div>
              <div className="text-base font-bold text-white mt-0.5 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-purple-400" />
                <span>LoRa Mesh MQTT</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3 ARCHITECTURAL NARRATIVE CARDS (IBM + UJI ESPAÑA + TESIS IOT)           */}
        {/* ========================================================================= */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isEs ? "Tres Hitos de Mi Formación en Arquitectura de Software" : "Three Milestones in My Software Architecture Journey"}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: IBM Consulting & Itaú Bank */}
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.16)"
              className="p-6 border-emerald-500/30 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-emerald-400 font-semibold mb-1">
                  Feb 2025 - Ago 2025 • IBM Consulting
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {isEs ? "Patrón BFF & Microservicios para Banco Itaú" : "BFF Pattern & Microservices for Itaú Bank"}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {isEs
                    ? "Diseño e implementación de capas Backend-For-Frontend (BFF) con NestJS y TypeScript dentro de un marco Agile Scrum. Coordiné contratos de datos con equipos de DevOps, Cloud Architects y QA, aplicando Circuit Breakers con Redis para garantizar cero caídas en la banca web y móvil."
                    : "Designed and implemented Backend-For-Frontend (BFF) layers using NestJS & TypeScript within an Agile Scrum framework. Coordinated API contracts with DevOps, Cloud Architects, and QA, integrating Redis Circuit Breakers to guarantee zero downtime in online banking."}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">NestJS</span>
                <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">BFF Pattern</span>
                <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">Circuit Breaker</span>
                <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">Jest Testing</span>
              </div>
            </SpotlightCard>

            {/* Card 2: Intercambio UJI España */}
            <SpotlightCard
              spotlightColor="rgba(59, 130, 246, 0.16)"
              className="p-6 border-blue-500/30 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-blue-400 font-semibold mb-1">
                  Sept 2025 - Ene 2026 • Castellón, España
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {isEs ? "Clean Architecture & Principios SOLID (UJI)" : "Clean Architecture & SOLID Principles (UJI)"}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {isEs
                    ? "Durante mi estancia académica de Ingeniería de Software en la Universitat Jaume I (España), profundicé en diseño orientado a objetos avanzado, Domain-Driven Design (DDD) y los 5 principios SOLID. Aprendí a aislar la lógica de dominio de los frameworks, logrando código desacoplado y mantenible."
                    : "During my Software Engineering academic exchange at Universitat Jaume I (Spain), I deepened my knowledge in advanced OOP, Domain-Driven Design (DDD), and the 5 SOLID principles. I mastered isolating pure business logic from frameworks, producing resilient, maintainable code."}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">SOLID</span>
                <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">Clean Arch</span>
                <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">IoC / DI</span>
                <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">DDD</span>
              </div>
            </SpotlightCard>

            {/* Card 3: Tesis IoT LoRa Mesh */}
            <SpotlightCard
              spotlightColor="rgba(168, 85, 247, 0.16)"
              className="p-6 border-purple-500/30 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                  <Radio className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-purple-400 font-semibold mb-1">
                  Ago 2025 - Actualidad • Tesis de Grado UTEM
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {isEs ? "Plataforma IoT LoRa Mesh - Parque Río Clarillo" : "IoT LoRa Mesh Platform - Río Clarillo"}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {isEs
                    ? "Arquitectura end-to-end para una red mesh de sensores desplegada en zona silvestre protegida. Diseñé el backend NestJS con gateway MQTT para ingesta de paquetes binarios LoRa desde radios ESP32, deduplicación de paquetes, persistencia en MongoDB y despliegue en VPS Linux."
                    : "End-to-end architecture for a wilderness sensor mesh network. Engineered the NestJS backend with an MQTT gateway for binary LoRa packet ingestion from ESP32 nodes, packet deduplication, MongoDB time-series persistence, and Linux VPS deployment."}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">MQTT Broker</span>
                <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">LoRa ESP32</span>
                <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">MongoDB</span>
                <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800">VPS Linux</span>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPONENTE INTERACTIVO DE LAS 4 CONSOLAS                                  */}
        {/* ========================================================================= */}
        <BackendArchitectureSection />

        {/* ========================================================================= */}
        {/* REGISTRO DE DECISIONES DE ARQUITECTURA (ADRs)                             */}
        {/* ========================================================================= */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full my-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Architecture Decision Records (ADRs)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isEs ? "Registro de Decisiones Arquitectónicas" : "Architecture Decision Records (ADRs)"}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl">
              {isEs
                ? "Documentación de las decisiones clave de ingeniería tomadas en proyectos de alta concurrencia y sistemas distribuidos."
                : "Documentation of key engineering trade-offs and rationale applied across high-concurrency systems and distributed services."}
            </p>
          </div>

          <div className="space-y-3">
            {adrs.map((adr) => {
              const isExpanded = expandedAdr === adr.id;

              return (
                <div
                  key={adr.id}
                  className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAdr(adr.id)}
                    className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        {adr.status}
                      </span>
                      <span className="font-bold text-white text-sm md:text-base">
                        {adr.title}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-4 md:p-5 pt-0 border-t border-zinc-800/60 bg-zinc-950/40 space-y-3 text-xs font-mono">
                      <div>
                        <span className="text-zinc-500 uppercase tracking-wider block text-[10px] font-bold mb-1">
                          {isEs ? "Decisión Técnica & Fundamento:" : "Technical Decision & Rationale:"}
                        </span>
                        <p className="text-zinc-300 leading-relaxed">
                          {adr.decision}
                        </p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-300">
                        <strong className="text-white">{isEs ? "Impacto Medible: " : "Measurable Impact: "}</strong>
                        {adr.impact}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CALL TO ACTION HACIA CONTACTO                                             */}
        {/* ========================================================================= */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full text-center">
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.25)"
            className="p-8 md:p-12 border-emerald-500/30 text-center relative overflow-hidden"
          >
            <div className="max-w-xl mx-auto">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-2">
                {isEs ? "¿Buscando un Ingeniero Full-Stack con Experiencia en Backend?" : "Looking for a Full-Stack Engineer with Backend Depth?"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                {isEs ? "Conversemos sobre Arquitectura o Tu Próximo Proyecto" : "Let's Discuss Architecture or Your Next System"}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                {isEs
                  ? "Estoy disponible para entrevistas técnicas, revisión de arquitectura y roles Full-Stack remotos o híbridos."
                  : "Open to technical interviews, architectural reviews, and remote or hybrid Full-Stack engineering roles."}
              </p>

              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link
                  href="/contacto"
                  className="px-6 py-3 rounded-xl font-mono text-xs font-bold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 hover:scale-102"
                >
                  <span>{isEs ? "Ir a la Página de Contacto" : "Go to Contact Page"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href="https://github.com/JKiddo-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl font-mono text-xs font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all flex items-center gap-2"
                >
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
