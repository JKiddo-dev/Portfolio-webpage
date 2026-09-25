"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { api } from "@/services/api";
import { Mail, Phone, Copy, Check, Terminal, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function FooterSection() {
  const { t, language } = usePortfolio();
  const isEs = language === "es";

  const [copied, setCopied] = useState(false);
  const email = "m.oaguilarbarria@gmail.com";
  const phone = "(+56) 9 5220 5342";

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    referenceId?: string;
    message?: string;
  } | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setSubmitResult(null);

    const { data, isLive } = await api.sendContact({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || (isEs ? "Contacto desde Portafolio" : "Contact from Portfolio"),
      message: formData.message,
    });

    setSubmitting(false);
    setSubmitResult({
      success: true,
      referenceId: data.referenceId,
      message: isEs
        ? "¡Mensaje enviado con éxito al backend en NestJS! Me pondré en contacto contigo pronto."
        : "Message successfully submitted to NestJS backend! I'll get back to you shortly.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <footer id="contact" className="border-t border-zinc-900 bg-zinc-950/90 pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          {t.footer.badge}
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 max-w-2xl leading-tight">
          {t.footer.title}
        </h2>

        <p className="text-zinc-400 max-w-md mb-12 text-sm md:text-base leading-relaxed">
          {t.footer.subtitle}
        </p>

        {/* Interactive Contact Form (connected to NestJS POST /api/v1/contact) */}
        <div className="w-full max-w-xl text-left bg-zinc-900/60 border border-zinc-800/90 rounded-2xl p-6 md:p-8 backdrop-blur-xl mb-12 shadow-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-4 flex items-center justify-between">
            <span>{isEs ? "Canal de Contacto (API NestJS)" : "Contact Channel (NestJS API)"}</span>
            <span className="text-zinc-500 font-normal">POST /api/v1/contact</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  {isEs ? "Tu Nombre *" : "Your Name *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Carolina Méndez"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  {isEs ? "Tu Email *" : "Your Email *"}
                </label>
                <input
                  type="email"
                  required
                  placeholder="carolina@empresa.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                {isEs ? "Asunto" : "Subject"}
              </label>
              <input
                type="text"
                placeholder={isEs ? "Consulta técnica / Oportunidad profesional" : "Technical inquiry / Professional opportunity"}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                {isEs ? "Mensaje *" : "Message *"}
              </label>
              <textarea
                required
                rows={3}
                placeholder={
                  isEs
                    ? "Cuéntame sobre tu proyecto o equipo..."
                    : "Tell me about your project or team..."
                }
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors font-sans resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs font-mono transition-all shadow-lg shadow-emerald-500/15 disabled:opacity-50 cursor-pointer"
            >
              <Send className={`w-3.5 h-3.5 ${submitting ? "animate-spin" : ""}`} />
              <span>
                {submitting
                  ? isEs
                    ? "Validando en NestJS..."
                    : "Validating with NestJS..."
                  : isEs
                  ? "Enviar Mensaje Directo"
                  : "Send Message via NestJS API"}
              </span>
            </button>

            {submitResult && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">{submitResult.message}</div>
                  <div className="text-[10px] text-zinc-400 mt-1">
                    Ref ID: <span className="text-zinc-200">{submitResult.referenceId}</span>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Direct Contact links */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white transition-all text-xs font-mono"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>{email}</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all text-xs font-mono cursor-pointer"
            title="Copiar email"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t.footer.copied : (isEs ? "Copiar" : "Copy")}</span>
          </button>

          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all text-xs font-mono"
            title="Llamar o WhatsApp"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{phone}</span>
          </a>

          {/* GitHub SVG -> JKiddo-dev */}
          <a
            href="https://github.com/JKiddo-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all"
            aria-label="GitHub JKiddo-dev"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>

          {/* LinkedIn SVG */}
          <a
            href="https://linkedin.com/in/maguilarbarria"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all"
            aria-label="LinkedIn"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>

        {/* Footer bottom meta */}
        <div className="w-full pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-zinc-500 gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.footer.rights}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Next.js 16 (App Router)</span>
            <span>•</span>
            <span>Tailwind v4</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">NestJS Live Connected</span>
          </div>
        </div>
      </div>
    </footer>
  );
}