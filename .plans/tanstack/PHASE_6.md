# Phase 6: Migrate MDX Blog

Migrate the existing local MDX blog implementation from Next.js to TanStack Start.

This phase must preserve every existing article and its URL.

## Existing implementation

- src/articles/*.mdx
- gray-matter
- next-mdx-remote
- remark-mdx-code-meta
- prism-react-renderer
- Existing Content.tsx component.

## Objectives

Replace next-mdx-remote with a Vite-compatible MDX compilation and rendering solution.

## Tasks

1. Inspect all existing MDX articles.
2. Preserve all MDX files and their content.
3. Preserve gray-matter frontmatter parsing.
4. Configure MDX compilation using @mdx-js/rollup or an appropriate Vite-compatible implementation.
5. Preserve remark-mdx-code-meta functionality.
6. Preserve custom MDX components.
7. Migrate Content.tsx.
8. Preserve Prism code highlighting.
9. Preserve code block metadata and rendering.
10. Implement dynamic blog article routes using `$slug.tsx`.
11. Implement article loading using route loaders.
12. Implement article-specific metadata using loader data.
13. Handle missing articles with a proper 404.
14. Ensure article slugs match Hygraph article path fields.

## Frontmatter

Preserve existing fields:

- title
- date
- tags
- description
- ogImage

## Routing

Preserve:

- /blog
- /blog/:slug

## Important

Do not assume that Vite's MDX plugin automatically solves runtime loading of arbitrary MDX files.

Choose a compilation strategy that supports the existing content architecture and works correctly with SSR.

Avoid compiling arbitrary user-provided content at runtime.

## Acceptance Criteria

- All existing articles render.
- Frontmatter is parsed correctly.
- Custom MDX components work.
- Code highlighting works.
- Code block metadata works.
- Article metadata is generated correctly.
- Missing articles return 404.
- No hydration errors.
- Existing blog URLs remain unchanged.