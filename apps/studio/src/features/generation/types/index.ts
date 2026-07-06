export type PixaModel = 'flux' | 'turbo';

export type AspectRatio = '1:1' | '16:9' | '9:16';

/** Aspect → request dimensions (shown as the "→ 1024 × 1024" hint). */
export const ASPECT_DIMENSIONS: Record<AspectRatio, { width: number; height: number }> = {
  '1:1': { width: 1024, height: 1024 },
  '16:9': { width: 1280, height: 720 },
  '9:16': { width: 720, height: 1280 },
};

export const MODELS: Record<PixaModel, { label: string; hint: string }> = {
  flux: { label: 'FLUX', hint: 'Highest quality' },
  turbo: { label: 'TURBO', hint: 'Fastest results' },
};

/** Fresh random seed for the seed control. */
export function randomSeed(): number {
  return Math.floor(Math.random() * 1_000_000);
}

/** The workspace form — everything that will bind to the request. */
export interface GenerationOptions {
  prompt: string;
  model: PixaModel;
  aspect: AspectRatio;
  seed: number;
  count: number; // 1–4
}
