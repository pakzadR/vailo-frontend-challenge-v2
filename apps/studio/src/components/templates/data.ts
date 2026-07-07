const SIZE = 512;

export function previewUrl(prompt: string, seed: number): string {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux&width=${SIZE}&height=${SIZE}&seed=${seed}&nologo=true`;
}

export type Category = 'Portrait' | 'Landscape' | 'Abstract' | 'Sci-fi';

export interface TemplateCard {
  id: string;
  label: string;
  model: 'flux' | 'turbo';
  category: Category;
  seed: number;
  gradient: string;
}

export const TEMPLATES: TemplateCard[] = [
  {
    id: 'jellyfish',
    label: 'Bioluminescent jellyfish drifting through a neon cyberpunk city, volumetric fog',
    model: 'flux',
    category: 'Sci-fi',
    seed: 128934,
    gradient:
      'radial-gradient(at 25% 20%,#ec4899,transparent 50%),radial-gradient(at 80% 30%,#8b5cf6,transparent 55%),#160a2e',
  },
  {
    id: 'astronaut',
    label: 'Portrait of an astronaut, holographic visor, studio lighting',
    model: 'flux',
    category: 'Portrait',
    seed: 108,
    gradient:
      'radial-gradient(at 30% 25%,#f472b6,transparent 55%),radial-gradient(at 80% 80%,#a855f7,transparent 55%),#1e0a2e',
  },
  {
    id: 'desert-temple',
    label: 'Desert temple at golden hour, sandstone arches',
    model: 'flux',
    category: 'Landscape',
    seed: 7,
    gradient:
      'radial-gradient(at 30% 30%,#fbbf24,transparent 55%),radial-gradient(at 75% 75%,#f97316,transparent 55%),#2a1206',
  },
  {
    id: 'pine-forest',
    label: 'Misty pine forest, morning fog, painterly atmosphere',
    model: 'turbo',
    category: 'Landscape',
    seed: 128,
    gradient:
      'radial-gradient(at 30% 25%,#34d399,transparent 55%),radial-gradient(at 80% 80%,#0ea5e9,transparent 55%),#062a2a',
  },
  {
    id: 'ice-cavern',
    label: 'Ice cavern with glowing crystals, deep blue',
    model: 'flux',
    category: 'Sci-fi',
    seed: 99,
    gradient:
      'radial-gradient(at 25% 20%,#60a5fa,transparent 55%),radial-gradient(at 80% 85%,#818cf8,transparent 55%),#0b1030',
  },
  {
    id: 'retro-car',
    label: 'Retro sports car on a coastal highway at sunset',
    model: 'flux',
    category: 'Landscape',
    seed: 256,
    gradient:
      'radial-gradient(at 30% 30%,#fb7185,transparent 55%),radial-gradient(at 78% 78%,#f59e0b,transparent 55%),#2a0a12',
  },
  {
    id: 'pastel-islands',
    label: 'Floating islands in a pastel sky, dreamlike',
    model: 'turbo',
    category: 'Abstract',
    seed: 512,
    gradient:
      'radial-gradient(at 25% 25%,#c084fc,transparent 55%),radial-gradient(at 80% 80%,#22d3ee,transparent 55%),#160a2e',
  },
  {
    id: 'overgrown-ruins',
    label: 'Overgrown ruins reclaimed by nature, lush vines',
    model: 'flux',
    category: 'Abstract',
    seed: 77,
    gradient:
      'radial-gradient(at 30% 25%,#4ade80,transparent 55%),radial-gradient(at 80% 80%,#facc15,transparent 55%),#0a2a10',
  },
];
