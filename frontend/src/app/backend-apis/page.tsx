"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import BackendArchitectureSection from "@/components/sections/BackendArchitectureSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { usePortfolio } from "@/hooks/usePortfolio";
import {
  Building2,
  Globe2,
  Radio,
  ArrowLeft,
  ArrowRight,
  Code2,
  CheckCircle2,
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

  const metrics = [
    {
      label: isEs ? "Cliente Enterprise" : "Enterprise Client",
      value: "Itaú Bank (IBM)",
      icon: Building2,
    },
    {
      label: isEs ? "Cobertura de Tests" : "Test Coverage",
      value: "96.5% Jest Suite",
      icon: CheckCircle2,
    },
    {
      label: isEs ? "Intercambio Académico" : "Academic Exchange",
      value: isEs ? "UJI (España)" : "UJI (Spain)",
      icon: Globe2,
    },
    {
      label: isEs ? "Telemetría IoT" : "IoT Telemetry",
      value: "LoRa Mesh MQTT",
      icon: Radio,
    },
  ];

  const milestones = [
    {
      period: "Feb 2025 - Ago 2025 • IBM Consulting",
      title: isEs
        ? "Patrón BFF & Microservicios para Banco Itaú"
        : "BFF Pattern & Microservices for Itaú Bank",
      description: isEs
        ? "Diseño e implementación de capas Backend-For-Frontend (BFF) con NestJS y TypeScript dentro de un marco Agile Scrum. Coordiné contratos de datos con equipos de DevOps, Cloud Architects y QA, aplicando Circuit Breakers con Redis para garantizar continuidad operativa en la banca web y móvil."
        : "Designed and implemented Backend-For-Frontend (BFF) layers using NestJS & TypeScript within an Agile Scrum framework. Coordinated API contracts with DevOps, Cloud Architects, and QA, integrating Redis Circuit Breakers to protect online banking uptime.",
      tags: ["NestJS", "BFF Pattern", "Circuit Breaker", "Jest Testing"],
      icon: Building2,
    },
    {
      period: isEs
        ? "Sept 2025 - Ene 2026 • Castellón, España"
        : "Sep 2025 - Jan 2026 • Castellón, Spain",
      title: isEs
        ? "Clean Architecture & Principios SOLID (UJI)"
        : "Clean Architecture & SOLID Principles (UJI)",
      description: isEs
        ? "Durante mi estancia académica de Ingeniería de Software en la Universitat Jaume I (España), profundicé en diseño orientado a objetos avanzado, Domain-Driven Design (DDD) y los 5 principios SOLID. Aislé la lógica de dominio de los frameworks para lograr código desacoplado y testeable."
        : "During my Software Engineering academic exchange at Universitat Jaume I (Spain), I deepened my practice in advanced OOP, Domain-Driven Design (DDD), and the 5 SOLID principles—isolating pure business logic from frameworks for decoupled, testable systems.",
      tags: ["SOLID", "Clean Arch", "IoC / DI", "DDD"],
      icon: Globe2,
    },
    {
      period: isEs
        ? "Ago 2025 - Actualidad • Tesis de Grado UTEM"
        : "Aug 2025 - Present • UTEM Engineering Thesis",
      title: isEs
        ? "Plataforma IoT LoRa Mesh - Parque Río Clarillo"
        : "IoT LoRa Mesh Platform - Río Clarillo",
      description: isEs
        ? "Arquitectura end-to-end para una red mesh de sensores desplegada en zona silvestre protegida. Diseñé el backend NestJS con gateway MQTT para ingesta de paquetes binarios LoRa desde radios ESP32, deduplicación de paquetes, persistencia en MongoDB y despliegue en VPS Linux."
        : "End-to-end architecture for a wilderness sensor mesh network. Engineered the NestJS backend with an MQTT gateway for binary LoRa packet ingestion from ESP32 nodes, packet deduplication, MongoDB time-series persistence, and Linux VPS deployment.",
      tags: ["MQTT Broker", "LoRa ESP32", "MongoDB", "VPS Linux"],
      icon: Radio,
    },
  ];

  const adrs = [
    {
      id: "adr-1",
      title: isEs
        ? "ADR-01: ¿Por qué NestJS sobre Express plano para microservicios?"
        : "ADR-01: Why NestJS over plain Express for microservices?",
      status: "APPROVED / PRODUCTION",
      decision: isEs
        ? "NestJS proporciona un contenedor de Inyección de Dependencias (IoC) nativo, arquitectura modular estandarizada y decorators para validación tipada (class-validator). Esto evita que equipos grandes caigan en deuda arquitectónica y garantiza que los servicios sean 100% testeables con mocks en Jest."
        : "NestJS delivers a native Dependency Injection (IoC) container, standardized modular boundaries, and strongly typed validation decorators (class-validator). This prevents large teams from drifting into architectural debt and ensures every domain service is unit testable with Jest mocks.",
      impact: isEs
        ? "Mantenibilidad a largo plazo y reducción del 40% en bugs de integración."
        : "Long-term maintainability & 40% reduction in integration defects.",
    },
    {
      id: "adr-2",
      title: isEs
        ? "ADR-02: ¿Por qué el patrón BFF en lugar de un API Gateway genérico?"
        : "ADR-02: Why BFF pattern instead of a generic API Gateway?",
      status: "APPROVED / PRODUCTION",
      decision: isEs
        ? "En Itaú Bank, las interfaces web y móviles requieren agregaciones distintas. En vez de sobrecargar el cliente con 5 llamadas HTTP separadas o forzar a los microservicios core a mutar sus contratos, el BFF orquesta con Promise.allSettled y entrega un payload consolidado optimizado para la vista."
        : "At Itaú Bank, web and mobile client views demand distinct data shapes. Rather than burdening client devices with 5 sequential HTTP requests or polluting core banking domains with presentation logic, the BFF concurrently fans out with Promise.allSettled and returns an optimized, single-trip payload.",
      impact: isEs
        ? "Reducción de latencia en cliente de ~650ms a ~35ms y menor consumo de datos móviles."
        : "Client round-trip latency dropped from ~650ms to ~35ms with zero overfetching.",
    },
    {
      id: "adr-3",
      title: isEs
        ? "ADR-03: Resiliencia con Circuit Breakers & Caché Degradada"
        : "ADR-03: Resiliency with Circuit Breakers & Degraded Fallbacks",
      status: "APPROVED / PRODUCTION",
      decision: isEs
        ? "Los proveedores externos de divisas (FX) y servicios legacy ocasionalmente presentan lentitud. El Circuit Breaker evita que el event loop de Node.js se agote esperando timeouts; ante 3 fallos consecutivos, transiciona a OPEN y entrega datos de Redis con la bandera '_staleFallback: true'."
        : "External FX rates and legacy downstream services can suffer transient throttling. The Circuit Breaker protects Node.js event-loop workers from connection pool exhaustion; upon 3 consecutive failures, it trips to OPEN and delivers fresh-enough Redis snapshots with an explicit '_staleFallback: true' contract.",
      impact: isEs
        ? "Disponibilidad del 99.98% de la banca online durante caídas de terceros."
        : "99.98% uptime SLA preserved during third-party provider outages.",
    },
    {
      id: "adr-4",
      title: isEs
        ? "ADR-04: Estrategia de Testing y Pirámide de Calidad con Jest"
        : "ADR-04: Testing Strategy & Quality Pyramid with Jest",
      status: "APPROVED / PRODUCTION",
      decision: isEs
        ? "Adoptamos TDD con Jest y ts-jest. Cobertura estricta mayor al 90% en lógica de negocio (agregadores, guards, interceptores y procesadores de telemetría). Los tests de integración verifican contratos de entrada DTO y serialización segura."
        : "Adopted TDD with Jest and ts-jest. Strict >90% code coverage threshold enforced on core domain logic (BFF aggregators, JWT guards, resilience interceptors, and LoRa parsers). Integration tests validate DTO serialization contracts.",
      impact: isEs
        ? "Pipeline de CI/CD en GitHub Actions verde y cero regresiones en producción."
        : "Passing GitHub Actions CI/CD pipelines and zero production regression rollbacks.",
    },
  ];

  return (
    <div className="relative bg-zinc-950 text-zinc-100 min-h-screen flex flex-col overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-300 transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:px-3 focus:py-2 focus:rounded-md focus:bg-[var(--btn-primary-bg)] focus:text-[var(--btn-primary-fg)] focus:font-mono focus:text-xs focus:font-semibold"
      >
        {isEs ? "Ir al contenido principal" : "Skip to content"}
      </a>

      <Navbar />

      <main id="main-content" className="flex-1 pt-24 sm:pt-28 pb-20">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full pb-16">
          <nav
            aria-label={isEs ? "Ruta de navegación" : "Breadcrumb"}
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-6"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isEs ? "Volver al Portafolio" : "Back to Home"}</span>
            </Link>
            <span className="text-zinc-600" aria-hidden="true">
              /
            </span>
            <span className="text-emerald-400 font-semibold">
              {isEs ? "Arquitectura Backend & APIs" : "Backend Architecture & APIs"}
            </span>
          </nav>

          <div className="section-eyebrow mb-3">
            <span>
              {isEs
                ? "01 / ESPECIALIZACIÓN EN INGENIERÍA BACKEND"
                : "01 / BACKEND ENGINEERING SPECIALIZATION"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight mb-5 leading-[1.08] max-w-4xl">
            {isEs ? (
              <>
                Ingeniería Backend,{" "}
                <span className="text-emerald-400">Patrones BFF</span> &amp;
                Resiliencia en la Nube
              </>
            ) : (
              <>
                Backend Engineering,{" "}
                <span className="text-emerald-400">BFF Patterns</span> &amp;
                Cloud Resiliency
              </>
            )}
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed mb-10">
            {isEs
              ? "Profundización técnica sobre mi experiencia diseñando microservicios empresariales en IBM Consulting para Banco Itaú, la adopción de Clean Architecture y principios SOLID durante mi intercambio en España (UJI), y la plataforma distribuida de telemetría IoT LoRa Mesh."
              : "Technical deep-dive covering my engineering work designing enterprise microservices at IBM Consulting for Itaú Bank, adopting Clean Architecture and SOLID principles during academic exchange in Spain (UJI), and distributed IoT LoRa mesh telemetry."}
          </p>

          {/* Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="p-4 rounded-lg bg-zinc-900/70 border border-zinc-800 flex flex-col gap-1.5"
                >
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <div className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
                    <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{metric.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Three Architecture Milestones */}
        <section className="border-t border-zinc-800/80 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
            <div className="mb-8">
              <div className="section-eyebrow mb-2">
                <span>
                  {isEs
                    ? "02 / HITOS DE ARQUITECTURA"
                    : "02 / ARCHITECTURE MILESTONES"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {isEs
                  ? "Tres Pilares de Mi Formación en Sistemas Distribuidos"
                  : "Three Pillars of My Distributed Systems Experience"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {milestones.map((item) => {
                const Icon = item.icon;
                return (
                  <SpotlightCard
                    key={item.title}
                    className="p-6 flex flex-col justify-between gap-5"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-md bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-400 mb-4">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-mono text-emerald-400 font-medium mb-1.5">
                        {item.period}
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2.5 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="badge-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interactive 4-Console Architecture Lab */}
        <BackendArchitectureSection />

        {/* Architecture Decision Records (ADRs) */}
        <section className="border-t border-zinc-800/80 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
            <div className="mb-8">
              <div className="section-eyebrow mb-2">
                <span>04 / ARCHITECTURE DECISION RECORDS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {isEs
                  ? "Registro de Decisiones Arquitectónicas"
                  : "Architecture Decision Records (ADRs)"}
              </h2>
              <p className="text-zinc-400 text-sm mt-2 max-w-2xl leading-relaxed">
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
                    className="rounded-lg bg-zinc-900/70 border border-zinc-800 overflow-hidden transition-colors duration-150"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAdr(adr.id)}
                      aria-expanded={isExpanded}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--surface-subtle)] transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-wrap min-w-0">
                        <span className="badge-accent shrink-0">
                          {adr.status}
                        </span>
                        <span className="font-semibold text-white text-sm sm:text-base">
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
                      <div className="px-4 sm:px-5 pb-5 pt-4 border-t border-zinc-800 space-y-3 text-xs sm:text-sm">
                        <div>
                          <span className="text-zinc-500 font-mono uppercase tracking-wider block text-[11px] font-semibold mb-1.5">
                            {isEs
                              ? "Decisión Técnica & Fundamento"
                              : "Technical Decision & Rationale"}
                          </span>
                          <p className="text-zinc-300 leading-relaxed">
                            {adr.decision}
                          </p>
                        </div>
                        <div className="p-3 rounded-md bg-zinc-950/70 border border-zinc-800 font-mono text-xs text-emerald-400">
                          <strong className="text-white">
                            {isEs ? "Impacto Medible: " : "Measurable Impact: "}
                          </strong>
                          {adr.impact}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="border-t border-zinc-800/80 pt-16 sm:pt-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
            <SpotlightCard className="p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="section-eyebrow mb-2">
                  <span>
                    {isEs
                      ? "05 / DISPONIBILIDAD TÉCNICA"
                      : "05 / ENGINEERING AVAILABILITY"}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2.5">
                  {isEs
                    ? "Conversemos sobre Arquitectura o Tu Próximo Proyecto"
                    : "Let's Discuss Architecture or Your Next System"}
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {isEs
                    ? "Estoy disponible para entrevistas técnicas, revisión de arquitectura y roles Full-Stack remotos o híbridos."
                    : "Open to technical interviews, architectural reviews, and remote or hybrid Full-Stack engineering roles."}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap shrink-0">
                <Link
                  href="/contacto"
                  className="btn-primary h-10 px-5 text-xs font-mono"
                >
                  <span>
                    {isEs ? "Ir a la Página de Contacto" : "Go to Contact Page"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href="https://github.com/JKiddo-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary h-10 px-4 text-xs font-mono"
                >
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>{isEs ? "Perfil GitHub" : "GitHub Profile"}</span>
                </a>
              </div>
            </SpotlightCard>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
