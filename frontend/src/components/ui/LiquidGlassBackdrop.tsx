"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

export default function LiquidGlassBackdrop() {
  const { isGlass } = useTheme();

  if (!isGlass) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none"
      style={{ backgroundColor: "#0b0a14" }}
    >
      <style>{`
        @keyframes liquidGlassDriftA {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(2.5%, 1.8%, 0) scale(1.03); }
        }
        @keyframes liquidGlassDriftB {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-2.2%, -1.6%, 0) scale(1.025); }
        }
        .lg-field-a {
          animation: liquidGlassDriftA 26s ease-in-out infinite;
          will-change: transform;
        }
        .lg-field-b {
          animation: liquidGlassDriftB 32s ease-in-out infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .lg-field-a,
          .lg-field-b {
            animation: none !important;
          }
        }
      `}</style>

      {/* Deep dusk twilight indigo upper-left optical field */}
      <div
        className="lg-field-a absolute -top-[18%] -left-[12%] w-[72vw] h-[72vh] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(46, 36, 89, 0.56) 0%, rgba(29, 23, 54, 0.34) 45%, rgba(11, 10, 20, 0) 76%)",
        }}
      />

      {/* Muted smoky amethyst upper-right horizon */}
      <div
        className="lg-field-b absolute top-[6%] -right-[14%] w-[64vw] h-[68vh] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(64, 48, 106, 0.38) 0%, rgba(38, 28, 66, 0.24) 48%, rgba(11, 10, 20, 0) 75%)",
        }}
      />

      {/* Cool slate-steel lower-center anchor field */}
      <div
        className="lg-field-a absolute -bottom-[22%] left-[12%] w-[76vw] h-[64vh] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(24, 46, 74, 0.44) 0%, rgba(19, 32, 51, 0.24) 50%, rgba(11, 10, 20, 0) 78%)",
        }}
      />

      {/* Subtle architectural optical refraction sheen */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, transparent 38%, rgba(196, 181, 253, 0.025) 68%, transparent 100%)",
        }}
      />

      {/* Fine low-contrast structural micro-grid for frosted glass depth */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.022) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.022) 1px, transparent 1px)",
        }}
      />

      {/* Restrained edge vignette preserving crisp contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 45%, transparent 55%, rgba(7, 6, 14, 0.52) 100%)",
        }}
      />
    </div>
  );
}
