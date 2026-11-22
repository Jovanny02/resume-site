import { render, screen, within } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { expect, it } from "vitest"

import { ProjectsPage } from "@/pages/projects-page"

function renderProjectsPage() {
  render(
    <MemoryRouter>
      <ProjectsPage />
    </MemoryRouter>
  )
}

it("shows projects in timeline order with their years, images, and technologies", () => {
  renderProjectsPage()

  const timeline = screen.getByRole("list", { name: "Project timeline" })
  expect(
    within(timeline)
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent)
  ).toEqual(["Resume Website", "Home Server", "Digital Design Grading GUI"])
  expect(within(timeline).getAllByRole("img")).toHaveLength(3)
  expect(
    within(timeline).getByRole("img", {
      name: "A house, server, and globe connected on a network",
    })
  ).toBeVisible()
  expect(
    within(timeline).getByRole("img", {
      name: "Digital Design Grading GUI showing project setup and simulation results",
    })
  ).toBeVisible()
  expect(
    within(timeline)
      .getAllByRole("time")
      .map((year) => year.textContent)
  ).toEqual(["2026", "2024", "2021"])

  const technologyLists = within(timeline).getAllByRole("list", {
    name: "Technologies",
  })
  expect(
    technologyLists.map((list) =>
      within(list)
        .getAllByRole("listitem")
        .map((item) => item.textContent)
    )
  ).toEqual([
    ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"],
    ["Ubuntu", "No-IP", "Certbot", "Docker", "nginx", "Immich", "Plex"],
    ["Python", "Tkinter", "Tcl"],
  ])

  const technologyBadges = technologyLists.flatMap((list) =>
    within(list).getAllByRole("listitem")
  )
  const tkinterBadge = within(timeline).getByText("Tkinter")
  expect(within(tkinterBadge).queryByAltText("")).not.toBeInTheDocument()
  expect(tkinterBadge.querySelector('svg[aria-hidden="true"]')).toBeVisible()

  const brandedBadges = technologyBadges.filter(
    (badge) => !badge.contains(tkinterBadge)
  )
  const iconSources = brandedBadges.map((badge) => {
    const icon = within(badge).getByAltText("")
    expect(icon).toBeVisible()
    expect(icon).toHaveAttribute("src")
    return icon.getAttribute("src")
  })
  expect(new Set(iconSources).size).toBe(brandedBadges.length)
})

it("shows a GitHub link only for projects with a repository URL", () => {
  renderProjectsPage()

  const timeline = within(
    screen.getByRole("list", { name: "Project timeline" })
  )
  const repoLink = timeline.getByRole("link", {
    name: "Resume Website on GitHub (opens in a new tab)",
  })
  expect(timeline.getAllByRole("link", { name: /on GitHub/ })).toHaveLength(2)
  expect(repoLink).toHaveAttribute(
    "href",
    "https://github.com/Jovanny02/resume-site"
  )
  expect(repoLink).toHaveAttribute("target", "_blank")
  expect(
    timeline.getByRole("link", {
      name: "Digital Design Grading GUI on GitHub (opens in a new tab)",
    })
  ).toHaveAttribute("href", "https://github.com/Jovanny02/GradingGUI")
})

it("links only the Grading GUI card to a project details page", () => {
  renderProjectsPage()

  const timeline = within(
    screen.getByRole("list", { name: "Project timeline" })
  )
  const detailsLink = timeline.getByRole("link", {
    name: "Digital Design Grading GUI",
  })

  expect(detailsLink).toHaveAttribute("href", "/projects/grading-gui")
  expect(timeline.getAllByRole("link")).toHaveLength(3)
})
