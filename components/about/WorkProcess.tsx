"use client";

import { principles } from "@/data/about";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion, AccordionPanel, useAccordionItem } from "@/components/ui/Accordion";
import { cn, pad } from "@/lib/utils";
import { SectionNumber } from "./SectionNumber";

function Principle({ index }: { index: number }) {
  const p = principles[index];
  const { isOpen, buttonProps, panelProps } = useAccordionItem(index);
  return (
    <div className="border-b border-ink/10">
      <h3>
        <button
          {...buttonProps}
          className="group flex w-full items-baseline gap-5 px-1 py-7 text-left transition-colors hover:bg-ink/2 md:gap-7"
        >
          <span className={cn("w-9 shrink-0 font-mono text-mini transition-colors", isOpen ? "text-accent" : "text-ink/30")}>
            /{pad(index + 1)}
          </span>
          <span
            className={cn(
              "flex-1 font-syne text-[clamp(1.375rem,2.2vw,2.125rem)] leading-[1.1] italic transition-colors",
              isOpen ? "text-ink" : "text-ink/50 group-hover:text-ink/80",
            )}
          >
            {p.title}
          </span>
          <span aria-hidden className={cn("shrink-0 font-mono text-base transition-colors", isOpen ? "text-accent" : "text-ink/30")}>
            {isOpen ? "−" : "+"}
          </span>
        </button>
      </h3>
      <AccordionPanel isOpen={isOpen} {...panelProps}>
        <div className="px-1 pb-8 md:grid md:grid-cols-[3.5rem_1fr_auto] md:gap-7">
          <span className="hidden md:block" />
          <p className="max-w-[60ch] text-body-lg leading-[1.7] text-ink/60">{p.body}</p>
          <span className="mt-4 block font-mono text-mini tracking-tag text-accent uppercase md:mt-0 md:self-end">{p.tag}</span>
        </div>
      </AccordionPanel>
    </div>
  );
}

export function WorkProcess() {
  return (
    <section
      id="sec-principles"
      className="scroll-mt-6 border-b border-ink/10 bg-surface-2 px-6 py-20 md:px-12 lg:px-16 lg:py-24"
      aria-labelledby="sec-principles-label"
    >
      <Reveal>
        <SectionNumber id="sec-principles-label" n={2} label="How I work" />
      </Reveal>
      <Reveal delay={0.08} className="mt-10 border-t border-ink/10">
        <Accordion defaultOpen={0}>
          {principles.map((p, i) => (
            <Principle key={p.title} index={i} />
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
