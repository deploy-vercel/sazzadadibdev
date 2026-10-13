import Link from "next/link";
import { footerPrimary, footerSecondary, footerTicker, site, socialLinks } from "@/data/site";
import { Marquee } from "@/components/motion/Marquee";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { Reveal } from "@/components/motion/Reveal";
import { CurrentYear } from "@/components/ui/LiveClock";
import { BackToTop, SoundToggle } from "./FooterControls";
import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-surface">
      <div className="mx-auto w-full max-w-page px-4 pt-16 sm:px-8 md:pt-20">
        <nav aria-label="Footer" className="flex flex-col gap-6 md:grid md:grid-cols-3 md:items-start">
          {footerPrimary.map((link, i) => (
            <MaskReveal
              key={link.href}
              delay={i * 0.08}
              className={cn(i === 1 && "md:text-center", i === 2 && "md:text-right")}
              innerClassName="inline-block"
            >
              <Link
                href={link.href}
                className="group relative inline-block font-syne text-4xl font-extrabold text-ink sm:text-5xl lg:text-6xl"
              >
                {link.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-accent-fill transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </Link>
            </MaskReveal>
          ))}
        </nav>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-4">
          {footerSecondary.map((link, i) => (
            <MaskReveal key={link.href} delay={0.2 + i * 0.06}>
              <Link href={link.href} className="font-syne text-lg font-bold text-ink/90 transition-colors hover:text-accent">
                {link.label}
              </Link>
            </MaskReveal>
          ))}
          <div className="ml-auto flex items-baseline gap-8">
            <MaskReveal delay={0.3}>
              <SoundToggle />
            </MaskReveal>
            <MaskReveal delay={0.36}>
              <BackToTop />
            </MaskReveal>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-8 md:mt-20 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="font-syne text-lg font-bold text-ink">Building production LLM systems, one project at a time.</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/50">
              © <CurrentYear /> {site.fullName}. {site.role}, Dhaka, Bangladesh. All rights reserved.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="flex gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.aria}
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="font-mono text-xs tracking-eyebrow text-ink/60 uppercase transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        <Wordmark />
      </div>

      <Marquee duration={24} className="border-t border-ink/10 py-4" repeat={2}>
        {footerTicker.map((item) => (
          <span key={item.strong} className="flex items-center gap-10 pr-10 font-mono text-xs tracking-meta uppercase">
            <span className="flex items-center gap-3">
              <span className="font-bold text-ink/80">{item.strong}</span>
              <span className="text-ink/40">{item.soft}</span>
            </span>
            <span aria-hidden className="text-accent/80">
              ↗
            </span>
          </span>
        ))}
      </Marquee>
    </footer>
  );
}
