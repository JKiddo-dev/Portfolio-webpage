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
      badge: "Ingeniero Civil en Computación (Titulado) • Full-Stack Developer @ SGO • Ex IBM / Itaú",
      role: "Desarrollador Full-Stack @ SGO • Ex IBM / Itaú",
      headlinePrefix: "Software confiable para negocio,",
      headlineGradient: "plataformas empresariales, Java/Spring & NestJS",
      summary:
        "Ingeniero Civil en Computación (Titulado, UTEM) y Full-Stack Developer en SGO desarrollando plataformas empresariales (Libro de Obras Digital – LOD) para MOP, EFE, Enel y Duoc UC, con experiencia previa en banca (IBM Consulting / Banco Itaú) e intercambio en España (UJI). Construyo sistemas seguros y mantenibles con Java 21 / Spring Boot y TypeScript / NestJS / Next.js, respaldados por inglés avanzado (C1).",
      exploreBtn: "Ver Proyectos e Impacto",
      contactBtn: "Contactar / Evaluar Perfil",
      stat1Title: "Experiencia Empresarial (SGO & IBM)",
      stat1Desc: "Java 21 / Spring Boot / MariaDB en SGO y BFF NestJS en Banco Itaú",
      stat2Title: "Eficiencia & Arquitectura",
      stat2Desc: "Clean Architecture, SOLID, Groovy/Spock, Jest TDD & FinOps $0",
      stat3Title: "Entrega End-to-End (Web, Cloud & IoT)",
      stat3Desc: "De plataformas empresariales y AWS/Docker a redes ESP32/LoRa",
      stat4Title: "Adaptabilidad Global & Inglés C1",
      stat4Desc: "Intercambio en España (UJI), ayudantía UTEM & mentoría técnica",
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
      badge: "B.S. Computer Engineering (Graduated) • Full-Stack Developer @ SGO • Ex IBM / Itaú",
      role: "Full-Stack Developer @ SGO • Ex IBM / Itaú",
      headlinePrefix: "Business-ready software engineering,",
      headlineGradient: "enterprise platforms, Java/Spring & NestJS",
      summary:
        "Computer Engineering graduate (UTEM) and Full-Stack Developer at SGO building enterprise construction & contract platforms (Libro de Obras Digital – LOD) for MOP, EFE, Enel, and Duoc UC, with prior banking experience at IBM Consulting (Itaú Bank) and academic exchange in Spain (UJI). I deliver reliable systems with Java 21 / Spring Boot and TypeScript / NestJS / Next.js, backed by C1 English fluency.",
      exploreBtn: "Explore Projects & ROI",
      contactBtn: "Contact / Evaluate Fit",
      stat1Title: "Enterprise Track (SGO & IBM)",
      stat1Desc: "Java 21 / Spring Boot / MariaDB at SGO & NestJS BFF at Itaú Bank",
      stat2Title: "Architecture & Testing",
      stat2Desc: "Clean Architecture, SOLID, Groovy/Spock, Jest TDD & $0 FinOps",
      stat3Title: "End-to-End Delivery (Cloud & IoT)",
      stat3Desc: "From enterprise platforms & AWS/Docker to live ESP32/LoRa systems",
      stat4Title: "Global Fluency & C1 English",
      stat4Desc: "Spain exchange (UJI), UTEM Algorithms TA & technical coaching",
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
      caseStudy: {
        flowSteps: [
          { label: "Nodos ESP32 + LoRa", detail: "Telemetría RF 868MHz multi-salto en zonas sin señal" },
          { label: "Gateway LoRa Base", detail: "Recepción de paquetes y firma de integridad" },
          { label: "Broker MQTT", detail: "Ingesta asíncrona desacoplada por tópicos" },
          { label: "API NestJS + MongoDB", detail: "Validación DTO, deduplicación y persistencia" },
          { label: "Panel Next.js", detail: "Topología en vivo y alertas para guardaparques" },
        ],
        tradeOff: {
          problem:
            "Supervisar sensores y alertas de seguridad en sectores cordilleranos del parque sin cobertura celular ni presupuesto para enlaces satelitales permanentes.",
          decision:
            "Red Mesh LoRa autónoma con reenvío multi-salto hacia un gateway conectado por MQTT a un backend NestJS en VPS Linux.",
          alternativeRejected:
            "Módems satelitales o celulares por nodo: descartados por costo operativo recurrente y cobertura nula en quebradas.",
        },
        securityAndQuality: [
          "HMAC SHA-256",
          "Validación DTO (class-validator)",
          "Deduplicación Mesh",
          "Clean Architecture",
        ],
      },
    },
    {
      id: "sgo-lod-platform",
      title: "SGO — Libro de Obras Digital (LOD) Empresarial",
      tagline: "Gestión de Obras y Contratos de Infraestructura • MOP, EFE, Enel & Duoc UC",
      category: "Full-Stack",
      featured: false,
      description:
        "Impacto: Desarrollo y evolución de plataformas empresariales de gestión de obras y contratos (Libro de Obras Digital – LOD) que atienden a grandes organizaciones públicas y privadas de infraestructura en Chile (MOP, EFE, Enel, Duoc UC) bajo metodología ágil Scrumban. Ingeniería: Servicios backend en Java 21 y Spring Boot junto a vistas renderizadas en servidor (JSP, Thymeleaf), diseño y optimización de consultas relacionales en MariaDB y pruebas unitarias/integración automatizadas con Groovy y Spock.",
      architectureHighlights: [
        "Servicios backend empresariales en Java 21 y Spring Boot integrados con vistas SSR (JSP y Thymeleaf)",
        "Diseño y optimización de consultas relacionales de alto volumen sobre MariaDB",
        "Confiabilidad respaldada por pruebas unitarias e integración automatizadas en Groovy y Spock",
        "Entrega continua en equipo ágil operando bajo flujo Scrumban y control de versiones en Bitbucket",
      ],
      technologies: ["Java 21", "Spring Boot", "JSP / Thymeleaf", "MariaDB", "Groovy / Spock", "Scrumban", "Bitbucket"],
      metrics: [
        { label: "Clientes", value: "MOP / EFE / Enel / Duoc" },
        { label: "Stack", value: "Java 21 + Spring Boot" },
        { label: "Calidad", value: "Groovy / Spock TDD" },
      ],
      caseStudy: {
        flowSteps: [
          { label: "Vistas SSR", detail: "JSP y Thymeleaf para flujos contractuales complejos" },
          { label: "Java 21 / Spring Boot", detail: "Servicios de dominio, reglas de negocio y permisos" },
          { label: "Capa Relacional", detail: "Consultas SQL optimizadas e índices en MariaDB" },
          { label: "Suite Groovy / Spock", detail: "Pruebas unitarias e integración por flujo crítico" },
          { label: "Entrega Scrumban", detail: "Revisión de PRs y despliegues controlados en Bitbucket" },
        ],
        tradeOff: {
          problem:
            "Evolucionar módulos de gestión contractual y trazabilidad legal de alto volumen sin interrumpir la operación diaria de mandantes públicos y privados.",
          decision:
            "Mantener arquitectura Spring Boot + SSR (JSP/Thymeleaf) optimizando consultas críticas en MariaDB y blindando cambios con especificaciones en Groovy/Spock.",
          alternativeRejected:
            "Reescritura big-bang a microservicios + SPA: descartada por alto riesgo operacional y freno a entregas continuas de negocio.",
        },
        securityAndQuality: [
          "RBAC / Permisos por Rol",
          "Bean Validation",
          "Groovy / Spock",
          "Optimización SQL MariaDB",
        ],
      },
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
      caseStudy: {
        flowSteps: [
          { label: "Canales Digitales", detail: "App móvil y banca web enviando 1 petición consolidada" },
          { label: "NestJS BFF Gateway", detail: "Validación JWT RS256 y orquestación Promise.allSettled" },
          { label: "Circuit Breaker", detail: "Aislamiento de fallos y fallback degradado sin bloqueo" },
          { label: "Core Microservices", detail: "Servicios de identidad, cuentas y tasas en AWS/K8s" },
          { label: "GitLab CI/CD + Jest", detail: "Suite automatizada y despliegue contenerizado en Docker" },
        ],
        tradeOff: {
          problem:
            "Evitar múltiples llamadas encadenadas desde el cliente y prevenir que la caída de un proveedor externo degrade por completo la vista de saldos bancarios.",
          decision:
            "Capa BFF en NestJS que agrega llamadas en paralelo con tolerancia a fallos parciales y contratos tipados estrictos para cada canal.",
          alternativeRejected:
            "Consumo directo desde el frontend hacia microservicios core: descartado por alta latencia móvil, acoplamiento de esquemas y superficie de seguridad expuesta.",
        },
        securityAndQuality: [
          "JWT / RS256",
          "Circuit Breaker",
          "Jest / TDD",
          "GitLab CI/CD & Docker",
        ],
      },
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
      caseStudy: {
        flowSteps: [
          { label: "Vercel Cron ETL", detail: "Ingesta diaria deduplicada desde GetOnBoard API" },
          { label: "Gemini 2.5 + Zod", detail: "Extracción tipada y normalización determinista" },
          { label: "Embeddings 768d", detail: "Vectorización semántica con text-embedding-004" },
          { label: "Atlas $vectorSearch", detail: "Búsqueda coseno ANN + caché Zero-Token 24h" },
          { label: "UI MVVM Next.js 16", detail: "Simulador interactivo con cuota por IP y fallback" },
        ],
        tradeOff: {
          problem:
            "Ofrecer análisis semántico RAG real con LLMs en un portafolio público sin arriesgar cobros inesperados ni agotamiento de cuota ante tráfico alto.",
          decision:
            "Caché persistente de 24h en MongoDB para perfiles preconfigurados ($0 tokens) y rate limiting por hash SHA-256 de IP (5 análisis live/hora) con degradación elegante.",
          alternativeRejected:
            "Inferencia LLM en vivo en cada carga de página: descartada por latencia alta (>3s) y exposición directa a abuso de API.",
        },
        securityAndQuality: [
          "Zod Strict Schema",
          "SHA-256 + timingSafeEqual",
          "Rate Limit por IP",
          "Jest Unit Tests",
        ],
      },
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
      caseStudy: {
        flowSteps: [
          { label: "ESP32 + LoRa Nodes", detail: "Multi-hop 868MHz RF telemetry in zero-signal terrain" },
          { label: "LoRa Base Gateway", detail: "Packet aggregation and cryptographic signature check" },
          { label: "MQTT Broker", detail: "Decoupled asynchronous topic-based ingestion" },
          { label: "NestJS API + MongoDB", detail: "DTO validation, deduplication, and persistence" },
          { label: "Next.js Dashboard", detail: "Live mesh topology and ranger alert console" },
        ],
        tradeOff: {
          problem:
            "Monitor environmental telemetry and safety alerts across mountainous park zones with zero cellular coverage and no budget for per-node satellite plans.",
          decision:
            "Autonomous LoRa Mesh multi-hop network bridging to a single MQTT gateway feeding a NestJS backend on a Linux VPS.",
          alternativeRejected:
            "Cellular or satellite modems per sensor node: rejected due to recurring fees and dead-zone signal loss in canyons.",
        },
        securityAndQuality: [
          "HMAC SHA-256",
          "DTO Validation (class-validator)",
          "Mesh Deduplication",
          "Clean Architecture",
        ],
      },
    },
    {
      id: "sgo-lod-platform",
      title: "SGO — Enterprise Digital Construction Logbook (LOD)",
      tagline: "Infrastructure Construction & Contract Management • MOP, EFE, Enel & Duoc UC",
      category: "Full-Stack",
      featured: false,
      description:
        "Business Impact: Developing and maintaining enterprise construction and contract management platforms (Libro de Obras Digital – LOD) serving major public and private infrastructure organizations in Chile (MOP, EFE, Enel, Duoc UC) within an Agile Scrumban team. Engineering: Building backend services with Java 21 and Spring Boot alongside server-side rendered views (JSP, Thymeleaf), optimizing relational queries in MariaDB, and ensuring reliability with automated unit and integration tests in Groovy and Spock.",
      architectureHighlights: [
        "Enterprise backend services built with Java 21 and Spring Boot paired with JSP and Thymeleaf SSR views",
        "Relational schema design and query optimization for high-volume contract workflows in MariaDB",
        "Automated unit and integration test coverage engineered in Groovy and Spock",
        "Agile delivery operating under Scrumban workflows and Bitbucket version control",
      ],
      technologies: ["Java 21", "Spring Boot", "JSP / Thymeleaf", "MariaDB", "Groovy / Spock", "Scrumban", "Bitbucket"],
      metrics: [
        { label: "Clients", value: "MOP / EFE / Enel / Duoc" },
        { label: "Stack", value: "Java 21 + Spring Boot" },
        { label: "Quality", value: "Groovy / Spock TDD" },
      ],
      caseStudy: {
        flowSteps: [
          { label: "SSR Views", detail: "JSP & Thymeleaf for regulated contract workflows" },
          { label: "Java 21 / Spring Boot", detail: "Domain services, business rules, and authorization" },
          { label: "Relational Layer", detail: "Indexed, query-optimized MariaDB data access" },
          { label: "Groovy / Spock Suite", detail: "Automated unit & integration specs per workflow" },
          { label: "Scrumban Delivery", detail: "Peer-reviewed releases via Bitbucket pipelines" },
        ],
        tradeOff: {
          problem:
            "Evolve high-volume legal construction logbooks and contract modules without disrupting daily operations for major public and private clients.",
          decision:
            "Keep the Spring Boot + SSR (JSP/Thymeleaf) foundation while optimizing hot MariaDB queries and guarding regressions with Groovy/Spock specs.",
          alternativeRejected:
            "Big-bang rewrite into microservices + SPA: rejected due to high operational risk and stalled feature delivery.",
        },
        securityAndQuality: [
          "RBAC Access Control",
          "Bean Validation",
          "Groovy / Spock",
          "MariaDB Query Tuning",
        ],
      },
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
      caseStudy: {
        flowSteps: [
          { label: "Banking Clients", detail: "Web & mobile apps issuing 1 aggregated request" },
          { label: "NestJS BFF Gateway", detail: "JWT RS256 validation & Promise.allSettled fan-out" },
          { label: "Circuit Breaker", detail: "Failure isolation & stale fallback without blocking" },
          { label: "Core Microservices", detail: "Identity, ledger, and rates on AWS / Kubernetes" },
          { label: "GitLab CI/CD + Jest", detail: "Automated test gates & Dockerized releases" },
        ],
        tradeOff: {
          problem:
            "Eliminate chatty client-side waterfalls and prevent a single downstream provider outage from crashing the entire digital banking dashboard.",
          decision:
            "Dedicated NestJS BFF layer aggregating concurrent calls with graceful partial degradation and strict typed channel contracts.",
          alternativeRejected:
            "Direct frontend-to-core microservice calls: rejected due to mobile latency, tight schema coupling, and broader security surface.",
        },
        securityAndQuality: [
          "JWT / RS256",
          "Circuit Breaker",
          "Jest / TDD",
          "GitLab CI/CD & Docker",
        ],
      },
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
      caseStudy: {
        flowSteps: [
          { label: "Vercel Cron ETL", detail: "Daily deduplicated ingestion from GetOnBoard API" },
          { label: "Gemini 2.5 + Zod", detail: "Typed entity extraction & deterministic normalization" },
          { label: "768d Embeddings", detail: "Dense vectorization via text-embedding-004" },
          { label: "Atlas $vectorSearch", detail: "ANN cosine retrieval + 24h Zero-Token cache" },
          { label: "Next.js 16 MVVM UI", detail: "Interactive simulator with IP quota & fallback" },
        ],
        tradeOff: {
          problem:
            "Deliver live RAG semantic gap analysis on a public portfolio without exposing the app to runaway LLM token costs or quota exhaustion.",
          decision:
            "24-hour MongoDB preset cache ($0 token spend) paired with SHA-256 IP rate limiting (5 live analyses/hour) and deterministic fallback.",
          alternativeRejected:
            "Live LLM inference on every visit: rejected due to >3s cold latency and unbounded API cost risk.",
        },
        securityAndQuality: [
          "Zod Strict Schema",
          "SHA-256 + timingSafeEqual",
          "Per-IP Rate Limit",
          "Jest Unit Tests",
        ],
      },
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
      id: "sgo-exp",
      period: "Noviembre 2026 – Presente",
      role: "Desarrollador Full-Stack",
      organization: "SGO • Plataformas de Gestión de Obras (LOD)",
      location: "Santiago, Chile",
      description:
        "Desarrollo y mantenimiento de plataformas empresariales de gestión de obras y contratos (Libro de Obras Digital – LOD) que operan para grandes organizaciones públicas y privadas de infraestructura en Chile (MOP, EFE, Enel, Duoc UC) dentro de un equipo ágil bajo Scrumban.",
      achievements: [
        "Desarrollo Backend & SSR: Construcción y evolución de servicios backend en Java 21 y Spring Boot junto a vistas renderizadas en servidor con JSP y Thymeleaf.",
        "Optimización Relacional: Diseño y optimización de consultas SQL complejas de alto rendimiento sobre MariaDB para flujos críticos de inspección y contratos.",
        "Calidad Automatizada: Aseguramiento de confiabilidad en producción mediante pruebas unitarias y de integración automatizadas escritas en Groovy y Spock.",
      ],
      techStack: ["Java 21", "Spring Boot", "JSP", "Thymeleaf", "MariaDB", "Groovy / Spock", "Scrumban", "Bitbucket"],
    },
    {
      id: "ibm-exp",
      period: "Febrero 2025 – Agosto 2025",
      role: "Full-Stack / Backend Software Engineer (IBM Consulting)",
      organization: "IBM Consulting • Proyecto Banco Itaú",
      location: "Santiago, Chile",
      description:
        "Desarrollo de software de misión crítica para la banca digital de Banco Itaú, cumpliendo altos estándares de seguridad financiera, disponibilidad en la nube y entrega continua en células ágiles Scrum.",
      achievements: [
        "Impacto en Negocio: Optimicé la integración entre sistemas centrales bancarios y aplicaciones web/móviles diseñando microservicios Backend-for-Frontend (BFF) con Node.js, NestJS y TypeScript.",
        "Cloud & DevOps: Operación sobre servicios AWS (EC2, S3, IAM), contenedores Docker, orquestación en Kubernetes, consultas SQL y pipelines automatizados en GitLab CI/CD.",
        "Calidad y Confiabilidad: Reduje el riesgo de fallos en producción mediante pruebas unitarias y de integración automatizadas con Jest (TDD) y revisiones de código rigurosas.",
      ],
      techStack: ["Node.js", "NestJS", "TypeScript", "Microservicios BFF", "AWS (EC2/S3/IAM)", "Docker", "Kubernetes", "SQL", "Jest", "GitLab CI/CD"],
    },
    {
      id: "thesis-exp",
      period: "Agosto 2025 – 2026",
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
      period: "Julio 2023 – Presente",
      role: "Ayudante de Algoritmos (UTEM) & Instructor de Inglés Técnico",
      organization: "Universidad Tecnológica Metropolitana (UTEM) & Coaching Privado",
      location: "Santiago, Chile",
      description:
        "Docencia universitaria en Algoritmos y Programación (2026–Presente) combinada con entrenamiento personalizado en inglés técnico y profesional nivel C1 para universitarios y profesionales (2023–Presente).",
      achievements: [
        "Ayudantía UTEM (2026–Presente): Mentoría en C++, Programación Orientada a Objetos (POO), estructuras de datos, complejidad algorítmica y resolución estructurada de problemas.",
        "Coaching de Inglés Técnico (2023–Presente): Preparación en fluidez oral y escrita nivel C1 para entrevistas técnicas, reuniones con equipos internacionales y documentación de ingeniería.",
      ],
      techStack: ["C++", "POO / OOP", "Estructuras de Datos", "Complejidad Algorítmica", "Inglés C1", "Mentoría"],
    },
    {
      id: "eleam-exp",
      period: "Mayo 2025 – Junio 2025",
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
      period: "Marzo 2024 – Junio 2024",
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
  ],
  en: [
    {
      id: "sgo-exp",
      period: "November 2026 – Present",
      role: "Full-Stack Developer",
      organization: "SGO • Enterprise Construction Management Platforms (LOD)",
      location: "Santiago, Chile",
      description:
        "Developing and maintaining enterprise construction and contract management platforms (Libro de Obras Digital – LOD) serving major public and private infrastructure organizations in Chile (MOP, EFE, Enel, Duoc UC) within an Agile team operating under Scrumban.",
      achievements: [
        "Backend & SSR Engineering: Building backend services with Java 21 and Spring Boot alongside server-side rendered views in JSP and Thymeleaf.",
        "Relational Query Optimization: Designing and optimizing high-volume relational queries in MariaDB for mission-critical construction and contract workflows.",
        "Automated Reliability: Ensuring production stability through comprehensive automated unit and integration tests written in Groovy and Spock.",
      ],
      techStack: ["Java 21", "Spring Boot", "JSP", "Thymeleaf", "MariaDB", "Groovy / Spock", "Scrumban", "Bitbucket"],
    },
    {
      id: "ibm-exp",
      period: "February 2025 – August 2025",
      role: "Full-Stack / Backend Software Engineer (IBM Consulting)",
      organization: "IBM Consulting • Itaú Bank Project",
      location: "Santiago, Chile",
      description:
        "Engineered mission-critical software for Itaú Bank's digital banking channels, operating under strict financial security, cloud availability, and Agile Scrum delivery standards.",
      achievements: [
        "Business Impact: Accelerated data delivery between core banking systems and web/mobile channels by designing Backend-for-Frontend (BFF) microservices with Node.js, NestJS, and TypeScript.",
        "Cloud & DevOps: Worked across AWS (EC2, S3, IAM), Docker containers, Kubernetes orchestration, SQL databases, and automated GitLab CI/CD pipelines.",
        "Reliability & Quality Assurance: Minimized production regression risks through automated unit and integration testing with Jest (TDD) and strict peer code reviews.",
      ],
      techStack: ["Node.js", "NestJS", "TypeScript", "BFF Microservices", "AWS (EC2/S3/IAM)", "Docker", "Kubernetes", "SQL", "Jest", "GitLab CI/CD"],
    },
    {
      id: "thesis-exp",
      period: "August 2025 – 2026",
      role: "Full-Stack & IoT Software Engineer (Engineering Thesis)",
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
      period: "July 2023 – Present",
      role: "Algorithms Teaching Assistant (UTEM) & Technical English Coach",
      organization: "Universidad Tecnológica Metropolitana (UTEM) & Private Coaching",
      location: "Santiago, Chile",
      description:
        "University teaching assistantship in Algorithms & Programming (2026–Present) combined with C1 technical and professional English coaching for university students and engineers (2023–Present).",
      achievements: [
        "UTEM Teaching Assistant (2026–Present): Mentoring students in C++, Object-Oriented Programming (OOP), data structures, and algorithmic complexity.",
        "Technical English Coaching (2023–Present): Training students and professionals in C1 spoken and written English for technical interviews, global team collaboration, and engineering documentation.",
      ],
      techStack: ["C++", "OOP", "Data Structures", "Algorithmic Complexity", "English C1", "Mentorship"],
    },
    {
      id: "eleam-exp",
      period: "May 2025 – June 2025",
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
      period: "March 2024 – June 2024",
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
  ],
};

export const SKILLS_CATEGORIES: Record<Language, SkillCategory[]> = {
  es: [
    {
      title: "Frontend & Experiencia de Producto",
      skills: [
        { name: "TypeScript / JavaScript", level: "Avanzado", context: "IBM • IoT • Web" },
        { name: "Next.js (App Router / SSR)", level: "Avanzado", context: "Tech Market AI" },
        { name: "React", level: "Avanzado", context: "Prod • MVVM" },
        { name: "JSP & Thymeleaf (SSR)", level: "Avanzado", context: "SGO • Prod" },
        { name: "Angular", level: "Competente", context: "IBM / Itaú" },
        { name: "Tailwind CSS", level: "Avanzado", context: "Design Systems" },
      ],
    },
    {
      title: "Backend Empresarial, IA & Microservicios",
      skills: [
        { name: "Java 21 / Spring Boot", level: "Avanzado", context: "SGO • Prod" },
        { name: "NestJS (Node.js)", level: "Especializado", context: "IBM / Itaú" },
        { name: "Arquitectura BFF & Clean Arch", level: "Avanzado", context: "IBM • UJI" },
        { name: "IA Aplicada (Gemini + RAG + Zod)", level: "Avanzado", context: "Tech Market AI" },
        { name: "MQTT & Sistemas IoT (ESP32/LoRa)", level: "Avanzado", context: "IoT Río Clarillo" },
        { name: "REST APIs & WebSockets", level: "Avanzado", context: "SGO • IBM" },
      ],
    },
    {
      title: "Bases de Datos, Cloud & Calidad",
      skills: [
        { name: "MariaDB / SQL Server / MySQL", level: "Avanzado", context: "SGO • Prod" },
        { name: "MongoDB Atlas & PostgreSQL", level: "Avanzado", context: "AI • IoT" },
        { name: "AWS (EC2/S3/IAM) & Docker / K8s", level: "Avanzado", context: "IBM / Itaú" },
        { name: "Groovy / Spock & Jest / Vitest", level: "Avanzado", context: "SGO • IBM" },
        { name: "CI/CD (GitLab / Bitbucket / GitHub)", level: "Avanzado", context: "SGO • IBM" },
      ],
    },
    {
      title: "Habilidades de Negocio & Liderazgo",
      skills: [
        { name: "Agile: Scrumban (SGO) & Scrum (IBM)", level: "Avanzado", context: "SGO • IBM" },
        { name: "Inglés Profesional (Nivel C1)", level: "Fluido", context: "Coach • UJI" },
        { name: "Adaptabilidad Internacional (España UJI)", level: "Comprobada", context: "UJI España" },
        { name: "Comunicación & Docencia Universitaria", level: "Avanzado", context: "UTEM • C++" },
      ],
    },
  ],
  en: [
    {
      title: "Frontend & Product Engineering",
      skills: [
        { name: "TypeScript / JavaScript", level: "Advanced", context: "IBM • IoT • Web" },
        { name: "Next.js (App Router / SSR)", level: "Advanced", context: "Tech Market AI" },
        { name: "React", level: "Advanced", context: "Prod • MVVM" },
        { name: "JSP & Thymeleaf (SSR)", level: "Advanced", context: "SGO • Prod" },
        { name: "Angular", level: "Proficient", context: "IBM / Itaú" },
        { name: "Tailwind CSS", level: "Advanced", context: "Design Systems" },
      ],
    },
    {
      title: "Enterprise Backend, AI & Microservices",
      skills: [
        { name: "Java 21 / Spring Boot", level: "Advanced", context: "SGO • Prod" },
        { name: "NestJS (Node.js)", level: "Specialized", context: "IBM / Itaú" },
        { name: "BFF & Clean Architecture", level: "Advanced", context: "IBM • UJI" },
        { name: "Applied AI (Gemini + RAG + Zod)", level: "Advanced", context: "Tech Market AI" },
        { name: "MQTT & IoT Systems (ESP32/LoRa)", level: "Advanced", context: "IoT Río Clarillo" },
        { name: "REST APIs & WebSockets", level: "Advanced", context: "SGO • IBM" },
      ],
    },
    {
      title: "Databases, Cloud & Quality Assurance",
      skills: [
        { name: "MariaDB / SQL Server / MySQL", level: "Advanced", context: "SGO • Prod" },
        { name: "MongoDB Atlas & PostgreSQL", level: "Advanced", context: "AI • IoT" },
        { name: "AWS (EC2/S3/IAM) & Docker / K8s", level: "Advanced", context: "IBM / Itaú" },
        { name: "Groovy / Spock & Jest / Vitest", level: "Advanced", context: "SGO • IBM" },
        { name: "CI/CD (GitLab / Bitbucket / GitHub)", level: "Advanced", context: "SGO • IBM" },
      ],
    },
    {
      title: "Business Readiness & Leadership",
      skills: [
        { name: "Agile: Scrumban (SGO) & Scrum (IBM)", level: "Advanced", context: "SGO • IBM" },
        { name: "Professional English (C1 Level)", level: "Fluent", context: "Coach • UJI" },
        { name: "International Adaptability (Spain UJI)", level: "Proven", context: "UJI Spain" },
        { name: "Technical Communication & Lecturing", level: "Advanced", context: "UTEM • C++" },
      ],
    },
  ],
};

export const EDUCATION_DATA: Record<Language, Education[]> = {
  es: [
    {
      degree: "Ingeniería Civil en Computación mención Informática (Titulado)",
      institution: "Universidad Tecnológica Metropolitana (UTEM)",
      period: "Marzo 2020 – 2026",
      location: "Santiago, Chile",
      details:
        "Titulado con formación integral en arquitectura de software, sistemas distribuidos, bases de datos y liderazgo como ayudante académico de Algoritmos y Programación.",
    },
    {
      degree: "Programa de Intercambio Internacional en Ingeniería Informática",
      institution: "Universitat Jaume I (UJI)",
      period: "Septiembre 2025 – Enero 2026",
      location: "Castellón de la Plana, España",
      details:
        "Movilidad académica internacional en Europa enfocada en ingeniería de software avanzada, principios SOLID, trabajo en equipos multiculturales y estándares globales.",
    },
  ],
  en: [
    {
      degree: "B.S. in Computer Engineering (Graduated)",
      institution: "Universidad Tecnológica Metropolitana (UTEM)",
      period: "March 2020 – 2026",
      location: "Santiago, Chile",
      details:
        "Graduated with comprehensive training in software architecture, distributed systems, database engineering, and academic leadership as an Algorithms & Programming Teaching Assistant.",
    },
    {
      degree: "Software Engineering Exchange Program",
      institution: "Universitat Jaume I (UJI)",
      period: "September 2025 – January 2026",
      location: "Castellón de la Plana, Spain",
      details:
        "European academic exchange program focused on advanced software engineering, SOLID architecture, multicultural team collaboration, and global engineering standards.",
    },
  ],
};
