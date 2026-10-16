"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const isLight = mounted && resolvedTheme === "light";

  function toggleTheme() {
    setTheme(isLight ? "dark" : "light");
  }

  return (
    <button
      type="button"
      role="switch"
      aria-label="Mode terang"
      aria-checked={isLight}
      disabled={!mounted}
      onClick={toggleTheme}
      className="hok-theme-toggle"
      title={isLight ? "Aktifkan dark mode" : "Aktifkan light mode"}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="hok-theme-toggle__icon"
      >
        <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
      </svg>

      <span className="hok-theme-toggle__track" aria-hidden="true">
        <span className="hok-theme-toggle__thumb" />
      </span>

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        aria-hidden="true"
        className="hok-theme-toggle__icon"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
      </svg>

      <span className="hok-theme-toggle__label">
        {mounted ? (isLight ? "Light" : "Dark") : "Tema"}
      </span>
    </button>
  );
}
