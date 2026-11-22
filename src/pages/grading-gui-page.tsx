import { Link } from "react-router"

import { gradingGuiProject } from "@/data/projects"

export function GradingGuiPage() {
  return (
    <section aria-labelledby="project-title" className="max-w-3xl">
      <Link to="/projects" className="text-sm underline underline-offset-4">
        Back to all projects
      </Link>
      <h1
        id="project-title"
        className="mt-6 font-heading text-4xl font-bold tracking-tight sm:text-6xl"
      >
        {gradingGuiProject.title}
      </h1>
      <p className="mt-4 text-muted-foreground">Project details coming soon.</p>
    </section>
  )
}
