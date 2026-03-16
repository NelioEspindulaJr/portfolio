import type { Metadata } from "next";

import { bebasNeue, inter, sora } from "@/app/[locale]/fonts";
import { ViewTransitions } from "next-view-transitions";

import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { createMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata(),
  applicationName: siteConfig.shortName,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.shortName}`,
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <ViewTransitions>
      <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${sora.variable} ${bebasNeue.variable} antialiased`}
        >
          <GoogleTagManager gtmId="GTM-5TZ2QBSJ" />
          {children}
          <GoogleAnalytics gaId="G-826MPJLXRR" />
        </body>
      </html>
    </ViewTransitions>
  );
}
