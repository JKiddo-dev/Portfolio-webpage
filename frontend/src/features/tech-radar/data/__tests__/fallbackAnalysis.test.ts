import { buildFallbackAnalysis } from "../fallbackAnalysis";

describe("buildFallbackAnalysis", () => {
  it("returns the default Matías full-stack 92% profile for matias-fullstack and null preset", () => {
    const explicit = buildFallbackAnalysis("matias-fullstack", 25, true);
    const fallbackNull = buildFallbackAnalysis(null, 40, false);

    expect(explicit.matchScore).toBe(92);
    expect(explicit.meta.presetId).toBe("matias-fullstack");
    expect(explicit.meta.cached).toBe(true);
    expect(explicit.meta.latencyMs).toBe(25);
    expect(explicit.matchingSkills).toContain("typescript");
    expect(explicit.matchedJobs.length).toBeGreaterThanOrEqual(3);
    expect(explicit.architecturalFit).toContain("Resumen Ejecutivo");

    expect(fallbackNull.matchScore).toBe(92);
    expect(fallbackNull.meta.presetId).toBe("matias-fullstack");
    expect(fallbackNull.meta.latencyMs).toBe(40);
    expect(fallbackNull.architecturalFit).toContain("Executive Summary");
  });

  it("returns the cloud-microservices preset with 86% match score and bilingual copy", () => {
    const es = buildFallbackAnalysis("cloud-microservices", 18, true);
    const en = buildFallbackAnalysis("cloud-microservices", 18, false);

    expect(es.matchScore).toBe(86);
    expect(es.meta.presetId).toBe("cloud-microservices");
    expect(es.matchingSkills).toContain("nestjs");
    expect(es.matchingSkills).toContain("bff");
    expect(es.architecturalFit).toContain("Valor para el Negocio");
    expect(en.architecturalFit).toContain("Business Value");
  });

  it("returns the frontend-nextjs preset with 84% match score and bilingual action plan", () => {
    const es = buildFallbackAnalysis("frontend-nextjs", 22, true);
    const en = buildFallbackAnalysis("frontend-nextjs", 22, false);

    expect(es.matchScore).toBe(84);
    expect(es.meta.presetId).toBe("frontend-nextjs");
    expect(es.matchingSkills).toContain("nextjs");
    expect(es.recommendedActionPlan).toHaveLength(2);
    expect(es.recommendedActionPlan[0]).toContain("Playwright");
    expect(en.recommendedActionPlan[0]).toContain("Playwright");
    expect(es.architecturalFit).not.toBe(en.architecturalFit);
  });
});
