/**
 * Deterministic decorative gradient for history thumbnails. History entries
 * deliberately do NOT reload their images (a stale entry would occupy the
 * bounded Pollinations queue and starve live generations); a seed-derived
 * gradient gives each entry a stable, recognizable swatch instead.
 */
const PALETTES = [
  ['#ec4899', '#22d3ee', '#160a2e'],
  ['#fbbf24', '#f97316', '#2a1206'],
  ['#34d399', '#0ea5e9', '#062a2a'],
  ['#f472b6', '#a855f7', '#1e0a2e'],
  ['#60a5fa', '#818cf8', '#0b1030'],
  ['#fb7185', '#f59e0b', '#2a0a12'],
  ['#c084fc', '#22d3ee', '#160a2e'],
  ['#4ade80', '#facc15', '#0a2a10'],
];

export function seedGradient(seed: number): string {
  const palette = PALETTES[Math.abs(seed) % PALETTES.length] as [string, string, string];
  const [a, b, base] = palette;
  return `radial-gradient(at 25% 20%, ${a}, transparent 55%), radial-gradient(at 80% 80%, ${b}, transparent 55%), ${base}`;
}
