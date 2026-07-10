import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles its own build output — do NOT use "standalone" on Vercel.
  // The "standalone" output is only useful for self-hosted Docker/Node deployments.
  // Leaving this off lets `next build` produce the standard .next/ output that
  // Vercel's Next.js runtime expects.
  reactStrictMode: false,
  // Sharp is used for next/image optimization. On Vercel it's preinstalled,
  // but we keep it as an optional dependency so local dev also works.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Keep TypeScript strict — type errors will fail the build.
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
