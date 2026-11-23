import type { MetadataRoute } from "next";

const BASE_URL = "https://jkiddo-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/backend-apis`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/labs/tech-radar`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
