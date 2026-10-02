"use client";

import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Server,
  Zap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Play,
  Layers,
  ArrowRight,
  Database,
  Cpu,
  Clock,
  Sparkles,
  Lock,
  Building2,
  TrendingDown,
  TrendingUp,
  Code2,
  HelpCircle,
  Flame,
} from "lucide-react";

type CircuitState = "CLOSED" | "OPEN" | "HALF-OPEN";

interface ServiceStatus {
  name: string;
  role: { es: string; en: string };
  icon: string;
  healthy: boolean;
  latencyMs: number;
  lastResponseCode: number;
}

export default function BffCircuitBreakerSimulator() {
  const { language, isDark } = usePortfolio();
  const isEs = language === "es";

  // Simulation parameters
  const [fxServiceFailing, setFxServiceFailing] = useState(false);
  const [circuitState, setCircuitState] = useState<CircuitState>("CLOSED");
  const [consecutiveFailures, setConsecutiveFailures] = useState(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<"topology" | "payload" | "code">("topology");
  const [codeSnippetTab, setCodeSnippetTab] = useState<"aggregator" | "circuit">("aggregator");
  const [lastExecutionMetrics, setLastExecutionMetrics] = useState({
    totalTimeMs: 24,
    status: 200,
    degraded: false,
    cacheHit: false,
    timestamp: "22:15:08",
  });

  // Services definitions
  const [services, setServices] = useState<ServiceStatus[]>([
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
      healthy: true,
      latencyMs: 48,
      lastResponseCode: 200,
    },
  ]);

  // Update FX service status when toggle changes
  useEffect(() => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.icon === "fx") {
          return {
            ...s,
            healthy: !fxServiceFailing,
            latencyMs: fxServiceFailing ? 3500 : 45,
            lastResponseCode: fxServiceFailing ? 503 : 200,
          };
        }
        return s;
      })
    );
  }, [fxServiceFailing]);

  // Trigger simulated request through BFF
  const handleTriggerRequest = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(1); // Client -> BFF

    setTimeout(() => {
      setActiveStep(2); // BFF Fan-out to microservices
      
      setTimeout(() => {
        setActiveStep(3); // Services responding back
        
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
        } else {
          // Recovering
          if (circuitState === "HALF-OPEN" || circuitState === "OPEN") {
            nextCircuitState = "CLOSED";
            setCircuitState("CLOSED");
            setConsecutiveFailures(0);
          }
        }

        // Calculate metrics
        const isDegraded = fxServiceFailing;
        const totalLatency = isDegraded
          ? nextCircuitState === "OPEN"
            ? 18 // Circuit is OPEN: fast failover from Redis without waiting
            : 65 // Circuit CLOSED but failed: wait for timeout & fallback
          : 32;

        setLastExecutionMetrics({
          totalTimeMs: totalLatency,
          status: 200, // BFF ALWAYS returns 200 OK with degraded flags!
          degraded: isDegraded,
          cacheHit: isDegraded,
          timestamp: new Date().toLocaleTimeString(),
        });

        setTimeout(() => {
          setActiveStep(4); // Aggregated response delivered to Client
          setTimeout(() => {
            setIsSimulating(false);
          }, 400);
        }, 350);
      }, 500);
    }, 450);
  };

  // Reset circuit breaker
  const handleResetBreaker = () => {
    setCircuitState("CLOSED");
    setConsecutiveFailures(0);
    setFxServiceFailing(false);
  };

  // Switch to half-open
  const handleSetHalfOpen = () => {
    setCircuitState("HALF-OPEN");
    setConsecutiveFailures(2);
  };

  return (
    <SpotlightCard
      spotlightColor="rgba(16, 185, 129, 0.20)"
      className="p-6 md:p-8 border-emerald-500/30 relative z-10 shadow-2xl mb-12"
    >
      {/* Top Banner: Enterprise Context & Badge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-zinc-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 font-bold shadow-inner">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isEs ? "Patrón Empresarial Itaú / IBM" : "Itaú / IBM Enterprise Pattern"}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-400">
              <Layers className="w-3 h-3" />
              <span>Backend-For-Frontend (BFF)</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-amber-400">
              <ShieldCheck className="w-3 h-3" />
              <span>Circuit Breaker Resiliency</span>
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{isEs ? "Orquestador BFF & Resiliencia ante Caídas" : "BFF Orchestrator & Failure Resiliency"}</span>
          </h3>
          <p className="text-zinc-400 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed">
            {isEs
              ? "En banca empresarial, el frontend jamás se conecta a microservicios directos. Un gateway NestJS BFF agrega datos en paralelo y aplica un Circuit Breaker con caché degradada para evitar caídas del sistema ante fallos de proveedores."
              : "In enterprise banking, clients never call raw microservices directly. A NestJS BFF gateway aggregates calls concurrently and applies a Circuit Breaker with fallback cache to prevent system crashes during downstream outages."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={handleTriggerRequest}
            disabled={isSimulating}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 cursor-pointer transition-all duration-300 shadow-lg ${
              isSimulating
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700"
                : "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 hover:scale-[1.02] shadow-emerald-500/20 border border-emerald-400"
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? "animate-spin" : ""}`} />
            <span>{isSimulating ? (isEs ? "Orquestando..." : "Orchestrating...") : (isEs ? "Disparar Petición BFF" : "Trigger BFF Request")}</span>
          </button>

          <button
            onClick={handleResetBreaker}
            title={isEs ? "Reiniciar estado del circuito" : "Reset circuit state"}
            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Scenario Controls & Breaker Status Indicator */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        
        {/* Scenario 1 & 2 Toggles */}
        <div className="md:col-span-8 p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isEs ? "Simular Escenario de Red" : "Simulate Network Scenario"}</span>
            </div>
            <div className="text-xs text-zinc-300">
              {fxServiceFailing
                ? (isEs ? "⚠️ Proveedor de Tasas FX está respondiendo con HTTP 503 / Timeout." : "⚠️ FX Rates Provider is returning HTTP 503 / Timeout.")
                : (isEs ? "✅ Todos los microservicios downstream operan con latencia normal (<50ms)." : "✅ All downstream microservices operating within normal latency (<50ms).")}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setFxServiceFailing(!fxServiceFailing)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                fxServiceFailing
                  ? "bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm shadow-rose-500/20"
                  : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-emerald-500 hover:text-white"
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${fxServiceFailing ? "text-rose-400 animate-pulse" : "text-zinc-400"}`} />
              <span>{fxServiceFailing ? (isEs ? "Falla Activa (503)" : "Outage Active (503)") : (isEs ? "Simular Caída FX" : "Simulate FX Outage")}</span>
            </button>
          </div>
        </div>

        {/* Circuit Breaker State Pill */}
        <div className="md:col-span-4 p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase font-bold">Circuit Breaker State</div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`w-3 h-3 rounded-full ${
                  circuitState === "CLOSED"
                    ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"
                    : circuitState === "OPEN"
                    ? "bg-rose-500 animate-ping shadow-[0_0_10px_#f43f5e]"
                    : "bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]"
                }`}
              />
              <span
                className={`text-sm font-mono font-black ${
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
            <span className="text-[10px] font-mono text-zinc-500 block">Consecutive Fails</span>
            <span className="text-xs font-mono font-bold text-zinc-300 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
              {consecutiveFailures} / 3 Threshold
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher: Topology View vs Response Payload vs NestJS Code */}
      <div className="flex items-center gap-2 mb-6 border-b border-zinc-800 pb-3">
        <button
          onClick={() => setActiveTab("topology")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "topology"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>{isEs ? "Topología & Flujo de Paquetes" : "Topology & Live Packet Flow"}</span>
        </button>

        <button
          onClick={() => setActiveTab("payload")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "payload"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>{isEs ? "Payload JSON Consolidado" : "Aggregated JSON Payload"}</span>
        </button>

        <button
          onClick={() => setActiveTab("code")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "code"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>{isEs ? "Código NestJS (TypeScript)" : "NestJS Implementation (TS)"}</span>
        </button>
      </div>

      {/* View 1: Topology & Live Packet Flow */}
      {activeTab === "topology" && (
        <div className="space-y-6">
          {/* Visual Architecture Map */}
          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 relative overflow-hidden">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-grid-tech opacity-40 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
              
              {/* Node 1: Client Application */}
              <div className={`lg:col-span-3 p-4 rounded-xl border transition-all duration-300 ${
                activeStep === 1 || activeStep === 4
                  ? "bg-zinc-900 border-emerald-400 shadow-lg shadow-emerald-500/10 scale-102"
                  : "bg-zinc-900/60 border-zinc-800"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">Client Layer</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>React / Mobile App</span>
                </div>
                <div className="text-[11px] text-zinc-400 mb-3">
                  {isEs ? "Frontend de Banca Online" : "Online Banking Client App"}
                </div>
                
                <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-[10px] text-zinc-300 space-y-1">
                  <div className="text-zinc-500">GET /api/v1/bff/dashboard</div>
                  <div className="text-emerald-400 font-semibold flex items-center justify-between">
                    <span>Latency:</span>
                    <span>{lastExecutionMetrics.totalTimeMs}ms</span>
                  </div>
                </div>
              </div>

              {/* Connector: Client -> BFF */}
              <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center relative">
                <div className="w-full h-0.5 bg-zinc-800 relative">
                  {(activeStep === 1 || activeStep === 4) && (
                    <div className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"
                      style={{ left: activeStep === 1 ? "40%" : "60%" }}
                    />
                  )}
                </div>
                <span className="text-[9px] font-mono text-zinc-500 mt-1">HTTPS/REST</span>
              </div>

              {/* Node 2: NestJS BFF Gateway */}
              <div className={`lg:col-span-4 p-5 rounded-xl border relative transition-all duration-300 ${
                activeStep === 2 || activeStep === 3
                  ? "bg-zinc-900 border-teal-400 shadow-xl shadow-teal-500/10 scale-102"
                  : "bg-zinc-900/80 border-zinc-800"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-teal-400 uppercase font-bold tracking-wider">Gateway Orchestrator</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-teal-300">
                    BFF Core
                  </span>
                </div>
                <div className="text-base font-bold text-white mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>NestJS BFF Service</span>
                </div>
                <div className="text-[11px] text-zinc-400 mb-3">
                  {isEs ? "Paralelizador & Circuit Breaker Interceptor" : "Concurrence Fan-out & Circuit Interceptor"}
                </div>

                {/* Sub-components of BFF */}
                <div className="space-y-1.5 font-mono text-[10px]">
                  <div className="flex items-center justify-between p-1.5 rounded bg-zinc-950/80 border border-zinc-800/80 text-zinc-300">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span>Promise.allSettled()</span>
                    </span>
                    <span className="text-emerald-400">Non-blocking</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded bg-zinc-950/80 border border-zinc-800/80 text-zinc-300">
                    <span className="flex items-center gap-1">
                      <Database className="w-3 h-3 text-blue-400" />
                      <span>Redis Stale Fallback Cache</span>
                    </span>
                    <span className="text-blue-300">Active</span>
                  </div>
                </div>
              </div>

              {/* Connector: BFF -> Microservices */}
              <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center relative">
                <div className="w-full h-0.5 bg-zinc-800 relative">
                  {(activeStep === 2 || activeStep === 3) && (
                    <div className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf] animate-pulse"
                      style={{ left: activeStep === 2 ? "70%" : "30%" }}
                    />
                  )}
                </div>
                <span className="text-[9px] font-mono text-zinc-500 mt-1">mTLS / gRPC</span>
              </div>

              {/* Node 3: 3 Downstream Microservices */}
              <div className="lg:col-span-3 space-y-2.5">
                {services.map((svc, i) => {
                  return (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl border transition-all duration-300 ${
                        !svc.healthy
                          ? "bg-rose-950/30 border-rose-500/50 shadow-sm shadow-rose-500/10"
                          : "bg-zinc-900/60 border-zinc-800/90"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-white truncate max-w-[170px]">
                          {svc.name.split(" ")[0]} Service
                        </span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                            svc.healthy
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse"
                          }`}
                        >
                          {svc.healthy ? "200 OK" : "503 DOWN"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                        <span>Latency:</span>
                        <span className={svc.healthy ? "text-zinc-300" : "text-rose-400 font-bold"}>
                          {svc.latencyMs}ms
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Enterprise Comparison Widget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Box 1: Without BFF / Circuit Breaker */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{isEs ? "Sin BFF ni Circuit Breaker (Arquitectura Frágil)" : "Without BFF & Circuit Breaker (Fragile)"}</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{isEs ? "Petición colgada esperando timeout downstream (3500ms+)." : "Request hangs waiting for downstream timeout (3500ms+)."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{isEs ? "HTTP 504 Gateway Timeout propagated al cliente de banca." : "HTTP 504 Gateway Timeout propagated to banking user."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{isEs ? "UI rota: la pantalla queda en blanco sin cargar saldos." : "Broken UI: screen crashes with no balance displayed."}</span>
                </li>
              </ul>
            </div>

            {/* Box 2: With NestJS BFF + Circuit Breaker */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{isEs ? "Con NestJS BFF + Circuit Breaker (Itaú / IBM)" : "With NestJS BFF + Circuit Breaker (Itaú / IBM)"}</span>
              </div>
              <ul className="text-xs text-zinc-300 space-y-2 font-mono">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{isEs ? "Latencia ultra rápida: ~18ms usando caché degradada." : "Ultra-fast response: ~18ms using stale fallback cache."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{isEs ? "HTTP 200 OK con bandera `_degraded: true` en payload." : "HTTP 200 OK with `_degraded: true` flag in payload."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{isEs ? "Zero Downtime: cliente ve saldos con aviso 'Tasas actualizadas hace 5m'." : "Zero Downtime: user sees balance with non-intrusive alert."}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Aggregated JSON Payload */}
      {activeTab === "payload" && (
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden font-mono text-xs shadow-2xl terminal-window">
          <div className="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-200 font-bold">GET /api/v1/bff/dashboard-overview</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400">
              <span>Status: <strong className="text-emerald-400">200 OK</strong></span>
              <span>•</span>
              <span>Execution: <strong className="text-emerald-300">{lastExecutionMetrics.totalTimeMs}ms</strong></span>
            </div>
          </div>
          <div className="p-4 custom-code-scroll overflow-x-auto max-h-[360px] text-emerald-300">
            <pre>
              <code>{JSON.stringify(
                {
                  timestamp: new Date().toISOString(),
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
                          reason: "Downstream FX provider timed out (503). Served cached rates.",
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
              )}</code>
            </pre>
          </div>
        </div>
      )}

      {/* View 3: NestJS Code Implementation */}
      {activeTab === "code" && (
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden font-mono text-xs shadow-2xl terminal-window">
          {/* Sub-selector for code snippet */}
          <div className="px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCodeSnippetTab("aggregator")}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  codeSnippetTab === "aggregator"
                    ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                bff-dashboard.service.ts
              </button>
              <button
                onClick={() => setCodeSnippetTab("circuit")}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  codeSnippetTab === "circuit"
                    ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                circuit-breaker.interceptor.ts
              </button>
            </div>
            <span className="text-zinc-500 text-[10px]">NestJS 11 • Fastify Core</span>
          </div>

          <div className="p-4 custom-code-scroll overflow-x-auto max-h-[380px] text-zinc-300">
            {codeSnippetTab === "aggregator" ? (
              <pre className="text-emerald-300 leading-relaxed">
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
              <pre className="text-teal-300 leading-relaxed">
                <code>{`@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failureCount = 0;
  private readonly threshold = 3;
  private readonly resetTimeoutMs = 15000;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
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
