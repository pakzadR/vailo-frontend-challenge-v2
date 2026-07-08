import { create } from 'zustand';
import {
  INITIAL_OPTIONS,
  type GenerationOptions,
  type GenerationRequest,
} from '../types/generation-types';

/** The active generation lives outside the route so navigation never kills it. */
interface GenerationState {
  options: GenerationOptions;
  requests: GenerationRequest[] | null;
  activeId: string | null;
  selected: number;
  setOptions: (patch: Partial<GenerationOptions>) => void;
  replaceOptions: (options: GenerationOptions) => void;
  setSelected: (index: number) => void;
  start: (requests: GenerationRequest[], activeId: string) => void;
}

export const useGenerationStore = create<GenerationState>()((set) => ({
  options: INITIAL_OPTIONS,
  requests: null,
  activeId: null,
  selected: 0,
  setOptions: (patch) => set((s) => ({ options: { ...s.options, ...patch } })),
  replaceOptions: (options) => set({ options }),
  setSelected: (index) => set({ selected: index }),
  start: (requests, activeId) => set({ requests, activeId, selected: 0 }),
}));
