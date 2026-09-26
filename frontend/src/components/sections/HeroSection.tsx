"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import {
  Copy,
  Check,
  Radio,
  Server,
  Layers,
  Cpu,
  ArrowUpRight,
  Code2,
  Play,
  Activity,
  CheckCircle2,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

export default function HeroSection() {
  const { t, language } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "status">("code");
  const isEs = language === "es";

  // Interactive 3D Card Tilt State for Console
  const consoleRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  // Interactive Live Pipeline Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [showSimResult, setShowSimResult] = useState(false);

  // Live Telemetry dynamic counters
  const [livePing, setLivePing] = useState(19);
  const [packetCount, setPacketCount] = useState(14892);

  // Periodic telemetry micro-fluctuation to make it feel alive
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePing((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.max(14, Math.min(26, prev + delta));
      });
      setPacketCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleConsoleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!consoleRef.current) return;
    const rect = consoleRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: -y * 8, // subtle 8deg tilt
      y: x * 8,
    });
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.12,
    });
  };

  const handleConsoleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  // Run simulated ingestion pipeline
  const runSimulation = () => {
    if (isSimulating) return;
    setActiveTab("code");
    setIsSimulating(true);
    setShowSimResult(false);
    setSimStep(1);

    setTimeout(() => setSimStep(2), 450);
    setTimeout(() => setSimStep(3), 900);
    setTimeout(() => {
      setSimStep(4);
      setShowSimResult(true);
      setIsSimulating(false);
      setPacketCount((c) => c + 1);
    }, 1400);
  };

  const codeSnippet = `// Full-Stack Architecture: NestJS BFF + MQTT IoT Gateway
@Injectable()
export class RioClarilloMeshService {
  constructor(
    private readonly mqttClient: MqttClientService,
    private readonly mongoDb: TelemetryRepository,
    private readonly eventBus: EventBus
  ) {}

  @SubscribePattern('parque/clarillo/mesh/+/telemetry')
  async handlePacket(packet: LoRaMeshPacketDto) {
    const verified = await this.crypto.verifySignature(packet);
    await this.mongoDb.saveTelemetry(verified);
    return this.eventBus.emit('packet.ingested', verified);
  }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-32 pb-20 overflow-hidden"
    >
      {/* Background Engineering Grid with Radial Vignette */}
      <div className="absolute inset-0 bg-grid-tech bg-radial-fade opacity-70 pointer-events-none" />

      {/* Atmospheric dynamic floating ambient lights */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-600/15 via-teal-500/10 to-transparent rounded-full blur-[140px] pointer-events-none animate-float-slow" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/3 -translate-y-1/3 w-[550px] h-[380px] bg-gradient-to-br from-blue-600/15 via-purple-600/10 to-transparent rounded-full blur-[150px] pointer-events-none animate-float-reverse" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col xl:flex-row items-center gap-12 xl:gap-10">
        
        {/* ================= LEFT COLUMN: Presentation & CTAs ================= */}
        <div className="flex-1 flex flex-col items-center xl:items-start text-center xl:text-left w-full">
          
          {/* Status Badge with Dual-Ring Radar Pulse */}
          <div className="group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md text-xs font-mono text-zinc-300 mb-8 shadow-inner hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all duration-300 cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            </span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
              {t.hero.role}
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-400 hidden sm:inline flex items-center gap-1">
              <span>TypeScript</span>
              <span className="text-zinc-600">/</span>
              <span>NestJS</span>
              <span className="text-zinc-600">/</span>
              <span>Next.js</span>
            </span>
            <span className="ml-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
              {isEs ? "Activo" : "Active"}
            </span>
          </div>

          {/* Punchy Title with Living Shimmer Gradient */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-4xl mb-6">
            {t.hero.headlinePrefix}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 via-cyan-400 to-emerald-400 animate-gradient-flow drop-shadow-sm">
              {t.hero.headlineGradient}
            </span>
          </h1>

          {/* Executive Summary */}
          <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-normal">
            {t.hero.summary}
          </p>

          {/* Interactive CTAs with Shimmer Beam */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8 xl:mb-0">
            {/* Primary Button */}
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto overflow-hidden cursor-pointer"
            >
              {/* Shimmer light beam running across */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shimmer-beam pointer-events-none" />
              
              <span className="relative z-10">{t.hero.exploreBtn}</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>

            {/* Secondary Button */}
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm bg-zinc-900/80 hover:bg-zinc-800/90 text-zinc-200 hover:text-white border border-zinc-800 hover:border-zinc-700 backdrop-blur-md hover:shadow-lg hover:shadow-zinc-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              <span>{t.hero.contactBtn}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
            </a>
          </div>

          {/* Quick Credential Highlights */}
          <div className="mt-8 flex items-center gap-6 text-xs text-zinc-500 font-mono">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>IBM Consulting & Itaú</span>
            </div>
            <span className="text-zinc-700">•</span>
            <div className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-teal-400" />
              <span>IoT Río Clarillo</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: 3D Console & Micro-Telemetry ================= */}
        <div className="flex-1 w-full flex flex-col items-center xl:items-end gap-6 max-w-3xl">
          
          {/* Interactive 3D Developer Console */}
          <div
            ref={consoleRef}
            onMouseMove={handleConsoleMouseMove}
            onMouseLeave={handleConsoleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.002, 1.002, 1.002)`,
              transition: "transform 0.15s cubic-bezier(0.2, 0, 0, 1)",
            }}
            className="group relative w-full text-left rounded-2xl border border-zinc-800/90 bg-zinc-950/90 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-zinc-700/80 hover:shadow-emerald-500/5"
          >
            {/* Dynamic Specular Glare Layer */}
            <div
              className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl"
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle 350px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.12), transparent 70%)`,
              }}
            />

            {/* Laser scanning beam during live simulation */}
            {isSimulating && (
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] z-20 pointer-events-none animate-laser-scan" />
            )}

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/70 border-b border-zinc-800/80 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:brightness-125 transition-all cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:brightness-125 transition-all cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 hover:brightness-125 transition-all cursor-pointer" />
                
                {/* Tabs */}
                <div className="ml-3 flex items-center gap-1 font-mono text-xs">
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "code"
                        ? "bg-zinc-800 text-emerald-400 font-semibold shadow-sm"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <Code2 className="w-3 h-3" />
                    <span>{t.hero.consoleTab1}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("status")}
                    className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "status"
                        ? "bg-zinc-800 text-emerald-400 font-semibold shadow-sm"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <Activity className="w-3 h-3" />
                    <span>{t.hero.consoleTab2}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons in Console Header */}
              <div className="flex items-center gap-2">
                {/* Interactive Simulation Button */}
                <button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className={`flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded transition-all cursor-pointer ${
                    isSimulating
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-zinc-800/80 hover:bg-emerald-500/15 text-zinc-300 hover:text-emerald-300 border border-zinc-700/60 hover:border-emerald-500/30"
                  }`}
                  title={isEs ? "Simular ejecución del pipeline" : "Simulate pipeline execution"}
                >
                  <Play className={`w-3 h-3 ${isSimulating ? "animate-spin text-emerald-400" : "text-emerald-400 fill-emerald-400/20"}`} />
                  <span>{isSimulating ? (isEs ? "Ejecutando..." : "Running...") : (isEs ? "Simular" : "Run Test")}</span>
                </button>

                {/* Copy Button */}
                {activeTab === "code" && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white px-2.5 py-1 rounded bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
                    title="Copiar snippet"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? t.hero.copied : t.hero.copy}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Console Body */}
            <div className="p-5 font-mono text-xs overflow-x-auto relative z-10 custom-code-scroll">
              {activeTab === "code" ? (
                <div className="relative">
                  <pre className="text-zinc-300 leading-relaxed font-mono">
                    <code>
                      <span className="text-purple-400">{"// NestJS Microservice • Full-Stack Rio Clarillo IoT Platform"}</span>{"\n"}
                      <span className="text-blue-400">{"@Injectable"}</span>(){"\n"}
                      <span className="text-red-400">{"export class"}</span> <span className="text-emerald-400">{"RioClarilloMeshService"}</span> {"{\n"}
                      {"  "}<span className="text-red-400">{"constructor"}</span>({"{\n"}
                      {"    "}<span className="text-zinc-400">{"private readonly"}</span> mqttClient: <span className="text-teal-400">{"MqttClientService"}</span>,{"\n"}
                      {"    "}<span className="text-zinc-400">{"private readonly"}</span> mongoDb: <span className="text-teal-400">{"TelemetryRepository"}</span>,{"\n"}
                      {"    "}<span className="text-zinc-400">{"private readonly"}</span> eventBus: <span className="text-teal-400">{"EventBus"}</span>{"\n"}
                      {"  "}) {"{}"}{"\n\n"}
                      
                      {/* Step 1 highlight during simulation */}
                      <span className={`transition-colors duration-300 ${simStep === 1 ? "bg-emerald-500/20 px-1 py-0.5 rounded text-emerald-300 font-bold" : ""}`}>
                        {"  "}<span className="text-blue-400">{"@SubscribePattern"}</span>(<span className="text-amber-300">{"'parque/clarillo/mesh/+/telemetry'"}</span>)
                      </span>{"\n"}
                      
                      {"  "}<span className="text-red-400">{"async"}</span> <span className="text-yellow-300">{"handlePacket"}</span>(packet: <span className="text-teal-400">{"LoRaMeshPacketDto"}</span>) {"{\n"}
                      
                      {/* Step 2 highlight during simulation */}
                      <span className={`transition-colors duration-300 ${simStep === 2 ? "bg-emerald-500/20 px-1 py-0.5 rounded text-emerald-300 font-bold" : ""}`}>
                        {"    "}<span className="text-red-400">{"const"}</span> verified = <span className="text-red-400">{"await"}</span> <span className="text-zinc-300">{"this.crypto.verifySignature(packet);"}</span>
                      </span>{"\n"}

                      {/* Step 3 highlight during simulation */}
                      <span className={`transition-colors duration-300 ${simStep === 3 ? "bg-emerald-500/20 px-1 py-0.5 rounded text-emerald-300 font-bold" : ""}`}>
                        {"    "}<span className="text-red-400">{"await"}</span> <span className="text-zinc-300">{"this.mongoDb.saveTelemetry(verified);"}</span>
                      </span>{"\n"}

                      {/* Step 4 highlight during simulation */}
                      <span className={`transition-colors duration-300 ${simStep === 4 ? "bg-emerald-500/20 px-1 py-0.5 rounded text-emerald-300 font-bold" : ""}`}>
                        {"    "}<span className="text-red-400">{"return"}</span> <span className="text-zinc-300">{"this.eventBus.emit("}</span><span className="text-amber-300">{"'packet.ingested'"}</span><span className="text-zinc-300">{", verified);"}</span>
                      </span>{"\n"}
                      {"  }"}{"\n"}
                      {"}"}
                    </code>
                  </pre>

                  {/* Simulation Execution Receipt Toast */}
                  {showSimResult && (
                    <div className="mt-4 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>
                          {isEs
                            ? "✓ Packet Ingestion OK • HMAC SHA-256 Validado • EventBus ACK"
                            : "✓ Packet Ingested OK • HMAC SHA-256 Valid • EventBus ACK"}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        18ms
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                /* Tab 2: Live System Status & Telemetry Stream */
                <div className="space-y-3.5 text-zinc-300">
                  <div className="flex items-center justify-between text-zinc-500 pb-2 border-b border-zinc-800/80">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      <span>METRIC / SYSTEM</span>
                    </span>
                    <span>LIVE STATUS</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>Full-Stack Core Architecture</span>
                    </span>
                    <span className="text-emerald-400 font-bold text-right ml-2 font-mono">
                      TypeScript • NestJS • Next.js
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Enterprise Cloud Microservices</span>
                    <span className="text-emerald-400 font-bold text-right ml-2 font-mono">
                      IBM Consulting • Itaú Bank (BFF)
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Radio className="w-3 h-3 text-blue-400" />
                      <span>IoT Mesh Telemetry Deployment</span>
                    </span>
                    <span className="text-blue-400 font-bold text-right ml-2 font-mono">
                      ESP32 • LoRa • MQTT • Río Clarillo
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Database & Deployment</span>
                    <span className="text-teal-400 font-bold text-right ml-2 font-mono">
                      MongoDB • Docker • Linux VPS
                    </span>
                  </div>

                  {/* Live Activity Telemetry Bar */}
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500">{isEs ? "Latencia BFF:" : "BFF Latency:"}</span>
                      <span className="text-emerald-400 font-bold">{livePing}ms</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500">{isEs ? "Paquetes LoRa:" : "LoRa Packets:"}</span>
                      <span className="text-teal-300 font-bold">{packetCount.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-zinc-500">Gateway:</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                        ONLINE
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================= 2x2 Feature Highlights with Reactive Spotlights ================= */}
          <div className="grid grid-cols-2 gap-4 w-full text-left">
            
            {/* Card 1: Enterprise Microservices */}
            <div className="group relative p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/70 hover:border-emerald-500/50 hover:bg-zinc-900/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 cursor-default overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                  <Server className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-colors">
                  IBM / Itaú
                </span>
              </div>
              <div className="text-sm font-bold font-mono text-zinc-100 group-hover:text-white transition-colors">
                {t.hero.stat1Title}
              </div>
              <div className="text-xs text-zinc-400 mt-1 leading-snug">
                {t.hero.stat1Desc}
              </div>
            </div>

            {/* Card 2: Clean Architecture */}
            <div className="group relative p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/70 hover:border-blue-500/50 hover:bg-zinc-900/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-default overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 group-hover:text-blue-300 group-hover:border-blue-500/30 transition-colors">
                  SOLID
                </span>
              </div>
              <div className="text-sm font-bold font-mono text-zinc-100 group-hover:text-white transition-colors">
                {t.hero.stat2Title}
              </div>
              <div className="text-xs text-zinc-400 mt-1 leading-snug">
                {t.hero.stat2Desc}
              </div>
            </div>

            {/* Card 3: IoT Mesh & Telemetry */}
            <div className="group relative p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/70 hover:border-teal-500/50 hover:bg-zinc-900/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300 cursor-default overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all">
                  <Radio className="w-4 h-4" />
                </div>
                {/* Animated 4-bar radio wave signal */}
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
                  <span className="w-0.5 h-2.5 bg-teal-400 rounded-full animate-pulse delay-75" />
                  <span className="w-0.5 h-3 bg-teal-400 rounded-full animate-pulse delay-150" />
                  <span className="w-0.5 h-3.5 bg-teal-400 rounded-full animate-pulse delay-200" />
                </div>
              </div>
              <div className="text-sm font-bold font-mono text-zinc-100 group-hover:text-white transition-colors">
                {t.hero.stat3Title}
              </div>
              <div className="text-xs text-zinc-400 mt-1 leading-snug">
                {t.hero.stat3Desc}
              </div>
            </div>

            {/* Card 4: Global Fluency & Docker/Cloud */}
            <div className="group relative p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/70 hover:border-purple-500/50 hover:bg-zinc-900/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-default overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 group-hover:text-purple-300 group-hover:border-purple-500/30 transition-colors">
                  UJI España
                </span>
              </div>
              <div className="text-sm font-bold font-mono text-zinc-100 group-hover:text-white transition-colors">
                {t.hero.stat4Title}
              </div>
              <div className="text-xs text-zinc-400 mt-1 leading-snug">
                {t.hero.stat4Desc}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
