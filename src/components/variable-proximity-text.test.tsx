import { StrictMode } from "react"
import {
  act,
  fireEvent,
  isInaccessible,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { VariableProximityText } from "@/components/variable-proximity-text"
import { HomePage } from "@/pages/home-page"

let reducedMotion = false
let hoverPointer = true
let secondLetterX = 290
const preferences = new Map<
  string,
  { media: MediaQueryList; notify: () => void }
>()
const observers: {
  resize: () => void
  disconnect: ReturnType<typeof vi.fn>
}[] = []

function matchMedia(query: string) {
  let preference = preferences.get(query)
  if (!preference) {
    const listeners = new Set<() => void>()
    const media = {
      media: query,
      get matches() {
        return query.includes("no-preference")
          ? !reducedMotion && hoverPointer
          : reducedMotion
      },
      addEventListener: (_: string, listener: () => void) =>
        listeners.add(listener),
      removeEventListener: (_: string, listener: () => void) =>
        listeners.delete(listener),
      // Motion also checks the platform preference internally.
      addListener: (listener: () => void) => listeners.add(listener),
      removeListener: (listener: () => void) => listeners.delete(listener),
    } as unknown as MediaQueryList
    preference = {
      media,
      notify: () => listeners.forEach((listener) => listener()),
    }
    preferences.set(query, preference)
  }
  return preference.media
}

function renderSample() {
  const result = render(
    <StrictMode>
      <h2>
        <VariableProximityText text="A B" radius={120} peakGrade={150} />
      </h2>
      <p>Below the heading</p>
    </StrictMode>
  )
  const heading = screen.getByRole("heading", { name: "A B" })
  return { ...result, heading }
}

function strokeOf(letter: HTMLElement) {
  return parseFloat(letter.style.webkitTextStrokeWidth) || 0
}

function gradeOf(letter: HTMLElement) {
  return Number(letter.style.fontVariationSettings.replace('"GRAD" ', ""))
}

beforeEach(() => {
  reducedMotion = false
  hoverPointer = true
  secondLetterX = 290
  preferences.clear()
  observers.length = 0
  vi.stubGlobal("matchMedia", vi.fn(matchMedia))
  // jsdom has no PointerEvent constructor, but React needs its coordinates.
  vi.stubGlobal(
    "PointerEvent",
    class extends MouseEvent {
      pointerType: string
      constructor(type: string, options: PointerEventInit = {}) {
        super(type, options)
        this.pointerType = options.pointerType ?? "mouse"
      }
    }
  )
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(resize: () => void) {
        observers.push({ resize, disconnect: this.disconnect })
      }
      observe() {}
      disconnect = vi.fn()
    }
  )
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      if (this.hasAttribute("data-proximity-letter")) {
        const x = this.firstChild?.textContent === "A" ? 30 : secondLetterX
        return new DOMRect(x, 40, 20, 20)
      }
      return new DOMRect(0, 0, 400, 100)
    }
  )
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe("variable proximity text", () => {
  it.each([false, true])(
    "preserves explicit line breaks with reduced motion %s",
    (reduced) => {
      reducedMotion = reduced
      render(
        <h2>
          <VariableProximityText text={"First.\nSecond."} />
        </h2>
      )
      const heading = screen.getByRole("heading", {
        name: /First\.\s+Second\./,
      })
      const container = heading.firstElementChild
      expect(container).toHaveClass("whitespace-pre-line")
      expect(container?.textContent).toContain("First.\nSecond.")
    }
  )

  it("exposes the complete heading once and adds no keyboard stops", () => {
    const { heading } = renderSample()
    expect(heading).toHaveAccessibleName("A B")
    expect(isInaccessible(within(heading).getByText("A"))).toBe(true)
    expect(isInaccessible(within(heading).getByText("A B"))).toBe(false)
    // aria-hidden hides the visual letters from assistive technology,
    // while leaving them visually present. None is an interactive control.
    expect(within(heading).queryByRole("button")).not.toBeInTheDocument()
    expect(within(heading).getByText("A")).not.toHaveAttribute("tabindex")
  })

  it("thickens nearby letters, follows distance, and returns after leaving the window", async () => {
    const { heading } = renderSample()
    const a = within(heading).getByText("A")
    const b = within(heading).getByText("B")

    // Outside A's bounds, but inside its influence radius.
    fireEvent.pointerMove(a, { clientX: 70, clientY: 50, pointerType: "mouse" })
    await waitFor(() => expect(strokeOf(a)).toBeGreaterThan(0.01))
    expect(strokeOf(b)).toBe(0)

    fireEvent.pointerMove(b, {
      clientX: 300,
      clientY: 50,
      pointerType: "mouse",
    })
    await waitFor(
      () => {
        expect(strokeOf(b)).toBeGreaterThan(0.015)
        expect(strokeOf(a)).toBeLessThan(0.0002)
      },
      { timeout: 3000 }
    )

    fireEvent.pointerOut(b, { relatedTarget: null, pointerType: "mouse" })
    await waitFor(() => expect(strokeOf(b)).toBeLessThan(0.0002), {
      timeout: 3000,
    })
  })

  it("responds to a pointer outside the heading and returns to rest beyond the radius", async () => {
    const { heading } = renderSample()
    const a = within(heading).getByText("A")
    const paragraph = screen.getByText("Below the heading")
    fireEvent.pointerOut(a, { relatedTarget: paragraph, pointerType: "mouse" })
    fireEvent.pointerMove(paragraph, {
      clientX: 40,
      clientY: 110,
      pointerType: "mouse",
    })
    await waitFor(() => expect(strokeOf(a)).toBeGreaterThan(0.008))
    fireEvent.pointerMove(paragraph, {
      clientX: 40,
      clientY: 300,
      pointerType: "mouse",
    })
    await waitFor(() => expect(strokeOf(a)).toBeLessThan(0.0002), {
      timeout: 3000,
    })
  })

  it("follows horizontal distance regardless of pointer height when enabled", async () => {
    const sample = (horizontalOnly: boolean) => (
      <h2>
        <VariableProximityText
          text="A B"
          radius={120}
          peakGrade={150}
          effects={{ horizontalOnly }}
        />
      </h2>
    )
    const { rerender } = render(sample(true))
    const heading = screen.getByRole("heading", { name: "A B" })
    const a = within(heading).getByText("A")
    const b = within(heading).getByText("B")

    fireEvent.pointerMove(heading, { clientX: 40, clientY: 500 })
    await waitFor(() => expect(strokeOf(a)).toBeGreaterThan(0.015))
    expect(strokeOf(b)).toBe(0)

    fireEvent.pointerMove(heading, { clientX: 300, clientY: 500 })
    await waitFor(
      () => {
        expect(strokeOf(a)).toBeLessThan(0.0002)
        expect(strokeOf(b)).toBeGreaterThan(0.015)
      },
      { timeout: 3000 }
    )

    rerender(sample(false))
    await waitFor(() => expect(strokeOf(b)).toBeLessThan(0.0002), {
      timeout: 3000,
    })
  })

  it("reveals color on the home page when the pointer is far below the heading", async () => {
    render(<HomePage />)
    const heading = screen.getByRole("heading", {
      name: /Hi, I'm Jovanny!\s+Backend Software Engineer\.\s*Writing tomorrow’s legacy code today\./,
    })
    const paintLayer = { selector: "[data-proximity-letter] > span" }
    const headlineColor = within(heading).getByText("H", paintLayer)
    const taglineColor = within(heading).getByText("W", paintLayer)
    expect(headlineColor.style.clipPath).toContain("125%")
    expect(taglineColor.style.clipPath).toContain("125%")

    fireEvent.pointerMove(window, { clientX: 300, clientY: 800 })
    await waitFor(() => {
      expect(parseFloat(headlineColor.style.clipPath.slice(6))).toBeLessThan(50)
      expect(parseFloat(taglineColor.style.clipPath.slice(6))).toBeLessThan(50)
    })
  })

  it("remeasures letters when the text container resizes", async () => {
    const { heading } = renderSample()
    const b = within(heading).getByText("B")
    secondLetterX = 60
    act(() => observers.at(-1)?.resize())
    fireEvent.pointerMove(b, { clientX: 70, clientY: 50, pointerType: "mouse" })
    await waitFor(() => expect(strokeOf(b)).toBeGreaterThan(0.015))
  })

  it("animates stroke width while keeping the glyph grade fixed", async () => {
    render(
      <h2>
        <VariableProximityText
          text="A B"
          radius={120}
          baseGrade={-200}
          peakGrade={150}
        />
      </h2>
    )
    const letter = within(
      screen.getByRole("heading", { name: "A B" })
    ).getByText("A")
    expect(gradeOf(letter)).toBe(-200)
    fireEvent.pointerMove(letter, {
      clientX: 40,
      clientY: 50,
      pointerType: "mouse",
    })
    await waitFor(() =>
      expect(parseFloat(letter.style.webkitTextStrokeWidth)).toBeGreaterThan(
        0.03
      )
    )
    expect(gradeOf(letter)).toBe(-200)
  })

  it("brings in more color at the same distance without changing stroke width", async () => {
    const sample = (earlyColor: boolean) => (
      <h2>
        <VariableProximityText
          text="A B"
          radius={120}
          peakGrade={150}
          effects={{ earlyColor }}
        />
      </h2>
    )
    const { rerender } = render(sample(false))
    const letter = within(
      screen.getByRole("heading", { name: "A B" })
    ).getByText("A")
    const primaryPercentage = () =>
      Number(letter.style.color.match(/([\d.]+)%\)$/)?.[1])

    fireEvent.pointerMove(letter, { clientX: 100, clientY: 50 })
    await waitFor(() => expect(primaryPercentage()).toBeCloseTo(50, 0))

    rerender(sample(true))
    await waitFor(() => expect(primaryPercentage()).toBeCloseTo(75, 0))
    expect(strokeOf(letter)).toBeCloseTo(0.009, 3)
  })

  it("keeps tracking a stationary pointer when letters are remeasured", async () => {
    const { heading } = renderSample()
    const a = within(heading).getByText("A")
    const b = within(heading).getByText("B")
    fireEvent.pointerMove(a, { clientX: 70, clientY: 50, pointerType: "mouse" })
    await waitFor(() => expect(strokeOf(a)).toBeGreaterThan(0.01))

    secondLetterX = 60
    act(() => observers.at(-1)?.resize())
    await waitFor(() => expect(strokeOf(b)).toBeGreaterThan(0.015))
    expect(strokeOf(a)).toBeGreaterThan(0.01)
  })

  it("applies edited thickness and radius settings without another pointer move", async () => {
    const sample = (baseGrade: number, peakGrade: number, radius: number) => (
      <h2>
        <VariableProximityText
          text="A B"
          baseGrade={baseGrade}
          peakGrade={peakGrade}
          radius={radius}
        />
      </h2>
    )
    const { rerender } = render(sample(-200, 150, 120))
    const heading = screen.getByRole("heading", { name: "A B" })
    const a = within(heading).getByText("A")
    const b = within(heading).getByText("B")

    expect(gradeOf(a)).toBe(-200)
    fireEvent.pointerMove(a, { clientX: 70, clientY: 50, pointerType: "mouse" })
    await waitFor(() => expect(strokeOf(a)).toBeGreaterThan(0.03))
    expect(strokeOf(b)).toBe(0)

    rerender(sample(-100, 50, 120))
    await waitFor(() => {
      expect(strokeOf(a)).toBeGreaterThan(0.013)
      expect(strokeOf(a)).toBeLessThan(0.017)
      expect(strokeOf(b)).toBeCloseTo(0, 3)
    })

    rerender(sample(-100, 50, 20))
    await waitFor(() => expect(strokeOf(a)).toBeCloseTo(0, 3), {
      timeout: 3000,
    })
  })

  it("ignores touch input even on a device with an attached mouse", async () => {
    const { heading } = renderSample()
    const a = within(heading).getByText("A")
    fireEvent.pointerMove(a, { clientX: 40, clientY: 50, pointerType: "touch" })
    // Allow a frame to pass so this also catches incorrectly scheduled motion.
    await act(() => new Promise((resolve) => setTimeout(resolve, 80)))
    expect(strokeOf(a)).toBe(0)
  })

  it.each(["reduced motion", "touch-only input"])(
    "renders plain readable text with %s",
    (preference) => {
      reducedMotion = preference === "reduced motion"
      hoverPointer = preference !== "touch-only input"
      const { heading } = renderSample()
      expect(heading).toHaveTextContent(/^A B$/)
      expect(
        within(heading).queryByText("A", { exact: true })
      ).not.toBeInTheDocument()
      expect(observers).toHaveLength(0)
    }
  )

  it("switches to plain text immediately when reduced motion is enabled", async () => {
    const { heading } = renderSample()
    const a = within(heading).getByText("A")
    fireEvent.pointerMove(a, { clientX: 40, clientY: 50, pointerType: "mouse" })
    await waitFor(() => expect(strokeOf(a)).toBeGreaterThan(0.015))

    act(() => {
      reducedMotion = true
      preferences.forEach(({ notify }) => notify())
    })
    expect(heading).toHaveTextContent(/^A B$/)
    expect(
      within(heading).queryByText("A", { exact: true })
    ).not.toBeInTheDocument()
    expect(
      observers.every(({ disconnect }) => disconnect.mock.calls.length > 0)
    ).toBe(true)
  })

  it("disconnects measurements on unmount, including under StrictMode", () => {
    const { unmount } = renderSample()
    unmount()
    expect(observers.length).toBeGreaterThan(0)
    expect(
      observers.every(({ disconnect }) => disconnect.mock.calls.length === 1)
    ).toBe(true)
    // A queued font-load/resize callback should be harmless after unmount.
    expect(() => observers.forEach(({ resize }) => resize())).not.toThrow()
  })
})
