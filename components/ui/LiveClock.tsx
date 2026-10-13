"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/data/site";

function subscribe(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

function format(withSeconds: boolean) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds ? { second: "2-digit" } : {}),
    hour12: false,
    timeZone: site.timeZone,
  }).format(new Date());
}

/** Live local time in Dhaka. Renders a placeholder on the server. */
export function LiveClock({ seconds = false, className }: { seconds?: boolean; className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => format(seconds),
    () => (seconds ? "--:--:--" : "--:--"),
  );
  return (
    <time className={`tabular-nums ${className ?? ""}`} suppressHydrationWarning>
      {time}
    </time>
  );
}

const noop = () => () => {};

/** Current year, resolved on the client so static pages never go stale. */
export function CurrentYear() {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => 2026,
  );
  return <>{year}</>;
}
