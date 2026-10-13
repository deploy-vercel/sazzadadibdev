import Image from "next/image";
import type { CaseStudy } from "@/data/caseStudies";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CaseStudyStats } from "./CaseStudyStats";

export function CaseStudyHero({ study }: { study: CaseStudy }) {
  return (
    <section className="gutter mx-auto max-w-site pt-16 md:pt-24">
      <FadeIn onMount>
        <SectionLabel className="tracking-[0.32em]">Case study — {study.category}</SectionLabel>
      </FadeIn>
      <PageTitle
        thin={study.titleThin}
        bold={study.titleBold}
        accentDot
        className="mt-8"
        thinClassName="text-[clamp(2.5rem,6.5vw,6.5rem)] tracking-tight"
        boldClassName="text-[clamp(3rem,8.5vw,8.75rem)]"
      />
      <Reveal delay={0.35}>
        <p className="mt-9 max-w-xl text-base leading-relaxed text-ink/60 md:text-lg">{study.description}</p>
      </Reveal>
      <ImageReveal className="relative mt-14 border border-ink/10" delay={0.2}>
        <div className="relative aspect-[16/10] md:aspect-[16/8]">
          <Image
            src={study.heroImage}
            alt={study.heroAlt}
            fill
            preload
            sizes="(min-width: 1520px) 1360px, 100vw"
            className="object-cover object-top"
          />
        </div>
      </ImageReveal>
      <CaseStudyStats stats={study.stats} />
    </section>
  );
}
