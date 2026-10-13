"use client";

import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { createContext, useContext, useRef } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

const Ctx = createContext<{ progress: MotionValue<number>; count: number; desktop: boolean } | null>(null);

/**
 * Stacked archive: on desktop every entry pins to the viewport and, as the
 * next one slides over it, shrinks back and dims — a deck of cards.
 * Below lg the entries simply flow.
 */
export function ProjectStack({ count, children }: { count: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <Ctx.Provider value={{ progress: scrollYProgress, count, desktop }}>
      <div ref={ref} className="relative">
        {children}
      </div>
    </Ctx.Provider>
  );
}

export function StackCard({ index, id, children }: { index: number; id: string; children: React.ReactNode }) {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("StackCard must be inside ProjectStack");
  const { progress, count, desktop } = ctx;
  const target = 1 - (count - 1 - index) * 0.04;
  const start = index / count;
  const scale = useTransform(progress, [start, 1], [1, target]);
  const dim = useTransform(progress, [start, Math.min(start + 1 / count, 1)], [0, index === count - 1 ? 0 : 0.5]);

  return (
    <div id={id} className="scroll-mt-0 lg:sticky lg:top-0 lg:h-[100svh]">
      <m.div
        className="relative h-full w-full origin-top overflow-hidden border-t border-ink/10 bg-surface-2"
        style={desktop ? { scale } : undefined}
      >
        {children}
        {desktop && <m.div aria-hidden className="pointer-events-none absolute inset-0 bg-surface" style={{ opacity: dim }} />}
      </m.div>
    </div>
  );
}
