import { scoperTeaser } from "@/data/home";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { LinkButton } from "@/components/ui/LinkButton";

const outline: { label: string; bars: string[] }[] = [
  { label: "Goals", bars: ["w-4/5", "w-3/5"] },
  { label: "Features", bars: ["w-full", "w-2/3", "w-3/4"] },
  { label: "Tech stack", bars: ["w-1/2"] },
  { label: "User flows", bars: ["w-5/6", "w-2/3"] },
];

export function ScoperTeaser() {
  return (
    <section className="overflow-x-clip border-t border-ink/10 px-5 py-28 sm:py-36" aria-labelledby="scoper-teaser-title">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
        <Reveal className="min-w-0">
          <p className="eyebrow">{scoperTeaser.eyebrow}</p>
          <h2 id="scoper-teaser-title" className="mt-4 font-syne text-4xl leading-tight font-extrabold text-ink sm:text-5xl">
            {scoperTeaser.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">{scoperTeaser.body}</p>
          <LinkButton href="/services#scoper" className="mt-8">
            {scoperTeaser.cta}
          </LinkButton>
        </Reveal>

        <Reveal delay={0.15} className="min-w-0 max-w-full select-none">
          <div aria-hidden>
            <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-ink/15 bg-ink/4 px-4 py-3 font-mono text-[13px] text-ink/80">
              <span className="shrink-0 text-accent/80">›</span>
              <span className="min-w-0 truncate">{scoperTeaser.prompt}</span>
              <span className="inline-block h-4 w-[2px] shrink-0 animate-pulse bg-accent-fill motion-reduce:animate-none" />
            </div>
            <div className="ml-8 h-7 w-px bg-ink/15" />
            <div className="rotate-1 rounded-xl border border-ink/12 bg-surface-2 p-5">
              <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                <span className="font-mono text-xs text-ink/50">{scoperTeaser.file}</span>
                <span className="rounded border border-ink/15 px-1.5 py-0.5 font-mono text-micro tracking-wider text-ink/40 uppercase">
                  md
                </span>
              </div>
              <Stagger className="space-y-4 pt-4" stagger={0.12} delay={0.3}>
                {outline.map((row) => (
                  <StaggerItem key={row.label} className="grid grid-cols-[6.5rem_1fr] items-start gap-3">
                    <span className="pt-0.5 font-mono text-micro tracking-wider text-ink/35 uppercase">{row.label}</span>
                    <div className="space-y-1.5">
                      {row.bars.map((w, i) => (
                        <div key={i} className={`h-2 rounded-full bg-ink/10 ${w}`} />
                      ))}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
