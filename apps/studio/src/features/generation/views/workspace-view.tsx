import { useState } from 'react';
import type { GenerationOptions } from '../types';
import { HistoryPanel } from './history-panel';
import { OptionsPanel } from './options-panel';
import { ResultsCanvas } from './results-canvas';

/**
 * Design-only workspace (design §01): the three-pane layout with the form
 * controls fully styled and locally interactive, the canvas and history as
 * static mocks. Prefilled to mirror the design spec frame. The generate
 * flow, per-image queries and persistence land in later feature PRs.
 */
const INITIAL: GenerationOptions = {
  prompt:
    'A bioluminescent jellyfish drifting through a neon cyberpunk city, volumetric fog, cinematic lighting',
  model: 'flux',
  aspect: '1:1',
  seed: 128934,
  count: 4,
};

export function WorkspaceView() {
  const [options, setOptions] = useState<GenerationOptions>(INITIAL);

  return (
    <div className="flex h-full flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
      <OptionsPanel
        options={options}
        onChange={(patch) => setOptions((o) => ({ ...o, ...patch }))}
      />
      <ResultsCanvas />
      <HistoryPanel />
    </div>
  );
}
