import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

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
      new URL("https://labassyst.com.br/**"),
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);
