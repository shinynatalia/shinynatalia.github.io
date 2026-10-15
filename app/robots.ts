import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Let search engines crawl everything and point them at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://nataliashiny.vercel.app/sitemap.xml",
  };
}
