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
  Phone,
  Copy,
  Check,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Globe2,
  Clock,
  MapPin,
  Calendar,
  MessageSquare,
  Sparkles,
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

  // Form State
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
    referenceId?: string;
    message?: string;
  } | null>(null);

  // FAQ Accordion State (3 FAQs)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
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

    const fullSubject = `[${formData.type.toUpperCase()}] ${formData.subject || (isEs ? "Consulta desde Portafolio" : "Inquiry from Portfolio")}`;

    const { data } = await api.sendContact({
      name: formData.name,
      email: formData.email,
      subject: fullSubject,
      message: formData.message,
    });

    setSubmitting(false);
    setSubmitResult({
      success: true,
      referenceId: data?.referenceId || "REF-" + Math.floor(100000 + Math.random() * 900000),
      message: isEs
        ? "¡Mensaje recibido con éxito! Me pondré en contacto contigo a la brevedad."
        : "Message received successfully! I will get back to you shortly.",
    });

    setFormData({ name: "", email: "", type: "job", subject: "", message: "" });
  };

  // Only the 3 core FAQs
  const faqs = [
    {
      q: isEs ? "¿Cuál es tu disponibilidad horaria y modalidad de trabajo?" : "What is your availability and preferred work mode?",
      a: isEs
        ? "Disponible para roles Full-Time Remotos a nivel global (con solapamiento de horario para EE.UU., Latinoamérica y Europa), o Híbridos en Santiago de Chile. Mi zona horaria base es GMT-3 (Santiago)."
        : "Open to Full-Time Remote positions worldwide (comfortable with US Eastern/Pacific, LatAm, and Europe overlap), or Hybrid roles in Santiago, Chile. Base timezone: GMT-3 (Santiago).",
    },
    {
      q: isEs ? "¿Cómo es tu nivel de inglés para entrevistas y trabajo diario?" : "What is your English proficiency level for daily communication?",
      a: isEs
        ? "Nivel C1 / Avanzado fluido. He realizado docencia particular de inglés para estudiantes universitarios, viví una experiencia de intercambio académico en España (UJI) y me comunico de forma fluida tanto oral como escrita con equipos internacionales."
        : "C1 / Advanced professional working proficiency. I have taught private English tutoring to university students, completed an academic exchange in Spain (UJI), and comfortably conduct technical interviews and daily async collaboration in English.",
    },
    {
      q: isEs ? "¿En qué tecnologías y stack te sientes más fuerte?" : "What tech stack are you most specialized in?",
      a: isEs
        ? "En el Frontend: React, Next.js (App Router), TypeScript y TailwindCSS. En el Backend: NestJS, TypeScript, patrones BFF, testing con Jest/Vitest, MQTT para IoT, y bases de datos MongoDB / PostgreSQL."
        : "Frontend: React, Next.js (App Router), TypeScript, and TailwindCSS. Backend: NestJS, TypeScript, BFF patterns, Jest/Vitest testing, MQTT for IoT, and MongoDB / PostgreSQL.",
    },
  ];

  return (
    <div className="relative bg-zinc-950 text-zinc-100 min-h-screen flex flex-col overflow-x-hidden selection:bg-emerald-500/25 selection:text-emerald-300">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative">
          
          {/* Ambient Lighting Gradients */}
          <div className="absolute -top-10 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute top-40 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isEs ? "Volver al Portafolio" : "Back to Home"}</span>
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-emerald-400 font-semibold">{isEs ? "Contacto" : "Contact"}</span>
          </div>

          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-4 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{isEs ? "Disponibilidad Inmediata & Conexión" : "Immediate Availability & Connect"}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              {isEs ? "Conversemos sobre Ingeniería & Nuevas Oportunidades" : "Let's Connect & Discuss Opportunities"}
            </h1>

            <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
              {isEs
                ? "Abierto a oportunidades como Full-Stack Software Engineer (remoto o híbrido), entrevistas técnicas y colaboraciones de arquitectura de software. Escríbeme directamente o completa el formulario."
                : "Open to Full-Stack Software Engineering roles (remote or hybrid), technical screenings, and architectural collaborations. Feel free to reach out directly or use the form below."}
            </p>
          </div>

          {/* Main Grid: Form + Direct Channels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            
            {/* Left Column: Interactive Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <SpotlightCard
                spotlightColor="rgba(16, 185, 129, 0.18)"
                className="p-6 md:p-8 border-emerald-500/30"
              >
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <h2 className="font-bold text-white text-base">
                      {isEs ? "Enviar Mensaje Directo" : "Send a Direct Message"}
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    Endpoint Serverless v1
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Email Row with generic John Doe placeholders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 font-semibold mb-1.5">
                        {isEs ? "Tu Nombre *" : "Your Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-300 font-semibold mb-1.5">
                        {isEs ? "Tu Correo Electrónico *" : "Your Email Address *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john.doe@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors font-sans"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type Selector */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 font-semibold mb-1.5">
                      {isEs ? "Motivo del Contacto" : "Inquiry Type"}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "job", label: isEs ? "Oportunidad Laboral" : "Job Opportunity" },
                        { id: "interview", label: isEs ? "Entrevista Técnica" : "Technical Interview" },
                        { id: "project", label: isEs ? "Consultoría / Otro" : "Consulting / Other" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: t.id })}
                          className={`p-2 rounded-lg text-xs font-mono transition-all text-center border cursor-pointer ${
                            formData.type === t.id
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold"
                              : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 font-semibold mb-1.5">
                      {isEs ? "Asunto" : "Subject"}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={isEs ? "Consulta técnica / Oportunidad profesional" : "Technical inquiry / Professional opportunity"}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors font-sans"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 font-semibold mb-1.5">
                      {isEs ? "Mensaje *" : "Message *"}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isEs ? "Cuéntame sobre la vacante, el proyecto o propuesta técnica..." : "Tell me about the role, project, or technical proposal..."}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors font-sans resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                      submitting
                        ? "bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed"
                        : "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-emerald-500/25 hover:scale-[1.01]"
                    }`}
                  >
                    <Send className={`w-3.5 h-3.5 ${submitting ? "animate-spin" : ""}`} />
                    <span>{submitting ? (isEs ? "Enviando mensaje..." : "Sending message...") : (isEs ? "Enviar Mensaje Directo" : "Send Direct Message")}</span>
                  </button>

                  {/* Feedback Banner */}
                  {submitResult && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-start gap-2.5 animate-fadeIn">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white mb-0.5">{submitResult.message}</div>
                        <div className="text-[10px] text-zinc-400">
                          Ref ID: <strong className="text-emerald-400">{submitResult.referenceId}</strong> • Timestamp: {new Date().toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </SpotlightCard>
            </div>

            {/* Right Column: Direct Info & Availability (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Direct Channels Card */}
              <SpotlightCard
                spotlightColor="rgba(59, 130, 246, 0.16)"
                className="p-6 border-blue-500/30 space-y-4"
              >
                <div className="text-xs font-mono uppercase font-bold text-blue-400 tracking-wider flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{isEs ? "Canales de Contacto Directo" : "Direct Contact Channels"}</span>
                </div>

                {/* Email Box */}
                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between gap-3">
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Email</span>
                    <a
                      href={`mailto:${email}`}
                      className="text-xs font-mono font-semibold text-white hover:text-emerald-400 transition-colors truncate block"
                    >
                      {email}
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy(email, "email")}
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                    title={isEs ? "Copiar correo" : "Copy email"}
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone / WhatsApp Box */}
                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between gap-3">
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Phone / WhatsApp</span>
                    <a
                      href={`https://wa.me/56952205342`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-semibold text-white hover:text-emerald-400 transition-colors truncate block"
                    >
                      {phone}
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy(phone, "phone")}
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                    title={isEs ? "Copiar teléfono" : "Copy phone"}
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Social Links Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href="https://linkedin.com/in/maguilarbarria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-blue-500/50 text-zinc-300 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-all group"
                  >
                    <svg className="w-4 h-4 fill-blue-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://github.com/JKiddo-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-emerald-500/50 text-zinc-300 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-all group"
                  >
                    <svg className="w-4 h-4 fill-emerald-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </SpotlightCard>

              {/* Working Preferences & Availability Card */}
              <SpotlightCard
                spotlightColor="rgba(16, 185, 129, 0.16)"
                className="p-6 border-emerald-500/25 space-y-3"
              >
                <div className="text-xs font-mono uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{isEs ? "Condiciones de Contratación" : "Work Preferences"}</span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/60 border border-zinc-800">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isEs ? "Disponibilidad:" : "Availability:"}</span>
                    </span>
                    <span className="text-emerald-300 font-bold">{isEs ? "Inmediata / Tiempo Completo" : "Immediate / Full-time"}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/60 border border-zinc-800">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>{isEs ? "Modalidad:" : "Work Mode:"}</span>
                    </span>
                    <span className="text-white font-bold">{isEs ? "Remoto Global o Híbrido" : "Remote Global or Hybrid"}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/60 border border-zinc-800">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" />
                      <span>{isEs ? "Ubicación:" : "Location:"}</span>
                    </span>
                    <span className="text-white font-bold">Santiago, Chile (GMT-3)</span>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FAQ ACCORDION (3 CORE QUESTIONS)                                          */}
          {/* ========================================================================= */}
          <div className="my-16">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {isEs ? "Preguntas Frecuentes para Reclutadores & Tech Leads" : "Frequently Asked Questions for Recruiters & Leads"}
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <div
                    key={idx}
                    className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800/40 transition-colors"
                    >
                      <span className="font-bold text-white text-sm md:text-base">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-4 md:p-5 pt-0 border-t border-zinc-800/60 bg-zinc-950/40 text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
