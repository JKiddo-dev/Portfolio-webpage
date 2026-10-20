import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { AnalyzeMarketRequestSchema } from "@/lib/schemas/job-market";
import { executeSemanticGapAnalysis } from "@/lib/services/market-analytics";
import { extractClientIp } from "@/lib/services/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const rawBody: unknown = await request.json();
    const parsedRequest = AnalyzeMarketRequestSchema.parse(rawBody);
    const clientIp = extractClientIp(request);

    const outcome = await executeSemanticGapAnalysis({
      profileText: parsedRequest.profileText,
      presetId: parsedRequest.presetId,
      clientIp,
    });

    if (outcome.status === "rate_limited") {
      return NextResponse.json(
        {
          error:
            "Has alcanzado el límite de 5 análisis en vivo por hora. Utiliza los perfiles preconfigurados (Modo Zero-Token) o intenta nuevamente más tarde.",
          resetInSeconds: outcome.resetInSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(outcome.resetInSeconds),
          },
        }
      );
    }

    return NextResponse.json(outcome.data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          issues: error.issues,
        },
        { status: 400 }
      );
    }

    const message =
      error instanceof Error
        ? error.message
        : "Error executing semantic gap analysis";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}
