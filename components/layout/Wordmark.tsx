"use client";

import { m, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { easeOutExpo } from "@/lib/motion";

/** "." is the accent ball rather than a glyph. */
const letters = ["s", "a", "z", "z", "a", "d", "."];

/**
 * Oversized footer wordmark. The full stop is a separate accent ball
 * that can be grabbed and flung — it springs home and pulls a face while held.
 */
export function Wordmark() {
  const reduce = useReducedMotion();
  const [awake, setAwake] = useState(false);

  return (
    <div role="img" aria-label="sazzad" className="w-full select-none">
      <div
        aria-hidden
        className="flex justify-center font-syne font-extrabold whitespace-nowrap text-ink"
        style={{ fontSize: "16.3vw", letterSpacing: "-0.03em", lineHeight: 0.85, paddingTop: "0.1em", fontKerning: "none" }}
      >
        {letters.map((letter, i) => (
          <m.span
            key={i}
            className="relative inline-block"
            initial={reduce ? false : { y: "35%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, ease: easeOutExpo, delay: i * 0.06 }}
          >
            {letter !== "." && letter}
            {letter === "." && (
              <m.span
                drag={!reduce}
                dragSnapToOrigin
                dragElastic={0.6}
                dragTransition={{ bounceStiffness: 260, bounceDamping: 14 }}
                whileHover={{ scale: 1.08 }}
                whileDrag={{ scale: 1.15 }}
                onHoverStart={() => setAwake(true)}
                onHoverEnd={() => setAwake(false)}
                onDragStart={() => setAwake(true)}
                onDragEnd={() => setAwake(false)}
                // An empty inline-block sits on the baseline, exactly where a full stop would.
                className="cursor-grab relative z-10 ml-[0.05em] inline-block h-[0.15em] w-[0.15em] touch-none rounded-full bg-accent-fill active:cursor-grabbing"
              >
                <m.span
                  className="absolute inset-0 flex items-start justify-center gap-[12%] pt-[22%]"
                  animate={{ opacity: awake ? 1 : 0, scale: awake ? 1 : 0.6 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="relative h-[34%] w-[22%] overflow-hidden rounded-full bg-ink">
                    <span className="absolute top-[22%] left-[25%] h-[45%] w-[50%] rounded-full bg-surface-2" />
                  </span>
                  <span className="relative h-[34%] w-[22%] overflow-hidden rounded-full bg-ink">
                    <span className="absolute top-[22%] left-[25%] h-[45%] w-[50%] rounded-full bg-surface-2" />
                  </span>
                </m.span>
                <m.span
                  className="absolute inset-x-0 top-[58%] flex justify-center"
                  animate={{ opacity: awake ? 1 : 0, scale: awake ? 1 : 0.6 }}
                  transition={{ duration: 0.25 }}
                >
                  <svg viewBox="0 0 100 44" className="w-[56%]" aria-hidden>
                    <path d="M8 6 Q50 52 92 6 Q50 30 8 6 Z" className="fill-ink" />
                  </svg>
                </m.span>
              </m.span>
            )}
          </m.span>
        ))}
      </div>
    </div>
  );
}
