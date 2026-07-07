import { TrashIcon } from '@/components/icons';
import { Tooltip } from '@/components/tooltip';
import { seedGradient } from './gradients';

// Static history mock; persistence + detail dialog come later.
const MOCK_ENTRIES = [
  {
    id: 'a',
    prompt: 'Bioluminescent jellyfish, neon cyberpunk city',
    meta: 'flux · now',
    seed: 1,
    active: true,
  },
  {
    id: 'b',
    prompt: 'Desert temple at golden hour, sandstone',
    meta: 'flux · 4m',
    seed: 2,
    active: false,
  },
  {
    id: 'c',
    prompt: 'Misty pine forest, morning fog, painterly',
    meta: 'turbo · 12m',
    seed: 3,
    active: false,
  },
  {
    id: 'd',
    prompt: 'Portrait of an astronaut, holographic visor',
    meta: 'flux · 1h',
    seed: 4,
    active: false,
  },
];

export function HistoryPanel() {
  return (
    <aside className="flex shrink-0 flex-col border-t border-hairline bg-surface lg:w-[340px] lg:border-l lg:border-t-0">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-hairline px-4">
        <h2 className="text-[13px] font-semibold">History</h2>
        <button
          type="button"
          className="text-[11.5px] text-subtle transition-colors hover:text-error"
        >
          Clear
        </button>
      </header>

      <ul className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-3.5">
        {MOCK_ENTRIES.map((entry) => (
          <li key={entry.id}>
            <div
              className={`flex w-full items-center gap-2.5 rounded-[11px] border p-2 transition-colors ${
                entry.active
                  ? 'border-brand/30 bg-brand-soft/50'
                  : 'border-hairline hover:border-border'
              }`}
            >
              <span
                aria-hidden
                className="size-[46px] shrink-0 rounded-lg"
                style={{ background: seedGradient(entry.seed) }}
              />
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 text-left text-xs leading-snug text-foreground/90">
                  {entry.prompt}
                </span>
                <span className="mt-0.5 block font-mono text-[10px] text-subtle">{entry.meta}</span>
              </span>
              <Tooltip label="Remove from history">
                <button
                  type="button"
                  aria-label="Remove from history"
                  className="grid size-[26px] shrink-0 place-items-center rounded-[7px] border border-transparent text-subtle transition-colors hover:border-border hover:text-error"
                >
                  <TrashIcon />
                </button>
              </Tooltip>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
