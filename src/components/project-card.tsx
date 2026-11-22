import {
  AppWindow,
  CodeXml,
  Coffee,
  Database,
  Server,
  type LucideIcon,
} from "lucide-react"

import githubIcon from "@/assets/github.svg"
import certbotIcon from "@/assets/technologies/certbot.png"
import dockerIcon from "@/assets/technologies/docker.png"
import immichIcon from "@/assets/technologies/immich.svg"
import nginxIcon from "@/assets/technologies/nginx.svg"
import noIpIcon from "@/assets/technologies/no-ip.png"
import plexIcon from "@/assets/technologies/plex.png"
import pythonIcon from "@/assets/technologies/python.svg"
import reactIcon from "@/assets/technologies/react.png"
import shadcnIcon from "@/assets/technologies/shadcn-ui.png"
import tailwindCssIcon from "@/assets/technologies/tailwind-css.svg"
import tclIcon from "@/assets/technologies/tcl.svg"
import typeScriptIcon from "@/assets/technologies/typescript.svg"
import ubuntuIcon from "@/assets/technologies/ubuntu.svg"
import viteIcon from "@/assets/technologies/vite.svg"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Project } from "@/data/projects"

const technologyIcons: Partial<Record<string, LucideIcon | string>> = {
  React: reactIcon,
  TypeScript: typeScriptIcon,
  Vite: viteIcon,
  "Tailwind CSS": tailwindCssIcon,
  "shadcn/ui": shadcnIcon,
  Java: Coffee,
  "Spring Boot": Server,
  Ubuntu: ubuntuIcon,
  "No-IP": noIpIcon,
  Certbot: certbotIcon,
  Docker: dockerIcon,
  nginx: nginxIcon,
  Immich: immichIcon,
  Plex: plexIcon,
  SQLite: Database,
  Python: pythonIcon,
  Tkinter: AppWindow,
  Tcl: tclIcon,
}

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="border border-border shadow-none sm:[--card-spacing:--spacing(6)]">
      <CardContent className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2.8fr)] sm:gap-6">
        <img
          src={project.image.src}
          alt={project.image.alt}
          width={640}
          height={360}
          loading="eager"
          className="aspect-video w-full self-start rounded-lg border border-border bg-muted object-contain"
        />

        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                {project.title}
              </h2>
            </div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub (opens in a new tab)`}
                title={`${project.title} on GitHub`}
                className={buttonVariants({
                  variant: "outline",
                  size: "icon",
                  className: "size-10 rounded-full",
                })}
              >
                <img src={githubIcon} alt="" className="size-5 dark:invert" />
              </a>
            )}
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <ul
            aria-label="Technologies"
            role="list"
            className="mt-auto flex list-none flex-wrap gap-1.5 pt-1"
          >
            {project.technologies.map((technology) => {
              const Icon = technologyIcons[technology] ?? CodeXml

              return (
                <li key={technology}>
                  <Badge variant="secondary" className="h-7 gap-1.5 px-2.5">
                    {typeof Icon === "string" ? (
                      <img
                        src={Icon}
                        alt=""
                        className="size-4 object-contain"
                      />
                    ) : (
                      <Icon aria-hidden="true" />
                    )}
                    {technology}
                  </Badge>
                </li>
              )
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
