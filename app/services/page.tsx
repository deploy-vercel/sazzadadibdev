import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FadeIn } from "@/components/motion/FadeIn";
import { Reveal } from "@/components/motion/Reveal";
import { FAQ } from "@/components/services/FAQ";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { Scoper } from "@/components/services/Scoper";
import { ServiceList } from "@/components/services/ServiceList";
import { TechStack } from "@/components/services/TechStack";
import { BigCta } from "@/components/ui/BigCta";
import { PageTitle } from "@/components/ui/PageTitle";
import { StrokeText } from "@/components/ui/StrokeText";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services — Built to Order",
  description:
    "AI-powered applications, full-stack web apps, machine learning and data work — planned, built, tested and shipped with documented code.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Services — Sazzad Hossain Adib", url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <main id="main" className="overflow-x-clip bg-surface text-ink">
        <Header label="Services" />

        <section className="gutter mx-auto max-w-site pt-10 pb-16 md:pt-20 md:pb-20">
          <FadeIn onMount>
            <p className="font-mono text-xs tracking-[0.32em] text-ink/40 uppercase md:text-sm">What I do, and how it works</p>
          </FadeIn>
          <div className="mt-8 grid grid-cols-1 items-end gap-10 md:grid-cols-[1fr_auto]">
            <PageTitle thin="Built to" bold="Order" accentDot />
            <FadeIn onMount delay={0.5} className="hidden pb-3 text-right md:block">
              <StrokeText
                as="div"
                alpha={0.35}
                width={1.5}
                className="font-syne text-[clamp(3rem,5vw,5.25rem)] leading-none font-extrabold"
              >
                {services.length}
              </StrokeText>
              <div className="mt-2.5 font-mono text-mini tracking-label text-ink/40 uppercase">Ways to start</div>
            </FadeIn>
          </div>
          <Reveal delay={0.4}>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-ink/60 md:text-lg">
              Four kinds of work I take on. Different starting points, same ending: something real, deployed, documented, and easy for the
              next developer to pick up.
            </p>
          </Reveal>
        </section>

        <ServiceList />
        <ProcessTimeline />
        <TechStack />
        <FAQ />
        <BigCta
          backdrop="GO"
          thin="Know what you"
          bold="need?"
          body="Tell me about it — even a rough idea is enough to start. No commitment, just an honest read on what it would take to build."
          primary={{ label: "Start the conversation", href: "/contact" }}
          secondary={{ label: "See the proof first", href: "/projects" }}
          className="py-24 md:py-32"
        />
        <Scoper />
      </main>
      <Footer />
    </>
  );
}
