import { createHash } from "node:crypto";
import { NextRequest } from "next/server";
import {
  getPresetCacheCollection,
  getRateLimitsCollection,
} from "@/lib/mongodb";
import {
  type GapAnalysisLLMOutput,
  type MatchedJobEvidence,
  PresetCacheDocumentSchema,
  type PresetCacheDocument,
  type PresetProfileId,
  RATE_LIMIT_MAX_REQUESTS_PER_HOUR,
  RATE_LIMIT_TTL_SECONDS,
  RateLimitDocumentSchema,
} from "@/lib/schemas/job-market";

const PRESET_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export interface RateLimitCheckResult {
  allowed: boolean;
  remainingQuota: number;
  resetInSeconds: number;
}

export function extractClientIp(request: NextRequest | Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  return "127.0.0.1";
}

export function hashClientIp(rawIp: string): string {
  const normalizedIp = rawIp.trim().toLowerCase() || "127.0.0.1";
  return createHash("sha256").update(normalizedIp, "utf8").digest("hex");
}

export async function consumeRateLimitQuota(
  ipHash: string,
  endpoint: string
): Promise<RateLimitCheckResult> {
  const rateLimitsCol = await getRateLimitsCollection();
  const windowStart = new Date(Date.now() - RATE_LIMIT_TTL_SECONDS * 1000);

  const recentRecords = await rateLimitsCol
    .find(
      {
        ipHash,
        endpoint,
        createdAt: { $gte: windowStart },
      },
      { sort: { createdAt: 1 } }
    )
    .toArray();

  if (recentRecords.length >= RATE_LIMIT_MAX_REQUESTS_PER_HOUR) {
    const oldestTimestamp =
      recentRecords[0]?.createdAt.getTime() ?? Date.now();
    const elapsedSeconds = Math.floor((Date.now() - oldestTimestamp) / 1000);
    const resetInSeconds = Math.max(
      1,
      RATE_LIMIT_TTL_SECONDS - elapsedSeconds
    );

    return {
      allowed: false,
      remainingQuota: 0,
      resetInSeconds,
    };
  }

  const newRecord = RateLimitDocumentSchema.parse({
    ipHash,
    endpoint,
    createdAt: new Date(),
  });

  await rateLimitsCol.insertOne(newRecord);

  const remainingQuota = Math.max(
    0,
    RATE_LIMIT_MAX_REQUESTS_PER_HOUR - (recentRecords.length + 1)
  );

  return {
    allowed: true,
    remainingQuota,
    resetInSeconds: RATE_LIMIT_TTL_SECONDS,
  };
}

export async function getCachedPresetResult(
  presetId: PresetProfileId
): Promise<PresetCacheDocument | null> {
  const presetCacheCol = await getPresetCacheCollection();
  const now = new Date();

  const cachedDoc = await presetCacheCol.findOne({
    presetId,
    expiresAt: { $gt: now },
  });

  if (!cachedDoc) {
    return null;
  }

  const parsed = PresetCacheDocumentSchema.safeParse(cachedDoc);
  return parsed.success ? parsed.data : null;
}

export async function setCachedPresetResult(params: {
  presetId: PresetProfileId;
  profileText: string;
  analysis: GapAnalysisLLMOutput;
  matchedJobs: MatchedJobEvidence[];
}): Promise<void> {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + PRESET_CACHE_TTL_MS);

  const documentToStore = PresetCacheDocumentSchema.parse({
    presetId: params.presetId,
    profileText: params.profileText,
    analysis: params.analysis,
    matchedJobs: params.matchedJobs,
    updatedAt: now,
    expiresAt,
  });

  const presetCacheCol = await getPresetCacheCollection();

  await presetCacheCol.updateOne(
    { presetId: params.presetId },
    { $set: documentToStore },
    { upsert: true }
  );
}
