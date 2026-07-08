'use client';

import { useState } from 'react';
import { ArrowRightIcon } from '@/components/ui/icons';
import { PollinationsImage } from '@/components/ui/pollinations-image';
import { STUDIO_TEMPLATES_URL, studioWorkspaceUrl } from '@/lib/config';
import { TEMPLATE_FILTERS, TEMPLATES, type TemplateFilter } from './data';

/** Client component — the category filter is stateful. */
export function TemplatesSection() {
  const [filter, setFilter] = useState<TemplateFilter>('All');
  const visible = filter === 'All' ? TEMPLATES : TEMPLATES.filter((t) => t.category === filter);

  return (
    <section
      id="templates"
      className="scroll-mt-[72px] border-t border-hairline px-6 py-24 sm:px-12"
    >
      <div className="mx-auto mb-8 max-w-[1160px] text-center">
        <p className="mb-2.5 font-mono text-xs text-brand">TEMPLATES</p>
        <h2 className="text-[clamp(1.9rem,4vw,38px)] font-semibold tracking-[-0.02em]">
          Start from a template
        </h2>
        <p className="mt-3.5 text-base text-muted">
          Thousands of community prompts. One tap loads it into your workspace.
        </p>
      </div>

      <div
        role="group"
        aria-label="Filter templates by category"
        className="mx-auto mb-8 flex max-w-full flex-wrap justify-center gap-2.5"
      >
        {TEMPLATE_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${
              filter === f
                ? 'border-brand/30 bg-brand-soft font-medium text-brand-fg'
                : 'border-border text-muted hover:text-foreground'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mx-auto grid max-w-[1160px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((tpl) => (
          <article
            key={tpl.id}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-border"
          >
            {/* same url the studio regenerates — the preview IS the handoff result */}
            <PollinationsImage
              prompt={tpl.prompt}
              model={tpl.model}
              seed={tpl.seed}
              width={1024}
              height={1024}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 290px"
              alt={tpl.prompt}
              gradient={tpl.gradient}
            />
            <div className="absolute inset-0 z-10 flex flex-col items-start justify-end bg-[linear-gradient(0deg,rgba(0,0,0,0.75),transparent_55%)] p-3.5">
              {/* rests shifted down by the CTA height; hover/focus/touch reveals it */}
              <div className="flex translate-y-[39px] flex-col items-start transition-transform duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0 motion-reduce:transition-none [@media(hover:none)]:translate-y-0">
                <p className="mb-2.5 line-clamp-2 text-left text-[11.5px] leading-snug text-white/95">
                  {tpl.prompt}
                </p>
                <a
                  href={studioWorkspaceUrl(tpl)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3 py-1.5 text-[11.5px] font-semibold text-brand-ink opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
                >
                  <ArrowRightIcon size={12} />
                  Use template
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-6 text-center text-sm text-subtle">No templates in this category yet.</p>
      )}

      <div className="mt-9 text-center">
        <a
          href={STUDIO_TEMPLATES_URL}
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.04]"
        >
          Browse all templates
          <ArrowRightIcon size={15} />
        </a>
      </div>
    </section>
  );
}
