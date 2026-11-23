export type Language = "es" | "en";

export interface ProjectCaseStudy {
  flowSteps: { label: string; detail: string }[];
  tradeOff: {
    problem: string;
    decision: string;
    alternativeRejected: string;
  };
  securityAndQuality: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "Full-Stack" | "Backend / Microservices" | "Frontend / Web";
  featured?: boolean;
  description: string;
  architectureHighlights: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
  caseStudy?: ProjectCaseStudy;
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: string; context?: string }[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
}
