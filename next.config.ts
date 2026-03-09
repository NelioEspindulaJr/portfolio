import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      new URL("https://zig.tickets/**"),
      new URL("https://image.thum.io/**"),
      new URL("https://nelioespindulajr.github.io/**"),
    ],
  },
};

export default nextConfig;
