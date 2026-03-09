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

export const siteContent = {
  name: "Nélio Espíndula Junior",
  role: "Um canto qualquer na internet",
  headline: "Olá, eu sou o ",
  headlineName: "Nélio",
  intro:
    "Prazer em te ter por aqui, esse é meu espaço pessoal. Eu o uso para compartilhar o que estou aprendendo, o que estou contruindo, ideias, rascunhos, esboços ou qualquer outra coisa que me vier à mente.",
  about:
    "Sou formado como Cientista da Computação e atuo como desenvolvedor fullstack, equilibrando interfaces bem pensadas com sistemas backend sólidos e organizados. Acredito em progresso constante, código claro e soluções que priorizam simplicidade, manutenção e boas experiências digitais, tanto para quem usa quanto para quem desenvolve.",
  now: [
    "Escrever notas, pensamentos e experiências como desenvolvedor",
    "Melhorar este site como um portfólio pessoal de longo prazo.",
    "Manter as coisas simples, minimalistas e úteis.",
  ],
  email: "hello@nelioespindula.dev",
  nav: [
    { href: "/#about", label: "Sobre mim" },
    { href: "/#portfolio", label: "Portfólio" },
    { href: "/#projects", label: "Projetos" },
    // { href: "/blog", label: "Blog" },
  ] satisfies NavItem[],
  social: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/NelioEspindulaJr",
    },
    {
      id: "linkedin",
      label: "Linkedin",
      href: "https://linkedin.com/in/nelioespindulajunior",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://instagram.com/njuniorespindula/",
    },
  ] satisfies SocialItem[],
};

export const blogPosts: BlogPost[] = [
  {
    slug: "building-ux-that-feels-intentional",
    title: "Building UX That Feels Intentional",
    summary:
      "Small interface choices that quietly shape how people feel while using a product.",
    category: "UX",
    publishedAt: "2026-02-20",
    readTime: "6 min read",
    tags: ["UX", "Frontend", "Product"],
    blocks: [
      {
        type: "paragraph",
        text: "Most users cannot name why an interface feels right, but they notice it quickly. Good UX often comes from reducing friction and keeping a clear rhythm.",
      },
      {
        type: "heading",
        text: "What Intentional Means",
      },
      {
        type: "paragraph",
        text: "An intentional interface gives people a path. It avoids noise, respects attention, and behaves in ways users can predict.",
      },
      {
        type: "list",
        items: [
          "Design for comprehension first.",
          "Keep interactions consistent.",
          "Use motion only when it helps understanding.",
        ],
      },
      {
        type: "quote",
        text: "People forgive minimal visuals. They do not forgive confusion.",
      },
    ],
  },
  {
    slug: "my-nextjs-folder-structure",
    title: "My Next.js Folder Structure for Real Projects",
    summary: "A structure that stays calm as projects grow.",
    category: "Engineering",
    publishedAt: "2026-01-11",
    readTime: "8 min read",
    tags: ["Next.js", "Architecture", "TypeScript"],
    blocks: [
      {
        type: "paragraph",
        text: "Folder structure is not about being clever. It is about reducing hesitation when you return to the code later.",
      },
      {
        type: "heading",
        text: "Principles I Follow",
      },
      {
        type: "list",
        items: [
          "Route-specific logic stays close to the route.",
          "Reusable parts live in obvious shared places.",
          "Names explain intention, not technical trivia.",
        ],
      },
      {
        type: "paragraph",
        text: "The goal is not perfect organization. The goal is easy maintenance.",
      },
    ],
  },
  {
    slug: "frontend-performance-without-guessing",
    title: "Frontend Performance Without Guessing",
    summary:
      "A simple loop for performance work that avoids random optimizations.",
    category: "Performance",
    publishedAt: "2025-12-04",
    readTime: "5 min read",
    tags: ["Performance", "Core Web Vitals", "DX"],
    blocks: [
      {
        type: "paragraph",
        text: "Performance gets expensive when teams optimize blindly. Measure, change, verify, repeat.",
      },
      {
        type: "list",
        items: [
          "Create a baseline for key pages.",
          "Prioritize what impacts real users.",
          "Retest every change and keep notes.",
        ],
      },
      {
        type: "paragraph",
        text: "This keeps performance work calm and grounded.",
      },
    ],
  },
];
