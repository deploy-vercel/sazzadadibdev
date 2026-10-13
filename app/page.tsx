import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { MenuButton } from "@/components/layout/MenuOverlay";
import { BugHunt } from "@/components/home/BugHunt";
import { ContactSection } from "@/components/home/ContactSection";
import { Engineering } from "@/components/home/Engineering";
import { Hero } from "@/components/home/Hero";
import { HeroMobile } from "@/components/home/HeroMobile";
import { Journey } from "@/components/home/Journey";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ScoperTeaser } from "@/components/home/ScoperTeaser";
import { StatsMarquee } from "@/components/home/StatsMarquee";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <IntroLoader />
      <MenuButton floating />
      <main id="main" className="min-h-screen bg-linear-to-b from-surface-2 to-surface text-ink">
        <Hero ticker={<StatsMarquee />} />
        <HeroMobile />
        <ProjectsSection />
        <Engineering />
        <Journey />
        <ScoperTeaser />
        <ContactSection />
      </main>
      <Footer />
      <BugHunt />
    </>
  );
}
