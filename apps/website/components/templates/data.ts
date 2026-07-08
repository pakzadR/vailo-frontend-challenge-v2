import type { PixaModel } from '@/lib/pollinations';

export const TEMPLATE_FILTERS = ['All', 'Portrait', 'Landscape', 'Abstract', 'Sci-fi'] as const;
export type TemplateFilter = (typeof TEMPLATE_FILTERS)[number];
export type TemplateCategory = Exclude<TemplateFilter, 'All'>;

export interface TemplateCard {
  id: string;
  prompt: string;
  model: PixaModel;
  aspect: '1:1' | '16:9' | '9:16';
  seed: number;
  category: TemplateCategory;
  gradient: string;
}

/** Mirror of the studio's templates.json — the handoff must reproduce these exactly. */
export const TEMPLATES: TemplateCard[] = [
  {
    id: 'jellyfish',
    prompt: 'Bioluminescent jellyfish drifting through a neon cyberpunk city, volumetric fog',
    model: 'flux',
    aspect: '1:1',
    seed: 128934,
    category: 'Sci-fi',
    gradient:
      'radial-gradient(at 25% 20%,#ec4899,transparent 50%),radial-gradient(at 80% 30%,#8b5cf6,transparent 55%),#160a2e',
  },
  {
    id: 'astronaut',
    prompt: 'Portrait of an astronaut, holographic visor, studio lighting',
    model: 'flux',
    aspect: '1:1',
    seed: 108,
    category: 'Portrait',
    gradient:
      'radial-gradient(at 30% 25%,#f472b6,transparent 55%),radial-gradient(at 80% 80%,#a855f7,transparent 55%),#1e0a2e',
  },
  {
    id: 'desert-temple',
    prompt: 'Desert temple at golden hour, sandstone arches',
    model: 'flux',
    aspect: '1:1',
    seed: 7,
    category: 'Landscape',
    gradient:
      'radial-gradient(at 30% 30%,#fbbf24,transparent 55%),radial-gradient(at 75% 75%,#f97316,transparent 55%),#2a1206',
  },
  {
    id: 'pine-forest',
    prompt: 'Misty pine forest, morning fog, painterly atmosphere',
    model: 'turbo',
    aspect: '1:1',
    seed: 128,
    category: 'Landscape',
    gradient:
      'radial-gradient(at 30% 25%,#34d399,transparent 55%),radial-gradient(at 80% 80%,#0ea5e9,transparent 55%),#062a2a',
  },
  {
    id: 'ice-cavern',
    prompt: 'Ice cavern with glowing crystals, deep blue',
    model: 'flux',
    aspect: '1:1',
    seed: 99,
    category: 'Sci-fi',
    gradient:
      'radial-gradient(at 25% 20%,#60a5fa,transparent 55%),radial-gradient(at 80% 85%,#818cf8,transparent 55%),#0b1030',
  },
  {
    id: 'retro-car',
    prompt: 'Retro sports car on a coastal highway at sunset',
    model: 'flux',
    aspect: '1:1',
    seed: 256,
    category: 'Landscape',
    gradient:
      'radial-gradient(at 30% 30%,#fb7185,transparent 55%),radial-gradient(at 78% 78%,#f59e0b,transparent 55%),#2a0a12',
  },
  {
    id: 'pastel-islands',
    prompt: 'Floating islands in a pastel sky, dreamlike',
    model: 'turbo',
    aspect: '1:1',
    seed: 512,
    category: 'Abstract',
    gradient:
      'radial-gradient(at 25% 25%,#c084fc,transparent 55%),radial-gradient(at 80% 80%,#22d3ee,transparent 55%),#160a2e',
  },
  {
    id: 'overgrown-ruins',
    prompt: 'Overgrown ruins reclaimed by nature, lush vines',
    model: 'flux',
    aspect: '1:1',
    seed: 77,
    category: 'Abstract',
    gradient:
      'radial-gradient(at 30% 25%,#4ade80,transparent 55%),radial-gradient(at 80% 80%,#facc15,transparent 55%),#0a2a10',
  },
];
