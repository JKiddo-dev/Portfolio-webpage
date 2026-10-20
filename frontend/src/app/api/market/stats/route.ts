import { NextResponse } from "next/server";
import { getMarketAnalyticsStats } from "@/lib/services/market-analytics";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  try {
    const stats = await getMarketAnalyticsStats();
    return NextResponse.json(stats, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Error retrieving market aggregation stats";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}
