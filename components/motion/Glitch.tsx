"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const GLITCH_MS = 450;

/** A heading that flashes a short RGB-slice glitch when it first scrolls in, and on hover. */
export function Glitch({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function fire() {
    setActive(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(false), GLITCH_MS);
  }

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(fire, 120);
    return () => clearTimeout(t);
  }, [inView]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <span ref={ref} className={`glitch ${className ?? ""}`} data-text={text} data-glitching={active ? "" : undefined} onPointerEnter={fire}>
      {text}
    </span>
  );
}
