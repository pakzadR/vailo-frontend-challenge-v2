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

/** Live form state in the options panel. */
export interface GenerationOptions {
  prompt: string;
  model: PixaModel;
  aspect: AspectRatio;
  seed: number;
  count: number; // 1–4
}

export const INITIAL_OPTIONS: GenerationOptions = {
  prompt: '',
  model: 'flux',
  aspect: '1:1',
  seed: 128934,
  count: 4,
};

/** One resolved image request — everything that determines the output pixels. */
export interface GenerationRequest {
  prompt: string;
  model: PixaModel;
  aspect: AspectRatio;
  width: number;
  height: number;
  seed: number;
}

export interface HistoryEntry {
  id: string;
  options: GenerationOptions; // exact snapshot: prompt, model, aspect, seed, count
  imageUrls: string[]; // deterministic urls of the finished images
  createdAt: number;
}
