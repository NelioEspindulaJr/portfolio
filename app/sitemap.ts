import type { MetadataRoute } from "next";

import { getStaticPostSlugs } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/en"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/en/blog"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getStaticPostSlugs().flatMap((slug) => [
    {
      url: absoluteUrl(`/blog/${slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl(`/en/blog/${slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]);

  return [...staticRoutes, ...blogRoutes];
}
