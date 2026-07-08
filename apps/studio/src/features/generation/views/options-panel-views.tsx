import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Slider from '@radix-ui/react-slider';
import {
  CheckIcon,
  ChevronDownIcon,
  InfoIcon,
  ShuffleIcon,
  SparkleIcon,
} from '@/components/ui/icons';
import { Tooltip } from '@/components/ui/tooltip';
import {
  ASPECT_DIMENSIONS,
  MODELS,
  randomSeed,
  type AspectRatio,
  type GenerationOptions,
  type PixaModel,
} from '../types/generation-types';

interface OptionsPanelProps {
  options: GenerationOptions;
  onChange: (patch: Partial<GenerationOptions>) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function OptionsPanel({ options, onChange, onGenerate, isGenerating }: OptionsPanelProps) {
  const dims = ASPECT_DIMENSIONS[options.aspect];

  return (
    <section className="flex shrink-0 flex-col border-b border-hairline bg-surface lg:w-[356px] lg:border-b-0 lg:border-r">
      <header className="border-b border-hairline px-5 py-5">
        <p className="mb-1 font-mono text-[11px] tracking-widest text-brand">CREATE</p>
        <h1 className="text-base font-semibold tracking-tight">Workspace</h1>
        <p className="mt-0.5 text-[12.5px] text-subtle">
          Describe an image, tune the options, generate.
        </p>
      </header>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="prompt" className="text-[12.5px] font-medium text-foreground/85">
              Prompt
            </label>
            <span className="font-mono text-[10.5px] text-subtle">⏎ to generate</span>
          </div>
          <textarea
            id="prompt"
            value={options.prompt}
            onChange={(e) => onChange({ prompt: e.target.value })}
            onKeyDown={(e) => {
              // Enter generates; Shift+Enter inserts a newline
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onGenerate();
              }
            }}
            placeholder="A bioluminescent jellyfish drifting through a neon cyberpunk city…"
            rows={4}
            className="w-full resize-none rounded-[11px] border border-border bg-input px-3 py-3 text-[13px] leading-relaxed text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center gap-1.5">
            <span className="text-[12.5px] font-medium text-foreground/85">Model</span>
            <Tooltip label="FLUX gives the highest quality; TURBO trades quality for speed. Switching model changes the result for the same prompt + seed.">
              <button type="button" aria-label="About models" className="text-subtle">
                <InfoIcon />
              </button>
            </Tooltip>
          </div>
          <Select.Root
            value={options.model}
            onValueChange={(v) => onChange({ model: v as PixaModel })}
          >
            <Select.Trigger
              aria-label="Model"
              className="flex w-full items-center justify-between rounded-[10px] border border-border bg-input px-3 py-2.5 text-left focus:outline-none focus:ring-2 focus:ring-ring/40"
            >
              <span className="flex items-center gap-2.5">
                <span className="rounded-[5px] bg-brand-soft px-1.5 py-0.5 font-mono text-xs font-medium text-brand-fg">
                  {MODELS[options.model].label}
                </span>
                <span className="text-xs text-subtle">{MODELS[options.model].hint}</span>
              </span>
              <Select.Icon>
                <ChevronDownIcon className="text-subtle" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                position="popper"
                sideOffset={6}
                className="z-50 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[10px] border border-border bg-elevated shadow-xl"
              >
                <Select.Viewport className="p-1">
                  {(Object.keys(MODELS) as PixaModel[]).map((model) => (
                    <Select.Item
                      key={model}
                      value={model}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-[13px] outline-none data-[highlighted]:bg-input"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="rounded-[5px] bg-brand-soft px-1.5 py-0.5 font-mono text-xs font-medium text-brand-fg">
                          {MODELS[model].label}
                        </span>
                        <span className="text-xs text-subtle">{MODELS[model].hint}</span>
                      </span>
                      <Select.ItemIndicator>
                        <CheckIcon className="text-brand" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        <div>
          <div className="mb-2 text-[12.5px] font-medium text-foreground/85">Aspect ratio</div>
          <ToggleGroup.Root
            type="single"
            value={options.aspect}
            onValueChange={(v) => {
              if (v) onChange({ aspect: v as AspectRatio });
            }}
            aria-label="Aspect ratio"
            className="flex gap-1.5 rounded-[10px] border border-border bg-input p-1"
          >
            {(Object.keys(ASPECT_DIMENSIONS) as AspectRatio[]).map((aspect) => (
              <ToggleGroup.Item
                key={aspect}
                value={aspect}
                className="flex-1 rounded-[7px] py-2 text-xs font-medium text-muted transition-colors data-[state=on]:bg-brand-soft data-[state=on]:text-brand-fg"
              >
                {aspect}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
          <p className="mt-1.5 font-mono text-[10.5px] text-subtle">
            → {dims.width} × {dims.height}
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-1.5">
            <label htmlFor="seed" className="text-[12.5px] font-medium text-foreground/85">
              Seed
            </label>
            <Tooltip label="The seed fixes the randomness: the same prompt + options + seed always reproduces the identical image. Change it to explore variations.">
              <button type="button" aria-label="About seeds" className="text-subtle">
                <InfoIcon />
              </button>
            </Tooltip>
          </div>
          <div className="flex gap-2">
            <input
              id="seed"
              type="number"
              min={0}
              value={options.seed}
              onChange={(e) => {
                const n = Number(e.target.value);
                onChange({ seed: Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0 });
              }}
              className="w-full min-w-0 flex-1 rounded-[10px] border border-border bg-input px-3 py-2.5 font-mono text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
            <Tooltip label="Randomize seed">
              <button
                type="button"
                aria-label="Randomize seed"
                onClick={() => onChange({ seed: randomSeed() })}
                className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-border bg-input text-muted transition-colors hover:border-brand/40 hover:text-brand-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <ShuffleIcon />
              </button>
            </Tooltip>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[12.5px] font-medium text-foreground/85">Images</span>
            <span className="font-mono text-xs text-brand-fg">{options.count}</span>
          </div>
          <Slider.Root
            value={[options.count]}
            onValueChange={([v]) => onChange({ count: v ?? 1 })}
            min={1}
            max={4}
            step={1}
            aria-label="Number of images"
            className="relative flex h-4 w-full touch-none select-none items-center"
          >
            <Slider.Track className="relative h-[5px] grow rounded-full bg-border">
              <Slider.Range className="absolute h-full rounded-full bg-gradient-brand" />
            </Slider.Track>
            <Slider.Thumb className="block size-4 rounded-full bg-white shadow-[0_2px_6px_rgb(0_0_0/0.5)] focus:outline-none focus:ring-2 focus:ring-ring/50" />
          </Slider.Root>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-subtle">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </div>
        </div>
      </div>

      <footer className="border-t border-hairline p-4">
        <button
          type="button"
          onClick={onGenerate}
          disabled={!options.prompt.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-[11px] bg-gradient-brand py-3 text-sm font-semibold text-brand-ink shadow-[0_6px_24px_rgb(224_168_60/0.35)] transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 active:scale-[0.99] disabled:opacity-45 disabled:shadow-none disabled:hover:scale-100 motion-reduce:transform-none"
        >
          {isGenerating ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-brand-ink/30 border-t-brand-ink" />
              Generating…
            </>
          ) : (
            <>
              <SparkleIcon size={16} />
              Generate {options.count} {options.count === 1 ? 'image' : 'images'}
            </>
          )}
        </button>
      </footer>
    </section>
  );
}
