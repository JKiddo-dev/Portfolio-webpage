import type {
  GapAnalysisResponse,
  MarketStatsResponse,
  PresetProfileId,
} from "@/lib/schemas/job-market";
import { BASELINE_MARKET_STATS } from "@/features/tech-radar/data/presets";

export interface MarketStatsFetchResult {
  stats: MarketStatsResponse;
  isLive: boolean;
}

export type AnalyzeGapResult =
  | { ok: true; data: GapAnalysisResponse }
  | { ok: false; rateLimited: boolean; error: string };

export async function fetchMarketStatsApi(): Promise<MarketStatsFetchResult> {
  try {
    const response = await fetch("/api/market/stats", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = (await response.json()) as MarketStatsResponse;
    if (data.totalVectorizedJobs > 0) {
      return { stats: data, isLive: true };
    }

    return {
      stats: {
        ...BASELINE_MARKET_STATS,
        queryLatencyMs: data.queryLatencyMs,
      },
      isLive: false,
    };
  } catch {
    return { stats: BASELINE_MARKET_STATS, isLive: false };
  }
}

export async function analyzeProfileGapApi(
  profileText: string,
  presetId: PresetProfileId | null,
  isEs: boolean
): Promise<AnalyzeGapResult> {
  const response = await fetch("/api/market/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      profileText,
      ...(presetId ? { presetId } : {}),
    }),
  });

  const payload = (await response.json()) as
    | GapAnalysisResponse
    | { error?: string; resetInSeconds?: number };

  if (response.status === 429) {
    const errorMsg =
      "error" in payload && payload.error
        ? payload.error
        : isEs
          ? "Límite de 5 análisis personalizados por hora alcanzado. Puedes seguir usando los 3 perfiles preconfigurados sin límite (Modo Zero-Token)."
          : "Hourly limit of 5 custom live analyses reached. You can continue using the 3 preconfigured presets with zero limits (Zero-Token Mode).";
    return { ok: false, rateLimited: true, error: errorMsg };
  }

  if (!response.ok || !("matchScore" in payload)) {
    return {
      ok: false,
      rateLimited: false,
      error:
        "error" in payload && payload.error
          ? payload.error
          : `HTTP ${response.status}`,
    };
  }

  return { ok: true, data: payload };
}
