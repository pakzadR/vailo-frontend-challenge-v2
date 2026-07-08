import { createImageLoader } from '@/features/generation/api/image-loader-api';
import { buildImageUrl } from '@/features/generation/api/pollinations-api';
import { ASPECT_DIMENSIONS } from '@/features/generation/types/generation-types';
import { api } from '@/lib/axios';
import type { Template } from '../types/templates-types';

/** Own pool: previews never queue behind a running generation batch. */
export const loadPreviewImage = createImageLoader(2);

export async function fetchTemplates(): Promise<Template[]> {
  const { data } = await api.get<Template[]>('/templates.json');
  return data;
}

/** Same URL the workspace regenerates — preview and "Use template" result are identical. */
export function templatePreviewUrl(template: Template): string {
  return buildImageUrl({
    prompt: template.prompt,
    model: template.model,
    aspect: template.aspect,
    ...ASPECT_DIMENSIONS[template.aspect],
    seed: template.seed,
  });
}
