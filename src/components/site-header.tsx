import { useState } from "react"
import { FolderOpen } from "lucide-react"
import { NavLink, useLocation } from "react-router"

import { navigationItems, projectLinks } from "@/data/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const { pathname } = useLocation()
  const isProjectsPage =
    pathname === "/projects" || pathname.startsWith("/projects/")

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

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
                  className="min-h-10 gap-1.5 px-2 sm:gap-2 sm:px-3"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="min-h-10 gap-1.5 px-2 data-[active=true]:bg-muted/50 sm:gap-2 sm:px-3"
                data-active={isProjectsPage}
              >
                <FolderOpen className="size-4" aria-hidden="true" />
                Projects
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-60">
                {projectLinks.map(({ label, to }) => (
                  <NavigationMenuLink
                    key={to}
                    onClick={() => setOpenMenu(null)}
                    render={<NavLink to={to} end />}
                    active={pathname === to}
                  >
                    <FolderOpen className="size-4" aria-hidden="true" />
                    {label}
                  </NavigationMenuLink>
                ))}
                <p className="px-2 py-3 text-xs text-muted-foreground">
                  Individual projects coming soon.
                </p>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
