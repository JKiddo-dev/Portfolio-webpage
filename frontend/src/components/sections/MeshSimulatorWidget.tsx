"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { api } from "@/services/api";
import {
  Radio,
  Activity,
  Send,
  CheckCircle2,
  Cpu,
  Server,
  Zap,
  Wifi,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";

interface PacketLog {
  id: string;
  time: string;
  hop: string;
  rssi: string;
  status: string;
  isBackendLive?: boolean;
}

export default function MeshSimulatorWidget() {
  const { language } = useLanguage();
  const [transmitting, setTransmitting] = useState(false);
  const [activeHop, setActiveHop] = useState<number>(0);
  const [packetProgress, setPacketProgress] = useState<number>(0); // 0 to 100%
  const [lastApiStatus, setLastApiStatus] = useState<string | null>(null);
  const [selectedNodeDetails, setSelectedNodeDetails] = useState<number | null>(null);
  const [logs, setLogs] = useState<PacketLog[]>([
    {
      id: "LORA-PKT-00102",
      time: "21:20:12",
      hop: "ESP32-Node-03 -> ESP32-Node-02",
      rssi: "-84 dBm",
      status: "ACK",
    },
    {
      id: "LORA-PKT-00103",
      time: "21:20:13",
      hop: "ESP32-Node-02 -> Gateway (NestJS)",
      rssi: "-72 dBm",
      status: "MQTT_201",
    },
  ]);

  const isEs = language === "es";

  const handleSimulate = async () => {
    if (transmitting) return;
    setTransmitting(true);
    setActiveHop(1);
    setPacketProgress(15);

    // Hop 1 -> Hop 2 transition
    setTimeout(() => {
      setPacketProgress(50);
    }, 300);

    setTimeout(() => {
      setActiveHop(2);
      setPacketProgress(65);
    }, 600);

    // Hop 2 -> Hop 3 transition
    setTimeout(() => {
      setPacketProgress(85);
    }, 950);

    const randomRssi = -Math.floor(Math.random() * 18 + 70);
    const { data, isLive, latencyMs } = await api.sendTelemetryPacket({
      nodeId: "ESP32-Node-03",
      rssi: randomRssi,
      snr: 10.2,
      payload: "temp:22.4C,hum:54%,bat:4.1V,pressure:940hPa",
    });

    setTimeout(() => {
      setActiveHop(3);
      setPacketProgress(100);
      setLastApiStatus(isLive ? `NestJS Live (${latencyMs}ms)` : `Client Preview (${latencyMs}ms)`);

      const newLog: PacketLog = {
        id: data.packetId || `LORA-PKT-${Math.floor(Math.random() * 90000 + 10000)}`,
        time: new Date().toLocaleTimeString(),
        hop: "ESP32-03 -> Node-02 -> Gateway NestJS",
        rssi: `${randomRssi} dBm`,
        status: isLive ? "NESTJS_201" : "MQTT_PUB_200",
        isBackendLive: isLive,
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 2)]);
      
      setTimeout(() => {
        setTransmitting(false);
        setActiveHop(0);
        setPacketProgress(0);
      }, 700);
    }, 1300);
  };

  const nodes = [
    {
      id: 1,
      name: "ESP32-Node-03",
      tag: "868 MHz RF",
      freq: "868.100 MHz",
      rssi: "-84 dBm",
      role: isEs ? "Sensor LoRa Terreno (Río Clarillo)" : "Field LoRa Sensor (Río Clarillo)",
      payload: "temp:22.4C, hum:54%, bat:4.1V",
      activeColor: "border-teal-400 bg-teal-500/15 text-teal-300",
      icon: Radio,
    },
    {
      id: 2,
      name: "ESP32-Node-02",
      tag: "Mesh Hop",
      freq: "868.100 MHz",
      rssi: "-72 dBm",
      role: isEs ? "Nodo Repetidor Mesh Autónomo" : "Autonomous Mesh Repeater Node",
      payload: "Forwarding packet to Gateway",
      activeColor: "border-blue-400 bg-blue-500/15 text-blue-300",
      icon: Cpu,
    },
    {
      id: 3,
      name: "Gateway Base (NestJS)",
      tag: "MQTT Broker",
      freq: "TCP / MQTT :1883",
      rssi: "100% Signal",
      role: isEs ? "NestJS API Core • Mosquitto • MongoDB" : "NestJS API Core • Mosquitto • MongoDB",
      payload: "Persisted to Mongo + WebSocket broadcast",
      activeColor: "border-emerald-400 bg-emerald-500/15 text-emerald-300",
      icon: Server,
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-5 md:p-6 backdrop-blur-xl flex flex-col justify-between h-full shadow-2xl relative overflow-hidden group">
      
      {/* Subtle background ambient pulse */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-all duration-700" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800/80 gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="relative p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
            <Radio className="w-4 h-4" />
            {transmitting && (
              <span className="absolute inset-0 rounded-xl border border-emerald-400 animate-ping opacity-75" />
            )}
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              {isEs ? "Simulador Telemetría Mesh" : "Live Mesh Telemetry Simulator"}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                Río Clarillo
              </span>
            </div>
            <div className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 mt-0.5">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Broker MQTT • 868MHz LoRa</span>
              </span>
              {lastApiStatus && (
                <span className="text-emerald-400 font-bold">• {lastApiStatus}</span>
              )}
            </div>
          </div>
        </div>

        {/* Trigger Simulation Button */}
        <button
          onClick={handleSimulate}
          disabled={transmitting}
          className="relative group/btn flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-zinc-950 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 disabled:opacity-50 cursor-pointer shrink-0 overflow-hidden"
        >
          <Send className={`w-3.5 h-3.5 ${transmitting ? "animate-spin text-zinc-950" : "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"}`} />
          <span>
            {transmitting
              ? isEs
                ? "Enrutando Malla..."
                : "Routing Mesh..."
              : isEs
              ? "Transmitir Paquete"
              : "Transmit Packet"}
          </span>
        </button>
      </div>

      {/* Network Nodes Topology Pipeline with Active Particle Trail */}
      <div className="py-5 relative z-10">
        <div className="text-[11px] font-mono uppercase text-zinc-500 mb-3 tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isEs ? "Topología de Malla & Propagación" : "Mesh Topology & Propagation"}</span>
          </span>
          <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
            <span className="text-zinc-600">AES-128</span>
            <span className="text-zinc-500">•</span>
            <span className="text-emerald-400">POST /packet</span>
          </span>
        </div>

        {/* Nodes Container with Circuit Rail */}
        <div className="relative flex flex-col gap-3">
          
          {/* Vertical Conduit Circuit Line */}
          <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-zinc-800 pointer-events-none" />
          
          {/* Animated Laser Pulse Traveling on Circuit */}
          {transmitting && (
            <div
              className="absolute left-[22.5px] w-1 bg-gradient-to-b from-teal-400 via-emerald-400 to-cyan-400 shadow-[0_0_12px_#10b981] transition-all duration-300 pointer-events-none rounded-full"
              style={{
                top: "12px",
                height: `${Math.min(100, packetProgress)}%`,
              }}
            />
          )}

          {nodes.map((node) => {
            const isHighlighted = transmitting && activeHop === node.id;
            const Icon = node.icon;
            const isExpanded = selectedNodeDetails === node.id;

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeDetails(isExpanded ? null : node.id)}
                className={`group/node relative p-3.5 rounded-xl border transition-all duration-300 flex flex-col cursor-pointer ${
                  isHighlighted
                    ? `${node.activeColor} shadow-[0_0_25px_rgba(52,211,153,0.3)] scale-[1.02]`
                    : "border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/90 hover:bg-zinc-900/70"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    
                    {/* Node Icon with Concentric Radar Wave when Active */}
                    <div className="relative">
                      <div
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          isHighlighted
                            ? "bg-emerald-400 text-zinc-950 font-bold scale-110 shadow-lg shadow-emerald-500/30"
                            : "bg-zinc-800/90 text-zinc-400 group-hover/node:bg-zinc-800 group-hover/node:text-zinc-200"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      {isHighlighted && (
                        <>
                          <span className="absolute -inset-1 rounded-xl border border-emerald-400 animate-ping opacity-60 pointer-events-none" />
                          <span className="absolute -inset-2.5 rounded-xl border border-teal-400 animate-pulse opacity-30 pointer-events-none" />
                        </>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold transition-colors ${isHighlighted ? "text-white" : "text-zinc-200"}`}>
                          {node.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
                          {node.tag}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5 font-sans leading-tight">
                        {node.role}
                      </div>
                    </div>
                  </div>

                  {/* Right Status Badge */}
                  <div className="flex items-center gap-2 pl-2">
                    <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                      {node.rssi}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        isHighlighted
                          ? "bg-emerald-400 shadow-[0_0_10px_#10b981] scale-125"
                          : "bg-zinc-700 group-hover/node:bg-zinc-600"
                      }`}
                    />
                  </div>
                </div>

                {/* Micro Details on Click/Expand */}
                {isExpanded && (
                  <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400 animate-fadeIn">
                    <span>Freq: {node.freq}</span>
                    <span className="text-emerald-300 truncate max-w-[200px]">{node.payload}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Ingested Telemetry Feed */}
      <div className="rounded-xl bg-zinc-950 border border-zinc-800/80 p-3 mt-auto shadow-inner relative z-10">
        <div className="text-[10px] font-mono uppercase text-zinc-500 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isEs ? "Registro de Paquetes Ingeridos" : "Ingested MQTT Telemetry Stream"}</span>
          </span>
          <span className="text-emerald-400/90 font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            QoS: 1 • AES-128
          </span>
        </div>
        
        <div className="space-y-1.5 font-mono text-[11px]">
          {logs.map((log, idx) => (
            <div
              key={log.id}
              className={`flex items-center justify-between py-1.5 px-2.5 rounded transition-all duration-300 ${
                idx === 0
                  ? "bg-zinc-900/80 text-zinc-200 border border-emerald-500/30 shadow-sm"
                  : "bg-zinc-900/40 text-zinc-400 border border-zinc-800/40"
              }`}
            >
              <div className="flex items-center gap-2 truncate pr-2">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${idx === 0 ? "text-emerald-400" : "text-zinc-500"}`} />
                <span className="text-zinc-500 text-[10px]">[{log.time}]</span>
                <span className={`text-[10.5px] truncate ${idx === 0 ? "text-zinc-100 font-semibold" : "text-zinc-300"}`}>
                  {log.hop}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-zinc-400 text-[10px]">{log.rssi}</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                  idx === 0 ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-zinc-800 text-zinc-400"
                }`}>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
