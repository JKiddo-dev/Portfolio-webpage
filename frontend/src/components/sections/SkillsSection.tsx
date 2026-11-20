"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Server, Cloud, Layout, Database, Layers } from "lucide-react";

export default function SkillsSection() {
  const { skillCategories, t } = usePortfolio();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Synergy map: when hovering a core technology, highlight related technologies across categories
  const synergyMap: Record<string, string[]> = {
    NestJS: [
      "TypeScript",
      "Jest",
      "Docker",
      "MongoDB",
      "Clean Architecture",
      "MQTT",
    ],
    "Next.js": ["React", "TypeScript", "Tailwind CSS", "REST API", "NestJS"],
    TypeScript: ["NestJS", "Next.js", "React", "Jest"],
    ESP32: ["LoRa", "MQTT", "C++", "NestJS", "IoT Telemetry"],
    Docker: ["NestJS", "Linux VPS", "CI/CD", "MongoDB"],
    MongoDB: ["NestJS", "Docker", "TypeScript"],
  };

  const activeSynergies = hoveredSkill ? synergyMap[hoveredSkill] || [] : [];

  const getCategoryIcon = (title: string) => {
    if (title.includes("Backend")) {
      return <Server className="w-4 h-4 text-emerald-400" />;
    }
    if (title.includes("Frontend")) {
      return <Layout className="w-4 h-4 text-emerald-400" />;
    }
    if (
      title.includes("Cloud") ||
      title.includes("Databases") ||
      title.includes("Bases")
    ) {
      return <Database className="w-4 h-4 text-emerald-400" />;
    }
    return <Cloud className="w-4 h-4 text-emerald-400" />;
  };

  const getSkillPercent = (level: string) => {
    const l = level.toLowerCase();
    if (
      l.includes("avanzado") ||
      l.includes("advanced") ||
      l.includes("experto") ||
      l.includes("expert")
    )
      return 92;
    if (l.includes("intermedio") || l.includes("intermediate")) return 82;
    return 75;
  };

  return (
    <section id="skills" className="border-t border-zinc-800/80 py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="section-eyebrow mb-3">05 / {t.skills.badge}</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.skills.title}
          </h2>
          <p className="text-zinc-400 mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
            {t.skills.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((category) => (
            <SpotlightCard
              key={category.title}
              className="p-5 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-zinc-800">
                  <div className="p-2 rounded-md bg-zinc-950 border border-zinc-800">
                    {getCategoryIcon(category.title)}
                  </div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-100 font-semibold">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <ul className="space-y-2.5">
                  {category.skills.map((skill) => {
                    const isHovered = hoveredSkill === skill.name;
                    const isSynergy = activeSynergies.includes(skill.name);
                    const pct = getSkillPercent(skill.level);

                    return (
                      <li
                        key={skill.name}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`p-2.5 rounded-md text-xs transition-colors duration-200 cursor-default flex flex-col gap-1.5 border ${
                          isHovered
                            ? "bg-zinc-800 border-emerald-500/60"
                            : isSynergy
                            ? "bg-emerald-500/10 border-emerald-500/40"
                            : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`font-medium transition-colors ${
                              isHovered || isSynergy
                                ? "text-emerald-400 font-semibold"
                                : "text-zinc-200"
                            }`}
                          >
                            {skill.name}
                          </span>

                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400">
                            {isHovered ? `${pct}%` : skill.level}
                          </span>
                        </div>

                        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isHovered || isSynergy
                                ? "bg-emerald-500"
                                : "bg-zinc-600"
                            }`}
                            style={{
                              width: isHovered || isSynergy ? `${pct}%` : "32%",
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Stack</span>
                </span>
                <span className="badge-mono">
                  {category.skills.length} {t.skills.toolsCount}
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
