"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { ContactChannel } from "@/data/contact";
import { SmartLink } from "@/components/ui/LinkButton";
import { easeOutExpo } from "@/lib/motion";
import { cn, pad } from "@/lib/utils";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard blocked: the address is visible anyway */
        }
      }}
      className="rounded-full border border-ink/20 px-3 py-1 font-mono text-micro tracking-meta text-ink/60 uppercase transition-colors hover:border-ink/50 hover:text-ink"
      aria-live="polite"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ChannelPanel({ channel, index, total, qr }: { channel: ContactChannel; index: number; total: number; qr?: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col bg-surface-2">
      <div className="flex items-center justify-between border-b border-ink/10 px-6 py-6 md:px-9">
        <span className="font-mono text-mini tracking-label text-accent uppercase">{channel.eyebrow}</span>
        <span className="font-mono text-mini text-ink/30">
          {pad(index + 1)} / {pad(total)}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-6 py-10 md:px-9">
        <h2 className="font-syne text-2xl font-medium text-ink italic md:text-3xl">{channel.title}</h2>
        <p className="mt-4 text-body leading-relaxed text-ink/60">{channel.body}</p>

        {qr && (
          <div className="mt-8 flex flex-wrap items-center gap-7">
            <div className="flex h-[168px] w-[168px] shrink-0 items-center justify-center rounded border border-ink/10 bg-white">{qr}</div>
            <div>
              <div className="font-mono text-mini tracking-[0.26em] text-ink/40 uppercase">Scan with your camera</div>
              <div className="mt-3.5 font-mono text-sm text-ink">{channel.handle}</div>
              <div aria-hidden className="mt-5 h-[3px] w-11 bg-accent-fill" />
            </div>
          </div>
        )}

        {channel.copyValue && (
          <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-ink/10 py-5">
            <span className="font-mono text-sm break-all text-ink">{channel.copyValue}</span>
            <CopyButton value={channel.copyValue} />
          </div>
        )}

        <div className="mt-auto pt-9">
          <SmartLink
            href={channel.href}
            className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-surface transition-colors hover:bg-accent-fill hover:text-on-accent"
          >
            {channel.cta}
            <span aria-hidden>↗</span>
          </SmartLink>
        </div>
      </div>
      <div className="flex justify-between border-t border-ink/10 px-6 py-5 font-mono text-mini tracking-[0.18em] text-ink/40 md:px-9">
        <span>BEST FOR</span>
        <span className="text-ink/75 uppercase">{channel.bestFor}</span>
      </div>
    </div>
  );
}

/**
 * Contact channels as big outlined rows. Selecting one fills it in and
 * shows its details: in a side panel on desktop, inline below lg.
 */
export function ChannelSelector({ channels, qrCodes }: { channels: ContactChannel[]; qrCodes: Record<string, React.ReactNode> }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const channel = channels[active];

  return (
    <section className="border-y border-ink/12" aria-label="Contact channels">
      <div className="mx-auto grid max-w-site items-stretch lg:grid-cols-[1fr_minmax(420px,540px)]">
        <div className="border-ink/12 lg:border-r">
          <ul aria-label="Choose a channel">
            {channels.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.id} className="border-b border-ink/10">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                    className={cn(
                      "group relative flex w-full items-center gap-4 px-6 py-6 text-left transition-colors md:gap-8 md:px-12 md:py-9",
                      on ? "bg-ink/3" : "bg-transparent hover:bg-ink/2",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn("absolute inset-y-0 left-0 w-[3px] transition-colors", on ? "bg-accent-fill" : "bg-transparent")}
                    />
                    <span className={cn("w-9 shrink-0 font-mono text-xs transition-colors md:w-11", on ? "text-accent" : "text-ink/30")}>
                      /{pad(i + 1)}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-syne text-[clamp(1.6rem,3.6vw,3.5rem)] leading-none font-extrabold uppercase",
                        on ? "text-ink" : "text-stroke [--stroke-alpha:0.35]",
                      )}
                    >
                      {c.name}
                    </span>
                    <span className="hidden shrink-0 font-mono text-mini tracking-[0.24em] text-ink/40 uppercase md:inline">{c.hint}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "shrink-0 text-lg transition-[color,transform] duration-300",
                        on ? "translate-x-1 text-accent" : "text-ink/20",
                      )}
                    >
                      →
                    </span>
                  </button>
                  {/* Inline details below lg */}
                  <AnimatePresence initial={false}>
                    {on && (
                      <m.div
                        className="overflow-hidden lg:hidden"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: easeOutExpo }}
                      >
                        <ChannelPanel channel={c} index={i} total={channels.length} qr={qrCodes[c.id]} />
                      </m.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
          <p className="hidden px-6 py-7 font-mono text-mini tracking-meta text-ink/30 uppercase md:px-12 lg:block">
            All channels → one person, no assistants, no autoresponders
          </p>
        </div>

        <div className="hidden flex-col bg-surface-2 lg:flex" role="region" aria-live="polite" aria-label={`${channel.name} details`}>
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={channel.id}
              className="flex-1"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: easeOutExpo }}
            >
              <ChannelPanel channel={channel} index={active} total={channels.length} qr={qrCodes[channel.id]} />
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
