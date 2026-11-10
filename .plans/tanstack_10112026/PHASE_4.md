# Phase 4: Migrate Static Portfolio Pages

Migrate the static portfolio routes into TanStack Start.

## Routes

- /
- /code
- /design

## Tasks

1. Migrate the homepage and its sections.
2. Migrate the code page.
3. Migrate the design page.
4. Preserve all existing content and data.
5. Extract hardcoded project data into appropriate modules.
6. Preserve existing component compositions.
7. Migrate page-specific metadata using TanStack Router head configuration.
8. Ensure all routes support direct navigation and SSR.
9. Ensure internal links use TanStack Router.
10. Verify responsive layouts.

## Data

The existing PROJECTS data should remain intact.

The existing DESIGNS GraphQL query should be preserved, but its data fetching will be migrated in Phase 4 if it currently depends on the CMS.

## Constraints

- No redesign.
- No content changes.
- No unnecessary component abstractions.
- Do not migrate blog functionality yet.

## Acceptance Criteria

- All three routes work.
- Existing content is preserved.
- Layout matches the original.
- SSR works.
- Metadata is correct.
- No broken internal links.