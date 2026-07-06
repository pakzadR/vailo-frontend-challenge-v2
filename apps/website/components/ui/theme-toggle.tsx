'use client';

import { MoonIcon, SunIcon } from './icons';

/**
 * Website theme switch (RULES §10 — app + website match). Uses the same
 * `pixa-theme` localStorage key as the studio, and the same convention:
 * dark is the default, `html.light` flips the tokens. The inline script in
 * layout.tsx applies the stored choice before first paint (no flash).
 *
 * Deliberately stateless: the source of truth is the `light` class on <html>,
 * and the visible icon is chosen by CSS (`[html.light_&]`), so the server and
 * client always render identical markup — no hydration mismatch.
 */
export function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
    document.documentElement.classList.toggle('light', next === 'light');
    try {
      localStorage.setItem('pixa-theme', next);
    } catch {
      /* private mode — theme just won't persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="grid size-9 place-items-center rounded-[9px] border border-border text-muted transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
    >
      <span className="hidden [html.light_&]:block">
        <MoonIcon size={16} />
      </span>
      <span className="block [html.light_&]:hidden">
        <SunIcon size={16} />
      </span>
    </button>
  );
}
