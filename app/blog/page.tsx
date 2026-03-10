import type { Metadata } from "next";

import { getAllPosts } from "@/lib/blog";

import { BlogPostCard } from "@/components/site/blog-post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createCollectionPageJsonLd,
  createMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description: "Artigos, notas e reflexões sobre desenvolvimento, produto e tecnologia.",
  path: "/blog",
  keywords: ["blog", "artigos", "engenharia de software"],
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
        <JsonLd
          data={createCollectionPageJsonLd({
            title: "Blog",
            description:
              "Artigos, notas e reflexões sobre desenvolvimento, produto e tecnologia.",
            path: "/blog",
          })}
        />
        <SectionHeading
          eyebrow="Thoughts"
          title="Writing archive"
          description="A personal log of ideas, experiments, and questions."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
