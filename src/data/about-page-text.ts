import { contact } from "@/data/contact"

export type SportsMilestone = {
  year: number
  description: string
  teams: { name: string; logo: string; darkLogo?: string }[]
}

const sportsMilestones: SportsMilestone[] = [
  {
    year: 1999,
    description:
      "I was raised in Jacksonville, so I’ve been a Jaguars fan my whole life.",
    teams: [{ name: "Jacksonville Jaguars", logo: "jacksonville-jaguars.png" }],
  },
  {
    year: 2010,
    description:
      "I got a Lionel Messi Barcelona jersey for Christmas and I’ve been hooked ever since. I also watched my first World Cup and cheered for the USMNT.",
    teams: [
      { name: "FC Barcelona", logo: "fc-barcelona.png" },
      { name: "USMNT", logo: "usmnt.png" },
    ],
  },
  {
    year: 2012,
    description:
      "I started watching Premier League soccer and loved watching Jack Wilshere and Theo Walcott play.",
    teams: [{ name: "Arsenal", logo: "arsenal.png" }],
  },
  {
    year: 2017,
    description:
      "I attended the University of Florida, so naturally I now support every UF team I see play.",
    teams: [{ name: "Florida Gators", logo: "florida-gators.png" }],
  },
  {
    year: 2024,
    description:
      "Since moving to Tampa in 2021, I’ve seen every pro sports team in the city play, and the Rays have been my favorite. I even got to see them play twice in the 2026 World Series!",
    teams: [
      {
        name: "Tampa Bay Rays",
        logo: "tampa-bay-rays.png",
        darkLogo: "tampa-bay-rays-dark.png",
      },
    ],
  },
]

export const aboutPageText = {
  introduction: `I’m ${contact.name}, a backend software engineer at Citi. Day to day I work on document processing systems that help keep Citi running smoothly. 
   In my free time, I like to do a bit of everything, including reading, traveling, playing with my dog, going to various sporting events, and working on side projects`,
  sportsMilestones,
  topBooks: [
    { title: "The Art of Racing in the Rain", author: "Garth Stein" },
    { title: "Dune", author: "Frank Herbert" },
    { title: "The Martian", author: "Andy Weir" },
    { title: "Artemis", author: "Andy Weir" },
    { title: "The Boy and the Dog", author: "Seishu Hase" },
  ],
}
