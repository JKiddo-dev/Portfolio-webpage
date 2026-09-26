"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import MeshSimulatorWidget from "./MeshSimulatorWidget";
import {
  Radio,
  Globe,
  Sparkles,
  Server,
  CheckCircle2,
  ExternalLink,
  Layers,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export default function ProjectsSection() {
  const { projects, selectedCategory, setSelectedCategory, t, language } = usePortfolio();
  const [animatingFilter, setAnimatingFilter] = useState(false);

  const isEs = language === "es";
  const categories = [
    { key: "All", label: isEs ? "Todos" : "All" },
    { key: "Full-Stack", label: "Full-Stack" },
    { key: "Backend / Microservices", label: isEs ? "Backend / Microservicios" : "Backend / Microservices" },
    { key: "Frontend / Web", label: isEs ? "Frontend / Web" : "Frontend / Web" },
  ];

  const handleCategoryChange = (key: string) => {
    if (key === selectedCategory) return;
    setAnimatingFilter(true);
    setSelectedCategory(key);
    setTimeout(() => setAnimatingFilter(false), 280);
  };

  return (
    <section id="projects" className="py-28 px-6 md:px-12 max-w-6xl mx-auto w-full relative">
      
      {/* Background ambient light */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header with animated pill filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t.projects.title}
          </h2>
          <p className="text-zinc-400 mt-2 max-w-xl text-sm md:text-base leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl shadow-lg">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;

            return (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "text-zinc-950 font-bold shadow-md shadow-emerald-500/25 scale-[1.02]"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                {/* Active Sliding Background Pill */}
                {isSelected && (
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 -z-10 shadow-sm transition-all" />
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Cards with Filter Transition */}
      <div className={`space-y-10 transition-all duration-300 ${animatingFilter ? "opacity-40 scale-[0.99] translate-y-1" : "opacity-100 scale-100 translate-y-0"}`}>
        {projects.map((project) => {
          const isFeatured = project.featured;

          if (isFeatured) {
            return (
              <SpotlightCard
                key={project.id}
                spotlightColor="rgba(16, 185, 129, 0.22)"
                className="group p-8 md:p-10 border-emerald-500/40 bg-gradient-to-b from-zinc-900/95 via-zinc-900/70 to-zinc-950 shadow-2xl hover:border-emerald-500/60 hover:shadow-emerald-500/10 transition-all duration-500"
              >
                {/* Continuous Shimmer Sheen on Featured Border */}
                <div className="flex flex-col lg:flex-row gap-8 lg:items-start justify-between">
                  <div className="lg:max-w-xl">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-semibold border border-emerald-500/40 shadow-sm">
                        <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        {t.projects.featuredBadge}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        {project.tagline}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Architecture Bulleted Highlights */}
                    <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/90 mb-6 shadow-inner">
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

                    {/* Tech Badges with Micro Hover Lift */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-950 text-zinc-200 border border-zinc-800 hover:border-emerald-500/60 hover:text-white hover:-translate-y-0.5 transition-all cursor-default"
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

          // Standard Projects
          return (
            <SpotlightCard
              key={project.id}
              spotlightColor="rgba(59, 130, 246, 0.16)"
              className="group p-7 md:p-8 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
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

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights Grid */}
                  {project.architectureHighlights && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                      {project.architectureHighlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-300 flex items-center gap-2 group-hover:border-zinc-700/80 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-950/90 text-zinc-300 border border-zinc-800/80 hover:border-blue-500/50 hover:text-white transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics Column with Animated Accent */}
                {project.metrics && (
                  <div className="flex flex-row md:flex-col gap-3 min-w-[150px] shrink-0 pt-2">
                    {project.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="flex-1 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-center hover:border-emerald-500/30 transition-colors group/metric"
                      >
                        <div className="text-[10px] font-mono uppercase text-zinc-500">
                          {m.label}
                        </div>
                        <div className="text-sm font-mono font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1">
                          <TrendingUp className="w-3 h-3 text-emerald-400/80 group-hover/metric:scale-125 transition-transform" />
                          <span>{m.value}</span>
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
