import type { IconName } from '@/components/ui/icons';

export interface Highlight {
  icon: IconName;
  accent: 'brand' | 'info';
  title: string;
  body: string;
}

export const HIGHLIGHTS: Highlight[] = [
  {
    icon: 'zap',
    accent: 'brand',
    title: 'Blazing fast',
    body: 'Generate up to four images at once with live per-image progress — no waiting on the slowest one.',
  },
  {
    icon: 'sparkles',
    accent: 'brand',
    title: 'Reproducible',
    body: 'Every image records its exact model, seed and dimensions. Reuse the settings to reproduce any result perfectly.',
  },
  {
    icon: 'grid',
    accent: 'info',
    title: 'Template library',
    body: 'Start from thousands of community prompts. One tap loads the prompt and settings straight into your workspace.',
  },
];
