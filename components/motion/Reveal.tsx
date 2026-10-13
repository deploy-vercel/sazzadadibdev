"use client";

import { m, useReducedMotion } from "framer-motion";
import { duration, easeOutExpo, revealOffset, viewportOnce } from "@/lib/motion";

type RevealTag = "div" | "section" | "li" | "article" | "p" | "span" | "header" | "aside";

type RevealProps = {
  children: React.ReactNode;
  as?: RevealTag;
  className?: string;
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  id?: string;
};

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, as = "div", className, delay = 0, y = revealOffset, id }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = m[as];

  return (
    <Tag
      data-reveal
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: duration.base, ease: easeOutExpo, delay }}
    >
      {children}
    </Tag>
  );
}
