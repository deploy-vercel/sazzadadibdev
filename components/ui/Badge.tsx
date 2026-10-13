import { cn } from "@/lib/utils";

/** Square mono tag with a hairline border (engineering tags, mobile project tags). */
export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <li className={cn("border border-ink/12 px-2.5 py-1 font-mono text-mini tracking-tag text-ink/45 uppercase", className)}>{children}</li>
  );
}

/** Rounded pill used for tech stacks in the project archive. */
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("rounded-full border border-ink/10 bg-ink/5 px-3 py-1.5 text-xs font-medium text-ink/75", className)}>
      {children}
    </span>
  );
}

/** Pulsing availability dot. */
export function StatusDot({ size = 7, className }: { size?: number; className?: string }) {
  return (
    <span aria-hidden className={cn("relative flex shrink-0", className)} style={{ width: size, height: size }}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-fill opacity-60 motion-reduce:animate-none" />
      <span className="relative inline-flex h-full w-full rounded-full bg-accent-fill" />
    </span>
  );
}
