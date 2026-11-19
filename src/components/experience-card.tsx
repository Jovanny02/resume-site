import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { ExperienceEntry } from "@/data/experience"

type ExperienceCardProps = {
  entry: ExperienceEntry
}

export function ExperienceCard({ entry }: ExperienceCardProps) {
  return (
    <Card className="border border-t-4 border-border border-t-accent/60 sm:[--card-spacing:--spacing(8)]">
      <CardHeader className="flex flex-col gap-3 md:flex-row md:justify-between">
        <div className="space-y-1">
          <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
            {entry.role}
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            {entry.company}
          </p>
        </div>
        <p className="font-mono text-sm tracking-wide text-muted-foreground uppercase md:shrink-0">
          {entry.dateRange}
        </p>
      </CardHeader>
      <CardContent>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed sm:text-base">
          {entry.accomplishments.map((accomplishment) => (
            <li key={accomplishment}>{accomplishment}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
