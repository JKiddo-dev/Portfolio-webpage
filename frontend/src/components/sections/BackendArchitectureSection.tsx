"use client";

import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SolidArchitectureExplorer from "./SolidArchitectureExplorer";
import BffCircuitBreakerSimulator from "./BffCircuitBreakerSimulator";
import TestRunnerWidget from "./TestRunnerWidget";
import { api } from "@/services/api";
import {
  Server,
  Activity,
  ShieldCheck,
  Play,
  CheckCircle2,
  ExternalLink,
  Code2,
  ArrowRight,
  Database,
  RefreshCw,
  Building2,
  LayoutGrid,
} from "lucide-react";

type ArchitectureTab = "bff" | "testing" | "api" | "solid" | "all";

async function fetchProjectsEndpoint(language: string): Promise<{
  data: unknown;
  status: number;
  isLive: boolean;
  latencyMs: number;
}> {
  const start = performance.now();
  try {
    const res = await fetch(
      `/api/v1/projects?category=Full-Stack&lang=${language}`
    );
    if (res.ok) {
      const json: unknown = await res.json();
      return {
        data: Array.isArray(json) ? json.slice(0, 2) : json,
        status: 200,
        isLive: true,
        latencyMs: Math.max(1, Math.round(performance.now() - start)),
      };
    }
    throw new Error("Non-200 response");
  } catch {
    return {
      data: [
        {
          id: "rio-clarillo-mesh",
          title: "Plataforma IoT LoRa Mesh - Parque Nacional Río Clarillo",
          category: "Full-Stack",
          technologies: ["NestJS", "Next.js", "MQTT", "ESP32", "MongoDB", "VPS"],
        },
      ],
      status: 200,
      isLive: false,
      latencyMs: Math.max(1, Math.round(performance.now() - start)),
    };
  }
}

export default function BackendArchitectureSection() {
  const { language } = usePortfolio();
  const isEs = language === "es";

  const [activeTab, setActiveTab] = useState<ArchitectureTab>("bff");

  const [activeEndpoint, setActiveEndpoint] = useState<string>("health");
  const [loading, setLoading] = useState(false);
  const [responseJson, setResponseJson] = useState<unknown>(null);
  const [responseStatus, setResponseStatus] = useState<number>(200);
  const [latency, setLatency] = useState<number>(12);
  const [isLiveBackend, setIsLiveBackend] = useState<boolean>(false);
  const [requestProgress, setRequestProgress] = useState<number>(100);

  const endpoints = [
    {
      id: "health",
      method: "GET",
      path: "/api/v1/health",
      title: isEs ? "Métricas de Salud & Uptime" : "System Health & Uptime",
      desc: isEs
        ? "Observabilidad: memoria, versión de Node y tiempo activo"
        : "Observability: memory, Node version, uptime",
      layer: "HealthController -> MetricsService",
    },
    {
      id: "projects",
      method: "GET",
      path: `/api/v1/projects?category=Full-Stack&lang=${language}`,
      title: isEs ? "Proyectos con Filtro DTO" : "Projects with DTO Filter",
      desc: isEs
        ? "Query validado con class-validator en NestJS"
        : "Query validated via class-validator in NestJS",
      layer: "ProjectsController -> CacheInterceptor -> Db",
    },
    {
      id: "telemetry",
      method: "POST",
      path: "/api/v1/telemetry/packet",
      title: isEs ? "Ingesta de Paquete LoRa Mesh" : "LoRa Mesh Packet Ingestion",
      desc: isEs
        ? "Simulación y enrutamiento MQTT (Río Clarillo)"
        : "Simulation & MQTT routing (Río Clarillo)",
      layer: "MqttGateway -> CryptoVerify -> MongoRepo",
    },
    {
      id: "contact",
      method: "POST",
      path: "/api/v1/contact",
      title: isEs ? "Procesamiento de Mensajes" : "Contact Message Ingestion",
      desc: isEs
        ? "Validación estricta y protección Throttler anti-spam"
        : "Strict validation & Throttler rate limiting",
      layer: "ThrottlerGuard -> ValidationPipe -> Mailer",
    },
  ];

  // Auto-run initial health check on mount
  useEffect(() => {
    let active = true;

    const loadInitialHealth = async () => {
      setLoading(true);
      setRequestProgress(35);
      const { data, isLive, latencyMs } = await api.getHealth();
      if (!active) return;
      setResponseJson(data);
      setResponseStatus(200);
      setLatency(latencyMs);
      setIsLiveBackend(isLive);
      setRequestProgress(100);
      setLoading(false);
    };

    void loadInitialHealth();

    return () => {
      active = false;
    };
  }, []);

  const executeRequest = async (endpointId: string) => {
    setLoading(true);
    setActiveEndpoint(endpointId);
    setRequestProgress(25);

    setTimeout(() => setRequestProgress(65), 180);

    if (endpointId === "health") {
      const { data, isLive, latencyMs } = await api.getHealth();
      setResponseJson(data);
      setResponseStatus(200);
      setLatency(latencyMs);
      setIsLiveBackend(isLive);
    } else if (endpointId === "projects") {
      const { data, status, isLive, latencyMs } =
        await fetchProjectsEndpoint(language);
      setResponseJson(data);
      setResponseStatus(status);
      setLatency(latencyMs);
      setIsLiveBackend(isLive);
    } else if (endpointId === "telemetry") {
      const { data, isLive, latencyMs } = await api.sendTelemetryPacket({
        nodeId: "ESP32-Node-03",
        rssi: -82,
        snr: 10.2,
        payload: "temp:23.5C,hum:52%,bat:4.1V",
      });
      setResponseJson(data);
      setResponseStatus(201);
      setLatency(latencyMs);
      setIsLiveBackend(isLive);
    } else if (endpointId === "contact") {
      const { data, isLive, latencyMs } = await api.sendContact({
        name: "Carolina Méndez",
        email: "carolina.mendez@empresa.com",
        subject: "Entrevista Técnica Full-Stack",
        message:
          "Hola Matías, nos interesó tu perfil en microservicios NestJS e IoT.",
      });
      setResponseJson(data);
      setResponseStatus(200);
      setLatency(latencyMs);
      setIsLiveBackend(isLive);
    }

    setTimeout(() => {
      setRequestProgress(100);
      setLoading(false);
    }, 280);
  };

  const tabs: Array<{
    id: Exclude<ArchitectureTab, "all">;
    label: string;
    meta: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      id: "bff",
      label: "BFF & Circuit Breaker",
      meta: "Itaú",
      icon: Building2,
    },
    {
      id: "testing",
      label: "Jest Test Runner",
      meta: "96.5%",
      icon: ShieldCheck,
    },
    {
      id: "api",
      label: isEs ? "API REST en Vivo" : "Live REST Engine",
      meta: "v1",
      icon: Server,
    },
    {
      id: "solid",
      label: isEs ? "Principios SOLID" : "SOLID Clean Arch",
      meta: isEs ? "5 Reglas" : "5 Rules",
      icon: Code2,
    },
  ];

  return (
    <section
      id="backend-architecture"
      className="border-t border-zinc-800/80 py-16 sm:py-20 w-full"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="section-eyebrow mb-2">
              <span>
                {isEs
                  ? "03 / CONSOLA DE ARQUITECTURA INTERACTIVA"
                  : "03 / INTERACTIVE ARCHITECTURE CONSOLE"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {isEs
                ? "Ingeniería Backend, Resiliencia & Calidad"
                : "Backend Engineering, Resiliency & Quality"}
            </h2>
            <p className="text-zinc-400 mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
              {isEs
                ? "Explora interactivamente los pilares de arquitectura que diferencian mi perfil: orquestación BFF bancaria (Itaú), resiliencia con Circuit Breaker, ejecución de pruebas Jest automatizadas y APIs serverless en producción."
                : "Interact with the core architectural pillars defining my engineering standard: enterprise banking BFF orchestration (Itaú), Circuit Breaker failure resiliency, automated Jest test pipelines, and production serverless APIs."}
            </p>
          </div>

          <a
            href="https://github.com/JKiddo-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary h-10 px-4 text-xs font-mono shrink-0 w-fit"
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>
              {isEs
                ? "Ver Microservicio en GitHub"
                : "View Microservices on GitHub"}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </a>
        </div>

        {/* Segmented Tab Bar */}
        <div
          role="tablist"
          aria-label={
            isEs ? "Módulos de arquitectura backend" : "Backend architecture modules"
          }
          className="mb-8 p-1.5 rounded-lg bg-zinc-900/70 border border-zinc-800 flex flex-wrap items-center justify-between gap-2"
        >
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-md text-xs font-mono transition-colors duration-150 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] font-semibold"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-[var(--surface-subtle)]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive
                        ? "bg-black/15 text-current"
                        : "bg-zinc-950/70 text-zinc-400 border border-zinc-800"
                    }`}
                  >
                    {tab.meta}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setActiveTab(activeTab === "all" ? "bff" : "all")}
            className={`px-3 py-2 rounded-md text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === "all"
                ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] font-semibold"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-[var(--surface-subtle)]"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
            <span>
              {activeTab === "all"
                ? isEs
                  ? "Vista Pestañas"
                  : "Tabbed View"
                : isEs
                  ? "Ver Todo"
                  : "Show All"}
            </span>
          </button>
        </div>

        {/* Component 1: BFF & Circuit Breaker Simulator */}
        {(activeTab === "bff" || activeTab === "all") && (
          <div>
            <BffCircuitBreakerSimulator />
          </div>
        )}

        {/* Component 2: Jest Test Runner */}
        {(activeTab === "testing" || activeTab === "all") && (
          <div>
            <TestRunnerWidget />
          </div>
        )}

        {/* Component 3: Live REST API Console */}
        {(activeTab === "api" || activeTab === "all") && (
          <div className="mb-12">
            <SpotlightCard className="p-5 sm:p-7">
              {/* Sub-header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-zinc-800 gap-3">
                <div>
                  <span className="section-eyebrow mb-1">
                    <Activity className="w-3.5 h-3.5" />
                    <span>
                      {isEs
                        ? "Consola de Peticiones HTTP en Vivo"
                        : "Live HTTP Request Console"}
                    </span>
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {isEs
                      ? "Inspección de Endpoints & Pipeline Serverless"
                      : "Endpoint Inspection & Serverless Pipeline"}
                  </h3>
                </div>
                <span className="badge-mono w-fit">
                  Vercel Functions + NestJS 11
                </span>
              </div>

              {/* Request Pipeline Flow */}
              <div className="mb-6 p-3 rounded-md bg-zinc-950/70 border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>
                    {isEs ? "Flujo de Capas:" : "Request Pipeline:"}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap text-[11px]">
                  <span className="badge-mono">Client</span>
                  <ArrowRight
                    className={`w-3 h-3 ${
                      loading ? "text-emerald-400" : "text-zinc-500"
                    }`}
                  />
                  <span className="badge-mono">NestJS Controller</span>
                  <ArrowRight
                    className={`w-3 h-3 ${
                      loading ? "text-emerald-400" : "text-zinc-500"
                    }`}
                  />
                  <span className="badge-mono">Service Layer</span>
                  <ArrowRight
                    className={`w-3 h-3 ${
                      loading ? "text-emerald-400" : "text-zinc-500"
                    }`}
                  />
                  <span className="badge-accent">
                    <Database className="w-3 h-3" />
                    <span>Mongo / Cache</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Endpoint Selector List */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3 flex items-center justify-between">
                    <span>
                      {isEs ? "Endpoints Disponibles" : "Available Endpoints"}
                    </span>
                    <span className="badge-accent">REST v1</span>
                  </div>

                  {endpoints.map((ep) => {
                    const isSelected = activeEndpoint === ep.id;

                    return (
                      <button
                        key={ep.id}
                        type="button"
                        onClick={() => executeRequest(ep.id)}
                        disabled={loading}
                        className={`w-full text-left p-3.5 rounded-md border transition-colors duration-150 cursor-pointer relative ${
                          isSelected
                            ? "bg-[var(--surface-subtle)] border-emerald-500/70"
                            : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        {isSelected && (
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500 rounded-l-md"
                          />
                        )}

                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 border ${
                                ep.method === "POST"
                                  ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                                  : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                              }`}
                            >
                              {ep.method}
                            </span>
                            <span className="text-xs font-mono text-zinc-200 font-medium truncate">
                              {ep.path}
                            </span>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <div className="text-xs font-medium text-white">
                          {ep.title}
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          {ep.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Response Inspector Terminal Window */}
                <div className="lg:col-span-7 rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col h-full relative terminal-window">
                  {/* 1px progress conduit */}
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 h-[2px] bg-emerald-500 transition-[width] duration-200"
                    style={{ width: `${requestProgress}%` }}
                  />

                  {/* Terminal Top Bar */}
                  <div className="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span
                        aria-hidden="true"
                        className={`w-2 h-2 rounded-full ${
                          loading ? "bg-amber-400" : "bg-emerald-400"
                        }`}
                      />
                      <span className="text-zinc-200 font-semibold">
                        API Response Viewer
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px]">
                      <span className="text-zinc-400">
                        Status:{" "}
                        <strong
                          className={
                            responseStatus === 201 || responseStatus === 200
                              ? "text-emerald-400"
                              : "text-amber-400"
                          }
                        >
                          {responseStatus}{" "}
                          {responseStatus === 201 ? "Created" : "OK"}
                        </strong>
                      </span>
                      <span className="text-zinc-500" aria-hidden="true">
                        •
                      </span>
                      <span className="text-zinc-400">
                        Latency:{" "}
                        <strong className="text-emerald-300">{latency}ms</strong>
                      </span>
                      <span className="text-zinc-500" aria-hidden="true">
                        •
                      </span>
                      <span className="text-emerald-400 font-semibold text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">
                        {isLiveBackend ? "SERVERLESS_200" : "ACTIVE_CACHE"}
                      </span>
                    </div>
                  </div>

                  {/* Terminal Body */}
                  <div className="p-4 font-mono text-xs overflow-x-auto max-h-[380px] bg-zinc-950 custom-code-scroll relative">
                    {loading ? (
                      <div className="flex items-center gap-2.5 text-zinc-400 py-10 justify-center">
                        <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                        <span className="font-mono text-xs">
                          {isEs
                            ? "Consultando pipeline NestJS..."
                            : "Invoking NestJS pipeline..."}
                        </span>
                      </div>
                    ) : (
                      <pre className="text-emerald-400 leading-relaxed font-mono">
                        <code>{JSON.stringify(responseJson, null, 2)}</code>
                      </pre>
                    )}
                  </div>

                  {/* Terminal Footer */}
                  <div className="px-4 py-2.5 bg-zinc-900/80 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex flex-wrap items-center justify-between gap-2">
                    <span>NestJS 11 Core • Fastify / Express Engine</span>
                    <button
                      type="button"
                      onClick={() => executeRequest(activeEndpoint)}
                      disabled={loading}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3" />
                      <span>{isEs ? "Re-ejecutar" : "Re-run"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        )}

        {/* Component 4: SOLID & Clean Architecture Explorer */}
        {(activeTab === "solid" || activeTab === "all") && (
          <div>
            <SolidArchitectureExplorer />
          </div>
        )}
      </div>
    </section>
  );
}
