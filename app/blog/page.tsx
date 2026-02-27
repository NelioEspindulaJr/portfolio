import type { Metadata } from "next";

import { getAllPosts } from "@/lib/blog";

import { BlogPostCard } from "@/components/site/blog-post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  title: "Thoughts | Nelio Espindula",
  description: "Personal writing, notes, and reflections.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
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
