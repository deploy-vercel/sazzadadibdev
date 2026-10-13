import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-studies/CaseStudyPage";
import { leadCaseStudy as study } from "@/data/caseStudies";

// /case-study serves the lead case study; the rest live at /case-study/[slug].

export const metadata: Metadata = {
  title: `${study.title} — Case Study`,
  description: study.description,
  alternates: { canonical: "/case-study" },
  openGraph: {
    type: "article",
    title: `${study.title} — Case Study`,
    description: study.description,
    url: "/case-study",
    images: [{ url: study.heroImage, width: 1600, height: 1000, alt: study.heroAlt }],
  },
};

export default function LeadCaseStudyPage() {
  return <CaseStudyPage study={study} />;
}
