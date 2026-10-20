import { Collection, Db, MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import type {
  MarketJobDocument,
  PresetCacheDocument,
  RateLimitDocument,
} from "@/lib/schemas/job-market";

export const MONGODB_COLLECTIONS = {
  MARKET_JOBS: "market_jobs",
  RATE_LIMITS: "rate_limits",
  PRESET_CACHE: "market_preset_cache",
} as const;

export const VECTOR_SEARCH_INDEX_NAME = "job_vector_index" as const;
export const DEFAULT_DB_NAME = "portfolio_tech_radar" as const;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var _mongoIndexesEnsured: boolean | undefined;
}

const MONGO_OPTIONS: MongoClientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 60_000,
  connectTimeoutMS: 8_000,
  serverSelectionTimeoutMS: 8_000,
  socketTimeoutMS: 25_000,
};

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error(
      "Missing environment variable: MONGODB_URI no está configurada. Defínela en .env.local o en las variables de entorno de Vercel."
    );
  }
  return uri;
}

export function getMongoClient(): Promise<MongoClient> {
  if (globalThis._mongoClientPromise) {
    return globalThis._mongoClientPromise;
  }

  const uri = getMongoUri();
  const client = new MongoClient(uri, MONGO_OPTIONS);
  globalThis._mongoClientPromise = client.connect().catch((error: unknown) => {
    globalThis._mongoClientPromise = undefined;
    throw error;
  });

  return globalThis._mongoClientPromise;
}

export async function getDatabase(dbName?: string): Promise<Db> {
  const client = await getMongoClient();
  const resolvedDbName =
    dbName ?? process.env.MONGODB_DB_NAME?.trim() ?? DEFAULT_DB_NAME;
  return client.db(resolvedDbName);
}

export async function getMarketJobsCollection(): Promise<
  Collection<MarketJobDocument>
> {
  const db = await getDatabase();
  return db.collection<MarketJobDocument>(MONGODB_COLLECTIONS.MARKET_JOBS);
}

export async function getRateLimitsCollection(): Promise<
  Collection<RateLimitDocument>
> {
  const db = await getDatabase();
  return db.collection<RateLimitDocument>(MONGODB_COLLECTIONS.RATE_LIMITS);
}

export async function getPresetCacheCollection(): Promise<
  Collection<PresetCacheDocument>
> {
  const db = await getDatabase();
  return db.collection<PresetCacheDocument>(MONGODB_COLLECTIONS.PRESET_CACHE);
}

export async function ensureDatabaseIndexes(): Promise<void> {
  if (globalThis._mongoIndexesEnsured) {
    return;
  }

  const [jobsCol, rateLimitsCol, presetCacheCol] = await Promise.all([
    getMarketJobsCollection(),
    getRateLimitsCollection(),
    getPresetCacheCollection(),
  ]);

  await Promise.all([
    jobsCol.createIndex(
      { externalId: 1 },
      { unique: true, name: "idx_market_jobs_external_id_unique" }
    ),
    jobsCol.createIndex(
      { ingestedAt: -1 },
      { name: "idx_market_jobs_ingested_at_desc" }
    ),
    jobsCol.createIndex(
      { "extractedData.coreTechStack": 1 },
      { name: "idx_market_jobs_core_tech_stack" }
    ),
    rateLimitsCol.createIndex(
      { createdAt: 1 },
      {
        expireAfterSeconds: 3600,
        name: "idx_rate_limits_created_at_ttl_3600s",
      }
    ),
    rateLimitsCol.createIndex(
      { ipHash: 1, createdAt: -1 },
      { name: "idx_rate_limits_ip_hash_window" }
    ),
    presetCacheCol.createIndex(
      { presetId: 1 },
      { unique: true, name: "idx_preset_cache_preset_id_unique" }
    ),
    presetCacheCol.createIndex(
      { expiresAt: 1 },
      {
        expireAfterSeconds: 0,
        name: "idx_preset_cache_expires_at_ttl",
      }
    ),
  ]);

  globalThis._mongoIndexesEnsured = true;
}
