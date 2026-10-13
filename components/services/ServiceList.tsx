"use client";

import { m, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { services } from "@/data/services";
import { Accordion, AccordionPanel, useAccordionItem } from "@/components/ui/Accordion";
import { duration, easeOutExpo, viewportOnce } from "@/lib/motion";
import { cn, pad } from "@/lib/utils";
import { ServiceCard } from "./ServiceCard";

function ServiceRow({ index }: { index: number }) {
  const service = services[index];
  const { isOpen, buttonProps, panelProps } = useAccordionItem(index);
  const reduce = useReducedMotion();

  return (
    <m.div
      className={cn("border-b border-ink/12 transition-colors duration-300", isOpen ? "bg-surface-2" : "bg-transparent")}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: duration.base, ease: easeOutExpo, delay: index * 0.06 }}
    >
      <h2>
        <button
          {...buttonProps}
          className="group mx-auto flex w-full max-w-site items-center gap-4 px-6 py-7 text-left transition-colors hover:bg-ink/2 md:gap-9 md:px-12 md:py-10"
        >
          <span className={cn("shrink-0 font-mono text-xs transition-colors md:text-sm", isOpen ? "text-accent" : "text-ink/30")}>
            /{pad(index + 1)}
          </span>
          <span
            className={cn(
              "flex-1 font-syne text-[clamp(1.65rem,4.4vw,4.5rem)] leading-none font-extrabold uppercase transition-[color,-webkit-text-stroke-color] duration-300",
              isOpen ? "text-ink" : "text-stroke [--stroke-alpha:0.4] group-hover:text-ink/90",
            )}
          >
            {service.title}
          </span>
          <span className="hidden shrink-0 rounded-full border border-ink/16 px-4 py-2 font-mono text-mini tracking-[0.26em] text-ink/40 uppercase md:inline-block">
            {service.tag}
          </span>
          <span
            aria-hidden
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-colors md:h-11 md:w-11",
              isOpen ? "text-accent" : "text-ink/50 group-hover:border-ink/40 group-hover:text-ink",
            )}
          >
            {isOpen ? <Minus className="h-4 w-4 md:h-5 md:w-5" /> : <Plus className="h-4 w-4 md:h-5 md:w-5" />}
          </span>
        </button>
      </h2>
      <AccordionPanel isOpen={isOpen} {...panelProps}>
        <ServiceCard service={service} />
      </AccordionPanel>
    </m.div>
  );
}

export function ServiceList() {
  return (
    <section aria-label="Services" className="border-t border-ink/12">
      <Accordion defaultOpen={0}>
        {services.map((s, i) => (
          <ServiceRow key={s.title} index={i} />
        ))}
      </Accordion>
    </section>
  );
}
