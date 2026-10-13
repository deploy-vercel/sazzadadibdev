"use client";

import { m, useReducedMotion } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

/** Thin progress track whose accent fill sweeps in when scrolled into view. */
export function ProgressTick({ value, delay = 0.2 }: { value: number; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <div
      className="relative mt-4 h-[3px] w-[120px] bg-ink/10"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
    >
      <m.div
        className="absolute inset-y-0 left-0 w-full origin-left bg-accent-fill"
        initial={reduce ? { scaleX: value } : { scaleX: 0 }}
        whileInView={{ scaleX: value }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: easeOutExpo, delay }}
      />
    </div>
  );
}
