import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { useThemeStore } from '@/lib/theme-store';

const NAV = [
  { to: '/workspace', label: 'Workspace', icon: '✦' },
  { to: '/templates', label: 'Templates', icon: '▦' },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);

  return (
    <div className="flex h-full">
      <aside className="flex w-16 shrink-0 flex-col items-center gap-2 border-r border-border bg-card py-4">
        <div className="mb-4 grid size-9 place-items-center rounded-lg bg-brand-600 font-bold text-white">
          P
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="grid size-10 place-items-center rounded-lg text-lg transition-colors"
              activeProps={{ className: 'bg-brand-600 text-white' }}
              inactiveProps={{
                className: 'text-muted-foreground hover:bg-muted hover:text-foreground',
              }}
              title={item.label}
            >
              <span aria-hidden>{item.icon}</span>
              <span className="sr-only">{item.label}</span>
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggle}
          className="grid size-10 place-items-center rounded-lg text-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="Toggle theme"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </aside>

      <main className="min-w-0 flex-1 overflow-auto">{children}</main>
    </div>
  );
}
