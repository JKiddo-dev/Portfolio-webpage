import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { runMarketJobsEtlPipeline } from "@/lib/services/job-etl";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

function sha256Buffer(value: string): Buffer {
  return createHash("sha256").update(value, "utf8").digest();
}

function isAuthorizedCronRequest(request: NextRequest): boolean {
  const configuredSecret = process.env.CRON_SECRET?.trim();
  if (!configuredSecret) {
    return false;
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const providedToken = authHeader.slice("Bearer ".length).trim();
  if (!providedToken) {
    return false;
  }

  const expectedDigest = sha256Buffer(configuredSecret);
  const providedDigest = sha256Buffer(providedToken);

  return timingSafeEqual(expectedDigest, providedDigest);
}

async function handleCronExecution(request: NextRequest): Promise<NextResponse> {
  if (!process.env.CRON_SECRET?.trim()) {
    return NextResponse.json(
      {
        ok: false,
        error: "Server misconfiguration: CRON_SECRET is not defined.",
      },
      { status: 500 }
    );
  }

  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unauthorized: Invalid or missing Bearer token.",
      },
      { status: 401 }
    );
  }

  try {
    const report = await runMarketJobsEtlPipeline();
    return NextResponse.json(
      {
        ok: true,
        report,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown ETL pipeline error";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return handleCronExecution(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return handleCronExecution(request);
}
