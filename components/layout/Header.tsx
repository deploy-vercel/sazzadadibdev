import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { MenuButton } from "./MenuOverlay";

const backLinkClass =
  "inline-flex items-center gap-2 font-mono text-sm tracking-widest text-ink/50 uppercase transition-colors hover:text-ink";

/** Inner-page header: back-to-home link, page label, menu trigger. */
export function Header({ label, className }: { label?: string; className?: string }) {
  return (
    <header className={cn("gutter flex items-center justify-between py-6 md:py-8", className)}>
      <Link href="/" className={backLinkClass}>
        <ArrowLeft aria-hidden className="h-4 w-4" />
        {site.name}
      </Link>
      <div className="flex items-center gap-4">
        {label && <span className="hidden font-mono text-xs tracking-label text-ink/40 uppercase sm:block">{label}</span>}
        <MenuButton />
      </div>
    </header>
  );
}

/** Compact back link used where the header lives inside another layout (About sidebar). */
export function HomeBackLink() {
  return (
    <Link href="/" className={backLinkClass}>
      <ArrowLeft aria-hidden className="h-4 w-4" />
      {site.name}
    </Link>
  );
}

/** Sticky translucent bar on case-study pages. */
export function CaseStudyBar({
  backHref = "/#projects",
  backLabel = "Projects",
  liveUrl,
  codeUrl,
  right,
}: {
  backHref?: string;
  backLabel?: string;
  liveUrl?: string;
  codeUrl?: string;
  right?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-site items-center justify-between px-6 py-4 md:px-12">
        <Link href={backHref} className={backLinkClass}>
          <ArrowLeft aria-hidden className="h-4 w-4" />
          {backLabel}
        </Link>
        {right}
        {(liveUrl || codeUrl) && (
          <div className="flex items-center gap-6">
            {codeUrl && (
              <a
                href={codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-xs tracking-meta text-ink/50 uppercase transition-colors hover:text-ink"
              >
                View code
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-xs tracking-meta text-accent uppercase transition-colors hover:text-accent-hover"
              >
                Visit live
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
