import type { Project } from "@/data/projects";
import { Badge, StatusDot } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { StrokeText } from "@/components/ui/StrokeText";
import { cn, pad } from "@/lib/utils";
import { ProjectMedia } from "./ProjectMedia";

/** One entry of the /projects archive. Odd entries put the media on the left. */
export function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const flip = index % 2 === 1;
  const [a, b] = project.name.split("|");

  return (
    <article className="relative h-full" aria-labelledby={`${project.slug}-title`}>
      <StrokeText
        alpha={0.18}
        width={1.5}
        className="pointer-events-none absolute -top-4 -right-2 font-syne text-[6rem] leading-none font-extrabold md:-top-8 md:right-4 md:text-[13rem] lg:text-[17rem]"
      >
        {pad(index + 1)}
      </StrokeText>

      <div className="gutter relative z-10 flex h-full flex-col justify-center gap-6 py-12 md:gap-10 md:py-16">
        <div className="flex items-center justify-between border-b border-ink/10 pr-20 pb-4 md:pr-0">
          <span className="font-mono text-micro tracking-label text-ink/40 uppercase md:text-xs">
            Entry {pad(index + 1)} — {pad(total)}
          </span>
          <span className="hidden items-center gap-2 font-mono text-xs tracking-label text-ink/50 uppercase md:flex">
            {project.status === "live" ? (
              <StatusDot size={8} />
            ) : (
              <span aria-hidden className="inline-flex h-2 w-2 rounded-full bg-ink/40" />
            )}
            {project.statusLabel}
          </span>
        </div>

        <div className="grid min-w-0 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className={cn("min-w-0", flip && "lg:order-2")}>
            <h2
              id={`${project.slug}-title`}
              className="mb-4 font-syne text-3xl font-extrabold tracking-tight text-ink uppercase md:mb-6 md:text-5xl lg:text-6xl"
            >
              {a}
              {b !== undefined && (
                <>
                  <wbr />
                  {b}
                </>
              )}
            </h2>
            <p className="mb-5 max-w-xl text-sm leading-relaxed text-ink/60 md:mb-8 md:text-lg">{project.summary}</p>
            <div className="mb-6 flex flex-wrap gap-2 md:mb-10">
              {project.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <LinkButton href={project.liveUrl} size="md">
                  Visit live site
                </LinkButton>
              )}
              {project.caseStudyHref && (
                <LinkButton href={project.caseStudyHref} variant={project.liveUrl ? "outline" : "solid"} size="md">
                  Read case study
                </LinkButton>
              )}
              <LinkButton href={project.githubUrl} variant="outline" size="md">
                View code
              </LinkButton>
            </div>
          </div>

          <div
            className={cn(
              "group relative z-10 aspect-video w-full min-w-0 overflow-hidden rounded-2xl border border-ink/10 shadow-2xl shadow-black/25",
              flip && "lg:order-1",
            )}
          >
            <ProjectMedia
              project={project}
              imageClassName="grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
