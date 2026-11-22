import { useLayoutEffect, useRef, useSyncExternalStore } from "react"
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

type ProximityEffects = {
  earlyColor?: boolean
  colorReveal?: boolean
  horizontalOnly?: boolean
}

type VariableProximityTextProps = {
  text: string
  radius?: number
  /** Roboto Flex grade values range from -200 (thin) to 150 (thick). */
  baseGrade?: number
  peakGrade?: number
  /** 0–1: strength of the configured thickness and color effects. */
  intensity?: number
  effects?: ProximityEffects
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
  effects?: ProximityEffects
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
  effects,
}: ProximityLetterProps) {
  const targetInfluence = useTransform(() => {
    const position = pointer.get()
    const center = centers.get()[index]
    if (!position || !center || radius <= 0) return 0

    const deltaX = position.x - center.x
    const distance = effects?.horizontalOnly
      ? Math.abs(deltaX)
      : Math.hypot(deltaX, position.y - center.y)
    const proximity = Math.max(0, 1 - distance / radius)
    // Smoothstep softens both ends of the influence radius.
    const influence = proximity * proximity * (3 - 2 * proximity)
    return influence * Math.min(1, Math.max(0, intensity))
  })
  const influence = useSpring(targetInfluence, {
    stiffness: 180,
    damping: 40,
    mass: 0.6,
    restDelta: 0.001,
    restSpeed: 0.01,
  })
  const grade = useTransform(
    influence,
    (value) => baseGrade + (peakGrade - baseGrade) * value
  )
  // Start with the thinner endpoint so stroke widths never need to be negative.
  const fixedGrade = Math.min(baseGrade, peakGrade)
  const strokeWidth = useTransform(
    grade,
    (value) => (value - fixedGrade) * 0.00012
  )
  const textStrokeWidth = useMotionTemplate`${strokeWidth}em`
  const colorProgress = useTransform(influence, (value) =>
    effects?.earlyColor ? value * (2 - value) : value
  )
  const primaryPercentage = useTransform(colorProgress, (value) => value * 100)
  // Resolve theme tokens in CSS, including when the theme changes in place.
  const color = useMotionTemplate`color-mix(in oklab, var(--foreground), var(--primary) ${primaryPercentage}%)`
  // Extend the clip beyond the letter box to accommodate strokes and italics.
  const revealTop = useTransform(colorProgress, (value) => 125 - value * 150)
  const revealClip = useMotionTemplate`inset(${revealTop}% -0.25em -25%)`

  return (
    <motion.span
      data-proximity-letter=""
      className="relative inline-block"
      style={{
        fontVariationSettings: `"GRAD" ${fixedGrade}`,
        WebkitTextStrokeWidth: textStrokeWidth,
        WebkitTextStrokeColor: "currentColor",
        color: effects?.colorReveal ? "var(--foreground)" : color,
      }}
    >
      {character}
      {effects?.colorReveal && (
        <motion.span
          className="pointer-events-none absolute inset-0 select-none"
          style={{
            clipPath: revealClip,
            color: "var(--primary)",
            WebkitTextStrokeColor: "currentColor",
          }}
        >
          {character}
        </motion.span>
      )}
    </motion.span>
  )
}

/** Decorative enhancement: compose inside a heading to retain its semantics. */
export function VariableProximityText({
  text,
  radius = 180,
  intensity = 1,
  baseGrade = 0,
  peakGrade = 25,
  effects,
  className,
}: VariableProximityTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const pointerViewport = useRef<Point | null>(null)
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
    const resetPointer = () => {
      pointerViewport.current = null
      pointer.set(null)
    }
    const measure = () => {
      if (disposed) return
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
      if (pointerViewport.current) {
        pointer.set({
          x: pointerViewport.current.x - bounds.left,
          y: pointerViewport.current.y - bounds.top,
        })
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return
      const bounds = container.getBoundingClientRect()
      pointerViewport.current = { x: event.clientX, y: event.clientY }
      pointer.set({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      })
    }
    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) resetPointer()
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    // Font swaps can alter letter positions without changing container size.
    void document.fonts?.ready.then(measure)
    document.fonts?.addEventListener("loadingdone", measure)
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerout", handlePointerOut)
    window.addEventListener("pointercancel", resetPointer)
    // Scroll can move the heading while the pointer remains stationary.
    window.addEventListener("scroll", measure, true)
    window.addEventListener("blur", resetPointer)

    return () => {
      disposed = true
      observer.disconnect()
      document.fonts?.removeEventListener("loadingdone", measure)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerout", handlePointerOut)
      window.removeEventListener("pointercancel", resetPointer)
      window.removeEventListener("scroll", measure, true)
      window.removeEventListener("blur", resetPointer)
      resetPointer()
    }
  }, [text, interactive, centers, pointer])

  let letterIndex = 0

  return (
    <span
      ref={containerRef}
      className={cn(
        "variable-proximity-text block whitespace-pre-line",
        className
      )}
      style={{ fontVariationSettings: `"GRAD" ${restingGrade}` }}
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
                      effects={effects}
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
