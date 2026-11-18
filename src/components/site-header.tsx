import { useTheme } from "@/components/theme-provider"
import { useState } from "react"
import { FolderOpen, Moon, Sun } from "lucide-react"
import { matchPath, NavLink, useLocation } from "react-router"

import { navigationItems, projectLinks } from "@/data/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

function HeaderNavLabel({ children }: { children: string }) {
  return (
    <span className="relative before:absolute before:inset-x-0 before:top-full before:h-px before:bg-accent after:absolute after:inset-x-0 after:top-full after:h-0.5 after:origin-left after:scale-x-0 after:bg-current group-hover/header-nav:after:scale-x-100 group-focus-visible/header-nav:after:scale-x-100 group-aria-[current=page]/header-nav:after:scale-x-100 group-data-[active=true]/header-nav:after:scale-x-100 motion-safe:after:transition-transform motion-safe:after:duration-250">
      {children}
    </span>
  )
}

export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const { pathname } = useLocation()
  const isProjectsPage =
    matchPath("/projects/*", pathname) !== null ||
    projectLinks.some(({ to }) => matchPath(to, pathname) !== null)

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 px-4 py-4 sm:flex-row sm:px-6">
        <NavigationMenu
          value={openMenu}
          onValueChange={setOpenMenu}
          aria-label="Main navigation"
          align="center"
          className="max-w-full flex-none"
        >
          <NavigationMenuList className="flex-wrap gap-1">
            {navigationItems.map(({ label, to, icon: Icon }) => (
              <NavigationMenuItem key={to}>
                <NavigationMenuLink
                  render={<NavLink to={to} end />}
                  active={pathname === to}
                  className="group/header-nav min-h-10 gap-1.5 px-2 sm:gap-2 sm:px-3"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <HeaderNavLabel>{label}</HeaderNavLabel>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="group/header-nav min-h-10 gap-1.5 px-2 data-[active=true]:bg-muted/50 sm:gap-2 sm:px-3"
                data-active={isProjectsPage}
              >
                <FolderOpen className="size-4" aria-hidden="true" />
                <HeaderNavLabel>Projects</HeaderNavLabel>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-60">
                {projectLinks.map(({ label, to, icon: Icon }) => (
                  <NavigationMenuLink
                    key={to}
                    onClick={() => setOpenMenu(null)}
                    render={<NavLink to={to} end />}
                    active={pathname === to}
                    className="group/header-nav"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    <HeaderNavLabel>{label}</HeaderNavLabel>
                  </NavigationMenuLink>
                ))}
                <p className="px-2 py-3 text-xs text-muted-foreground">
                  Individual projects coming soon.
                </p>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button
          variant="outline"
          size="icon"
          aria-label={
            resolvedTheme === "dark"
              ? "Switch to light theme"
              : "Switch to dark theme"
          }
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "dark" ? (
            <Sun aria-hidden="true" />
          ) : (
            <Moon aria-hidden="true" />
          )}
        </Button>
      </div>
    </header>
  )
}
