"use client";

import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { faqs } from "@/data/services";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion, AccordionPanel, useAccordionItem } from "@/components/ui/Accordion";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { cn, pad } from "@/lib/utils";

function FaqItem({ index }: { index: number }) {
  const faq = faqs[index];
  const { isOpen, buttonProps, panelProps } = useAccordionItem(index);
  return (
    <div className="border-b border-ink/10">
      <h3>
        <button
          {...buttonProps}
          className="group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors hover:bg-ink/2"
        >
          <span className="flex items-baseline gap-5">
            <span className="font-mono text-mini text-ink/30">{pad(index + 1)}</span>
            <span
              className={cn("text-lg font-semibold transition-colors md:text-xl", isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink")}
            >
              {faq.question}
            </span>
          </span>
          <span
            aria-hidden
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-colors",
              isOpen ? "text-accent" : "text-ink/60 group-hover:border-ink/40 group-hover:text-ink",
            )}
          >
            {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </span>
        </button>
      </h3>
      <AccordionPanel isOpen={isOpen} {...panelProps}>
        <p className="max-w-2xl pb-8 leading-relaxed text-ink/60 md:pl-11">{faq.answer}</p>
      </AccordionPanel>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="border-t border-ink/8 bg-surface-2" aria-labelledby="faq-title">
      <div className="gutter mx-auto grid max-w-site items-start gap-10 py-20 md:py-28 lg:grid-cols-[minmax(300px,460px)_1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28">
          <p className="mb-6 font-mono text-xs tracking-[0.32em] text-ink/40 uppercase">FAQs</p>
          <SplitHeading id="faq-title" thin="Asked" bold="Often" stacked className="text-[clamp(2.375rem,4vw,4rem)]" />
          <p className="mt-6 leading-relaxed text-ink/60">
            The questions people ask most. If yours isn&apos;t here,{" "}
            <Link
              href="/contact"
              className="text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
            >
              ask it directly
            </Link>
            .
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion defaultOpen={0}>
            {faqs.map((f, i) => (
              <FaqItem key={f.question} index={i} />
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
