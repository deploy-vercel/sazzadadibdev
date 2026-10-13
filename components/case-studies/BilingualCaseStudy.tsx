import Image from "next/image";
import type { CaseStudy } from "@/data/caseStudies";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TextReveal } from "@/components/motion/TextReveal";
import { pad } from "@/lib/utils";
import { CaseStudyCta } from "./CaseStudyCta";
import { CaseStudyStats } from "./CaseStudyStats";

/** Crimson-disc eyebrow, the signature mark of this case study. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-xs font-semibold tracking-meta text-accent uppercase">
      <span aria-hidden className="h-2 w-2 rounded-full bg-[#f42a41]" />
      {children}
    </p>
  );
}

const wrap = "mx-auto max-w-page px-4 sm:px-8";
const h2 = "mt-4 mb-6 font-syne text-3xl leading-tight font-bold md:text-5xl";

export function BilingualCaseStudy({ study }: { study: CaseStudy }) {
  const b = study.bilingual!;
  return (
    <>
      <section className={`${wrap} pt-16 pb-10 md:pt-24`}>
        <FadeIn onMount>
          <Eyebrow>Case study · {study.category}</Eyebrow>
        </FadeIn>
        <h1 className="mt-6 mb-2 leading-tight">
          <TextReveal
            as="span"
            text={[b.titleBn]}
            split="lines"
            trigger="mount"
            delay={0.1}
            className="block"
            unitClassName="font-bengali text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.15] font-bold text-ink"
          />
          <span lang="en" className="mt-2 block font-mono text-sm tracking-[0.4em] text-accent uppercase md:text-lg">
            {b.subtitle}
          </span>
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-6 max-w-3xl text-lg leading-snug text-ink/75 md:text-2xl">{study.description}</p>
        </Reveal>
        <Reveal delay={0.35}>
          <dl className="mt-10 grid border-t border-l border-ink/14 sm:grid-cols-2 lg:grid-cols-4">
            {b.facts.map((f) => (
              <div key={f.label} className="border-r border-b border-ink/14 bg-surface-2 px-5 py-6">
                <dt className="font-mono text-micro tracking-[0.24em] text-[#a8842f] uppercase dark:text-[#c29a3b]">{f.label}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink/75">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <figure className="mt-12">
          <ImageReveal className="rounded-2xl border border-ink/10 shadow-2xl shadow-black/10">
            <div className="relative aspect-[16/10]">
              <Image
                src={study.heroImage}
                alt={study.heroAlt}
                fill
                preload
                sizes="(min-width: 1400px) 1340px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </ImageReveal>
          <figcaption className="mt-4 text-sm text-ink/50">{b.heroCaption}</figcaption>
        </figure>
      </section>

      <section className={`${wrap} py-10`} aria-label="By the numbers">
        <CaseStudyStats stats={study.stats} className="mt-0" />
      </section>

      <section className={`${wrap} py-16`} aria-labelledby="brief-title">
        <Reveal>
          <Eyebrow>{b.brief.eyebrow}</Eyebrow>
          <h2 id="brief-title" className={h2}>
            {b.brief.title}
          </h2>
          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-ink/65 md:text-lg">
            {b.brief.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
          {b.brief.cards.map((c) => (
            <StaggerItem key={c.title} className="rounded-xl border border-ink/10 bg-surface-2 p-6">
              <h3 className="mb-2 font-bold text-ink">{c.title}</h3>
              <p className="text-sm leading-relaxed text-ink/60">{c.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className={`${wrap} py-16`} aria-labelledby="identity-title">
        <Reveal>
          <Eyebrow>{b.identity.eyebrow}</Eyebrow>
          <h2 id="identity-title" className={h2}>
            {b.identity.title}
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-ink/65 md:text-lg">{b.identity.body}</p>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5" stagger={0.06}>
          {b.identity.swatches.map((s) => (
            <StaggerItem key={s.hex} className="overflow-hidden rounded-xl border border-ink/10">
              <div className="h-24" style={{ backgroundColor: s.hex }} />
              <div className="p-4">
                <p className="font-bold text-ink">{s.name}</p>
                <p className="font-mono text-xs text-ink/50">{s.hex}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink/55">{s.role}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
            {b.identity.marks.map((mark) => (
              <StaggerItem key={mark.title} className="rounded-xl border border-ink/10 p-5">
                <span aria-hidden className="block h-1 w-10 rounded-full bg-linear-to-r from-[#f42a41] to-transparent" />
                <h3 className="mt-2 mb-2 font-bold text-ink">{mark.title}</h3>
                <p className="text-sm leading-relaxed text-ink/60">{mark.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="relative flex flex-col justify-center overflow-hidden rounded-xl bg-[#0b2e24] p-8 text-white md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_31px,rgb(255_255_255/0.05)_31px,rgb(255_255_255/0.05)_32px)]"
            />
            <p className="relative font-mono text-mini tracking-[0.3em] text-[#c29a3b] uppercase">{b.identity.motto.label}</p>
            <blockquote className="relative mt-6 border-l-2 border-[#f42a41] pl-5">
              {b.identity.motto.lines.map((line) => (
                <p key={line} lang="bn" className="font-bengali text-2xl leading-snug font-semibold md:text-3xl">
                  {line}
                </p>
              ))}
              <p className="mt-4 text-sm text-white/70">{b.identity.motto.translation}</p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className={`${wrap} py-16`} aria-labelledby="problem-title">
        <Reveal>
          <Eyebrow>{b.problem.eyebrow}</Eyebrow>
          <h2 id="problem-title" className={`${h2} max-w-3xl`}>
            {b.problem.title}
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-ink/65 md:text-lg">{b.problem.body}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {b.problem.code.map((block, i) => (
            <Reveal key={block.label} delay={i * 0.08} className="overflow-hidden rounded-xl bg-[#0b2e24]">
              <p className="px-5 pt-5 font-mono text-micro tracking-[0.24em] text-[#e0b04f] uppercase">{block.label}</p>
              <pre className="thin-scrollbar overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-[#cfe9df]">
                <code>{block.code}</code>
              </pre>
            </Reveal>
          ))}
        </div>
        <Stagger as="ol" className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {b.problem.notes.map((n, i) => (
            <StaggerItem as="li" key={n.title} className="flex gap-5">
              <span className="font-mono text-sm text-accent">{pad(i + 1)}</span>
              <div>
                <h3 className="mb-1.5 font-bold text-ink">{n.title}</h3>
                <p className="text-sm leading-relaxed text-ink/60">{n.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className={`${wrap} py-16`} aria-labelledby="memorial-title">
        <Reveal>
          <Eyebrow>{b.memorial.eyebrow}</Eyebrow>
          <h2 id="memorial-title" className={`${h2} mb-8 max-w-3xl`}>
            {b.memorial.title}
          </h2>
        </Reveal>
        <figure>
          <ImageReveal className="rounded-2xl border-b-4 border-[#f42a41]">
            <div className="relative aspect-[16/10]">
              <Image src={b.memorial.image} alt={b.memorial.alt} fill sizes="(min-width: 1400px) 1340px, 100vw" className="object-cover" />
            </div>
          </ImageReveal>
          <figcaption className="mt-4 text-sm text-ink/50">{b.memorial.caption}</figcaption>
        </figure>
      </section>

      <section className={`${wrap} py-16`} aria-labelledby="engineering-title">
        <Reveal>
          <Eyebrow>{b.engineering.eyebrow}</Eyebrow>
          <h2 id="engineering-title" className="mt-4 font-syne text-3xl leading-tight font-bold md:text-5xl">
            {b.engineering.title}
          </h2>
        </Reveal>
        <Stagger className="mt-6 grid gap-x-10 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
          {b.engineering.items.map((item) => (
            <StaggerItem key={item.title} className="border-t border-ink/10 pt-4 pb-6">
              <h3 className="mt-4 mb-2 font-bold text-ink">{item.title}</h3>
              <p className="text-sm leading-relaxed text-ink/60">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className={`${wrap} grid gap-12 py-16 md:grid-cols-2`} aria-label="Trade-offs and next steps">
        <Reveal>
          <Eyebrow>{b.edges.eyebrow}</Eyebrow>
          <h2 className="mt-4 mb-5 font-syne text-2xl leading-tight font-bold md:text-4xl">{b.edges.title}</h2>
          <div className="space-y-4 text-body leading-relaxed text-ink/60">
            {b.edges.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <Eyebrow>{b.next.eyebrow}</Eyebrow>
          <h2 className="mt-4 mb-5 font-syne text-2xl leading-tight font-bold md:text-4xl">{b.next.title}</h2>
          <p className="text-body leading-relaxed text-ink/60">{b.next.body}</p>
        </Reveal>
      </section>

      <CaseStudyCta cta={study.cta} />
    </>
  );
}
