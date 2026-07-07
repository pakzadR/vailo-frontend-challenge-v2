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
