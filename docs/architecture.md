
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
