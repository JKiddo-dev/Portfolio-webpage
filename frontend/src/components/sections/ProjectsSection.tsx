"use client";

import React from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import MeshSimulatorWidget from "./MeshSimulatorWidget";
import { Radio, Globe, Sparkles, Server, CheckCircle2 } from "lucide-react";

export default function ProjectsSection() {
  const { projects, selectedCategory, setSelectedCategory, t, language } = usePortfolio();

  const isEs = language === "es";
  const categories = [
    { key: "All", label: isEs ? "Todos" : "All" },
    { key: "Full-Stack", label: "Full-Stack" },
    { key: "Backend / Microservices", label: isEs ? "Backend / Microservicios" : "Backend / Microservices" },
    { key: "Frontend / Web", label: isEs ? "Frontend / Web" : "Frontend / Web" },
  ];

  return (
    <section id="projects" className="py-28 px-6 md:px-12 max-w-6xl mx-auto w-full relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {t.projects.badge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t.projects.title}
          </h2>
          <p className="text-zinc-400 mt-2 max-w-xl text-sm md:text-base">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.key
                  ? "bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/25 scale-102"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-10">
        {projects.map((project) => {
          const isFeatured = project.featured;

          if (isFeatured) {
            return (
              <SpotlightCard
                key={project.id}
                spotlightColor="rgba(16, 185, 129, 0.18)"
                className="p-8 md:p-10 border-emerald-500/30 bg-gradient-to-b from-zinc-900/90 via-zinc-900/60 to-zinc-950"
              >
                <div className="flex flex-col lg:flex-row gap-8 lg:items-start justify-between">
                  <div className="lg:max-w-xl">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-semibold border border-emerald-500/30">
                        <Radio className="w-3.5 h-3.5 text-emerald-400" />
                        {t.projects.featuredBadge}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        {project.tagline}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                      {project.title}
                    </h3>

                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Architecture Bulleted Highlights */}
                    <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 mb-6">
                      <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3 font-bold flex items-center gap-2">
                        <Server className="w-3.5 h-3.5" />
                        {t.projects.archTitle}
                      </div>
                      <ul className="space-y-2">
                        {project.architectureHighlights.map((highlight, idx) => (
                          <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-md text-xs font-mono bg-zinc-950 text-zinc-200 border border-zinc-800 hover:border-emerald-500/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Live Mesh Simulator Widget Embedded */}
                  <div className="w-full lg:max-w-md">
                    <MeshSimulatorWidget />
                  </div>
                </div>
              </SpotlightCard>
            );
          }

          // Other projects
          return (
            <SpotlightCard
              key={project.id}
              spotlightColor="rgba(59, 130, 246, 0.14)"
              className="p-7 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
                      <Globe className="w-3.5 h-3.5" />
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{project.tagline}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.architectureHighlights && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {project.architectureHighlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-zinc-950/40 border border-zinc-800/60 text-xs text-zinc-300 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded text-[11px] font-mono bg-zinc-950/80 text-zinc-300 border border-zinc-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics Pill column */}
                {project.metrics && (
                  <div className="flex flex-row md:flex-col gap-3 min-w-[150px] shrink-0 pt-2">
                    {project.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="flex-1 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-center"
                      >
                        <div className="text-[10px] font-mono uppercase text-zinc-500">
                          {m.label}
                        </div>
                        <div className="text-sm font-mono font-bold text-emerald-400 mt-1">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}