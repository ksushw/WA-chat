import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined, 
  images: {
    unoptimized: true, 
  },
  distDir: 'out',
  basePath: isProd ? "/WA-chat" : "",
  assetPrefix: isProd ? "/WA-chat" : "",
  trailingSlash: true,
};

export default nextConfig;
