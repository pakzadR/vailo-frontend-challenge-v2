import type { GenerationRequest } from '../types/generation-types';

export const generationKeys = {
  all: ['generation'] as const,
  image: (request: GenerationRequest) => [...generationKeys.all, 'image', request] as const,
};
