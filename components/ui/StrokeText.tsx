import { cn } from "@/lib/utils";

/** Outlined display text. `alpha` controls the stroke's ink opacity. */
export function StrokeText({
  children,
  alpha = 0.35,
  width = 1,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  alpha?: number;
  width?: number;
  className?: string;
  as?: "span" | "div";
}) {
  return (
    <Tag
      className={cn("text-stroke select-none", className)}
      style={{ "--stroke-alpha": alpha, "--stroke-width": `${width}px` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
