import type { MetadataRoute } from "next";
import { caseStudies, leadCaseStudy } from "@/data/caseStudies";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/case-study`, changeFrequency: "yearly", priority: 0.7 },
  ];
  const studies = caseStudies
    .filter((c) => c.slug !== leadCaseStudy.slug)
    .map((c) => ({ url: `${base}/case-study/${c.slug}`, changeFrequency: "yearly" as const, priority: 0.7 }));
  return [...pages, ...studies];
}
