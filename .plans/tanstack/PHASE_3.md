# Phase 3: Migrate Shared UI and Application Shell

Migrate the existing application shell into TanStack Start.

## Objectives

Reproduce the existing portfolio layout and visual appearance without changing the design.

## Tasks

1. Migrate the existing Navbar.
2. Migrate shared layout components.
3. Migrate reusable UI components.
4. Migrate home page sections' shared dependencies.
5. Migrate global CSS.
6. Migrate fonts and typography.
7. Migrate Framer Motion animations.
8. Replace Next.js-specific imports:
   - next/link → TanStack Router Link
   - next/image → suitable image element or image component
   - next/navigation → TanStack Router navigation APIs.
9. Handle browser-only APIs safely.
10. Ensure components work with SSR and hydration.
11. Preserve responsive behavior and accessibility.

## Constraints

- Do not redesign the portfolio.
- Do not change existing colors, typography, spacing or animations.
- Do not migrate CMS or blog functionality.
- Avoid unnecessary component rewrites.
- Preserve existing component naming where practical.

## Acceptance Criteria

- Navbar works.
- Internal navigation works.
- Layout matches the existing application.
- Animations work.
- No hydration errors.
- No browser API errors during SSR.

Compare the migrated shell against the original Next.js application.