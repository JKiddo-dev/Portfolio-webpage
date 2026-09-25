import { NextRequest, NextResponse } from "next/server";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { Language } from "@/types/portfolio";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const langParam = searchParams.get("lang") === "en" ? "en" : "es";
  const categoryParam = searchParams.get("category");

  const projects = PROJECTS_DATA[langParam as Language] || PROJECTS_DATA.es;

  if (categoryParam && categoryParam !== "All") {
    const filtered = projects.filter((p) => p.category === categoryParam);
    return NextResponse.json(filtered, { status: 200 });
  }

  return NextResponse.json(projects, { status: 200 });
}
