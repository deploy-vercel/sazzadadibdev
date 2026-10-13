"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { easeOutExpo } from "@/lib/motion";
import { useIntro } from "./IntroProvider";

const SEEN_KEY = "intro-seen";
const HOLD_MS = 2300;

const HELLO_PATH =
  "M40 150C70 130 105 80 100 50C96 30 72 34 70 60C66 95 64 130 62 165C70 140 85 115 105 115C122 115 120 140 120 152C120 165 130 168 142 160C160 150 178 138 176 122C174 108 150 110 148 132C146 155 165 168 188 160C210 150 232 105 236 70C239 45 222 40 218 62C213 92 212 135 218 156C222 170 240 166 252 152C268 132 285 100 288 70C290 45 273 40 270 62C265 92 264 135 270 156C274 170 292 168 304 150C312 136 320 118 338 116C360 114 366 150 346 162C328 172 312 156 320 134C326 120 345 116 356 124C368 132 385 128 400 112";

const noopSubscribe = () => () => {};

function hasSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

/** First-visit splash: a hand-drawn "hello" writes itself, then lifts away. Once per session. */
export function IntroLoader() {
  const { done, finish } = useIntro();
  const reduce = useReducedMotion();
  const seen = useSyncExternalStore(noopSubscribe, hasSeen, () => false);
  const [leaving, setLeaving] = useState(false);
  const skip = seen || reduce || done;

  useEffect(() => {
    if (skip) {
      finish();
      return;
    }
    const t = setTimeout(() => setLeaving(true), HOLD_MS);
    return () => clearTimeout(t);
  }, [skip, finish]);

  function complete() {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* private mode: show again next time */
    }
    finish();
  }

  return (
    <AnimatePresence onExitComplete={complete}>
      {!skip && !leaving && (
        <m.div
          key="intro"
          role="presentation"
          className="fixed inset-0 z-[200] grid place-items-center bg-surface-2"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          onClick={() => setLeaving(true)}
        >
          <svg viewBox="0 0 440 220" className="w-[min(60vw,420px)] overflow-visible" aria-hidden>
            <path
              d={HELLO_PATH}
              pathLength={1}
              className="animate-hello-draw fill-none stroke-ink"
              style={{ strokeDasharray: 1, strokeDashoffset: 1, strokeWidth: 9, strokeLinecap: "round", strokeLinejoin: "round" }}
            />
          </svg>
          <m.p
            className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-micro tracking-label whitespace-nowrap text-ink/40 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <span aria-hidden className="mr-2 text-accent/80">
              ›
            </span>
            click anywhere for sound
          </m.p>
        </m.div>
      )}
    </AnimatePresence>
  );
}
