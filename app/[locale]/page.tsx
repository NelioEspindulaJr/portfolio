import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getProjects, getSiteContent } from "@/data/site-content";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { SectionHeading } from "@/components/site/section-heading";
import { JsonLd } from "@/components/seo/json-ld";

import { Separator } from "@/components/ui/separator";
import { socialIconMap } from "@/components/icons/social-icon-map";
import Image from "next/image";
import ProjectItem from "@/components/site/project-item";
import {
  createCollectionPageJsonLd,
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
    locale,
  });
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  const siteContent = getSiteContent(t);
  const projects = getProjects(t);

  return (
    <div className="min-h-screen">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-16 md:py-20">
        <JsonLd
          data={createCollectionPageJsonLd({
            title: siteConfig.title,
            description: siteContent.intro,
            path: getLocalizedPath("/", locale),
            locale,
          })}
        />
        <section className="space-y-6">
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
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
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
        </section>

        <Separator />

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

        <section id="now" className="space-y-5">
          <SectionHeading
            eyebrow={t("sections.nowEyebrow")}
            title={t("sections.nowTitle")}
          />
          <ul className="space-y-3 text-base text-muted-foreground">
            {siteContent.now.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-2 size-1.5 rounded-full bg-foreground/70"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        <section id="projects" className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow={t("sections.projectsEyebrow")}
              title={t("sections.projectsTitle")}
            />
          </div>
          {projects.map((project) => (
            <ProjectItem key={project.name} {...project} />
          ))}
        </section>
      </main>
    </div>
  );
}
