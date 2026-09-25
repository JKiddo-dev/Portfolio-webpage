"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { api } from "@/services/api";
import { Radio, Activity, Send, CheckCircle2, Cpu, ArrowDown, Server } from "lucide-react";

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
  const [lastApiStatus, setLastApiStatus] = useState<string | null>(null);
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

    setTimeout(() => {
      setActiveHop(2);
    }, 600);

    const randomRssi = -Math.floor(Math.random() * 20 + 72);
    const { data, isLive, latencyMs } = await api.sendTelemetryPacket({
      nodeId: "ESP32-Node-03",
      rssi: randomRssi,
      snr: 9.8,
      payload: "temp:22.1C,hum:55%,bat:4.0V",
    });

    setTimeout(() => {
      setActiveHop(3);
      setLastApiStatus(isLive ? `NestJS Live (${latencyMs}ms)` : `Client Preview (${latencyMs}ms)`);

      const newLog: PacketLog = {
        id: data.packetId,
        time: new Date().toLocaleTimeString(),
        hop: "ESP32-Node-03 -> Repeater -> NestJS Gateway",
        rssi: `${randomRssi} dBm`,
        status: isLive ? "NESTJS_201" : "MQTT_PUB_200",
        isBackendLive: isLive,
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 3)]);
      setTransmitting(false);
    }, 1300);
  };

  const nodes = [
    {
      id: 1,
      name: "ESP32-Node-03",
      tag: "868 MHz RF",
      role: isEs ? "Sensor LoRa Terreno (Río Clarillo)" : "Field LoRa Sensor (Río Clarillo)",
      active: activeHop === 1 || activeHop === 0,
    },
    {
      id: 2,
      name: "ESP32-Node-02",
      tag: "Mesh Hop",
      role: isEs ? "Nodo Repetidor Mesh Autónomo" : "Autonomous Mesh Repeater Node",
      active: activeHop === 2,
    },
    {
      id: 3,
      name: "Gateway Base",
      tag: "NestJS API",
      role: isEs ? "NestJS API Core • Mosquitto • MongoDB" : "NestJS API Core • Mosquitto • MongoDB",
      active: activeHop === 3,
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/85 p-5 md:p-6 backdrop-blur-md flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800/80 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              {isEs ? "Simulador Telemetría Mesh" : "Live Mesh Telemetry Simulator"}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-normal">
                Río Clarillo
              </span>
            </div>
            <div className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 mt-0.5">
              <span>Broker MQTT • 868MHz LoRa</span>
              {lastApiStatus && (
                <span className="text-emerald-400 font-bold">• {lastApiStatus}</span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleSimulate}
          disabled={transmitting}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-95 transition-all shadow-md shadow-emerald-500/10 disabled:opacity-50 cursor-pointer shrink-0"
        >
          <Send className={`w-3.5 h-3.5 ${transmitting ? "animate-spin" : ""}`} />
          {transmitting
            ? isEs
              ? "Enrutando..."
              : "Routing..."
            : isEs
            ? "Disparar Paquete"
            : "Transmit Packet"}
        </button>
      </div>

      {/* Network Nodes Topology Pipeline (Generous full-width layout) */}
      <div className="py-5">
        <div className="text-[11px] font-mono uppercase text-zinc-500 mb-3 tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            {isEs ? "Topología de Red & Salto de Paquetes" : "Network Topology & Packet Hops"}
          </span>
          <span className="text-[10px] font-mono text-zinc-400">
            POST /api/v1/telemetry/packet
          </span>
        </div>

        <div className="flex flex-col gap-2 relative">
          {nodes.map((node, idx) => {
            const isHighlighted = transmitting ? node.id === activeHop : false;

            return (
              <React.Fragment key={node.id}>
                <div
                  className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    isHighlighted
                      ? "border-emerald-400 bg-emerald-500/15 shadow-[0_0_20px_rgba(52,211,153,0.25)] scale-[1.02]"
                      : "border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isHighlighted ? "bg-emerald-400 text-zinc-950 font-bold" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-zinc-100">
                          {node.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                          {node.tag}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5 font-sans leading-tight">
                        {node.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isHighlighted ? "bg-emerald-400 animate-ping" : "bg-zinc-700"
                      }`}
                    />
                  </div>
                </div>

                {idx < nodes.length - 1 && (
                  <div className="flex justify-center -my-1">
                    <ArrowDown
                      className={`w-3.5 h-3.5 transition-colors ${
                        activeHop === idx + 1 ? "text-emerald-400 animate-bounce" : "text-zinc-600"
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Mini Telemetry Stream Log */}
      <div className="rounded-xl bg-zinc-950 border border-zinc-800/80 p-3 mt-auto">
        <div className="text-[10px] font-mono uppercase text-zinc-500 mb-2 flex items-center justify-between">
          <span>{isEs ? "Registro de Paquetes Ingeridos" : "Ingested MQTT Telemetry Stream"}</span>
          <span className="text-emerald-400/90 font-mono">QoS: 1 • AES Encrypted</span>
        </div>
        <div className="space-y-1.5 font-mono text-[11px]">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between py-1 px-2.5 rounded bg-zinc-900/40 text-zinc-300 border border-zinc-800/40"
            >
              <div className="flex items-center gap-2 truncate pr-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="text-zinc-500 text-[10px]">[{log.time}]</span>
                <span className="text-zinc-200 text-[10.5px] truncate">{log.hop}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-zinc-400 text-[10px]">{log.rssi}</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-bold">
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