"use client";

import { useEffect, useState } from "react";
import { THEME_KEY, type Theme } from "@/lib/theme";

function effectiveTheme(): Theme {
  const stored = document.documentElement.dataset.theme;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(effectiveTheme());
  }, []);

  function toggle() {
    const next: Theme = effectiveTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    setTheme(next);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : undefined}
      onClick={toggle}
    >
      <span className="to-light">
        <span aria-hidden="true">☀</span> Light
      </span>
      <span className="to-dark">
        <span aria-hidden="true">☾</span> Dark
      </span>
    </button>
  );
}
