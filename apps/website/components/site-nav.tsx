import { SparkleIcon } from './icons';
import { ThemeToggle } from './theme-toggle';
import { NAV_LINKS, STUDIO_URL } from '@/lib/site-data';

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 sm:px-12">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid size-[30px] place-items-center rounded-lg bg-gradient-brand text-brand-ink">
            <SparkleIcon size={15} />
          </span>
          <span className="text-base font-semibold tracking-tight">Pixa</span>
        </a>

        <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[13.5px] text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a
            href={STUDIO_URL}
            className="rounded-[9px] bg-gradient-brand px-[18px] py-[9px] text-[13.5px] font-semibold text-brand-ink shadow-[0_6px_20px_rgb(224_168_60/0.35)] transition-transform hover:scale-[1.02]"
          >
            Open Studio
          </a>
        </div>
      </nav>
    </header>
  );
}
