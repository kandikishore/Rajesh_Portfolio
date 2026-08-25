/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // GitHub Pages can only serve static files. The workflow supplies the
  // repository path so links work at /Rajesh_Portfolio/ as well as locally.
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  experimental: {
    useWasmBinary: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Hide the floating Next.js dev-tools badge (the "N" in the corner). Dev-only
  // UI - it never shipped in the production build regardless.
  devIndicators: false,
};

export default nextConfig;
