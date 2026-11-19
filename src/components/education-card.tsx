import { Card, CardHeader } from "@/components/ui/card"
import type { EducationEntry } from "@/data/education"

type EducationCardProps = {
  entry: EducationEntry
}

export function EducationCard({ entry }: EducationCardProps) {
  return (
    <Card className="border border-t-4 border-border border-t-accent/60 sm:[--card-spacing:--spacing(8)]">
      <CardHeader className="flex flex-col gap-3 md:flex-row md:justify-between">
        <div className="space-y-1">
          <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
            {entry.degree}
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            {entry.university}
          </p>
        </div>
        <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase md:shrink-0">
          {entry.dateRange}
        </p>
      </CardHeader>
    </Card>
  )
}
