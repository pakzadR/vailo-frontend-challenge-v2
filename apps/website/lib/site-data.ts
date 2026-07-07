import type { IconName } from '@/components/ui/icons';

export const STUDIO_URL = process.env.NEXT_PUBLIC_STUDIO_URL ?? 'http://localhost:5173';

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Gallery', href: '#templates' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#' },
] as const;

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

export interface Feature {
  icon: IconName;
  accent: 'brand' | 'info';
  title: string;
  body: string;
}

export const FEATURES: Feature[] = [
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

export interface DemoImage {
  prompt: string;
  caption: string;
  seed: number;
  gradient: string;
}

export const DEMO_IMAGES: DemoImage[] = [
  {
    prompt: 'neon koi swimming in obsidian black water, bioluminescent, cinematic',
    caption: '"neon koi in obsidian water" · seed 42',
    seed: 42,
    gradient:
      'radial-gradient(at 25% 20%,#f472b6,transparent 55%),radial-gradient(at 80% 80%,#a855f7,transparent 55%),#1e0a2e',
  },
  {
    prompt: 'desert temple at golden hour, sandstone arches, cinematic',
    caption: '"desert temple, golden hour" · seed 7',
    seed: 7,
    gradient:
      'radial-gradient(at 30% 25%,#fbbf24,transparent 55%),radial-gradient(at 78% 78%,#f97316,transparent 55%),#2a1206',
  },
  {
    prompt: 'misty pine forest at dawn, morning fog, painterly atmosphere',
    caption: '"misty pine forest, fog" · seed 128',
    seed: 128,
    gradient:
      'radial-gradient(at 25% 25%,#34d399,transparent 55%),radial-gradient(at 80% 80%,#0ea5e9,transparent 55%),#062a2a',
  },
  {
    prompt: 'ice cavern with glowing blue crystals, deep blue light, volumetric',
    caption: '"crystal ice cavern, blue" · seed 99',
    seed: 99,
    gradient:
      'radial-gradient(at 25% 20%,#60a5fa,transparent 55%),radial-gradient(at 80% 85%,#c084fc,transparent 55%),#0b1030',
  },
];

export interface PricingTier {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const PRICING: PricingTier[] = [
  {
    name: 'Hobby',
    price: '$0',
    cadence: '/mo',
    blurb: 'For trying things out',
    features: ['50 generations / day', 'Both models', 'History & templates'],
    cta: 'Get started',
  },
  {
    name: 'Pro',
    price: '$16',
    cadence: '/mo',
    blurb: 'For serious creators',
    features: ['Unlimited generations', '4K upscaling', 'Private history', 'Priority queue'],
    cta: 'Upgrade to Pro',
    featured: true,
  },
  {
    name: 'Studio',
    price: '$49',
    cadence: '/mo',
    blurb: 'For teams',
    features: ['Everything in Pro', 'Shared workspaces', 'API access'],
    cta: 'Contact sales',
  },
];
