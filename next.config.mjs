/** @type {import('next').NextConfig} */
const nextConfig = {
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
