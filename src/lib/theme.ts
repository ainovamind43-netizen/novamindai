import { useCallback, useSyncExternalStore } from "react";
import { THEME_COLOR, THEME_COLOR_LIGHT } from "./seo";

export type Theme = "dark" | "light";

/**
 * Read before the first paint by the inline script in src/routes/__root.tsx, so
 * the stored choice is on <html> before anything renders. Keep the two in step:
 * a rename here without the matching edit there reintroduces the flash.
 */
export const THEME_STORAGE_KEY = "novamind-theme";

/** Fired on documentElement by applyTheme, so subscribers re-read the theme. */
const THEME_EVENT = "novamind:theme";

/**
 * Dark is the default in both senses — it is what the site wears before a
 * choice is stored, and what it falls back to when localStorage is unavailable
 * (private mode, blocked storage, JavaScript off). The `.light` class is the
 * only switch, and `:root` in styles.css is the dark palette.
 */
export function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

/** Keep the mobile browser chrome in step with the page it is framing. */
function syncThemeColor(theme: Theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "light" ? THEME_COLOR_LIGHT : THEME_COLOR);
  }
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  syncThemeColor(theme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be absent or throw when cookies are blocked. The theme still
    // applies for this page view; it just will not outlive the tab.
  }

  root.dispatchEvent(new Event(THEME_EVENT));
}

/**
 * The `storage` event fires only in *other* tabs, so the class is set directly
 * here rather than through applyTheme — calling applyTheme would write the same
 * value straight back to localStorage and bounce the event between tabs.
 */
function subscribe(onChange: () => void): () => void {
  const root = document.documentElement;

  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    const next: Theme = event.newValue === "light" ? "light" : "dark";
    root.classList.toggle("light", next === "light");
    syncThemeColor(next);
    onChange();
  };

  root.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    root.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * The server snapshot is "dark" because that is what the server rendered — the
 * `.light` class is added client-side. React therefore hydrates against the
 * markup it was given and corrects to light immediately afterwards, instead of
 * reporting a mismatch.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);

  const toggle = useCallback(() => {
    applyTheme(readTheme() === "light" ? "dark" : "light");
  }, []);

  return { theme, setTheme: applyTheme, toggle };
}
