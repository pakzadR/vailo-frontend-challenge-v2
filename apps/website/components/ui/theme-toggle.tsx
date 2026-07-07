'use client';

import { MoonIcon, SunIcon } from './icons';

/**
 * Same `pixa-theme` key as the studio. The html.light class is the source of
 * truth and CSS picks the icon, so server/client markup always match.
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
