import { aboutIntro } from "@/data/about";
import { site, socialLinks } from "@/data/site";
import { HomeBackLink } from "@/components/layout/Header";
import { MenuButton } from "@/components/layout/MenuOverlay";
import { TextReveal } from "@/components/motion/TextReveal";
import { StatusDot } from "@/components/ui/Badge";
import { LiveClock } from "@/components/ui/LiveClock";
import { SectionNav } from "./SectionNav";

export function AboutSidebar() {
  return (
    <aside className="flex flex-col border-b border-ink/10 bg-surface-2 px-6 pt-7 pb-10 md:px-11 lg:sticky lg:top-0 lg:h-screen lg:border-r lg:border-b-0">
      <div className="flex items-center justify-between">
        <HomeBackLink />
        <MenuButton />
      </div>

      <div className="mt-12 lg:mt-auto lg:pt-10">
        <p className="flex items-center gap-2.5 font-mono text-mini tracking-[0.24em] text-ink/50 uppercase">
          <StatusDot />
          {aboutIntro.status}
        </p>
        <h1 className="mt-6 font-syne leading-[0.88] uppercase" aria-label={`${aboutIntro.thin} ${aboutIntro.bold}`}>
          <TextReveal
            text={[aboutIntro.thin]}
            split="lines"
            trigger="mount"
            delay={0.1}
            className="block"
            unitClassName="font-normal whitespace-nowrap text-ink/70 italic text-[2.2rem]"
          />
          <span className="flex items-baseline" aria-hidden>
            <TextReveal
              text={[aboutIntro.bold]}
              split="lines"
              trigger="mount"
              delay={0.22}
              className="block"
              unitClassName="font-extrabold whitespace-nowrap text-ink text-[3.75rem]"
            />
            <span className="text-[3.75rem] font-extrabold text-accent">.</span>
          </span>
        </h1>
        <p className="mt-6 text-body leading-relaxed text-ink/60">{aboutIntro.lead}</p>
      </div>

      <SectionNav />

      <div className="mt-12 flex items-baseline justify-between gap-4 lg:mt-auto lg:pt-10">
        <div className="flex gap-5 font-mono text-micro tracking-tag">
          {socialLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              aria-label={l.aria}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-ink/60 uppercase transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </div>
        <span className="font-mono text-mini text-ink/40 tabular-nums">
          {site.location.split(",")[0].toUpperCase()} <LiveClock />
        </span>
      </div>
    </aside>
  );
}
