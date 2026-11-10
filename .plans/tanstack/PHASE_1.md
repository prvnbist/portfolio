# Phase 1: Audit Existing Project

Before making any changes, thoroughly inspect the existing Next.js portfolio project.

## Objectives

Understand the current architecture and prepare a migration blueprint for TanStack Start.

## Tasks

1. Inspect the complete project structure.
2. Review `package.json` and identify:
   - Runtime dependencies
   - Development dependencies
   - Next.js-specific dependencies
   - Dependencies that can be reused.
3. Inspect all routes under `src/app/`.
4. Inspect shared components, sections, hooks and utilities.
5. Understand the existing GraphQL integration:
   - `src/lib/graphql.ts`
   - `src/queries/index.ts`
   - Hygraph queries and response types.
6. Inspect the MDX implementation:
   - `src/articles/`
   - `gray-matter`
   - `next-mdx-remote`
   - `remark-mdx-code-meta`
   - `prism-react-renderer`
7. Inspect SEO configuration:
   - Page metadata
   - Sitemap
   - OpenGraph
   - Twitter metadata
   - Robots configuration.
8. Inspect analytics configuration:
   - Google Analytics
   - `/script` rewrite to `analytics.prvnbist.com`.
9. Identify all usages of Next.js-specific APIs, including:
   - `next/image`
   - `next/link`
   - `next/navigation`
   - `next/font`
   - `next/headers`
   - `next/server`
   - Metadata API
   - Server and client components.
10. Identify environment variables and deployment-specific configurations.

## Deliverables

Create `MIGRATION.md` containing:

- Existing architecture overview.
- Complete route mapping.
- Dependency migration table.
- Next.js API replacement mapping.
- Potential migration risks.
- Recommended target architecture.
- Phase-wise implementation plan.

## Constraints

- DO NOT modify existing application files.
- DO NOT install or uninstall dependencies.
- DO NOT refactor existing components.
- DO NOT start migration implementation.

Only audit and document findings.

At the end, summarize the migration risks and ask for approval before proceeding.