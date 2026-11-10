# Phase 5: Migrate GraphQL and Hygraph Integration

Migrate the existing GraphQL integration to TanStack Start.

## Existing implementation

- src/lib/graphql.ts
- src/queries/index.ts
- src/app/blog/utils.ts

CMS: Hygraph (GraphCMS).

## Objectives

Preserve the existing CMS integration while moving data fetching into TanStack Start server-side loaders.

## Tasks

1. Migrate the shared GraphQL client.
2. Preserve existing GraphQL queries.
3. Keep GRAPH_CMS_URL server-only.
4. Create clean server-side CMS service functions.
5. Migrate the DESIGNS query.
6. Migrate article listing queries.
7. Migrate tag queries.
8. Preserve existing response types.
9. Add appropriate error handling.
10. Ensure CMS data is fetched server-side.
11. Avoid duplicate CMS requests.
12. Use TanStack Router loaders for route-level data fetching.

## Blog search and filtering

Preserve existing URL parameters:

- ?s= for search
- ?tag= for filtering

Use validateSearch and loaderDeps to handle search parameter changes.

## Constraints

- Do not modify Hygraph schema.
- Do not change GraphQL query semantics.
- Do not expose CMS credentials or endpoint configuration unnecessarily.
- Do not introduce TanStack Query unless genuinely required.
- Do not change existing article slugs.

## Acceptance Criteria

- CMS connection works.
- Designs load correctly.
- Blog listing data loads correctly.
- Tags load correctly.
- Search works.
- Tag filtering works.
- Server-side rendering works.
- CMS failures are handled gracefully.