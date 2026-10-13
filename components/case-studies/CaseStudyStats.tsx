import type { CaseStudyStat } from "@/data/caseStudies";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";

export function CaseStudyStats({ stats, className }: { stats: CaseStudyStat[]; className?: string }) {
  return (
    <Stagger
      as="dl"
      className={cn("mt-14 flex flex-col divide-y divide-ink/12 border border-ink/12 sm:flex-row sm:divide-x sm:divide-y-0", className)}
    >
      {stats.map((s) => (
        <StaggerItem key={s.label} className="flex flex-1 flex-col-reverse px-7 py-6">
          <dt className="mt-2 font-mono text-micro tracking-[0.22em] text-ink/40 uppercase">{s.label}</dt>
          <dd className={cn("font-syne text-3xl font-extrabold", s.accent ? "text-accent" : "text-ink")}>
            {s.value}
            {s.unit && <span className="text-xl">{s.unit}</span>}
          </dd>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
