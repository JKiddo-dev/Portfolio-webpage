"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePortfolio } from "@/hooks/usePortfolio";
import {
  Terminal,
  Menu,
  X,
  ArrowUpRight,
  Globe,
  Smartphone,
  Sun,
  Moon,
} from "lucide-react";
import DeviceSimulatorModal from "@/components/ui/DeviceSimulatorModal";

export default function Navbar() {
  const { t, language, toggleLanguage, theme, toggleTheme, isDark } = usePortfolio();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);

  const isEs = language === "es";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      if (pathname === "/") {
        const sections = [
          "hero",
          "projects",
          "tech-radar-preview",
          "backend-preview",
          "experience",
          "skills",
          "education",
          "contact",
        ];
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
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    {
      name: isEs ? "Inicio" : "Home",
      href: "/",
      isRoute: true,
      active: pathname === "/" && activeSection === "hero",
    },
    {
      name: t.nav.projects,
      href: pathname === "/" ? "#projects" : "/#projects",
      isRoute: pathname !== "/",
      active: pathname === "/" && activeSection === "projects",
    },
    {
      name: isEs ? "Backend & APIs" : "Backend & APIs",
      href: "/backend-apis",
      isRoute: true,
      badge: "Itaú BFF",
      active: pathname === "/backend-apis",
    },
    {
      name: "Tech Radar",
      href: "/labs/tech-radar",
      isRoute: true,
      badge: "AI + ETL",
      active:
        pathname === "/labs/tech-radar" ||
        (pathname === "/" && activeSection === "tech-radar-preview"),
    },
    {
      name: t.nav.experience,
      href: pathname === "/" ? "#experience" : "/#experience",
      isRoute: pathname !== "/",
      active: pathname === "/" && activeSection === "experience",
    },
    {
      name: t.nav.skills,
      href: pathname === "/" ? "#skills" : "/#skills",
      isRoute: pathname !== "/",
      active: pathname === "/" && activeSection === "skills",
    },
    {
      name: t.nav.contact,
      href: "/contacto",
      isRoute: true,
      active: pathname === "/contacto",
    },
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none ${
          isDark ? "bg-zinc-900/50" : "bg-slate-200/80"
        }`}
      >
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 shadow-[0_0_10px_#10b981] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pt-3 sm:pt-5 pointer-events-none transition-all duration-300">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 rounded-2xl border transition-all duration-300 backdrop-blur-xl max-w-6xl w-full ${
            isDark
              ? scrolled
                ? "bg-zinc-950/90 border-zinc-800 shadow-2xl shadow-black/50"
                : "bg-zinc-950/70 border-zinc-800/80 shadow-lg"
              : scrolled
                ? "bg-white/95 border-slate-200 shadow-xl shadow-slate-900/5"
                : "bg-white/85 border-slate-200/90 shadow-md shadow-slate-900/5"
          }`}
        >
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div
              className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? "bg-zinc-900 border-zinc-700 group-hover:border-emerald-400/80"
                  : "bg-slate-100 border-slate-300 group-hover:border-emerald-500"
              }`}
            >
              <Terminal
                className={`w-4 h-4 group-hover:scale-110 transition-transform ${
                  isDark ? "text-emerald-400" : "text-emerald-600"
                }`}
              />
            </div>
            <div className="flex flex-col text-left">
              <span
                className={`font-mono text-xs font-black tracking-wider transition-colors ${
                  isDark
                    ? "text-white group-hover:text-emerald-300"
                    : "text-slate-900 group-hover:text-emerald-700"
                }`}
              >
                jkiddo-dev
              </span>
              <span
                className={`text-[10px] font-mono font-medium hidden min-[400px]:inline ${
                  isDark ? "text-emerald-400/90" : "text-emerald-700"
                }`}
              >
                Full-Stack Software Engineer
              </span>
            </div>
          </Link>

          <div
            className={`hidden xl:flex items-center gap-0.5 p-1 rounded-xl border ${
              isDark
                ? "bg-zinc-950/50 border-zinc-800/60"
                : "bg-slate-100/80 border-slate-200/80"
            }`}
          >
            {navLinks.map((link) => {
              const linkContent = (
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <span>{link.name}</span>
                  {link.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold border ${
                        isDark
                          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                          : "bg-emerald-500/15 text-emerald-800 border-emerald-600/30"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                  {link.active && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-500 rounded-full shadow-[0_0_6px_#10b981]" />
                  )}
                </span>
              );

              const className = `relative px-2.5 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all duration-200 ${
                link.active
                  ? isDark
                    ? "text-emerald-300 font-bold bg-zinc-800/90 shadow-xs"
                    : "text-emerald-800 font-bold bg-white shadow-xs"
                  : isDark
                    ? "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    : "text-slate-600 hover:text-slate-950 hover:bg-white/60"
              }`;

              return link.isRoute ? (
                <Link key={link.name} href={link.href} className={className}>
                  {linkContent}
                </Link>
              ) : (
                <a key={link.name} href={link.href} className={className}>
                  {linkContent}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setDeviceModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer hover:scale-102 active:scale-98 ${
                isDark
                  ? "bg-zinc-900/90 border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white"
                  : "bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-950"
              }`}
              title={isEs ? "Abrir Simulador Móvil" : "Open Mobile Simulator"}
              aria-label="Open Device Simulator"
            >
              <Smartphone
                className={`w-3.5 h-3.5 ${
                  isDark ? "text-cyan-400" : "text-cyan-700"
                }`}
              />
              <span className="hidden lg:inline text-[11px] font-semibold">
                Preview
              </span>
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer hover:scale-102 active:scale-98 ${
                isDark
                  ? "bg-zinc-900/90 border-zinc-800 hover:border-zinc-700 text-zinc-200"
                  : "bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-700"
              }`}
              title={isEs ? "Switch to English" : "Cambiar a Español"}
              aria-label="Toggle language"
            >
              <Globe
                className={`w-3.5 h-3.5 ${
                  isDark ? "text-emerald-400" : "text-emerald-700"
                }`}
              />
              <span
                className={
                  language === "es"
                    ? isDark
                      ? "font-bold text-emerald-400"
                      : "font-bold text-emerald-700"
                    : isDark
                      ? "text-zinc-500"
                      : "text-slate-400"
                }
              >
                ES
              </span>
              <span className={isDark ? "text-zinc-600" : "text-slate-300"}>
                /
              </span>
              <span
                className={
                  language === "en"
                    ? isDark
                      ? "font-bold text-emerald-400"
                      : "font-bold text-emerald-700"
                    : isDark
                      ? "text-zinc-500"
                      : "text-slate-400"
                }
              >
                EN
              </span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer hover:scale-102 active:scale-98 ${
                isDark
                  ? "bg-zinc-900/90 border-zinc-800 hover:border-zinc-700 text-zinc-200"
                  : "bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-800"
              }`}
              title={
                theme === "dark"
                  ? isEs
                    ? "Cambiar a modo claro"
                    : "Switch to light mode"
                  : isEs
                    ? "Cambiar a modo oscuro"
                    : "Switch to dark mode"
              }
              aria-label="Toggle color theme"
            >
              {isDark ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[11px] font-bold">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-[11px] font-bold">Light</span>
                </>
              )}
            </button>

            <Link
              href="/contacto"
              className="group relative flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 hover:brightness-105 hover:scale-102 active:scale-98 transition-all shadow-md shadow-emerald-500/20"
            >
              <span>{t.nav.talk}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden p-2 rounded-xl border transition-colors ${
                isDark
                  ? "bg-zinc-900 border-zinc-800 text-zinc-200 hover:text-white"
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-950"
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-emerald-500" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-1.5 md:hidden">
            <button
              type="button"
              onClick={() => setDeviceModalOpen(true)}
              className={`p-1.5 rounded-lg border ${
                isDark
                  ? "bg-zinc-900 border-zinc-800 text-zinc-200"
                  : "bg-slate-100 border-slate-200 text-slate-700"
              }`}
              title="Simulator"
              aria-label="Open Device Simulator"
            >
              <Smartphone
                className={`w-4 h-4 ${
                  isDark ? "text-cyan-400" : "text-cyan-700"
                }`}
              />
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className={`p-1.5 rounded-lg border ${
                isDark
                  ? "bg-zinc-900 border-zinc-800 text-zinc-200"
                  : "bg-slate-100 border-slate-200 text-slate-700"
              }`}
              title="Toggle Theme"
              aria-label="Toggle color theme"
            >
              {isDark ? (
                <Moon className="w-4 h-4 text-amber-300" />
              ) : (
                <Sun className="w-4 h-4 text-amber-600" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-xl border ${
                isDark
                  ? "bg-zinc-900 border-zinc-800 text-zinc-200"
                  : "bg-slate-100 border-slate-200 text-slate-700"
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-emerald-500" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div
            className={`xl:hidden pointer-events-auto absolute top-16 left-3 right-3 sm:left-4 sm:right-4 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl border flex flex-col gap-2.5 max-w-6xl mx-auto ${
              isDark
                ? "bg-zinc-950/95 border-zinc-800 text-zinc-100"
                : "bg-white/95 border-slate-200 text-slate-900"
            }`}
          >
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs sm:text-sm font-mono uppercase tracking-wider py-2 border-b flex items-center justify-between ${
                    isDark ? "border-zinc-900" : "border-slate-100"
                  } ${
                    link.active
                      ? isDark
                        ? "text-emerald-400 font-bold"
                        : "text-emerald-700 font-bold"
                      : isDark
                        ? "text-zinc-300 hover:text-emerald-400"
                        : "text-slate-700 hover:text-emerald-700"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                        isDark
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-emerald-500/10 text-emerald-800 border-emerald-600/25"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs sm:text-sm font-mono uppercase tracking-wider py-2 border-b ${
                    isDark ? "border-zinc-900" : "border-slate-100"
                  } ${
                    link.active
                      ? isDark
                        ? "text-emerald-400 font-bold"
                        : "text-emerald-700 font-bold"
                      : isDark
                        ? "text-zinc-300 hover:text-emerald-400"
                        : "text-slate-700 hover:text-emerald-700"
                  }`}
                >
                  {link.name}
                </a>
              )
            )}

            <div className="flex items-center justify-between gap-2 pt-2 flex-wrap">
              <button
                type="button"
                onClick={toggleLanguage}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono ${
                  isDark
                    ? "bg-zinc-900 border-zinc-800 text-zinc-200"
                    : "bg-slate-100 border-slate-200 text-slate-800"
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-500" />
                <span>{language === "es" ? "Español (ES)" : "English (EN)"}</span>
              </button>

              <Link
                href="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-xs font-mono font-bold rounded-lg bg-emerald-500 text-zinc-950"
              >
                {t.nav.talk}
              </Link>
            </div>
          </div>
        )}
      </header>

      <DeviceSimulatorModal
        isOpen={deviceModalOpen}
        onClose={() => setDeviceModalOpen(false)}
      />
    </>
  );
}
