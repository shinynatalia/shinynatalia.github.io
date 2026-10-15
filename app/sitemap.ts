import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export const dynamic = "force-static";

const SITE = "https://nataliashiny.vercel.app";

// Every page on the site, so Google can find them all (trailing slashes match the site's URLs).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/projects/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...projects.map((p) => ({ url: `${SITE}/projects/${p.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];
}
