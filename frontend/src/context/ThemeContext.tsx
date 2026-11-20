"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

export type Theme = "dark" | "light" | "glass";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  isGlass: boolean;
}

const STORAGE_KEY = "portfolio_theme";
const THEME_EVENT = "portfolio-theme-change";

function isValidTheme(value: string | null): value is Theme {
  return value === "dark" || value === "light" || value === "glass";
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
  root.classList.remove("dark", "light", "glass");
  root.classList.add(t);
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore storage quota or private-mode errors
    }
    applyThemeToDocument(newTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme =
      theme === "dark" ? "light" : theme === "light" ? "glass" : "dark";
    setTheme(next);
  }, [theme, setTheme]);

  const wrapperClass =
    theme === "light"
      ? "theme-light transition-colors duration-150"
      : theme === "glass"
        ? "theme-glass transition-colors duration-150"
        : "theme-dark transition-colors duration-150";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isDark: theme !== "light",
        isGlass: theme === "glass",
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
