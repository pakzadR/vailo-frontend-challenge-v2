import { ArrowRightIcon, PlayIcon } from '@/components/ui/icons';
import { PollinationsImage } from '@/components/ui/pollinations-image';
import { STUDIO_URL } from '@/lib/site-data';

export function SiteHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-24 text-center sm:px-12 sm:pt-28">
      {/* decorative glow + grid layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[-200px] h-[640px] w-[1100px] max-w-[130vw] -translate-x-1/2"
          style={{
            background: 'radial-gradient(ellipse at center,rgb(224 168 60 / 0.22),transparent 62%)',
          }}
        />
        <div
          className="absolute left-[12%] top-[120px] hidden h-[420px] w-[420px] lg:block"
          style={{ background: 'radial-gradient(circle,rgb(236 72 153 / 0.10),transparent 65%)' }}
        />
        <div
          className="absolute right-[10%] top-[160px] hidden h-[420px] w-[420px] lg:block"
          style={{ background: 'radial-gradient(circle,rgb(56 189 248 / 0.10),transparent 65%)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgb(255 255 255 / 0.05) 1px,transparent 1px)',
            backgroundSize: '34px 34px',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 50% 30%,#000,transparent 75%)',
            maskImage: 'radial-gradient(ellipse 70% 55% at 50% 30%,#000,transparent 75%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1040px]">
        <h1 className="text-gradient-heading mx-auto max-w-[880px] text-balance text-[clamp(2.6rem,7vw,76px)] font-semibold leading-[1.03] tracking-[-0.035em]">
          Turn any prompt into <span className="text-gradient-brand">stunning imagery</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[580px] text-balance text-[17px] leading-relaxed text-muted sm:text-[18.5px]">
          Generate, iterate, and organize AI images at the speed of thought. Tune every option,
          reproduce any result down to the seed, and ship in seconds.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={STUDIO_URL}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-[15px] font-semibold text-brand-ink shadow-[0_10px_34px_rgb(224_168_60/0.42),inset_0_1px_0_rgb(255_255_255/0.35)] transition-transform hover:scale-[1.02]"
          >
            Start generating — free
            <ArrowRightIcon size={17} />
          </a>
          <a
            href="#templates"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.02] px-6 py-3.5 text-[15px] font-medium text-foreground transition-colors hover:bg-foreground/[0.05]"
          >
            <PlayIcon size={16} />
            Watch demo
          </a>
        </div>

        {/* hero visual */}
        <div className="relative mx-auto mt-16 max-w-[1040px] sm:mt-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-12"
            style={{
              background:
                'radial-gradient(ellipse at center,rgb(224 168 60 / 0.16),transparent 70%)',
            }}
          />
          <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] border border-border shadow-[0_50px_110px_rgb(0_0_0/0.6)]">
            <PollinationsImage
              prompt="epic fantasy landscape with floating islands and waterfalls at golden hour, cinematic, ultra detailed"
              seed={42}
              width={1280}
              height={720}
              priority
              sizes="(max-width: 1040px) 100vw, 1040px"
              alt="Epic fantasy landscape with floating islands and waterfalls at golden hour"
              gradient="radial-gradient(at 30% 25%,#f5b544,transparent 55%),radial-gradient(at 80% 80%,#dd5e27,transparent 55%),#2a1206"
            />
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center gap-2.5 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10">
              <span className="rounded-md bg-brand-soft px-2.5 py-1 font-mono text-[11px] font-medium text-brand-fg">
                FLUX
              </span>
              <span className="text-left text-[13px] text-foreground">
                “epic fantasy landscape, floating islands, waterfalls, golden hour”
              </span>
              <span className="ml-auto whitespace-nowrap font-mono text-[11px] text-muted">
                seed 42 · 1280×720
              </span>
            </div>
          </div>

          {/* floating thumbnails */}
          <div className="absolute -right-6 -top-8 hidden size-[150px] rotate-[5deg] overflow-hidden rounded-2xl border border-border shadow-[0_24px_50px_rgb(0_0_0/0.55)] sm:block">
            <PollinationsImage
              prompt="a serene mountain lake at dawn, volumetric mist, cinematic"
              seed={7}
              width={512}
              height={512}
              sizes="150px"
              alt="A serene mountain lake at dawn"
              gradient="radial-gradient(at 25% 20%,#34d399,transparent 55%),radial-gradient(at 80% 80%,#0ea5e9,transparent 55%),#062a2a"
            />
          </div>
          <div className="absolute -bottom-9 -left-7 hidden size-[140px] rotate-[-6deg] overflow-hidden rounded-2xl border border-border shadow-[0_24px_50px_rgb(0_0_0/0.55)] sm:block">
            <PollinationsImage
              prompt="portrait of an astronaut, holographic visor, studio lighting, hyperreal"
              seed={108}
              width={512}
              height={512}
              sizes="140px"
              alt="Portrait of an astronaut with a holographic visor"
              gradient="radial-gradient(at 25% 20%,#f472b6,transparent 55%),radial-gradient(at 80% 80%,#a855f7,transparent 55%),#1e0a2e"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
