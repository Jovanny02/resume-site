import { VariableProximityText } from "@/components/variable-proximity-text"
import { heroText, tagLine, typographySettings } from "@/data/home-page-text"

export function HomePage() {
  return (
    <section aria-labelledby="home-title" className="text-center">
      <h1
        id="home-title"
        className="text-[clamp(2.25rem,6.5vw,6rem)] leading-[1.12] tracking-tight"
      >
        <VariableProximityText
          text={heroText}
          {...typographySettings}
          className="pt-6 sm:pt-10"
        />
        <VariableProximityText
          text={tagLine}
          {...typographySettings}
          className="text-2xl italic sm:text-3xl"
        />
      </h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        I’m a backend developer exploring new projects and technology in my free time. This is my
        personal portfolio, a place for my experience, interests, and projects.
      </p>
    </section>
  )
}
