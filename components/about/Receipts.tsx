import Link from "next/link";
import { toolbelt } from "@/data/about";
import { projects } from "@/data/projects";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { pad } from "@/lib/utils";
import { SectionNumber } from "./SectionNumber";

export function Receipts() {
  return (
    <section
      id="sec-receipts"
      className="scroll-mt-6 border-b border-ink/10 px-6 py-20 md:px-12 lg:px-16 lg:py-24"
      aria-labelledby="sec-receipts-title"
    >
      <Reveal className="flex flex-wrap items-baseline justify-between gap-4">
        <SectionNumber n={3} label="The receipts" />
        <span className="font-mono text-mini tracking-meta text-ink/30">[ EVERY PROJECT, CODE ON GITHUB ]</span>
      </Reveal>
      <Reveal delay={0.05}>
        <SplitHeading
          id="sec-receipts-title"
          thin="Don't take my word —"
          bold="read the work"
          className="mt-10 text-[clamp(2rem,3.4vw,3.5rem)] leading-[0.98]"
        />
      </Reveal>

      <ul className="mt-14 border-t border-ink/12">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={Math.min(i, 3) * 0.05}>
            <Link
              href={p.caseStudyHref ?? "/projects"}
              className="grid items-start gap-5 border-b border-ink/12 px-1 py-7 transition-colors hover:bg-ink/2.5 md:grid-cols-[minmax(200px,16rem)_1fr] md:gap-10"
            >
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-micro tracking-meta text-ink/40 uppercase">
                  /{pad(i + 1)} — {p.industry}
                </span>
                <span className="font-syne text-xl font-bold text-ink">{p.shortName}</span>
              </div>
              <dl>
                <div className="grid grid-cols-[5.75rem_1fr] items-baseline gap-3.5">
                  <dt className="font-mono text-micro tracking-[0.18em] text-ink/35">CHALLENGE</dt>
                  <dd className="text-body-sm leading-relaxed text-ink/50">{p.challenges[0]}</dd>
                </div>
                <div className="mt-3 grid grid-cols-[5.75rem_1fr] items-baseline gap-3.5">
                  <dt className="font-mono text-micro tracking-[0.18em] text-accent">SOLUTION</dt>
                  <dd className="text-body-sm leading-relaxed text-ink/85">{p.solutions[0]}</dd>
                </div>
              </dl>
            </Link>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-14">
        <Marquee duration={40} repeat={1} label="Toolbelt" className="border border-ink/10 bg-surface-2" trackClassName="py-4">
          {toolbelt.map((tool, i) => (
            <span
              key={tool}
              className={`inline-flex items-center gap-5 px-5 font-mono text-[13px] tracking-[0.14em] ${i % 2 === 0 ? "text-ink/85" : "text-ink/35"}`}
            >
              {tool}
              <span aria-hidden className="text-micro text-accent">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
