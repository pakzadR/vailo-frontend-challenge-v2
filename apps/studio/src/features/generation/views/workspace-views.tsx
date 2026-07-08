import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  useGenerationImages,
  useReuseGeneration,
  useStartGeneration,
} from '../hooks/use-generation-hooks';
import { useGenerationStore } from '../store/generation-store';
import { INITIAL_OPTIONS, type GenerationOptions } from '../types/generation-types';
import { HistoryPanel } from './history-panel-views';
import { OptionsPanel } from './options-panel-views';
import { ResultsCanvas } from './results-canvas-views';

interface WorkspaceViewProps {
  /** Prefill from a template handoff (typed search params). */
  template?: Partial<GenerationOptions>;
}

export function WorkspaceView({ template }: WorkspaceViewProps) {
  const options = useGenerationStore((s) => s.options);
  const requests = useGenerationStore((s) => s.requests);
  const activeId = useGenerationStore((s) => s.activeId);
  const setOptions = useGenerationStore((s) => s.setOptions);
  const replaceOptions = useGenerationStore((s) => s.replaceOptions);
  const images = useGenerationImages(requests);
  const startGeneration = useStartGeneration();
  const reuse = useReuseGeneration();
  const navigate = useNavigate();

  // one-shot handoff: apply the template, then clean the url so back/forward can't re-apply it
  useEffect(() => {
    if (template && Object.keys(template).length > 0) {
      replaceOptions({ ...INITIAL_OPTIONS, ...template });
      void navigate({ to: '/workspace', search: {}, replace: true });
    }
  }, [template, replaceOptions, navigate]);

  return (
    <div className="flex h-full flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
      <OptionsPanel
        options={options}
        onChange={setOptions}
        onGenerate={() => startGeneration(options)}
        isGenerating={images.some((img) => img.status === 'pending')}
      />
      <ResultsCanvas images={images} />
      <HistoryPanel activeId={activeId} onReuse={reuse} />
    </div>
  );
}
