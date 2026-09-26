"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Award,
  Building2,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function ExperienceSection() {
  const { experiences, t, language } = usePortfolio();
  const [activeExp, setActiveExp] = useState<string | null>(null);
  const isEs = language === "es";

  return (
    <section id="experience" className="py-28 px-6 md:px-12 max-w-5xl mx-auto w-full relative">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 -left-36 w-80 h-80 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3 shadow-inner">
          <Briefcase className="w-3.5 h-3.5" />
          <span>{t.experience.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {t.experience.title}
        </h2>
        <p className="text-zinc-400 mt-2 max-w-xl text-sm md:text-base leading-relaxed">
          {t.experience.subtitle}
        </p>
      </div>

      {/* Timeline Conduit with Ambient Laser Line */}
      <div className="relative border-l-2 border-zinc-800/90 ml-3 md:ml-6 space-y-12 relative z-10">
        
        {/* Animated Laser Track Overlay */}
        <div className="absolute -left-[2px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-400 to-transparent pointer-events-none opacity-60" />

        {experiences.map((exp, idx) => {
          const isSelected = activeExp === exp.id;
          const isEnterprise = exp.organization.includes("IBM") || exp.organization.includes("Itaú");

          return (
            <div
              key={exp.id}
              onMouseEnter={() => setActiveExp(exp.id)}
              onMouseLeave={() => setActiveExp(null)}
              className="relative pl-6 md:pl-10 group"
            >
              {/* Pulsing Timeline Node with Concentric Halo */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-emerald-400 group-hover:scale-130 group-hover:bg-emerald-400 transition-all duration-300 shadow-[0_0_14px_rgba(52,211,153,0.7)] z-20">
                <span className="absolute -inset-1.5 rounded-full border border-emerald-400/40 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 pointer-events-none" />
              </div>

              <SpotlightCard
                spotlightColor={isEnterprise ? "rgba(16, 185, 129, 0.16)" : "rgba(59, 130, 246, 0.16)"}
                className="p-6 md:p-8 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500"
              >
                {/* Header with period and location */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit shadow-inner">
                    <Calendar className="w-3 h-3" />
                    <span>{exp.period}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400">
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    <span>{exp.location}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                  {exp.role}
                </h3>
                
                <div className="text-sm font-semibold text-emerald-400 font-mono mb-5 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{exp.organization}</span>
                  {isEnterprise && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-normal">
                      Enterprise Tier
                    </span>
                  )}
                </div>

                <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements List with Interactive Checkmark Hover */}
                <div className="space-y-2.5 mb-6 p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 shadow-inner">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold mb-2.5 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>{t.experience.achievementsTitle}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {exp.achievements.map((item, aIdx) => (
                      <li
                        key={aIdx}
                        className="text-xs text-zinc-300 flex items-start gap-2.5 group/item"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform" />
                        <span className="group-hover/item:text-zinc-100 transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips with Micro-Elevations */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800/60">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-950/90 text-zinc-300 border border-zinc-800/90 hover:border-emerald-500/50 hover:text-white hover:-translate-y-0.5 transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
