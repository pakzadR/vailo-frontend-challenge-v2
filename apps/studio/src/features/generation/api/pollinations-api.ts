import {
  ASPECT_DIMENSIONS,
  type GenerationOptions,
  type GenerationRequest,
} from '../types/generation-types';

const BASE = 'https://image.pollinations.ai/prompt';

/** The single place image URLs are built. */
export function buildImageUrl({ prompt, model, width, height, seed }: GenerationRequest): string {
  const params = new URLSearchParams({
    model,
    width: String(width),
    height: String(height),
    seed: String(seed),
    nologo: 'true',
  });
  return `${BASE}/${encodeURIComponent(prompt)}?${params.toString()}`;
}

/** Expands the form into one request per image; seed + index keeps a batch distinct yet reproducible. */
export function toRequests(options: GenerationOptions): GenerationRequest[] {
  const { width, height } = ASPECT_DIMENSIONS[options.aspect];
  return Array.from({ length: options.count }, (_, i) => ({
    prompt: options.prompt.trim(),
    model: options.model,
    aspect: options.aspect,
    width,
    height,
    seed: options.seed + i,
  }));
}
