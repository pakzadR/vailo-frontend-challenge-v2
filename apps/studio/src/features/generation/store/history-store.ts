import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GenerationOptions, HistoryEntry } from '../types/generation-types';

const MAX_ENTRIES = 30;

function sameOptions(a: GenerationOptions, b: GenerationOptions): boolean {
  return (
    a.prompt === b.prompt &&
    a.model === b.model &&
    a.aspect === b.aspect &&
    a.seed === b.seed &&
    a.count === b.count
  );
}

interface HistoryState {
  entries: HistoryEntry[];
  add: (options: GenerationOptions) => string;
  setEntryImages: (id: string, urls: string[]) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      entries: [],
      add: (options) => {
        const head = get().entries[0];
        // re-running identical options should not spam the log
        if (head && sameOptions(head.options, options)) return head.id;
        const entry: HistoryEntry = {
          id: crypto.randomUUID(),
          options,
          imageUrls: [],
          createdAt: Date.now(),
        };
        set((s) => ({ entries: [entry, ...s.entries].slice(0, MAX_ENTRIES) }));
        return entry.id;
      },
      setEntryImages: (id, urls) => {
        const entry = get().entries.find((e) => e.id === id);
        if (
          !entry ||
          (entry.imageUrls.length === urls.length && entry.imageUrls.every((u, i) => u === urls[i]))
        ) {
          return;
        }
        set((s) => ({
          entries: s.entries.map((e) => (e.id === id ? { ...e, imageUrls: urls } : e)),
        }));
      },
      remove: (id) => set((s) => ({ entries: s.entries.filter((e) => e.id !== id) })),
      clear: () => set({ entries: [] }),
    }),
    {
      name: 'pixa-history',
      version: 1,
      migrate: (persisted) => {
        const old = persisted as { entries?: Array<HistoryEntry & { imageUrls?: string[] }> };
        return {
          entries: (old?.entries ?? []).map((e) => ({ ...e, imageUrls: e.imageUrls ?? [] })),
        } as HistoryState;
      },
    },
  ),
);
