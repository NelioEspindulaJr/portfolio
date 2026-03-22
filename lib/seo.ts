import type { Metadata } from "next";

import type { BlogPost } from "@/data/site-content";

export const siteConfig = {
  name: "Nélio Espíndula Junior",
  shortName: "Nélio Espíndula",
  title: "Nélio Espíndula Junior — Desenvolvedor Fullstack",
  description:
    "Desenvolvedor fullstack disponível para contratação. Construo aplicações web modernas, APIs e produtos SaaS com React, Next.js e Node.js. Baseado no Brasil, atendendo clientes no mundo todo.",
  url: "https://nelioespindula.dev",
  locale: "pt_BR",
  type: "website",
  author: {
    name: "Nélio Espíndula Junior",
    url: "https://nelioespindula.dev",
  },
  keywords: [
    "Nélio Espíndula Junior",
    "Nélio Espíndula",
    "desenvolvedor fullstack",
    "fullstack developer for hire",
    "desenvolvedor React",
    "Next.js developer",
    "Node.js",
    "desenvolvimento web",
    "web development services",
    "SaaS development",
    "TypeScript",
  ],
  socialLinks: [
    "https://github.com/NelioEspindulaJr",
    "https://linkedin.com/in/nelioespindulajunior",
    "https://instagram.com/njuniorespindula/",
  ],
  ogImage: {
    path: "/og-image.png",
    alt: "Prévia do site de Nélio Espíndula Junior",
  },
} as const;

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  locale?: string;
};

type ArticleMetadataInput = {
  post: BlogPost;
  locale?: string;
  titleSuffix?: string;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function getLocalizedPath(path = "/", locale = "pt-br") {
  if (locale === "pt-br") {
    return path;
  }

  return path === "/" ? "/en" : `/en${path}`;
}

export function getLanguageTag(locale = "pt-br") {
  return locale === "pt-br" ? "pt-BR" : "en-US";
}

export function getOpenGraphLocale(locale = "pt-br") {
  return locale === "pt-br" ? "pt_BR" : "en_US";
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  keywords = [],
  image = siteConfig.ogImage.path,
  noIndex = false,
  locale = "pt-br",
}: MetadataInput = {}): Metadata {
  const resolvedTitle = title ?? siteConfig.title;
  const url = absoluteUrl(path);
  const images = image
    ? [{ url: absoluteUrl(image), alt: siteConfig.ogImage.alt }]
    : undefined;

  return {
    metadataBase: new URL(siteConfig.url),
    ...(title ? { title } : {}),
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    authors: [siteConfig.author],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: getOpenGraphLocale(locale),
      type: "website",
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: resolvedTitle,
      description,
      images: image ? [absoluteUrl(image)] : undefined,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
}

export function createArticleMetadata({
  post,
  locale = "pt-br",
  titleSuffix = "Blog",
}: ArticleMetadataInput): Metadata {
  const path = getLocalizedPath(`/blog/${post.slug}`, locale);
  const url = absoluteUrl(path);
  const images = [
    {
      url: absoluteUrl(siteConfig.ogImage.path),
      alt: siteConfig.ogImage.alt,
    },
  ];

  return {
    ...createMetadata({
      title: `${post.title} | ${titleSuffix}`,
      description: post.summary,
      path,
      keywords: post.tags,
      locale,
    }),
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      siteName: siteConfig.name,
      locale: getOpenGraphLocale(locale),
      type: "article",
      images,
      publishedTime: post.publishedAt,
      authors: [siteConfig.author.name],
      tags: post.tags,
    },
  };
}

export function createPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    email: "hello@nelioespindula.dev",
    sameAs: [...siteConfig.socialLinks],
    jobTitle: "Desenvolvedor Fullstack",
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "SaaS development",
      "API design",
      "SEO técnico",
      "Core Web Vitals",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de Desenvolvimento Web",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Desenvolvimento Fullstack",
            description:
              "Aplicações web completas com React, Next.js e Node.js.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Design e Integração de APIs",
            description:
              "APIs REST e integração com serviços externos e meios de pagamento.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Desenvolvimento de Produtos SaaS",
            description:
              "Plataformas multi-tenant com gestão de assinaturas e dashboards.",
          },
        },
      ],
    },
  };
}

export function createWebsiteJsonLd(locale = "pt-br") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: getLanguageTag(locale),
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };
}

export function createCollectionPageJsonLd({
  title,
  description,
  path,
  locale = "pt-br",
}: Required<Pick<MetadataInput, "title" | "description" | "path">> & {
  locale?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl(path),
    inLanguage: getLanguageTag(locale),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function createArticleJsonLd(post: BlogPost, locale = "pt-br") {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    url: absoluteUrl(getLocalizedPath(`/blog/${post.slug}`, locale)),
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    mainEntityOfPage: absoluteUrl(getLocalizedPath(`/blog/${post.slug}`, locale)),
  };
}
