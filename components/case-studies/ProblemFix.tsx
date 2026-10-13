import { Reveal } from "@/components/motion/Reveal";

export function ProblemFix({ problem, features, stack }: { problem: string; features: string[]; stack: string[] }) {
  return (
    <section className="mt-20 border-y border-ink/10 bg-surface-2" aria-label="The idea and what I built">
      <div className="gutter mx-auto grid max-w-site gap-12 py-20 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h2 className="font-mono text-mini tracking-label text-accent uppercase">The idea</h2>
          <p className="mt-8 font-syne text-[clamp(1.375rem,2vw,1.875rem)] leading-[1.35] font-normal text-ink/85 italic">{problem}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-mono text-mini tracking-label text-accent uppercase">What I built</h2>
          <ul className="mt-8 flex flex-col gap-3">
            {features.map((f) => (
              <li key={f} className="flex items-baseline gap-3 text-base leading-relaxed text-ink/60">
                <span aria-hidden className="shrink-0 font-mono text-mini text-accent">
                  ▸
                </span>
                {f}
              </li>
            ))}
          </ul>
          <ul aria-label="Stack" className="mt-8 grid grid-cols-2 border-t border-l border-ink/14 sm:grid-cols-4 xl:grid-cols-5">
            {stack.map((s) => (
              <li key={s} className="border-r border-b border-ink/14 px-3.5 py-3 text-[13px] text-ink/75">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
