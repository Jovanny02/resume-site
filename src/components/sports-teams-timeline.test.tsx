import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SportsTeamsTimeline } from "@/components/sports-teams-timeline"
import { ThemeProvider } from "@/components/theme-provider"

describe("SportsTeamsTimeline", () => {
  it("shows each team's year, name, logo, and story in chronological order", () => {
    render(
      <SportsTeamsTimeline
        milestones={[
          {
            year: 2018,
            description: "I saw a game while visiting friends.",
            teams: [
              {
                name: "Falcons",
                logo: "falcons.svg",
                darkLogo: "falcons-dark.svg",
              },
            ],
          },
          {
            year: 2009,
            description: "My family watched every weekend.",
            teams: [
              { name: "Wolves", logo: "wolves.svg" },
              { name: "Bears", logo: "bears.svg" },
            ],
          },
        ]}
      />,
      {
        wrapper: ({ children }) => (
          <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
        ),
      }
    )

    const timeline = screen.getByRole("list", {
      name: "Sports fandom timeline",
    })
    const [first, second] = within(timeline).getAllByRole("listitem")

    expect(timeline).toHaveAttribute("tabindex", "0")
    expect(within(first).getByText("2009")).toHaveAttribute("datetime", "2009")
    expect(
      within(first).getByRole("heading", { name: "Wolves and Bears" })
    ).toBeVisible()
    expect(
      within(first).getByText("My family watched every weekend.")
    ).toBeVisible()
    expect(
      within(first)
        .getAllByAltText("")
        .map((logo) => logo.getAttribute("src"))
    ).toEqual(["/team-logos/wolves.svg", "/team-logos/bears.svg"])
    expect(within(second).getByText("2018")).toBeVisible()
    expect(
      within(second).getByRole("heading", { name: "Falcons" })
    ).toBeVisible()
    expect(within(second).getByAltText("")).toHaveAttribute(
      "src",
      "/team-logos/falcons-dark.svg"
    )
  })

  it("omits the timeline when no teams have been added", () => {
    render(<SportsTeamsTimeline milestones={[]} />, { wrapper: ThemeProvider })

    expect(screen.queryByRole("list")).not.toBeInTheDocument()
  })
})
