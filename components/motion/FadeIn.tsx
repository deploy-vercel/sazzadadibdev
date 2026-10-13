"use client";

import { m, useReducedMotion } from "framer-motion";
import { duration, easeOut, viewportOnce } from "@/lib/motion";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view. */
  onMount?: boolean;
};

/** Opacity-only entrance, for elements that shouldn't move (labels, rules, meta). */
export function FadeIn({ children, className, delay = 0, onMount = false }: FadeInProps) {
  const reduce = useReducedMotion();
  const target = { opacity: 1 };

  return (
    <m.div
      data-reveal
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      {...(onMount ? { animate: target } : { whileInView: target, viewport: viewportOnce })}
      transition={{ duration: duration.slow, ease: easeOut, delay }}
    >
      {children}
    </m.div>
  );
}
