"use client";

import SolidArchitectureExplorer from "./SolidArchitectureExplorer";
import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { api } from "@/services/api";
import {
  Server,
  Terminal,
  Activity,
  ShieldCheck,
  Zap,
  Play,
  CheckCircle2,
  ExternalLink,
  Code2,
  Cpu,
  ArrowRight,
  Database,
  Layers,
  Sparkles,
  RefreshCw,
} from "lucide-react";

export default function BackendArchitectureSection() {
  const { language } = usePortfolio();
  const isEs = language === "es";

  const [activeEndpoint, setActiveEndpoint] = useState<string>("health");
  const [loading, setLoading] = useState(false);
  const [responseJson, setResponseJson] = useState<any>(null);
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
      desc: isEs ? "Observabilidad: memoria, versión de Node y tiempo activo" : "Observability: memory, Node version, uptime",
      layer: "HealthController -> MetricsService",
    },
    {
      id: "projects",
      method: "GET",
      path: "/api/v1/projects?category=Full-Stack&lang=es",
      title: isEs ? "Proyectos con Filtro DTO" : "Projects with DTO Filter",
      desc: isEs ? "Query validado con class-validator en NestJS" : "Query validated via class-validator in NestJS",
      layer: "ProjectsController -> CacheInterceptor -> Db",
    },
    {
      id: "telemetry",
      method: "POST",
      path: "/api/v1/telemetry/packet",
      title: isEs ? "Ingesta de Paquete LoRa Mesh" : "LoRa Mesh Packet Ingestion",
      desc: isEs ? "Simulación y enrutamiento MQTT (Río Clarillo)" : "Simulation & MQTT routing (Río Clarillo)",
      layer: "MqttGateway -> CryptoVerify -> MongoRepo",
    },
    {
      id: "contact",
      method: "POST",
      path: "/api/v1/contact",
      title: isEs ? "Procesamiento de Mensajes" : "Contact Message Ingestion",
      desc: isEs ? "Validación estricta y protección Throttler anti-spam" : "Strict validation & Throttler rate limiting",
      layer: "ThrottlerGuard -> ValidationPipe -> Mailer",
    },
  ];

  // Auto-run health on mount
  useEffect(() => {
    executeRequest("health");
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
      const start = Date.now();
      try {
        const res = await fetch("/api/v1/projects?category=Full-Stack&lang=" + language);
        if (res.ok) {
          const json = await res.json();
          setResponseJson(json.slice(0, 2));
          setResponseStatus(200);
          setIsLiveBackend(true);
        } else throw new Error();
      } catch {
        setResponseJson([
          {
            id: "rio-clarillo-mesh",
            title: "Plataforma IoT LoRa Mesh - Parque Nacional Río Clarillo",
            category: "Full-Stack",
            technologies: ["NestJS", "Next.js", "MQTT", "ESP32", "MongoDB", "VPS"],
          },
        ]);
        setResponseStatus(200);
        setIsLiveBackend(false);
      }
      setLatency(Date.now() - start);
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
        message: "Hola Matías, nos interesó tu perfil en microservicios NestJS e IoT.",
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

  return (
    <section id="backend-architecture" className="py-28 px-6 md:px-12 max-w-6xl mx-auto w-full relative">
      
      {/* Background ambient light */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3 shadow-inner">
            <Server className="w-3.5 h-3.5" />
            <span>{isEs ? "Arquitectura Full-Stack & Serverless" : "Full-Stack Architecture & Serverless"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {isEs ? "API REST en Vivo & Microservicios" : "Live REST API Engine & Microservices"}
          </h2>
          <p className="text-zinc-400 mt-2 max-w-xl text-sm md:text-base leading-relaxed">
            {isEs
              ? "Ejecución en tiempo real con Serverless Functions en Vercel, complementada con arquitectura modular NestJS, validación estricta y pruebas Jest."
              : "Real-time execution via Vercel Serverless Functions paired with NestJS modular architecture, strict validation, and Jest tests."}
          </p>
        </div>

        {/* GitHub NestJS Microservice Repo Link */}
        <a
          href="https://github.com/JKiddo-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 text-zinc-200 hover:text-white text-xs font-mono transition-all shadow-lg hover:scale-102 cursor-pointer w-fit"
        >
          <Code2 className="w-4 h-4 text-emerald-400 group-hover:rotate-6 transition-transform" />
          <span>{isEs ? "Ver Microservicio NestJS en GitHub" : "View NestJS Microservice on GitHub"}</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Architecture Highlights Pill Grid with Reactive Micro-Glow */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-10 relative z-10">
        <div className="group p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/70 hover:border-emerald-500/40 hover:bg-zinc-900/70 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
            <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono font-bold">SOLID & Clean Arch</span>
          </div>
          <div className="text-[11px] text-zinc-400 leading-snug">
            {isEs ? "Controladores, Servicios y DTOs desacoplados" : "Decoupled Controllers, Services & DTOs"}
          </div>
        </div>

        <div className="group p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/70 hover:border-blue-500/40 hover:bg-zinc-900/70 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-2 text-blue-400 mb-1.5">
            <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono font-bold">Vercel Serverless Edge</span>
          </div>
          <div className="text-[11px] text-zinc-400 leading-snug">
            {isEs ? "Ejecución serverless global con latencia < 25ms" : "Global serverless execution with < 25ms latency"}
          </div>
        </div>

        <div className="group p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/70 hover:border-teal-500/40 hover:bg-zinc-900/70 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-2 text-teal-400 mb-1.5">
            <Terminal className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono font-bold">ValidationPipe</span>
          </div>
          <div className="text-[11px] text-zinc-400 leading-snug">
            {isEs ? "class-validator con rechazo de payloads espurios" : "class-validator whitelist & payload safety"}
          </div>
        </div>

        <div className="group p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/70 hover:border-purple-500/40 hover:bg-zinc-900/70 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-2 text-purple-400 mb-1.5">
            <Cpu className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono font-bold">Jest Unit Testing</span>
          </div>
          <div className="text-[11px] text-zinc-400 leading-snug">
            {isEs ? "Cobertura de servicios y excepciones probadas" : "Unit test coverage & exception handling"}
          </div>
        </div>
      </div>

      {/* Interactive API Tester Console with Real-Time Pipeline Beam */}
      <SpotlightCard
        spotlightColor="rgba(16, 185, 129, 0.18)"
        className="p-6 md:p-8 border-emerald-500/30 relative z-10 shadow-2xl"
      >
        {/* Animated Data Flow Pipeline Banner */}
        <div className="mb-6 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isEs ? "Flujo de Capas Activo:" : "Active Request Pipeline:"}</span>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap text-[11px]">
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
              Client Browser
            </span>
            <ArrowRight className={`w-3 h-3 ${loading ? "text-emerald-400 animate-pulse" : "text-zinc-600"}`} />
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-blue-300 font-semibold">
              NestJS Controller
            </span>
            <ArrowRight className={`w-3 h-3 ${loading ? "text-teal-400 animate-pulse delay-75" : "text-zinc-600"}`} />
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-teal-300 font-semibold">
              Service Layer
            </span>
            <ArrowRight className={`w-3 h-3 ${loading ? "text-emerald-400 animate-pulse delay-150" : "text-zinc-600"}`} />
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 font-semibold flex items-center gap-1">
              <Database className="w-3 h-3" />
              <span>Mongo / Cache</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Endpoint Selector List */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-3 flex items-center justify-between">
              <span>{isEs ? "Endpoints Disponibles" : "Available Endpoints"}</span>
              <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                REST API v1
              </span>
            </div>

            {endpoints.map((ep) => {
              const isSelected = activeEndpoint === ep.id;

              return (
                <button
                  key={ep.id}
                  onClick={() => executeRequest(ep.id)}
                  disabled={loading}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? "bg-zinc-800/90 border-emerald-400 shadow-md shadow-emerald-500/10 scale-[1.01]"
                      : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50"
                  }`}
                >
                  {/* Subtle active left border beacon */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-400" />
                  )}

                  <div className="flex items-center justify-between mb-1.5 pl-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded ${
                          ep.method === "POST"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span className="text-xs font-mono text-zinc-300 font-semibold truncate max-w-[200px]">
                        {ep.path}
                      </span>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-xs font-medium text-white pl-1">{ep.title}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 pl-1">{ep.desc}</div>
                </button>
              );
            })}
          </div>

          {/* Response Inspector Terminal Window */}
          <div className="lg:col-span-7 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl flex flex-col h-full relative">
            
            {/* Live Progress Conduit Line */}
            <div
              className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500 transition-all duration-300 shadow-[0_0_8px_#10b981]"
              style={{ width: `${requestProgress}%` }}
            />

            {/* Terminal Top Bar */}
            <div className="px-4 py-3 bg-zinc-900/70 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className={`w-2.5 h-2.5 rounded-full ${loading ? "bg-amber-400 animate-ping" : "bg-emerald-400 animate-pulse"}`} />
                <span className="text-zinc-200 font-bold">API Response Viewer</span>
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-zinc-400">
                  Status:{" "}
                  <strong className={responseStatus === 201 || responseStatus === 200 ? "text-emerald-400" : "text-amber-400"}>
                    {responseStatus} {responseStatus === 201 ? "Created" : "OK"}
                  </strong>
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400">
                  Latency: <strong className="text-emerald-300">{latency}ms</strong>
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-emerald-400 font-bold text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {isLiveBackend ? "SERVERLESS_200" : "ACTIVE_CACHE"}
                </span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 font-mono text-xs overflow-x-auto max-h-[380px] bg-zinc-950/90 custom-code-scroll relative">
              {loading ? (
                <div className="flex items-center gap-2.5 text-zinc-400 py-10 justify-center">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                  <span className="font-mono text-xs">{isEs ? "Consultando pipeline NestJS..." : "Invoking NestJS pipeline..."}</span>
                </div>
              ) : (
                <pre className="text-emerald-400 leading-relaxed font-mono">
                  <code>{JSON.stringify(responseJson, null, 2)}</code>
                </pre>
              )}
            </div>

            {/* Terminal Footer */}
            <div className="px-4 py-2.5 bg-zinc-900/40 border-t border-zinc-800 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
              <span>NestJS 11 Core • Fastify / Express Engine</span>
              <button
                onClick={() => executeRequest(activeEndpoint)}
                disabled={loading}
                className="flex items-center gap-1.5 text-zinc-300 hover:text-emerald-400 transition-colors cursor-pointer group/rerun"
              >
                <Play className="w-3 h-3 group-hover/rerun:scale-125 transition-transform" />
                <span>{isEs ? "Re-ejecutar" : "Re-run"}</span>
              </button>
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* SOLID & Clean Architecture Code Explorer */}
      <SolidArchitectureExplorer />
    </section>
  );
}
