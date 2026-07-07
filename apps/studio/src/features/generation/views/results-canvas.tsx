import { useState } from 'react';
import { AlertIcon, DownloadIcon, ExpandIcon } from '@/components/icons';
import { Tooltip } from '@/components/tooltip';
import { seedGradient } from './gradients';

// Static canvas mock: two loaded, one pending, one failed.
const MOCK_PROMPT =
  'A bioluminescent jellyfish drifting through a neon cyberpunk city, volumetric fog, cinematic lighting';
const SEEDS = [128934, 128935];
const SIZE = 768;

function urlFor(seed: number): string {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(MOCK_PROMPT)}?model=flux&width=${SIZE}&height=${SIZE}&seed=${seed}&nologo=true`;
}

export function ResultsCanvas() {
  const [selected, setSelected] = useState(0);
  const selectedSeed = SEEDS[selected] ?? SEEDS[0];

  return (
    <section className="relative flex min-w-0 flex-1 flex-col bg-surface-deep">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgb(128 128 140 / 0.09) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 60% at 50% 42%, #000, transparent 78%)',
          maskImage: 'radial-gradient(ellipse 65% 60% at 50% 42%, #000, transparent 78%)',
        }}
      />

      <header className="relative flex h-14 shrink-0 items-center justify-between gap-3 border-b border-hairline px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="truncate text-[13px] text-muted">{MOCK_PROMPT}</span>
          <span className="shrink-0 rounded-[5px] bg-input px-2 py-0.5 font-mono text-[11px] text-subtle">
            2 of 4 done
          </span>
        </div>
        <Tooltip label="Open full size in a new tab">
          <a
            href={urlFor(selectedSeed as number)}
            target="_blank"
            rel="noreferrer"
            aria-label="Open full size"
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-brand/40 hover:text-foreground"
          >
            <DownloadIcon />
          </a>
        </Tooltip>
      </header>

      <div className="relative flex min-h-0 flex-1 flex-col gap-4 p-5">
        <div
          className="relative mx-auto aspect-square w-full max-w-[620px] flex-1 overflow-hidden rounded-2xl border border-brand/40 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]"
          style={{ maxHeight: 600 }}
        >
          <MockImage seed={selectedSeed as number} large />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 rounded-2xl ring-1 ring-inset ring-white/10"
          />
          <span className="absolute left-3.5 top-3.5 z-10 rounded-[7px] border border-white/15 bg-black/40 px-2 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
            {selected + 1} / 4
          </span>
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-black/65 to-transparent px-4 pb-3.5 pt-8">
            <span className="font-mono text-[10.5px] text-white/70">
              flux · 1:1 · seed {selectedSeed}
            </span>
            <div className="flex gap-2">
              <Tooltip label="Open full size in a new tab">
                <a
                  href={urlFor(selectedSeed as number)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open full size"
                  className="grid size-[34px] place-items-center rounded-[9px] border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                >
                  <ExpandIcon />
                </a>
              </Tooltip>
              <Tooltip label="Download">
                <button
                  type="button"
                  aria-label="Download"
                  className="grid size-[34px] place-items-center rounded-[9px] border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                >
                  <DownloadIcon />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap justify-center gap-2.5">
          {SEEDS.map((seed, i) => (
            <button
              key={seed}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`Select image ${i + 1}`}
              aria-pressed={selected === i}
              className={`relative size-[62px] shrink-0 overflow-hidden rounded-[10px] border-2 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 ${
                selected === i
                  ? 'border-brand shadow-[0_0_0_3px_rgb(224_168_60/0.2)]'
                  : 'border-transparent hover:border-border'
              }`}
            >
              <MockImage seed={seed} />
            </button>
          ))}
          <div
            aria-label="Image 3 — generating"
            className="relative grid size-[62px] shrink-0 place-items-center overflow-hidden rounded-[10px] border border-border bg-input"
          >
            <div className="absolute inset-0 animate-shimmer" />
            <div className="z-10 size-[22px] animate-spin rounded-full border-[2.5px] border-brand/25 border-t-brand" />
          </div>
          <Tooltip label="Failed — retry arrives with the generate flow">
            <div
              aria-label="Image 4 — failed"
              className="grid size-[62px] shrink-0 place-items-center rounded-[10px] border border-error/30 bg-error/5"
            >
              <div className="grid size-[26px] place-items-center rounded-full bg-error/15 text-error">
                <AlertIcon />
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
    </section>
  );
}

/** Skeleton while loading → image on load → gradient fallback on error. */
function MockImage({ seed, large = false }: { seed: number; large?: boolean }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  return (
    <>
      {status === 'loading' && (
        <span
          aria-hidden
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-input"
        >
          <span className="absolute inset-0 animate-shimmer" />
          <span
            className={`z-10 animate-spin rounded-full border-brand/25 border-t-brand ${
              large ? 'size-8 border-[3px]' : 'size-5 border-2'
            }`}
          />
          {large && (
            <span className="z-10 font-mono text-[11px] text-subtle">loading preview…</span>
          )}
        </span>
      )}
      {status === 'error' && (
        <span aria-hidden className="absolute inset-0" style={{ background: seedGradient(seed) }} />
      )}
      {status !== 'error' && (
        <img
          src={urlFor(seed)}
          alt=""
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </>
  );
}
