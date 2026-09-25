"use client";

import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import {
  X,
  Smartphone,
  Tablet,
  RotateCcw,
  RefreshCw,
  Wifi,
  CheckCircle2,
  Sliders,
  Sparkles,
  Info,
  Maximize2,
} from "lucide-react";

interface DeviceSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DeviceType = "iphone" | "pixel" | "ipad";

interface DeviceConfig {
  id: DeviceType;
  name: string;
  osLabel: string;
  width: number;
  height: number;
  frameRadius: string;
  screenRadius: string;
  scale: number;
  landscapeScale: number;
  hasDynamicIsland: boolean;
}

const DEVICES: Record<DeviceType, DeviceConfig> = {
  iphone: {
    id: "iphone",
    name: "iPhone 15 Pro",
    osLabel: "iOS • Dynamic Island",
    width: 393,
    height: 852,
    frameRadius: "rounded-[50px]",
    screenRadius: "rounded-[40px]",
    scale: 0.78,
    landscapeScale: 0.72,
    hasDynamicIsland: true,
  },
  pixel: {
    id: "pixel",
    name: "Pixel 8",
    osLabel: "Android • Chrome Mobile",
    width: 412,
    height: 915,
    frameRadius: "rounded-[42px]",
    screenRadius: "rounded-[32px]",
    scale: 0.74,
    landscapeScale: 0.7,
    hasDynamicIsland: false,
  },
  ipad: {
    id: "ipad",
    name: "iPad Mini",
    osLabel: "iPadOS • Tablet",
    width: 768,
    height: 1024,
    frameRadius: "rounded-[36px]",
    screenRadius: "rounded-[26px]",
    scale: 0.58,
    landscapeScale: 0.54,
    hasDynamicIsland: false,
  },
};

export default function DeviceSimulatorModal({
  isOpen,
  onClose,
}: DeviceSimulatorModalProps) {
  const { language } = usePortfolio();
  const isEs = language === "es";

  const [selectedDevice, setSelectedDevice] = useState<DeviceType>("iphone");
  const [isLandscape, setIsLandscape] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentDevice = DEVICES[selectedDevice];
  const frameWidth = isLandscape ? currentDevice.height : currentDevice.width;
  const frameHeight = isLandscape ? currentDevice.width : currentDevice.height;
  const activeScale = isLandscape ? currentDevice.landscapeScale : currentDevice.scale;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Shell: Left Device Canvas + Right Sidebar */}
      <div className="relative z-10 w-full max-w-6xl h-[92vh] max-h-[920px] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden pointer-events-auto">
        
        {/* ================= LEFT: DEVICE CANVAS ================= */}
        <div className="flex-1 h-full bg-zinc-950/80 flex flex-col items-center justify-center p-4 overflow-hidden relative">
          
          {/* Subtle Canvas Watermark & Size Badge */}
          <div className="absolute top-4 left-6 flex items-center gap-2 text-xs font-mono text-zinc-500 z-10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300 font-bold">{currentDevice.name}</span>
            <span>•</span>
            <span className="text-zinc-400">{frameWidth} × {frameHeight} px</span>
            <span>•</span>
            <span className="text-emerald-400 text-[10px] uppercase font-semibold">
              {isLandscape ? "Landscape" : "Portrait"}
            </span>
          </div>

          {/* Centered Device Mockup */}
          <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
            <div
              style={{
                width: `${frameWidth}px`,
                height: `${frameHeight}px`,
                transform: `scale(${activeScale})`,
                transformOrigin: "center center",
              }}
              className={`relative bg-zinc-950 border-[10px] border-zinc-800 ${currentDevice.frameRadius} shadow-[0_0_80px_-20px_rgba(16,185,129,0.3)] ring-1 ring-zinc-700/60 overflow-hidden flex flex-col shrink-0 transition-all duration-300`}
            >
              {/* Device Status Bar */}
              <div className="relative z-30 w-full h-11 bg-zinc-950/95 backdrop-blur-md px-6 flex items-center justify-between text-[11px] font-mono font-bold text-zinc-300 shrink-0 select-none border-b border-zinc-900/40">
                <span>09:41</span>

                {/* Dynamic Island for iPhone in Portrait */}
                {currentDevice.hasDynamicIsland && !isLandscape && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-6 bg-black rounded-full flex items-center justify-between px-3 shadow-md border border-zinc-800/80">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-blue-900" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500/40 animate-pulse" />
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Wifi className="w-3.5 h-3.5 text-zinc-300" />
                  <span className="text-[10px]">5G</span>
                  <div className="w-5 h-2.5 rounded-sm border border-zinc-400 p-0.5 flex items-center">
                    <div className="w-full h-full bg-emerald-400 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Live Interactive Iframe */}
              <iframe
                key={iframeKey}
                src="/"
                title="Responsive Mobile View"
                className={`w-full flex-1 border-0 ${currentDevice.screenRadius} bg-zinc-950`}
              />

              {/* Bottom Home Indicator Bar */}
              <div className="w-full h-6 bg-zinc-950 flex items-center justify-center shrink-0 select-none">
                <div className="w-32 h-1 bg-zinc-600/80 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: CONTROL SIDEBAR ================= */}
        <div className="w-full md:w-84 lg:w-92 h-full bg-zinc-900/90 border-t md:border-t-0 md:border-l border-zinc-800/80 p-6 flex flex-col justify-between overflow-y-auto custom-code-scroll shrink-0">
          
          <div className="space-y-6">
            {/* Sidebar Top: Title + Close Button */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-zinc-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-white tracking-wide">
                    {isEs ? "Simulador Móvil" : "Mobile Simulator"}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    {isEs ? "Inspección Responsive" : "Responsive Inspection"}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Cerrar (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Device Switcher Section */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-3 flex items-center justify-between">
                <span>{isEs ? "Dispositivo" : "Device Preset"}</span>
                <span className="text-[10px] text-emerald-400">3 perfiles</span>
              </div>

              <div className="space-y-2">
                {(Object.keys(DEVICES) as DeviceType[]).map((key) => {
                  const dev = DEVICES[key];
                  const isSelected = selectedDevice === key;

                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedDevice(key)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-zinc-800/90 border-emerald-400 shadow-md shadow-emerald-500/10"
                          : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-zinc-800 text-zinc-400"
                          }`}
                        >
                          {key === "ipad" ? (
                            <Tablet className="w-3.5 h-3.5" />
                          ) : (
                            <Smartphone className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">
                            {dev.name}
                          </div>
                          <div className="text-[10px] text-zinc-400 font-mono">
                            {dev.width} × {dev.height} px • {dev.osLabel}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions (Rotate & Refresh) */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-2.5">
                {isEs ? "Controles & Vista" : "Controls & View"}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsLandscape(!isLandscape)}
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
                  title="Cambiar orientación"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isLandscape ? "Paisaje" : "Retrato"}</span>
                </button>

                <button
                  onClick={() => setIframeKey((k) => k + 1)}
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
                  title="Recargar vista móvil"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isEs ? "Recargar" : "Reload"}</span>
                </button>
              </div>
            </div>

            {/* Tech Specs Box */}
            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2 text-[11px] font-mono">
              <div className="text-zinc-400 uppercase tracking-wider font-bold flex items-center gap-1.5 text-[10px]">
                <Info className="w-3 h-3 text-emerald-400" />
                <span>{isEs ? "Especificaciones" : "Viewport Specs"}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Viewport:</span>
                <strong className="text-zinc-200">{frameWidth} × {frameHeight} px</strong>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Breakpoint:</span>
                <strong className="text-emerald-400">
                  {frameWidth <= 768 ? "Mobile (< 768px)" : "Tablet"}
                </strong>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Navegación:</span>
                <strong className="text-zinc-200">{isEs ? "Menú Hamburguesa" : "Burger Menu"}</strong>
              </div>
            </div>

            {/* Testing Guide Tip */}
            <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-[11px] font-mono text-zinc-300 leading-relaxed">
              <span className="text-emerald-400 font-bold block mb-1">
                {isEs ? "💡 Qué probar:" : "💡 What to test:"}
              </span>
              {isEs
                ? "Abre el menú hamburguesa móvil, interactúa con el simulador LoRa y prueba enviar un mensaje desde el formulario táctil."
                : "Open the mobile hamburger menu, interact with the LoRa simulator, and test sending a message from the touch form."}
            </div>
          </div>

          {/* Bottom Close Action */}
          <div className="pt-4 border-t border-zinc-800/80 mt-4">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs font-semibold transition-colors cursor-pointer text-center"
            >
              {isEs ? "Cerrar Vista Móvil (Esc)" : "Close Mobile View (Esc)"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
