"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Play,
  Layers,
  Database,
  Cpu,
  Building2,
  Code2,
  Flame,
} from "lucide-react";

type CircuitState = "CLOSED" | "OPEN" | "HALF-OPEN";

interface ServiceStatus {
  name: string;
  role: { es: string; en: string };
  icon: "auth" | "banking" | "fx";
  healthy: boolean;
  latencyMs: number;
  lastResponseCode: number;
}

export default function BffCircuitBreakerSimulator() {
  const { language } = usePortfolio();
  const isEs = language === "es";

  const [fxServiceFailing, setFxServiceFailing] = useState(false);
  const [circuitState, setCircuitState] = useState<CircuitState>("CLOSED");
  const [consecutiveFailures, setConsecutiveFailures] = useState(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<"topology" | "payload" | "code">(
    "topology"
  );
  const [codeSnippetTab, setCodeSnippetTab] = useState<
    "aggregator" | "circuit"
  >("aggregator");
  const [lastExecutionMetrics, setLastExecutionMetrics] = useState({
    totalTimeMs: 24,
    status: 200,
    degraded: false,
    cacheHit: false,
    timestamp: "22:15:08",
  });

  const services: ServiceStatus[] = [
    {
      name: "Auth & Identity (JWT / RS256)",
      role: {
        es: "Validación de token criptográfico y scopes de cliente",
        en: "Cryptographic token validation & client RBAC scopes",
      },
      icon: "auth",
      healthy: true,
      latencyMs: 14,
      lastResponseCode: 200,
    },
    {
      name: "Core Banking Ledger (Itaú Accounts)",
      role: {
        es: "Consulta de saldos, cuentas corrientes y movimientos recientes",
        en: "Account balances, checking ledger & recent transactions",
      },
      icon: "banking",
      healthy: true,
      latencyMs: 22,
      lastResponseCode: 200,
    },
    {
      name: "FX & Market Rates (External Provider)",
      role: {
        es: "Cotizaciones en vivo USD/CLP, EUR/CLP y UF",
        en: "Real-time live quotes for USD/CLP, EUR/CLP & UF",
      },
      icon: "fx",
      healthy: !fxServiceFailing,
      latencyMs: fxServiceFailing ? 3500 : 45,
      lastResponseCode: fxServiceFailing ? 503 : 200,
    },
  ];

  const handleTriggerRequest = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(1);

    setTimeout(() => {
      setActiveStep(2);

      setTimeout(() => {
        setActiveStep(3);

        let newFailures = consecutiveFailures;
        let nextCircuitState: CircuitState = circuitState;

        if (fxServiceFailing) {
          newFailures += 1;
          setConsecutiveFailures(newFailures);

          if (newFailures >= 3) {
            nextCircuitState = "OPEN";
            setCircuitState("OPEN");
          } else if (circuitState === "CLOSED") {
            nextCircuitState = "CLOSED";
          }
        } else if (circuitState === "HALF-OPEN" || circuitState === "OPEN") {
          nextCircuitState = "CLOSED";
          setCircuitState("CLOSED");
          setConsecutiveFailures(0);
        }

        const isDegraded = fxServiceFailing;
        const totalLatency = isDegraded
          ? nextCircuitState === "OPEN"
            ? 18
            : 65
          : 32;

        setLastExecutionMetrics({
          totalTimeMs: totalLatency,
          status: 200,
          degraded: isDegraded,
          cacheHit: isDegraded,
          timestamp: new Date().toLocaleTimeString(),
        });

        setTimeout(() => {
          setActiveStep(4);
          setTimeout(() => {
            setIsSimulating(false);
          }, 400);
        }, 350);
      }, 500);
    }, 450);
  };

  const handleResetBreaker = () => {
    setCircuitState("CLOSED");
    setConsecutiveFailures(0);
    setFxServiceFailing(false);
  };

  const handleSetHalfOpen = () => {
    setCircuitState("HALF-OPEN");
    setConsecutiveFailures(2);
  };

  return (
    <SpotlightCard className="p-6 sm:p-8 mb-12">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between pb-6 mb-6 border-b border-zinc-800 gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="badge-accent inline-flex items-center gap-1.5">
              <Building2 className="w-3 h-3 shrink-0" />
              <span>
                {isEs
                  ? "Patrón Empresarial Itaú / IBM"
                  : "Itaú / IBM Enterprise Pattern"}
              </span>
            </span>
            <span className="badge-mono inline-flex items-center gap-1">
              <Layers className="w-3 h-3 shrink-0" />
              <span>Backend-For-Frontend (BFF)</span>
            </span>
            <span className="badge-mono inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 shrink-0" />
              <span>Circuit Breaker</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {isEs
              ? "Orquestador BFF & Resiliencia ante Caídas"
              : "BFF Orchestrator & Failure Resiliency"}
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
            {isEs
              ? "En banca empresarial, el frontend jamás se conecta a microservicios directos. Un gateway NestJS BFF agrega datos en paralelo y aplica un Circuit Breaker con caché degradada para evitar caídas del sistema ante fallos de proveedores."
              : "In enterprise banking, clients never call raw microservices directly. A NestJS BFF gateway aggregates calls concurrently and applies a Circuit Breaker with fallback cache to prevent system crashes during downstream outages."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={handleTriggerRequest}
            disabled={isSimulating}
            className="btn-primary px-4 py-2.5 font-mono text-xs font-semibold inline-flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <Play
              className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`}
            />
            <span>
              {isSimulating
                ? isEs
                  ? "Orquestando..."
                  : "Orchestrating..."
                : isEs
                ? "Disparar Petición BFF"
                : "Trigger BFF Request"}
            </span>
          </button>

          <button
            type="button"
            onClick={handleSetHalfOpen}
            title={
              isEs
                ? "Probar estado HALF-OPEN (petición canario)"
                : "Test HALF-OPEN state (canary request)"
            }
            className="btn-secondary px-3 py-2.5 font-mono text-xs cursor-pointer"
          >
            Half-Open
          </button>

          <button
            type="button"
            onClick={handleResetBreaker}
            title={
              isEs ? "Reiniciar estado del circuito" : "Reset circuit state"
            }
            aria-label={
              isEs ? "Reiniciar estado del circuito" : "Reset circuit state"
            }
            className="btn-secondary p-2.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Scenario Controls & Breaker Status */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-8 p-4 rounded-md bg-zinc-950/70 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] font-mono text-zinc-400 uppercase font-semibold tracking-wider mb-1">
              {isEs ? "Escenario de Red" : "Network Scenario"}
            </div>
            <div className="text-xs text-zinc-300 leading-relaxed">
              {fxServiceFailing
                ? isEs
                  ? "Proveedor de Tasas FX respondiendo con HTTP 503 / Timeout."
                  : "FX Rates Provider returning HTTP 503 / Timeout."
                : isEs
                ? "Todos los microservicios downstream operan con latencia normal (<50ms)."
                : "All downstream microservices operating within normal latency (<50ms)."}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFxServiceFailing(!fxServiceFailing)}
            className={`px-3 py-2 rounded-md text-xs font-mono font-semibold transition-colors border cursor-pointer inline-flex items-center gap-1.5 shrink-0 ${
              fxServiceFailing
                ? "bg-rose-500/15 text-rose-400 border-rose-500/40"
                : "btn-secondary"
            }`}
          >
            <Flame
              className={`w-3.5 h-3.5 shrink-0 ${
                fxServiceFailing ? "text-rose-400" : "text-zinc-400"
              }`}
            />
            <span>
              {fxServiceFailing
                ? isEs
                  ? "Falla Activa (503)"
                  : "Outage Active (503)"
                : isEs
                ? "Simular Caída FX"
                : "Simulate FX Outage"}
            </span>
          </button>
        </div>

        <div className="md:col-span-4 p-4 rounded-md bg-zinc-950/70 border border-zinc-800 flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase font-semibold tracking-wider">
              Circuit Breaker
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  circuitState === "CLOSED"
                    ? "bg-emerald-500"
                    : circuitState === "OPEN"
                    ? "bg-rose-500"
                    : "bg-amber-400"
                }`}
              />
              <span
                className={`text-sm font-mono font-bold ${
                  circuitState === "CLOSED"
                    ? "text-emerald-400"
                    : circuitState === "OPEN"
                    ? "text-rose-400"
                    : "text-amber-400"
                }`}
              >
                {circuitState}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-zinc-500 block">
              {isEs ? "Fallos seguidos" : "Consecutive Fails"}
            </span>
            <span className="badge-mono mt-1 inline-block">
              {consecutiveFailures} / 3
            </span>
          </div>
        </div>
      </div>

      {/* Segmented Tabs Switcher */}
      <div
        role="tablist"
        aria-label={isEs ? "Vistas del simulador BFF" : "BFF simulator views"}
        className="inline-flex flex-wrap gap-1 p-1 rounded-md bg-zinc-950/80 border border-zinc-800 mb-6"
      >
        {(
          [
            {
              key: "topology",
              icon: Activity,
              label: isEs
                ? "Topología & Flujo"
                : "Topology & Packet Flow",
            },
            {
              key: "payload",
              icon: Database,
              label: isEs
                ? "Payload JSON"
                : "Aggregated JSON",
            },
            {
              key: "code",
              icon: Code2,
              label: isEs
                ? "Código NestJS (TS)"
                : "NestJS Source (TS)",
            },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                isSelected
                  ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* View 1: Topology & Live Packet Flow */}
      {activeTab === "topology" && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 rounded-lg bg-zinc-950/70 border border-zinc-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Node 1: Client Application */}
              <div
                className={`lg:col-span-3 p-4 rounded-md border transition-colors ${
                  activeStep === 1 || activeStep === 4
                    ? "bg-zinc-900 border-emerald-500/70"
                    : "bg-zinc-900/70 border-zinc-800"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold tracking-wider">
                    Client Layer
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-sm font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>React / Mobile App</span>
                </div>
                <div className="text-[11px] text-zinc-400 mb-3">
                  {isEs
                    ? "Frontend de Banca Online"
                    : "Online Banking Client App"}
                </div>

                <div className="p-2 rounded-md bg-zinc-950 border border-zinc-800 font-mono text-[10px] text-zinc-300 space-y-1">
                  <div className="text-zinc-500 truncate">
                    GET /api/v1/bff/dashboard
                  </div>
                  <div className="text-emerald-400 font-semibold flex items-center justify-between">
                    <span>Latency:</span>
                    <span>{lastExecutionMetrics.totalTimeMs}ms</span>
                  </div>
                </div>
              </div>

              {/* Connector: Client -> BFF */}
              <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center">
                <div className="w-full h-px bg-zinc-700 relative">
                  {(activeStep === 1 || activeStep === 4) && (
                    <div
                      className="absolute -top-1 w-2 h-2 rounded-full bg-emerald-400"
                      style={{ left: activeStep === 1 ? "40%" : "60%" }}
                    />
                  )}
                </div>
                <span className="text-[9px] font-mono text-zinc-500 mt-1.5">
                  HTTPS
                </span>
              </div>

              {/* Node 2: NestJS BFF Gateway */}
              <div
                className={`lg:col-span-4 p-4 sm:p-5 rounded-md border transition-colors ${
                  activeStep === 2 || activeStep === 3
                    ? "bg-zinc-900 border-emerald-500/70"
                    : "bg-zinc-900/70 border-zinc-800"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold tracking-wider">
                    Gateway Orchestrator
                  </span>
                  <span className="badge-mono">BFF Core</span>
                </div>
                <div className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>NestJS BFF Service</span>
                </div>
                <div className="text-[11px] text-zinc-400 mb-3">
                  {isEs
                    ? "Paralelizador & Circuit Breaker Interceptor"
                    : "Concurrent Fan-out & Circuit Interceptor"}
                </div>

                <div className="space-y-1.5 font-mono text-[10px]">
                  <div className="flex items-center justify-between gap-2 p-2 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300">
                    <span className="flex items-center gap-1.5 min-w-0">
                      <Zap className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">Promise.allSettled()</span>
                    </span>
                    <span className="text-emerald-400 shrink-0">
                      Non-blocking
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 p-2 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300">
                    <span className="flex items-center gap-1.5 min-w-0">
                      <Database className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">Redis Stale Fallback</span>
                    </span>
                    <span className="text-zinc-300 shrink-0">Active</span>
                  </div>
                </div>
              </div>

              {/* Connector: BFF -> Microservices */}
              <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center">
                <div className="w-full h-px bg-zinc-700 relative">
                  {(activeStep === 2 || activeStep === 3) && (
                    <div
                      className="absolute -top-1 w-2 h-2 rounded-full bg-emerald-400"
                      style={{ left: activeStep === 2 ? "65%" : "30%" }}
                    />
                  )}
                </div>
                <span className="text-[9px] font-mono text-zinc-500 mt-1.5">
                  mTLS
                </span>
              </div>

              {/* Node 3: Downstream Microservices */}
              <div className="lg:col-span-3 space-y-2.5">
                {services.map((svc) => (
                  <div
                    key={svc.icon}
                    className={`p-3 rounded-md border transition-colors ${
                      !svc.healthy
                        ? "bg-rose-950/20 border-rose-500/50"
                        : "bg-zinc-900/70 border-zinc-800"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-white truncate">
                        {svc.name.split(" ")[0]} Service
                      </span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm font-semibold shrink-0 border ${
                          svc.healthy
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-rose-500/15 text-rose-400 border-rose-500/40"
                        }`}
                      >
                        {svc.healthy ? "200 OK" : "503 DOWN"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span>Latency:</span>
                      <span
                        className={
                          svc.healthy
                            ? "text-zinc-300"
                            : "text-rose-400 font-semibold"
                        }
                      >
                        {svc.latencyMs}ms
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-md bg-zinc-950/70 border border-rose-500/35">
              <div className="flex items-center gap-2 mb-2.5 text-rose-400 font-mono text-xs font-semibold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  {isEs
                    ? "Sin BFF ni Circuit Breaker"
                    : "Without BFF & Circuit Breaker"}
                </span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>
                    {isEs
                      ? "Petición colgada esperando timeout downstream (3500ms+)."
                      : "Request hangs waiting for downstream timeout (3500ms+)."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>
                    {isEs
                      ? "HTTP 504 Gateway Timeout propagado al cliente de banca."
                      : "HTTP 504 Gateway Timeout propagated to banking user."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>
                    {isEs
                      ? "UI rota: la pantalla queda en blanco sin cargar saldos."
                      : "Broken UI: screen crashes with no balance displayed."}
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-md bg-zinc-950/70 border border-emerald-500/35">
              <div className="flex items-center gap-2 mb-2.5 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>
                  {isEs
                    ? "Con NestJS BFF + Circuit Breaker"
                    : "With NestJS BFF + Circuit Breaker"}
                </span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {isEs
                      ? "Latencia ultra rápida: ~18ms usando caché degradada."
                      : "Ultra-fast response: ~18ms using stale fallback cache."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {isEs
                      ? "HTTP 200 OK con bandera `_degraded: true` en payload."
                      : "HTTP 200 OK with `_degraded: true` flag in payload."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {isEs
                      ? "Zero Downtime: cliente ve saldos con aviso no intrusivo."
                      : "Zero Downtime: user sees balance with non-intrusive notice."}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Aggregated JSON Payload */}
      {activeTab === "payload" && (
        <div className="terminal-window rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden font-mono text-xs">
          <div className="px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
            <span className="text-zinc-200 font-semibold truncate">
              GET /api/v1/bff/dashboard-overview
            </span>
            <div className="flex items-center gap-3 text-zinc-400 shrink-0">
              <span>
                Status: <strong className="text-emerald-400">200 OK</strong>
              </span>
              <span>
                Time:{" "}
                <strong className="text-emerald-300">
                  {lastExecutionMetrics.totalTimeMs}ms
                </strong>
              </span>
            </div>
          </div>
          <div className="p-4 custom-code-scroll overflow-x-auto max-h-[360px] text-emerald-300">
            <pre>
              <code>
                {JSON.stringify(
                  {
                    timestamp: lastExecutionMetrics.timestamp,
                    clientSession: {
                      userId: "usr_itau_994208",
                      tier: "Enterprise Banking Client",
                      sessionValid: true,
                      authMechanism: "RS256_JWT_VERIFIED",
                    },
                    accountsLedger: [
                      {
                        accountNumber: "02-489201-9",
                        currency: "CLP",
                        availableBalance: 14850000,
                        overdraftLimit: 5000000,
                      },
                      {
                        accountNumber: "02-119402-4",
                        currency: "USD",
                        availableBalance: 8450.0,
                      },
                    ],
                    marketRates: fxServiceFailing
                      ? {
                          usd_clp: 948.5,
                          eur_clp: 1022.1,
                          _resilienceMeta: {
                            circuitBreakerState: circuitState,
                            isStaleFallback: true,
                            source: "REDIS_FALLBACK_CACHE",
                            reason:
                              "Downstream FX provider timed out (503). Served cached rates.",
                          },
                        }
                      : {
                          usd_clp: 952.1,
                          eur_clp: 1024.8,
                          _resilienceMeta: {
                            circuitBreakerState: "CLOSED",
                            isStaleFallback: false,
                            source: "LIVE_STREAM_UPSTREAM",
                          },
                        },
                    bffMetadata: {
                      aggregatedBy: "NestJS BFF Microservice Gateway",
                      parallelConcurrency: "Promise.allSettled(3)",
                      circuitBreaker: circuitState,
                    },
                  },
                  null,
                  2
                )}
              </code>
            </pre>
          </div>
        </div>
      )}

      {/* View 3: NestJS Code Implementation */}
      {activeTab === "code" && (
        <div className="terminal-window rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden font-mono text-xs">
          <div className="px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setCodeSnippetTab("aggregator")}
                className={`px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                  codeSnippetTab === "aggregator"
                    ? "bg-zinc-800 text-emerald-400 font-semibold border border-zinc-700"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                bff-dashboard.service.ts
              </button>
              <button
                type="button"
                onClick={() => setCodeSnippetTab("circuit")}
                className={`px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                  codeSnippetTab === "circuit"
                    ? "bg-zinc-800 text-emerald-400 font-semibold border border-zinc-700"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                circuit-breaker.interceptor.ts
              </button>
            </div>
            <span className="text-zinc-500 text-[10px]">
              NestJS 11 • Fastify Core
            </span>
          </div>

          <div className="p-4 custom-code-scroll overflow-x-auto max-h-[380px] text-zinc-200">
            {codeSnippetTab === "aggregator" ? (
              <pre className="text-zinc-200 leading-relaxed">
                <code>{`@Injectable()
export class BffDashboardService {
  constructor(
    private readonly authClient: AuthServiceClient,
    private readonly coreBankingClient: CoreBankingClient,
    private readonly fxServiceClient: FxServiceClient,
    private readonly cacheManager: Cache,
  ) {}

  async getConsolidatedDashboard(userId: string): Promise<DashboardOverviewDto> {
    // Fan-out concurrency using Promise.allSettled to eliminate single points of failure
    const [authRes, ledgerRes, fxRes] = await Promise.allSettled([
      this.authClient.validateSession(userId),
      this.coreBankingClient.getAccounts(userId),
      this.fxServiceClient.getLatestRates(),
    ]);

    // Handle FX fallback with grace if circuit breaker tripped or service down
    let fxData = fxRes.status === 'fulfilled' ? fxRes.value : null;
    let isStale = false;

    if (!fxData) {
      // Retrieve fallback snapshot from Redis cache
      fxData = await this.cacheManager.get('FALLBACK_FX_RATES');
      isStale = true;
    }

    return {
      user: authRes.status === 'fulfilled' ? authRes.value : null,
      accounts: ledgerRes.status === 'fulfilled' ? ledgerRes.value : [],
      fxRates: { ...fxData, _staleFallback: isStale },
      aggregatedAt: new Date().toISOString(),
    };
  }
}`}</code>
              </pre>
            ) : (
              <pre className="text-zinc-200 leading-relaxed">
                <code>{`@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failureCount = 0;
  private readonly threshold = 3;
  private readonly resetTimeoutMs = 15000;

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (this.state === 'OPEN') {
      // Fail-fast directly to fallback without blocking downstream worker threads
      throw new CircuitBreakerOpenException('Service in OPEN state; rerouting to cache');
    }

    return next.handle().pipe(
      tap(() => {
        if (this.state === 'HALF_OPEN') {
          this.state = 'CLOSED';
          this.failureCount = 0;
        }
      }),
      catchError((err) => {
        this.failureCount++;
        if (this.failureCount >= this.threshold) {
          this.state = 'OPEN';
          setTimeout(() => (this.state = 'HALF_OPEN'), this.resetTimeoutMs);
        }
        return throwError(() => err);
      }),
    );
  }
}`}</code>
              </pre>
            )}
          </div>
        </div>
      )}
    </SpotlightCard>
  );
}
