# Phase 2: Bootstrap TanStack Start

Initialize TanStack Start in the repository based on the approved MIGRATION.md.

## Objectives

Set up a fully functional TanStack Start application with SSR, file-based routing, Vite and TypeScript.

## Tasks

1. Install and configure TanStack Start and its required dependencies.
2. Configure Vite using the current recommended TanStack Start setup.
3. Configure TanStack Router file-based routing.
4. Configure automatic route tree generation.
5. Set up the root route (`__root.tsx`).
6. Configure the root HTML document with:
   - HeadContent
   - Scripts
   - HTML language
   - Viewport metadata.
7. Configure TypeScript and path aliases.
8. Configure Tailwind CSS, preserving the existing Tailwind version initially.
9. Configure Biome using existing formatting conventions:
   - Tabs
   - Tab width 3
   - Single quotes
   - Double quotes in JSX
   - No semicolons
   - ES5 trailing commas
   - 100-character line width.
10. Set up environment variable handling.
11. Create a basic index route.
12. Configure the production build and development server.

## Environment

Preserve:
- GRAPH_CMS_URL (server-only).
- NEXT_PUBLIC_GOOGLE_ANALYTICS (migrate to a suitable Vite-compatible public variable if necessary).

Do not expose GRAPH_CMS_URL to the browser.

## Scripts

Preserve equivalent commands:

- pnpm dev
- pnpm build
- pnpm start
- pnpm lint
- pnpm format
- pnpm precommit

## Constraints

- Do not migrate existing pages yet.
- Do not remove existing business logic.
- Do not upgrade unrelated dependencies.
- Do not change existing content.
- Use current stable TanStack Start APIs rather than outdated examples.

## Acceptance Criteria

- Application starts successfully.
- SSR works.
- File-based routing works.
- TypeScript compilation succeeds.
- Production build succeeds.
- Biome commands work.

Summarize files created, dependencies added, and any configuration decisions.