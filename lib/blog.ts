import { getBlogPosts } from "@/data/site-content";
import ptBrMessages from "@/messages/pt-br.json";

type RawTranslator = {
  raw: (key: string) => unknown;
};

export function getAllPosts(t: RawTranslator) {
  return [...getBlogPosts(t)].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getLatestPosts(t: RawTranslator, limit = 2) {
  return getAllPosts(t).slice(0, limit);
}

export function getPostBySlug(t: RawTranslator, slug: string) {
  return getBlogPosts(t).find((post) => post.slug === slug);
}

export function getStaticPostSlugs() {
  return ptBrMessages.Blog.posts.map((post) => post.slug);
}

export function formatPostDate(date: string, locale: string) {
  const language = locale === "pt-br" ? "pt-BR" : "en-US";

  return new Intl.DateTimeFormat(language, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
