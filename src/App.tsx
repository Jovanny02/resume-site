import { useLayoutEffect } from "react"
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { gradingGuiProject } from "@/data/projects"
import { AboutPage } from "@/pages/about-page"
import { GradingGuiPage } from "@/pages/grading-gui-page"
import { HomePage } from "@/pages/home-page"
import { NotFoundPage } from "@/pages/not-found-page"
import { ProjectsPage } from "@/pages/projects-page"
import { ResumePage } from "@/pages/resume-page"

function AppLayout() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    console.log("naviagation type: ", navigationType)
    if (navigationType !== "POP" && !hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }
  }, [pathname, hash, navigationType])

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main-content"
        className="sr-only rounded-md bg-background p-3 focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-7xl flex-1 scroll-mt-44 px-4 py-12 outline-none sm:scroll-mt-20 sm:px-6 sm:py-10"
      >
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route
          path={gradingGuiProject.detailsPath}
          element={<GradingGuiPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
