"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Server, Cloud, Layout, Database, Sparkles, Layers, CheckCircle2, Zap } from "lucide-react";

export default function SkillsSection() {
  const { skillCategories, t } = usePortfolio();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Synergy map: when hovering a core technology, highlight related technologies across categories
  const synergyMap: Record<string, string[]> = {
    NestJS: ["TypeScript", "Jest", "Docker", "MongoDB", "Clean Architecture", "MQTT"],
    "Next.js": ["React", "TypeScript", "Tailwind CSS", "REST API", "NestJS"],
    TypeScript: ["NestJS", "Next.js", "React", "Jest"],
    ESP32: ["LoRa", "MQTT", "C++", "NestJS", "IoT Telemetry"],
    Docker: ["NestJS", "Linux VPS", "CI/CD", "MongoDB"],
    MongoDB: ["NestJS", "Docker", "TypeScript"],
  };

  const activeSynergies = hoveredSkill ? synergyMap[hoveredSkill] || [] : [];

  const getCategoryTheme = (title: string) => {
    if (title.includes("Backend")) {
      return {
        icon: <Server className="w-5 h-5 text-emerald-400" />,
        spotlight: "rgba(16, 185, 129, 0.16)",
        badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        progressColor: "bg-emerald-400",
      };
    }
    if (title.includes("Frontend")) {
      return {
        icon: <Layout className="w-5 h-5 text-teal-400" />,
        spotlight: "rgba(20, 184, 166, 0.16)",
        badge: "text-teal-400 bg-teal-500/10 border-teal-500/20",
        progressColor: "bg-teal-400",
      };
    }
    if (title.includes("Cloud") || title.includes("Databases") || title.includes("Bases")) {
      return {
        icon: <Database className="w-5 h-5 text-blue-400" />,
        spotlight: "rgba(59, 130, 246, 0.16)",
        badge: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        progressColor: "bg-blue-400",
      };
    }
    return {
      icon: <Cloud className="w-5 h-5 text-purple-400" />,
      spotlight: "rgba(168, 85, 247, 0.16)",
      badge: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      progressColor: "bg-purple-400",
    };
  };

  // Convert skill level string to numeric progress
  const getSkillPercent = (level: string) => {
    const l = level.toLowerCase();
    if (l.includes("avanzado") || l.includes("advanced") || l.includes("experto") || l.includes("expert")) return 92;
    if (l.includes("intermedio") || l.includes("intermediate")) return 82;
    return 75;
  };

  return (
    <section id="skills" className="py-28 px-6 md:px-12 max-w-6xl mx-auto w-full relative">
      
      {/* Background ambient light */}
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{t.skills.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {t.skills.title}
        </h2>
        <p className="text-zinc-400 mt-3 text-sm md:text-base leading-relaxed">
          {t.skills.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {skillCategories.map((category) => {
          const theme = getCategoryTheme(category.title);

          return (
            <SpotlightCard
              key={category.title}
              spotlightColor={theme.spotlight}
              className="p-6 flex flex-col justify-between hover:border-zinc-700/90 hover:shadow-2xl transition-all duration-300"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-zinc-800/80">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 shadow-sm">
                    {theme.icon}
                  </div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-100 font-bold">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List with Dynamic Mastery Progress */}
                <ul className="space-y-3">
                  {category.skills.map((skill) => {
                    const isHovered = hoveredSkill === skill.name;
                    const isSynergy = activeSynergies.includes(skill.name);
                    const pct = getSkillPercent(skill.level);

                    return (
                      <li
                        key={skill.name}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`group/skill relative p-2.5 rounded-xl text-xs transition-all duration-300 cursor-default flex flex-col gap-1.5 ${
                          isHovered
                            ? "bg-zinc-800/90 border border-emerald-500/50 shadow-md shadow-emerald-500/10 translate-x-1"
                            : isSynergy
                            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-200"
                            : "bg-zinc-950/50 border border-zinc-800/50 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-medium transition-colors ${
                              isHovered
                                ? "text-emerald-300 font-bold"
                                : isSynergy
                                ? "text-emerald-200 font-semibold"
                                : "text-zinc-200"
                            }`}
                          >
                            {skill.name}
                          </span>
                          
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover/skill:border-zinc-700">
                            {isHovered ? `${pct}%` : skill.level}
                          </span>
                        </div>

                        {/* Interactive Micro-Progress Bar on Hover */}
                        <div className="w-full h-1 bg-zinc-800/60 rounded-full overflow-hidden mt-0.5">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isHovered
                                ? "bg-gradient-to-r from-emerald-400 to-teal-300 shadow-[0_0_8px_#10b981]"
                                : isSynergy
                                ? "bg-emerald-400/80"
                                : "bg-zinc-700/60"
                            }`}
                            style={{
                              width: isHovered || isSynergy ? `${pct}%` : "30%",
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Stack</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-400">
                  {category.skills.length} {t.skills.toolsCount}
                </span>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
