import { FeatureIcon } from './icons';
import { FEATURES } from '@/lib/site-data';

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="scroll-mt-[72px] border-t border-hairline px-6 py-20 sm:px-12"
    >
      <div className="mx-auto mb-12 max-w-[1140px] text-center">
        <h2 className="text-[clamp(1.9rem,4vw,38px)] font-semibold tracking-[-0.02em]">
          Everything you need to create
        </h2>
        <p className="mt-3.5 text-base text-muted">
          Built for speed, precision, and repeatability.
        </p>
      </div>

      <div className="mx-auto grid max-w-[1140px] gap-5 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-border bg-elevated p-7 transition-colors hover:border-brand/30"
          >
            <div
              className={`mb-[18px] grid size-11 place-items-center rounded-xl ${
                feature.accent === 'brand' ? 'bg-brand-soft text-brand-fg' : 'bg-info/15 text-info'
              }`}
            >
              <FeatureIcon name={feature.icon} size={21} />
            </div>
            <h3 className="mb-2 text-[17px] font-semibold">{feature.title}</h3>
            <p className="text-[13.5px] leading-relaxed text-muted">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
