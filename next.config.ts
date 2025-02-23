import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', 
  images: {
    unoptimized: true, 
  },
  distDir: 'out',
  basePath: '/WA-chat', 
  assetPrefix: '/WA-chat/',
};

export default nextConfig;
