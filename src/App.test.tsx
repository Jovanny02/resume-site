import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import App from "@/App"
import { ThemeProvider } from "@/components/theme-provider"

const title = /Hi, I'm Jovanny!\s+Backend Software Engineer\./

beforeEach(() => {
  vi.stubGlobal("matchMedia", (query: string) => ({
    media: query,
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  }))
})

afterEach(() => vi.unstubAllGlobals())

function renderApp(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MemoryRouter>
  )
}

describe("portfolio navigation", () => {
  it("toggles between light and dark themes", async () => {
    localStorage.setItem("theme", "dark")
    const user = userEvent.setup()
    renderApp()
    const button = screen.getByRole("button", { name: "Switch to light theme" })

    await user.click(button)
    expect(document.documentElement).toHaveClass("light")
    expect(localStorage.getItem("theme")).toBe("light")
    expect(button).toHaveAccessibleName("Switch to dark theme")

    await user.click(button)
    expect(document.documentElement).toHaveClass("dark")
    expect(localStorage.getItem("theme")).toBe("dark")
    expect(button).toHaveAccessibleName("Switch to light theme")
  })

  it.each([
    ["/", title],
    ["/resume", "Work Experience"],
    ["/about", "About"],
    ["/projects", "Projects"],
    ["/missing", "Page not found"],
  ])("renders %s directly", (path, heading) => {
    renderApp(path)
    expect(
      screen.getByRole("heading", { level: 1, name: heading })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("navigation", { name: "Main navigation" })
    ).toBeInTheDocument()
  })

  it("shows the About introduction and portrait", () => {
    renderApp("/about")

    const about = screen.getByRole("region", { name: "About" })
    expect(within(about).getByText(/I’m Jovanny Vera/)).toBeVisible()
    expect(
      within(about).getByRole("img", { name: "Portrait of Jovanny Vera" })
    ).toBeVisible()
  })

  it("credits the author next to each top book", () => {
    renderApp("/about")

    const topBooks = screen.getByRole("region", { name: "Top Books" })
    const entries = within(topBooks).getAllByRole("listitem")

    expect(entries.map((entry) => entry.textContent)).toEqual([
      "The Art of Racing in the Rain by Garth Stein",
      "Dune by Frank Herbert",
      "The Martian by Andy Weir",
      "Artemis by Andy Weir",
      "The Boy and the Dog by Seishu Hase",
    ])
  })

  it("offers a PDF download on the resume page", () => {
    renderApp("/resume")

    const link = screen.getByRole("link", { name: "Download resume (PDF)" })

    expect(link).toHaveAttribute("href", "/Resume.pdf")
    expect(link).toHaveAttribute("download", "Jovanny-Vera-Resume.pdf")
  })

  it("navigates between pages and marks the active link", async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole("link", { name: "Resume" }))
    expect(
      screen.getByRole("heading", { name: "Work Experience" })
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute(
      "aria-current",
      "page"
    )
    await user.click(screen.getByRole("link", { name: "Home" }))
    expect(
      screen.getByRole("heading", {
        name: title,
      })
    ).toBeInTheDocument()
  })

  it("opens Projects with the keyboard and follows its overview link", async () => {
    const user = userEvent.setup()
    renderApp()
    const trigger = screen.getByRole("button", { name: "Projects" })
    trigger.focus()
    await user.keyboard("{Enter}")
    const link = await screen.findByRole("link", { name: "All projects" })
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    await user.click(link)
    expect(
      screen.getByRole("heading", { name: "Projects" })
    ).toBeInTheDocument()
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })
})

describe("site footer", () => {
  it.each(["/", "/about"])("renders contact links on %s", (path) => {
    renderApp(path)
    const footer = within(screen.getByRole("contentinfo"))

    expect(footer.getByText("Jovanny Vera")).toBeInTheDocument()
    expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/Jovanny02"
    )
    expect(footer.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/jovanny-vera/"
    )
    expect(footer.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:jovannyvera@comcast.net"
    )
  })
})
