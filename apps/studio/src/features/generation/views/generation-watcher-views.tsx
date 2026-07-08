import { useGenerationWatcher } from '../hooks/use-generation-hooks';

/** Headless query-observer anchor — must stay mounted on every route. */
export function GenerationWatcher() {
  useGenerationWatcher();
  return null;
}
