import { NextResponse } from "next/server";

export async function GET() {
  const memory = process.memoryUsage();
  return NextResponse.json(
    {
      status: "ok",
      environment: process.env.NODE_ENV || "production",
      runtime: "Next.js 16 Serverless (Vercel Edge-Ready)",
      nodeVersion: process.version,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      memoryUsageMB: {
        rss: Math.round((memory.rss / 1024 / 1024) * 10) / 10,
        heapTotal: Math.round((memory.heapTotal / 1024 / 1024) * 10) / 10,
        heapUsed: Math.round((memory.heapUsed / 1024 / 1024) * 10) / 10,
      },
    },
    { status: 200 }
  );
}
