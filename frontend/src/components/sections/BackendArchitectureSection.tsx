"use client";

import SolidArchitectureExplorer from "./SolidArchitectureExplorer";


import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { api, HealthResponse } from "@/services/api";
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

  const endpoints = [
    {
      id: "health",
      method: "GET",
      path: "/api/v1/health",
      title: isEs ? "Métricas de Salud & Uptime" : "System Health & Uptime",
      desc: isEs ? "Observabilidad: memoria, versión de Node y tiempo activo" : "Observability: memory, Node version, uptime",
    },
    {
      id: "projects",
      method: "GET",
      path: "/api/v1/projects?category=Full-Stack&lang=es",
      title: isEs ? "Proyectos con Filtro DTO" : "Projects with DTO Filter",
      desc: isEs ? "Query validado con class-validator en NestJS" : "Query validated via class-validator in NestJS",
    },
    {
      id: "telemetry",
      method: "POST",
      path: "/api/v1/telemetry/packet",
      title: isEs ? "Ingesta de Paquete LoRa Mesh" : "LoRa Mesh Packet Ingestion",
      desc: isEs ? "Simulación y enrutamiento MQTT (Río Clarillo)" : "Simulation & MQTT routing (Río Clarillo)",
    },
    {
      id: "contact",
      method: "POST",
      path: "/api/v1/contact",
      title: isEs ? "Procesamiento de Mensajes" : "Contact Message Ingestion",
      desc: isEs ? "Validación estricta y protección Throttler anti-spam" : "Strict validation & Throttler rate limiting",
    },
  ];

  // Auto-run health on mount
  useEffect(() => {
    executeRequest("health");
  }, []);

  const executeRequest = async (endpointId: string) => {
    setLoading(true);
    setActiveEndpoint(endpointId);

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

    setLoading(false);
  };

  return (
    <section id="backend-architecture" className="py-28 px-6 md:px-12 max-w-6xl mx-auto w-full relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3">
            <Server className="w-3.5 h-3.5" />
            {isEs ? "Arquitectura Full-Stack & Serverless" : "Full-Stack Architecture & Serverless"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {isEs ? "API REST en Vivo & Microservicios" : "Live REST API Engine & Microservices"}
          </h2>
          <p className="text-zinc-400 mt-2 max-w-xl text-sm md:text-base">
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
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-zinc-200 hover:text-white text-xs font-mono transition-all shadow-lg hover:scale-102 cursor-pointer w-fit"
        >
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>{isEs ? "Ver Microservicio NestJS en GitHub" : "View NestJS Microservice on GitHub"}</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
        </a>
      </div>

      {/* Architecture Highlights Pill Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-10">
        <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-mono font-bold">SOLID & Clean Arch</span>
          </div>
          <div className="text-[11px] text-zinc-400">
            {isEs ? "Controladores, Servicios y DTOs desacoplados" : "Decoupled Controllers, Services & DTOs"}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
          <div className="flex items-center gap-2 text-blue-400 mb-1">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-mono font-bold">Vercel Serverless Edge</span>
          </div>
          <div className="text-[11px] text-zinc-400">
            {isEs ? "Ejecución serverless global con latencia < 25ms y $0 costo" : "Global serverless execution with < 25ms latency & $0 cost"}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
          <div className="flex items-center gap-2 text-teal-400 mb-1">
            <Terminal className="w-4 h-4" />
            <span className="text-xs font-mono font-bold">ValidationPipe</span>
          </div>
          <div className="text-[11px] text-zinc-400">
            {isEs ? "class-validator con rechazo de payloads espurios" : "class-validator whitelist & payload safety"}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
          <div className="flex items-center gap-2 text-purple-400 mb-1">
            <Cpu className="w-4 h-4" />
            <span className="text-xs font-mono font-bold">Jest Unit Testing</span>
          </div>
          <div className="text-[11px] text-zinc-400">
            {isEs ? "Cobertura de servicios y excepciones probadas" : "Unit test coverage & exception handling"}
          </div>
        </div>
      </div>

      {/* Interactive API Tester Console */}
      <SpotlightCard
        spotlightColor="rgba(16, 185, 129, 0.16)"
        className="p-6 md:p-8 border-emerald-500/30"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Endpoint Selector List */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-3 flex items-center justify-between">
              <span>{isEs ? "Endpoints Disponibles" : "Available Endpoints"}</span>
              <span className="text-[10px] text-emerald-400">REST API v1</span>
            </div>

            {endpoints.map((ep) => {
              const isSelected = activeEndpoint === ep.id;

              return (
                <button
                  key={ep.id}
                  onClick={() => executeRequest(ep.id)}
                  disabled={loading}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-zinc-800/90 border-emerald-400/80 shadow-md shadow-emerald-500/10"
                      : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
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
                  <div className="text-xs font-medium text-white">{ep.title}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{ep.desc}</div>
                </button>
              );
            })}
          </div>

          {/* Response Inspector Terminal Window */}
          <div className="lg:col-span-7 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl flex flex-col h-full">
            {/* Terminal Top Bar */}
            <div className="px-4 py-3 bg-zinc-900/70 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-zinc-200 font-bold">API Response Viewer</span>
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-zinc-400">
                  Status:{" "}
                  <strong className={responseStatus === 201 || responseStatus === 200 ? "text-emerald-400" : "text-amber-400"}>
                    {responseStatus}
                  </strong>
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400">
                  Latency: <strong className="text-zinc-200">{latency}ms</strong>
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-emerald-400 font-bold text-[10px]">
                  {isLiveBackend ? "LIVE_SERVERLESS_API" : "FALLBACK"}
                </span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 font-mono text-xs overflow-x-auto max-h-[380px] bg-zinc-950/90">
              {loading ? (
                <div className="flex items-center gap-2 text-zinc-400 py-6">
                  <Play className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  <span>{isEs ? "Consultando endpoint de NestJS..." : "Querying NestJS endpoint..."}</span>
                </div>
              ) : (
                <pre className="text-emerald-400 leading-relaxed font-mono">
                  <code>{JSON.stringify(responseJson, null, 2)}</code>
                </pre>
              )}
            </div>

            {/* Terminal Footer */}
            <div className="px-4 py-2.5 bg-zinc-900/40 border-t border-zinc-800 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
              <span>NestJS 11 Core • Fastify/Express</span>
              <button
                onClick={() => executeRequest(activeEndpoint)}
                disabled={loading}
                className="flex items-center gap-1.5 text-zinc-300 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <Play className="w-3 h-3" />
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