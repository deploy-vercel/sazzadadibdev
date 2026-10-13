import Image from "next/image";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** What fills a project's frame: the project screenshot. */
export function ProjectMedia({
  project,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  imageClassName,
}: {
  project: Project;
  sizes?: string;
  imageClassName?: string;
}) {
  return <Image src={project.image} alt={project.imageAlt} fill sizes={sizes} className={cn("object-cover object-top", imageClassName)} />;
}
