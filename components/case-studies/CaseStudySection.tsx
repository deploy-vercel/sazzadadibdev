import Image from "next/image";
import type { CaseStudySection as Section } from "@/data/caseStudies";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { cn, pad } from "@/lib/utils";

/** One numbered feature row: screenshot and story, alternating sides. Without a screenshot the story spans the row. */
export function CaseStudySection({ section, index }: { section: Section; index: number }) {
  const imageRight = index % 2 === 0;
  const hasImage = Boolean(section.image);
  return (
    <section
      className={cn(
        "grid items-center gap-10 py-16 md:gap-14 md:py-20",
        hasImage && "md:grid-cols-2",
        index > 0 && "border-t border-ink/10",
      )}
      aria-labelledby={`feature-${index}`}
    >
      {section.image && (
        <ImageReveal className={cn("group relative border border-ink/10", imageRight && "md:order-2")}>
          <div className="relative aspect-[16/10]">
            <Image
              src={section.image}
              alt={section.alt ?? ""}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </ImageReveal>
      )}
      <Reveal delay={0.08} className={cn(hasImage ? imageRight && "md:order-1" : "max-w-3xl")}>
        <p className="font-mono text-mini tracking-[0.24em] uppercase">
          <span className="text-accent">/{pad(index + 1)}</span> <span className="text-ink/40">— {section.label}</span>
        </p>
        <h3 id={`feature-${index}`} className="mt-4 mb-5 font-syne text-2xl leading-tight font-bold md:text-4xl">
          {section.title}
        </h3>
        {section.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="mb-4 text-body leading-relaxed text-ink/60 md:text-base">
            {p}
          </p>
        ))}
      </Reveal>
    </section>
  );
}
