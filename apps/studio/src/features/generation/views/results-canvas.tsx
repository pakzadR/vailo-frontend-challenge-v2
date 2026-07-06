import { AlertIcon, DownloadIcon, ExpandIcon } from '@/components/icons';
import { Tooltip } from '@/components/tooltip';
import { seedGradient } from './gradients';

/**
 * Design-only canvas (design §01): a static mock showing the four per-image
 * states side by side — selected/loaded, loaded, pending (shimmer + spinner),
 * failed. The real generation flow arrives in its own feature PR.
 */
const MOCK_PROMPT =
  'Bioluminescent jellyfish · neon cyberpunk city, volumetric fog, cinematic lighting';

export function ResultsCanvas() {
  return (
    <section className="flex min-w-0 flex-1 flex-col bg-surface-deep">
      {/* header */}
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-hairline px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="truncate text-[13px] text-muted">{MOCK_PROMPT}</span>
          <span className="shrink-0 rounded-[5px] bg-input px-2 py-0.5 font-mono text-[11px] text-subtle">
            2 of 4 done
          </span>
        </div>
        <Tooltip label="Download">
          <button
            type="button"
            aria-label="Download"
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-border text-muted transition-colors hover:text-foreground"
          >
            <DownloadIcon />
          </button>
        </Tooltip>
      </header>

      {/* big selected frame */}
      <div className="flex min-h-0 flex-1 flex-col gap-4 p-5">
        <div
          className="relative mx-auto aspect-square w-full max-w-[660px] flex-1 overflow-hidden rounded-[14px] border border-brand/40"
          style={{ maxHeight: 600, background: seedGradient(1) }}
        >
          <span className="absolute left-3.5 top-3.5 rounded-[7px] border border-white/15 bg-black/40 px-2 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
            1 / 4
          </span>
          <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-black/65 to-transparent px-4 pb-3.5 pt-6">
            <Tooltip label="Open full size">
              <button
                type="button"
                aria-label="Open full size"
                className="grid size-[34px] place-items-center rounded-[9px] border border-white/15 bg-black/40 text-white backdrop-blur-sm"
              >
                <ExpandIcon />
              </button>
            </Tooltip>
            <Tooltip label="Download">
              <button
                type="button"
                aria-label="Download"
                className="grid size-[34px] place-items-center rounded-[9px] border border-white/15 bg-black/40 text-white backdrop-blur-sm"
              >
                <DownloadIcon />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* thumbnail rail — the four states from the design */}
        <div className="flex shrink-0 flex-wrap justify-center gap-2.5">
          {/* active / loaded */}
          <div
            aria-label="Image 1 — selected"
            className="h-[62px] w-[86px] shrink-0 rounded-[9px] border-2 border-brand shadow-[0_0_0_3px_rgb(224_168_60/0.2)]"
            style={{ background: seedGradient(1) }}
          />
          {/* loaded */}
          <div
            aria-label="Image 2 — loaded"
            className="h-[62px] w-[86px] shrink-0 rounded-[9px] border-2 border-transparent"
            style={{ background: seedGradient(2) }}
          />
          {/* pending */}
          <div
            aria-label="Image 3 — generating"
            className="relative grid h-[62px] w-[86px] shrink-0 place-items-center overflow-hidden rounded-[9px] border border-border bg-input"
          >
            <div className="absolute inset-0 animate-shimmer" />
            <div className="z-10 size-[22px] animate-spin rounded-full border-[2.5px] border-brand/25 border-t-brand" />
          </div>
          {/* failed */}
          <div
            aria-label="Image 4 — failed"
            className="grid h-[62px] w-[86px] shrink-0 place-items-center rounded-[9px] border border-error/30 bg-error/5"
          >
            <div className="grid size-[26px] place-items-center rounded-full bg-error/15 text-error">
              <AlertIcon />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
