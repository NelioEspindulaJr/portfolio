import { ArrowUpRight } from "lucide-react";

import type { BlogPost } from "@/data/site-content";
import { formatPostDate } from "@/lib/blog";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";

type BlogPostCardProps = {
  post: BlogPost;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-xl border border-border bg-card p-5">
      <div className="space-y-3">
        <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{post.category}</p>
        <h3 className="text-xl font-semibold leading-tight">
          <TrackedLink
            href={`/blog/${post.slug}`}
            className="hover:underline underline-offset-4"
            event="blog_post_click"
            payload={{
              location: "blog_card_title",
              post_slug: post.slug,
            }}
          >
            {post.title}
          </TrackedLink>
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
        <p>
          {formatPostDate(post.publishedAt)} · {post.readTime}
        </p>
        <Button asChild variant="ghost" size="sm" className="-mr-2">
          <TrackedLink
            href={`/blog/${post.slug}`}
            event="blog_post_click"
            payload={{
              location: "blog_card_cta",
              post_slug: post.slug,
            }}
          >
            Read
            <ArrowUpRight className="size-4" />
          </TrackedLink>
        </Button>
      </div>
    </article>
  );
}
