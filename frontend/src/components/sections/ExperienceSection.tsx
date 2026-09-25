"use client";

import React from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function ExperienceSection() {
  const { experiences, t } = usePortfolio();

  return (
    <section id="experience" className="py-28 px-6 md:px-12 max-w-5xl mx-auto w-full relative">
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          {t.experience.badge}
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {t.experience.title}
        </h2>
        <p className="text-zinc-400 mt-2 max-w-xl text-sm md:text-base">
          {t.experience.subtitle}
        </p>
      </div>

      <div className="relative border-l-2 border-zinc-800/80 ml-3 md:ml-6 space-y-12">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-6 md:pl-10 group">
            {/* Pulsing timeline node */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-emerald-400 group-hover:scale-130 group-hover:bg-emerald-400 transition-all shadow-[0_0_12px_rgba(52,211,153,0.6)]" />

            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.12)"
              className="p-6 md:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                  <Calendar className="w-3 h-3" />
                  {exp.period}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                {exp.role}
              </h3>
              
              <div className="text-sm font-medium text-emerald-400/90 font-mono mb-5">
                {exp.organization}
              </div>

              <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
                {exp.description}
              </p>

              {/* Achievements with custom indicators */}
              <div className="space-y-2.5 mb-6 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold mb-2">
                  {t.experience.achievementsTitle}
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((item, idx) => (
                    <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/60">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded text-[11px] font-mono bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-zinc-600 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </section>
  );
}