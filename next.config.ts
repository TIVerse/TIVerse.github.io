import type { NextConfig } from "next";

const basePath = process.env.NEXT_BASE_PATH || ""; // e.g. "/<repo>" for project pages
const assetPrefix = process.env.NEXT_ASSET_PREFIX || undefined; // e.g. "/<repo>/"

const nextConfig: NextConfig = {
  // Export as static HTML for GitHub Pages
  output: "export",
  // Ensure directories with index.html work well on Pages
  trailingSlash: true,
  // Allow hosting under a subpath when deploying to project pages
  basePath: basePath || undefined,
  assetPrefix,
  images: {
    // Static export requires unoptimized images
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
