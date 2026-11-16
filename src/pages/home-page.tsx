export function HomePage() {
  return (
    <section aria-labelledby="home-title">
      <p className="mb-3 text-sm font-medium text-muted-foreground">Welcome</p>
      <h1
        id="home-title"
        className="text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        Backend experience. New perspectives.
      </h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
        I’m a Java backend developer exploring React and TypeScript. This is my
        personal portfolio, a place for my experience, interests, and projects.
      </p>
    </section>
  )
}
