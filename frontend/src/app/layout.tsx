import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://jkiddo-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Matías Aguilar | Full-Stack Software Engineer — Java/Spring, NestJS & Cloud",
    template: "%s | Matías Aguilar",
  },
  description:
    "Full-Stack Software Engineer (B.S. Computer Engineering, UTEM). Building enterprise Java 21 / Spring Boot / MariaDB platforms at SGO, with prior banking microservices experience at IBM Consulting (Itaú Bank, NestJS BFF), IoT LoRa Mesh telemetry, and AI/ETL vector pipelines.",
  keywords: [
    "Matías Aguilar",
    "Matías Osvaldo Aguilar Barría",
    "Full-Stack Software Engineer",
    "Java 21",
    "Spring Boot",
    "MariaDB",
    "NestJS",
    "TypeScript",
    "Next.js",
    "BFF Architecture",
    "IBM Consulting",
    "Banco Itaú",
    "SGO",
    "IoT LoRa Mesh",
    "RAG ETL",
    "Chile Software Engineer",
  ],
  authors: [{ name: "Matías Osvaldo Aguilar Barría", url: SITE_URL }],
  creator: "Matías Osvaldo Aguilar Barría",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: "Matías Aguilar — Software Engineering Portfolio",
    title:
      "Matías Aguilar | Full-Stack Software Engineer — Java/Spring, NestJS & Cloud",
    description:
      "Enterprise Java 21 / Spring Boot / MariaDB (SGO), NestJS BFF banking microservices (IBM Consulting / Itaú Bank), IoT LoRa Mesh, and $0-cost AI/ETL vector pipelines.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Matías Aguilar | Full-Stack Software Engineer — Java/Spring, NestJS & Cloud",
    description:
      "Enterprise Java 21 / Spring Boot (SGO), NestJS BFF microservices (IBM / Itaú), IoT LoRa Mesh, and AI/ETL vector systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Matías Osvaldo Aguilar Barría",
  alternateName: "Matías Aguilar",
  url: SITE_URL,
  jobTitle: "Full-Stack Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "SGO",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Universidad Tecnológica Metropolitana (UTEM)",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Universitat Jaume I (UJI)",
    },
  ],
  sameAs: [
    "https://github.com/JKiddo-dev",
    "https://linkedin.com/in/maguilarbarria",
  ],
  knowsAbout: [
    "Java 21",
    "Spring Boot",
    "TypeScript",
    "NestJS",
    "Next.js",
    "MariaDB",
    "PostgreSQL",
    "MongoDB",
    "Microservices",
    "Backend-for-Frontend (BFF)",
    "Docker",
    "AWS",
    "IoT LoRa Mesh",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="glass"
      className={`${geistSans.variable} ${geistMono.variable} glass h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-300 antialiased transition-colors duration-300"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
