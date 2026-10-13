import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/utils";

/** Advance widths (em) of Syne ExtraBold capitals, measured in the browser. */
const SYNE_800: Record<string, number> = {
  A: 1.16,
  B: 1.14,
  C: 1.316,
  D: 1.302,
  E: 1.14,
  F: 1.128,
  G: 1.34,
  H: 1.28,
  I: 0.42,
  J: 1.004,
  K: 1.215,
  L: 0.943,
  M: 1.58,
  N: 1.3,
  O: 1.33,
  P: 1.177,
  Q: 1.33,
  R: 1.232,
  S: 1.056,
  T: 1.1,
  U: 1.289,
  V: 1.16,
  W: 1.882,
  X: 1.14,
  Y: 1.07,
  Z: 1.2,
  " ": 0.31,
  ".": 0.354,
  "-": 0.59,
  "&": 1.22,
};

/** Rendered width of an uppercase Syne ExtraBold string, in em. */
function emWidth(text: string) {
  return Array.from(text.toUpperCase()).reduce((sum, ch) => sum + (SYNE_800[ch] ?? 1.2), 0);
}

/**
 * The signature two-line page headline: a light italic line over a heavy one,
 * each sliding up from its own mask on load. The heavy line keeps its size
 * unless the word is too long for the viewport, then shrinks just enough to fit.
 */
export function PageTitle({
  thin,
  bold,
  accentDot = false,
  className,
  thinClassName = "text-page-thin tracking-tight",
  boldClassName = "text-page-bold",
}: {
  thin: string;
  bold: string;
  accentDot?: boolean;
  className?: string;
  thinClassName?: string;
  boldClassName?: string;
}) {
  const fit = emWidth(bold) + (accentDot ? SYNE_800["."] : 0);
  return (
    <h1 className={cn("font-syne leading-[0.92] uppercase", className)} aria-label={`${thin} ${bold}`}>
      <TextReveal
        as="span"
        split="lines"
        trigger="mount"
        delay={0.1}
        stagger={0.12}
        text={[thin]}
        className="block"
        unitClassName={cn("font-normal text-ink/70 italic", thinClassName)}
      />
      <span className={cn("flex items-baseline", boldClassName)} style={{ "--fit": fit.toFixed(2) } as React.CSSProperties} aria-hidden>
        <TextReveal
          as="span"
          split="lines"
          trigger="mount"
          delay={0.22}
          text={[bold]}
          className="block min-w-0"
          unitClassName="title-fit font-extrabold text-ink"
        />
        {accentDot && <span className="title-fit font-extrabold text-accent">.</span>}
      </span>
    </h1>
  );
}
