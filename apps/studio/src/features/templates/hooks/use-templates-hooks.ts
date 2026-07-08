import { useQuery } from '@tanstack/react-query';
import { fetchTemplates, loadPreviewImage, templatePreviewUrl } from '../api/templates-api';
import type { Template } from '../types/templates-types';
import { templateKeys } from './keys-hooks';

/** The static asset never changes within a session — cache it forever. */
export function useTemplates() {
  return useQuery({
    queryKey: templateKeys.list(),
    queryFn: fetchTemplates,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

/** Previews stay cached for the whole session — revisiting the page never reloads them. */
export function useTemplatePreview(template: Template) {
  return useQuery({
    queryKey: templateKeys.preview(template.id),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      loadPreviewImage(templatePreviewUrl(template), signal),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    networkMode: 'always',
  });
}
