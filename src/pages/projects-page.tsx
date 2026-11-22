import { ProjectCard } from "@/components/project-card"
import { projects } from "@/data/projects"

export function ProjectsPage() {
  return (
    <section aria-labelledby="projects-title" className="max-w-5xl">
      <h1
        id="projects-title"
        className="mb-8 w-fit font-heading text-4xl font-bold tracking-tight after:mt-3 after:block after:h-1 after:rounded-full after:bg-accent sm:mb-10 sm:text-6xl"
      >
        Projects
      </h1>

      <ol aria-label="Project timeline" role="list" className="list-none">
        {projects.map((project) => (
          <li
            key={project.id}
            className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-6 [--timeline-marker-offset:3rem] not-last:pb-5 before:absolute before:inset-y-0 before:left-(--timeline-marker-offset) before:w-px before:-translate-x-1/2 before:bg-primary/40 first:before:top-8 last:before:bottom-auto last:before:h-8 only:before:hidden sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-8 sm:[--timeline-marker-offset:4.5rem] sm:not-last:pb-6"
          >
            <time
              dateTime={String(project.year)}
              className="mt-8 -translate-y-1/2 self-start text-right text-xs leading-none font-semibold text-muted-foreground tabular-nums sm:text-sm sm:leading-none"
            >
              {project.year}
            </time>
            <span
              aria-hidden="true"
              className="absolute top-8 left-(--timeline-marker-offset) size-3 -translate-1/2 rounded-full bg-primary ring-4 ring-background"
            />
            <ProjectCard project={project} />
          </li>
        ))}
      </ol>
    </section>
  )
}
