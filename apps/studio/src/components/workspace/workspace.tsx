import { useState } from 'react';
import { INITIAL_OPTIONS, type GenerationOptions } from './data';
import { HistoryPanel } from './history-panel';
import { OptionsPanel } from './options-panel';
import { ResultsCanvas } from './results-canvas';

// Design-only 3-pane workspace; generate flow comes later.
export function WorkspaceView() {
  const [options, setOptions] = useState<GenerationOptions>(INITIAL_OPTIONS);

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
