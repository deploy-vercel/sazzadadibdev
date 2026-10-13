"use client";

import { m, useReducedMotion } from "framer-motion";
import { duration, easeOutExpo, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Image container that settles from a slight zoom while fading in. */
export function ImageReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("overflow-hidden", className)}>
      <m.div
        data-reveal
        className="relative h-full w-full"
        initial={reduce ? false : { opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: duration.slow * 1.4, ease: easeOutExpo, delay }}
      >
        {children}
      </m.div>
    </div>
  );
}
