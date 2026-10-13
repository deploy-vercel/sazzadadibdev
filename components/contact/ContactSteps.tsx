import Link from "next/link";
import { contactFacts, contactSteps } from "@/data/contact";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { StrokeText } from "@/components/ui/StrokeText";
import { cn, pad } from "@/lib/utils";

export function ContactSteps() {
  const last = contactSteps.length - 1;
  return (
    <section className="border-b border-ink/8 bg-surface-2" aria-labelledby="next-title">
      <div className="gutter mx-auto max-w-site py-20 md:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="mb-6 font-mono text-xs tracking-[0.32em] text-ink/40 uppercase">After you hit send</p>
            <SplitHeading id="next-title" thin="What happens" bold="next" className="text-section-sm" />
          </div>
          <p className="max-w-xs text-body leading-relaxed text-ink/60">
            No forms disappearing into a void. Here&apos;s exactly what your message sets in motion — and how fast.
          </p>
        </Reveal>

        <Stagger as="ol" className="mt-16 grid border border-ink/10 md:grid-cols-3" stagger={0.12}>
          {contactSteps.map((step, i) => (
            <StaggerItem
              as="li"
              key={step.title}
              className={cn(
                "relative p-9 pb-10",
                i < last && "border-b border-ink/10 md:border-r md:border-b-0",
                i === last && "bg-accent-fill/4",
              )}
            >
              <div className="flex items-baseline justify-between">
                {i === last ? (
                  <span className="font-syne text-5xl leading-none font-extrabold text-accent">{pad(i + 1)}</span>
                ) : (
                  <StrokeText alpha={0.3} className="font-syne text-5xl leading-none font-extrabold">
                    {pad(i + 1)}
                  </StrokeText>
                )}
                <span className="shrink-0 font-mono text-mini tracking-meta text-accent uppercase">{step.when}</span>
              </div>
              <h3 className="mt-7 font-syne text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-3.5 text-body-sm leading-relaxed text-ink/60">{step.body}</p>
              {i < last && (
                <span
                  aria-hidden
                  className="absolute top-1/2 -right-[13px] z-[1] hidden -translate-y-1/2 bg-surface-2 px-0.5 py-1.5 text-base text-accent md:block"
                >
                  →
                </span>
              )}
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-5">
          <ul className="flex flex-wrap gap-x-9 gap-y-3 font-mono text-xs tracking-tag text-ink/50 uppercase">
            {contactFacts.map((f) => (
              <li key={f}>
                <span aria-hidden className="text-accent">
                  ▸{" "}
                </span>
                {f}
              </li>
            ))}
          </ul>
          <p className="text-body-sm text-ink/50">
            Not ready to talk yet? Fair.{" "}
            <Link
              href="/projects"
              className="text-ink/85 underline decoration-ink/30 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              See the work
            </Link>{" "}
            first — the door stays open.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
