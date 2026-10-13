"use client";

import { m, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Glossy four-point star, drawn in SVG (no raster asset). */
function Star({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-body`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#3a3a3f" />
          <stop offset="0.55" stopColor="#151517" />
          <stop offset="1" stopColor="#050506" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b9a6ff" />
          <stop offset="1" stopColor="#6b4dff" />
        </linearGradient>
      </defs>
      <path
        d="M52 4C55 34 64 44 96 50C64 56 55 66 52 96C49 66 40 56 6 50C40 44 49 34 52 4Z"
        fill={`url(#${id}-rim)`}
        transform="translate(2 1)"
      />
      <path d="M50 4C53 34 62 44 94 50C62 56 53 66 50 96C47 66 38 56 4 50C38 44 47 34 50 4Z" fill={`url(#${id}-body)`} />
      <path d="M50 12C52 34 58 42 78 47C60 46 53 40 50 12Z" fill="#fff" opacity="0.14" />
    </svg>
  );
}

/** Glossy lightning bolt, drawn in SVG. */
function Bolt({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 80 110" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-body`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#3b3b40" />
          <stop offset="0.6" stopColor="#141416" />
          <stop offset="1" stopColor="#040405" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c3b3ff" />
          <stop offset="1" stopColor="#5f3df0" />
        </linearGradient>
      </defs>
      <path d="M50 4L12 62H38L28 106L70 42H44L56 4Z" fill={`url(#${id}-rim)`} transform="translate(-3 1)" />
      <path d="M52 4L14 62H40L30 106L72 42H46L58 4Z" fill={`url(#${id}-body)`} />
      <path d="M52 8L22 56H34L48 18Z" fill="#fff" opacity="0.12" />
    </svg>
  );
}

function Draggable({
  children,
  className,
  rotate,
  delay,
  play,
  label,
}: {
  children: React.ReactNode;
  className: string;
  rotate: number;
  delay: number;
  play: boolean;
  label: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      role="img"
      aria-label={label}
      className={cn("cursor-grab pointer-events-auto absolute z-20 touch-none select-none active:cursor-grabbing", className)}
      drag={!reduce}
      dragMomentum
      dragElastic={0.2}
      whileDrag={{ scale: 1.08 }}
      initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: rotate - 20 }}
      animate={play ? { opacity: 1, scale: 1, rotate } : undefined}
      transition={{ duration: 1, ease: easeOutExpo, delay }}
      style={{ rotate }}
    >
      <div className="drop-shadow-[0_14px_28px_rgb(0_0_0/0.35)]">{children}</div>
    </m.div>
  );
}

/** The two collectible objects floating over the desktop hero. Drag them around. */
export function HeroDecor({ play }: { play: boolean }) {
  return (
    <>
      <Draggable className="top-[15%] left-[63%]" rotate={-8} delay={1.15} play={play} label="Decorative star">
        <Star className="h-[clamp(56px,5vw,84px)] w-[clamp(56px,5vw,84px)]" />
      </Draggable>
      <Draggable className="right-[6%] bottom-[38%]" rotate={10} delay={1.3} play={play} label="Decorative lightning bolt">
        <Bolt className="h-[clamp(62px,5.6vw,92px)] w-auto" />
      </Draggable>
    </>
  );
}
