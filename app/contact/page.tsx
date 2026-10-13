import type { Metadata } from "next";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactSteps } from "@/components/contact/ContactSteps";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FadeIn } from "@/components/motion/FadeIn";
import { Reveal } from "@/components/motion/Reveal";
import { StatusDot } from "@/components/ui/Badge";
import { LiveClock } from "@/components/ui/LiveClock";
import { PageTitle } from "@/components/ui/PageTitle";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Start Something",
  description:
    "Get in touch with MD. Sazzad Hossain Adib for AI engineering roles, projects, and collaborations — by email, LinkedIn, or GitHub.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Sazzad Hossain Adib", url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <main id="main" className="overflow-x-clip bg-surface text-ink">
        <Header label="Contact" />

        <div className="border-y border-ink/8">
          <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-3.5 font-mono text-mini tracking-[0.22em] text-ink/50 uppercase md:px-12">
            <span className="flex items-center gap-2.5">
              <StatusDot />
              Status: {site.availability.toLowerCase()}
            </span>
            <span className="hidden sm:inline">
              Local time, Dhaka — <LiveClock seconds className="text-ink" /> {site.timeZoneLabel}
            </span>
            <span className="hidden md:inline">
              Based in — <span className="text-ink">{site.address}</span>
            </span>
          </div>
        </div>

        <section className="gutter mx-auto max-w-site pt-16 pb-16 md:pt-24 md:pb-24">
          <PageTitle thin="Start" bold="Something" accentDot boldClassName="text-[clamp(2.6rem,8.4vw,10.625rem)]" />
          <div className="mt-11 grid grid-cols-1 items-end gap-8 md:grid-cols-[1fr_auto] md:gap-12">
            <Reveal delay={0.35}>
              <p className="max-w-lg text-base leading-relaxed text-ink/60 md:text-lg">
                Whether it&apos;s a role, a project, or a collaboration — I&apos;d love to hear from you. Three channels below; pick
                whichever feels least like work. They all reach me directly.
              </p>
            </Reveal>
            <FadeIn onMount delay={0.6}>
              <p className="font-mono text-xs tracking-meta text-ink/30" aria-hidden>
                [ SELECT A CHANNEL ↓ ]
              </p>
            </FadeIn>
          </div>
        </section>

        <ContactChannels />
        <ContactSteps />
      </main>
      <Footer />
    </>
  );
}
