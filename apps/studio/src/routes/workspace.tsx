import { createFileRoute } from '@tanstack/react-router';
import { WorkspaceView } from '@/features/generation/views/workspace-views';
import {
  ASPECT_DIMENSIONS,
  MODELS,
  type AspectRatio,
  type PixaModel,
} from '@/features/generation/types/generation-types';

export interface WorkspaceSearch {
  prompt?: string;
  model?: PixaModel;
  aspect?: AspectRatio;
  seed?: number;
}

function isModel(value: unknown): value is PixaModel {
  return typeof value === 'string' && value in MODELS;
}

function isAspect(value: unknown): value is AspectRatio {
  return typeof value === 'string' && value in ASPECT_DIMENSIONS;
}

export const Route = createFileRoute('/workspace')({
  // template handoff params; anything malformed is silently dropped
  validateSearch: (search: Record<string, unknown>): WorkspaceSearch => {
    const out: WorkspaceSearch = {};
    if (typeof search.prompt === 'string' && search.prompt.trim()) out.prompt = search.prompt;
    if (isModel(search.model)) out.model = search.model;
    if (isAspect(search.aspect)) out.aspect = search.aspect;
    const seed = Number(search.seed);
    if (Number.isInteger(seed) && seed >= 0) out.seed = seed;
    return out;
  },
  component: WorkspaceRoute,
});

function WorkspaceRoute() {
  const template = Route.useSearch();
  return <WorkspaceView template={template} />;
}
