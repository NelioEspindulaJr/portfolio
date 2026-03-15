"use client";

import { useTranslations } from "next-intl";

import { getSiteContent } from "@/data/site-content";
import { ModeToggle } from "@/components/theme-toggle";
import Authentication from "./authentication/authentication";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader() {
  const t = useTranslations("Home");
  const siteContent = getSiteContent(t);
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith("/blog");

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/85">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
        <TrackedLink
          href="/"
          className="text-base font-medium tracking-tight text-foreground"
          event="navigation_click"
          payload={{
            location: "header_brand",
            destination: "/",
          }}
        >
          {siteContent.name}
        </TrackedLink>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-5 md:flex">
            {siteContent.nav.map((item) => (
              <TrackedLink
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground"
                event="navigation_click"
                payload={{
                  location: "header_nav",
                  destination: item.href,
                }}
              >
                {item.label}
              </TrackedLink>
            ))}
          </nav>
          <LanguageSwitcher />
          <ModeToggle />
          {isBlogPage && <Authentication />}
        </div>
      </div>
    </header>
  );
}
