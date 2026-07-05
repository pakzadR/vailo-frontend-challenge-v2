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
      <aside className="flex w-[60px] shrink-0 flex-col items-center gap-5 border-r border-hairline bg-elevated py-4">
        <div className="grid size-8 place-items-center rounded-[9px] bg-gradient-brand text-[15px] font-bold text-brand-ink">
          ✦
        </div>

        <nav className="flex flex-1 flex-col gap-1.5">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="grid size-10 place-items-center rounded-[10px] text-lg transition-colors"
              activeProps={{ className: 'bg-brand-soft text-brand-fg' }}
              inactiveProps={{ className: 'text-subtle hover:bg-input hover:text-foreground' }}
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
          className="grid size-10 place-items-center rounded-[10px] text-lg text-muted transition-colors hover:bg-input hover:text-foreground"
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
