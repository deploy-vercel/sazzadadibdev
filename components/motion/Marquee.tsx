import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  /** How many times the content is repeated inside each copy (to cover wide screens). */
  repeat?: number;
  className?: string;
  trackClassName?: string;
  label?: string;
};

/**
 * Seamless CSS marquee. The track holds two identical copies and slides by
 * exactly -50%, so the loop point is invisible. No client JavaScript.
 * Reduced motion stops the animation (see globals.css).
 */
export function Marquee({
  children,
  duration = 32,
  direction = "left",
  pauseOnHover = true,
  repeat = 2,
  className,
  trackClassName,
  label,
}: MarqueeProps) {
  const copy = Array.from({ length: repeat }, (_, i) => (
    <div key={i} className="flex shrink-0">
      {children}
    </div>
  ));

  return (
    <div
      className={cn("marquee overflow-hidden whitespace-nowrap", className)}
      data-direction={direction}
      data-pause-on-hover={pauseOnHover}
      role={label ? "marquee" : undefined}
      aria-label={label}
    >
      <div
        className={cn("marquee-track flex w-max", trackClassName)}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0">{copy}</div>
        <div className="flex shrink-0" aria-hidden>
          {copy}
        </div>
      </div>
    </div>
  );
}
