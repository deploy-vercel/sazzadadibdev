import Link from "next/link";
import { stackGroups } from "@/data/services";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";

export function TechStack() {
  return (
    <section className="border-t border-ink/8" aria-labelledby="stack-title">
      <div className="gutter mx-auto max-w-site py-20 md:py-28">
        <Reveal>
          <p className="mb-6 font-mono text-xs tracking-[0.32em] text-ink/40 uppercase">The stack</p>
          <SplitHeading id="stack-title" thin="Tools I bet" bold="projects on" className="text-[clamp(2.375rem,4.5vw,4.5rem)]" />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
            Chosen for shipping speed and long-term maintainability — the same stack behind every project in{" "}
            <Link
              href="/projects"
              className="text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
            >
              the archive
            </Link>
            .
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 grid grid-cols-1 border-t border-l border-ink/14 sm:grid-cols-2 lg:grid-cols-5">
          {stackGroups.map((group) => (
            <div key={group.label} className="border-r border-b border-ink/14">
              <h3 className="border-b border-ink/14 px-5 py-5 font-mono text-mini tracking-[0.28em] text-accent uppercase">
                {group.label}
              </h3>
              <ul className="flex flex-col gap-3.5 px-5 py-5">
                {group.items.map((item) => (
                  <li key={item} className="text-body-sm text-ink/75 transition-colors hover:text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
