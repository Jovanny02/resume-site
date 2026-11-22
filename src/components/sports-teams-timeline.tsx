import { useTheme } from "@/components/theme-provider"
import type { SportsMilestone } from "@/data/about-page-text"

type SportsTeamsTimelineProps = {
  milestones: readonly SportsMilestone[]
}

export function SportsTeamsTimeline({ milestones }: SportsTeamsTimelineProps) {
  const { resolvedTheme } = useTheme()

  if (milestones.length === 0) return null

  const chronologicalMilestones = milestones.toSorted(
    (first, second) => first.year - second.year
  )

  return (
    <ol
      aria-label="Sports fandom timeline"
      role="list"
      tabIndex={0}
      className="mt-5 flex list-none overflow-x-auto rounded-md pt-1 pb-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
    >
      {chronologicalMilestones.map(({ year, description, teams }) => (
        <li key={year} className="group min-w-48 flex-1 basis-48 text-center">
          <time
            dateTime={String(year)}
            className="text-sm font-semibold tabular-nums"
          >
            {year}
          </time>
          <div
            aria-hidden="true"
            className="relative my-3 flex items-center justify-center before:absolute before:inset-x-0 before:h-0.5 before:bg-border group-first:before:left-1/2 group-last:before:right-1/2"
          >
            <span className="relative size-3 rounded-full bg-accent" />
          </div>
          <div className="px-3">
            <div className="flex justify-center gap-2">
              {teams.map(({ name, logo, darkLogo }) => {
                const logoFile =
                  resolvedTheme === "dark" && darkLogo ? darkLogo : logo

                return (
                  <img
                    key={name}
                    src={`${import.meta.env.BASE_URL}team-logos/${logoFile}`}
                    alt=""
                    width={44}
                    height={44}
                    className="size-11 object-contain"
                  />
                )
              })}
            </div>
            <h3 className="mt-2 font-heading text-base leading-snug font-semibold">
              {teams.map(({ name }) => name).join(" and ")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
