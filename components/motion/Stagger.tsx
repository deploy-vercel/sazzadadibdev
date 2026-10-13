"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";
import { duration, easeOutExpo, revealOffset, stagger as staggerScale, viewportOnce } from "@/lib/motion";

type StaggerTag = "div" | "ul" | "ol" | "dl" | "section";

const item: Variants = {
  hidden: { opacity: 0, y: revealOffset },
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easeOutExpo } },
};

/** Parent that reveals its <StaggerItem> children one after another. */
export function Stagger({
  children,
  as = "div",
  className,
  delay = 0,
  stagger = staggerScale.base,
}: {
  children: React.ReactNode;
  as?: StaggerTag;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = m[as];

  return (
    <Tag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={viewportOnce}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Tag>
  );
}

type ItemTag = "div" | "li" | "article";

export function StaggerItem({ children, as = "div", className }: { children: React.ReactNode; as?: ItemTag; className?: string }) {
  const Tag = m[as];
  return (
    <Tag data-reveal className={className} variants={item}>
      {children}
    </Tag>
  );
}
