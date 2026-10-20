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
      talk: "Agendar / Contacto",
    },
    hero: {
      badge: "Ingeniero en Computación • Full-Stack Software Engineer (IBM / Itaú)",
      role: "Ingeniero de Software Full-Stack",
      headlinePrefix: "Software confiable para negocio,",
      headlineGradient: "microservicios bancarios & plataformas IA/IoT",
      summary:
        "Ingeniero en Computación con experiencia real en banca empresarial (IBM Consulting / Banco Itaú) e intercambio académico en España (UJI). Transformo requerimientos complejos en productos digitales rápidos, seguros y eficientes en costos usando TypeScript, NestJS y Next.js, con fluidez en inglés avanzado (C1) y comunicación clara con equipos de negocio y tecnología.",
      exploreBtn: "Ver Proyectos e Impacto",
      contactBtn: "Contactar / Evaluar Perfil",
      stat1Title: "Experiencia Bancaria Real",
      stat1Desc: "Microservicios BFF, NestJS & calidad TDD/Jest en Banco Itaú",
      stat2Title: "Eficiencia & Arquitectura",
      stat2Desc: "Clean Architecture, SOLID & sistemas IA a costo $0",
      stat3Title: "Entrega End-to-End (IoT & Cloud)",
      stat3Desc: "De sensores ESP32/LoRa en terreno a plataformas web en vivo",
      stat4Title: "Adaptabilidad Global & Inglés C1",
      stat4Desc: "Intercambio en España (UJI), docencia universitaria & liderazgo",
      consoleTab1: "TelemetryGateway.ts",
      consoleTab2: "system_metrics.log",
      copy: "Copiar",
      copied: "¡Copiado!",
    },
    projects: {
      badge: "Soluciones en Producción & Casos de Éxito",
      title: "Proyectos de Software & Impacto de Negocio",
      subtitle:
        "Desde banca digital (IBM / Itaú) y redes de telemetría nacional hasta plataformas web de alta conversión: sistemas diseñados para ofrecer disponibilidad continua, ahorro de costos operativos y código mantenible.",
      all: "Todos",
      featuredBadge: "★ Proyecto Insignia en Producción (Tesis de Grado)",
      archTitle: "Impacto Técnico & Decisiones de Arquitectura:",
    },
    experience: {
      badge: "Trayectoria Validada en Industria",
      title: "Experiencia Profesional & Confiabilidad",
      subtitle:
        "Historial comprobado desarrollando microservicios bancarios bajo estándares de nivel mundial, liderando entregas de extremo a extremo para clientes reales y formando talento universitario.",
      achievementsTitle: "Impacto de Negocio & Logros de Ingeniería:",
    },
    skills: {
      badge: "Competencias & Empleabilidad (92% Market Match)",
      title: "Stack Tecnológico & Habilidades Clave",
      subtitle:
        "Dominio práctico de las tecnologías más demandadas por el mercado actual, combinando ingeniería Full-Stack moderna, arquitectura empresarial y comunicación bilingüe.",
      toolsCount: "competencias",
    },
    education: {
      badge: "Respaldo Académico & Visión Global",
      title: "Educación & Experiencia Internacional",
      subtitle:
        "Formación rigurosa en ingeniería de software potenciada con movilidad estudiantil en Europa (España), adaptabilidad multicultural y excelencia técnica.",
    },
    footer: {
      badge: "Disponible para Nuevos Desafíos & Contratación",
      title: "¿Buscas un Ingeniero Full-Stack Confiable para tu Equipo?",
      subtitle:
        "Ya sea que lideres Selección (HR), un equipo de Ingeniería o un proyecto de negocio: conversemos sobre cómo puedo aportar valor inmediato desde el primer sprint.",
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
      talk: "Book / Contact",
    },
    hero: {
      badge: "Computer Engineer • Full-Stack Software Engineer (IBM / Itaú)",
      role: "Full-Stack Software Engineer",
      headlinePrefix: "Business-ready software engineering,",
      headlineGradient: "banking microservices & AI/IoT platforms",
      summary:
        "Computer Engineer with proven enterprise banking experience (IBM Consulting / Itaú Bank) and international academic exchange in Spain (UJI). I turn complex business challenges into fast, secure, and cost-efficient digital products using TypeScript, NestJS, and Next.js, backed by C1 English fluency and clear cross-functional communication.",
      exploreBtn: "Explore Projects & ROI",
      contactBtn: "Contact / Evaluate Fit",
      stat1Title: "Enterprise Banking Track",
      stat1Desc: "BFF microservices, NestJS & TDD/Jest quality at Itaú Bank",
      stat2Title: "Architecture & $0 FinOps",
      stat2Desc: "Clean Architecture, SOLID & cost-aware AI/cloud systems",
      stat3Title: "End-to-End Delivery (IoT & Web)",
      stat3Desc: "From field ESP32/LoRa hardware to live cloud dashboards",
      stat4Title: "Global Fluency & C1 English",
      stat4Desc: "Spain exchange (UJI), university lecturing & clear communication",
      consoleTab1: "TelemetryGateway.ts",
      consoleTab2: "system_metrics.log",
      copy: "Copy",
      copied: "Copied!",
    },
    projects: {
      badge: "Production Systems & Business Case Studies",
      title: "Software Projects & Business Impact",
      subtitle:
        "From enterprise digital banking (IBM / Itaú) and national telemetry networks to high-conversion web platforms: systems engineered for high availability, operating cost savings, and long-term maintainability.",
      all: "All",
      featuredBadge: "★ Flagship Production System (Capstone Thesis)",
      archTitle: "Business Value & Architectural Decisions:",
    },
    experience: {
      badge: "Industry-Validated Track Record",
      title: "Professional Experience & Reliability",
      subtitle:
        "Proven track record building enterprise banking microservices under global consulting standards, delivering end-to-end client solutions, and mentoring university engineers.",
      achievementsTitle: "Business Impact & Engineering Achievements:",
    },
    skills: {
      badge: "Core Stack & Employability (92% Market Match)",
      title: "Technical Competencies & Core Stack",
      subtitle:
        "Hands-on mastery of today's most demanded technologies, combining modern Full-Stack engineering, enterprise architecture, and fluent bilingual communication.",
      toolsCount: "competencies",
    },
    education: {
      badge: "Academic Foundation & Global Mindset",
      title: "Education & International Exchange",
      subtitle:
        "Rigorous computer engineering foundation strengthened by European academic mobility in Spain (UJI), cross-cultural adaptability, and technical excellence.",
    },
    footer: {
      badge: "Open to Software Engineering Roles & Consulting",
      title: "Looking for a Reliable Full-Stack Engineer for Your Team?",
      subtitle:
        "Whether you are in Talent Acquisition (HR), leading an Engineering squad, or building a digital product: let's connect and discuss how I can deliver value from sprint one.",
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
      tagline: "Monitoreo en Tiempo Real para Zonas sin Cobertura Celular • Proyecto de Título",
      category: "Full-Stack",
      featured: true,
      description:
        "Impacto: Permite supervisar en tiempo real la seguridad y telemetría de un parque nacional en zonas remotas sin internet ni señal móvil, reduciendo costos de conectividad satelital. Ingeniería: Plataforma Full-Stack con API REST en NestJS, ingesta asíncrona vía MQTT desde nodos de radio ESP32/LoRa, panel reactivo en Next.js/Tailwind y persistencia en MongoDB sobre servidor VPS.",
      architectureHighlights: [
        "Continuidad operacional en zonas aisladas mediante red Mesh LoRa y nodos ESP32 autónomos",
        "Backend resiliente en NestJS bajo Clean Architecture y mensajería asíncrona MQTT",
        "Panel ejecutivo en Next.js y Tailwind CSS para visualización topológica y alertas en vivo",
        "Despliegue contenerizado sobre servidor Linux VPS con base de datos MongoDB",
      ],
      technologies: ["NestJS", "Next.js", "MQTT", "ESP32 / LoRa", "MongoDB", "TypeScript", "Tailwind CSS", "VPS"],
      metrics: [
        { label: "Impacto", value: "Conectividad Remota" },
        { label: "Arquitectura", value: "Full-Stack + IoT" },
        { label: "Cliente / Caso", value: "Parque Río Clarillo" },
      ],
    },
    {
      id: "ibm-itau-microservices",
      title: "Microservicios Bancarios en la Nube - Banco Itaú (IBM Consulting)",
      tagline: "Confiabilidad Financiera, Arquitectura BFF y Calidad de Código Empresarial",
      category: "Backend / Microservices",
      featured: false,
      description:
        "Impacto: Optimización de la velocidad de respuesta y estabilidad de los canales digitales de Banco Itaú bajo estrictos estándares de seguridad bancaria y trabajo ágil (Scrum). Ingeniería: Desarrollo y mantenimiento de microservicios escalables con NestJS y TypeScript, aplicando el patrón Backend-for-Frontend (BFF) y pruebas automatizadas con Jest junto a equipos de DevOps, QA y Arquitectos Cloud.",
      architectureHighlights: [
        "Reducción de latencia y desacoplamiento para canales web/móvil mediante arquitectura BFF",
        "Prevención de regresiones en producción con alta cobertura de pruebas unitarias e integración (Jest / TDD)",
        "Cumplimiento de normativas de seguridad financiera y despliegue continuo (CI/CD) en GitLab",
      ],
      technologies: ["NestJS", "TypeScript", "BFF Pattern", "Jest", "Scrum", "Docker", "GitLab"],
      metrics: [
        { label: "Sector", value: "Banca (Banco Itaú)" },
        { label: "Consultora", value: "IBM Consulting" },
        { label: "Calidad", value: "Jest / TDD / CI-CD" },
      ],
    },
    {
      id: "fullstack-portfolio-app",
      title: " Ecosistema de Portafolio Full-Stack + Radar de Mercado IA",
      tagline: "Next.js 16 • NestJS API • Motor RAG Vectorial • Operación a Costo $0",
      category: "Full-Stack",
      featured: false,
      description:
        "Impacto: Herramienta interactiva que permite a reclutadores y líderes técnicos auditar mi compatibilidad con sus vacantes en segundos y sin costos de infraestructura ($0 FinOps). Ingeniería: Construida desde cero con arquitectura MVVM en Next.js 16 (App Router), Tailwind CSS v4, pipeline ETL con Gemini 2.5 Flash + Zod, búsqueda vectorial en MongoDB Atlas y backend complementario en NestJS.",
      architectureHighlights: [
        "Mentalidad de ahorro de costos: Caché inteligente Zero-Token (24h) y control de cuotas por IP",
        "Arquitectura Frontend MVVM desacoplada con soporte bilingüe instantáneo (ES/EN)",
        "Motor ETL + RAG vectorial de 768 dimensiones que analiza ofertas reales del mercado",
        "Backend complementario en NestJS aplicando principios SOLID, Clean Code y Docker",
      ],
      technologies: ["Next.js 16", "NestJS", "TypeScript", "MongoDB Vector", "Gemini AI + Zod", "Docker", "MVVM Pattern"],
      metrics: [
        { label: "Match Mercado", value: "92% Verificado" },
        { label: "Costo Operativo", value: "$0 FinOps Cache" },
        { label: "Arquitectura", value: "MVVM + RAG" },
      ],
    },
    {
      id: "eleam-abuelita-olga",
      title: "ELEAM Abuelita Olga - Plataforma Digital Accesible",
      tagline: "Entrega Llave en Mano • Máxima Velocidad (100 Lighthouse) y Accesibilidad",
      category: "Frontend / Web",
      featured: false,
      description:
        "Impacto: Digitalización completa de una residencia de adultos mayores, facilitando el contacto directo de familias mediante una interfaz inclusiva, ultrarrápida y de carga instantánea en móviles. Ingeniería: Gestión integral del proyecto de principio a fin (UX/UI, desarrollo estático de alto rendimiento con Astro y Tailwind CSS, estándares de accesibilidad WCAG y despliegue automatizado en CDN).",
      architectureHighlights: [
        "Puntaje perfecto (100/100) en rendimiento y velocidad de carga para mejorar la retención de usuarios",
        "Diseño inclusivo y accesible (WCAG) pensado para adultos mayores y sus familias",
        "Cero costo de mantenimiento de servidor mediante despliegue continuo en el Edge de Netlify",
      ],
      technologies: ["AstroJS", "Tailwind CSS", "TypeScript", "Netlify", "A11y"],
      metrics: [
        { label: "Velocidad", value: "100 Lighthouse" },
        { label: "Gestión", value: "End-to-End" },
      ],
    },
    {
      id: "niwenewen-spa",
      title: "NiweNewen SPA - Portal Corporativo de Conversión Comercial",
      tagline: "Posicionamiento SEO Técnico y Captación de Clientes",
      category: "Frontend / Web",
      featured: false,
      description:
        "Impacto: Fortalecimiento de la presencia comercial y captación orgánica de clientes en buscadores para la empresa. Ingeniería: Liderazgo en el diseño e implementación del portal corporativo utilizando Next.js y Tailwind CSS, aplicando renderizado híbrido optimizado, SEO técnico estructurado y arquitectura modular escalable.",
      architectureHighlights: [
        "Aumento de visibilidad comercial mediante estrategia de SEO técnico y Core Web Vitals",
        "Arquitectura de componentes reutilizables que reduce tiempos de mantenimiento futuro",
        "Renderizado híbrido ultrarrápido con Next.js App Router y TypeScript",
      ],
      technologies: ["Next.js", "Tailwind CSS", "TypeScript", "SEO"],
      metrics: [
        { label: "Objetivo", value: "Captación & SEO" },
        { label: "Tecnología", value: "Next.js + TS" },
      ],
    },
  ],
  en: [
    {
      id: "rio-clarillo-mesh",
      title: "IoT LoRa Mesh Platform - Río Clarillo National Park",
      tagline: "Real-Time Telemetry for Off-Grid Zones • Capstone Engineering Project",
      category: "Full-Stack",
      featured: true,
      description:
        "Business Impact: Enables real-time safety and environmental monitoring across remote national park areas without cellular or internet coverage, eliminating expensive satellite fees. Engineering: End-to-end Full-Stack platform featuring a NestJS REST API, asynchronous MQTT ingestion from ESP32/LoRa radio nodes, a reactive Next.js/Tailwind dashboard, and MongoDB persistence on a Linux VPS.",
      architectureHighlights: [
        "Off-grid operational continuity powered by autonomous ESP32 nodes and LoRa Mesh routing",
        "Resilient NestJS backend implementing Clean Architecture and asynchronous MQTT ingestion",
        "Executive Next.js and Tailwind CSS dashboard for real-time topology visualization and alerts",
        "Containerized MongoDB and service deployment orchestrated on a production Linux VPS",
      ],
      technologies: ["NestJS", "Next.js", "MQTT", "ESP32 / LoRa", "MongoDB", "TypeScript", "Tailwind CSS", "VPS"],
      metrics: [
        { label: "Impact", value: "Off-Grid Connectivity" },
        { label: "Architecture", value: "Full-Stack + IoT" },
        { label: "Deployment", value: "Río Clarillo Park" },
      ],
    },
    {
      id: "ibm-itau-microservices",
      title: "Enterprise Banking Cloud Microservices - Itaú Bank (IBM Consulting)",
      tagline: "Financial Reliability, BFF Architecture & Enterprise Code Quality",
      category: "Backend / Microservices",
      featured: false,
      description:
        "Business Impact: Improved response speed and platform reliability for Itaú Bank's digital channels under strict financial security standards and Agile Scrum delivery. Engineering: Built and maintained scalable microservices with NestJS and TypeScript, implementing Backend-for-Frontend (BFF) patterns and automated Jest testing alongside DevOps, QA, and Cloud Architects.",
      architectureHighlights: [
        "Reduced latency and decoupled web/mobile banking channels via NestJS BFF architecture",
        "Prevented production regressions with rigorous unit and integration test coverage (Jest / TDD)",
        "Full compliance with banking security standards and automated GitLab CI/CD pipelines",
      ],
      technologies: ["NestJS", "TypeScript", "BFF Pattern", "Jest", "Scrum", "Docker", "GitLab"],
      metrics: [
        { label: "Industry", value: "Banking (Itaú Bank)" },
        { label: "Firm", value: "IBM Consulting" },
        { label: "Quality", value: "Jest / TDD / CI-CD" },
      ],
    },
    {
      id: "fullstack-portfolio-app",
      title: "Full-Stack Portfolio Ecosystem + AI Market Radar",
      tagline: "Next.js 16 • NestJS API • Vector RAG Engine • $0 Operating Cost",
      category: "Full-Stack",
      featured: false,
      description:
        "Business Impact: Interactive recruitment tool enabling hiring managers and recruiters to evaluate my compatibility with their open roles in seconds at $0 cloud operating cost ($0 FinOps). Engineering: Built from scratch with an MVVM architecture in Next.js 16 (App Router), Tailwind CSS v4, an automated Gemini 2.5 Flash + Zod ETL pipeline, MongoDB Atlas vector search, and a companion NestJS backend.",
      architectureHighlights: [
        "Cost-aware FinOps design: 24-hour Zero-Token Cache and strict per-IP quota protection",
        "Decoupled Frontend MVVM architecture with instant bilingual switching (EN/ES)",
        "768-dimensional ETL + Vector RAG engine analyzing live software engineering openings",
        "Companion NestJS backend adhering to SOLID principles, Clean Code, and Docker containerization",
      ],
      technologies: ["Next.js 16", "NestJS", "TypeScript", "MongoDB Vector", "Gemini AI + Zod", "Docker", "MVVM Pattern"],
      metrics: [
        { label: "Market Fit", value: "92% Verified" },
        { label: "Cloud Cost", value: "$0 FinOps Cache" },
        { label: "Architecture", value: "MVVM + RAG" },
      ],
    },
    {
      id: "eleam-abuelita-olga",
      title: "ELEAM Abuelita Olga - Accessible Digital Platform",
      tagline: "Turnkey Delivery • Perfect Speed (100 Lighthouse) & High Accessibility",
      category: "Frontend / Web",
      featured: false,
      description:
        "Business Impact: Complete digital transformation for a senior care residence, making it effortless for families to connect through an inclusive, instant-loading mobile and desktop experience. Engineering: End-to-end project ownership from accessible UX/UI design (WCAG) to static island architecture with Astro, Tailwind CSS, and zero-maintenance Netlify CDN deployment.",
      architectureHighlights: [
        "Perfect 100/100 Lighthouse performance score maximizing visitor retention and trust",
        "Inclusive WCAG accessibility tailored for elderly users and their families",
        "Zero server maintenance cost via automated CI/CD deployment on Netlify Edge",
      ],
      technologies: ["AstroJS", "Tailwind CSS", "TypeScript", "Netlify", "A11y"],
      metrics: [
        { label: "Performance", value: "100 Lighthouse" },
        { label: "Ownership", value: "End-to-End" },
      ],
    },
    {
      id: "niwenewen-spa",
      title: "NiweNewen SPA - High-Conversion Corporate Portal",
      tagline: "Technical SEO Positioning & B2B Lead Generation",
      category: "Frontend / Web",
      featured: false,
      description:
        "Business Impact: Strengthened commercial visibility and organic client acquisition across search engines. Engineering: Led the architecture and delivery of a modern corporate portal using Next.js and Tailwind CSS, combining hybrid rendering, structured technical SEO, and clean reusable components.",
      architectureHighlights: [
        "Boosted commercial discoverability through technical SEO and Core Web Vitals optimization",
        "Modular, reusable component system lowering long-term maintenance overhead",
        "Fast hybrid rendering powered by Next.js App Router and TypeScript",
      ],
      technologies: ["Next.js", "Tailwind CSS", "TypeScript", "SEO"],
      metrics: [
        { label: "Goal", value: "Lead Gen & SEO" },
        { label: "Stack", value: "Next.js + TS" },
      ],
    },
  ],
};

export const EXPERIENCES_DATA: Record<Language, Experience[]> = {
  es: [
    {
      id: "ibm-exp",
      period: "Febrero 2025 – Agosto 2025",
      role: "Full-Stack / Backend Software Engineer (IBM Consulting)",
      organization: "IBM Consulting • Proyecto Banco Itaú",
      location: "Santiago, Chile",
      description:
        "Desarrollo de software de misión crítica para la banca digital de Banco Itaú, cumpliendo altos estándares de seguridad financiera, disponibilidad y entrega continua en células ágiles Scrum.",
      achievements: [
        "Impacto en Negocio: Optimicé la integración entre sistemas centrales bancarios y aplicaciones web/móviles diseñando microservicios Backend-for-Frontend (BFF) con NestJS y TypeScript.",
        "Calidad y Confiabilidad: Reduje el riesgo de fallos en producción mediante pruebas unitarias y de integración automatizadas con Jest (TDD) y revisiones de código rigurosas.",
        "Trabajo Colaborativo: Comunicación fluida y coordinación diaria con equipos multidisciplinarios de DevOps, QA, Product Owners y Arquitectos Cloud bajo metodología Scrum.",
      ],
      techStack: ["NestJS", "TypeScript", "Microservicios BFF", "Jest / TDD", "Scrum", "GitLab CI/CD", "Docker"],
    },
    {
      id: "thesis-exp",
      period: "Agosto 2025 - Presente",
      role: "Ingeniero de Software Full-Stack & IoT (Proyecto de Título)",
      organization: "Parque Nacional Río Clarillo / UTEM",
      location: "Santiago, Chile",
      description:
        "Liderazgo técnico de principio a fin en el diseño, construcción y puesta en marcha de una red de telemetría y plataforma web para zonas sin cobertura celular en el Parque Nacional Río Clarillo.",
      achievements: [
        "Solución Integral (End-to-End): Diseñé e implementé la API REST en NestJS y la ingesta en tiempo real vía protocolo MQTT conectada a nodos físicos ESP32 y radios LoRa.",
        "Visibilidad Operativa: Construí el panel de control reactivo en Next.js y Tailwind CSS para que guardaparques y administradores supervisen el estado de la red en vivo.",
        "Autonomía en Infraestructura: Modelé la persistencia en MongoDB y configuré el despliegue autónomo en servidor Linux VPS cuidando el consumo de recursos.",
      ],
      techStack: ["NestJS", "Next.js", "MQTT", "ESP32", "LoRa", "MongoDB", "Tailwind CSS", "VPS"],
    },
    {
      id: "teaching-exp",
      period: "2026 - Presente",
      role: "Ayudante Universitario - Algoritmos y Programación",
      organization: "Universidad Tecnológica Metropolitana (UTEM)",
      location: "Santiago, Chile",
      description:
        "Formación de futuros ingenieros en fundamentos de computación, resolución estructurada de problemas y comunicación clara de conceptos técnicos complejos.",
      achievements: [
        "Liderazgo y Comunicación: Capacidad demostrada para explicar arquitecturas y algoritmos complejos (C++, estructuras de datos y gestión de memoria) de forma sencilla y accionable.",
      ],
      techStack: ["C++", "Estructuras de Datos", "Algoritmos", "Liderazgo Técnico", "Mentoría"],
    },
    {
      id: "eleam-exp",
      period: "Mayo 2025 - Junio 2025",
      role: "Consultor & Desarrollador Web Full-Cycle",
      organization: "ELEAM Abuelita Olga",
      location: "Santiago, Chile",
      description:
        "Gestión directa con el cliente y entrega llave en mano de su plataforma digital enfocada en captación de familias, accesibilidad y velocidad de carga.",
      achievements: [
        "Resultados Medibles: Logré un puntaje perfecto de 100/100 en Core Web Vitals (Lighthouse) con Astro y Tailwind CSS, maximizando la experiencia móvil.",
        "Responsabilidad Total: Lideré el levantamiento de requerimientos, diseño UX/UI accesible y puesta en producción sin costos mensuales de servidor en Netlify.",
      ],
      techStack: ["AstroJS", "Tailwind CSS", "TypeScript", "Accesibilidad WCAG", "Netlify"],
    },
    {
      id: "niwenewen-exp",
      period: "Marzo 2024 - Junio 2024",
      role: "Desarrollador Web & Especialista en Rendimiento",
      organization: "NiweNewen SPA",
      location: "Santiago, Chile",
      description:
        "Modernización de la presencia digital corporativa de la empresa con foco en posicionamiento comercial y captación de clientes.",
      achievements: [
        "Impacto Comercial: Implementé el portal en Next.js y Tailwind CSS bajo prácticas de SEO técnico, mejorando la velocidad de carga y el posicionamiento orgánico.",
        "Mantenibilidad: Estructuré componentes limpios y modulares en TypeScript para facilitar futuras expansiones del negocio.",
      ],
      techStack: ["Next.js", "Tailwind CSS", "TypeScript", "SEO Técnico"],
    },
    {
      id: "english-exp",
      period: "Julio 2023 - Presente",
      role: "Instructor de Inglés Avanzado & Comunicación Profesional",
      organization: "Entrenamiento Privado para Universitarios y Profesionales",
      location: "Santiago, Chile",
      description:
        "Preparación en fluidez conversacional y comunicación en inglés avanzado (nivel C1) para entornos académicos e internacionales.",
      achievements: [
        "Diferenciador Clave para Equipos Globales: Dominio fluido del inglés hablado y escrito para participar en reuniones con clientes internacionales, entrevistas y documentación técnica.",
      ],
      techStack: ["English C1/Advanced", "Comunicación Ejecutiva", "Equipos Globales"],
    },
  ],
  en: [
    {
      id: "ibm-exp",
      period: "February 2025 – August 2025",
      role: "Full-Stack / Backend Software Engineer (IBM Consulting)",
      organization: "IBM Consulting • Itaú Bank Project",
      location: "Santiago, Chile",
      description:
        "Engineered mission-critical software for Itaú Bank's digital banking channels, operating under strict financial security, high-availability, and Agile Scrum delivery standards.",
      achievements: [
        "Business Impact: Accelerated data delivery between core banking systems and web/mobile channels by designing Backend-for-Frontend (BFF) microservices with NestJS and TypeScript.",
        "Reliability & Quality Assurance: Minimized production regression risks through automated unit and integration testing with Jest (TDD) and strict peer code reviews.",
        "Cross-Functional Collaboration: Worked daily alongside DevOps, QA, Product Owners, and Cloud Architects to ship reliable banking features on schedule.",
      ],
      techStack: ["NestJS", "TypeScript", "BFF Microservices", "Jest / TDD", "Scrum", "GitLab CI/CD", "Docker"],
    },
    {
      id: "thesis-exp",
      period: "August 2025 - Present",
      role: "Full-Stack & IoT Software Engineer (Capstone Project)",
      organization: "Río Clarillo National Park / UTEM",
      location: "Santiago, Chile",
      description:
        "End-to-end technical ownership designing, building, and deploying a public LoRa Mesh telemetry network and cloud management platform for off-grid areas in Río Clarillo National Park.",
      achievements: [
        "End-to-End Execution: Architected a NestJS REST API and real-time MQTT telemetry pipeline integrating physical ESP32 radio nodes across remote terrain.",
        "Operational Visibility: Built a responsive Next.js and Tailwind CSS control center enabling park rangers to monitor live network health and alerts.",
        "Cost-Efficient Infrastructure: Modeled MongoDB persistence and orchestrated autonomous Linux VPS deployment with low resource overhead.",
      ],
      techStack: ["NestJS", "Next.js", "MQTT", "ESP32", "LoRa", "MongoDB", "Tailwind CSS", "VPS"],
    },
    {
      id: "teaching-exp",
      period: "2026 - Present",
      role: "University Teaching Assistant - Algorithms & Programming",
      organization: "Universidad Tecnológica Metropolitana (UTEM)",
      location: "Santiago, Chile",
      description:
        "Mentoring engineering students in computer science fundamentals, structured problem-solving, and clear communication of complex technical concepts.",
      achievements: [
        "Technical Leadership & Communication: Proven ability to translate complex algorithms, C++ memory management, and data structures into clear, actionable guidance.",
      ],
      techStack: ["C++", "Data Structures", "Algorithms", "Technical Mentorship"],
    },
    {
      id: "eleam-exp",
      period: "May 2025 - June 2025",
      role: "Full-Cycle Web Consultant & Developer",
      organization: "ELEAM Abuelita Olga",
      location: "Santiago, Chile",
      description:
        "Direct client management and turnkey delivery of an accessible digital platform designed to connect families with senior care services.",
      achievements: [
        "Measurable Results: Achieved a perfect 100/100 Lighthouse Core Web Vitals score using Astro and Tailwind CSS, ensuring instant mobile loading.",
        "Full Lifecycle Ownership: Led requirement gathering, accessible UX/UI design (WCAG), and zero-cost production hosting on Netlify.",
      ],
      techStack: ["AstroJS", "Tailwind CSS", "TypeScript", "WCAG Accessibility", "Netlify"],
    },
    {
      id: "niwenewen-exp",
      period: "March 2024 - June 2024",
      role: "Web Developer & Performance Specialist",
      organization: "NiweNewen SPA",
      location: "Santiago, Chile",
      description:
        "Modernized the company's corporate digital presence with a focus on search engine visibility and client conversion.",
      achievements: [
        "Commercial Impact: Engineered the corporate portal with Next.js and Tailwind CSS following technical SEO best practices to boost organic reach.",
        "Long-Term Maintainability: Built clean, modular TypeScript components reducing future maintenance costs.",
      ],
      techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Technical SEO"],
    },
    {
      id: "english-exp",
      period: "July 2023 - Present",
      role: "Advanced English & Professional Communication Coach",
      organization: "Private Coaching for University Students & Professionals",
      location: "Santiago, Chile",
      description:
        "Training university students and professionals in advanced English fluency (C1 level) and effective communication.",
      achievements: [
        "Global Team Readiness: Fluent spoken and written English for international stakeholder meetings, technical interviews, and cross-border collaboration.",
      ],
      techStack: ["English C1/Advanced", "Executive Communication", "Global Teams"],
    },
  ],
};

export const SKILLS_CATEGORIES: Record<Language, SkillCategory[]> = {
  es: [
    {
      title: "Frontend & Experiencia de Producto",
      skills: [
        { name: "TypeScript / JavaScript", level: "Avanzado" },
        { name: "Next.js (App Router / SSR)", level: "Avanzado" },
        { name: "React", level: "Avanzado" },
        { name: "Angular", level: "Competente" },
        { name: "Tailwind CSS", level: "Avanzado" },
        { name: "AstroJS (100 Lighthouse)", level: "Avanzado" },
      ],
    },
    {
      title: "Backend Bancario, IA & Microservicios",
      skills: [
        { name: "NestJS (Node.js)", level: "Especializado" },
        { name: "Arquitectura BFF & Clean Arch", level: "Avanzado" },
        { name: "IA Aplicada (Gemini + RAG + Zod)", level: "Avanzado" },
        { name: "MQTT & Sistemas IoT (ESP32/LoRa)", level: "Avanzado" },
        { name: "REST APIs & WebSockets", level: "Avanzado" },
        { name: "Python (Keras, TensorFlow)", level: "Intermedio" },
      ],
    },
    {
      title: "Bases de Datos, Cloud & Calidad",
      skills: [
        { name: "MongoDB Atlas & Vector Search", level: "Avanzado" },
        { name: "SQL / MySQL / PostgreSQL", level: "Avanzado" },
        { name: "Docker & Linux VPS", level: "Avanzado" },
        { name: "Testing Automatizado (Jest / TDD)", level: "Avanzado" },
        { name: "CI/CD (GitHub Actions / GitLab)", level: "Avanzado" },
      ],
    },
    {
      title: "Habilidades de Negocio & Liderazgo",
      skills: [
        { name: "Agile / Scrum (Banca IBM - Itaú)", level: "Avanzado" },
        { name: "Inglés Profesional (Nivel C1)", level: "Fluido" },
        { name: "Adaptabilidad Internacional (España UJI)", level: "Comprobada" },
        { name: "Comunicación & Docencia Universitaria", level: "Avanzado" },
      ],
    },
  ],
  en: [
    {
      title: "Frontend & Product Engineering",
      skills: [
        { name: "TypeScript / JavaScript", level: "Advanced" },
        { name: "Next.js (App Router / SSR)", level: "Advanced" },
        { name: "React", level: "Advanced" },
        { name: "Angular", level: "Proficient" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "AstroJS (100 Lighthouse)", level: "Advanced" },
      ],
    },
    {
      title: "Enterprise Backend, AI & Microservices",
      skills: [
        { name: "NestJS (Node.js)", level: "Specialized" },
        { name: "BFF & Clean Architecture", level: "Advanced" },
        { name: "Applied AI (Gemini + RAG + Zod)", level: "Advanced" },
        { name: "MQTT & IoT Systems (ESP32/LoRa)", level: "Advanced" },
        { name: "REST APIs & WebSockets", level: "Advanced" },
        { name: "Python (Keras, TensorFlow)", level: "Intermediate" },
      ],
    },
    {
      title: "Databases, Cloud & Quality Assurance",
      skills: [
        { name: "MongoDB Atlas & Vector Search", level: "Advanced" },
        { name: "SQL / MySQL / PostgreSQL", level: "Advanced" },
        { name: "Docker & Linux VPS", level: "Advanced" },
        { name: "Automated Testing (Jest / TDD)", level: "Advanced" },
        { name: "CI/CD (GitHub Actions / GitLab)", level: "Advanced" },
      ],
    },
    {
      title: "Business Readiness & Leadership",
      skills: [
        { name: "Agile / Scrum (IBM - Itaú Bank)", level: "Advanced" },
        { name: "Professional English (C1 Level)", level: "Fluent" },
        { name: "International Adaptability (Spain UJI)", level: "Proven" },
        { name: "Technical Communication & Lecturing", level: "Advanced" },
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
      details:
        "Formación integral en arquitectura de software, sistemas distribuidos, gestión de proyectos tecnológicos y liderazgo como ayudante académico de programación.",
    },
    {
      degree: "Programa de Intercambio Internacional en Ingeniería Informática",
      institution: "Universitat Jaume I (UJI)",
      period: "Septiembre 2025 - Enero 2026",
      location: "Castellón de la Plana, España",
      details:
        "Movilidad académica internacional en Europa enfocada en ingeniería de software avanzada, trabajo en equipos multiculturales y adaptabilidad a estándares globales.",
    },
  ],
  en: [
    {
      degree: "Computer Engineering (B.Sc. / Engineering Degree in Informatics)",
      institution: "Universidad Tecnológica Metropolitana (UTEM)",
      period: "March 2020 - 2026",
      location: "Santiago, Chile",
      details:
        "Comprehensive training in software architecture, distributed systems, technology project management, and academic leadership as a programming Teaching Assistant.",
    },
    {
      degree: "International Academic Exchange in Software Engineering",
      institution: "Universitat Jaume I (UJI)",
      period: "September 2025 - January 2026",
      location: "Castellón de la Plana, Spain",
      details:
        "European academic exchange program focused on advanced software architecture, multicultural team collaboration, and global engineering standards.",
    },
  ],
};
