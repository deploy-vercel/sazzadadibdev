import { cn } from "@/lib/utils";

/** Inline thin-italic + extra-bold uppercase headline used by section headers. */
export function SplitHeading({
  thin,
  bold,
  as: Tag = "h2",
  stacked = false,
  accentDot = false,
  className,
  id,
}: {
  thin: string;
  bold: string;
  as?: "h1" | "h2" | "h3";
  stacked?: boolean;
  accentDot?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("font-syne leading-[0.95] uppercase", className)}>
      <span className={cn("font-normal text-ink/70 italic", stacked && "block")}>{thin}</span>
      {!stacked && " "}
      <span className={cn("font-extrabold text-ink", stacked && "block")}>
        {bold}
        {accentDot && <span className="text-accent">.</span>}
      </span>
    </Tag>
  );
}
