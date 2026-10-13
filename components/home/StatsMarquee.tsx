import { heroTicker } from "@/data/home";
import { Marquee } from "@/components/motion/Marquee";
import { LiveClock } from "@/components/ui/LiveClock";

/** Ticker pinned to the bottom of the hero: headline numbers and the Dhaka clock. */
export function StatsMarquee() {
  return (
    <Marquee
      duration={32}
      repeat={2}
      label="Studio facts"
      className="flex-none border-t border-ink/8 bg-surface-2"
      trackClassName="py-3.5 font-mono text-mini tracking-meta text-ink/50 uppercase"
    >
      {heroTicker.map((item) => (
        <span key={item.strong} className="inline-flex items-center gap-3 px-7">
          <b className="font-normal text-ink">
            {item.strong}
            {item.clock && (
              <>
                {" "}
                <LiveClock />
              </>
            )}
          </b>
          {item.soft}
          <span aria-hidden className="text-accent">
            ✦
          </span>
        </span>
      ))}
    </Marquee>
  );
}
