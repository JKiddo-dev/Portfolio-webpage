"use client";

import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  RotateCcw,
  Terminal,
  FileCode2,
  Table,
  ShieldCheck,
  Check,
  Copy,
  Zap,
  Activity,
  Layers,
  Code2,
  Cpu,
  Filter,
} from "lucide-react";

interface TestCase {
  id: string;
  name: { es: string; en: string };
  durationMs: number;
  status: "pending" | "running" | "passed";
}

interface TestSuite {
  id: string;
  category: "bff" | "resilience" | "auth" | "iot";
  fileName: string;
  filePath: string;
  durationMs: number;
  status: "idle" | "running" | "passed";
  tests: TestCase[];
}

export default function TestRunnerWidget() {
  const { language } = usePortfolio();
  const isEs = language === "es";

  const [activeFilter, setActiveFilter] = useState<"all" | "bff" | "auth" | "iot">("all");
  const [activeTab, setActiveTab] = useState<"terminal" | "coverage" | "spec">("terminal");
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(100);
  const [currentRunningIndex, setCurrentRunningIndex] = useState<number | null>(null);
  const [activeSpecFile, setActiveSpecFile] = useState<"bff" | "iot">("bff");

  const initialSuites: TestSuite[] = [
    {
      id: "bff",
      category: "bff",
      fileName: "bff-aggregator.service.spec.ts",
      filePath: "src/bff/tests/bff-aggregator.service.spec.ts",
      durationMs: 142,
      status: "passed",
      tests: [
        {
          id: "t1",
          name: {
            es: "debe orquestar llamadas concurrentes a Auth, Ledger y FX mediante Promise.allSettled",
            en: "should orchestrate concurrent calls to Auth, Ledger & FX via Promise.allSettled",
          },
          durationMs: 24,
          status: "passed",
        },
        {
          id: "t2",
          name: {
            es: "debe retornar payload degradado con caché de Redis si el proveedor de FX falla con 503",
            en: "should return graceful degraded payload with Redis cache if FX provider fails with 503",
          },
          durationMs: 38,
          status: "passed",
        },
        {
          id: "t3",
          name: {
            es: "debe inyectar metadata de resiliencia (_staleFallback: true) en la respuesta del cliente",
            en: "should inject resilience metadata (_staleFallback: true) into client response",
          },
          durationMs: 18,
          status: "passed",
        },
      ],
    },
    {
      id: "resilience",
      category: "bff",
      fileName: "circuit-breaker.interceptor.spec.ts",
      filePath: "src/common/interceptors/circuit-breaker.spec.ts",
      durationMs: 118,
      status: "passed",
      tests: [
        {
          id: "t4",
          name: {
            es: "debe mantenerse en estado CLOSED mientras la tasa de error sea inferior al umbral (threshold = 3)",
            en: "should remain in CLOSED state while error rate is below threshold (threshold = 3)",
          },
          durationMs: 14,
          status: "passed",
        },
        {
          id: "t5",
          name: {
            es: "debe disparar transición a estado OPEN tras 3 fallos consecutivos en llamadas upstream",
            en: "should trip state transition to OPEN after 3 consecutive upstream failures",
          },
          durationMs: 26,
          status: "passed",
        },
        {
          id: "t6",
          name: {
            es: "debe transicionar a HALF-OPEN tras ventana de enfriamiento y evaluar petición canario",
            en: "should transition to HALF-OPEN after cooldown window and evaluate canary request",
          },
          durationMs: 32,
          status: "passed",
        },
      ],
    },
    {
      id: "auth",
      category: "auth",
      fileName: "jwt-enterprise.guard.spec.ts",
      filePath: "src/auth/guards/jwt-enterprise.guard.spec.ts",
      durationMs: 96,
      status: "passed",
      tests: [
        {
          id: "t7",
          name: {
            es: "debe verificar firma criptográfica RS256 con llave pública rotativa",
            en: "should verify cryptographic RS256 signature with rotating public key",
          },
          durationMs: 19,
          status: "passed",
        },
        {
          id: "t8",
          name: {
            es: "debe denegar acceso lanzando 401 Unauthorized ante tokens expirados o alterados",
            en: "should deny access throwing 401 Unauthorized upon expired or tampered tokens",
          },
          durationMs: 15,
          status: "passed",
        },
        {
          id: "t9",
          name: {
            es: "debe validar claims de cliente y permisos RBAC 'banking:read' para endpoints de saldos",
            en: "should validate client claims and RBAC 'banking:read' scopes for balance endpoints",
          },
          durationMs: 22,
          status: "passed",
        },
      ],
    },
    {
      id: "iot",
      category: "iot",
      fileName: "mqtt-mesh-gateway.service.spec.ts",
      filePath: "src/telemetry/tests/mqtt-mesh-gateway.spec.ts",
      durationMs: 165,
      status: "passed",
      tests: [
        {
          id: "t10",
          name: {
            es: "debe decodificar paquete binario LoRa (RSSI, SNR, batería, temperatura) desde nodo ESP32",
            en: "should decode binary LoRa packet (RSSI, SNR, battery, temperature) from ESP32 node",
          },
          durationMs: 28,
          status: "passed",
        },
        {
          id: "t11",
          name: {
            es: "debe descartar paquetes duplicados dentro de la ventana de saltos mesh (deduplication cache)",
            en: "should drop duplicate packets within mesh hop window (deduplication cache)",
          },
          durationMs: 34,
          status: "passed",
        },
        {
          id: "t12",
          name: {
            es: "debe persistir telemetría verificada en MongoDB con índice geográfico y emitir evento WebSocket",
            en: "should persist verified telemetry in MongoDB with geo-index and broadcast WebSocket event",
          },
          durationMs: 42,
          status: "passed",
        },
      ],
    },
  ];

  const [suites, setSuites] = useState<TestSuite[]>(initialSuites);

  const handleRunTests = () => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(5);

    // Reset suites to running/idle
    setSuites((prev) =>
      prev.map((s) => ({
        ...s,
        status: "idle",
        tests: s.tests.map((t) => ({ ...t, status: "pending" })),
      }))
    );

    // Run suites sequentially
    let step = 0;
    const interval = setInterval(() => {
      if (step < initialSuites.length) {
        const suiteIndex = step;
        setCurrentRunningIndex(suiteIndex);
        setProgress(Math.round(((suiteIndex + 1) / initialSuites.length) * 100));

        setSuites((prev) =>
          prev.map((s, idx) => {
            if (idx === suiteIndex) {
              return {
                ...s,
                status: "passed",
                tests: s.tests.map((t) => ({ ...t, status: "passed" })),
              };
            }
            return s;
          })
        );
        step++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setCurrentRunningIndex(null);
        setProgress(100);
      }
    }, 450);
  };

  const filteredSuites =
    activeFilter === "all"
      ? suites
      : suites.filter((s) => s.category === activeFilter);

  const totalTests = suites.reduce((acc, s) => acc + s.tests.length, 0);
  const passedTests = suites.reduce(
    (acc, s) => acc + s.tests.filter((t) => t.status === "passed").length,
    0
  );

  return (
    <SpotlightCard
      spotlightColor="rgba(59, 130, 246, 0.18)"
      className="p-6 md:p-8 border-blue-500/30 relative z-10 shadow-2xl mb-12"
    >
      {/* Top Banner: Context & Badge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-zinc-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 font-bold shadow-inner">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>{isEs ? "Garantía de Calidad & TDD" : "Quality Assurance & TDD"}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 font-semibold">
              <Zap className="w-3 h-3" />
              <span>Jest 29.7 & Vitest</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[11px] font-mono text-teal-400">
              <CheckCircle2 className="w-3 h-3" />
              <span>96.5% Coverage</span>
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{isEs ? "Consola de Tests en Vivo & Pipeline de Cobertura" : "Live Test Runner & Coverage Pipeline"}</span>
          </h3>
          <p className="text-zinc-400 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed">
            {isEs
              ? "Prueba en tiempo real la ejecución de la suite de pruebas unitarias y de integración de NestJS. Verificamos la agregación BFF, la resiliencia del Circuit Breaker y la ingesta LoRa antes de cada despliegue."
              : "Live test execution of the NestJS unit and integration test suite. We verify BFF aggregation, Circuit Breaker resiliency, and LoRa ingestion contracts prior to every production release."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 cursor-pointer transition-all duration-300 shadow-lg ${
              isRunning
                ? "bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-400 hover:scale-[1.02] shadow-blue-500/25 border border-blue-400"
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? (isEs ? "Ejecutando Jest..." : "Running Jest...") : (isEs ? "Ejecutar Tests (`npm test`)" : "Run Test Suite (`npm test`)")}</span>
          </button>
        </div>
      </div>

      {/* Progress & Quick Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
        
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-zinc-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>{isEs ? "Filtro:" : "Filter:"}</span>
          </span>
          {[
            { key: "all", label: isEs ? "Todas (4 Suites)" : "All (4 Suites)" },
            { key: "bff", label: "BFF & Resiliencia" },
            { key: "auth", label: "Auth & Security" },
            { key: "iot", label: "IoT LoRa Mesh" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeFilter === f.key
                  ? "bg-zinc-800 text-blue-300 font-bold border border-blue-500/40"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Status Counter Badge */}
        <div className="flex items-center gap-3 font-mono text-xs shrink-0">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className={`w-2 h-2 rounded-full ${isRunning ? "bg-amber-400 animate-ping" : "bg-emerald-400 animate-pulse"}`} />
            <span>Suites: <strong className="text-emerald-400">{passedTests > 0 ? "4/4 PASS" : "0/4"}</strong></span>
          </div>
          <span className="text-zinc-600">•</span>
          <div className="text-zinc-400">
            Tests: <strong className="text-emerald-300">{passedTests} / {totalTests}</strong>
          </div>
        </div>
      </div>

      {/* View Tabs: Terminal vs Coverage Table vs Spec Source */}
      <div className="flex items-center gap-2 mb-6 border-b border-zinc-800 pb-3">
        <button
          onClick={() => setActiveTab("terminal")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "terminal"
              ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>{isEs ? "Salida de Consola (Jest CLI)" : "Console Output (Jest CLI)"}</span>
        </button>

        <button
          onClick={() => setActiveTab("coverage")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "coverage"
              ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          <span>{isEs ? "Tabla de Cobertura (Istanbul/NYC)" : "Coverage Report (Istanbul/NYC)"}</span>
        </button>

        <button
          onClick={() => setActiveTab("spec")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "spec"
              ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span>{isEs ? "Código Spec Test (TypeScript)" : "Test Spec Source (TypeScript)"}</span>
        </button>
      </div>

      {/* View 1: Terminal Runner */}
      {activeTab === "terminal" && (
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden font-mono text-xs shadow-2xl terminal-window">
          
          {/* Terminal Window Top Bar */}
          <div className="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-zinc-400 text-[11px] ml-2 font-bold">
                bash - jest --runInBand --detectOpenHandles
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-zinc-400">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 font-bold">
                CI/CD READY
              </span>
            </div>
          </div>

          {/* Running progress beam */}
          {isRunning && (
            <div
              className="h-0.5 bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          )}

          {/* Terminal Content Body */}
          <div className="p-4 md:p-6 custom-code-scroll overflow-x-auto max-h-[420px] space-y-6">
            
            {filteredSuites.map((suite, sIdx) => {
              const isSuitePassed = suite.status === "passed";

              return (
                <div key={suite.id} className="space-y-2 border-b border-zinc-900/90 pb-4 last:border-b-0 last:pb-0">
                  {/* Suite Header */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isSuitePassed
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {isSuitePassed ? "PASS" : "RUNS"}
                    </span>
                    <span className="text-zinc-300 font-bold">{suite.filePath}</span>
                    <span className="text-zinc-500 text-[11px]">({suite.durationMs} ms)</span>
                  </div>

                  {/* Individual Tests */}
                  <div className="pl-4 space-y-1.5 pt-1">
                    {suite.tests.map((test) => {
                      const passed = test.status === "passed";

                      return (
                        <div
                          key={test.id}
                          className="flex items-start gap-2 text-[11px] text-zinc-300 leading-snug"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="flex-1">
                            {test.name[language]}
                          </span>
                          <span className="text-zinc-500 font-mono text-[10px] shrink-0">
                            ({test.durationMs} ms)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Jest Summary Footer */}
            <div className="pt-4 border-t border-zinc-800 text-[11px] space-y-1 font-mono">
              <div className="text-zinc-400">
                <span className="font-bold text-white">Test Suites: </span>
                <span className="text-emerald-400 font-bold">4 passed</span>, 4 total
              </div>
              <div className="text-zinc-400">
                <span className="font-bold text-white">Tests: </span>
                <span className="text-emerald-400 font-bold">12 passed</span>, 12 total
              </div>
              <div className="text-zinc-400">
                <span className="font-bold text-white">Snapshots: </span>
                <span>0 total</span>
              </div>
              <div className="text-zinc-400">
                <span className="font-bold text-white">Time: </span>
                <span className="text-zinc-300">0.824 s, estimated 1 s</span>
              </div>
              <div className="text-emerald-400 font-bold pt-1">
                ✓ Ran all test suites with 0 flaky tests.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Coverage Table */}
      {activeTab === "coverage" && (
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden font-mono text-xs shadow-2xl terminal-window">
          <div className="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between text-[11px]">
            <span className="text-zinc-300 font-bold flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5 text-blue-400" />
              <span>Coverage Summary Report (Istanbul / Jest)</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[10px]">
              THRESHOLD &gt; 90% PASS
            </span>
          </div>

          <div className="p-4 custom-code-scroll overflow-x-auto max-h-[380px]">
            <table className="w-full text-left font-mono text-[11px] border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                  <th className="py-2.5 px-3">File / Module</th>
                  <th className="py-2.5 px-3">% Stmts</th>
                  <th className="py-2.5 px-3">% Branch</th>
                  <th className="py-2.5 px-3">% Funcs</th>
                  <th className="py-2.5 px-3">% Lines</th>
                  <th className="py-2.5 px-3">Uncovered Lines</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                <tr className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-2.5 px-3 text-white font-bold">src/bff/</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">97.8%</td>
                  <td className="py-2.5 px-3 text-emerald-400">93.3%</td>
                  <td className="py-2.5 px-3 text-emerald-400">100%</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">97.8%</td>
                  <td className="py-2.5 px-3 text-zinc-500">42</td>
                </tr>
                <tr className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-2.5 px-3 text-white font-bold">src/resilience/</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">95.4%</td>
                  <td className="py-2.5 px-3 text-emerald-400">91.6%</td>
                  <td className="py-2.5 px-3 text-emerald-400">95.0%</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">95.4%</td>
                  <td className="py-2.5 px-3 text-zinc-500">68-71</td>
                </tr>
                <tr className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-2.5 px-3 text-white font-bold">src/auth/guards/</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">98.2%</td>
                  <td className="py-2.5 px-3 text-emerald-400">95.0%</td>
                  <td className="py-2.5 px-3 text-emerald-400">100%</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">98.2%</td>
                  <td className="py-2.5 px-3 text-zinc-500">31</td>
                </tr>
                <tr className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-2.5 px-3 text-white font-bold">src/telemetry/iot/</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">94.7%</td>
                  <td className="py-2.5 px-3 text-emerald-400">92.8%</td>
                  <td className="py-2.5 px-3 text-emerald-400">97.1%</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">94.7%</td>
                  <td className="py-2.5 px-3 text-zinc-500">104-108</td>
                </tr>
                {/* Total Summary Row */}
                <tr className="bg-zinc-900/70 border-t-2 border-zinc-700 text-white font-bold">
                  <td className="py-3 px-3">All files (Average)</td>
                  <td className="py-3 px-3 text-emerald-400">96.5%</td>
                  <td className="py-3 px-3 text-emerald-400">93.2%</td>
                  <td className="py-3 px-3 text-emerald-400">98.0%</td>
                  <td className="py-3 px-3 text-emerald-400">96.8%</td>
                  <td className="py-3 px-3 text-zinc-500">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 3: Spec Source Code */}
      {activeTab === "spec" && (
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden font-mono text-xs shadow-2xl terminal-window">
          <div className="px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSpecFile("bff")}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  activeSpecFile === "bff"
                    ? "bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                bff-aggregator.service.spec.ts
              </button>
              <button
                onClick={() => setActiveSpecFile("iot")}
                className={`px-2.5 py-1 rounded cursor-pointer ${
                  activeSpecFile === "iot"
                    ? "bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                mqtt-mesh-gateway.spec.ts
              </button>
            </div>
            <span className="text-zinc-500 text-[10px]">Jest 29 / ts-jest / Vitest</span>
          </div>

          <div className="p-4 custom-code-scroll overflow-x-auto max-h-[380px] text-zinc-300">
            {activeSpecFile === "bff" ? (
              <pre className="text-blue-300 leading-relaxed">
                <code>{`describe('BffDashboardService (Unit & Integration)', () => {
  let service: BffDashboardService;
  let fxClient: jest.Mocked<FxServiceClient>;
  let cacheManager: jest.Mocked<Cache>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BffDashboardService,
        { provide: AuthServiceClient, useValue: mockAuthClient },
        { provide: CoreBankingClient, useValue: mockBankingClient },
        { provide: FxServiceClient, useValue: mockFxClient },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile();

    service = module.get<BffDashboardService>(BffDashboardService);
  });

  it('should gracefully degrade and retrieve fallback rates from Redis if FX provider throws 503', async () => {
    // Simulate upstream timeout / outage
    fxClient.getLatestRates.mockRejectedValue(new ServiceUnavailableException('FX Provider Down'));
    cacheManager.get.mockResolvedValue({ usd_clp: 948.5, source: 'REDIS_CACHE' });

    const result = await service.getConsolidatedDashboard('usr_itau_994208');

    expect(result).toBeDefined();
    expect(result.accounts).toHaveLength(2);
    expect(result.fxRates._staleFallback).toBe(true);
    expect(cacheManager.get).toHaveBeenCalledWith('FALLBACK_FX_RATES');
  });
});`}</code>
              </pre>
            ) : (
              <pre className="text-teal-300 leading-relaxed">
                <code>{`describe('MqttMeshGatewayService (LoRa Telemetry)', () => {
  let gateway: MqttMeshGatewayService;
  let telemetryRepo: jest.Mocked<TelemetryRepository>;

  it('should deduplicate repeated packet IDs within a 5-second mesh flood window', async () => {
    const rawPacket = Buffer.from('LORA:PKT:00102:TEMP:22.4:RSSI:-84');

    const firstIngest = await gateway.processRawPacket(rawPacket);
    const duplicateIngest = await gateway.processRawPacket(rawPacket);

    expect(firstIngest.status).toBe('PERSISTED_TO_MONGO');
    expect(duplicateIngest.status).toBe('DROPPED_DUPLICATE');
    expect(telemetryRepo.save).toHaveBeenCalledTimes(1);
  });
});`}</code>
              </pre>
            )}
          </div>
        </div>
      )}
    </SpotlightCard>
  );
}
