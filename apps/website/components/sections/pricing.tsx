import { CheckIcon } from '@/components/ui/icons';
import { PRICING } from '@/lib/site-data';

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-[72px] border-t border-hairline px-6 py-20 sm:px-12">
      <div className="mx-auto mb-12 max-w-[1080px] text-center">
        <h2 className="text-[clamp(1.9rem,4vw,38px)] font-semibold tracking-[-0.02em]">
          Simple, honest pricing
        </h2>
        <p className="mt-3.5 text-base text-muted">Start free. Upgrade when you outgrow it.</p>
      </div>

      <div className="mx-auto grid max-w-[1080px] items-start gap-5 md:grid-cols-3">
        {PRICING.map((tier) => (
          <article
            key={tier.name}
            className={`relative rounded-2xl border p-8 ${
              tier.featured
                ? 'border-brand/50 bg-[linear-gradient(180deg,rgb(224_168_60/0.1),var(--color-elevated))]'
                : 'border-border bg-elevated'
            }`}
          >
            {tier.featured && (
              <span className="absolute right-5 top-5 rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand-fg">
                POPULAR
              </span>
            )}
            <p
              className={`text-[15px] font-semibold ${tier.featured ? 'text-brand-fg' : 'text-muted'}`}
            >
              {tier.name}
            </p>
            <p className="mb-1.5 mt-4">
              <span className="text-[44px] font-semibold tracking-[-0.02em]">{tier.price}</span>
              <span className="text-sm text-subtle">{tier.cadence}</span>
            </p>
            <p className="mb-6 text-[13px] text-subtle">{tier.blurb}</p>

            <ul className="flex flex-col gap-3 text-[13.5px] text-foreground/85">
              {tier.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2.5">
                  <CheckIcon size={15} className="shrink-0 text-brand" />
                  {feat}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={`mt-7 w-full rounded-[10px] py-3 text-sm font-semibold transition-transform hover:scale-[1.01] ${
                tier.featured
                  ? 'bg-gradient-brand text-brand-ink'
                  : 'border border-border text-foreground'
              }`}
            >
              {tier.cta}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
