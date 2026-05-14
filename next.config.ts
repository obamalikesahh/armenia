import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    'preview-chat-42c4992a-39ce-48e4-b348-c3ebacf5088c.space-z.ai',
    '.space-z.ai',
  ],
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd23etkghwwc7sj.cloudfront.net',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
