import { Card, CardContent } from "@/components/ui/card"
import { skillGroups } from "@/data/skills"

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-title" className="mt-16">
      <h2
        id="skills-title"
        className="mb-8 w-fit font-heading text-4xl font-bold tracking-tight after:mt-3 after:block after:h-1 after:rounded-full after:bg-accent sm:mb-10 sm:text-6xl lg:text-7xl"
      >
        Skills
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {skillGroups.map(({ title, skills }) => (
          <Card
            key={title}
            size="sm"
            className="border border-t-4 border-border border-t-accent/60"
          >
            <CardContent>
              <h3 className="mb-4 font-heading text-lg font-semibold tracking-tight sm:text-xl">
                {title}
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
