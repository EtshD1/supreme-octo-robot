// Generates /sitemap.xml so search engines can find every lesson.
import type { MetadataRoute } from "next";
import { lessons } from "./learn/lessons";

const baseUrl = "http://localhost:3000"; // use your real domain in production

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/learn`, changeFrequency: "weekly", priority: 0.8 },
    ...lessons.map((l) => ({ url: `${baseUrl}/learn/${l.slug}`, changeFrequency: "weekly" as const })),
  ];
}
