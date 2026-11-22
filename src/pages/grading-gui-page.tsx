import { Link } from "react-router"

import githubIcon from "@/assets/github.svg"
import { ProjectImageCarousel } from "@/components/project-image-carousel"
import { buttonVariants } from "@/components/ui/button"
import { gradingGuiDetails } from "@/data/grading-gui"
import { gradingGuiProject } from "@/data/projects"

export function GradingGuiPage() {
  const { overview, workflow, scriptAuthor, screenshots } = gradingGuiDetails

  return (
    <article aria-labelledby="project-title" className="mx-auto max-w-5xl">
      <Link
        to="/projects"
        className="text-sm underline underline-offset-4 hover:text-accent"
      >
        Back to all projects
      </Link>
      <div className="mt-5 flex items-center justify-between gap-3">
        <h1
          id="project-title"
          className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
        >
          {gradingGuiProject.title}
        </h1>
        <a
          href={gradingGuiProject.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${gradingGuiProject.title} on GitHub (opens in a new tab)`}
          title={`${gradingGuiProject.title} on GitHub`}
          className={buttonVariants({
            variant: "outline",
            size: "icon",
            className: "size-11 rounded-full",
          })}
        >
          <img src={githubIcon} alt="" className="size-10 dark:invert" />
        </a>
      </div>

      <div className="mx-auto mt-6 max-w-3xl">
        <ProjectImageCarousel screenshots={screenshots} />
      </div>

      <div className="mt-8 space-y-6 text-base/7 sm:mt-10 sm:text-lg/8">
        <p>{overview}</p>
        <p>{workflow}</p>
        <p>
          Special thanks to
          <a>{" "}</a>
          <a
            href={scriptAuthor.githubUrl}
            className="underline underline-offset-4 hover:text-accent"
          >
            {scriptAuthor.name}
          </a>{" "}
          for writing grading scripts used by the app.
        </p>
      </div>
    </article>
  )
}
