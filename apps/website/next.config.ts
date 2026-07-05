import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // We're inside a pnpm monorepo — point tracing at the repo root so Next stops
  // warning about the workspace lockfile above this app.
  outputFileTracingRoot: fileURLToPath(new URL('../../', import.meta.url)),
  images: {
    // Live demo strip fetches generated images from Pollinations server-side (RULES §9).
    remotePatterns: [{ protocol: 'https', hostname: 'image.pollinations.ai' }],
  },
};

export default nextConfig;
