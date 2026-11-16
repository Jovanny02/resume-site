
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
