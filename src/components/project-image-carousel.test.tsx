import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it } from "vitest"

import { ProjectImageCarousel } from "@/components/project-image-carousel"

it("lets keyboard users browse screenshots with slide announcements", async () => {
  const user = userEvent.setup()
  render(
    <ProjectImageCarousel
      screenshots={[
        {
          src: "/first.png",
          alt: "Project setup form",
          caption: "Setup",
        },
        {
          src: "/second.png",
          alt: "Simulation results window",
          caption: "Results",
        },
      ]}
    />
  )
  const carousel = within(
    screen.getByRole("region", { name: "Project screenshots" })
  )
  const previousButton = carousel.getByRole("button", {
    name: "Previous screenshot",
  })
  const nextButton = carousel.getByRole("button", { name: "Next screenshot" })

  expect(
    carousel.getByRole("img", { name: "Project setup form" })
  ).toBeVisible()
  expect(carousel.getByRole("status")).toHaveTextContent("Screenshot 1 of 2")
  expect(carousel.queryByRole("link")).not.toBeInTheDocument()

  await user.tab()
  expect(previousButton).toHaveFocus()
  await user.keyboard("{Enter}")
  expect(previousButton).toHaveFocus()
  expect(
    carousel.getByRole("img", { name: "Simulation results window" })
  ).toBeVisible()
  expect(carousel.getAllByRole("img")).toHaveLength(1)
  expect(carousel.getByRole("status")).toHaveTextContent("Screenshot 2 of 2")

  await user.tab()
  expect(nextButton).toHaveFocus()
  await user.keyboard(" ")
  expect(nextButton).toHaveFocus()
  expect(
    carousel.getByRole("img", { name: "Project setup form" })
  ).toBeVisible()
})
