"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import {
  UI_TRANSLATIONS,
  PROJECTS_DATA,
  EXPERIENCES_DATA,
  SKILLS_CATEGORIES,
  EDUCATION_DATA,
} from "@/data/portfolioData";

export function usePortfolio() {
  const { language, setLanguage, toggleLanguage } = useLanguage();
  const { theme, toggleTheme, setTheme, isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const t = UI_TRANSLATIONS[language];
  const allProjects = PROJECTS_DATA[language];
  const experiences = EXPERIENCES_DATA[language];
  const skillCategories = SKILLS_CATEGORIES[language];
  const education = EDUCATION_DATA[language];

  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory);

  return {
    language,
    setLanguage,
    toggleLanguage,
    theme,
    toggleTheme,
    setTheme,
    isDark,
    t,
    projects: filteredProjects,
    allProjects,
    selectedCategory,
    setSelectedCategory,
    experiences,
    skillCategories,
    education,
  };
}
