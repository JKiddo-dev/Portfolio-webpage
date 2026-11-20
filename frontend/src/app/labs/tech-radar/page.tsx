"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { useTechRadar } from "@/features/tech-radar/hooks/useTechRadar";
import TechRadarHero from "@/features/tech-radar/components/TechRadarHero";
import CompatibilitySimulator from "@/features/tech-radar/components/CompatibilitySimulator";
import MarketTelemetrySection from "@/features/tech-radar/components/MarketTelemetrySection";
import EtlArchitecturePanel from "@/features/tech-radar/components/EtlArchitecturePanel";

export default function TechRadarPage() {
  const {
    isEs,
    stats,
    isLiveStats,
    loadingStats,
    formattedLastIngested,
    selectedPresetId,
    customProfileText,
    analysisResult,
    isLiveAnalysis,
    loadingAnalysis,
    loadingStage,
    analysisError,
    architectureOpen,
    simulatorRef,
    textareaRef,
    primaryPreset,
    secondaryPresets,
    loadingSteps,
    refreshMarketStats,
    handleSelectPreset,
    handleCustomTextChange,
    handleHeroAuditMatias,
    handleHeroCustomVacancy,
    handleRunCustomAnalysis,
    toggleArchitectureOpen,
  } = useTechRadar();

  return (
    <div className="relative min-h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-300 transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:px-3 focus:py-2 focus:rounded-md focus:bg-[var(--btn-primary-bg)] focus:text-[var(--btn-primary-fg)] focus:font-mono focus:text-xs focus:font-semibold"
      >
        {isEs ? "Ir al contenido principal" : "Skip to content"}
      </a>

      <Navbar />

      <main id="main-content" className="flex-1 pt-24 sm:pt-28 pb-20">
        <TechRadarHero
          isEs={isEs}
          stats={stats}
          isLiveStats={isLiveStats}
          onAuditMatias={handleHeroAuditMatias}
          onEvaluateCustomVacancy={handleHeroCustomVacancy}
        />

        <CompatibilitySimulator
          isEs={isEs}
          simulatorRef={simulatorRef}
          textareaRef={textareaRef}
          primaryPreset={primaryPreset}
          secondaryPresets={secondaryPresets}
          selectedPresetId={selectedPresetId}
          customProfileText={customProfileText}
          analysisResult={analysisResult}
          isLiveAnalysis={isLiveAnalysis}
          loadingAnalysis={loadingAnalysis}
          loadingStage={loadingStage}
          loadingSteps={loadingSteps}
          analysisError={analysisError}
          onSelectPreset={handleSelectPreset}
          onCustomTextChange={handleCustomTextChange}
          onRunCustomAnalysis={handleRunCustomAnalysis}
        />

        <MarketTelemetrySection
          isEs={isEs}
          stats={stats}
          isLiveStats={isLiveStats}
          loadingStats={loadingStats}
          formattedLastIngested={formattedLastIngested}
          onRefresh={() => {
            void refreshMarketStats();
          }}
        />

        <EtlArchitecturePanel
          isEs={isEs}
          isOpen={architectureOpen}
          onToggle={toggleArchitectureOpen}
        />
      </main>

      <FooterSection />
    </div>
  );
}
