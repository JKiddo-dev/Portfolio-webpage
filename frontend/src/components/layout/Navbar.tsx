"use client";

import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { Terminal, Menu, X, ArrowUpRight, Globe, Smartphone, Sun, Moon } from "lucide-react";
import DeviceSimulatorModal from "@/components/ui/DeviceSimulatorModal";

export default function Navbar() {
  const { t, language, toggleLanguage, theme, toggleTheme, isDark } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.architecture || (language === "es" ? "Backend & API" : "Backend & API"), href: "#backend-architecture" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.education, href: "#education" },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300">
      <nav
        className={`w-full max-w-5xl flex items-center justify-between px-5 md:px-6 py-3 rounded-2xl transition-all duration-300 ${scrolled
            ? "bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 shadow-2xl shadow-black/70"
            : "bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80"
          }`}
      >
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:border-emerald-400/80 transition-colors">
            <Terminal className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono text-xs font-black tracking-wider text-white group-hover:text-emerald-300 transition-colors">
              jkiddo-dev
            </span>
            <span className="text-[10px] font-mono text-emerald-400/90 font-medium">
              Full-Stack Software Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-emerald-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Language Switcher + Mobile Simulator + Contact CTA */}
        <div className="hidden md:flex items-center gap-2.5">

          {/* Bilingual Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer shadow-inner"
            title={language === "es" ? "Switch to English" : "Cambiar a Español"}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className={language === "es" ? "font-bold text-emerald-400" : "text-zinc-500"}>ES</span>
            <span className="text-zinc-600">/</span>
            <span className={language === "en" ? "font-bold text-emerald-400" : "text-zinc-500"}>EN</span>
          </button>

          {/* Theme Switcher Button (Light / Dark) */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer shadow-inner hover:scale-102"
            title={theme === "dark" ? (language === "es" ? "Cambiar a modo claro" : "Switch to light mode") : (language === "es" ? "Cambiar a modo oscuro" : "Switch to dark mode")}
            aria-label="Toggle color theme"
          >
            {isDark ? (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[11px] font-bold text-zinc-300">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[11px] font-bold text-zinc-700">Light</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-emerald-500 text-zinc-950 hover:bg-emerald-400 hover:scale-102 active:scale-98 transition-all shadow-md shadow-emerald-500/15"
          >
            <span>{t.nav.talk}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white"
            title="Toggle Theme"
          >
            {isDark ? <Moon className="w-4 h-4 text-amber-300" /> : <Sun className="w-4 h-4 text-amber-500" />}
          </button>

          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-mono font-bold text-emerald-400"
          >
            {language.toUpperCase()}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-800/60"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-4 right-4 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 shadow-2xl md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono text-zinc-300 hover:text-emerald-400 py-2 border-b border-zinc-900 last:border-0"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs font-mono"
          >
            {t.nav.talk}
          </a>
        </div>
      )}
      {/* Floating Action Button for Mobile Simulator (Desktop only - Eye-catching & Enhanced) */}
      <button
        onClick={() => setDeviceModalOpen(true)}
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-3 px-4 py-3 rounded-2xl bg-zinc-950/95 hover:bg-zinc-900 border-2 border-emerald-500/50 hover:border-emerald-400 text-zinc-100 hover:text-white transition-all shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.5)] hover:-translate-y-1.5 backdrop-blur-xl cursor-pointer group"
        title={language === "es" ? "Probar simulador móvil responsive interactivo" : "Test interactive responsive mobile simulator"}
        aria-label="Abrir simulador móvil"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/25 transition-all shadow-inner">
            <Smartphone className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>

        <div className="flex flex-col text-left">
          <span className="font-mono text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
            {language === "es" ? "Vista Celular" : "Mobile View"}
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
              Live
            </span>
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">
            {language === "es" ? "Probar Responsive 📱" : "Test Responsive 📱"}
          </span>
        </div>
      </button>

      {/* Responsive Device Simulator Modal */}
      <DeviceSimulatorModal
        isOpen={deviceModalOpen}
        onClose={() => setDeviceModalOpen(false)}
      />
    </header>
  );
}