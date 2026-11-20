"use client";

import React, { useState, useEffect } from "react";
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
  Building2,
} from "lucide-react";

export default function HeroSection() {
  const { t, language } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "status">("code");
  const isEs = language === "es";

  // Interactive Live Pipeline Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [showSimResult, setShowSimResult] = useState(false);

  // Live Telemetry dynamic counters
  const [livePing, setLivePing] = useState(19);
  const [packetCount, setPacketCount] = useState(14892);

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

  const capabilities = [
    {
      icon: Server,
      tag: "IBM / Itaú",
      title: t.hero.stat1Title,
      desc: t.hero.stat1Desc,
    },
    {
      icon: Layers,
      tag: "SOLID",
      title: t.hero.stat2Title,
      desc: t.hero.stat2Desc,
    },
    {
      icon: Radio,
      tag: "LoRa / MQTT",
      title: t.hero.stat3Title,
      desc: t.hero.stat3Desc,
    },
    {
      icon: Cpu,
      tag: "UJI España",
      title: t.hero.stat4Title,
      desc: t.hero.stat4Desc,
    },
  ];

  return (
    <section
      id="hero"
      className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden"
    >
      {/* Subtle Architectural Grid */}
      <div className="absolute inset-0 bg-grid-tech bg-radial-fade opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN: Editorial Engineering Intro & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="section-eyebrow inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>{t.hero.role}</span>
              </span>
              <span className="badge-accent">
                {isEs ? "Disponible" : "Available"}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.08] mb-6">
              {t.hero.headlinePrefix}{" "}
              <span className="text-emerald-400">{t.hero.headlineGradient}</span>
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              {t.hero.summary}
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <a
                href="#projects"
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold cursor-pointer"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium cursor-pointer"
              >
                <span>{t.hero.contactBtn}</span>
              </a>
            </div>

            {/* Verified Track Record Strip */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 w-full flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>IBM Consulting &amp; Itaú</span>
              </div>
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>IoT Río Clarillo</span>
              </div>
              <div className="text-zinc-500">TypeScript / NestJS / Next.js</div>
            </div>
          </div>

          {/* RIGHT COLUMN: Flat-Framed Architecture Console */}
          <div className="lg:col-span-6 w-full min-w-0">
            <div className="terminal-window w-full text-left rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
              {/* IDE Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
                <div className="flex items-center gap-1 font-mono text-xs">
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "code"
                        ? "bg-zinc-800 text-emerald-400 font-semibold"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{t.hero.consoleTab1}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("status")}
                    className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "status"
                        ? "bg-zinc-800 text-emerald-400 font-semibold"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>{t.hero.consoleTab2}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className={`flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                      isSimulating
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
                        : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700"
                    }`}
                    title={
                      isEs
                        ? "Simular ejecución del pipeline"
                        : "Simulate pipeline execution"
                    }
                  >
                    <Play
                      className={`w-3 h-3 text-emerald-400 ${
                        isSimulating ? "animate-spin" : ""
                      }`}
                    />
                    <span>
                      {isSimulating
                        ? isEs
                          ? "Ejecutando..."
                          : "Running..."
                        : isEs
                        ? "Simular"
                        : "Run Test"}
                    </span>
                  </button>

                  {activeTab === "code" && (
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-100 px-2.5 py-1 rounded-md bg-zinc-800/70 hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer"
                      title={isEs ? "Copiar snippet" : "Copy snippet"}
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copied ? t.hero.copied : t.hero.copy}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Console Body */}
              <div className="p-4 sm:p-5 font-mono text-xs overflow-x-auto custom-code-scroll">
                {activeTab === "code" ? (
                  <div>
                    <pre className="text-zinc-300 leading-relaxed font-mono">
                      <code>
                        <span className="text-zinc-500">
                          {"// NestJS Microservice • Rio Clarillo IoT Platform"}
                        </span>
                        {"\n"}
                        <span className="text-sky-400">{"@Injectable"}</span>()
                        {"\n"}
                        <span className="text-rose-400">{"export class"}</span>{" "}
                        <span className="text-emerald-400">
                          {"RioClarilloMeshService"}
                        </span>{" "}
                        {"{\n"}
                        {"  "}
                        <span className="text-rose-400">{"constructor"}</span>(
                        {"\n"}
                        {"    "}
                        <span className="text-zinc-400">
                          {"private readonly"}
                        </span>{" "}
                        mqttClient:{" "}
                        <span className="text-teal-300">
                          {"MqttClientService"}
                        </span>
                        ,{"\n"}
                        {"    "}
                        <span className="text-zinc-400">
                          {"private readonly"}
                        </span>{" "}
                        mongoDb:{" "}
                        <span className="text-teal-300">
                          {"TelemetryRepository"}
                        </span>
                        ,{"\n"}
                        {"    "}
                        <span className="text-zinc-400">
                          {"private readonly"}
                        </span>{" "}
                        eventBus:{" "}
                        <span className="text-teal-300">{"EventBus"}</span>
                        {"\n"}
                        {"  "}) {"{}"}
                        {"\n\n"}
                        <span
                          className={`block -mx-2 px-2 rounded-sm transition-colors duration-200 ${
                            simStep === 1
                              ? "bg-emerald-500/20 text-emerald-200"
                              : ""
                          }`}
                        >
                          {"  "}
                          <span className="text-sky-400">
                            {"@SubscribePattern"}
                          </span>
                          (
                          <span className="text-amber-300">
                            {"'parque/clarillo/mesh/+/telemetry'"}
                          </span>
                          )
                        </span>
                        {"  "}
                        <span className="text-rose-400">{"async"}</span>{" "}
                        <span className="text-amber-200">{"handlePacket"}</span>
                        (packet:{" "}
                        <span className="text-teal-300">
                          {"LoRaMeshPacketDto"}
                        </span>
                        ) {"{\n"}
                        <span
                          className={`block -mx-2 px-2 rounded-sm transition-colors duration-200 ${
                            simStep === 2
                              ? "bg-emerald-500/20 text-emerald-200"
                              : ""
                          }`}
                        >
                          {"    "}
                          <span className="text-rose-400">{"const"}</span>{" "}
                          verified ={" "}
                          <span className="text-rose-400">{"await"}</span>{" "}
                          <span className="text-zinc-200">
                            {"this.crypto.verifySignature(packet);"}
                          </span>
                        </span>
                        <span
                          className={`block -mx-2 px-2 rounded-sm transition-colors duration-200 ${
                            simStep === 3
                              ? "bg-emerald-500/20 text-emerald-200"
                              : ""
                          }`}
                        >
                          {"    "}
                          <span className="text-rose-400">{"await"}</span>{" "}
                          <span className="text-zinc-200">
                            {"this.mongoDb.saveTelemetry(verified);"}
                          </span>
                        </span>
                        <span
                          className={`block -mx-2 px-2 rounded-sm transition-colors duration-200 ${
                            simStep === 4
                              ? "bg-emerald-500/20 text-emerald-200"
                              : ""
                          }`}
                        >
                          {"    "}
                          <span className="text-rose-400">{"return"}</span>{" "}
                          <span className="text-zinc-200">
                            {"this.eventBus.emit("}
                          </span>
                          <span className="text-amber-300">
                            {"'packet.ingested'"}
                          </span>
                          <span className="text-zinc-200">{", verified);"}</span>
                        </span>
                        {"  }"}
                        {"\n"}
                        {"}"}
                      </code>
                    </pre>

                    {showSimResult && (
                      <div className="mt-4 px-3 py-2.5 rounded-md bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="truncate">
                            {isEs
                              ? "Packet Ingestion OK • HMAC SHA-256 Validado • EventBus ACK"
                              : "Packet Ingested OK • HMAC SHA-256 Valid • EventBus ACK"}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                          18ms
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 text-zinc-300">
                    <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-zinc-800">
                      <span className="flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        <span>METRIC / SYSTEM</span>
                      </span>
                      <span>STATUS</span>
                    </div>

                    <div className="flex justify-between items-center gap-3 text-xs">
                      <span className="text-zinc-400">
                        Full-Stack Core Architecture
                      </span>
                      <span className="text-emerald-400 font-semibold text-right">
                        TypeScript • NestJS • Next.js
                      </span>
                    </div>

                    <div className="flex justify-between items-center gap-3 text-xs">
                      <span className="text-zinc-400">
                        Enterprise Cloud Microservices
                      </span>
                      <span className="text-zinc-200 font-semibold text-right">
                        IBM Consulting • Itaú Bank (BFF)
                      </span>
                    </div>

                    <div className="flex justify-between items-center gap-3 text-xs">
                      <span className="text-zinc-400">
                        IoT Mesh Telemetry Deployment
                      </span>
                      <span className="text-zinc-200 font-semibold text-right">
                        ESP32 • LoRa • MQTT • Río Clarillo
                      </span>
                    </div>

                    <div className="flex justify-between items-center gap-3 text-xs">
                      <span className="text-zinc-400">
                        Database &amp; Deployment
                      </span>
                      <span className="text-zinc-200 font-semibold text-right">
                        MongoDB • Docker • Linux VPS
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <span className="text-zinc-500">
                          {isEs ? "Latencia BFF:" : "BFF Latency:"}
                        </span>
                        <span className="text-emerald-400 font-semibold">
                          {livePing}ms
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-zinc-500">
                          {isEs ? "Paquetes LoRa:" : "LoRa Packets:"}
                        </span>
                        <span className="text-zinc-200 font-semibold">
                          {packetCount.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-zinc-500">Gateway:</span>
                        <span className="px-1.5 py-0.5 rounded-sm bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                          ONLINE
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Engineering Capabilities Strip */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.tag} className="surface-card p-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-1.5 rounded-md bg-zinc-800 border border-zinc-700/70 text-emerald-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="badge-mono">{cap.tag}</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  {cap.title}
                </div>
                <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {cap.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
