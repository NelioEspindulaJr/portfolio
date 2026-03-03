import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatPostDate, getAllPosts, getPostBySlug } from "@/lib/blog";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: `${post.title} | Thoughts`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
        <div className="space-y-5">
          <Button
            asChild
            variant="ghost"
            className="-ml-4 text-muted-foreground"
          >
            <Link href="/blog">← Back to thoughts</Link>
          </Button>

          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
            {post.category}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {post.title}
          </h1>

          <p className="text-sm text-muted-foreground">
            {formatPostDate(post.publishedAt)} · {post.readTime}
          </p>
        </div>

        <Separator className="my-8" />

        <article className="space-y-6">
          {post.blocks.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={`${block.type}-${index}`}
                  className="pt-2 text-2xl font-semibold tracking-tight"
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "quote") {
              return (
                <blockquote
                  key={`${block.type}-${index}`}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-lg text-foreground"
                >
                  {block.text}
                </blockquote>
              );
            }

            if (block.type === "list") {
              return (
                <ul
                  key={`${block.type}-${index}`}
                  className="list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/90"
                >
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }

            return (
              <p
                key={`${block.type}-${index}`}
                className="text-lg leading-relaxed text-foreground/90"
              >
                {block.text}
              </p>
            );
          })}
        </article>
      </main>
    </div>
  );
}
