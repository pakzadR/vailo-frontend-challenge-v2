export const STUDIO_URL = process.env.NEXT_PUBLIC_STUDIO_URL ?? 'http://localhost:5173';

export const STUDIO_TEMPLATES_URL = `${STUDIO_URL}/templates`;

/**
 * Deep link that prefills the studio workspace. encodeURIComponent (not
 * URLSearchParams) — form encoding turns spaces into '+', which the studio's
 * router would not decode back.
 */
export function studioWorkspaceUrl(template: {
  prompt: string;
  model: string;
  aspect: string;
  seed: number;
}): string {
  return (
    `${STUDIO_URL}/workspace` +
    `?prompt=${encodeURIComponent(template.prompt)}` +
    `&model=${template.model}` +
    `&aspect=${encodeURIComponent(template.aspect)}` +
    `&seed=${template.seed}`
  );
}
