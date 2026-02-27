import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { BlogPost } from "@/data/site-content";
import { formatPostDate } from "@/lib/blog";

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
          <Link href={`/blog/${post.slug}`} className="hover:underline underline-offset-4">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
        <p>
          {formatPostDate(post.publishedAt)} · {post.readTime}
        </p>
        <Button asChild variant="ghost" size="sm" className="-mr-2">
          <Link href={`/blog/${post.slug}`}>
            Read
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
