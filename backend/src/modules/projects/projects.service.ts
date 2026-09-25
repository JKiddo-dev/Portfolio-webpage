import { Injectable, NotFoundException } from "@nestjs/common";
import { ProjectQueryDto } from "./dto/project-query.dto";

export interface ProjectEntity {
  id: string;
  title: string;
  tagline: string;
  category: string;
  featured: boolean;
  description: string;
  architectureHighlights: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
}

@Injectable()
export class ProjectsService {
  private readonly projectsData: Record<"es" | "en", ProjectEntity[]> = {
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
          "Spearheaded the creation of a modern corporate website using NextJS and TailwindCSS, significantly enhancing the company’s digital footprint, search visibility, and commercial presence.",
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

  findAll(query: ProjectQueryDto) {
    const lang = query.lang || "es";
    const list = this.projectsData[lang];

    if (query.category && query.category !== "All") {
      return list.filter((p) => p.category.toLowerCase() === query.category?.toLowerCase());
    }

    return list;
  }

  findOne(id: string, lang: "es" | "en" = "es") {
    const project = this.projectsData[lang].find((p) => p.id === id);
    if (!project) {
      throw new NotFoundException(`Proyecto con id '${id}' no encontrado.`);
    }
    return project;
  }
}