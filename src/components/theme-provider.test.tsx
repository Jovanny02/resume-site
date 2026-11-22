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

it.each<[string | null, string]>([
  [null, "light"],
  ["light", "light"],
  ["dark", "dark"],
  ["system", "light"],
  ["invalid", "light"],
])("applies stored preference %s as %s", (stored, expected) => {
  if (stored !== null) localStorage.setItem("theme", stored)
  render(
    <ThemeProvider>
      <p>Theme preview</p>
    </ThemeProvider>
  )
  expect(document.documentElement).toHaveClass(expected)
  expect(document.documentElement).not.toHaveClass(
    expected === "light" ? "dark" : "light"
  )
})
