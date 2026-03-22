"use client";

import { useTranslations } from "next-intl";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { getSiteContent } from "@/data/site-content";

export function SiteFooter() {
  const t = useTranslations("Home");
  const siteContent = getSiteContent(t);

  return (
    <footer className="w-full border-t border-border/40">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-foreground">
            {siteContent.name}
          </span>
          <TrackedLink
            href={`mailto:${siteContent.email}`}
            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
            event="contact_email_click"
            payload={{ location: "footer", contact_method: "email" }}
          >
            {siteContent.email}
          </TrackedLink>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <TrackedLink
            href="/#services"
            className="hover:text-foreground transition-colors"
            event="navigation_click"
            payload={{ location: "footer_nav", destination: "#services" }}
          >
            {t("sections.servicesEyebrow")}
          </TrackedLink>
          <TrackedLink
            href="/#projects"
            className="hover:text-foreground transition-colors"
            event="navigation_click"
            payload={{ location: "footer_nav", destination: "#projects" }}
          >
            {t("sections.projectsEyebrow")}
          </TrackedLink>
          <TrackedLink
            href="/#contact"
            className="hover:text-foreground transition-colors"
            event="navigation_click"
            payload={{ location: "footer_nav", destination: "#contact" }}
          >
            {t("sections.contactEyebrow")}
          </TrackedLink>
          <span className="opacity-40">·</span>
          <span className="opacity-40">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
