"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { usePortfolio } from "@/hooks/usePortfolio";
import { api } from "@/services/api";
import {
  Mail,
  Copy,
  Check,
  Send,
  CheckCircle2,
  ArrowLeft,
  Globe2,
  Clock,
  MapPin,
  MessageSquare,
  Briefcase,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ContactoPage() {
  const { language } = usePortfolio();
  const isEs = language === "es";

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = "m.oaguilarbarria@gmail.com";
  const phone = "(+56) 9 5220 5342";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "job",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    referenceId: string;
    message: string;
    timestamp: string;
  } | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopy = (text: string, type: "email" | "phone") => {
    void navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setSubmitResult(null);

    const fullSubject = `[${formData.type.toUpperCase()}] ${
      formData.subject ||
      (isEs ? "Consulta desde Portafolio" : "Inquiry from Portfolio")
    }`;

    const { data } = await api.sendContact({
      name: formData.name,
      email: formData.email,
      subject: fullSubject,
      message: formData.message,
    });

    setSubmitting(false);
    setSubmitResult({
      success: true,
      referenceId:
        data?.referenceId ||
        `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      message: isEs
        ? "Mensaje recibido con éxito. Me pondré en contacto contigo a la brevedad."
        : "Message received successfully. I will get back to you shortly.",
      timestamp: new Date().toLocaleTimeString(),
    });

    setFormData({
      name: "",
      email: "",
      type: "job",
      subject: "",
      message: "",
    });
  };

  const inquiryTypes = [
    { id: "job", label: isEs ? "Oportunidad Laboral" : "Job Opportunity" },
    { id: "interview", label: isEs ? "Entrevista Técnica" : "Tech Interview" },
    { id: "project", label: isEs ? "General / Otro" : "General / Other" },
  ];

  const faqs = [
    {
      q: isEs
        ? "¿Cuál es tu disponibilidad horaria y modalidad de trabajo?"
        : "What is your availability and preferred work mode?",
      a: isEs
        ? "Disponible para roles Full-Time Remotos a nivel global (con solapamiento de horario para EE.UU., Latinoamérica y Europa), o Híbridos en Santiago de Chile. Mi zona horaria base es GMT-3 (Santiago)."
        : "Open to Full-Time Remote positions worldwide (comfortable with US Eastern/Pacific, LatAm, and Europe overlap), or Hybrid roles in Santiago, Chile. Base timezone: GMT-3 (Santiago).",
    },
    {
      q: isEs
        ? "¿Cómo es tu nivel de inglés para entrevistas y trabajo diario?"
        : "What is your English proficiency level for daily communication?",
      a: isEs
        ? "Nivel C1 / Avanzado fluido. He realizado docencia particular de inglés para estudiantes universitarios, viví una experiencia de intercambio académico en España (UJI) y me comunico de forma fluida tanto oral como escrita con equipos internacionales."
        : "C1 / Advanced professional working proficiency. I have taught private English tutoring to university students, completed an academic exchange in Spain (UJI), and comfortably conduct technical interviews and daily async collaboration in English.",
    },
    {
      q: isEs
        ? "¿En qué tecnologías y stack te sientes más fuerte?"
        : "What tech stack are you most specialized in?",
      a: isEs
        ? "En el Backend: Java 21 / Spring Boot (SGO), NestJS y TypeScript (patrones BFF), testing automatizado con Groovy/Spock y Jest/Vitest, MQTT para IoT y bases de datos MariaDB, PostgreSQL y MongoDB. En el Frontend: React, Next.js (App Router), JSP/Thymeleaf (SSR), TypeScript y Tailwind CSS."
        : "Backend: Java 21 / Spring Boot (SGO), NestJS and TypeScript (BFF patterns), automated testing with Groovy/Spock and Jest/Vitest, MQTT for IoT, and MariaDB, PostgreSQL, and MongoDB. Frontend: React, Next.js (App Router), JSP/Thymeleaf (SSR), TypeScript, and Tailwind CSS.",
    },
  ];

  return (
    <div className="relative bg-zinc-950 text-zinc-100 min-h-screen flex flex-col overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-300 transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:px-3 focus:py-2 focus:rounded-md focus:bg-[var(--btn-primary-bg)] focus:text-[var(--btn-primary-fg)] focus:font-mono focus:text-xs focus:font-semibold"
      >
        {isEs ? "Ir al contenido principal" : "Skip to content"}
      </a>

      <Navbar />

      <main id="main-content" className="flex-1 pt-24 sm:pt-28 pb-20">
        {/* Hero + Contact Grid */}
        <section className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full pb-16">
          <nav
            aria-label={isEs ? "Ruta de navegación" : "Breadcrumb"}
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-6"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isEs ? "Volver al Portafolio" : "Back to Home"}</span>
            </Link>
            <span className="text-zinc-600" aria-hidden="true">
              /
            </span>
            <span className="text-emerald-400 font-semibold">
              {isEs ? "Contacto" : "Contact"}
            </span>
          </nav>

          <div className="mb-10">
            <div className="section-eyebrow mb-3">
              <span>
                {isEs ? "01 / CONTACTO DIRECTO" : "01 / DIRECT CONTACT"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4 leading-[1.08] max-w-3xl">
              {isEs
                ? "Conversemos sobre Ingeniería de Software"
                : "Let's Talk Software Engineering"}
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              {isEs
                ? "Si quieres conocer más sobre mi trabajo actual en SGO, mi paso por IBM/Itaú, alguno de mis proyectos o simplemente conectar, puedes escribirme directo o usar el formulario."
                : "If you'd like to learn more about my work at SGO, my time at IBM/Itaú, any of my projects, or simply connect, feel free to reach out directly or use the form below."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-7">
              <SpotlightCard className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <h2 className="font-semibold text-white text-base">
                      {isEs ? "Enviar Mensaje Directo" : "Send a Direct Message"}
                    </h2>
                  </div>
                  <span className="badge-accent">POST /api/v1/contact</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contacto-name"
                        className="block text-xs font-mono text-zinc-300 font-semibold mb-1.5"
                      >
                        {isEs ? "Tu Nombre *" : "Your Name *"}
                      </label>
                      <input
                        id="contacto-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-md bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contacto-email"
                        className="block text-xs font-mono text-zinc-300 font-semibold mb-1.5"
                      >
                        {isEs
                          ? "Tu Correo Electrónico *"
                          : "Your Email Address *"}
                      </label>
                      <input
                        id="contacto-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john.doe@example.com"
                        className="w-full px-3.5 py-2.5 rounded-md bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type Selector */}
                  <div>
                    <span className="block text-xs font-mono text-zinc-300 font-semibold mb-1.5">
                      {isEs ? "Motivo del Contacto" : "Inquiry Type"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {inquiryTypes.map((item) => {
                        const isSelected = formData.type === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() =>
                              setFormData({ ...formData, type: item.id })
                            }
                            className={`px-3 py-2 rounded-md text-xs font-mono transition-colors text-center border cursor-pointer ${
                              isSelected
                                ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] border-transparent font-semibold"
                                : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:bg-[var(--surface-subtle)] hover:text-white"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contacto-subject"
                      className="block text-xs font-mono text-zinc-300 font-semibold mb-1.5"
                    >
                      {isEs ? "Asunto" : "Subject"}
                    </label>
                    <input
                      id="contacto-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder={
                        isEs
                          ? "Consulta técnica / Oportunidad profesional"
                          : "Technical inquiry / Professional opportunity"
                      }
                      className="w-full px-3.5 py-2.5 rounded-md bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contacto-message"
                      className="block text-xs font-mono text-zinc-300 font-semibold mb-1.5"
                    >
                      {isEs ? "Mensaje *" : "Message *"}
                    </label>
                    <textarea
                      id="contacto-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={
                        isEs
                          ? "Cuéntame sobre la vacante, el proyecto o propuesta técnica..."
                          : "Tell me about the role, project, or technical proposal..."
                      }
                      className="w-full px-3.5 py-2.5 rounded-md bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full h-11 text-xs font-mono cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send
                      className={`w-3.5 h-3.5 ${submitting ? "animate-spin" : ""}`}
                    />
                    <span>
                      {submitting
                        ? isEs
                          ? "Enviando mensaje..."
                          : "Sending message..."
                        : isEs
                          ? "Enviar Mensaje Directo"
                          : "Send Direct Message"}
                    </span>
                  </button>

                  {submitResult && (
                    <div
                      role="status"
                      className="p-3.5 rounded-md bg-zinc-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-400 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white mb-0.5">
                          {submitResult.message}
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          Ref ID:{" "}
                          <strong className="text-emerald-400">
                            {submitResult.referenceId}
                          </strong>{" "}
                          • {submitResult.timestamp}
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </SpotlightCard>
            </div>

            {/* Right Column: Direct Channels & Work Preferences */}
            <div className="lg:col-span-5 space-y-4">
              <SpotlightCard className="p-6 space-y-4">
                <div className="text-xs font-mono uppercase font-semibold text-emerald-400 tracking-wider flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>
                    {isEs
                      ? "Canales de Contacto Directo"
                      : "Direct Contact Channels"}
                  </span>
                </div>

                {/* Email */}
                <div className="p-3.5 rounded-md bg-zinc-950/70 border border-zinc-800 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">
                      Email
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="text-xs font-mono font-semibold text-white hover:text-emerald-400 transition-colors truncate block"
                    >
                      {email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(email, "email")}
                    className="h-8 w-8 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-[var(--surface-subtle)] text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    title={isEs ? "Copiar correo" : "Copy email"}
                    aria-label={isEs ? "Copiar correo" : "Copy email"}
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Phone / WhatsApp */}
                <div className="p-3.5 rounded-md bg-zinc-950/70 border border-zinc-800 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">
                      Phone / WhatsApp
                    </span>
                    <a
                      href="https://wa.me/56952205342"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-semibold text-white hover:text-emerald-400 transition-colors truncate block"
                    >
                      {phone}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(phone, "phone")}
                    className="h-8 w-8 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-[var(--surface-subtle)] text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    title={isEs ? "Copiar teléfono" : "Copy phone"}
                    aria-label={isEs ? "Copiar teléfono" : "Copy phone"}
                  >
                    {copiedPhone ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <a
                    href="https://linkedin.com/in/maguilarbarria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary h-10 text-xs font-mono"
                  >
                    <svg
                      className="w-3.5 h-3.5 fill-current text-emerald-400"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://github.com/JKiddo-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary h-10 text-xs font-mono"
                  >
                    <svg
                      className="w-3.5 h-3.5 fill-current text-emerald-400"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </SpotlightCard>

              {/* Work Preferences */}
              <SpotlightCard className="p-6 space-y-3">
                <div className="text-xs font-mono uppercase font-semibold text-emerald-400 tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>
                    {isEs ? "Modalidad & Contexto" : "Work Preferences"}
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-md bg-zinc-950/70 border border-zinc-800">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isEs ? "Estado actual:" : "Current Role:"}</span>
                    </span>
                    <span className="text-emerald-400 font-semibold text-right">
                      {isEs
                        ? "Full-Stack @ SGO • Abierto a conversar"
                        : "Full-Stack @ SGO • Open to connect"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-md bg-zinc-950/70 border border-zinc-800">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isEs ? "Modalidad:" : "Work Mode:"}</span>
                    </span>
                    <span className="text-white font-semibold text-right">
                      {isEs
                        ? "Remoto Global o Híbrido"
                        : "Remote Global or Hybrid"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-md bg-zinc-950/70 border border-zinc-800">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isEs ? "Ubicación:" : "Location:"}</span>
                    </span>
                    <span className="text-white font-semibold text-right">
                      Santiago, Chile (GMT-3)
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="border-t border-zinc-800/80 py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
            <div className="mb-8">
              <div className="section-eyebrow mb-2">
                <span>
                  {isEs
                    ? "02 / PREGUNTAS FRECUENTES"
                    : "02 / FREQUENTLY ASKED QUESTIONS"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <div
                    key={faq.q}
                    className="rounded-lg bg-zinc-900/70 border border-zinc-800 overflow-hidden transition-colors duration-150"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--surface-subtle)] transition-colors"
                    >
                      <span className="font-semibold text-white text-sm sm:text-base">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-4 border-t border-zinc-800 bg-[var(--surface-subtle)] text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
