import type { Metadata } from "next";

import { bebasNeue, inter, sora } from "@/app/fonts";
import { ViewTransitions } from "next-view-transitions";

import Providers from "@/components/providers/providers";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createMetadata,
  createPersonJsonLd,
  createWebsiteJsonLd,
  siteConfig,
} from "@/lib/seo";

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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ViewTransitions>
      <html lang="pt-BR" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${sora.variable} ${bebasNeue.variable} antialiased`}
        >
          <GoogleTagManager gtmId="GTM-5TZ2QBSJ" />
          <JsonLd data={[createWebsiteJsonLd(), createPersonJsonLd()]} />
          <Providers>
            <SiteHeader />
            {children}
            <SiteFooter />
          </Providers>
          <GoogleAnalytics gaId="G-826MPJLXRR" />
        </body>
      </html>
    </ViewTransitions>
  );
}
