import { SportsTeamsTimeline } from "@/components/sports-teams-timeline"
import { aboutPageText } from "@/data/about-page-text"
import { contact } from "@/data/contact"

export function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 sm:space-y-16">
      <section
        aria-labelledby="about-title"
        className="grid items-center gap-8 md:grid-cols-[3fr_2fr] md:gap-12 lg:gap-20"
      >
        <div>
          <h1
            id="about-title"
            className="w-fit font-heading text-4xl font-bold tracking-tight after:mt-3 after:block after:h-1 after:rounded-full after:bg-accent sm:text-6xl lg:text-7xl"
          >
            About
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            {aboutPageText.introduction}
          </p>
        </div>
        <img
          src={`${import.meta.env.BASE_URL}headshot.jpeg`}
          alt={`Portrait of ${contact.name}`}
          width={783}
          height={783}
          className="aspect-square h-auto w-full max-w-56 justify-self-center rounded-full border-2 border-border object-cover md:max-w-80"
        />
      </section>

      <section aria-labelledby="about-sports-title" className="border-t pt-6">
        <h2
          id="about-sports-title"
          className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl tracking-tight after:mt-3 after:block after:h-1 after:rounded-full after:bg-accent w-fit"
        >
          My Sports Teams
        </h2>
        <SportsTeamsTimeline milestones={aboutPageText.sportsMilestones} />
      </section>

      <section aria-labelledby="about-books-title" className="border-t pt-6">
        <h2
          id="about-books-title"
          className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl tracking-tight after:mt-3 after:block after:h-1 after:rounded-full after:bg-accent w-fit"
        >
          Top Books
        </h2>
        <ul className="list-disc space-y-2 pt-2 pl-5 text-lg leading-relaxed">
          {aboutPageText.topBooks.map(({ title, author }) => (
            <li key={title}>
              {title} <span className="text-base italic">by {author}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="about-dogs-title"
        className="border-t pt-6"
      >
        <h2
          id="dogs-title"
          className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl tracking-tight after:mt-3 after:block after:h-1 after:rounded-full after:bg-accent w-fit"
        >
          Dogs
        </h2>
      </section>
    </div>
  )
}
