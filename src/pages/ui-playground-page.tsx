import { NavLink } from "react-router"

import { ThemeShowcase } from "@/components/theme-showcase"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { navigationItems, projectLinks } from "@/data/navigation"

const previewLinks = [...navigationItems, ...projectLinks]

const underlinePreviews = [
  {
    name: "Wave",
    description: "The straight underline turns into a squiggle.",
    underline:
      "underline decoration-accent underline-offset-4 group-hover:decoration-wavy group-focus-visible:decoration-wavy",
  },
  {
    name: "Double line",
    description: "A second line drops beneath the first.",
    underline:
      "relative underline decoration-accent underline-offset-4 after:absolute after:inset-x-0 after:top-full after:h-px after:bg-accent after:opacity-0 motion-safe:after:transition-[translate,opacity] motion-safe:after:duration-200 group-hover:after:translate-y-1 group-hover:after:opacity-100 group-focus-visible:after:translate-y-1 group-focus-visible:after:opacity-100",
  },
  {
    name: "Sweep",
    description: "A thicker underline sweeps in from left to right.",
    underline:
      "relative before:absolute before:inset-x-0 before:top-full before:h-px before:bg-accent after:absolute after:inset-x-0 after:top-full after:h-0.5 after:origin-left after:scale-x-0 after:bg-current motion-safe:after:transition-transform motion-safe:after:duration-250 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100",
  },
] as const

export function UIPlayGroundPage() {
  return (
    <section aria-labelledby="playground-title">
      <h1
        id="playground-title"
        className="text-3xl font-semibold tracking-tight"
      >
        UI Playground
      </h1>
      <section
        aria-labelledby="underline-preview-title"
        className="mt-8 space-y-4"
      >
        <div>
          <h2 id="underline-preview-title" className="text-xl font-semibold">
            Navigation underline effects
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Hover over an icon or label, or Tab to a link, to compare the
            effects.
          </p>
        </div>
        {underlinePreviews.map(({ name, description, underline }) => (
          <Card key={name} size="sm">
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <nav aria-label={`${name} underline preview`}>
                <ul className="flex flex-wrap gap-x-2 gap-y-1 sm:gap-x-4">
                  {previewLinks.map(({ label, to, icon: Icon }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        end
                        className="group inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:font-bold"
                      >
                        <Icon className="size-4 shrink-0" aria-hidden="true" />
                        <span className={underline}>{label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </CardContent>
          </Card>
        ))}
      </section>
      <ThemeShowcase />
    </section>
  )
}
