"use client";

import { useSound } from "./SoundProvider";
import { cn } from "@/lib/utils";

const controlClass =
  "group flex items-center gap-2 font-mono text-xs tracking-eyebrow text-ink/50 uppercase transition-colors hover:text-ink";

export function SoundToggle() {
  const { enabled, toggle } = useSound();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Turn sound off" : "Turn sound on"}
      className={controlClass}
    >
      <span
        aria-hidden
        className={cn("inline-block h-1.5 w-1.5 rounded-full transition-colors", enabled ? "bg-accent-fill" : "bg-ink/20")}
      />
      Sound
    </button>
  );
}

export function BackToTop() {
  function onClick() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }
  return (
    <button type="button" onClick={onClick} className={controlClass}>
      Top
      <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-1">
        ↑
      </span>
    </button>
  );
}
