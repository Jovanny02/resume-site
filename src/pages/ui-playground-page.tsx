import { useState } from "react"

import { ThemeShowcase } from "@/components/theme-showcase"
import { VariableProximityText } from "@/components/variable-proximity-text"
import { typographyDemoText, typographySettings } from "@/data/typography-demo"

export function UIPlayGroundPage() {
  const [baseGrade, setBaseGrade] = useState(typographySettings.baseGrade)
  const [peakGrade, setPeakGrade] = useState(typographySettings.peakGrade)
  const [radius, setRadius] = useState(typographySettings.radius)

  return (
    <section aria-labelledby="playground-title">
      <h1
        id="playground-title"
        className="text-3xl font-semibold tracking-tight"
      >
        UI Playground
      </h1>
      <section aria-labelledby="typography-title" className="mt-12">
        <p className="text-sm font-medium text-muted-foreground">
          Interactive typography
        </p>
        <h2
          id="typography-title"
          className="max-w-4xl text-[clamp(2.25rem,6.5vw,6rem)] leading-[1.12] tracking-tight"
        >
          <VariableProximityText
            text={typographyDemoText}
            baseGrade={baseGrade}
            peakGrade={peakGrade}
            radius={radius}
            className="py-10 sm:py-14"
          />
        </h2>
        <p className="max-w-xl leading-relaxed text-muted-foreground">
          Move your cursor near the letters to gently thicken their strokes.
          Touch devices and reduced-motion settings show the static version.
        </p>
        <fieldset className="mt-8">
          <legend className="text-sm font-medium">Typography controls</legend>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            For a stronger contrast, lower the resting thickness and keep the
            near-cursor thickness high. Move back over the text to compare.
            Values above 150 render at this font’s maximum thickness of 150.
          </p>
          <div className="mt-5 grid gap-6 sm:grid-cols-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 text-sm">
                <label htmlFor="typography-base-grade">Resting thickness</label>
                <output
                  htmlFor="typography-base-grade"
                  className="tabular-nums"
                >
                  {baseGrade}
                </output>
              </div>
              <input
                id="typography-base-grade"
                type="range"
                min={-200}
                max={150}
                step={10}
                value={baseGrade}
                onChange={(event) =>
                  setBaseGrade(event.currentTarget.valueAsNumber)
                }
                className="min-h-6 w-full cursor-pointer accent-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 text-sm">
                <label htmlFor="typography-peak-grade">
                  Near-cursor thickness
                </label>
                <output
                  htmlFor="typography-peak-grade"
                  className="tabular-nums"
                >
                  {peakGrade}
                </output>
              </div>
              <input
                id="typography-peak-grade"
                type="range"
                min={-200}
                max={500}
                step={10}
                value={peakGrade}
                onChange={(event) =>
                  setPeakGrade(event.currentTarget.valueAsNumber)
                }
                className="min-h-6 w-full cursor-pointer accent-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 text-sm">
                <label htmlFor="typography-radius">Influence radius</label>
                <output htmlFor="typography-radius" className="tabular-nums">
                  {radius} px
                </output>
              </div>
              <input
                id="typography-radius"
                type="range"
                min={60}
                max={400}
                step={10}
                value={radius}
                onChange={(event) =>
                  setRadius(event.currentTarget.valueAsNumber)
                }
                className="min-h-6 w-full cursor-pointer accent-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              />
            </div>
          </div>
        </fieldset>
      </section>
      <ThemeShowcase />
    </section>
  )
}
