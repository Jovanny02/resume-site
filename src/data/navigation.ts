import { FileText, House, UserRound, FolderOpen, Brush } from "lucide-react"

export const navigationItems = [
  { label: "Home", to: "/", icon: House },
  { label: "Resume", to: "/resume", icon: FileText },
  { label: "About", to: "/about", icon: UserRound },
] as const

// Add links here when individual project pages are introduced.
export const projectLinks = [
  { label: "All projects", to: "/projects", icon: FolderOpen },
  { label: "UI Playground", to: "/ui-playground", icon: Brush  }
]
