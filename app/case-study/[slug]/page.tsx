import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CaseStudyPage } from "@/components/case-studies/CaseStudyPage";
import { caseStudies, getCaseStudy, leadCaseStudy } from "@/data/caseStudies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

type Params = PageProps<"/case-study/[slug]">["params"];

export async function generateMetadata({ params }: PageProps<"/case-study/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  // The lead case study's canonical home is /case-study.
  const canonical = slug === leadCaseStudy.slug ? "/case-study" : `/case-study/${slug}`;
  const title = `${study.title} — Case Study`;
  return {
    title,
    description: study.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description: study.description,
      url: canonical,
      images: [{ url: study.heroImage, alt: study.heroAlt }],
    },
    twitter: { card: "summary_large_image", title, description: study.description, images: [study.heroImage] },
  };
}

async function CaseStudyContent({ params }: { params: Params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyPage study={study} />;
}

/** Shown only while a client navigation streams in a case study that wasn't prefetched yet. */
function CaseStudySkeleton() {
  return (
    <main className="min-h-screen bg-surface" aria-busy="true">
      <div className="h-[57px] border-b border-ink/10" />
      <div className="gutter mx-auto max-w-site pt-24">
        <div className="h-3 w-56 rounded-full bg-ink/10" />
        <div className="mt-10 h-16 w-2/3 rounded bg-ink/6" />
        <div className="mt-4 h-24 w-5/6 rounded bg-ink/8" />
      </div>
    </main>
  );
}

export default function CaseStudyRoute({ params }: PageProps<"/case-study/[slug]">) {
  return (
    <Suspense fallback={<CaseStudySkeleton />}>
      <CaseStudyContent params={params} />
    </Suspense>
  );
}
