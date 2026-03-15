import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { bebasNeue, inter, sora } from "@/app/[locale]/fonts";
import { ViewTransitions } from "next-view-transitions";

import Providers from "@/components/providers/providers";
import "./globals.css";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
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

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale();

  return (
    <ViewTransitions>
      <html lang={locale === "pt-br" ? "pt-BR" : "en"} suppressHydrationWarning>
        <body
          className={`${inter.variable} ${sora.variable} ${bebasNeue.variable} antialiased`}
        >
          <GoogleTagManager gtmId="GTM-5TZ2QBSJ" />
          <JsonLd data={[createWebsiteJsonLd(locale), createPersonJsonLd()]} />
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
