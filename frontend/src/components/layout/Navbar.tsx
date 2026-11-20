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
  const { t, language, toggleLanguage, theme, toggleTheme, isDark } =
    usePortfolio();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);

  const isEs = language === "es";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

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
      name: "Backend",
      href: "/backend-apis",
      isRoute: true,
      badge: "BFF",
      active: pathname === "/backend-apis",
    },
    {
      name: "Tech Radar",
      href: "/labs/tech-radar",
      isRoute: true,
      badge: "ETL",
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
  ];

  const controlButtonClass = isDark
    ? "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-zinc-50"
    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:text-zinc-950";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200 ${
          isDark
            ? scrolled
              ? "bg-zinc-950/95 border-zinc-800 backdrop-blur-md"
              : "bg-zinc-950/85 border-zinc-800/70 backdrop-blur-sm"
            : scrolled
              ? "bg-[#fafaf9]/95 border-zinc-200 backdrop-blur-md"
              : "bg-[#fafaf9]/90 border-zinc-200/80 backdrop-blur-sm"
        }`}
      >
        <nav
          aria-label={isEs ? "Navegación principal" : "Primary navigation"}
          className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4"
        >
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
          >
            <span
              className={`w-8 h-8 rounded-md border flex items-center justify-center transition-colors duration-150 ${
                isDark
                  ? "bg-zinc-900 border-zinc-800 group-hover:border-emerald-500/60"
                  : "bg-white border-zinc-200 group-hover:border-emerald-700/60"
              }`}
            >
              <Terminal
                className={`w-4 h-4 ${
                  isDark ? "text-emerald-400" : "text-emerald-700"
                }`}
              />
            </span>
            <span className="flex flex-col text-left leading-tight">
              <span
                className={`font-mono text-sm font-semibold tracking-tight transition-colors ${
                  isDark
                    ? "text-zinc-100 group-hover:text-white"
                    : "text-zinc-950 group-hover:text-emerald-800"
                }`}
              >
                jkiddo-dev
              </span>
              <span
                className={`text-[10px] font-mono hidden sm:inline ${
                  isDark ? "text-zinc-500" : "text-zinc-500"
                }`}
              >
                Full-Stack Systems
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const linkContent = (
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <span>{link.name}</span>
                  {link.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.25 rounded-md font-mono font-medium border ${
                        isDark
                          ? "bg-zinc-900 text-zinc-400 border-zinc-800"
                          : "bg-zinc-100 text-zinc-600 border-zinc-200"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </span>
              );

              const linkClass = `relative px-2.5 py-1.5 rounded-md text-xs font-mono transition-colors duration-150 ${
                link.active
                  ? isDark
                    ? "text-emerald-400 font-semibold"
                    : "text-emerald-700 font-semibold"
                  : isDark
                    ? "text-zinc-400 hover:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-950"
              }`;

              const activeBar = link.active ? (
                <span
                  aria-hidden="true"
                  className={`absolute left-2.5 right-2.5 -bottom-[17px] h-[2px] ${
                    isDark ? "bg-emerald-500" : "bg-emerald-700"
                  }`}
                />
              ) : null;

              return link.isRoute ? (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  className={linkClass}
                >
                  {linkContent}
                  {activeBar}
                </Link>
              ) : (
                <a key={link.name} href={link.href} className={linkClass}>
                  {linkContent}
                  {activeBar}
                </a>
              );
            })}
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setDeviceModalOpen(true)}
              className={`h-9 w-9 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${controlButtonClass}`}
              title={isEs ? "Abrir Simulador Móvil" : "Open Mobile Simulator"}
              aria-label={
                isEs ? "Abrir Simulador Móvil" : "Open Device Simulator"
              }
            >
              <Smartphone className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              className={`h-9 px-2.5 rounded-md border flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer ${controlButtonClass}`}
              title={isEs ? "Switch to English" : "Cambiar a Español"}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 opacity-75" />
              <span
                className={
                  language === "es"
                    ? isDark
                      ? "font-semibold text-emerald-400"
                      : "font-semibold text-emerald-700"
                    : "opacity-50"
                }
              >
                ES
              </span>
              <span className="opacity-35">/</span>
              <span
                className={
                  language === "en"
                    ? isDark
                      ? "font-semibold text-emerald-400"
                      : "font-semibold text-emerald-700"
                    : "opacity-50"
                }
              >
                EN
              </span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className={`h-9 w-9 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${controlButtonClass}`}
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
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            <Link
              href="/contacto"
              className="btn-primary h-9 px-3.5 text-xs font-mono shrink-0"
            >
              <span>{t.nav.talk}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden h-9 w-9 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${controlButtonClass}`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              type="button"
              onClick={() => setDeviceModalOpen(true)}
              className={`h-10 w-10 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${controlButtonClass}`}
              title={isEs ? "Simulador Móvil" : "Device Simulator"}
              aria-label="Open Device Simulator"
            >
              <Smartphone className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className={`h-10 w-10 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${controlButtonClass}`}
              title={isEs ? "Cambiar tema" : "Toggle Theme"}
              aria-label="Toggle color theme"
            >
              {isDark ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`h-10 w-10 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${controlButtonClass}`}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Crisp 1px scroll progress bar */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
        >
          <div
            className={`h-full transition-[width] duration-150 ${
              isDark ? "bg-emerald-500" : "bg-emerald-700"
            }`}
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Mobile / Tablet Dropdown */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden border-t ${
              isDark
                ? "bg-zinc-950 border-zinc-800 text-zinc-100"
                : "bg-[#fafaf9] border-zinc-200 text-zinc-950"
            }`}
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-6 py-4 flex flex-col">
              {navLinks.map((link) => {
                const rowClass = `py-3 border-b flex items-center justify-between text-xs font-mono uppercase tracking-wider transition-colors ${
                  isDark ? "border-zinc-800/80" : "border-zinc-200"
                } ${
                  link.active
                    ? isDark
                      ? "text-emerald-400 font-semibold"
                      : "text-emerald-700 font-semibold"
                    : isDark
                      ? "text-zinc-300 hover:text-white"
                      : "text-zinc-700 hover:text-zinc-950"
                }`;

                return link.isRoute ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={rowClass}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono border ${
                          isDark
                            ? "bg-zinc-900 text-zinc-400 border-zinc-800"
                            : "bg-white text-zinc-600 border-zinc-200"
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
                    className={rowClass}
                  >
                    <span>{link.name}</span>
                  </a>
                );
              })}

              <div className="flex items-center justify-between gap-3 pt-4 flex-wrap">
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className={`h-10 px-3 rounded-md border flex items-center gap-2 text-xs font-mono cursor-pointer ${controlButtonClass}`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>
                    {language === "es" ? "Español (ES)" : "English (EN)"}
                  </span>
                </button>

                <Link
                  href="/contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary h-10 px-4 text-xs font-mono"
                >
                  <span>{t.nav.talk}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
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
