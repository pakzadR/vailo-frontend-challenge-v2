import { Link } from '@tanstack/react-router';
import { ArrowRightIcon, SearchIcon } from '@/components/icons';

/**
 * Design-only templates gallery (design §02): masonry of gradient artwork
 * cards with the hover "Use template" reveal, search box and filter chips as
 * visuals. Real data (templates.json via the shared axios client), live
 * previews and the typed-search handoff arrive in the templates feature PR.
 */
const FILTERS = ['All', 'Portrait', 'Landscape', 'Abstract', 'Sci-fi'];

const MOCK_CARDS = [
  {
    id: 'jellyfish',
    label: 'Bioluminescent jellyfish drifting through a neon cyberpunk city, volumetric fog',
    height: 230,
    gradient:
      'radial-gradient(at 25% 20%,#ec4899,transparent 50%),radial-gradient(at 80% 30%,#8b5cf6,transparent 55%),radial-gradient(at 55% 90%,#22d3ee,transparent 55%),#160a2e',
  },
  {
    id: 'astronaut',
    label: 'Portrait of an astronaut, holographic visor, studio lighting',
    height: 300,
    gradient:
      'radial-gradient(at 30% 25%,#f472b6,transparent 55%),radial-gradient(at 80% 80%,#a855f7,transparent 55%),#1e0a2e',
  },
  {
    id: 'desert-temple',
    label: 'Desert temple at golden hour, sandstone arches',
    height: 190,
    gradient:
      'radial-gradient(at 30% 30%,#fbbf24,transparent 55%),radial-gradient(at 75% 75%,#f97316,transparent 55%),#2a1206',
  },
  {
    id: 'pine-forest',
    label: 'Misty pine forest, morning fog, painterly atmosphere',
    height: 250,
    gradient:
      'radial-gradient(at 30% 25%,#34d399,transparent 55%),radial-gradient(at 80% 80%,#0ea5e9,transparent 55%),#062a2a',
  },
  {
    id: 'ice-cavern',
    label: 'Ice cavern with glowing crystals, deep blue',
    height: 210,
    gradient:
      'radial-gradient(at 25% 20%,#60a5fa,transparent 55%),radial-gradient(at 80% 85%,#818cf8,transparent 55%),#0b1030',
  },
  {
    id: 'retro-car',
    label: 'Retro sports car on a coastal highway at sunset',
    height: 280,
    gradient:
      'radial-gradient(at 30% 30%,#fb7185,transparent 55%),radial-gradient(at 78% 78%,#f59e0b,transparent 55%),#2a0a12',
  },
  {
    id: 'pastel-islands',
    label: 'Floating islands in a pastel sky, dreamlike',
    height: 230,
    gradient:
      'radial-gradient(at 25% 25%,#c084fc,transparent 55%),radial-gradient(at 80% 80%,#22d3ee,transparent 55%),#160a2e',
  },
  {
    id: 'overgrown-ruins',
    label: 'Overgrown ruins reclaimed by nature, lush vines',
    height: 200,
    gradient:
      'radial-gradient(at 30% 25%,#4ade80,transparent 55%),radial-gradient(at 80% 80%,#facc15,transparent 55%),#0a2a10',
  },
];

export function TemplatesView() {
  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-col gap-4 border-b border-hairline px-6 pb-4 pt-6 sm:flex-row sm:items-end sm:justify-between lg:px-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Templates</h1>
          <p className="mt-1 text-[13px] text-subtle">
            Curated prompts with live previews — Use template loads one into your workspace.
          </p>
        </div>
        <label className="flex w-full items-center gap-2.5 rounded-[10px] border border-border bg-input px-3 py-2 text-subtle focus-within:ring-2 focus-within:ring-ring/40 sm:w-[280px]">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search prompts…"
            aria-label="Search templates"
            className="w-full bg-transparent text-[13px] text-foreground placeholder:text-subtle focus:outline-none"
          />
        </label>
      </header>

      <div className="flex flex-wrap gap-2 px-6 pt-4 lg:px-8">
        {FILTERS.map((filter, i) => (
          <button
            key={filter}
            type="button"
            aria-pressed={i === 0}
            className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
              i === 0
                ? 'border-brand/30 bg-brand-soft font-medium text-brand-fg'
                : 'border-border text-muted hover:text-foreground'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 lg:px-8">
        <div className="columns-1 gap-4 min-[480px]:columns-2 md:columns-3 xl:columns-4">
          {MOCK_CARDS.map((card) => (
            <article
              key={card.id}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-[13px] border border-border"
              style={{ height: card.height, background: card.gradient }}
            >
              <div className="absolute inset-0 flex flex-col items-stretch justify-end bg-[linear-gradient(0deg,rgba(0,0,0,0.78),transparent_55%)] p-3.5">
                <div className="flex translate-y-[41px] flex-col items-stretch transition-transform duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0 motion-reduce:transition-none [@media(hover:none)]:translate-y-0">
                  <p className="mb-2.5 line-clamp-2 text-left text-xs leading-snug text-white/95">
                    {card.label}
                  </p>
                  <Link
                    to="/workspace"
                    className="flex items-center justify-center gap-1.5 rounded-[9px] bg-gradient-brand py-2 text-[12.5px] font-semibold text-brand-ink opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
                  >
                    <ArrowRightIcon size={13} />
                    Use template
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
