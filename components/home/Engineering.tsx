import { ArrowUpRight } from "lucide-react";
import { engineering } from "@/data/home";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { Tag } from "@/components/ui/Badge";
import { MonoLink } from "@/components/ui/LinkButton";
import { SectionIntro, SectionLabel } from "@/components/ui/SectionLabel";
import { pad } from "@/lib/utils";

export function Engineering() {
  return (
    <section className="border-t border-ink/10 px-6 pb-24" aria-labelledby="engineering-title">
      <Reveal>
        <SectionIntro
          eyebrow={engineering.eyebrow}
          title={<span id="engineering-title">{engineering.title}</span>}
          lead={engineering.lead}
          className="my-16"
        />
      </Reveal>

      <div className="mx-auto max-w-5xl">
        {engineering.principles.map((p, i) => (
          <Reveal key={p.area} delay={Math.min(i, 2) * 0.08}>
            <article className="grid gap-5 border-t border-ink/10 py-10 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-10">
              <p className="font-mono text-xs tracking-eyebrow text-ink/35 uppercase">
                <span className="text-accent/80">{pad(i + 1)}</span> {p.area}
              </p>
              <div className="min-w-0">
                <h3 className="font-syne text-2xl leading-[1.15] font-extrabold text-ink sm:text-3xl">{p.title}</h3>
                <p className="mt-4 max-w-2xl text-body leading-relaxed text-ink/60">{p.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </ul>
                {p.link && (
                  <MonoLink href={p.link.href} className="mt-6">
                    {p.link.label}
                  </MonoLink>
                )}
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal>
          <div className="border-t border-ink/10 pt-10">
            <SectionLabel className="text-ink/35">{engineering.receiptLabel}</SectionLabel>
            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
              {engineering.scores.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-2.5 font-mono text-mini tracking-[0.18em] text-ink/40 uppercase">{s.label}</dt>
                  <dd className="font-syne text-2xl leading-none font-extrabold text-accent sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-mini tracking-[0.18em] text-ink/30 uppercase">
              <span>{engineering.receiptNote}</span>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink/60 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink hover:decoration-accent/60"
              >
                See the code
                <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
