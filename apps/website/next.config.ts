import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // trace from the repo root (pnpm monorepo)
  outputFileTracingRoot: fileURLToPath(new URL('../../', import.meta.url)),
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'image.pollinations.ai' }],
  },
};

export default nextConfig;
