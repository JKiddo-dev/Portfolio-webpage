import { Project, Experience, SkillCategory, Education, Language } from "@/types/portfolio";

export const UI_TRANSLATIONS = {
  es: {
    nav: {
      projects: "Proyectos",
      architecture: "Backend & API",
      experience: "Experiencia",
      skills: "Habilidades",
      education: "Educación",
      contact: "Contacto",
      talk: "Contacto",
    },
    hero: {
      badge: "Ingeniería en Computación • Full-Stack Software Engineer",
      role: "Ingeniero de Software Full-Stack",
      headlinePrefix: "Ingeniería de software full-stack,",
      headlineGradient: "microservicios & plataformas IoT",
      summary:
        "Ingeniero en Computación con estancia académica en España (UJI). Especializado en arquitectura de microservicios con NestJS (IBM / Banco Itaú) y desarrollo de plataformas IoT de telemetría distribuida (Parque Nacional Río Clarillo).",
      exploreBtn: "Ver Proyectos",
      contactBtn: "Contacto",
      stat1Title: "Desarrollo Full-Stack",
      stat1Desc: "TypeScript, React, Next.js & NestJS",
      stat2Title: "Microservicios en la Nube",
      stat2Desc: "BFF, Clean Architecture & Jest (Itaú)",
      stat3Title: "Sistemas IoT Distribuida",
      stat3Desc: "ESP32, Mesh LoRa & Broker MQTT",
      stat4Title: "Competencia Global & Inglés",
      stat4Desc: "Intercambio en España (UJI) & Docencia",
      consoleTab1: "TelemetryGateway.ts",
      consoleTab2: "system_metrics.log",
      copy: "Copiar",
      copied: "¡Copiado!",
    },
    projects: {
      badge: "Portafolio de Ingeniería",
      title: "Proyectos de Software & Sistemas",
      subtitle:
        "Sistemas de software desarrollados en entornos de producción, investigación aplicada y consultoría técnica.",
      all: "Todos",
      featuredBadge: "★ Proyecto Insignia (Tesis de Grado)",
      archTitle: "Decisiones Técnicas & Arquitectura:",
    },
    experience: {
      badge: "Trayectoria Profesional",
      title: "Experiencia en Ingeniería",
      subtitle:
        "Desarrollo de microservicios empresariales, ingeniería de software aplicada y docencia universitaria.",
      achievementsTitle: "Responsabilidades & Logros Técnicos:",
    },
    skills: {
      badge: "Stack Tecnológico",
      title: "Competencias Técnicas",
      subtitle:
        "Herramientas, patrones arquitectónicos y tecnologías aplicadas en el ciclo de vida del software.",
      toolsCount: "tecnologías",
    },
    education: {
      badge: "Formación Académica",
      title: "Educación & Formación Internacional",
      subtitle: "Bases sólidas en ciencias de la computación, ingeniería de software y experiencia global.",
    },
    footer: {
      badge: "Contacto Profesional",
      title: "Contacto & Conexión Profesional",
      subtitle:
        "Abierto a dialogar sobre arquitectura de software, oportunidades técnicas o profundizar en el funcionamiento de mis proyectos.",
      sendEmail: "Enviar Correo",
      copied: "¡Copiado!",
      rights: "Matías Osvaldo Aguilar Barría • Portafolio de Ingeniería de Software",
    },
  },
  en: {
    nav: {
      projects: "Projects",
      architecture: "Backend & API",
      experience: "Experience",
      skills: "Skills",
      education: "Education",
      contact: "Contact",
      talk: "Contact",
    },
    hero: {
      badge: "Computer Engineer • Full-Stack Software Engineer",
      role: "Full-Stack Software Engineer",
      headlinePrefix: "Full-Stack Software Engineering,",
      headlineGradient: "cloud microservices & IoT systems",
      summary:
        "Computer Engineer with international exchange in Spain (UJI). Specialized in cloud microservice architecture with NestJS (IBM / Itaú Bank) and end-to-end distributed IoT telemetry systems (Río Clarillo National Park).",
      exploreBtn: "View Projects",
      contactBtn: "Contact",
      stat1Title: "Full-Stack Engineering",
      stat1Desc: "TypeScript, React, Next.js & NestJS",
      stat2Title: "Cloud Microservices",
      stat2Desc: "BFF, Clean Architecture & Jest (Itaú)",
      stat3Title: "Distributed IoT Systems",
      stat3Desc: "ESP32, LoRa Mesh & MQTT Broker",
      stat4Title: "Global Fluency & English",
      stat4Desc: "Exchange in Spain (UJI) & Lecturing",
      consoleTab1: "TelemetryGateway.ts",
      consoleTab2: "system_metrics.log",
      copy: "Copy",
      copied: "Copied!",
    },
    projects: {
      badge: "Engineering Portfolio",
      title: "Software Systems & Projects",
      subtitle:
        "Software systems engineered across production environments, applied research, and technical consulting.",
      all: "All",
      featuredBadge: "★ Capstone Engineering Project (Thesis)",
      archTitle: "Technical Decisions & Architecture:",
    },
    experience: {
      badge: "Career History",
      title: "Engineering Experience",
      subtitle:
        "Enterprise microservice engineering, applied systems development, and university lecturing.",
      achievementsTitle: "Responsibilities & Technical Impact:",
    },
    skills: {
      badge: "Tech Stack",
      title: "Technical Competencies",
      subtitle:
        "Core technologies, architectural patterns, and engineering workflows throughout the software lifecycle.",
      toolsCount: "technologies",
    },
    education: {
      badge: "Academic Background",
      title: "Education & International Exchange",
      subtitle: "Solid computer science fundamentals, software engineering, and global academic experience.",
    },
    footer: {
      badge: "Professional Contact",
      title: "Contact & Technical Network",
      subtitle:
        "Open to discussing software architecture, technical opportunities, or deep-diving into any of my engineering projects.",
      sendEmail: "Send Email",
      copied: "Copied!",
      rights: "Matías Osvaldo Aguilar Barría • Software Engineering Portfolio",
    },
  },
};

export const PROJECTS_DATA: Record<Language, Project[]> = {
  es: [
    {
      id: "rio-clarillo-mesh",
      title: "Plataforma IoT LoRa Mesh - Parque Nacional Río Clarillo",
      tagline: "Proyecto de Título (Ingeniería en Computación - UTEM)",
      category: "Full-Stack",
      featured: true,
      description:
        "Plataforma web integral de extremo a extremo para supervisión y gestión de una red pública IoT Mesh LoRa desplegada en el Parque Nacional Río Clarillo. Diseñó una API REST en NestJS con integración de radios ESP32 vía MQTT, frontend reactivo en Next.js/Tailwind y base de datos en MongoDB sobre un VPS.",
      architectureHighlights: [
        "Backend en NestJS implementando Clean Architecture y comunicación asíncrona MQTT",
        "Frontend responsivo con Next.js y Tailwind CSS para visualización topológica en tiempo real",
        "Integración de hardware: Nodos de radiofrecuencia ESP32 y sensores LoRa en terreno",
        "Base de datos MongoDB y orquestación contenerizada sobre servidor VPS",
      ],
      technologies: ["NestJS", "Next.js", "MQTT", "ESP32 / LoRa", "MongoDB", "TypeScript", "Tailwind CSS", "VPS"],
      metrics: [
        { label: "Ámbito", value: "Full-Stack IoT" },
        { label: "Hardware", value: "ESP32 / LoRa" },
        { label: "Ubicación", value: "Parque Río Clarillo" },
      ],
    },
    {
      id: "fullstack-portfolio-app",
      title: "Plataforma de Portafolio Full-Stack & Arquitectura MVVM",
      tagline: "Next.js 16 • NestJS API • MVVM • Docker AWS",
      category: "Full-Stack",
      featured: false,
      description:
        "Plataforma de portafolio de ingeniería de software construida desde cero aplicando el patrón MVVM en Next.js 16 (App Router), Tailwind CSS v4, TypeScript y motor de traducción bilingüe en tiempo real. Integrada con un backend en NestJS bajo principios SOLID y Clean Code, preparada para despliegue contenerizado en VPS de AWS.",
      architectureHighlights: [
        "Arquitectura Frontend MVVM (Vistas desacopladas de ViewModels y Custom Hooks)",
        "Soporte bilingüe interactivo (Español / Inglés) con persistencia en cliente",
        "Simulador interactivo de telemetría IoT con animación de pipeline en tiempo real",
        "Backend complementario en NestJS con DTOs fuertemente tipados y separación por capas",
      ],
      technologies: ["Next.js 16", "NestJS", "TypeScript", "Tailwind CSS v4", "Docker", "AWS VPS", "MVVM Pattern"],
      metrics: [
        { label: "Arquitectura", value: "MVVM + NestJS" },
        { label: "Código", value: "Clean & SOLID" },
        { label: "UI / UX", value: "Design Eng." },
      ],
    },
    {
      id: "ibm-itau-microservices",
      title: "Microservicios en la Nube - Banco Itaú (IBM Consulting)",
      tagline: "Microservicios BFF y Calidad de Código",
      category: "Backend / Microservices",
      featured: false,
      description:
        "Construcción y mantenimiento de microservicios escalables utilizando NestJS y TypeScript para Banco Itaú en marco ágil Scrum. Colaboración estrecha con equipos de DevOps, QA y Arquitectos Cloud, implementando patrones Backend-for-Frontend (BFF) y pruebas rigurosas con Jest.",
      architectureHighlights: [
        "Patrón Backend-for-Frontend (BFF) optimizado para clientes móviles y web",
        "Alta cobertura de pruebas automatizadas unitarias y de integración con Jest",
        "Integración continua (CI/CD) y cumplimiento de estándares de seguridad bancaria",
      ],
      technologies: ["NestJS", "TypeScript", "BFF Pattern", "Jest", "Scrum", "Docker", "GitLab"],
      metrics: [
        { label: "Cliente", value: "Banco Itaú" },
        { label: "Rol", value: "IBM Consulting" },
        { label: "Testing", value: "Jest / TDD" },
      ],
    },
    {
      id: "eleam-abuelita-olga",
      title: "ELEAM Abuelita Olga - Plataforma Web",
      tagline: "Sitio web de alto rendimiento y accesibilidad",
      category: "Frontend / Web",
      featured: false,
      description:
        "Sitio web ultrarrápido, accesible y totalmente responsivo para residencia geriátrica de adultos mayores. Gestión integral de todo el ciclo de vida del proyecto, desde el diseño de interfaz UI/UX accesible hasta el despliegue optimizado en Netlify.",
      architectureHighlights: [
        "Arquitectura estática ultra veloz con Astro y Tailwind CSS",
        "Optimización de accesibilidad (WCAG) para familias y usuarios mayores",
        "Pipeline de despliegue continuo en CDN de Netlify",
      ],
      technologies: ["AstroJS", "Tailwind CSS", "TypeScript", "Netlify", "A11y"],
      metrics: [
        { label: "Performance", value: "100 Lighthouse" },
        { label: "Stack", value: "Astro + Tailwind" },
      ],
    },
    {
      id: "niwenewen-spa",
      title: "NiweNewen SPA - Portal Corporativo",
      tagline: "Presencia digital corporativa moderna",
      category: "Frontend / Web",
      featured: false,
      description:
        "Liderazgo en la creación de un sitio web corporativo de vanguardia utilizando Next.js y Tailwind CSS, potenciando significativamente la presencia digital, SEO e impacto comercial de la empresa.",
      architectureHighlights: [
        "Diseño responsivo moderno y optimización técnica de SEO",
        "Componentes reutilizables bajo principios de código limpio",
        "Renderizado híbrido optimizado con Next.js",
      ],
      technologies: ["Next.js", "Tailwind CSS", "TypeScript", "SEO"],
      metrics: [
        { label: "Impacto", value: "Alta Conversión" },
        { label: "Framework", value: "Next.js" },
      ],
    },
  ],
  en: [
    {
      id: "rio-clarillo-mesh",
      title: "IoT LoRa Mesh Platform - Río Clarillo National Park",
      tagline: "Capstone Degree Project (Computer Engineering - UTEM)",
      category: "Full-Stack",
      featured: true,
      description:
        "Engineered an end-to-end web platform for a public IoT LoRa mesh network deployed in Río Clarillo National Park. Architected a NestJS REST API integrating ESP32 radios via MQTT, and built a responsive NextJS/Tailwind frontend, managed with a MongoDB database and deployed on a VPS.",
      architectureHighlights: [
        "NestJS Backend implementing Clean Architecture and asynchronous MQTT telemetry ingestion",
        "Responsive NextJS/Tailwind frontend for real-time network topology visualization",
        "Hardware integration: ESP32 RF nodes and remote field sensors over LoRa frequencies",
        "MongoDB persistence and containerized deployment orchestrated on a Linux VPS",
      ],
      technologies: ["NestJS", "Next.js", "MQTT", "ESP32 / LoRa", "MongoDB", "TypeScript", "Tailwind CSS", "VPS"],
      metrics: [
        { label: "Scope", value: "Full-Stack IoT" },
        { label: "Hardware", value: "ESP32 / LoRa" },
        { label: "Location", value: "Río Clarillo Park" },
      ],
    },
    {
      id: "fullstack-portfolio-app",
      title: "Full-Stack Engineering Portfolio & MVVM Architecture",
      tagline: "Next.js 16 • NestJS API • MVVM • Docker AWS",
      category: "Full-Stack",
      featured: false,
      description:
        "Software engineering portfolio platform built from the ground up featuring an MVVM modular architecture with Next.js 16 (App Router), Tailwind CSS v4, TypeScript, and real-time bilingual i18n. Integrated with a companion NestJS backend REST API adhering to SOLID principles, containerized for AWS VPS deployment.",
      architectureHighlights: [
        "Frontend MVVM architecture (Views decoupled from ViewModels and Custom Hooks)",
        "Real-time bilingual internationalization (English / Spanish) with client persistence",
        "Interactive live IoT telemetry simulator with real-time packet hop pipeline",
        "Companion NestJS backend featuring typed DTOs and clean layered separation",
      ],
      technologies: ["Next.js 16", "NestJS", "TypeScript", "Tailwind CSS v4", "Docker", "AWS VPS", "MVVM Pattern"],
      metrics: [
        { label: "Architecture", value: "MVVM + NestJS" },
        { label: "Codebase", value: "Clean & SOLID" },
        { label: "UI / UX", value: "Design Eng." },
      ],
    },
    {
      id: "ibm-itau-microservices",
      title: "Cloud Microservices - Itaú Bank (IBM Consulting)",
      tagline: "BFF Microservices & Enterprise Code Quality",
      category: "Backend / Microservices",
      featured: false,
      description:
        "Built and maintained scalable microservices using NestJS and TypeScript for Itaú Bank within an Agile (Scrum) framework. Collaborated in cross-functional teams with DevOps, QA, and Cloud Architects, implementing Backend-for-Frontend (BFF) patterns and ensuring high code quality through Jest testing.",
      architectureHighlights: [
        "Backend-for-Frontend (BFF) pattern tailored for mobile and web banking clients",
        "Comprehensive unit and integration test coverage using Jest",
        "Continuous integration (CI/CD) and compliance with enterprise banking security standards",
      ],
      technologies: ["NestJS", "TypeScript", "BFF Pattern", "Jest", "Scrum", "Docker", "GitLab"],
      metrics: [
        { label: "Client", value: "Itaú Bank" },
        { label: "Role", value: "IBM Consulting" },
        { label: "Testing", value: "Jest / TDD" },
      ],
    },
    {
      id: "eleam-abuelita-olga",
      title: "ELEAM Abuelita Olga - Nursing Home Web Platform",
      tagline: "High-Performance Accessible Website",
      category: "Frontend / Web",
      featured: false,
      description:
        "Delivered a fast, accessible, and fully responsive website for a nursing home using Astro and TailwindCSS, managing the complete project lifecycle from UX/UI design to production deployment on Netlify.",
      architectureHighlights: [
        "Ultra-fast static island architecture powered by Astro and Tailwind CSS",
        "Accessibility optimization (WCAG) designed for elderly users and families",
        "Automated CI/CD pipeline deployed to Netlify edge network",
      ],
      technologies: ["AstroJS", "Tailwind CSS", "TypeScript", "Netlify", "A11y"],
      metrics: [
        { label: "Performance", value: "100 Lighthouse" },
        { label: "Stack", value: "Astro + Tailwind" },
      ],
    },
    {
      id: "niwenewen-spa",
      title: "NiweNewen SPA - Corporate Website",
      tagline: "Modern Corporate Digital Footprint",
      category: "Frontend / Web",
      featured: false,
      description:
        "Engineered the corporate website using Next.js and Tailwind CSS, focusing on loading performance, component-driven architecture, and technical SEO optimization.",
      architectureHighlights: [
        "Modern responsive design and comprehensive technical SEO strategy",
        "Clean, reusable modular component architecture",
        "Optimized hybrid rendering via Next.js App Router",
      ],
      technologies: ["Next.js", "Tailwind CSS", "TypeScript", "SEO"],
      metrics: [
        { label: "Impact", value: "High Conversion" },
        { label: "Framework", value: "Next.js" },
      ],
    },
  ],
};

export const EXPERIENCES_DATA: Record<Language, Experience[]> = {
  es: [
    {
      id: "thesis-exp",
      period: "Agosto 2025 - Presente",
      role: "Desarrollador Full-Stack (Proyecto de Título)",
      organization: "Parque Nacional Río Clarillo / UTEM",
      location: "Santiago, Chile",
      description:
        "Desarrollo integral de plataforma web para red pública IoT Mesh LoRa en el Parque Nacional Río Clarillo.",
      achievements: [
        "Diseño e implementación de API REST en NestJS con integración de radios ESP32 vía protocolo MQTT.",
        "Construcción de frontend responsivo en NextJS y Tailwind CSS con visualización de estado en tiempo real.",
        "Modelado de datos en MongoDB y despliegue autónomo sobre servidor VPS.",
      ],
      techStack: ["NestJS", "Next.js", "MQTT", "ESP32", "LoRa", "MongoDB", "Tailwind CSS", "VPS"],
    },
    {
      id: "ibm-exp",
      period: "Febrero 2025 – Agosto 2025",
      role: "Full-Stack / Backend Engineer (IBM Consulting)",
      organization: "IBM Consulting - Proyecto Banco Itaú",
      location: "Santiago, Chile",
      description:
        "Construcción y mantenimiento de microservicios escalables con NestJS y TypeScript para Banco Itaú en marco Scrum.",
      achievements: [
        "Implementación de patrones Backend-for-Frontend (BFF) para optimizar el consumo de APIs bancarias.",
        "Colaboración activa en equipos multidisciplinarios con DevOps, QA y Arquitectos Cloud.",
        "Garantía de alta calidad de software y cobertura mediante pruebas automatizadas con Jest.",
      ],
      techStack: ["NestJS", "TypeScript", "Microservicios", "Jest", "Scrum", "GitLab", "Docker"],
    },
    {
      id: "eleam-exp",
      period: "Mayo 2025 - Junio 2025",
      role: "Desarrollador Frontend / Web",
      organization: "ELEAM Abuelita Olga",
      location: "Santiago, Chile",
      description:
        "Entrega de sitio web rápido, accesible y responsivo para residencia geriátrica, gestionando desde el diseño hasta el despliegue.",
      achievements: [
        "Desarrollo con Astro y Tailwind CSS asegurando puntaje de 100 en Core Web Vitals.",
        "Gestión del ciclo completo de vida del proyecto y despliegue productivo en Netlify.",
      ],
      techStack: ["AstroJS", "Tailwind CSS", "TypeScript", "Netlify"],
    },
    {
      id: "niwenewen-exp",
      period: "Marzo 2024 - Junio 2024",
      role: "Desarrollador Web",
      organization: "NiweNewen SPA",
      location: "Santiago, Chile",
      description:
        "Liderazgo en la creación de sitio web corporativo moderno para potenciar la huella digital de la empresa.",
      achievements: [
        "Implementación en NextJS y Tailwind CSS con arquitectura modular y optimización SEO.",
        "Optimización de Core Web Vitals, velocidad de carga y posicionamiento orgánico en motores de búsqueda.",
      ],
      techStack: ["Next.js", "Tailwind CSS", "TypeScript", "SEO"],
    },
    {
      id: "teaching-exp",
      period: "2026 - Presente",
      role: "Ayudante Universitario - Algoritmos y Programación",
      organization: "Universidad Tecnológica Metropolitana (UTEM)",
      location: "Santiago, Chile",
      description:
        "Tutoría a estudiantes de ingeniería en fundamentos de computación, desarrollo en C++, estructuras de datos y resolución de problemas complejos.",
      achievements: [
        "Guía pedagógica en programación eficiente, análisis de algoritmos y optimización de memoria.",
      ],
      techStack: ["C++", "Estructuras de Datos", "Algoritmos", "Mentoría"],
    },
    {
      id: "english-exp",
      period: "Julio 2023 - Presente",
      role: "Tutor de Inglés Avanzado",
      organization: "Clases Particulares para Universitarios",
      location: "Santiago, Chile",
      description:
        "Entrenamiento en habilidades de comunicación y fluidez en inglés avanzado para estudiantes y profesionales universitarios.",
      achievements: [
        "Preparación técnica y conversacional en inglés nivel C1/avanzado.",
      ],
      techStack: ["English C1/Advanced", "Technical Communication", "Coaching"],
    },
  ],
  en: [
    {
      id: "thesis-exp",
      period: "August 2025 - Present",
      role: "Full-Stack Engineer (Thesis Project)",
      organization: "Río Clarillo National Park / UTEM",
      location: "Santiago, Chile",
      description:
        "Engineered an end-to-end web platform for a public IoT LoRa mesh network deployed in Río Clarillo National Park.",
      achievements: [
        "Architected a NestJS REST API integrating ESP32 radios via MQTT protocol.",
        "Built a responsive NextJS and Tailwind frontend providing real-time telemetry and network visibility.",
        "Implemented MongoDB database and autonomous deployment orchestrated on a Linux VPS.",
      ],
      techStack: ["NestJS", "Next.js", "MQTT", "ESP32", "LoRa", "MongoDB", "Tailwind CSS", "VPS"],
    },
    {
      id: "ibm-exp",
      period: "February 2025 – August 2025",
      role: "Full-Stack / Backend Engineer (IBM Consulting)",
      organization: "IBM Consulting - Itaú Bank Project",
      location: "Santiago, Chile",
      description:
        "Built and maintained scalable microservices using NestJS and TypeScript for Itaú Bank within an Agile (Scrum) framework.",
      achievements: [
        "Implemented Backend-for-Frontend (BFF) patterns to optimize banking API delivery across web and mobile clients.",
        "Collaborated in cross-functional squads with DevOps, QA, and Cloud Architects.",
        "Enforced rigorous code quality and high test coverage through automated Jest testing.",
      ],
      techStack: ["NestJS", "TypeScript", "Microservices", "Jest", "Scrum", "GitLab", "Docker"],
    },
    {
      id: "eleam-exp",
      period: "May 2025 - June 2025",
      role: "Frontend / Web Developer",
      organization: "ELEAM Abuelita Olga",
      location: "Santiago, Chile",
      description:
        "Delivered a fast, accessible, and fully responsive website for a nursing home, overseeing design through deployment.",
      achievements: [
        "Developed with Astro and Tailwind CSS delivering perfect 100 Core Web Vitals.",
        "Managed end-to-end project lifecycle with zero-downtime deployment on Netlify.",
      ],
      techStack: ["AstroJS", "Tailwind CSS", "TypeScript", "Netlify"],
    },
    {
      id: "niwenewen-exp",
      period: "March 2024 - June 2024",
      role: "Web Developer",
      organization: "NiweNewen SPA",
      location: "Santiago, Chile",
      description:
        "Spearheaded the creation of a modern corporate website to significantly enhance company digital reach.",
      achievements: [
        "Engineered with NextJS and Tailwind CSS adhering to modular clean code and SEO best practices.",
        "Substantially boosted company online footprint and customer acquisition.",
      ],
      techStack: ["Next.js", "Tailwind CSS", "TypeScript", "SEO"],
    },
    {
      id: "teaching-exp",
      period: "2026 - Present",
      role: "Teaching Assistant - Algorithms & Programming",
      organization: "Universidad Tecnológica Metropolitana (UTEM)",
      location: "Santiago, Chile",
      description:
        "Mentored university engineering students in computer science foundations, C++ development, and data structures.",
      achievements: [
        "Coached students in algorithmic thinking, data structures, and memory-efficient software design.",
      ],
      techStack: ["C++", "Data Structures", "Algorithms", "Mentorship"],
    },
    {
      id: "english-exp",
      period: "July 2023 - Present",
      role: "Advanced English Tutor",
      organization: "Private Coaching for University Students",
      location: "Santiago, Chile",
      description:
        "Provided advanced English communication coaching and technical fluency training for university students.",
      achievements: [
        "Delivered C1/advanced technical communication and professional English readiness.",
      ],
      techStack: ["English C1/Advanced", "Technical Communication", "Coaching"],
    },
  ],
};

export const SKILLS_CATEGORIES: Record<Language, SkillCategory[]> = {
  es: [
    {
      title: "Frontend Engineering",
      skills: [
        { name: "React", level: "Avanzado" },
        { name: "Next.js (App Router)", level: "Avanzado" },
        { name: "Angular", level: "Competente" },
        { name: "TypeScript / JS", level: "Avanzado" },
        { name: "Tailwind CSS", level: "Avanzado" },
        { name: "AstroJS", level: "Avanzado" },
      ],
    },
    {
      title: "Backend & Microservicios",
      skills: [
        { name: "NestJS", level: "Especializado" },
        { name: "TypeScript", level: "Avanzado" },
        { name: "Patrones BFF & Clean Arch", level: "Avanzado" },
        { name: "MQTT (ESP32 / IoT)", level: "Avanzado" },
        { name: "Python (Keras, TensorFlow)", level: "Intermedio" },
        { name: "REST APIs & WebSockets", level: "Avanzado" },
      ],
    },
    {
      title: "Bases de Datos & Cloud",
      skills: [
        { name: "MongoDB", level: "Avanzado" },
        { name: "MySQL", level: "Avanzado" },
        { name: "Docker & Linux", level: "Avanzado" },
        { name: "VPS Deployment", level: "Avanzado" },
        { name: "Jest / Vitest", level: "Avanzado" },
      ],
    },
    {
      title: "Extras & Gestión",
      skills: [
        { name: "Agile / Scrum (IBM)", level: "Avanzado" },
        { name: "GitHub & GitLab", level: "Avanzado" },
        { name: "Inglés Avanzado (C1/C2)", level: "Fluido" },
        { name: "Intercambio en España (UJI)", level: "2025 - 2026" },
      ],
    },
  ],
  en: [
    {
      title: "Frontend Engineering",
      skills: [
        { name: "React", level: "Advanced" },
        { name: "Next.js (App Router)", level: "Advanced" },
        { name: "Angular", level: "Proficient" },
        { name: "TypeScript / JS", level: "Advanced" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "AstroJS", level: "Advanced" },
      ],
    },
    {
      title: "Backend & Microservices",
      skills: [
        { name: "NestJS", level: "Specialized" },
        { name: "TypeScript", level: "Advanced" },
        { name: "BFF & Clean Architecture", level: "Advanced" },
        { name: "MQTT (ESP32 / IoT)", level: "Advanced" },
        { name: "Python (Keras, TensorFlow)", level: "Intermediate" },
        { name: "REST APIs & WebSockets", level: "Advanced" },
      ],
    },
    {
      title: "Databases & Cloud",
      skills: [
        { name: "MongoDB", level: "Advanced" },
        { name: "MySQL", level: "Advanced" },
        { name: "Docker & Linux", level: "Advanced" },
        { name: "VPS Deployment", level: "Advanced" },
        { name: "Jest / Vitest", level: "Advanced" },
      ],
    },
    {
      title: "Extras & Management",
      skills: [
        { name: "Agile / Scrum (IBM)", level: "Advanced" },
        { name: "GitHub & GitLab", level: "Advanced" },
        { name: "English - Advanced (C1/C2)", level: "Fluent" },
        { name: "Spain Exchange Program (UJI)", level: "2025 - 2026" },
      ],
    },
  ],
};

export const EDUCATION_DATA: Record<Language, Education[]> = {
  es: [
    {
      degree: "Ingeniería Civil en Computación mención Informática",
      institution: "Universidad Tecnológica Metropolitana (UTEM)",
      period: "Marzo 2020 - 2026",
      location: "Santiago, Chile",
      details: "Formación de excelencia en algoritmos, sistemas distribuidos, microservicios y proyectos de ingeniería.",
    },
    {
      degree: "Programa de Intercambio en Ingeniería de Software",
      institution: "Universitat Jaume I (UJI)",
      period: "Septiembre 2025 - Enero 2026",
      location: "Castellón de la Plana, España",
      details: "Especialización internacional en arquitectura de software, metodologías ágiles y estándares europeos.",
    },
  ],
  en: [
    {
      degree: "Computer Engineering (Degree in Computing & Informatics)",
      institution: "Universidad Tecnológica Metropolitana (UTEM)",
      period: "March 2020 - 2026",
      location: "Santiago, Chile",
      details: "Rigorous training in algorithms, distributed systems, enterprise microservices, and software engineering.",
    },
    {
      degree: "Software Engineering Exchange Program",
      institution: "Universitat Jaume I (UJI)",
      period: "September 2025 - January 2026",
      location: "Castellón de la Plana, Spain",
      details: "International academic exchange focusing on advanced software architecture and global engineering practices.",
    },
  ],
};