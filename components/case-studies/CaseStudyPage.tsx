import type { CaseStudy } from "@/data/caseStudies";
import { CaseStudyBar } from "@/components/layout/Header";
import { BilingualCaseStudy } from "./BilingualCaseStudy";
import { CaseStudyCta } from "./CaseStudyCta";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudySection } from "./CaseStudySection";
import { CaseStudyTimeline } from "./CaseStudyTimeline";
import { ProblemFix } from "./ProblemFix";

/** Renders any case study from data. The bilingual variant swaps in its own long-form layout. */
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  if (study.variant === "bilingual") {
    return (
      <main id="main" className="min-h-screen overflow-x-clip bg-surface text-ink">
        <CaseStudyBar
          backHref="/projects"
          backLabel="Back to projects"
          right={<span className="font-mono text-mini tracking-meta text-ink/40 uppercase">বাং / EN — one URL</span>}
        />
        <BilingualCaseStudy study={study} />
      </main>
    );
  }

  return (
    <main id="main" className="min-h-screen overflow-x-clip bg-surface text-ink">
      <CaseStudyBar liveUrl={study.liveUrl} codeUrl={study.codeUrl} />
      <article>
        <CaseStudyHero study={study} />
        <ProblemFix problem={study.problem} features={study.features} stack={study.stack} />
        <div className="gutter mx-auto max-w-site">
          {study.sections.map((section, i) => (
            <CaseStudySection key={section.title} section={section} index={i} />
          ))}
        </div>
        {study.workflow && <CaseStudyTimeline workflow={study.workflow} />}
        <CaseStudyCta cta={study.cta} />
      </article>
    </main>
  );
}
