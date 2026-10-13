import { cn } from "@/lib/utils";

/** Mono uppercase eyebrow, optionally led by the accent chevron "›". */
export function SectionLabel({
  children,
  chevron = true,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  chevron?: boolean;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag className={cn("eyebrow", className)}>
      {chevron && (
        <span aria-hidden className="mr-2 text-accent/80">
          ›
        </span>
      )}
      {children}
    </Tag>
  );
}

/** Centered section intro: eyebrow, display heading, lead paragraph. */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  className,
  headingLevel: H = "h2",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  headingLevel?: "h1" | "h2";
}) {
  return (
    <div className={cn("mx-auto max-w-3xl space-y-4 px-4 text-center", className)}>
      <SectionLabel>{eyebrow}</SectionLabel>
      <H className="text-balance font-syne text-[clamp(1.75rem,9vw,2.25rem)] leading-tight font-extrabold text-ink sm:text-5xl">{title}</H>
      {lead && <p className="text-balance text-lg leading-relaxed text-ink/60">{lead}</p>}
    </div>
  );
}
