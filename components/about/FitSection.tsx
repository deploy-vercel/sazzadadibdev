import { fit } from "@/data/about";
import { Reveal } from "@/components/motion/Reveal";
import { SectionNumber } from "./SectionNumber";

export function FitSection() {
  return (
    <section
      id="sec-fit"
      className="scroll-mt-6 border-b border-ink/10 bg-surface-2 px-6 py-20 md:px-12 lg:px-16 lg:py-24"
      aria-labelledby="sec-fit-label"
    >
      <Reveal>
        <SectionNumber id="sec-fit-label" n={4} label="Education & focus" />
        <p className="mt-10 font-syne text-section-lead text-ink/85 italic">{fit.lead}</p>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <Reveal className="border border-accent/35 bg-accent-fill/3 px-8 py-8">
          <h3 className="font-mono text-mini tracking-[0.28em] text-accent uppercase">✓ {fit.yes.title}</h3>
          <ul className="mt-7 flex flex-col gap-4">
            {fit.yes.items.map((item) => (
              <li key={item} className="flex items-baseline gap-3.5 text-body-sm leading-relaxed text-ink/75">
                <span aria-hidden className="shrink-0 font-mono text-mini text-accent">
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="border border-ink/12 bg-surface-2 px-8 py-8">
          <h3 className="font-mono text-mini tracking-[0.28em] text-ink/50 uppercase">→ {fit.no.title}</h3>
          <ul className="mt-7 flex flex-col gap-4">
            {fit.no.items.map((item) => (
              <li key={item} className="flex items-baseline gap-3.5 text-body-sm leading-relaxed text-ink/50">
                <span aria-hidden className="shrink-0 font-mono text-mini text-ink/30">
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
