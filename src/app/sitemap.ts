import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { tools } from "@/data/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/articles`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${site.url}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ...tools.map((t) => ({
      url: `${site.url}${t.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
