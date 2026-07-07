export type PixaModel = 'flux' | 'turbo';
export type AspectRatio = '1:1' | '16:9' | '9:16';

export const ASPECT_DIMENSIONS: Record<AspectRatio, { width: number; height: number }> = {
  '1:1': { width: 1024, height: 1024 },
  '16:9': { width: 1280, height: 720 },
  '9:16': { width: 720, height: 1280 },
};

export const MODELS: Record<PixaModel, { label: string; hint: string }> = {
  flux: { label: 'FLUX', hint: 'Highest quality' },
  turbo: { label: 'TURBO', hint: 'Fastest results' },
};

export function randomSeed(): number {
  return Math.floor(Math.random() * 1_000_000);
}

export interface GenerationOptions {
  prompt: string;
  model: PixaModel;
  aspect: AspectRatio;
  seed: number;
  count: number; // 1–4
}

export const MOCK_PROMPT =
  'A bioluminescent jellyfish drifting through a neon cyberpunk city, volumetric fog, cinematic lighting';

export const INITIAL_OPTIONS: GenerationOptions = {
  prompt: MOCK_PROMPT,
  model: 'flux',
  aspect: '1:1',
  seed: 128934,
  count: 4,
};

export interface HistoryEntry {
  id: string;
  prompt: string;
  meta: string;
  seed: number;
  active: boolean;
}

export const HISTORY_ENTRIES: HistoryEntry[] = [
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
