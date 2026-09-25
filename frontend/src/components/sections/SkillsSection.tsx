"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Server, Cloud, Layout, Database, Sparkles, Layers } from "lucide-react";

export default function SkillsSection() {
  const { skillCategories, t } = usePortfolio();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getCategoryIcon = (title: string) => {
    if (title.includes("Backend")) return <Server className="w-5 h-5 text-emerald-400" />;
    if (title.includes("Frontend")) return <Layout className="w-5 h-5 text-teal-400" />;
    if (title.includes("Cloud") || title.includes("Databases") || title.includes("Bases"))
      return <Database className="w-5 h-5 text-blue-400" />;
    return <Cloud className="w-5 h-5 text-purple-400" />;
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-6xl mx-auto w-full relative">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          {t.skills.badge}
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {t.skills.title}
        </h2>
        <p className="text-zinc-400 mt-3 text-sm md:text-base">
          {t.skills.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category) => (
          <SpotlightCard
            key={category.title}
            spotlightColor="rgba(16, 185, 129, 0.14)"
            className="p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-zinc-800">
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  {getCategoryIcon(category.title)}
                </div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-100 font-bold">
                  {category.title}
                </h3>
              </div>

              <ul className="space-y-2.5">
                {category.skills.map((skill) => {
                  const isHovered = hoveredSkill === skill.name;

                  return (
                    <li
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-all duration-200 cursor-default ${
                        isHovered
                          ? "bg-zinc-800/80 border border-emerald-500/30 translate-x-1"
                          : "bg-zinc-950/40 border border-zinc-800/40 hover:border-zinc-700"
                      }`}
                    >
                      <span className={`font-medium ${isHovered ? "text-emerald-300 font-semibold" : "text-zinc-300"}`}>
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {skill.level}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-zinc-500" /> Stack
              </span>
              <span>
                {category.skills.length} {t.skills.toolsCount}
              </span>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}