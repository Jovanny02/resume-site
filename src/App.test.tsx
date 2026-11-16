import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"

import App from "@/App"

function renderApp(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  )
}

describe("portfolio navigation", () => {
  it.each([
    ["/", "Backend experience. New perspectives."],
    ["/resume", "Resume"],
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

  it("navigates between pages and marks the active link", async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole("link", { name: "Resume" }))
    expect(screen.getByRole("heading", { name: "Resume" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute(
      "aria-current",
      "page"
    )
    await user.click(screen.getByRole("link", { name: "Home" }))
    expect(
      screen.getByRole("heading", {
        name: "Backend experience. New perspectives.",
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
