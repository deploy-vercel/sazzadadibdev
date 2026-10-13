"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

// domMax (drag + layout) is loaded after hydration so it stays out of the critical bundle.
const loadFeatures = () => import("./features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
