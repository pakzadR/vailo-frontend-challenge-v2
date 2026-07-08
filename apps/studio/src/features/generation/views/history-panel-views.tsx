import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CloseIcon, HistoryIcon, SparkleIcon, TrashIcon } from '@/components/ui/icons';
import { Tooltip } from '@/components/ui/tooltip';
import { useHistoryStore } from '../store/history-store';
import { ASPECT_DIMENSIONS, MODELS, type HistoryEntry } from '../types/generation-types';
import { seedGradient } from './gradients-views';

interface HistoryPanelProps {
  activeId: string | null;
  onReuse: (entry: HistoryEntry) => void;
}

function timeAgo(timestamp: number): string {
  const seconds = Math.max(0, (Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}

export function HistoryPanel({ activeId, onReuse }: HistoryPanelProps) {
  const entries = useHistoryStore((s) => s.entries);
  const remove = useHistoryStore((s) => s.remove);
  const clear = useHistoryStore((s) => s.clear);
  const [selected, setSelected] = useState<HistoryEntry | null>(null);

  return (
    <aside className="flex shrink-0 flex-col border-t border-hairline bg-surface lg:w-[340px] lg:border-l lg:border-t-0">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-hairline px-4">
        <h2 className="text-[13px] font-semibold">History</h2>
        <button
          type="button"
          onClick={clear}
          disabled={entries.length === 0}
          className="text-[11.5px] text-subtle transition-colors hover:text-error disabled:opacity-40 disabled:hover:text-subtle"
        >
          Clear
        </button>
      </header>

      {entries.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="grid size-11 place-items-center rounded-xl border border-border bg-input text-subtle">
            <HistoryIcon size={19} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-foreground/85">No generations yet</p>
            <p className="mt-0.5 text-[11.5px] leading-relaxed text-subtle">
              Everything you generate lands here.
            </p>
          </div>
        </div>
      ) : (
        <ul className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-3.5">
          {entries.map((entry) => (
            <li key={entry.id}>
              <div
                className={`group relative flex w-full items-center gap-2.5 rounded-[11px] border p-2 transition-colors ${
                  entry.id === activeId
                    ? 'border-brand/30 bg-brand-soft/50'
                    : 'border-hairline hover:border-border'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelected(entry)}
                  aria-label={`Generation details: ${entry.options.prompt}`}
                  className="absolute inset-0 rounded-[11px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                />
                <HistoryThumb entry={entry} />
                <span className="pointer-events-none min-w-0 flex-1">
                  <span className="line-clamp-2 text-left text-xs leading-snug text-foreground/90">
                    {entry.options.prompt}
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] text-subtle">
                    {entry.options.model} · {timeAgo(entry.createdAt)}
                  </span>
                </span>
                <Tooltip label="Remove from history">
                  <button
                    type="button"
                    aria-label="Remove from history"
                    onClick={() => remove(entry.id)}
                    className="relative z-10 grid size-[26px] shrink-0 place-items-center rounded-[7px] border border-transparent text-subtle opacity-0 transition group-focus-within:opacity-100 group-hover:opacity-100 hover:border-border hover:text-error focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
                  >
                    <TrashIcon />
                  </button>
                </Tooltip>
              </div>
            </li>
          ))}
        </ul>
      )}

      <HistoryDialog
        entry={selected}
        onClose={() => setSelected(null)}
        onReuse={(entry) => {
          onReuse(entry);
          setSelected(null);
        }}
      />
    </aside>
  );
}

/** Saved image over the seed gradient; the gradient stays as loading/error fallback. */
function HistoryThumb({ entry }: { entry: HistoryEntry }) {
  const [failed, setFailed] = useState(false);
  const url = entry.imageUrls[0];
  return (
    <span
      aria-hidden
      className="relative size-[46px] shrink-0 overflow-hidden rounded-lg"
      style={{ background: seedGradient(entry.options.seed) }}
    >
      {url && !failed && (
        <img
          src={url}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </span>
  );
}

function HistoryDialog({
  entry,
  onClose,
  onReuse,
}: {
  entry: HistoryEntry | null;
  onClose: () => void;
  onReuse: (entry: HistoryEntry) => void;
}) {
  return (
    <Dialog.Root open={entry !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(420px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-elevated p-5 shadow-2xl focus:outline-none">
          {entry && (
            <>
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <Dialog.Title className="text-[15px] font-semibold">
                    Generation details
                  </Dialog.Title>
                  <p className="mt-0.5 font-mono text-[10.5px] text-subtle">
                    {timeAgo(entry.createdAt)} ago
                  </p>
                </div>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close"
                    className="grid size-8 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-brand/40 hover:text-foreground"
                  >
                    <CloseIcon />
                  </button>
                </Dialog.Close>
              </div>

              <Dialog.Description className="max-h-32 overflow-y-auto rounded-[11px] border border-hairline bg-input px-3 py-2.5 text-[12.5px] leading-relaxed text-foreground/90">
                {entry.options.prompt}
              </Dialog.Description>

              {entry.imageUrls.length > 0 && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {entry.imageUrls.map((url, i) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open image ${i + 1} full size`}
                      className="relative overflow-hidden rounded-[9px] border border-hairline transition-colors hover:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                      style={{
                        aspectRatio: `${ASPECT_DIMENSIONS[entry.options.aspect].width} / ${ASPECT_DIMENSIONS[entry.options.aspect].height}`,
                        background: seedGradient(entry.options.seed + i),
                      }}
                    >
                      <img
                        src={url}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 size-full object-cover"
                      />
                    </a>
                  ))}
                </div>
              )}

              <dl className="mt-4 grid grid-cols-2 gap-2.5">
                <div className="rounded-[10px] border border-hairline bg-input px-3 py-2">
                  <dt className="text-[10px] uppercase tracking-wider text-subtle">Model</dt>
                  <dd className="mt-1">
                    <span className="rounded-[5px] bg-brand-soft px-1.5 py-0.5 font-mono text-xs font-medium text-brand-fg">
                      {MODELS[entry.options.model].label}
                    </span>
                  </dd>
                </div>
                <div className="rounded-[10px] border border-hairline bg-input px-3 py-2">
                  <dt className="text-[10px] uppercase tracking-wider text-subtle">Aspect</dt>
                  <dd className="mt-1 font-mono text-[13px] text-foreground/90">
                    {entry.options.aspect}
                  </dd>
                </div>
                <div className="rounded-[10px] border border-hairline bg-input px-3 py-2">
                  <dt className="text-[10px] uppercase tracking-wider text-subtle">Seed</dt>
                  <dd className="mt-1 font-mono text-[13px] text-foreground/90">
                    {entry.options.seed}
                  </dd>
                </div>
                <div className="rounded-[10px] border border-hairline bg-input px-3 py-2">
                  <dt className="text-[10px] uppercase tracking-wider text-subtle">Images</dt>
                  <dd className="mt-1 font-mono text-[13px] text-foreground/90">
                    {entry.options.count}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={() => onReuse(entry)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-[11px] bg-gradient-brand py-2.5 text-[13px] font-semibold text-brand-ink shadow-[0_6px_24px_rgb(224_168_60/0.35)] transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 active:scale-[0.99] motion-reduce:transform-none"
              >
                <SparkleIcon size={15} />
                Reuse these settings
              </button>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
