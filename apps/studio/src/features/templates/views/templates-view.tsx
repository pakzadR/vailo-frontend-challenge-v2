import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRightIcon, SearchIcon } from '@/components/icons';

// Design-only gallery: static deterministic previews, no data layer yet.
const SIZE = 512;

function previewUrl(prompt: string, seed: number): string {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux&width=${SIZE}&height=${SIZE}&seed=${seed}&nologo=true`;
}

type Category = 'Portrait' | 'Landscape' | 'Abstract' | 'Sci-fi';

interface MockCard {
  id: string;
  label: string;
  model: 'flux' | 'turbo';
  category: Category;
  seed: number;
  gradient: string;
}

const MOCK_CARDS: MockCard[] = [
  {
    id: 'jellyfish',
    label: 'Bioluminescent jellyfish drifting through a neon cyberpunk city, volumetric fog',
    model: 'flux',
    category: 'Sci-fi',
    seed: 128934,
    gradient:
      'radial-gradient(at 25% 20%,#ec4899,transparent 50%),radial-gradient(at 80% 30%,#8b5cf6,transparent 55%),#160a2e',
  },
  {
    id: 'astronaut',
    label: 'Portrait of an astronaut, holographic visor, studio lighting',
    model: 'flux',
    category: 'Portrait',
    seed: 108,
    gradient:
      'radial-gradient(at 30% 25%,#f472b6,transparent 55%),radial-gradient(at 80% 80%,#a855f7,transparent 55%),#1e0a2e',
  },
  {
    id: 'desert-temple',
    label: 'Desert temple at golden hour, sandstone arches',
    model: 'flux',
    category: 'Landscape',
    seed: 7,
    gradient:
      'radial-gradient(at 30% 30%,#fbbf24,transparent 55%),radial-gradient(at 75% 75%,#f97316,transparent 55%),#2a1206',
  },
  {
    id: 'pine-forest',
    label: 'Misty pine forest, morning fog, painterly atmosphere',
    model: 'turbo',
    category: 'Landscape',
    seed: 128,
    gradient:
      'radial-gradient(at 30% 25%,#34d399,transparent 55%),radial-gradient(at 80% 80%,#0ea5e9,transparent 55%),#062a2a',
  },
  {
    id: 'ice-cavern',
    label: 'Ice cavern with glowing crystals, deep blue',
    model: 'flux',
    category: 'Sci-fi',
    seed: 99,
    gradient:
      'radial-gradient(at 25% 20%,#60a5fa,transparent 55%),radial-gradient(at 80% 85%,#818cf8,transparent 55%),#0b1030',
  },
  {
    id: 'retro-car',
    label: 'Retro sports car on a coastal highway at sunset',
    model: 'flux',
    category: 'Landscape',
    seed: 256,
    gradient:
      'radial-gradient(at 30% 30%,#fb7185,transparent 55%),radial-gradient(at 78% 78%,#f59e0b,transparent 55%),#2a0a12',
  },
  {
    id: 'pastel-islands',
    label: 'Floating islands in a pastel sky, dreamlike',
    model: 'turbo',
    category: 'Abstract',
    seed: 512,
    gradient:
      'radial-gradient(at 25% 25%,#c084fc,transparent 55%),radial-gradient(at 80% 80%,#22d3ee,transparent 55%),#160a2e',
  },
  {
    id: 'overgrown-ruins',
    label: 'Overgrown ruins reclaimed by nature, lush vines',
    model: 'flux',
    category: 'Abstract',
    seed: 77,
    gradient:
      'radial-gradient(at 30% 25%,#4ade80,transparent 55%),radial-gradient(at 80% 80%,#facc15,transparent 55%),#0a2a10',
  },
];

type Filter = 'All' | Category;

export function TemplatesView() {
  const [filter, setFilter] = useState<Filter>('All');

  const filters = useMemo<Filter[]>(
    () => ['All', ...new Set(MOCK_CARDS.map((c) => c.category))],
    [],
  );
  const visible = filter === 'All' ? MOCK_CARDS : MOCK_CARDS.filter((c) => c.category === filter);

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-hairline bg-surface">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 pb-5 pt-5 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:pt-6 lg:px-8">
          <div>
            <p className="mb-1.5 font-mono text-[11px] tracking-widest text-brand">GALLERY</p>
            <h1 className="text-2xl font-semibold tracking-tight">Templates</h1>
            <p className="mt-1 text-[13px] text-subtle">
              Curated prompts with live previews — Use template loads one into your workspace.
            </p>
          </div>
          <label className="flex w-full items-center gap-2.5 rounded-[10px] border border-border bg-input px-3 py-2 text-subtle transition-shadow focus-within:ring-2 focus-within:ring-ring/40 sm:w-[280px]">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search prompts…"
              aria-label="Search templates"
              className="w-full bg-transparent text-[13px] text-foreground placeholder:text-subtle focus:outline-none"
            />
          </label>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-surface-deep">
        <div className="sticky top-0 z-20 border-b border-hairline bg-surface-deep/90 backdrop-blur-md">
          <div
            role="group"
            aria-label="Filter templates by category"
            className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-4 py-3 sm:px-6 lg:px-8"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`select-none rounded-full border px-4 py-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                  filter === f
                    ? 'border-brand/30 bg-brand-soft font-medium text-brand-fg shadow-[0_2px_12px_rgb(224_168_60/0.15)]'
                    : 'border-border text-muted hover:bg-input hover:text-foreground'
                }`}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto hidden font-mono text-[11px] text-subtle sm:block">
              {visible.length} {visible.length === 1 ? 'template' : 'templates'}
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8">
          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
              <SearchIcon size={20} className="text-subtle" />
              <p className="text-[13px] text-subtle">No templates in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
              {visible.map((card) => (
                <TemplateCardItem key={card.id} card={card} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Skeleton while loading → image on load → gradient fallback on error. */
function TemplateCardItem({ card }: { card: MockCard }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <article className="group relative aspect-square overflow-hidden rounded-2xl border border-border transition-all duration-300 focus-within:border-brand/50 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_24px_50px_-12px_rgb(0_0_0/0.65),0_0_24px_rgb(224_168_60/0.08)] motion-reduce:hover:translate-y-0">
      {status === 'loading' && (
        <div aria-hidden className="absolute inset-0 grid place-items-center bg-input">
          <div className="absolute inset-0 animate-shimmer" />
          <div className="z-10 size-6 animate-spin rounded-full border-2 border-brand/25 border-t-brand" />
        </div>
      )}

      {status === 'error' && (
        <span aria-hidden className="absolute inset-0" style={{ background: card.gradient }} />
      )}

      <img
        src={previewUrl(card.label, card.seed)}
        alt={card.label}
        loading="lazy"
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100 ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl ring-1 ring-inset ring-white/10"
      />

      <span className="absolute left-3 top-3 z-10 rounded-md border border-white/15 bg-black/45 px-2 py-0.5 font-mono text-[10px] tracking-wide text-white/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
        {card.model} · {card.category}
      </span>

      {status !== 'loading' && (
        <div className="absolute inset-0 z-10 flex flex-col items-stretch justify-end bg-[linear-gradient(0deg,rgba(0,0,0,0.8),rgba(0,0,0,0.25)_38%,transparent_60%)] p-3.5">
          <div className="flex translate-y-[41px] flex-col items-stretch transition-transform duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0 motion-reduce:transition-none [@media(hover:none)]:translate-y-0">
            <p className="mb-2.5 line-clamp-2 text-left text-xs leading-snug text-white/95 [text-shadow:0_1px_8px_rgb(0_0_0/0.6)]">
              {card.label}
            </p>
            <Link
              to="/workspace"
              className="flex min-h-9 items-center justify-center gap-1.5 rounded-[9px] bg-gradient-brand py-2 text-[12.5px] font-semibold text-brand-ink opacity-0 shadow-[0_4px_16px_rgb(224_168_60/0.35)] transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
            >
              <ArrowRightIcon size={13} />
              Use template
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}
