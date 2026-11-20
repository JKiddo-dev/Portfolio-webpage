"use client";

import React from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Calendar, MapPin, CheckCircle2, Building2 } from "lucide-react";

export default function ExperienceSection() {
  const { experiences, t } = usePortfolio();

  return (
    <section
      id="experience"
      className="border-t border-zinc-800/80 py-20 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="section-eyebrow mb-3">04 / {t.experience.badge}</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.experience.title}
          </h2>
          <p className="text-zinc-400 mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Clean 1px Architectural Timeline */}
        <div className="relative border-l border-zinc-800 ml-2 sm:ml-3 space-y-8">
          {experiences.map((exp) => {
            const isEnterprise =
              exp.organization.includes("SGO") ||
              exp.organization.includes("IBM") ||
              exp.organization.includes("Itaú");

            return (
              <div key={exp.id} className="relative pl-6 sm:pl-9">
                {/* Crisp Timeline Marker */}
                <div className="absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-[var(--background)]" />

                <SpotlightCard className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                    <span className="badge-accent inline-flex items-center gap-1.5 w-fit">
                      <Calendar className="w-3 h-3 shrink-0" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400">
                      <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                      <span>{exp.location}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5">
                    {exp.role}
                  </h3>

                  <div className="text-sm font-semibold text-emerald-400 font-mono mb-5 flex flex-wrap items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{exp.organization}</span>
                    {isEnterprise && (
                      <span className="badge-mono">Enterprise</span>
                    )}
                  </div>

                  <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements List */}
                  <div className="mb-6 p-4 rounded-md bg-zinc-950/70 border border-zinc-800">
                    <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold mb-3">
                      {t.experience.achievementsTitle}
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((item, aIdx) => (
                        <li
                          key={aIdx}
                          className="text-xs text-zinc-300 flex items-start gap-2.5 leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/80">
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="badge-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
