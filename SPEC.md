# Spec: Remove the Hygraph (GraphCMS) dependency

## Objective

Make the site fully self-contained: no runtime, build-time, or asset-hosting dependency on Hygraph.
After this change a clean checkout builds and runs with **no `.env` and no network access**.

Target user: the site owner (build/deploy reliability) and visitors (no "unavailable right now" failure state caused by a third-party CMS).

### What depends on Hygraph today

| Surface | Source | Used by |
|---|---|---|
| Designs (title, description, thumbnail, url) | `DESIGNS` query via `src/lib/cms.server.ts` | `/design` route (`getDesigns`) |
| Blog index: title, date, tags, path; tag list | `ARTICLES` / `ARTICLE_TAGS` queries | `/blog` route (`getBlogIndex`) |
| Hosted images (`media.graphcms.com/...`) | Hygraph asset CDN | 14 image refs across 7 MDX articles; design thumbnails (likely) |
| Dead code | `TIMELINES`, `CODES` queries | nothing (timelines are hardcoded in `src/routes/index.tsx`, code projects in `src/data/projects.ts`) |

Already independent of Hygraph: article bodies and frontmatter (`src/articles/*.mdx` via `src/lib/articles.server.ts`), sitemap, `/blog/$slug`.

### Decisions (confirmed)

1. **Designs** move to a local typed file `src/data/designs.ts` (same pattern as `src/data/projects.ts`). Thumbnails go in `public/images/design/`.
2. **Blog index** is derived from MDX frontmatter only. No matching CMS entry required any more. Search and tag filtering run in-process on the server.
3. **Hosted images** are downloaded into `public/` and URLs rewritten, so Hygraph asset hosting is also gone.
4. **Cleanup:** remove `graphql` and `graphql-request` deps, `src/queries/`, `src/lib/graphql.server.ts`, and `GRAPH_CMS_URL` (`.env`, `.env.example`, `src/vite-env.d.ts`). Update `CLAUDE.md` and `README.md`.
5. **Compatibility:** `/blog/<slug>` paths and `?s=` / `?tag=` behavior stay identical.

### Acceptance criteria

- [ ] `grep -riE "graphcms|hygraph|graphql-request|GRAPH_CMS" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.output --exclude=pnpm-lock.yaml` returns nothing, except articles whose *topic* is GraphQL/Hasura (word "graphql" in prose is fine; the pattern above excludes bare "graphql").
- [ ] `pnpm build` succeeds with `.env` removed and network disabled.
- [ ] `/design` renders the same designs, in the same order, with the same text and working thumbnails.
- [ ] `/blog` lists every article in `src/articles/*.mdx` (including `uses`), sorted by date descending; the tag list is the sorted unique set of frontmatter tags.
- [ ] `/blog?s=<kw>` filters by case-insensitive title substring (matches prior Hygraph `title_contains` semantics, to be confirmed in Open Questions); `/blog?tag=<t>` filters to articles containing that tag; both combine with AND.
- [ ] Every image in every MDX article loads from a same-origin path; no `media.graphcms.com` request is made on any page.
- [ ] `pnpm lint` and `pnpm format` pass; `pnpm-lock.yaml` no longer contains `graphql` or `graphql-request` (unless pulled in by another dependency).
- [ ] `/blog` and `/design` no longer have an error branch tied to CMS failure (data is static, so `CmsResult` / `safely` wrapper is removed).

## Tech Stack

TanStack Start + TanStack Router (file routes) on Vite + Nitro, React 18, Tailwind v4, Biome, MDX via `@mdx-js/rollup`, `gray-matter` for frontmatter. pnpm, Node 26.x. No new runtime dependencies.

## Commands

```
Dev:     pnpm dev
Build:   pnpm build
Start:   pnpm start          # node .output/server/index.mjs
Lint:    pnpm lint           # biome lint ./src
Format:  pnpm format         # biome format --write .
Precommit: pnpm precommit    # format + lint
Verify offline build: mv .env /tmp/env.bak && pnpm build   # then restore .env (network off)
Find leftovers: grep -riE "graphcms|hygraph|graphql-request|GRAPH_CMS" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.output --exclude=pnpm-lock.yaml
```

## Project Structure

```
src/data/designs.ts        → NEW: typed Design[] (replaces DESIGNS query)
src/lib/articles.server.ts → EXTEND: listArticles({ s, tag }), listTags()
src/lib/articles.ts        → EXTEND: getBlogIndex server fn (moved from cms.ts)
src/lib/articles.types.ts  → EXTEND: BlogSearch type (moved from cms.types.ts)
src/routes/design.tsx      → read from src/data/designs.ts (no server fn needed)
src/routes/blog/index.tsx  → import getBlogIndex from articles.ts
public/images/design/      → NEW: design thumbnails
public/images/articles/<slug>/ → NEW: images previously on media.graphcms.com
REMOVE: src/lib/cms.ts, cms.server.ts, cms.types.ts, graphql.server.ts, src/queries/, src/type.ts (if Timeline unused)
```

## Code Style

Biome: tabs, width 3, single quotes, no semicolons, line width 100. `@/*` → `src/*`. Data files export typed constants:

```ts
// src/data/designs.ts
import type { Design } from '@/lib/design.types'

export const DESIGNS: Design[] = [
	{
		id: 'justcall',
		title: 'JustCall',
		url: 'https://example.com',
		thumbnail: '/images/design/justcall.webp',
		description: '...',
	},
]
```

Filtering logic is a pure function over the article list so it can be reasoned about without I/O:

```ts
export const filterArticles = (all: ArticleMeta[], { s, tag }: BlogSearch) => {
	const kw = (s ?? '').trim().toLowerCase()
	return all.filter(
		a => (!kw || a.title.toLowerCase().includes(kw)) && (!tag || a.tags.includes(tag))
	)
}
```

## Testing Strategy

The repo has no test suite, and none is being added (declined). Verification is by build and manual checks:

- **Build:** `pnpm build` succeeds offline with no `.env`.
- **Lint/format:** `pnpm precommit` clean.
- **Leftover scan:** the grep above is empty.
- **Parity check (one-off, before deleting the client):** compare Hygraph's current `designs` and `articles` output against the new local data (counts, titles, order, tags, dates). Record result in the PR description.
- **Manual smoke** on `pnpm dev`: `/design`, `/blog`, `/blog?s=react`, `/blog?tag=hasura`, `/blog?s=react&tag=react`, each article page (images render), `/sitemap.xml`.
- **Network check:** browser devtools Network tab shows zero `graphcms.com` requests across the pages above.

## Boundaries

- **Always:** run `pnpm precommit` before committing; do the parity check before deleting the GraphQL client; keep `/blog/<slug>` URLs and `?s=` / `?tag=` semantics unchanged; keep downloaded images' original filenames traceable (map old media id → new path in the PR).
- **Ask first:** changing any article's frontmatter content beyond filling gaps needed for the index; renaming or deleting articles; changing image formats/resizing; any change to the Hygraph project itself (it stays untouched).
- **Never:** delete the Hygraph project/content or `.env` history; commit new secrets; remove an article from the listing that appears there today without approval; add a new CMS or runtime dependency.

## Success Criteria

All acceptance criteria above pass, and the diff is net-negative in lines of non-data code.

## Open Questions

1. **Design data export.** The designs exist only in Hygraph. OK for me to run a one-off, read-only query against the URL in `.env` to snapshot them (and download thumbnails)? Otherwise you'll need to supply the data.
2. **Search semantics.** Hygraph `title_contains` is, I believe, case-insensitive substring. Confirm that's acceptable, or I'll verify against the live API during the parity check.
3. **Missing frontmatter.** Do all 10 MDX files have `title`, `date`, and `tags` matching what's in Hygraph? Any CMS-only entries (articles in Hygraph with no `.mdx`) should be dropped — confirm.
4. **Docs.** `CLAUDE.md` currently says the client is `src/lib/graphql.ts` (actually `graphql.server.ts`) and describes two content sources; I'll rewrite it to one. Also fix the "Tailwind 3" line in `README.md`.
5. **Branch.** Work on the current `redesign` branch, or a new one off it?
