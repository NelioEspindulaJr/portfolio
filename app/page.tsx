import Link from "next/link";

import { siteContent } from "@/data/site-content";

import { SectionHeading } from "@/components/site/section-heading";

import { Separator } from "@/components/ui/separator";
import { socialIconMap } from "@/components/icons/social-icon-map";
import Image from "next/image";
import ProjectItem from "@/components/site/project-item";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-16 md:py-20">
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
              alt="brazil"
              width={25}
              height={19}
              unoptimized
            />

            <span aria-hidden="true">·</span>
            <Link
              href={`mailto:${siteContent.email}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {siteContent.email}
            </Link>
          </div>
        </section>

        <Separator />

        <section id="about" className="space-y-5">
          <SectionHeading eyebrow="Sobre mim" title="Quem eu sou" />
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {siteContent.about}
          </p>

          <div className="flex flex-row gap-4">
            {siteContent.social.map((social) => {
              const Icon = socialIconMap[social.id];

              return (
                <Link
                  key={social.id}
                  href={social.href}
                  aria-label={social.label}
                  className="text-foreground transition-colors hover:text-muted-foreground"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Icon className="size-6" />
                </Link>
              );
            })}
          </div>
        </section>

        <Separator />

        <section id="now" className="space-y-5">
          <SectionHeading eyebrow="Este Portfólio" title="Meu foco principal" />
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

        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Projetos" title="Trabalhos recentes" />
          </div>
          <ProjectItem
            name="Zig Tickets"
            url="https://zig.tickets/"
            description="Atuei como fullstack no desenvolvimento e evolução do produto, integrando APIs, construindo interfaces intuitivas e garantindo performance e confiabilidade em fluxos de venda e validação de ingressos."
          />

          <ProjectItem
            name="TISS xml"
            url="https://nelioespindulajr.github.io/tiss-xml/"
            iconDir="/pommernlab.png"
            description="Pequeno projeto de criação e geração do padrão da ANS para troca eletrônica de dados, o TISS (Troca de Informação em Saúde Suplementar. Facilitando de maneira dinâmica a criação do documento."
          />
        </section>
      </main>
    </div>
  );
}
