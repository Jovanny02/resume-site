import { Mail } from "lucide-react"

import githubIcon from "@/assets/github.svg"
import linkedinIcon from "@/assets/linkedin.svg"
import { contact } from "@/data/contact"

const contactLinks = [
  {
    label: "GitHub",
    href: contact.github,
    icon: <img src={githubIcon} alt="" className="size-5 dark:invert" />,
  },
  {
    label: "LinkedIn",
    href: contact.linkedin,
    icon: <img src={linkedinIcon} alt="" className="size-5 dark:invert" />,
  },
  {
    label: "Email",
    href: `mailto:${contact.email}`,
    icon: <Mail aria-hidden="true" className="size-5" />,
  },
]

export function SiteFooter() {
  return (
    <footer className="flex flex-col items-center gap-3 bg-secondary px-4 py-6 text-secondary-foreground">
      <ul className="flex items-center gap-3">
        {contactLinks.map(({ label, href, icon }) => (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              className="grid size-11 place-items-center rounded-full border border-current hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              {icon}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-sm font-medium">{contact.name}</p>
    </footer>
  )
}
