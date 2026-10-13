import { cn } from "@/lib/utils";

/** Minimal browser chrome: three dots and a centered address label. */
export function BrowserFrame({ domain, children, className }: { domain: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-ink/12 bg-surface-3 shadow-[0_30px_120px_-30px_rgb(0_0_0/0.45),0_0_60px_-20px_rgb(var(--c-ink)/0.06)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-mini text-ink/40">{domain}</span>
        <span aria-hidden className="w-[42px]" />
      </div>
      <div className="relative aspect-[16/10]">{children}</div>
    </div>
  );
}
