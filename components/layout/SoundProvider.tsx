"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useSyncExternalStore } from "react";

type Sound = "tick" | "open" | "close";

type SoundCtx = {
  enabled: boolean;
  toggle: () => void;
  play: (sound: Sound) => void;
};

const Ctx = createContext<SoundCtx>({ enabled: false, toggle: () => {}, play: () => {} });

const STORAGE_KEY = "sound";
const listeners = new Set<() => void>();

function readEnabled() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/**
 * Tiny UI sound layer built on the Web Audio API — no audio files.
 * Audio only starts after the first user gesture, per browser autoplay rules.
 */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const enabled = useSyncExternalStore(subscribe, readEnabled, () => false);
  const ctxRef = useRef<AudioContext | null>(null);
  const unlocked = useRef(false);

  useEffect(() => {
    const unlock = () => {
      unlocked.current = true;
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const play = useCallback(
    (sound: Sound) => {
      if (!enabled || !unlocked.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const ctx = (ctxRef.current ??= new AudioContext());
      if (ctx.state === "suspended") void ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      const [from, to, length, volume] =
        sound === "open" ? [520, 880, 0.12, 0.05] : sound === "close" ? [760, 420, 0.1, 0.045] : [1400, 1100, 0.035, 0.025];

      osc.type = "sine";
      osc.frequency.setValueAtTime(from, now);
      osc.frequency.exponentialRampToValueAtTime(to, now + length);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + length);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + length + 0.02);
    },
    [enabled],
  );

  const toggle = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, readEnabled() ? "off" : "on");
    } catch {
      /* storage blocked: nothing to persist */
    }
    listeners.forEach((l) => l());
  }, []);

  return <Ctx.Provider value={{ enabled, toggle, play }}>{children}</Ctx.Provider>;
}

export const useSound = () => useContext(Ctx);
