import { create } from 'zustand';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'pixa-theme';

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

function apply(theme: Theme) {
  // Dark is the default (no class); the `light` class flips the tokens.
  document.documentElement.classList.toggle('light', theme === 'light');
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
