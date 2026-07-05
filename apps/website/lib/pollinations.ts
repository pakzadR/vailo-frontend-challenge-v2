export type PixaModel = 'flux' | 'turbo';

export interface PollinationsParams {
  prompt: string;
  model?: PixaModel;
  width?: number;
  height?: number;
  seed?: number;
}

const BASE = 'https://image.pollinations.ai/prompt';

/**
 * The single place website image URLs are built (mirrors the studio's api/ layer).
 * On the marketing site these render server-side through next/image, so Next's
 * optimizer fetches them from Node — which, unlike a browser fetch, carries no
 * Origin header and is never rejected by Pollinations (README gotcha #1).
 */
export function pollinationsUrl({
  prompt,
  model = 'flux',
  width = 1024,
  height = 1024,
  seed,
}: PollinationsParams): string {
  const params = new URLSearchParams({
    model,
    width: String(width),
    height: String(height),
    nologo: 'true',
  });
  if (seed !== undefined) params.set('seed', String(seed));
  return `${BASE}/${encodeURIComponent(prompt)}?${params.toString()}`;
}

/**
 * Server-only: fetch a Pollinations image and inline it as a base64 data URI.
 * Runs in a Server Component (Node fetch → no Origin header → never 403'd), so the
 * live-demo strip is genuinely rendered from server-fetched data (RULES §9) and the
 * bytes ship inside the HTML — the image is always visible, never a blank slot.
 * Returns null on timeout/failure so the caller can fall back to a client load.
 */
export async function fetchImageDataUri(
  params: PollinationsParams,
  timeoutMs = 12000,
): Promise<string | null> {
  try {
    const res = await fetch(pollinationsUrl(params), {
      signal: AbortSignal.timeout(timeoutMs),
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const type = res.headers.get('content-type') ?? 'image/jpeg';
    const base64 = Buffer.from(await res.arrayBuffer()).toString('base64');
    return `data:${type};base64,${base64}`;
  } catch {
    return null;
  }
}
