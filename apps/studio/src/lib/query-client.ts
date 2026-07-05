import { QueryClient } from '@tanstack/react-query';

/**
 * Single app-wide QueryClient. Defaults tuned for the Pollinations reality
 * (slow, flaky, rate-limited — RULES §0/G2): generated images never go stale,
 * and we don't hammer the API by refetching on window focus.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
