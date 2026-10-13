"use client";

import { m, useReducedMotion } from "framer-motion";
import { duration, easeOutExpo, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Slides arbitrary content up from behind a clipping mask when it scrolls into view. */
export function MaskReveal({
  children,
  className,
  innerClassName,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("overflow-hidden", className)}>
      <m.div
        data-reveal
        className={innerClassName}
        initial={reduce ? false : { y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={viewportOnce}
        transition={{ duration: duration.slow, ease: easeOutExpo, delay }}
      >
        {children}
      </m.div>
    </div>
  );
}
