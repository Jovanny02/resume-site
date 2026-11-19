import { EducationCard } from "@/components/education-card"
import { ExperienceCard } from "@/components/experience-card"
import { SkillsSection } from "@/components/skills-section"
import { education } from "@/data/education"
import { experience } from "@/data/experience"

export function ResumePage() {
  return (
    <section aria-labelledby="experience-title">
      <h1
        id="experience-title"
        className="mb-8 w-fit font-heading text-4xl font-bold tracking-tight after:mt-3 after:block after:h-1 after:rounded-full after:bg-accent sm:mb-10 sm:text-6xl lg:text-7xl"
      >
        Work Experience
      </h1>
      <div className="space-y-6 sm:space-y-8">
        {experience.map((entry) => (
          <ExperienceCard key={entry.id} entry={entry} />
        ))}
      </div>

      <h1
        id="education-title"
        className="mb-8 w-fit pt-16 font-heading text-4xl font-bold tracking-tight after:mt-3 after:block after:h-1 after:rounded-full after:bg-accent sm:mb-10 sm:text-6xl lg:text-7xl"
      >
        Education
      </h1>
      <div className="space-y-6 sm:space-y-8">
        {education.map((entry) => (
          <EducationCard entry={entry} />
        ))}
      </div>

      <SkillsSection />
    </section>
  )
}
