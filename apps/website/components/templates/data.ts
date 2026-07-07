export const TEMPLATE_FILTERS = ['All', 'Portrait', 'Landscape', 'Abstract', 'Sci-fi'] as const;
export type TemplateFilter = (typeof TEMPLATE_FILTERS)[number];
export type TemplateCategory = Exclude<TemplateFilter, 'All'>;

export interface TemplateCard {
  id: string;
  label: string;
  prompt: string;
  seed: number;
  gradient: string;
  category: TemplateCategory;
}

export const TEMPLATES: TemplateCard[] = [
  {
    id: 'fantasy-islands',
    category: 'Landscape',
    label: 'Epic fantasy landscape, floating islands, waterfalls, golden hour',
    prompt: 'epic fantasy landscape with floating islands and waterfalls at golden hour, cinematic',
    seed: 42,
    gradient:
      'radial-gradient(at 30% 25%,#f5b544,transparent 55%),radial-gradient(at 80% 80%,#dd5e27,transparent 55%),#2a1206',
  },
  {
    id: 'astronaut',
    category: 'Portrait',
    label: 'Portrait of an astronaut, holographic visor, studio lighting',
    prompt: 'portrait of an astronaut, holographic visor, studio lighting, hyperreal',
    seed: 108,
    gradient:
      'radial-gradient(at 25% 20%,#f472b6,transparent 55%),radial-gradient(at 80% 80%,#a855f7,transparent 55%),#1e0a2e',
  },
  {
    id: 'desert-temple',
    category: 'Landscape',
    label: 'Desert temple at golden hour, sandstone arches',
    prompt: 'desert temple at golden hour, sandstone arches, cinematic',
    seed: 7,
    gradient:
      'radial-gradient(at 30% 25%,#fbbf24,transparent 55%),radial-gradient(at 78% 78%,#f97316,transparent 55%),#2a1206',
  },
  {
    id: 'pine-forest',
    category: 'Landscape',
    label: 'Misty pine forest, morning fog, painterly atmosphere',
    prompt: 'misty pine forest at dawn, morning fog, painterly atmosphere',
    seed: 128,
    gradient:
      'radial-gradient(at 25% 20%,#34d399,transparent 55%),radial-gradient(at 80% 80%,#0ea5e9,transparent 55%),#062a2a',
  },
  {
    id: 'ice-cavern',
    category: 'Sci-fi',
    label: 'Ice cavern with glowing crystals, deep blue light',
    prompt: 'ice cavern with glowing blue crystals, deep blue light, volumetric',
    seed: 99,
    gradient:
      'radial-gradient(at 25% 20%,#60a5fa,transparent 55%),radial-gradient(at 80% 85%,#c084fc,transparent 55%),#0b1030',
  },
  {
    id: 'retro-car',
    category: 'Landscape',
    label: 'Retro sports car on a coastal highway at sunset',
    prompt: 'retro sports car on a coastal highway at sunset, cinematic',
    seed: 256,
    gradient:
      'radial-gradient(at 30% 25%,#fb7185,transparent 55%),radial-gradient(at 78% 78%,#f59e0b,transparent 55%),#2a0a12',
  },
  {
    id: 'pastel-islands',
    category: 'Abstract',
    label: 'Floating islands in a pastel sky, dreamlike',
    prompt: 'floating islands in a pastel sky, dreamlike, soft light',
    seed: 512,
    gradient:
      'radial-gradient(at 25% 25%,#c084fc,transparent 55%),radial-gradient(at 80% 80%,#22d3ee,transparent 55%),#160a2e',
  },
  {
    id: 'overgrown-ruins',
    category: 'Abstract',
    label: 'Overgrown ruins reclaimed by nature, lush vines',
    prompt: 'overgrown ancient ruins reclaimed by nature, lush vines, sunbeams',
    seed: 77,
    gradient:
      'radial-gradient(at 30% 25%,#4ade80,transparent 55%),radial-gradient(at 80% 80%,#facc15,transparent 55%),#0a2a10',
  },
];
