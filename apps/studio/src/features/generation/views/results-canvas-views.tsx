import { AlertIcon, DownloadIcon, ExpandIcon, RetryIcon, SparkleIcon } from '@/components/ui/icons';
import { Tooltip } from '@/components/ui/tooltip';
import { useDownloadImage, type GeneratedImage } from '../hooks/use-generation-hooks';
import { useGenerationStore } from '../store/generation-store';
import type { AspectRatio } from '../types/generation-types';

const FRAME_MAX_WIDTH: Record<AspectRatio, number> = {
  '1:1': 600,
  '16:9': 880,
  '9:16': 330,
};

interface ResultsCanvasProps {
  images: GeneratedImage[];
}

export function ResultsCanvas({ images }: ResultsCanvasProps) {
  const selected = useGenerationStore((s) => s.selected);
  const setSelected = useGenerationStore((s) => s.setSelected);
  const { mutate: saveImage, isPending: isSaving } = useDownloadImage();
  // clamp: a new batch can be shorter than the previous selection
  const index = Math.min(selected, images.length - 1);
  const current = images[index];
  const done = images.filter((img) => img.status === 'success').length;

  const download = (img: GeneratedImage) => {
    if (img.url && !isSaving) {
      saveImage({ url: img.url, filename: `pixa-${img.request.model}-${img.request.seed}.jpg` });
    }
  };

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

      {!current ? (
        <EmptyState />
      ) : (
        <>
          <header className="relative flex h-14 shrink-0 items-center justify-between gap-3 border-b border-hairline px-5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="truncate text-[13px] text-muted">{current.request.prompt}</span>
              <span className="shrink-0 rounded-[5px] bg-input px-2 py-0.5 font-mono text-[11px] text-subtle">
                {done} of {images.length} done
              </span>
            </div>
            {current.status === 'success' && current.url && (
              <Tooltip label="Download image">
                <button
                  type="button"
                  onClick={() => download(current)}
                  disabled={isSaving}
                  aria-busy={isSaving}
                  aria-label="Download image"
                  className="grid size-8 shrink-0 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-brand/40 hover:text-foreground disabled:opacity-60"
                >
                  {isSaving ? (
                    <span className="size-[15px] animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
                  ) : (
                    <DownloadIcon />
                  )}
                </button>
              </Tooltip>
            )}
          </header>

          <div className="relative flex min-h-0 flex-1 overflow-y-auto p-5 lg:[container-type:size]">
            {/* m-auto centers without the top-clip that justify-center causes on overflow */}
            <div className="m-auto flex w-full flex-col gap-4">
              <div
                className="relative mx-auto shrink-0 overflow-hidden rounded-2xl border border-brand/40 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]"
                style={{
                  aspectRatio: `${current.request.width} / ${current.request.height}`,
                  // fit the pane's height too: 100cqh is the canvas height on lg
                  width: `min(100%, ${FRAME_MAX_WIDTH[current.request.aspect]}px, calc((100cqh - ${
                    images.length > 1 ? 82 : 0
                  }px) * ${current.request.width} / ${current.request.height}))`,
                }}
              >
                <ResultImage image={current} large />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-20 rounded-2xl ring-1 ring-inset ring-white/10"
                />
                <span className="absolute left-3.5 top-3.5 z-10 rounded-[7px] border border-white/15 bg-black/40 px-2 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
                  {index + 1} / {images.length}
                </span>
                {current.status === 'success' && current.url && (
                  <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-black/65 to-transparent px-4 pb-3.5 pt-8">
                    <span className="font-mono text-[10.5px] text-white/70">
                      {current.request.model} · {current.request.aspect} · seed{' '}
                      {current.request.seed}
                    </span>
                    <div className="flex gap-2">
                      <Tooltip label="Open full size in a new tab">
                        <a
                          href={current.url}
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
                          onClick={() => download(current)}
                          disabled={isSaving}
                          aria-busy={isSaving}
                          aria-label="Download"
                          className="grid size-[34px] place-items-center rounded-[9px] border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 disabled:opacity-60"
                        >
                          {isSaving ? (
                            <span className="size-[15px] animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          ) : (
                            <DownloadIcon />
                          )}
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex shrink-0 flex-wrap justify-center gap-2.5">
                  {images.map((img, i) => (
                    <button
                      key={img.request.seed}
                      type="button"
                      onClick={() => setSelected(i)}
                      aria-label={`Select image ${i + 1}`}
                      aria-pressed={index === i}
                      className={`relative size-[62px] shrink-0 overflow-hidden rounded-[10px] border-2 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 ${
                        index === i
                          ? 'border-brand shadow-[0_0_0_3px_rgb(224_168_60/0.2)]'
                          : 'border-transparent hover:border-border'
                      }`}
                    >
                      <ResultImage image={img} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="grid size-14 place-items-center rounded-2xl border border-border bg-input text-brand">
        <SparkleIcon size={22} />
      </div>
      <div>
        <p className="text-[15px] font-semibold">Nothing generated yet</p>
        <p className="mt-1 max-w-[300px] text-[12.5px] leading-relaxed text-subtle">
          Describe an image in the panel, tune the options, then press Generate — results land here.
        </p>
      </div>
    </div>
  );
}

/** Aspect-sized skeleton while pending → image on success → in-place retry on error. */
function ResultImage({ image, large = false }: { image: GeneratedImage; large?: boolean }) {
  const { status, url, retry } = image;
  return (
    <>
      {status === 'pending' && (
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
          {large && <span className="z-10 font-mono text-[11px] text-subtle">generating…</span>}
        </span>
      )}
      {status === 'error' &&
        (large ? (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-input">
            <span className="grid size-10 place-items-center rounded-full bg-error/15 text-error">
              <AlertIcon />
            </span>
            <span className="text-[12.5px] text-muted">This image failed to generate.</span>
            <button
              type="button"
              onClick={retry}
              className="flex items-center gap-1.5 rounded-[9px] border border-border bg-elevated px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-brand/40"
            >
              <RetryIcon />
              Retry
            </button>
          </span>
        ) : (
          <span className="absolute inset-0 grid place-items-center bg-error/5">
            <span className="grid size-[26px] place-items-center rounded-full bg-error/15 text-error">
              <AlertIcon />
            </span>
          </span>
        ))}
      {status === 'success' && url && (
        <img
          src={url}
          alt={image.request.prompt}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </>
  );
}
