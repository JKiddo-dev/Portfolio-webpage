"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Server, Cloud, Layout, Database, Layers } from "lucide-react";

const SYNERGY_MAP: Record<string, string[]> = {
  "Java 21 / Spring Boot": [
    "JSP & Thymeleaf (SSR)",
    "MariaDB / SQL Server / MySQL",
    "Groovy / Spock & Jest / Vitest",
    "CI/CD (GitLab / Bitbucket / GitHub)",
    "Agile: Scrumban (SGO) & Scrum (IBM)",
  ],
  "MariaDB / SQL Server / MySQL": [
    "Java 21 / Spring Boot",
    "JSP & Thymeleaf (SSR)",
    "Groovy / Spock & Jest / Vitest",
    "REST APIs & WebSockets",
  ],
  "Groovy / Spock & Jest / Vitest": [
    "Java 21 / Spring Boot",
    "NestJS (Node.js)",
    "TypeScript / JavaScript",
    "CI/CD (GitLab / Bitbucket / GitHub)",
  ],
  "NestJS (Node.js)": [
    "TypeScript / JavaScript",
    "MongoDB Atlas & PostgreSQL",
    "AWS (EC2/S3/IAM) & Docker / K8s",
    "Groovy / Spock & Jest / Vitest",
    "Arquitectura BFF & Clean Arch",
    "BFF & Clean Architecture",
  ],
  "Next.js (App Router / SSR)": [
    "React",
    "TypeScript / JavaScript",
    "Tailwind CSS",
    "NestJS (Node.js)",
    "IA Aplicada (Gemini + RAG + Zod)",
    "Applied AI (Gemini + RAG + Zod)",
  ],
  "TypeScript / JavaScript": [
    "Next.js (App Router / SSR)",
    "React",
    "NestJS (Node.js)",
    "Groovy / Spock & Jest / Vitest",
  ],
  "MQTT & Sistemas IoT (ESP32/LoRa)": [
    "NestJS (Node.js)",
    "MongoDB Atlas & PostgreSQL",
    "REST APIs & WebSockets",
  ],
  "MQTT & IoT Systems (ESP32/LoRa)": [
    "NestJS (Node.js)",
    "MongoDB Atlas & PostgreSQL",
    "REST APIs & WebSockets",
  ],
  "AWS (EC2/S3/IAM) & Docker / K8s": [
    "NestJS (Node.js)",
    "Java 21 / Spring Boot",
    "CI/CD (GitLab / Bitbucket / GitHub)",
    "MongoDB Atlas & PostgreSQL",
  ],
};

export default function SkillsSection() {
  const { skillCategories, t } = usePortfolio();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const activeSynergies = hoveredSkill ? SYNERGY_MAP[hoveredSkill] || [] : [];

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
                  <div className="p-2 rounded-md bg-zinc-950 border border-zinc-800 shrink-0">
                    {getCategoryIcon(category.title)}
                  </div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-100 font-semibold">
                    {category.title}
                  </h3>
                </div>

                {/* Production-Context Skills List */}
                <ul className="space-y-2">
                  {category.skills.map((skill) => {
                    const isHovered = hoveredSkill === skill.name;
                    const isSynergy = activeSynergies.includes(skill.name);
                    const contextLabel = skill.context || skill.level;

                    return (
                      <li
                        key={skill.name}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`p-2.5 rounded-md text-xs transition-colors duration-150 cursor-default flex flex-col gap-1.5 border ${
                          isHovered
                            ? "bg-[var(--surface-subtle)] border-emerald-500/60"
                            : isSynergy
                              ? "bg-emerald-500/10 border-emerald-500/40"
                              : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-[var(--surface-subtle)]"
                        }`}
                      >
                        <span
                          className={`font-medium leading-snug transition-colors ${
                            isHovered || isSynergy
                              ? "text-emerald-400 font-semibold"
                              : "text-zinc-200"
                          }`}
                        >
                          {skill.name}
                        </span>

                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={
                              isHovered || isSynergy
                                ? "badge-accent text-[10px]"
                                : "badge-mono text-[10px]"
                            }
                          >
                            {contextLabel}
                          </span>
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
