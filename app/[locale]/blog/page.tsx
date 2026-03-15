import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getAllPosts } from "@/lib/blog";

import { BlogPostCard } from "@/components/site/blog-post-card";
import { SectionHeading } from "@/components/site/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createCollectionPageJsonLd,
  createMetadata,
  getLocalizedPath,
} from "@/lib/seo";

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });

  return createMetadata({
    title: tMeta("blogTitle"),
    description: tMeta("blogDescription"),
    path: getLocalizedPath("/blog", locale),
    keywords: tMeta.raw("blogKeywords") as string[],
    locale,
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const tBlog = await getTranslations({ locale, namespace: "Blog" });
  const posts = getAllPosts(tBlog);

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
        <JsonLd
          data={createCollectionPageJsonLd({
            title: tBlog("listing.title"),
            description: tBlog("listing.description"),
            path: getLocalizedPath("/blog", locale),
            locale,
          })}
        />
        <SectionHeading
          eyebrow={tBlog("listing.eyebrow")}
          title={tBlog("listing.title")}
          description={tBlog("listing.description")}
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
