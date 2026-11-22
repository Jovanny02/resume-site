import {
  AppWindow,
  Brush,
  FileText,
  FolderOpen,
  House,
  UserRound,
} from "lucide-react"

import { gradingGuiProject } from "@/data/projects"

export const navigationItems = [
  { label: "Home", to: "/", icon: House },
  { label: "Resume", to: "/resume", icon: FileText },
  { label: "About", to: "/about", icon: UserRound },
] as const

export const projectLinks = [
  { label: "All projects", to: "/projects", icon: FolderOpen },
  {
    label: gradingGuiProject.title,
    to: gradingGuiProject.detailsPath,
    icon: AppWindow,
  },
  { label: "UI Playground", to: "/ui-playground", icon: Brush },
]
