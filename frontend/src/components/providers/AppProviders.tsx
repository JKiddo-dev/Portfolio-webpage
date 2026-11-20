"use client";

import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import LiquidGlassBackdrop from "@/components/ui/LiquidGlassBackdrop";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LiquidGlassBackdrop />
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
