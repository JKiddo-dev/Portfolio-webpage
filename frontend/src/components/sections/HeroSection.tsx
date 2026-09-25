"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { Terminal, Copy, Check, Radio, Server, Layers, Cpu, ArrowUpRight, Code2 } from "lucide-react";

export default function HeroSection() {
  const { t, language } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "status">("code");

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

      {/* Atmospheric ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-600/15 via-blue-600/15 to-purple-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Full-Stack Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md text-xs font-mono text-zinc-300 mb-8 shadow-inner hover:border-emerald-500/40 transition-colors cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 font-bold uppercase tracking-wider">
            {t.hero.role}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">TypeScript • NestJS • React • Next.js • Angular</span>
        </div>

        {/* Punchy Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-4xl mb-6">
          {t.hero.headlinePrefix}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500">
            {t.hero.headlineGradient}
          </span>
        </h1>

        {/* Executive summary */}
        <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl mb-10 leading-relaxed font-normal">
          {t.hero.summary}
        </p>

        {/* Interactive CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:scale-102 active:scale-98 transition-all w-full sm:w-auto cursor-pointer"
          >
            <span>{t.hero.exploreBtn}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 hover:border-zinc-700 backdrop-blur-sm transition-all w-full sm:w-auto cursor-pointer"
          >
            <span>{t.hero.contactBtn}</span>
          </a>
        </div>

        {/* Interactive Developer Console */}
        <div className="w-full max-w-3xl text-left rounded-2xl border border-zinc-800/90 bg-zinc-950/80 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-zinc-700">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/60 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              
              <div className="ml-4 flex items-center gap-1 font-mono text-xs">
                <button
                  onClick={() => setActiveTab("code")}
                  className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "code"
                      ? "bg-zinc-800 text-emerald-400 font-semibold"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Code2 className="w-3 h-3" />
                  <span>{t.hero.consoleTab1}</span>
                </button>
                <button
                  onClick={() => setActiveTab("status")}
                  className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "status"
                      ? "bg-zinc-800 text-emerald-400 font-semibold"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Cpu className="w-3 h-3" />
                  <span>{t.hero.consoleTab2}</span>
                </button>
              </div>
            </div>

            {activeTab === "code" && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white px-2.5 py-1 rounded bg-zinc-800/60 hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Copiar snippet"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.hero.copied : t.hero.copy}</span>
              </button>
            )}
          </div>

          {/* Body */}
          <div className="p-5 font-mono text-xs overflow-x-auto">
            {activeTab === "code" ? (
              <pre className="text-zinc-300 leading-relaxed">
                <code>
                  <span className="text-purple-400">{"// NestJS Microservice • Full-Stack Rio Clarillo IoT Platform"}</span>{"\n"}
                  <span className="text-blue-400">{"@Injectable"}</span>(){"\n"}
                  <span className="text-red-400">{"export class"}</span> <span className="text-emerald-400">{"RioClarilloMeshService"}</span> {"{\n"}
                  {"  "}<span className="text-red-400">{"constructor"}</span>({"{\n"}
                  {"    "}<span className="text-zinc-400">{"private readonly"}</span> mqttClient: <span className="text-teal-400">{"MqttClientService"}</span>,{"\n"}
                  {"    "}<span className="text-zinc-400">{"private readonly"}</span> mongoDb: <span className="text-teal-400">{"TelemetryRepository"}</span>,{"\n"}
                  {"    "}<span className="text-zinc-400">{"private readonly"}</span> eventBus: <span className="text-teal-400">{"EventBus"}</span>{"\n"}
                  {"  "}) {"{}"}{"\n\n"}
                  {"  "}<span className="text-blue-400">{"@SubscribePattern"}</span>(<span className="text-amber-300">{"'parque/clarillo/mesh/+/telemetry'"}</span>){"\n"}
                  {"  "}<span className="text-red-400">{"async"}</span> <span className="text-yellow-300">{"handlePacket"}</span>(packet: <span className="text-teal-400">{"LoRaMeshPacketDto"}</span>) {"{\n"}
                  {"    "}<span className="text-red-400">{"const"}</span> verified = <span className="text-red-400">{"await"}</span> <span className="text-zinc-300">{"this.crypto.verifySignature(packet);"}</span>{"\n"}
                  {"    "}<span className="text-red-400">{"await"}</span> <span className="text-zinc-300">{"this.mongoDb.saveTelemetry(verified);"}</span>{"\n"}
                  {"    "}<span className="text-red-400">{"return"}</span> <span className="text-zinc-300">{"this.eventBus.emit("}</span><span className="text-amber-300">{"'packet.ingested'"}</span><span className="text-zinc-300">{", verified);"}</span>{"\n"}
                  {"  }"}{"\n"}
                  {"}"}
                </code>
              </pre>
            ) : (
              <div className="space-y-2 text-zinc-300">
                <div className="flex items-center justify-between text-zinc-500 pb-2 border-b border-zinc-800">
                  <span>METRIC / SYSTEM</span>
                  <span>STATUS & DETAILS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Full-Stack Core Architecture</span>
                  <span className="text-emerald-400 font-bold">TypeScript • NestJS • NextJS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Enterprise Cloud Microservices</span>
                  <span className="text-emerald-400 font-bold">IBM Consulting • Itaú Bank (BFF)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">IoT Mesh Telemetry Deployment</span>
                  <span className="text-blue-400 font-bold">ESP32 • LoRa • MQTT • Río Clarillo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Database & Deployment</span>
                  <span className="text-teal-400 font-bold">MongoDB • Docker • Linux VPS</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-12 text-left">
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:border-emerald-500/40 hover:-translate-y-1 transition-all">
            <Server className="w-4 h-4 text-emerald-400 mb-2" />
            <div className="text-sm font-bold font-mono text-zinc-100">{t.hero.stat1Title}</div>
            <div className="text-xs text-zinc-400 mt-0.5">{t.hero.stat1Desc}</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:border-blue-500/40 hover:-translate-y-1 transition-all">
            <Layers className="w-4 h-4 text-blue-400 mb-2" />
            <div className="text-sm font-bold font-mono text-zinc-100">{t.hero.stat2Title}</div>
            <div className="text-xs text-zinc-400 mt-0.5">{t.hero.stat2Desc}</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:border-teal-500/40 hover:-translate-y-1 transition-all">
            <Radio className="w-4 h-4 text-teal-400 mb-2" />
            <div className="text-sm font-bold font-mono text-zinc-100">{t.hero.stat3Title}</div>
            <div className="text-xs text-zinc-400 mt-0.5">{t.hero.stat3Desc}</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:border-purple-500/40 hover:-translate-y-1 transition-all">
            <Cpu className="w-4 h-4 text-purple-400 mb-2" />
            <div className="text-sm font-bold font-mono text-zinc-100">{t.hero.stat4Title}</div>
            <div className="text-xs text-zinc-400 mt-0.5">{t.hero.stat4Desc}</div>
          </div>
        </div>
      </div>
    </section>
  );
}