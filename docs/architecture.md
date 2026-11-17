
# Application Architecture

## Goals

- A professional personal portfolio and resume website.
- Extendable with future projects and technical demos.
- Static hosting using Nginx on a personal home server.
- No backend required for the initial implementation.

## Architectural Principles

- Prefer simple, idiomatic React architecture.
- Separate portfolio content from presentation.
- Keep page components responsible for page composition.
- Extract reusable components when reuse is meaningful.
- Avoid speculative abstractions for future requirements.
- Add backend services only when a feature requires them.

## Component Responsibilities

- Pages: compose application features and page content.
- Shared components: reusable portfolio-specific UI.
- UI primitives: generic components provided by shadcn/ui.
- Data modules: typed portfolio content.
- Utilities: pure, reusable helper functions.

## Routing

Use React Router when multiple pages are introduced.
Keep the navigation and application shell consistent.

## State Management

Prefer local React state for interactive behavior.
Introduce shared context only when necessary.
Avoid external state libraries until requirements justify them.

## Deployment

The production application is built into static assets
and served through the existing Nginx infrastructure.

Client-side routes must support direct URL navigation.

## Architectural Decisions

Record significant architectural decisions and their rationale
here as the project evolves.

### Initial client-side routing

`src/main.tsx` supplies `BrowserRouter`. `src/App.tsx` declares the
routes and a shared layout; its `Outlet` renders the matching page while
keeping `SiteHeader` in place. Each page component lives in its own kebab-case file under
`src/pages/`, such as `home-page.tsx` and `resume-page.tsx`. Navigation labels and destinations live in
`src/data/navigation.ts`; add individual project links alongside their routes.
Unknown URLs render a page-not-found view.

For direct navigation and refreshes, configure the Nginx site location to
serve existing assets first and fall back to the application entry point:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

This assumes deployment at the domain root. No server configuration is
changed by this repository update.

Run `npm test` for Vitest/React Testing Library checks of direct routes,
active navigation, and keyboard access to the Projects dropdown.

### Homepage typography

`VariableProximityText` is a decorative text component used in the homepage
introduction. Compose it inside a semantic heading; its `text`,
`radius`, `intensity`, `baseGrade`, and `peakGrade` props control content and
proximity. The introduction copy and selected settings live in
`src/data/typography-demo.ts`. The component fixes the glyph grade and animates
stroke width to change its apparent thickness.

Motion for React owns derived animation values, springs, and style updates.
Pointer coordinates are Motion values rather than React state, so pointer
movement does not rerender the component. A React `useSyncExternalStore`
subscription enables the effect only with a fine hover pointer and no
reduced-motion preference, responding to preference changes while mounted.
The current Motion `useReducedMotion` implementation reads the initial
preference only, so it is not used for this subscription.

Browser APIs track the pointer across the window, cache letter measurements,
and refresh those measurements on font loading, resize, or scroll. Pointer
coordinates clear when the pointer leaves the window or it loses focus.
The component cleans up these subscriptions; Motion owns its
animation lifecycle. No application-wide animation provider is required.
