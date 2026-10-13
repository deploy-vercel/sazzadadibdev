import { story } from "@/data/about";
import { Reveal } from "@/components/motion/Reveal";
import { SectionNumber } from "./SectionNumber";

export function Story() {
  return (
    <section
      id="sec-story"
      className="scroll-mt-6 border-b border-ink/10 px-6 pt-20 pb-20 md:px-12 lg:px-16 lg:pt-28 lg:pb-24"
      aria-labelledby="sec-story-label"
    >
      <Reveal>
        <SectionNumber id="sec-story-label" n={1} label="The story" />
        <p className="mt-10 max-w-[26ch] font-syne text-section-lead leading-[1.3] font-normal text-ink/85 italic">{story.lead}</p>
        <p className="mt-7 max-w-[26ch] font-syne text-section-lead leading-[1.2] font-bold text-ink">
          {story.punchBefore} <span className="text-accent">{story.punchAccent}</span> {story.punchAfter}
        </p>
      </Reveal>
      <Reveal delay={0.1} className="mt-14 grid max-w-[900px] gap-8 text-body-lg leading-[1.7] text-ink/60 md:grid-cols-2 md:gap-10">
        {story.paragraphs.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </Reveal>
      <Reveal delay={0.15}>
        <dl className="mt-16 flex max-w-[900px] flex-col divide-y divide-ink/12 border border-ink/12 sm:flex-row sm:divide-x sm:divide-y-0">
          {story.stats.map((s) => (
            <div key={s.label} className="flex flex-1 flex-col-reverse px-7 py-6">
              <dt className="mt-2 font-mono text-micro tracking-[0.22em] text-ink/40 uppercase">{s.label}</dt>
              <dd className={`font-syne text-3xl font-extrabold ${s.accent ? "text-accent" : "text-ink"}`}>
                {s.value}
                {s.unit && <span className="text-xl">{s.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
