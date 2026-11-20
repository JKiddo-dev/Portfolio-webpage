import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BackendPreviewBanner from "@/components/sections/BackendPreviewBanner";
import TechRadarPreviewBanner from "@/components/sections/TechRadarPreviewBanner";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-300 transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:px-3 focus:py-2 focus:rounded-md focus:bg-emerald-500 focus:text-zinc-950 focus:font-mono focus:text-xs focus:font-semibold"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <ProjectsSection />
        <TechRadarPreviewBanner />
        <BackendPreviewBanner />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
      </main>
      <FooterSection />
    </div>
  );
}
