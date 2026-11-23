"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import MeshSimulatorWidget from "./MeshSimulatorWidget";
import ProjectCaseStudyPanel from "./ProjectCaseStudyPanel";
import {
  Radio,
  Globe,
  Server,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export default function ProjectsSection() {
  const { projects, selectedCategory, setSelectedCategory, t, language } =
    usePortfolio();
  const [animatingFilter, setAnimatingFilter] = useState(false);

  const isEs = language === "es";
  const categories = [
    { key: "All", label: isEs ? "Todos" : "All" },
    { key: "Full-Stack", label: "Full-Stack" },
    {
      key: "Backend / Microservices",
      label: isEs ? "Backend / Microservicios" : "Backend / Microservices",
    },
    { key: "Frontend / Web", label: isEs ? "Frontend / Web" : "Frontend / Web" },
  ];

  const handleCategoryChange = (key: string) => {
    if (key === selectedCategory) return;
    setAnimatingFilter(true);
    setSelectedCategory(key);
    setTimeout(() => setAnimatingFilter(false), 200);
  };

  return (
    <section
      id="projects"
      className="border-t border-zinc-800/80 py-20 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header & Segmented Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-eyebrow mb-3">01 / {t.projects.badge}</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t.projects.title}
            </h2>
            <p className="text-zinc-400 mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
              {t.projects.subtitle}
            </p>
          </div>

          <div
            role="tablist"
            aria-label={isEs ? "Filtrar proyectos" : "Filter projects"}
            className="inline-flex flex-wrap lg:flex-nowrap shrink-0 gap-1 p-1 rounded-md bg-zinc-900 border border-zinc-800"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Case Studies */}
        <div
          className={`space-y-6 transition-opacity duration-200 ${
            animatingFilter ? "opacity-50" : "opacity-100"
          }`}
        >
          {projects.map((project) => {
            if (project.featured) {
              return (
                <SpotlightCard
                  key={project.id}
                  className="p-6 sm:p-8 lg:p-10"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-6 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="badge-accent inline-flex items-center gap-1.5">
                          <Radio className="w-3 h-3 shrink-0" />
                          <span>{t.projects.featuredBadge}</span>
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          {project.tagline}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                        {project.title}
                      </h3>

                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Architecture Highlights */}
                      <div className="p-4 rounded-md bg-zinc-950/70 border border-zinc-800 mb-6">
                        <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-3 font-semibold flex items-center gap-2">
                          <Server className="w-3.5 h-3.5" />
                          <span>{t.projects.archTitle}</span>
                        </div>
                        <ul className="space-y-2">
                          {project.architectureHighlights.map(
                            (highlight, idx) => (
                              <li
                                key={idx}
                                className="text-xs text-zinc-300 flex items-start gap-2.5 leading-relaxed"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="badge-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Live Mesh Simulator Widget */}
                    <div className="lg:col-span-6 w-full min-w-0">
                      <MeshSimulatorWidget />
                    </div>
                  </div>

                  {project.caseStudy && (
                    <ProjectCaseStudyPanel
                      caseStudy={project.caseStudy}
                      language={language}
                    />
                  )}
                </SpotlightCard>
              );
            }

            return (
              <SpotlightCard key={project.id} className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                        <Globe className="w-3.5 h-3.5" />
                        <span>{project.category}</span>
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        {project.tagline}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                      {project.title}
                    </h3>

                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {project.architectureHighlights && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                        {project.architectureHighlights.map(
                          (highlight, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-md bg-zinc-950/70 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                              <span>{highlight}</span>
                            </div>
                          )
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="badge-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.metrics && (
                    <div className="flex flex-row md:flex-col gap-3 md:min-w-[160px] shrink-0">
                      {project.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="flex-1 p-3.5 rounded-md bg-zinc-950/70 border border-zinc-800 text-left"
                        >
                          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                            {m.label}
                          </div>
                          <div className="text-sm font-mono font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                            <span>{m.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {project.caseStudy && (
                  <ProjectCaseStudyPanel
                    caseStudy={project.caseStudy}
                    language={language}
                  />
                )}
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
