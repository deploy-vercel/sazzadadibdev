"use client";

import { useEffect, useState } from "react";
import { aboutSections } from "@/data/about";
import { cn } from "@/lib/utils";

/** Sidebar table of contents that tracks which section is in view. */
export function SectionNav() {
  const [active, setActive] = useState<string>(aboutSections[0].id);

  useEffect(() => {
    const els = aboutSections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Page sections" className="mt-10 hidden flex-col gap-1 lg:flex">
      {aboutSections.map((s) => {
        const on = s.id === active;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={on ? "location" : undefined}
            className="group flex items-center gap-4 py-2.5 text-left"
          >
            <span
              aria-hidden
              className={cn("h-[2px] transition-all duration-300", on ? "w-9 bg-accent-fill" : "w-[18px] bg-ink/20 group-hover:bg-ink/40")}
            />
            <span
              className={cn(
                "font-mono text-mini tracking-[0.26em] uppercase transition-colors duration-300",
                on ? "text-ink" : "text-ink/40 group-hover:text-ink/70",
              )}
            >
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
