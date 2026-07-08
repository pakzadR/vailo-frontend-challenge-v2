// Pollinations 403s any request carrying an Origin header, so images load via
// new Image() instead of fetch/axios. Concurrency is capped per pool: the
// anonymous tier rate-limits bursts, and generation can take 5–45s per image.
const TIMEOUT_MS = 90_000;

/** Independent bounded pool, so slow generations can't starve other loads. */
export function createImageLoader(maxConcurrent: number) {
  let active = 0;
  const waiters: Array<() => void> = [];

  function acquire(signal?: AbortSignal): Promise<void> {
    if (active < maxConcurrent) {
      active += 1;
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const waiter = () => {
        signal?.removeEventListener('abort', onAbort);
        resolve();
      };
      const onAbort = () => {
        const queued = waiters.indexOf(waiter);
        if (queued !== -1) waiters.splice(queued, 1);
        reject(new Error('Cancelled'));
      };
      waiters.push(waiter);
      signal?.addEventListener('abort', onAbort, { once: true });
    });
  }

  function release(): void {
    const next = waiters.shift();
    if (next) next();
    else active -= 1;
  }

  /** Resolves with the url once the image is in the browser cache. */
  return async function loadImage(url: string, signal?: AbortSignal): Promise<string> {
    if (signal?.aborted) throw new Error('Cancelled');
    await acquire(signal);
    try {
      return await new Promise<string>((resolve, reject) => {
        const img = new Image();
        const settle = (fn: () => void) => {
          clearTimeout(timer);
          signal?.removeEventListener('abort', onAbort);
          img.onload = null;
          img.onerror = null;
          fn();
        };
        const onAbort = () => {
          img.src = '';
          settle(() => reject(new Error('Cancelled')));
        };
        const timer = setTimeout(() => {
          img.src = '';
          settle(() => reject(new Error('Image timed out')));
        }, TIMEOUT_MS);
        signal?.addEventListener('abort', onAbort, { once: true });
        img.onload = () => settle(() => resolve(url));
        img.onerror = () => settle(() => reject(new Error('Image failed to load')));
        img.src = url;
      });
    } finally {
      release();
    }
  };
}

export const loadImage = createImageLoader(2);
