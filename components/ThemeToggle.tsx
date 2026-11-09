"use client";

import { THEME_KEY, type Theme } from "@/lib/theme";

function effectiveTheme(): Theme {
  const stored = document.documentElement.dataset.theme;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function toggle() {
  const next: Theme = effectiveTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {}
}

export function ThemeToggle() {
  return (
    <button type="button" className="theme-toggle" onClick={toggle}>
      <span className="to-light">
        <span aria-hidden="true">☀ </span>
        <span className="sr-only">Switch to </span>Light
        <span className="sr-only"> mode</span>
      </span>
      <span className="to-dark">
        <span aria-hidden="true">☾ </span>
        <span className="sr-only">Switch to </span>Dark
        <span className="sr-only"> mode</span>
      </span>
    </button>
  );
}
