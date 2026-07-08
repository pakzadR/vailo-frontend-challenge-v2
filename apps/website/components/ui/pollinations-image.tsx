'use client';

import Image from 'next/image';
import { useState } from 'react';
import { pollinationsUrl, type PixaModel } from '@/lib/pollinations';

interface PollinationsImageProps {
  prompt: string;
  seed: number;
  /** Shown while loading and on failure. */
  gradient: string;
  alt: string;
  width?: number;
  height?: number;
  model?: PixaModel;
  sizes?: string;
  priority?: boolean;
}

/**
 * Deliberately `unoptimized`: Pollinations takes 5–45s, past the Next
 * optimizer's timeout, and plain <img> loads send no Origin header (which it
 * 403s on). The gradient underneath covers loading and failure states.
 * Parent must be `position: relative` with a size (the image uses `fill`).
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
