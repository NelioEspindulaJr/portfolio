import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getProjects, getServices, getSiteContent } from "@/data/site-content";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { SectionHeading } from "@/components/site/section-heading";

import { Separator } from "@/components/ui/separator";
import { socialIconMap } from "@/components/icons/social-icon-map";
import Image from "next/image";
import ProjectItem from "@/components/site/project-item";
import { HeroImage } from "@/components/site/hero-image";
import {
  createMetadata,
  getLocalizedPath,
  siteConfig,
} from "@/lib/seo";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return createMetadata({
    description: t("homeDescription"),
    path: getLocalizedPath("/", locale),
    keywords: t.raw("homeKeywords") as string[],
    locale,
  });
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  const siteContent = getSiteContent(t);
  const projects = getProjects(t);
  const services = getServices(t);

  return (
    <div className="min-h-screen">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-16 md:py-20">
        {/* Hero */}
        <section className="relative space-y-6 md:pr-52">
          <HeroImage alt={siteContent.name} />
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
            {siteContent.role}
          </p>
          <h1 className="text-5xl leading-tight font-semibold tracking-tight md:text-6xl">
            {siteContent.headline}
            <span className="inline-block animate-text-gradient bg-radial-[circle_at_center] from-[#009C3B] to-[#002776] bg-clip-text text-transparent">
              {siteContent.headlineName}
            </span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {siteContent.intro}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Image
              src="/brazil.svg"
              alt={siteContent.countryLabel}
              width={281}
              height={197}
              unoptimized
              style={{ width: "auto", height: 19 }}
            />
            <span aria-hidden="true">·</span>
            <TrackedLink
              href={`mailto:${siteContent.email}`}
              className="text-foreground underline-offset-4 hover:underline"
              event="contact_email_click"
              payload={{
                location: "home_hero",
                contact_method: "email",
              }}
            >
              {siteContent.email}
            </TrackedLink>
          </div>
          <div className="flex flex-wrap gap-3">
            <TrackedLink
              href={`mailto:${siteContent.email}`}
              className="inline-flex h-10 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-80"
              event="contact_cta_click"
              payload={{ location: "hero_primary_cta" }}
            >
              {siteContent.heroPrimaryCta}
            </TrackedLink>
            <TrackedLink
              href="/#projects"
              className="inline-flex h-10 items-center rounded-md border border-border px-5 text-sm font-medium transition-colors hover:bg-muted"
              event="navigation_click"
              payload={{ location: "hero_secondary_cta", destination: "#projects" }}
            >
              {siteContent.heroSecondaryCta}
            </TrackedLink>
          </div>
        </section>

        <Separator />

        {/* About */}
        <section id="about" className="space-y-5">
          <SectionHeading
            eyebrow={t("sections.aboutEyebrow")}
            title={t("sections.aboutTitle")}
          />
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {siteContent.about}
          </p>

          <div className="flex flex-row gap-4">
            {siteContent.social.map((social) => {
              const Icon = socialIconMap[social.id];

              return (
                <TrackedLink
                  key={social.id}
                  href={social.href}
                  aria-label={social.label}
                  className="text-foreground transition-colors hover:text-muted-foreground"
                  target="_blank"
                  rel="noreferrer noopener"
                  event="social_link_click"
                  payload={{
                    location: "home_about",
                    social_network: social.id,
                  }}
                >
                  <Icon className="size-6" />
                </TrackedLink>
              );
            })}
          </div>
        </section>

        <Separator />

        {/* Services */}
        <section id="services" className="space-y-6">
          <SectionHeading
            eyebrow={t("sections.servicesEyebrow")}
            title={t("sections.servicesTitle")}
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <li
                key={service.name}
                className="rounded-lg border border-border p-5 space-y-2"
              >
                <p className="text-sm font-semibold text-foreground">
                  {service.name}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        {/* Projects */}
        <section id="projects" className="space-y-6">
          <SectionHeading
            eyebrow={t("sections.projectsEyebrow")}
            title={t("sections.projectsTitle")}
          />
          {projects.map((project) => (
            <ProjectItem key={project.name} {...project} />
          ))}
        </section>

        <Separator />

        {/* Contact */}
        <section id="contact" className="space-y-6">
          <SectionHeading
            eyebrow={t("sections.contactEyebrow")}
            title={t("sections.contactTitle")}
          />
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("sections.contactDescription")}
          </p>
          <div className="flex flex-wrap gap-3">
            <TrackedLink
              href={`mailto:${siteContent.email}`}
              className="inline-flex h-10 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-80"
              event="contact_cta_click"
              payload={{ location: "contact_section_email" }}
            >
              {t("sections.contactEmailCta")}
            </TrackedLink>
            <TrackedLink
              href={siteContent.social.find((s) => s.id === "linkedin")?.href ?? "#"}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 items-center rounded-md border border-border px-5 text-sm font-medium transition-colors hover:bg-muted"
              event="social_link_click"
              payload={{ location: "contact_section", social_network: "linkedin" }}
            >
              {t("sections.contactLinkedInCta")}
            </TrackedLink>
          </div>
          <p className="text-sm text-muted-foreground">
            {siteConfig.url.replace("https://", "")} ·{" "}
            <TrackedLink
              href={`mailto:${siteContent.email}`}
              className="underline-offset-4 hover:underline"
              event="contact_email_click"
              payload={{ location: "contact_section_inline", contact_method: "email" }}
            >
              {siteContent.email}
            </TrackedLink>
          </p>
        </section>
      </main>
    </div>
  );
}
