import type { Metadata } from "next";

import type { BlogPost } from "@/data/site-content";

export const siteConfig = {
  name: "Nélio Espíndula Junior",
  shortName: "Nélio Espíndula",
  title: "Nélio Espíndula Junior",
  description:
    "Portfólio pessoal de Nélio Espíndula Junior com projetos, textos e experimentos sobre desenvolvimento fullstack, produto e tecnologia.",
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
    "portfolio",
    "desenvolvedor fullstack",
    "Next.js",
    "React",
    "TypeScript",
    "blog de tecnologia",
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
};

type ArticleMetadataInput = {
  post: BlogPost;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  keywords = [],
  image = siteConfig.ogImage.path,
  noIndex = false,
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
      locale: siteConfig.locale,
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
}: ArticleMetadataInput): Metadata {
  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(path);
  const images = [
    {
      url: absoluteUrl(siteConfig.ogImage.path),
      alt: siteConfig.ogImage.alt,
    },
  ];

  return {
    ...createMetadata({
      title: `${post.title} | Blog`,
      description: post.summary,
      path,
      keywords: post.tags,
    }),
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
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
    sameAs: [...siteConfig.socialLinks],
    jobTitle: "Desenvolvedor Fullstack",
    knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "SEO técnico"],
  };
}

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "pt-BR",
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
}: Required<Pick<MetadataInput, "title" | "description" | "path">>) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function createArticleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    url: absoluteUrl(`/blog/${post.slug}`),
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
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}
