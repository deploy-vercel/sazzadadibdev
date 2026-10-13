import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { featuredProjects, projects, type Project } from "@/data/projects";
import { projectsIntro } from "@/data/home";
import { Glitch } from "@/components/motion/Glitch";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { Tag } from "@/components/ui/Badge";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { LinkButton, MonoLink } from "@/components/ui/LinkButton";
import { SectionIntro, SectionLabel } from "@/components/ui/SectionLabel";
import { pad } from "@/lib/utils";
import { ProjectsRail, RailParallax } from "./ProjectsRail";

const total = pad(featuredProjects.length);

function ProjectName({ name }: { name: string }) {
  const [a, b] = name.split("|");
  return (
    <>
      {a}
      {b !== undefined && (
        <>
          <wbr />
          {b}
        </>
      )}
    </>
  );
}

function ProjectFacts({ project }: { project: Project }) {
  return (
    <dl className="mt-8 max-w-md border-t border-ink/10">
      <div className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-3">
        <dt className="shrink-0 font-mono text-mini tracking-meta text-ink/35 uppercase">Stack</dt>
        <dd className="text-right text-sm text-ink/70">{project.stack.join(" · ")}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-3">
        <dt className="shrink-0 font-mono text-mini tracking-meta text-ink/35 uppercase">Status</dt>
        <dd className="flex items-center gap-2 text-sm text-ink/70">
          {project.status === "live" && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-fill" />}
          {project.statusLabel}
        </dd>
      </div>
    </dl>
  );
}

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
      {project.caseStudyHref && (
        <LinkButton href={project.caseStudyHref} size="sm">
          Read case study
        </LinkButton>
      )}
      {project.liveUrl && <MonoLink href={project.liveUrl}>Visit live</MonoLink>}
      <MonoLink href={project.githubUrl}>View code</MonoLink>
    </div>
  );
}

/** Desktop rail panel for one featured project. */
function RailProject({ project, index }: { project: Project; index: number }) {
  const n = pad(index + 1);
  return (
    <article
      className="relative flex h-full w-screen shrink-0 items-center overflow-hidden px-6 sm:px-[5vw]"
      aria-label={project.shortName}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-[4svh] -right-[2vw] font-mono text-outline-num leading-none text-ink/4 select-none"
      >
        {n}
      </span>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-[4vw]">
        <div className="relative z-10">
          <p className="eyebrow">
            <span className="text-accent/80">{n}</span> / {total}
          </p>
          <h3 className="mt-4 font-syne text-5xl leading-[1.05] font-extrabold text-ink xl:text-6xl">
            <ProjectName name={project.name} />
          </h3>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink/60">{project.tagline}</p>
          {project.demoHint && <p className="mt-3 max-w-md text-sm text-ink/40">{project.demoHint}</p>}
          <ProjectFacts project={project} />
          <ProjectActions project={project} />
        </div>
        <RailParallax index={index + 1} className="relative z-0">
          <BrowserFrame domain={project.domain}>
            <ProjectMedia project={project} sizes="(min-width: 1024px) 55vw, 1px" />
          </BrowserFrame>
        </RailParallax>
      </div>
    </article>
  );
}

/** Stacked card used below lg (no live demos on small screens). */
function MobileProject({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal as="article" className="border-t border-ink/10 pt-8">
      <p className="font-mono text-xs tracking-eyebrow text-ink/35 uppercase">
        {pad(index + 1)} / {total}
      </p>
      <div className="mt-5">
        <BrowserFrame domain={project.domain}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 1px"
            className="object-cover object-top"
          />
        </BrowserFrame>
      </div>
      <h3 className="mt-6 font-syne text-3xl leading-[1.05] font-extrabold text-ink sm:text-4xl">
        <ProjectName name={project.name} />
      </h3>
      <p className="mt-4 text-base leading-relaxed text-ink/60">{project.summary}</p>
      <p className="mt-5 flex items-center gap-2 font-mono text-mini tracking-meta text-ink/50 uppercase">
        {project.status === "live" && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-fill" />}
        {project.statusLabel}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </ul>
      <ProjectActions project={project} />
    </Reveal>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 bg-surface-2" aria-labelledby="projects-title">
      <ProjectsRail count={featuredProjects.length + 2}>
        <div className="flex h-full w-screen shrink-0 items-center justify-center px-6">
          <div className="max-w-2xl space-y-4 text-center">
            <SectionLabel>{projectsIntro.eyebrow}</SectionLabel>
            <h2 id="projects-title" className="text-balance font-syne text-5xl leading-tight font-extrabold text-ink xl:text-6xl">
              <Glitch text={projectsIntro.title} />
            </h2>
            <p className="text-balance text-lg leading-relaxed text-ink/60">{projectsIntro.lead}</p>
            <p className="flex items-center justify-center gap-2 pt-6 font-mono text-xs tracking-eyebrow text-ink/35 uppercase">
              Keep scrolling
              <ArrowRight aria-hidden className="h-4 w-4 animate-pulse" />
            </p>
          </div>
        </div>

        {featuredProjects.map((project, i) => (
          <RailProject key={project.slug} project={project} index={i} />
        ))}

        <div className="relative flex h-full w-screen shrink-0 items-center justify-center px-6">
          <div className="relative max-w-xl space-y-5 text-center">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-[16svh] font-mono text-[clamp(9rem,24svh,15rem)] leading-none text-ink/4 select-none"
            >
              {pad(featuredProjects.length + 1)}
            </span>
            <h3 className="text-balance font-syne text-4xl leading-tight font-extrabold text-ink xl:text-5xl">
              {projectsIntro.outroTitle}
            </h3>
            <p className="text-balance text-lg leading-relaxed text-ink/60">{projectsIntro.outroLead}</p>
            <LinkButton href="/projects" icon="right">
              Browse the archive
            </LinkButton>
          </div>
        </div>
      </ProjectsRail>

      {/* Below lg */}
      <div className="mx-auto max-w-xl px-6 pb-20 sm:max-w-2xl lg:hidden">
        <SectionIntro
          eyebrow={projectsIntro.eyebrow}
          title={<Glitch text={projectsIntro.title} />}
          lead={projectsIntro.lead}
          className="my-16"
        />
        <p className="-mt-10 mb-14 text-center font-mono text-mini tracking-meta text-ink/35 uppercase">
          {featuredProjects.length} featured · {projects.length} in total
        </p>
        <div className="space-y-14">
          {featuredProjects.map((project, i) => (
            <MobileProject key={project.slug} project={project} index={i} />
          ))}
        </div>
        <div className="mt-14 text-center">
          <LinkButton href="/projects" icon="right">
            Browse the archive
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
