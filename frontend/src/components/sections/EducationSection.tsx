"use client";

import React from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { MapPin, Calendar, Award, Plane } from "lucide-react";

export default function EducationSection() {
  const { education, t, language } = usePortfolio();
  const isEs = language === "es";

  return (
    <section
      id="education"
      className="border-t border-zinc-800/80 py-20 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="section-eyebrow mb-3">06 / {t.education.badge}</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.education.title}
          </h2>
          <p className="text-zinc-400 mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
            {t.education.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item, idx) => (
            <SpotlightCard
              key={idx}
              className="p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="badge-accent inline-flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 shrink-0" />
                    <span>{item.period}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400">
                    <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                    <span>{item.location}</span>
                  </span>
                </div>

                <div className="flex items-start gap-2.5 mb-2">
                  {idx === 1 ? (
                    <Plane className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  ) : (
                    <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
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

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>
                  {idx === 1
                    ? isEs
                      ? "Internacional • España"
                      : "International • Spain"
                    : isEs
                    ? "Grado de Ingeniería"
                    : "Engineering Degree"}
                </span>
                <span className="text-emerald-400 font-semibold">
                  {isEs ? "Verificado" : "Verified"}
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
