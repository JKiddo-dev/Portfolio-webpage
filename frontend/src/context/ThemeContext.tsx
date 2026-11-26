"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { flushSync } from "react-dom";

export type Theme = "dark" | "light" | "glass" | "neumorphism";

export interface ThemeTransitionOrigin {
  x: number;
  y: number;
}

interface ViewTransitionLike {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition?: () => void;
}

type DocumentWithViewTransition = Document & {
  startViewTransition?: (updateCallback: () => void) => ViewTransitionLike;
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme, origin?: ThemeTransitionOrigin) => void;
  isDark: boolean;
  isGlass: boolean;
  isNeumorphism: boolean;
}

const STORAGE_KEY = "portfolio_theme";
const THEME_EVENT = "portfolio-theme-change";
const FALLBACK_TRANSITION_MS = 280;

function isValidTheme(value: string | null): value is Theme {
  return (
    value === "dark" ||
    value === "light" ||
    value === "glass" ||
    value === "neumorphism"
  );
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "glass";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return isValidTheme(saved) ? saved : "glass";
  } catch {
    return "glass";
  }
}

function getServerThemeSnapshot(): Theme {
  return "glass";
}

function subscribeTheme(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(THEME_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(THEME_EVENT, handler);
  };
}

function applyThemeToDocument(t: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  root.classList.remove("dark", "light", "glass", "neumorphism");
  root.classList.add(t);
}

function commitThemeChange(newTheme: Theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, newTheme);
  } catch {
    // Ignore storage quota or private-mode errors
  }
  applyThemeToDocument(newTheme);
  window.dispatchEvent(new Event(THEME_EVENT));
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const activeTransitionRef = useRef<ViewTransitionLike | null>(null);
  const transitionSeqRef = useRef<number>(0);
  const fallbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      document.documentElement.classList.remove("theme-fallback-transition");
      document.documentElement.removeAttribute("data-theme-transitioning");
    };
  }, []);

  const setTheme = useCallback(
    (newTheme: Theme, origin?: ThemeTransitionOrigin) => {
      if (newTheme === theme) return;

      const root = document.documentElement;
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        activeTransitionRef.current?.skipTransition?.();
        activeTransitionRef.current = null;
        if (fallbackTimerRef.current !== null) {
          window.clearTimeout(fallbackTimerRef.current);
          fallbackTimerRef.current = null;
        }
        root.classList.remove("theme-fallback-transition");
        root.removeAttribute("data-theme-transitioning");
        commitThemeChange(newTheme);
        return;
      }

      const doc = document as DocumentWithViewTransition;

      if (typeof doc.startViewTransition === "function") {
        if (fallbackTimerRef.current !== null) {
          window.clearTimeout(fallbackTimerRef.current);
          fallbackTimerRef.current = null;
          root.classList.remove("theme-fallback-transition");
        }

        activeTransitionRef.current?.skipTransition?.();
        const seq = ++transitionSeqRef.current;

        root.setAttribute("data-theme-transitioning", "true");

        let transition: ViewTransitionLike;
        try {
          transition = doc.startViewTransition(() => {
            flushSync(() => {
              commitThemeChange(newTheme);
            });
          });
        } catch {
          if (transitionSeqRef.current === seq) {
            root.removeAttribute("data-theme-transitioning");
          }
          commitThemeChange(newTheme);
          return;
        }

        activeTransitionRef.current = transition;

        void transition.ready
          .then(() => {
            if (transitionSeqRef.current !== seq) return;
            const x = origin?.x ?? window.innerWidth - 48;
            const y = origin?.y ?? 32;
            const endRadius = Math.hypot(
              Math.max(x, window.innerWidth - x),
              Math.max(y, window.innerHeight - y)
            );

            root.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 460,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
          })
          .catch(() => {
            // Transition skipped or aborted by a newer click
          });

        void transition.finished
          .catch(() => {
            // Suppress abort rejections on rapid switches
          })
          .finally(() => {
            if (transitionSeqRef.current === seq) {
              activeTransitionRef.current = null;
              root.removeAttribute("data-theme-transitioning");
            }
          });

        return;
      }

      // Synchronized CSS fallback for browsers without View Transitions API
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
      }
      root.classList.add("theme-fallback-transition");
      commitThemeChange(newTheme);
      fallbackTimerRef.current = window.setTimeout(() => {
        root.classList.remove("theme-fallback-transition");
        fallbackTimerRef.current = null;
      }, FALLBACK_TRANSITION_MS);
    },
    [theme]
  );

  const toggleTheme = useCallback(() => {
    const next: Theme =
      theme === "glass"
        ? "dark"
        : theme === "dark"
          ? "light"
          : theme === "light"
            ? "neumorphism"
            : "glass";
    setTheme(next);
  }, [theme, setTheme]);

  const wrapperClass =
    theme === "light"
      ? "theme-light"
      : theme === "glass"
        ? "theme-glass"
        : theme === "neumorphism"
          ? "theme-neumorphism"
          : "theme-dark";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isDark: theme === "dark" || theme === "glass",
        isGlass: theme === "glass",
        isNeumorphism: theme === "neumorphism",
      }}
    >
      <div className={wrapperClass}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
