import type { CaseStudyWorkflow } from "@/data/caseStudies";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { StrokeText } from "@/components/ui/StrokeText";
import { cn, pad } from "@/lib/utils";

const chipTone = {
  accent: "border-accent/35 bg-accent-fill/4 text-accent",
  muted: "border-ink/14 text-ink/60",
  dot: "border-ink/14 text-ink/60",
} as const;

/** Four-step workflow strip with connecting arrows. */
export function CaseStudyTimeline({ workflow }: { workflow: CaseStudyWorkflow }) {
  const last = workflow.steps.length - 1;
  return (
    <section className="border-t border-ink/10 bg-surface-2" aria-labelledby="workflow-title">
      <div className="gutter mx-auto max-w-site py-20 md:py-24">
        <Reveal>
          <p className="font-mono text-mini tracking-label text-accent uppercase">{workflow.eyebrow}</p>
          <SplitHeading
            id="workflow-title"
            as="h2"
            thin={workflow.thin}
            bold={workflow.bold}
            className="mt-8 text-[clamp(2rem,3.6vw,3.75rem)]"
          />
        </Reveal>

        <Stagger as="ol" className="mt-14 grid border-t border-l border-ink/10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {workflow.steps.map((step, i) => (
            <StaggerItem
              as="li"
              key={step.title}
              className={cn("relative border-r border-b border-ink/10 p-8", i === last && "bg-accent-fill/4")}
            >
              {i === last ? (
                <span className="font-syne text-5xl leading-none font-extrabold text-accent">{pad(i + 1)}</span>
              ) : (
                <StrokeText alpha={0.3} className="font-syne text-5xl leading-none font-extrabold">
                  {pad(i + 1)}
                </StrokeText>
              )}
              <h3 className="mt-6 font-syne text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">{step.body}</p>
              {i < last && (
                <span
                  aria-hidden
                  className="absolute top-1/2 -right-[13px] z-[1] hidden -translate-y-1/2 bg-surface-2 px-0.5 py-1.5 text-base text-accent lg:block"
                >
                  →
                </span>
              )}
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex flex-wrap gap-3">
          {workflow.chips.map((chip) => (
            <span
              key={chip.label}
              className={cn(
                "inline-flex items-center gap-2.5 border px-4 py-2.5 font-mono text-mini tracking-[0.18em] uppercase",
                chipTone[chip.tone],
              )}
            >
              {chip.tone === "dot" && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ink/40" />}
              {chip.label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
