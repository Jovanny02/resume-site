import dogCloseUp from "@/assets/dogs/j_alone.webp"
import couchCuddle from "@/assets/dogs/j_and_l_1.webp"
import touchingPaws from "@/assets/dogs/j_and_p_together.webp"
import dogOnBed from "@/assets/dogs/j_on_bed.webp"
import pWithGlasses from "@/assets/dogs/p_with_glasses.jpg"
import dogInGlasses from "@/assets/dogs/m_with_glasses.webp"
import holidayHat from "@/assets/dogs/yoda_dog.webp"
import { contact } from "@/data/contact"

export type DogPhoto = {
  src: string
  alt: string
  width: number
  height: number
  thumbnailPosition: string
}

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

const dogPhotos: DogPhoto[] = [
  {
    src: dogInGlasses,
    alt: "A tan and white dog wearing black glasses on a brown cushion",
    width: 900,
    height: 1600,
    thumbnailPosition: "center 57%",
  },
  {
    src: touchingPaws,
    alt: "A small tan dog and a black dog touching paws as they nap on the carpet",
    width: 777,
    height: 1600,
    thumbnailPosition: "center 46%",
  },
  {
    src: couchCuddle,
    alt: "A black dog resting its chin on a tan dog on the couch",
    width: 1205,
    height: 1600,
    thumbnailPosition: "center 75%",
  },
  {
    src: holidayHat,
    alt: "A tan dog in a Santa hat with green Yoda ears sitting beside a wrapped gift",
    width: 1205,
    height: 1600,
    thumbnailPosition: "center 58%",
  },
  {
    src: dogCloseUp,
    alt: "A black dog with brown eyes looking up at the camera",
    width: 1205,
    height: 1600,
    thumbnailPosition: "center 60%",
  },
  {
    src: dogOnBed,
    alt: "A black dog stretched out on a blue striped quilt",
    width: 1205,
    height: 1600,
    thumbnailPosition: "center 70%",
  },
  {
    src: pWithGlasses,
    alt: "A brown dog with pink sunglasses",
    width: 1600,
    height: 777,
    thumbnailPosition: "center 70%",
  },
]



export const aboutPageText = {
  introduction: `I’m ${contact.name}, a backend software engineer at Citi. Day to day I work on document processing systems that help keep Citi running smoothly. 
   In my free time, I like to do a bit of everything, including reading, traveling, playing with my dog, going to various sporting events, and working on side projects`,
  sportsMilestones,
  dogPhotos,
  topBooks: [
    { title: "The Art of Racing in the Rain", author: "Garth Stein" },
    { title: "Dune", author: "Frank Herbert" },
    { title: "The Martian", author: "Andy Weir" },
    { title: "Artemis", author: "Andy Weir" },
    { title: "The Boy and the Dog", author: "Seishu Hase" },
  ],
}
