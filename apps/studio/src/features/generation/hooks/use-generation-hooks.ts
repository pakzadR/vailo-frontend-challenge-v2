import { useEffect, useMemo } from 'react';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { downloadImage } from '../api/download-api';
import { loadImage } from '../api/image-loader-api';
import { buildImageUrl, toRequests } from '../api/pollinations-api';
import { useGenerationStore } from '../store/generation-store';
import { useHistoryStore } from '../store/history-store';
import type { GenerationOptions, GenerationRequest, HistoryEntry } from '../types/generation-types';
import { generationKeys } from './keys-hooks';

export type ImageStatus = 'pending' | 'success' | 'error';

export interface GeneratedImage {
  request: GenerationRequest;
  status: ImageStatus;
  url: string | undefined;
  retry: () => void;
}

/** Snapshots the form into a new batch and logs it to history. */
export function useStartGeneration(): (options: GenerationOptions) => void {
  const start = useGenerationStore((s) => s.start);
  const addEntry = useHistoryStore((s) => s.add);
  return (options) => {
    const prompt = options.prompt.trim();
    if (!prompt) return;
    const snapshot = { ...options, prompt };
    start(toRequests(snapshot), addEntry(snapshot));
  };
}

/**
 * Reopening a saved history entry must not re-generate: seed the query cache
 * with the saved urls, so the canvas shows them instantly. Images that never
 * finished stay unseeded and go through the normal generate flow.
 */
export function useReuseGeneration(): (entry: HistoryEntry) => void {
  const queryClient = useQueryClient();
  const start = useGenerationStore((s) => s.start);
  const replaceOptions = useGenerationStore((s) => s.replaceOptions);
  return (entry) => {
    const requests = toRequests(entry.options);
    for (const request of requests) {
      const url = buildImageUrl(request);
      if (entry.imageUrls.includes(url)) {
        queryClient.setQueryData(generationKeys.image(request), url);
      }
    }
    replaceOptions(entry.options);
    start(requests, entry.id);
  };
}

/** Saves a finished image to disk; `isPending` drives the button's loading state. */
export function useDownloadImage() {
  return useMutation({
    mutationFn: ({ url, filename }: { url: string; filename: string }) =>
      downloadImage(url, filename),
  });
}

/**
 * Query per image: each of the 1–4 images caches, fails, and retries
 * independently — same prompt + seed resolves instantly from cache.
 */
export function useGenerationImages(requests: GenerationRequest[] | null): GeneratedImage[] {
  return useQueries({
    queries: (requests ?? []).map((request) => ({
      queryKey: generationKeys.image(request),
      queryFn: ({ signal }: { signal: AbortSignal }) => loadImage(buildImageUrl(request), signal),
      staleTime: Infinity,
      retry: false,
      // failed images retry only via the explicit button, never on remount/reconnect
      retryOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      // the loader is not fetch-based, so Query's offline pause would hang forever
      networkMode: 'always' as const,
    })),
    combine: (results) =>
      results.map((result, i) => ({
        // useQueries preserves order, so requests[i] always exists here
        request: (requests as GenerationRequest[])[i]!,
        // a manual retry keeps status 'error' while refetching — show it as pending
        status: result.isFetching ? 'pending' : (result.status as ImageStatus),
        url: result.data,
        retry: () => void result.refetch(),
      })),
  });
}

/**
 * Mounted once at the root: keeps the batch's queries observed across route
 * changes (so navigation never cancels them) and streams finished urls into
 * the history entry even while the user is on another page.
 */
export function useGenerationWatcher(): void {
  const requests = useGenerationStore((s) => s.requests);
  const activeId = useGenerationStore((s) => s.activeId);
  const setEntryImages = useHistoryStore((s) => s.setEntryImages);
  const images = useGenerationImages(requests);

  // stable key: combine() rebuilds the array each render
  const doneKey = useMemo(
    () => images.flatMap((img) => (img.status === 'success' && img.url ? [img.url] : [])).join('|'),
    [images],
  );

  useEffect(() => {
    if (activeId && doneKey) setEntryImages(activeId, doneKey.split('|'));
  }, [activeId, doneKey, setEntryImages]);
}
