import { create } from 'zustand';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'pixa-theme';

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
}

interface ThemeState {
  theme: Theme;
  toggle: () => void;
  setTheme: (theme: Theme) => void;
}

/**
 * App-level UI state (RULES §3 — Zustand where a store earns it). The initial
 * value is read from the DOM, which the inline script in index.html sets before
 * first paint, so there is no flash of the wrong theme.
 */
export const useThemeStore = create<ThemeState>((set) => ({
  theme: readInitialTheme(),
  toggle: () =>
    set((s) => {
      const next: Theme = s.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      return { theme: next };
    }),
  setTheme: (theme) => {
    apply(theme);
    set({ theme });
  },
}));
