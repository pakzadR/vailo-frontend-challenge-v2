'use client';

import Image from 'next/image';
import { useState } from 'react';
import { pollinationsUrl, type PixaModel } from '@/lib/pollinations';

interface PollinationsImageProps {
  prompt: string;
  seed: number;
  /** Always-visible backdrop — shows while the image loads and if it ever fails. */
  gradient: string;
  alt: string;
  width?: number;
  height?: number;
  model?: PixaModel;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders a Pollinations image directly in the browser (`unoptimized`), on purpose:
 * generation takes 5–45s, which blows past Next's image-optimizer fetch timeout and
 * would leave a blank slot. A plain <img> load carries no Origin header (README gotcha
 * #1) and can wait as long as it needs. The gradient sits underneath so the slot is
 * never empty, and a failed load simply keeps the gradient instead of a broken icon.
 *
 * Parent must be `position: relative` with a defined size (the image uses `fill`).
 */
export function PollinationsImage({
  prompt,
  seed,
  gradient,
  alt,
  width = 768,
  height = 768,
  model,
  sizes = '100vw',
  priority,
}: PollinationsImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <>
      <span aria-hidden className="absolute inset-0" style={{ background: gradient }} />
      {!failed && (
        <Image
          src={pollinationsUrl({ prompt, seed, width, height, model })}
          alt={alt}
          fill
          unoptimized
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </>
  );
}
