import type { CaseStudyCta as Cta } from "@/data/caseStudies";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/LinkButton";
import { SplitHeading } from "@/components/ui/SplitHeading";

export function CaseStudyCta({ cta }: { cta: Cta }) {
  return (
    <section className="border-t border-ink/10 px-6 py-24 text-center md:px-12 md:py-32" aria-labelledby="cs-cta">
      <Reveal>
        <SplitHeading id="cs-cta" thin={cta.thin} bold={cta.bold} stacked className="text-[clamp(2rem,4.5vw,4.5rem)] leading-none" />
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ink/60 md:text-lg">{cta.body}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <LinkButton href="/contact" variant="accent" size="lg">
            Let&apos;s talk
          </LinkButton>
          {cta.secondary && (
            <LinkButton
              href={cta.secondary.href}
              variant="outline"
              size="lg"
              icon={cta.secondary.href.startsWith("http") ? "up-right" : "none"}
            >
              {cta.secondary.label}
            </LinkButton>
          )}
        </div>
      </Reveal>
    </section>
  );
}
