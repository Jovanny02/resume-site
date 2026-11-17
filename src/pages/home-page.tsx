import { VariableProximityText } from "@/components/variable-proximity-text"
import { typographyDemoText, typographySettings } from "@/data/typography-demo"

export function HomePage() {
  return (
    <section aria-labelledby="home-title">
      <h1
        id="home-title"
        className="max-w-4xl text-[clamp(2.25rem,6.5vw,6rem)] leading-[1.12] tracking-tight"
      >
        <VariableProximityText
          text={typographyDemoText}
          {...typographySettings}
          className="py-6 sm:py-10"
        />
      </h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
        I’m a backend developer exploring new projects and technology in my free time. This is my
        personal portfolio, a place for my experience, interests, and projects.
      </p>
    </section>
  )
}
