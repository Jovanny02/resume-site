import { cn } from "cn"
import { ZoomInIcon } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { DogPhoto } from "@/data/about-page-text"

type DogPhotoCollageProps = {
  photos: readonly DogPhoto[]
}

export function DogPhotoCollage({ photos }: DogPhotoCollageProps) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 md:auto-rows-[clamp(12rem,24vw,20rem)] md:grid-cols-3">
      {photos.map(
        ({ src, title, alt, width, height, thumbnailPosition }, index) => {
          const featured = index === 0 && photos.length > 1
          const tallPortrait = !featured && height > width * 2

          return (
            <Card
              key={src}
              className={cn(
                "py-0",
                featured && "md:col-span-2",
                tallPortrait && "md:row-span-2"
              )}
            >
              <Dialog>
                <DialogTrigger
                  aria-label={`View photo: ${title}`}
                  className={cn(
                    "relative block aspect-4/3 w-full cursor-zoom-in focus-visible:outline-none focus-visible:after:pointer-events-none focus-visible:after:absolute focus-visible:after:inset-1.5 focus-visible:after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-background md:aspect-auto md:h-full",
                    tallPortrait && "max-sm:aspect-square"
                  )}
                >
                  <img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: thumbnailPosition }}
                    className="absolute inset-0 size-full object-cover"
                  />
                  <span className="absolute right-3 bottom-3 rounded-full bg-card p-2 text-card-foreground shadow-sm">
                    <ZoomInIcon aria-hidden="true" className="size-4" />
                  </span>
                </DialogTrigger>
                <DialogContent
                  aria-label={title}
                  className="p-4 motion-reduce:animate-none sm:max-w-3xl"
                >
                  <img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="mx-auto h-auto max-h-[calc(100dvh-7rem)] w-auto max-w-full rounded-lg object-contain"
                  />
                </DialogContent>
              </Dialog>
            </Card>
          )
        }
      )}
    </div>
  )
}
