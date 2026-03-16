import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Providers from "@/components/providers/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { routing } from "@/i18n/routing";
import { createPersonJsonLd, createWebsiteJsonLd } from "@/lib/seo";

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function Layout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <Providers>
      <JsonLd data={[createWebsiteJsonLd(locale), createPersonJsonLd()]} />
      <SiteHeader />
      {children}
      <SiteFooter />
    </Providers>
  );
}
