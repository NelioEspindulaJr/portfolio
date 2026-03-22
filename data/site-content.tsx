export type NavItem = {
  href: string;
  label: string;
};

export type SocialId = "github" | "linkedin" | "instagram";

export type SocialItem = {
  id: SocialId;
  label: string;
  href: string;
};

export type Project = {
  name: string;
  url: string;
  description: string;
  iconDir?: string;
};

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  blocks: BlogBlock[];
};

export type Service = {
  name: string;
  description: string;
};

export type SiteContent = {
  name: string;
  role: string;
  headline: string;
  headlineName: string;
  intro: string;
  about: string;
  email: string;
  countryLabel: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  nav: NavItem[];
  social: SocialItem[];
};

type RawTranslator = {
  raw: (key: string) => unknown;
};

function readRaw<T>(t: RawTranslator, key: string) {
  return t.raw(key) as T;
}

export function getSiteContent(t: RawTranslator) {
  return readRaw<SiteContent>(t, "content");
}

export function getProjects(t: RawTranslator) {
  return readRaw<Project[]>(t, "projects");
}

export function getServices(t: RawTranslator) {
  return readRaw<Service[]>(t, "services");
}

export function getBlogPosts(t: RawTranslator) {
  return readRaw<BlogPost[]>(t, "posts");
}
