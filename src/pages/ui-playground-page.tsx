import { ThemeShowcase } from "@/components/theme-showcase";

export function UIPlayGroundPage() {
  return (
    <section aria-labelledby="about-title">
      <h1 id="about-title" className="text-3xl font-semibold tracking-tight">
        UI Playground
      </h1>
      <ThemeShowcase/>
    </section>
  )
}
