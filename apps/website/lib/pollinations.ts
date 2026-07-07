export type PixaModel = 'flux' | 'turbo';

export interface PollinationsParams {
  prompt: string;
  model?: PixaModel;
  width?: number;
  height?: number;
  seed?: number;
}

const BASE = 'https://image.pollinations.ai/prompt';

/** The single place image URLs are built. */
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
 * Server-only fetch → base64 data URI (Node sends no Origin header, so no
 * 403). Returns null on failure so callers can fall back to a client load.
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
