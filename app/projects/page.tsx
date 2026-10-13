import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FadeIn } from "@/components/motion/FadeIn";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectStack, StackCard } from "@/components/projects/ProjectStack";
import { BigCta } from "@/components/ui/BigCta";
import { PageTitle } from "@/components/ui/PageTitle";
import { projects } from "@/data/projects";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects — Proof of Work",
  description:
    "The complete archive: nine projects — a voice-powered AI doctor assistant, Bangladeshi food recognition, an interview preparation platform, Bangla speech recognition and more. Each with a case study and its code.",
  alternates: { canonical: "/projects" },
  openGraph: { title: "Proof of Work — Sazzad Hossain Adib", url: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <main id="main" className="overflow-x-clip bg-surface text-ink">
        <section className="relative flex min-h-[100svh] flex-col">
          <Header label={`${pad(projects.length)} entries`} />
          <div className="gutter flex flex-1 flex-col justify-center">
            <FadeIn onMount>
              <p className="mb-6 font-mono text-xs tracking-spread text-ink/40 uppercase md:text-sm">The complete archive</p>
            </FadeIn>
            <PageTitle
              thin="Proof of"
              bold="Work"
              className="leading-[0.95]"
              thinClassName="text-[12vw] md:text-[10rem] text-ink/80"
              boldClassName="text-[12vw] md:text-[10rem]"
            />
            <Reveal delay={0.45}>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/60 md:text-xl">
                Every entry here is a real project — built, tested, and deployed or open-sourced. Nothing on this page is a mockup — click
                through, read the case studies, try the live demos, read the code.
              </p>
            </Reveal>
          </div>
          <FadeIn onMount delay={0.8} className="gutter flex items-center gap-4 pb-10">
            <span className="font-mono text-micro tracking-spread text-ink/40 uppercase md:text-xs">The record starts below</span>
            <span aria-hidden className="h-8 w-px animate-pulse bg-linear-to-b from-ink/60 to-transparent motion-reduce:animate-none" />
          </FadeIn>
        </section>

        <ProjectStack count={projects.length}>
          {projects.map((project, i) => (
            <StackCard key={project.slug} index={i} id={`entry-${pad(i + 1)}`}>
              <ProjectCard project={project} index={i} total={projects.length} />
            </StackCard>
          ))}
        </ProjectStack>

        <BigCta
          backdrop={pad(projects.length + 1)}
          thin="Yours could be"
          bold="next"
          body="The next entry in this archive is an unsolved problem right now. If it's yours, tell me about it."
          primary={{ label: "Start a project", href: "/contact" }}
          secondary={{ label: "Back home", href: "/" }}
          className="min-h-[80svh]"
        />
      </main>
      <Footer />
    </>
  );
}
