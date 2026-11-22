import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

type Screenshot = {
  src: string
  alt: string
  caption: string
}

type ProjectImageCarouselProps = {
  screenshots: readonly Screenshot[]
}

export function ProjectImageCarousel({
  screenshots,
}: ProjectImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const screenshot = screenshots[activeIndex]

  if (!screenshot) return null

  function changeScreenshot(offset: number) {
    setActiveIndex(
      (index) => (index + offset + screenshots.length) % screenshots.length
    )
  }

  return (
    <section aria-label="Project screenshots" aria-roledescription="carousel">
      <figure className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="relative aspect-video bg-muted">
          <img
            src={screenshot.src}
            alt={screenshot.alt}
            className="absolute inset-0 size-full object-contain"
          />
        </div>
        <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-border bg-secondary px-3 py-3 text-secondary-foreground sm:px-4">
          <p
            role="status"
            aria-atomic="true"
            className="flex flex-wrap items-baseline gap-x-2 text-sm"
          >
            <span className="font-semibold">{screenshot.caption}</span>
            <span className="text-xs tabular-nums">
              <span className="sr-only">Screenshot </span>
              {activeIndex + 1} of {screenshots.length}
            </span>
          </p>
          {screenshots.length > 1 && (
            <div className="flex gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="size-11 motion-reduce:transition-none"
                aria-label="Previous screenshot"
                onClick={() => changeScreenshot(-1)}
              >
                <ChevronLeft aria-hidden="true" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="size-11 motion-reduce:transition-none"
                aria-label="Next screenshot"
                onClick={() => changeScreenshot(1)}
              >
                <ChevronRight aria-hidden="true" />
              </Button>
            </div>
          )}
        </figcaption>
      </figure>
    </section>
  )
}
