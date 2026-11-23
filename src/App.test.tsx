import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import App from "@/App"
import { ThemeProvider } from "@/components/theme-provider"

const title = /Hi, I'm Jovanny!\s+Backend Software Engineer\./

beforeEach(() => {
  vi.stubGlobal("scrollTo", vi.fn())
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
    ["/projects/grading-gui", "Digital Design Grading GUI"],
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

  it("opens a dog photo with the keyboard and restores focus on Escape", async () => {
    const user = userEvent.setup()
    renderApp("/about")

    const dogs = within(screen.getByRole("region", { name: "Dogs" }))
    expect(dogs.getAllByRole("button", { name: /View photo:/ })).toHaveLength(7)
    const tile = dogs.getByRole("button", {
      name: "View photo: Nap on the green couch",
    })
    tile.focus()
    await user.keyboard("{Enter}")

    const dialog = await screen.findByRole("dialog", {
      name: "Nap on the green couch",
    })
    expect(within(dialog).queryByText("Nap on the green couch")).toBeNull()
    expect(
      within(dialog).getByRole("img", {
        name: "A black dog and a tan dog asleep at opposite ends of a green couch",
      })
    ).toBeVisible()
    expect(within(dialog).getByRole("button", { name: "Close" })).toBeVisible()

    await user.keyboard("{Escape}")
    await waitFor(() => expect(dialog).not.toBeInTheDocument())
    await waitFor(() => expect(tile).toHaveFocus())
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

  it("opens the Grading GUI project and returns without resetting the list scroll", async () => {
    const user = userEvent.setup()
    renderApp("/projects")
    expect(window.scrollTo).not.toHaveBeenCalled()

    const timeline = within(
      screen.getByRole("list", { name: "Project timeline" })
    )
    timeline.getByRole("link", { name: "Digital Design Grading GUI" }).focus()
    await user.keyboard("{Enter}")

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "instant",
    })
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Digital Design Grading GUI",
      })
    ).toBeVisible()
    expect(
      screen.getByRole("region", { name: "Project screenshots" })
    ).toBeVisible()
    const projectRepository = screen.getByRole("link", {
      name: "Digital Design Grading GUI on GitHub (opens in a new tab)",
    })
    expect(projectRepository).toHaveAttribute(
      "href",
      "https://github.com/Jovanny02/GradingGUI"
    )
    expect(projectRepository).toHaveAttribute("target", "_blank")
    expect(screen.getByRole("link", { name: "Keeth Smith" })).toHaveAttribute(
      "href",
      "https://github.com/KeethSmith"
    )

    await user.click(screen.getByRole("link", { name: "Back to all projects" }))
    expect(
      screen.getByRole("heading", { level: 1, name: "Projects" })
    ).toBeVisible()
    expect(window.scrollTo).toHaveBeenCalledTimes(1)
  })

  it("links to the Projects list after opening the detail page directly", async () => {
    const user = userEvent.setup()
    renderApp("/projects/grading-gui")

    await user.click(screen.getByRole("link", { name: "Back to all projects" }))

    expect(
      screen.getByRole("heading", { level: 1, name: "Projects" })
    ).toBeVisible()
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
