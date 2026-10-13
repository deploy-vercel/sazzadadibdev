import { processSteps } from "@/data/services";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ProgressTick } from "@/components/ui/ProgressTick";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { StrokeText } from "@/components/ui/StrokeText";
import { pad } from "@/lib/utils";

export function ProcessTimeline() {
  const total = processSteps.length;
  return (
    <section className="bg-surface-2" aria-labelledby="process-title">
      <div className="gutter mx-auto max-w-site py-20 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="mb-6 font-mono text-xs tracking-[0.32em] text-ink/40 uppercase">The process</p>
            <SplitHeading id="process-title" thin="Four steps," bold="No black boxes" stacked className="text-section" />
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink/60">
            The rhythm I follow on every build — from first conversation to deployment. Progress you can see along the way, not a big reveal
            at the end.
          </p>
        </Reveal>

        <ol className="mt-16 md:mt-20">
          {processSteps.map((step) => (
            <Reveal
              as="li"
              key={step.step}
              className="grid gap-8 border-t border-ink/12 py-10 md:grid-cols-[12.5rem_1fr] md:py-12 lg:grid-cols-[12.5rem_1fr_1fr] lg:gap-12"
            >
              <div>
                <StrokeText alpha={0.32} className="font-syne text-6xl leading-none font-extrabold md:text-7xl">
                  {pad(step.step)}
                </StrokeText>
                <div className="mt-3 font-mono text-micro tracking-label text-ink/35 uppercase">
                  Step {pad(step.step)} / {pad(total)}
                </div>
                <ProgressTick value={step.step / total} />
              </div>
              <div>
                <h3 className="font-syne text-2xl font-bold text-ink">{step.title}</h3>
                <p className="mt-4 max-w-md text-body leading-relaxed text-ink/60">{step.description}</p>
              </div>
              <Stagger
                as="ul"
                className="grid grid-cols-1 content-start gap-3 sm:grid-cols-2 md:col-start-2 lg:col-start-auto"
                stagger={0.06}
                delay={0.15}
              >
                {step.items.map((item) => (
                  <StaggerItem
                    as="li"
                    key={item}
                    className="flex items-baseline gap-2.5 border border-ink/10 px-3.5 py-3 text-[13.5px] text-ink/75"
                  >
                    <span aria-hidden className="font-mono text-micro text-accent">
                      ▸
                    </span>
                    {item}
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
