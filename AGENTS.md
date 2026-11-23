# Repository Guidelines

## Project Structure & Module Organization

Build a professional, extensible personal portfolio using React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

The project also serves as a learning environment for React, frontend architecture, testing, and AI-assisted development.

Prioritize maintainability, accessibility, and clear code over unnecessary abstractions or visual complexity.

## Collaboration & Learning Approach

The maintainer is an experienced backend Java developer learning React and TypeScript. Explain framework concepts directly; use Java comparisons when helpful without forcing backend patterns onto React.

- Before implementing a feature, explain the proposed component structure, responsibilities, and relevant React concepts, such as props, state, composition, or hooks. Then proceed within the requested scope.
- After each change, explain important code decisions, how to test the result, and any tradeoffs.
- Use concise explanations by default, with optional deeper teaching if requested by the maintainer
- Favor readable, idiomatic code that teaches the framework over opaque abstractions or unexplained generated code.
- Keep components reusable, portfolio content separate from presentation, and styling consistent. Add dependencies only when they provide clear value.

## Scope & Decision-Making

- Make the smallest coherent change that satisfies the request.
- Avoid unrelated refactoring, speculative features, and unnecessary new files.
- Follow existing patterns unless there is a concrete reason to change them.
- Prefer existing dependencies and browser APIs.
- Explain and request approval before adding major dependencies or changing architectural conventions.
- State assumptions briefly when requirements are ambiguous.
- Ask for clarification only when a decision significantly affects requirements, architecture, or implementation.
- Do not overwrite user changes outside the requested scope.


## Project Structure

- `src/main.tsx` mounts the application and theme provider; `src/App.tsx` defines the current page.
- `src/components/` holds shared components, with shadcn primitives in `src/components/ui/`.
- `src/lib/` contains shared utilities; `src/index.css` defines global styles and theme tokens.
- `src/assets/` contains imported assets; `public/` contains files served directly.
- Production output goes to `dist/`.

Keep portfolio content separate from presentational components.

Consult `docs/architecture.md` when changing application
structure, routing, or shared component boundaries.

Consult `docs/design-system.md` for styling and design changes.

## Build, Test, and Development Commands

- `npm ci`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite development server.
- `npm run build`: check the TypeScript project references and generate production assets.
- `npm run lint`: check TypeScript and React Hooks rules with ESLint.
- `npm run format`: format TypeScript and TSX files with Prettier.
- `npm run typecheck`: runs root `tsc --noEmit`; use `npm run build` to validate referenced projects fully.
- `npm run preview`: serve the production build locally after building.

## Coding Style & Naming Conventions

Use functional React components and explicit TypeScript prop types. Prettier enforces two-space indentation, double quotes, no semicolons, LF endings, and an 80-column target. Its Tailwind plugin sorts utility classes.

Use PascalCase component symbols, camelCase functions and variables, and kebab-case shared component filenames, such as `theme-provider.tsx`. Prefer `@/` imports. Reuse theme tokens and UI primitives.

## Testing Guidelines

- Use Vitest for unit testing and React Testing Library for component testing.
- Write tests for new components and meaningful behavior changes, focusing on user-visible behavior rather than implementation details.
- Prefer accessible queries (e.g., `getByRole`, `getByLabelText`) over test IDs or CSS selectors.
- Run relevant tests after changes and ensure existing tests continue to pass.
- Mock external dependencies when necessary, but avoid excessive mocking.

## Commit & Pull Request Guidelines

History contains only initial commits; no broader convention is established. Use focused, imperative messages, optionally prefixed with `feat:`, `fix:`, or `docs:`.

Pull requests should explain changes, link relevant issues, list validation, and include screenshots for visual changes. Keep credentials and `.env` files out of Git.
