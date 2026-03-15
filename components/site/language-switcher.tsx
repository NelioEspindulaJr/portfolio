"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const languageOptions = [
  {
    locale: "pt-br",
    labelKey: "pt-br",
    shortKey: "shortPt",
    flag: "/brazil.svg",
  },
  {
    locale: "en",
    labelKey: "en",
    shortKey: "shortEn",
    flag: "/united-states.svg",
  },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-border/70 bg-card/85 p-1 shadow-sm backdrop-blur-sm"
      aria-label={t("label")}
    >
      {languageOptions.map((option) => {
        const isActive = option.locale === locale;

        return (
          <TrackedLink
            key={option.locale}
            href={pathname}
            locale={option.locale}
            aria-current={isActive ? "page" : undefined}
            aria-label={t(option.labelKey)}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full px-1 md:px-2.5 py-1.5 text-xs font-medium transition-all",
              isActive
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
            event="locale_switch_click"
            payload={{
              source_locale: locale,
              target_locale: option.locale,
            }}
          >
            <Image
              src={option.flag}
              alt={t(option.labelKey)}
              width={18}
              height={18}
              className="object-cover"
              unoptimized
            />
            <span className="hidden sm:inline">{t(option.shortKey)}</span>
          </TrackedLink>
        );
      })}
    </div>
  );
}
