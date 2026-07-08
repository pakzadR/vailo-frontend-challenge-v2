import type { AspectRatio, PixaModel } from '@/features/generation/types/generation-types';

export type TemplateCategory = 'Portrait' | 'Landscape' | 'Abstract' | 'Sci-fi';

export interface Template {
  id: string;
  prompt: string;
  model: PixaModel;
  aspect: AspectRatio;
  seed: number;
  category: TemplateCategory;
  gradient: string;
}
