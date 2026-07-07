import Image from 'next/image';
import { PollinationsImage } from '@/components/ui/pollinations-image';
import { fetchImageDataUri } from '@/lib/pollinations';
import { DEMO_IMAGES } from './data';

/**
 * Async RSC: images are fetched server-side and inlined as data URIs; a
 * timed-out fetch falls back to loading that image in the browser.
 */
export async function LiveDemoSection() {
  const demos = await Promise.all(
    DEMO_IMAGES.map(async (demo) => ({
      ...demo,
      dataUri: await fetchImageDataUri({
        prompt: demo.prompt,
        seed: demo.seed,
        width: 600,
        height: 400,
      }),
    })),
  );

  return (
    <section className="border-t border-hairline bg-surface-deep px-6 py-20 sm:px-12">
      <div className="mx-auto mb-8 flex max-w-[1140px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 font-mono text-xs text-brand">RENDERED SERVER-SIDE</p>
          <h2 className="text-[clamp(1.6rem,3.5vw,32px)] font-semibold tracking-[-0.02em]">
            Fresh from the model
          </h2>
        </div>
        <span className="text-[13.5px] text-subtle">
          Fixed prompts · fixed seeds · always stable
        </span>
      </div>

      <div className="mx-auto grid max-w-[1140px] grid-cols-2 gap-4 lg:grid-cols-4">
        {demos.map((demo) => (
          <figure
            key={demo.seed}
            className="overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <div className="relative aspect-[3/2] w-full">
              {demo.dataUri ? (
                <>
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: demo.gradient }}
                  />
                  <Image
                    src={demo.dataUri}
                    alt={demo.prompt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 50vw, 285px"
                    className="object-cover"
                  />
                </>
              ) : (
                <PollinationsImage
                  prompt={demo.prompt}
                  seed={demo.seed}
                  width={600}
                  height={400}
                  sizes="(max-width: 1024px) 50vw, 285px"
                  alt={demo.prompt}
                  gradient={demo.gradient}
                />
              )}
            </div>
            <figcaption className="px-3 py-3 font-mono text-[10.5px] leading-relaxed text-subtle">
              {demo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
