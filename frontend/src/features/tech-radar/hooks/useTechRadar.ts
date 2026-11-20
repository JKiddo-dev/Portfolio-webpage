"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, RefObject } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import type {
  GapAnalysisResponse,
  MarketStatsResponse,
  PresetProfileId,
} from "@/lib/schemas/job-market";
import {
  BASELINE_MARKET_STATS,
  PRESET_PROFILES,
  getLoadingSteps,
  type LoadingStepItem,
  type PresetDefinition,
} from "@/features/tech-radar/data/presets";
import { buildFallbackAnalysis } from "@/features/tech-radar/data/fallbackAnalysis";
import {
  analyzeProfileGapApi,
  fetchMarketStatsApi,
} from "@/features/tech-radar/services/techRadarClient";

export interface UseTechRadarReturn {
  language: "es" | "en";
  isEs: boolean;
  isDark: boolean;
  stats: MarketStatsResponse;
  isLiveStats: boolean;
  loadingStats: boolean;
  formattedLastIngested: string;
  selectedPresetId: PresetProfileId | null;
  customProfileText: string;
  analysisResult: GapAnalysisResponse | null;
  isLiveAnalysis: boolean;
  loadingAnalysis: boolean;
  loadingStage: 0 | 1 | 2;
  analysisError: string | null;
  architectureOpen: boolean;
  simulatorRef: RefObject<HTMLDivElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  primaryPreset: PresetDefinition | undefined;
  secondaryPresets: readonly PresetDefinition[];
  loadingSteps: LoadingStepItem[];
  refreshMarketStats: () => Promise<void>;
  handleSelectPreset: (preset: PresetDefinition) => void;
  handleCustomTextChange: (value: string) => void;
  handleHeroAuditMatias: () => void;
  handleHeroCustomVacancy: () => void;
  handleRunCustomAnalysis: (e: FormEvent) => void;
  toggleArchitectureOpen: () => void;
}

export function useTechRadar(): UseTechRadarReturn {
  const { language, isDark } = usePortfolio();
  const isEs = language === "es";

  const [stats, setStats] = useState<MarketStatsResponse>(
    BASELINE_MARKET_STATS
  );
  const [isLiveStats, setIsLiveStats] = useState<boolean>(false);
  const [loadingStats, setLoadingStats] = useState<boolean>(true);

  const [selectedPresetId, setSelectedPresetId] =
    useState<PresetProfileId | null>("matias-fullstack");
  const [customProfileText, setCustomProfileText] = useState<string>(
    PRESET_PROFILES[0]?.profileText ?? ""
  );
  const [analysisResult, setAnalysisResult] =
    useState<GapAnalysisResponse | null>(null);
  const [isLiveAnalysis, setIsLiveAnalysis] = useState<boolean>(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);
  const [loadingStage, setLoadingStage] = useState<0 | 1 | 2>(0);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [architectureOpen, setArchitectureOpen] = useState<boolean>(false);

  const simulatorRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const refreshMarketStats = useCallback(async () => {
    setLoadingStats(true);
    const result = await fetchMarketStatsApi();
    setStats(result.stats);
    setIsLiveStats(result.isLive);
    setLoadingStats(false);
  }, []);

  const triggerGapAnalysis = useCallback(
    async (
      profileText: string,
      presetId: PresetProfileId | null,
      withVisualStages = false
    ) => {
      const trimmed = profileText.trim();
      if (trimmed.length < 15) {
        setAnalysisError(
          isEs
            ? "Ingresa al menos 15 caracteres describiendo los requisitos de tu vacante o perfil."
            : "Please enter at least 15 characters describing your job requirements or profile."
        );
        return;
      }

      setLoadingAnalysis(true);
      setLoadingStage(0);
      setAnalysisError(null);
      const startTime = Date.now();

      const stageTimer1 = setTimeout(() => setLoadingStage(1), 160);
      const stageTimer2 = setTimeout(() => setLoadingStage(2), 320);

      try {
        const minStageWait = withVisualStages
          ? new Promise<void>((resolve) => {
              setTimeout(resolve, 480);
            })
          : Promise.resolve();

        const [result] = await Promise.all([
          analyzeProfileGapApi(trimmed, presetId, isEs),
          minStageWait,
        ]);

        if (!result.ok) {
          if (result.rateLimited) {
            setAnalysisError(result.error);
            return;
          }
          throw new Error(result.error);
        }

        setAnalysisResult(result.data);
        setIsLiveAnalysis(true);
      } catch {
        if (withVisualStages) {
          await new Promise<void>((resolve) => {
            setTimeout(resolve, 360);
          });
        }
        const fallback = buildFallbackAnalysis(
          presetId,
          Math.max(12, Date.now() - startTime),
          isEs
        );
        setAnalysisResult(fallback);
        setIsLiveAnalysis(false);
      } finally {
        clearTimeout(stageTimer1);
        clearTimeout(stageTimer2);
        setLoadingAnalysis(false);
      }
    },
    [isEs]
  );

  // Initial hydration of live stats + default Matías full-stack audit
  useEffect(() => {
    let cancelled = false;
    const initialPreset = PRESET_PROFILES[0];

    const hydrate = async () => {
      const startTime = Date.now();
      const [statsRes, gapRes] = await Promise.all([
        fetchMarketStatsApi(),
        initialPreset
          ? analyzeProfileGapApi(
              initialPreset.profileText,
              initialPreset.id,
              isEs
            ).catch(() => null)
          : Promise.resolve(null),
      ]);

      if (cancelled) return;

      setStats(statsRes.stats);
      setIsLiveStats(statsRes.isLive);
      setLoadingStats(false);

      if (gapRes && gapRes.ok) {
        setAnalysisResult(gapRes.data);
        setIsLiveAnalysis(true);
      } else if (initialPreset) {
        setAnalysisResult(
          buildFallbackAnalysis(
            initialPreset.id,
            Math.max(12, Date.now() - startTime),
            isEs
          )
        );
        setIsLiveAnalysis(false);
      }
    };

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, [isEs]);

  const handleSelectPreset = useCallback(
    (preset: PresetDefinition) => {
      setSelectedPresetId(preset.id);
      setCustomProfileText(preset.profileText);
      void triggerGapAnalysis(preset.profileText, preset.id, true);
    },
    [triggerGapAnalysis]
  );

  const handleCustomTextChange = useCallback((value: string) => {
    setCustomProfileText(value);
    setSelectedPresetId(null);
  }, []);

  const handleHeroAuditMatias = useCallback(() => {
    const primary = PRESET_PROFILES[0];
    if (!primary) return;
    setSelectedPresetId(primary.id);
    setCustomProfileText(primary.profileText);
    simulatorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    void triggerGapAnalysis(primary.profileText, primary.id, true);
  }, [triggerGapAnalysis]);

  const handleHeroCustomVacancy = useCallback(() => {
    simulatorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 350);
  }, []);

  const handleRunCustomAnalysis = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      void triggerGapAnalysis(customProfileText, selectedPresetId, true);
    },
    [customProfileText, selectedPresetId, triggerGapAnalysis]
  );

  const toggleArchitectureOpen = useCallback(() => {
    setArchitectureOpen((prev) => !prev);
  }, []);

  const formattedLastIngested = useMemo(() => {
    if (!stats.lastIngestedAt) {
      return isEs ? "Sincronización diaria activa" : "Daily sync active";
    }
    return new Date(stats.lastIngestedAt).toLocaleString(
      isEs ? "es-CL" : "en-US",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  }, [stats.lastIngestedAt, isEs]);

  const loadingSteps = useMemo(() => getLoadingSteps(isEs), [isEs]);

  return {
    language,
    isEs,
    isDark,
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
    primaryPreset: PRESET_PROFILES[0],
    secondaryPresets: PRESET_PROFILES.slice(1),
    loadingSteps,
    refreshMarketStats,
    handleSelectPreset,
    handleCustomTextChange,
    handleHeroAuditMatias,
    handleHeroCustomVacancy,
    handleRunCustomAnalysis,
    toggleArchitectureOpen,
  };
}
