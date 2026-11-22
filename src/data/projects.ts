import gradingGuiImage from "@/assets/projects/grading-gui.png"
import homeNetworkImage from "@/assets/projects/home-network.svg"
import resumeSiteImage from "@/assets/projects/resume-site.jpg"

export type Project = {
  id: string
  title: string
  year: number
  description: string
  image: { src: string; alt: string }
  technologies: readonly string[]
  githubUrl?: string
  detailsPath?: string
}

export const gradingGuiProject = {
  id: "grading-gui",
  title: "Digital Design Grading GUI",
  year: 2021,
  description:
    "A desktop tool for Digital Design teaching assistants to organize submissions, run ModelSim testbenches, and review saved results. The GUI integrated auto-grading scripts developed by another teaching assistant which greatly sped up the grading process.",
  image: {
    src: gradingGuiImage,
    alt: "Digital Design Grading GUI showing project setup and simulation results",
  },
  technologies: ["Python", "Tkinter", "Tcl"],
  githubUrl: "https://github.com/Jovanny02/GradingGUI",
  detailsPath: "/projects/grading-gui",
} satisfies Project

export const projects: readonly Project[] = [
  {
    id: "resume-site",
    title: "Resume Website",
    year: 2026,
    description:
      "My personal portfolio for sharing my experience and side projects. I built it to practice React and TypeScript, with a UI Playground for trying out components.",
    image: {
      src: resumeSiteImage,
      alt: "Screenshot of this portfolio’s homepage",
    },
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"],
    githubUrl: "https://github.com/Jovanny02/resume-site",
  },
  {
    id: "home-server",
    title: "Home Server",
    year: 2024,
    description:
      "I built this home server to host my personal projects and provide Plex media streaming and Immich photo storage for friends and family. Docker runs both apps, and Nginx routes requests to the right service. Certbot manages Let’s Encrypt certificates for HTTPS.",
    image: {
      src: homeNetworkImage,
      alt: "A house, server, and globe connected on a network",
    },
    technologies: [
      "Ubuntu",
      "No-IP",
      "Certbot",
      "Docker",
      "nginx",
      "Immich",
      "Plex",
    ],
  },
  gradingGuiProject,
]
