import { render } from "@testing-library/react"
import { afterEach, beforeEach, expect, it } from "vitest"

import { ThemeProvider } from "@/components/theme-provider"

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove("dark", "light")
})

afterEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove("dark", "light")
})

it("defaults to dark with no saved preference", () => {
  render(
    <ThemeProvider>
      <p>Theme preview</p>
    </ThemeProvider>
  )
  expect(document.documentElement).toHaveClass("dark")
})

it("respects an explicitly saved light preference", () => {
  localStorage.setItem("theme", "light")
  render(
    <ThemeProvider>
      <p>Theme preview</p>
    </ThemeProvider>
  )
  expect(document.documentElement).toHaveClass("light")
  expect(document.documentElement).not.toHaveClass("dark")
})

it("falls back to dark for an invalid stored preference", () => {
  localStorage.setItem("theme", "invalid")
  render(
    <ThemeProvider>
      <p>Theme preview</p>
    </ThemeProvider>
  )
  expect(document.documentElement).toHaveClass("dark")
})
