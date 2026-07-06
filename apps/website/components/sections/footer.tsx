import { SparkleIcon } from '@/components/ui/icons';

const FOOTER_LINKS = ['Privacy', 'Terms', 'GitHub', 'Twitter'];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline px-6 py-10 sm:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Same lockup as the header, scaled down. */}
        <div className="flex items-center gap-2.5">
          <span className="grid size-6 place-items-center rounded-[7px] bg-gradient-brand text-brand-ink">
            <SparkleIcon size={12} />
          </span>
          <span className="text-[13px] font-semibold tracking-tight text-foreground">Pixa</span>
          <span className="text-[13px] text-subtle">© 2026 Pixa Labs</span>
        </div>
        <ul className="flex gap-6 text-[13px] text-subtle">
          {FOOTER_LINKS.map((link) => (
            <li key={link}>
              <a href="#" className="transition-colors hover:text-foreground">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
