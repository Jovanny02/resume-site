import { useLayoutEffect, useRef, useSyncExternalStore } from "react"
import type { PointerEvent } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
import type { MotionValue } from "motion/react"

import { cn } from "@/lib/utils"
import "./variable-proximity-text.css"

type Point = { x: number; y: number }

type VariableProximityTextProps = {
  text: string
  radius?: number
  /** Roboto Flex grade values range from -200 (thin) to 150 (thick). */
  baseGrade?: number
  peakGrade?: number
  /** 0–1: strength of the configured grade and color effects. */
  intensity?: number
  className?: string
}

type ProximityLetterProps = {
  character: string
  index: number
  pointer: MotionValue<Point | null>
  centers: MotionValue<Point[]>
  radius: number
  intensity: number
  baseGrade: number
  peakGrade: number
}

const interactionQuery =
  "(prefers-reduced-motion: no-preference) and (any-hover: hover) and (any-pointer: fine)"
const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" })

function subscribeToInteractionPreference(onChange: () => void) {
  const preference = window.matchMedia(interactionQuery)
  preference.addEventListener("change", onChange)
  return () => preference.removeEventListener("change", onChange)
}

function getInteractionPreference() {
  return window.matchMedia(interactionQuery).matches
}

function getServerInteractionPreference() {
  return false
}

function ProximityLetter({
  character,
  index,
  pointer,
  centers,
  radius,
  intensity,
  baseGrade,
  peakGrade,
}: ProximityLetterProps) {
  const targetInfluence = useTransform(() => {
    const position = pointer.get()
    const center = centers.get()[index]
    if (!position || !center || radius <= 0) return 0

    const distance = Math.hypot(position.x - center.x, position.y - center.y)
    const proximity = Math.max(0, 1 - distance / radius)
    // Smoothstep softens both ends of the influence radius.
    const influence = proximity * proximity * (3 - 2 * proximity)
    return influence * Math.min(1, Math.max(0, intensity))
  })
  // Smooth once so thickness and color always follow the same influence.
  const influence = useSpring(targetInfluence, {
    stiffness: 180,
    damping: 28,
    mass: 0.6,
    restDelta: 0.001,
    restSpeed: 0.01,
  })
  const grade = useTransform(
    influence,
    (value) => baseGrade + (peakGrade - baseGrade) * value
  )
  const fontVariationSettings = useMotionTemplate`"GRAD" ${grade}`
  const primaryPercentage = useTransform(influence, (value) => value * 100)
  // Resolve theme tokens in CSS, including when the theme changes in place.
  const color = useMotionTemplate`color-mix(in oklab, var(--foreground), var(--primary) ${primaryPercentage}%)`

  return (
    <motion.span
      data-proximity-letter=""
      className="inline-block"
      style={{ fontVariationSettings, color }}
    >
      {character}
    </motion.span>
  )
}

/** Decorative enhancement: compose inside a heading to retain its semantics. */
export function VariableProximityText({
  text,
  radius = 180,
  intensity = 1,
  baseGrade = 0,
  peakGrade = 150,
  className,
}: VariableProximityTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const pointer = useMotionValue<Point | null>(null)
  const centers = useMotionValue<Point[]>([])
  const restingGrade = Math.min(150, Math.max(-200, baseGrade))
  const nearCursorGrade = Math.min(150, Math.max(-200, peakGrade))
  // Subscribe through React so changing accessibility/device settings also
  // removes the animated letters, rather than only stopping their transition.
  const interactive = useSyncExternalStore(
    subscribeToInteractionPreference,
    getInteractionPreference,
    getServerInteractionPreference
  )

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container || !interactive) return

    let disposed = false
    const resetPointer = () => pointer.set(null)
    const measure = () => {
      if (disposed) return
      resetPointer()
      const bounds = container.getBoundingClientRect()
      const letters = container.querySelectorAll("[data-proximity-letter]")
      centers.set(
        Array.from(letters, (letter) => {
          const rect = letter.getBoundingClientRect()
          return {
            x: rect.left - bounds.left + rect.width / 2,
            y: rect.top - bounds.top + rect.height / 2,
          }
        })
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    // Font swaps can alter letter positions without changing container size.
    void document.fonts?.ready.then(measure)
    document.fonts?.addEventListener("loadingdone", measure)
    // Scroll changes viewport coordinates; clear any stale pointer position.
    window.addEventListener("scroll", resetPointer, true)
    window.addEventListener("blur", resetPointer)

    return () => {
      disposed = true
      observer.disconnect()
      document.fonts?.removeEventListener("loadingdone", measure)
      window.removeEventListener("scroll", resetPointer, true)
      window.removeEventListener("blur", resetPointer)
      resetPointer()
    }
  }, [text, interactive, centers, pointer])

  function handlePointerMove(event: PointerEvent<HTMLSpanElement>) {
    if (!interactive || event.pointerType === "touch") return
    // One container read per event; letter measurements stay cached.
    const bounds = event.currentTarget.getBoundingClientRect()
    pointer.set({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    })
  }

  let letterIndex = 0

  return (
    <span
      ref={containerRef}
      className={cn("variable-proximity-text block", className)}
      style={{ fontVariationSettings: `"GRAD" ${restingGrade}` }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => pointer.set(null)}
      onPointerCancel={() => pointer.set(null)}
    >
      {interactive ? (
        <>
          <span className="sr-only">{text}</span>
          <span aria-hidden="true">
            {text.split(/(\s+)/u).map((word, wordIndex) =>
              /\s/u.test(word) ? (
                word
              ) : (
                <span
                  key={wordIndex}
                  className="inline-block whitespace-nowrap"
                >
                  {Array.from(segmenter.segment(word), ({ segment }, index) => (
                    <ProximityLetter
                      key={index}
                      character={segment}
                      index={letterIndex++}
                      pointer={pointer}
                      centers={centers}
                      radius={radius}
                      intensity={intensity}
                      baseGrade={restingGrade}
                      peakGrade={nearCursorGrade}
                    />
                  ))}
                </span>
              )
            )}
          </span>
        </>
      ) : (
        text
      )}
    </span>
  )
}
