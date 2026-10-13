import { journey } from "@/data/home";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Journey() {
  return (
    <section id="about" className="scroll-mt-10 border-t border-ink/10 bg-surface-2 pt-20 pb-10" aria-labelledby="journey-title">
      <Reveal className="pb-4 text-center">
        <SectionLabel>{journey.eyebrow}</SectionLabel>
        <h2 id="journey-title" className="mt-4 mb-3 font-syne text-3xl font-extrabold text-ink md:text-4xl">
          {journey.title}
        </h2>
        <p className="mx-auto max-w-lg px-4 text-ink/60">{journey.lead}</p>
      </Reveal>

      <ol className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        {journey.items.map((item, i) => (
          <Reveal as="li" key={item.year} delay={i * 0.05} className="group">
            <div className="flex items-start gap-4 py-6 md:gap-8 md:py-8">
              <span className="w-24 shrink-0 pt-1 font-mono text-3xl text-ink/10 uppercase transition-colors duration-300 select-none group-hover:text-ink md:w-28 md:text-4xl">
                {item.year}
              </span>
              <div className="min-w-0 flex-1 pt-1">
                <h3 className="mb-2 text-xl font-bold text-ink/75 transition-colors duration-300 group-hover:text-ink md:text-2xl">
                  {item.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-ink/50 md:text-base">{item.body}</p>
                <p className="mt-3 font-mono text-xs tracking-[0.18em] text-ink/40 uppercase">{item.meta}</p>
              </div>
            </div>
            <div aria-hidden className="relative h-px w-full overflow-hidden bg-ink/10">
              <div className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-ink/40 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
