import Image from "next/image";
import { introCopy } from "@/data/home";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";

/** Below lg the hero becomes a simple, stacked introduction. */
export function HeroMobile() {
  return (
    <section className="bg-surface-2 px-5 pt-14 pb-16 sm:px-8 lg:hidden" aria-labelledby="hero-title-mobile">
      <h1 id="hero-title-mobile" className="sr-only">
        {site.title}
      </h1>
      <Reveal>
        <h2 className="font-syne text-6xl leading-none font-extrabold text-ink">{introCopy.hello}</h2>
      </Reveal>
      <Reveal delay={0.08} className="mt-6 overflow-hidden rounded-2xl border border-ink/12">
        <div className="relative aspect-square w-full">
          <Image
            src="/images/portrait.webp"
            alt={`Portrait of ${site.name}`}
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 1px"
            className="object-cover grayscale"
          />
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-6 text-lg leading-snug font-semibold text-ink">{introCopy.lead}</p>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-4 text-base leading-relaxed text-ink/70">{introCopy.bodyShort}</p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-4 text-sm font-medium tracking-wide text-ink/50">{introCopy.stack}</p>
      </Reveal>
      <Reveal delay={0.24}>
        <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-ink">
          {introCopy.cta}
          <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full border border-ink/20">
            ↗
          </span>
        </a>
      </Reveal>
    </section>
  );
}
