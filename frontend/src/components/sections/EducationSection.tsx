"use client";

import React from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { GraduationCap, MapPin, Calendar, Award, Plane } from "lucide-react";

export default function EducationSection() {
  const { education, t } = usePortfolio();

  return (
    <section id="education" className="py-24 px-6 md:px-12 max-w-5xl mx-auto w-full relative">
      <div className="mb-14 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          {t.education.badge}
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {t.education.title}
        </h2>
        <p className="text-zinc-400 mt-2 text-sm md:text-base">
          {t.education.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((item, idx) => (
          <SpotlightCard
            key={idx}
            spotlightColor={idx === 1 ? "rgba(168, 85, 247, 0.15)" : "rgba(16, 185, 129, 0.15)"}
            className="p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <Calendar className="w-3 h-3" />
                  {item.period}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                {idx === 1 ? (
                  <Plane className="w-4 h-4 text-purple-400 shrink-0" />
                ) : (
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <h3 className="text-lg font-bold text-white leading-snug">
                  {item.degree}
                </h3>
              </div>

              <div className="text-sm font-mono text-zinc-400 mb-4 font-medium">
                {item.institution}
              </div>

              {item.details && (
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.details}
                </p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>{idx === 1 ? "Internacional • España" : "Grado de Ingeniería"}</span>
              <span className="text-emerald-400 font-bold">Verificado</span>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}