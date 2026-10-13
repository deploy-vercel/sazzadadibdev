import Link from "next/link";
import { Briefcase, CodeXml } from "lucide-react";
import { contactSection } from "@/data/home";
import { site } from "@/data/site";
import { BriefForm } from "@/components/contact/BriefForm";
import { QRCode } from "@/components/contact/QRCode";
import { QrPlate } from "@/components/contact/QrPlate";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const qrClass = "block h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-0 overflow-hidden border-t border-ink/10 bg-surface-2"
      aria-labelledby="contact-title"
    >
      <svg aria-hidden viewBox="0 0 1200 800" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
        <path d="M-40 640C180 470 320 520 470 420S760 120 1240 220" fill="none" className="stroke-ink/10" strokeWidth="1.5" />
        <path d="M1240 330C1060 420 980 640 760 690S300 760 -40 560" fill="none" className="stroke-ink/7" strokeWidth="1.5" />
      </svg>

      <div className="relative z-10 mx-auto max-w-page px-2 py-12 sm:px-4">
        <Reveal className="mb-10 space-y-4 text-center">
          <SectionLabel>{contactSection.eyebrow}</SectionLabel>
          <h2 id="contact-title" className="font-syne text-4xl leading-tight font-extrabold text-balance text-ink lg:text-5xl">
            {contactSection.title}
            <br />
            <span className="text-ink/60">{contactSection.titleSoft}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto mb-12 max-w-4xl px-2">
          <ul className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3 border-y border-ink/10 py-5 font-mono text-mini tracking-meta text-ink/50 uppercase">
            {contactSection.promises.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-accent-fill" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-xs text-ink/30">
            {contactSection.sprintNote}{" "}
            <Link
              href="/services"
              className="whitespace-nowrap text-ink/55 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink hover:decoration-accent/60"
            >
              see how it works →
            </Link>
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mx-auto max-w-7xl">
          <div className="relative z-10 border border-ink/10 bg-surface p-3 shadow-2xl shadow-black/10 lg:p-12">
            <div className="grid items-stretch gap-4 lg:grid-cols-2 lg:gap-12">
              <div className="flex h-full flex-col gap-8 border border-ink/10 bg-surface-3 p-6 shadow-lg lg:p-8">
                <div className="text-center sm:text-left">
                  <p className="mb-3 text-mini tracking-label text-ink/50 uppercase">Direct line</p>
                  <h3 className="mb-3 font-serif text-2xl text-ink italic">{contactSection.qrTitle}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-ink/60">{contactSection.qrBody}</p>
                  <p className="flex items-center justify-center gap-2 text-sm sm:justify-start">
                    <span aria-hidden className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping bg-accent-fill opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2 w-2 bg-accent-fill" />
                    </span>
                    <span className="text-ink/60">{contactSection.replyNote}</span>
                  </p>
                  <p className="mt-2 font-mono text-xs text-ink/50">
                    {site.linkedinHandle} · {site.githubHandle}
                  </p>
                </div>

                <div className="grid flex-1 grid-cols-2 place-items-center content-center gap-3 sm:gap-6">
                  <QrPlate
                    href={site.links.linkedin}
                    label="View Sazzad's LinkedIn profile"
                    accent="#0A66C2"
                    badge={<Briefcase className="h-[16px] w-[16px]" strokeWidth={2.25} />}
                    caption="LinkedIn"
                  >
                    <QRCode value={site.links.linkedin} label="LinkedIn QR code" className={qrClass} logoGap={9} />
                  </QrPlate>
                  <QrPlate
                    href={site.links.github}
                    label="Browse Sazzad's code on GitHub"
                    accent="#24292F"
                    badge={<CodeXml className="h-[16px] w-[16px]" strokeWidth={2.25} />}
                    caption="GitHub"
                  >
                    <QRCode value={site.links.github} label="GitHub QR code" className={qrClass} logoGap={9} />
                  </QrPlate>
                </div>

                <div className="mt-auto flex flex-wrap items-baseline justify-between gap-2 border-t border-ink/10 pt-4">
                  <span className="font-mono text-mini tracking-eyebrow text-ink/35 uppercase">Prefer email?</span>
                  <a href={`mailto:${site.email}`} className="font-mono text-xs text-ink/60 transition-colors hover:text-ink">
                    {site.email}
                  </a>
                </div>
              </div>

              <BriefForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
