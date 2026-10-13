"use client";

import { animate, m, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import { useRef, useState } from "react";

const TRACK_W = 256;
const HANDLE = 44;
const PAD = 6;
const MAX = TRACK_W - HANDLE - PAD * 2;
const THRESHOLD = 0.82;

/**
 * Slide-to-confirm control. Dragging the handle past ~80% fires `onSend`;
 * the handle is also a regular button, so keyboard and screen-reader users
 * just press it.
 */
export function SwipeToSend({ onSend, disabled }: { onSend: () => void; disabled?: boolean }) {
  const x = useMotionValue(0);
  const [armed, setArmed] = useState(false);
  const dragged = useRef(false);
  const fill = useTransform(x, (v) => v + HANDLE + PAD);
  const hintOpacity = useTransform(x, [0, MAX * 0.6], [1, 0]);

  useMotionValueEvent(x, "change", (v) => setArmed(v / MAX >= THRESHOLD));

  function settle() {
    if (x.get() / MAX >= THRESHOLD) {
      animate(x, MAX, { duration: 0.15 });
      onSend();
      setTimeout(() => animate(x, 0, { type: "spring", stiffness: 300, damping: 30 }), 700);
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 32 });
    }
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-ink/10 bg-ink/6 select-none"
      style={{ width: TRACK_W, height: HANDLE + PAD * 2 }}
    >
      <m.div className="absolute inset-y-0 left-0 overflow-hidden rounded-2xl bg-accent-fill/15" style={{ width: fill }}>
        <div className="flex h-full items-center justify-center pl-10" style={{ width: TRACK_W }}>
          <span className="font-mono text-xs font-medium tracking-[0.18em] text-accent-hover uppercase">Release to send</span>
        </div>
      </m.div>
      <m.div aria-hidden className="absolute inset-0 flex items-center justify-center pl-10" style={{ opacity: hintOpacity }}>
        <span className="font-mono text-xs font-medium tracking-[0.18em] text-ink/45 uppercase">Swipe to send</span>
      </m.div>
      <m.div
        className="absolute z-10"
        style={{ x, top: PAD, left: PAD }}
        drag={disabled ? false : "x"}
        dragConstraints={{ left: 0, right: MAX }}
        dragElastic={0.02}
        dragMomentum={false}
        onDragStart={() => (dragged.current = true)}
        onDragEnd={() => {
          settle();
          setTimeout(() => (dragged.current = false), 0);
        }}
      >
        <button
          type="button"
          disabled={disabled}
          aria-label="Send message"
          onClick={() => {
            if (!dragged.current) onSend();
          }}
          className="cursor-grab flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-surface shadow-lg shadow-black/30 transition-colors hover:bg-ink/85 active:cursor-grabbing disabled:opacity-50"
          data-armed={armed || undefined}
        >
          <SendHorizontal aria-hidden className="h-5 w-5" />
        </button>
      </m.div>
    </div>
  );
}
