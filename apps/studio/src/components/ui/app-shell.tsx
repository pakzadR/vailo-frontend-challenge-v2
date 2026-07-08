import type { ComponentType, ReactNode } from 'react';
import { useIsFetching } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { GridIcon, MoonIcon, SparkleIcon, SunIcon, WandIcon } from './icons';
import { Tooltip } from './tooltip';
import { generationKeys } from '@/features/generation/hooks/keys-hooks';
import { useThemeStore } from '@/lib/theme-store';

const NAV: Array<{
  to: '/workspace' | '/templates';
  label: string;
  Icon: ComponentType<{ size?: number }>;
}> = [
  { to: '/workspace', label: 'Workspace', Icon: WandIcon },
  { to: '/templates', label: 'Templates', Icon: GridIcon },
];

export function AppShell({ children }: { children: ReactNode }) {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);
  const isGenerating = useIsFetching({ queryKey: generationKeys.all }) > 0;

  return (
    <div className="flex h-full">
      <aside className="flex w-[60px] shrink-0 flex-col items-center border-r border-hairline bg-elevated py-4">
        <div className="grid size-8 place-items-center rounded-[9px] bg-gradient-brand text-brand-ink">
          <SparkleIcon size={16} />
        </div>

        <nav className="mt-7 flex flex-1 flex-col items-center gap-1.5">
          {NAV.map(({ to, label, Icon }) => (
            <Tooltip key={to} label={label} side="right">
              <Link
                to={to}
                className="relative grid size-10 place-items-center rounded-[10px] transition-colors"
                activeProps={{
                  className: 'border border-brand/35 bg-brand-soft text-brand-fg',
                }}
                inactiveProps={{
                  className: 'text-subtle hover:bg-input hover:text-foreground',
                }}
              >
                <Icon size={19} />
                {to === '/workspace' && isGenerating && (
                  <span
                    aria-hidden
                    className="absolute right-1.5 top-1.5 size-1.5 animate-pulse rounded-full bg-brand motion-reduce:animate-none"
                  />
                )}
                <span className="sr-only">{label}</span>
              </Link>
            </Tooltip>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-3.5">
          <Tooltip
            label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            side="right"
          >
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid size-10 place-items-center rounded-[10px] text-muted transition-colors hover:bg-input hover:text-foreground"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </Tooltip>
          <div
            aria-hidden
            className="size-7 rounded-full border border-border bg-[linear-gradient(135deg,#334155,#0f172a)]"
          />
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
