import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return createMetadata({
    title: t("notFoundTitle"),
    description: t("notFoundDescription"),
    noIndex: true,
  });
}

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="mx-auto flex min-h-[calc(100svh-8rem)] w-full max-w-4xl items-center px-6 py-16 md:min-h-[calc(100svh-9rem)] md:py-20">
      <section className="relative isolate w-full overflow-hidden rounded-4xl border border-border/70 bg-card/85 px-6 py-10 shadow-sm backdrop-blur-sm sm:px-8 sm:py-12 md:px-12 md:py-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.05),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_24%)]" />
        <div className="absolute top-5 right-5 -z-10 h-24 w-24 rounded-full border border-border/60 sm:h-28 sm:w-28" />
        <div className="absolute bottom-6 left-6 -z-10 h-3 w-20 rounded-full bg-foreground/10" />

        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {t("eyebrow")}
            </p>

            <div className="space-y-4">
              <h1 className="max-w-2xl font-heading text-5xl leading-none tracking-[0.03em] uppercase sm:text-6xl md:text-7xl">
                {t("title")}
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                {t("description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/">
                  <ArrowLeft />
                  {t("backHome")}
                </Link>
              </Button>

              {/* <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-6"
              >
                <Link href="/blog">Ir para o blog</Link>
              </Button> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
