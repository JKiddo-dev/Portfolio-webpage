import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BackendArchitectureSection from "@/components/sections/BackendArchitectureSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative bg-zinc-950 text-zinc-100 min-h-screen flex flex-col overflow-x-hidden selection:bg-emerald-500/25 selection:text-emerald-300 transition-colors duration-300">
          <Navbar />
          <main className="flex-1">
            <HeroSection />
            <ProjectsSection />
            <BackendArchitectureSection />
            <ExperienceSection />
            <SkillsSection />
            <EducationSection />
          </main>
          <FooterSection />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
