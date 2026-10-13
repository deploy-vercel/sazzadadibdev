"use client";

import { m, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { createContext, useContext, useRef } from "react";

const ProgressCtx = createContext<{ progress: MotionValue<number>; count: number } | null>(null);

/**
 * Desktop project rail: vertical scroll drives a horizontal track of full-width
 * panels (one viewport of scroll per panel). Hidden below lg.
 */
export function ProjectsRail({ count, children }: { count: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const x = useTransform(progress, [0, 1], ["0vw", `-${(count - 1) * 100}vw`]);

  return (
    <ProgressCtx.Provider value={{ progress, count }}>
      <div ref={ref} className="relative hidden lg:block" style={{ height: `${count * 100}vh` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div aria-hidden className="absolute inset-x-0 top-0 z-10 h-px bg-ink/10">
            <m.div className="h-full origin-left bg-accent-fill/80" style={{ scaleX: scrollYProgress }} />
          </div>
          <m.div className="flex h-full w-max" style={{ x }}>
            {children}
          </m.div>
        </div>
      </div>
    </ProgressCtx.Provider>
  );
}

/** Gives a panel's media a gentle counter-drift as its panel passes through. */
export function RailParallax({ index, children, className }: { index: number; children: React.ReactNode; className?: string }) {
  const ctx = useContext(ProgressCtx);
  if (!ctx) throw new Error("RailParallax must be inside ProjectsRail");
  const step = 1 / (ctx.count - 1);
  const center = index * step;
  const x = useTransform(ctx.progress, [center - step, center, center + step], [90, 0, -90]);
  return (
    <m.div className={className} style={{ x }}>
      {children}
    </m.div>
  );
}
