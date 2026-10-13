"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";

const corners = [
  "top-0 left-0 border-t-2 border-l-2",
  "top-0 right-0 border-t-2 border-r-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "bottom-0 right-0 border-b-2 border-r-2",
];

/**
 * Camera-viewfinder frame around a QR code. Tilts toward the pointer and
 * paints a soft brand-coloured glow under it; a scan line sweeps continuously.
 */
export function QrPlate({
  href,
  label,
  accent,
  badge,
  caption,
  children,
}: {
  href: string;
  label: string;
  accent: string;
  badge: React.ReactNode;
  caption: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (!reduce) {
      ry.set((px - 0.5) * 12);
      rx.set(-(py - 0.5) * 12);
    }
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div className="shrink-0" style={{ "--qr-accent": accent } as React.CSSProperties}>
      <m.div
        ref={ref}
        className="group relative"
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 700 }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {corners.map((c) => (
          <span
            key={c}
            aria-hidden
            className={`absolute z-10 h-5 w-5 border-ink/30 transition-colors duration-300 group-hover:border-[color:var(--qr-accent)] ${c}`}
          />
        ))}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="relative m-3 block overflow-hidden bg-white p-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--qr-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-surface-3"
        >
          {children}
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-white text-white"
            style={{ backgroundColor: accent }}
          >
            {badge}
          </span>
          <span aria-hidden className="qr-scan" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--qr-accent) 22%, transparent), transparent 65%)",
            }}
          />
        </a>
      </m.div>
      <p className="mt-1 text-center text-mini tracking-widest text-ink/50 uppercase">{caption}</p>
    </div>
  );
}
