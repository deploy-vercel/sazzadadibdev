"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";
import { duration as durations, easeOutExpo, stagger as staggerScale, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Split = "lines" | "words" | "chars";
type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

type TextRevealProps = {
  /** A string, or an array of lines when split="lines". */
  text: string | string[];
  split?: Split;
  as?: Tag;
  className?: string;
  /** Classes applied to every masked unit (e.g. per-line typography). */
  unitClassName?: string | ((index: number) => string);
  delay?: number;
  stagger?: number;
  duration?: number;
  /** "inView" (default) reveals on scroll, "mount" on first render, "manual" waits for `play`. */
  trigger?: "inView" | "mount" | "manual";
  play?: boolean;
};

const unitVariants: Variants = {
  hidden: { y: "110%" },
  show: (d: number) => ({ y: "0%", transition: { duration: d, ease: easeOutExpo } }),
};

function splitText(text: string | string[], split: Split): string[] {
  if (Array.isArray(text)) return text;
  if (split === "chars") return Array.from(text);
  if (split === "words") return text.split(/(\s+)/).filter((w) => w.length > 0);
  return [text];
}

/**
 * Masked text reveal: each unit slides up from behind its own clipping box.
 * Screen readers get the full string once via aria-label.
 */
export function TextReveal({
  text,
  split = "words",
  as = "span",
  className,
  unitClassName,
  delay = 0,
  stagger = split === "chars" ? staggerScale.tight : staggerScale.base,
  duration = durations.hero,
  trigger = "inView",
  play = true,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const units = splitText(text, split);
  const label = Array.isArray(text) ? text.join(" ") : text;
  const Comp = m[as];

  const triggerProps =
    trigger === "inView" ? { whileInView: "show", viewport: viewportOnce } : { animate: trigger === "manual" && !play ? "hidden" : "show" };

  return (
    <Comp
      aria-label={label}
      className={className}
      initial={reduce ? false : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...triggerProps}
    >
      {units.map((unit, i) => {
        const isSpace = /^\s+$/.test(unit);
        if (isSpace) return <span key={i}> </span>;
        const extra = typeof unitClassName === "function" ? unitClassName(i) : unitClassName;
        return (
          <span
            key={i}
            aria-hidden
            className={cn(
              "overflow-hidden align-bottom",
              split === "lines" ? "block pb-[0.08em] -mb-[0.08em]" : "inline-block pb-[0.12em] -mb-[0.12em]",
              extra,
            )}
          >
            <m.span
              data-reveal
              className={cn(split === "lines" ? "block" : "inline-block", "will-change-transform")}
              variants={unitVariants}
              custom={duration}
            >
              {unit}
            </m.span>
          </span>
        );
      })}
    </Comp>
  );
}
