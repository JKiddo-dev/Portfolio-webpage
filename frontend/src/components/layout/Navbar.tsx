"use client";

import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { Terminal, Menu, X, ArrowUpRight, Globe, Smartphone, Sun, Moon } from "lucide-react";
import DeviceSimulatorModal from "@/components/ui/DeviceSimulatorModal";

export default function Navbar() {
  const { t, language, toggleLanguage, theme, toggleTheme, isDark } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Calculate total reading scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Detect active section
      const sections = ["hero", "projects", "backend-architecture", "experience", "skills", "education", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.projects, href: "#projects", id: "projects" },
    { name: t.nav.architecture || (language === "es" ? "Backend & API" : "Backend & API"), href: "#backend-architecture", id: "backend-architecture" },
    { name: t.nav.experience, href: "#experience", id: "experience" },
    { name: t.nav.skills, href: "#skills", id: "skills" },
    { name: t.nav.education, href: "#education", id: "education" },
  ];

  return (
    <>
      {/* Ultra-Fine Reading Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-zinc-900/50">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-300 via-cyan-400 to-blue-500 shadow-[0_0_10px_#10b981] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300">
        <nav
          className={`w-full max-w-5xl flex items-center justify-between px-5 md:px-6 py-2.5 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/90 shadow-2xl shadow-black/80 scale-[0.99]"
              : "bg-zinc-900/70 backdrop-blur-md border border-zinc-800/80 shadow-lg"
          }`}
        >
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-800/90 border border-zinc-700 flex items-center justify-center group-hover:border-emerald-400/80 group-hover:bg-zinc-800 transition-all duration-300">
              <Terminal className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
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

          {/* Desktop Navigation Links with Active Sliding Pill */}
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950/40 border border-zinc-800/50">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-emerald-300 font-bold bg-zinc-800/90 shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_6px_#10b981]" />
                  )}
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action Controls: Lang + Theme + CTA */}
          <div className="hidden md:flex items-center gap-2">
            
            {/* Bilingual Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer shadow-inner hover:scale-105 active:scale-95"
              title={language === "es" ? "Switch to English" : "Cambiar a Español"}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className={language === "es" ? "font-bold text-emerald-400" : "text-zinc-500"}>ES</span>
              <span className="text-zinc-600">/</span>
              <span className={language === "en" ? "font-bold text-emerald-400" : "text-zinc-500"}>EN</span>
            </button>

            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer shadow-inner hover:scale-105 active:scale-95"
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

            {/* Contact CTA */}
            <a
              href="#contact"
              className="group relative flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 hover:brightness-110 hover:scale-102 active:scale-98 transition-all shadow-md shadow-emerald-500/20"
            >
              <span>{t.nav.talk}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white"
              title="Toggle Theme"
            >
              {isDark ? <Moon className="w-4 h-4 text-amber-300" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-4 right-4 bg-zinc-950/95 border border-zinc-800 rounded-2xl p-5 shadow-2xl backdrop-blur-2xl flex flex-col gap-3 animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono uppercase tracking-wider text-zinc-300 hover:text-emerald-400 py-2 border-b border-zinc-900"
              >
                {link.name}
              </a>
            ))}

            <div className="flex items-center justify-between pt-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === "es" ? "Español (ES)" : "English (EN)"}</span>
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-xs font-mono font-bold rounded-lg bg-emerald-500 text-zinc-950"
              >
                {t.nav.talk}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Device Simulator Modal */}
      {deviceModalOpen && (
        <DeviceSimulatorModal onClose={() => setDeviceModalOpen(false)} />
      )}
    </>
  );
}
