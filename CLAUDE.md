# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is pnpm.

- `pnpm dev` / `pnpm build` / `pnpm start` — Vite + TanStack Start (`vite dev`, `vite build`, `node .output/server/index.mjs`)
- `pnpm lint` — `biome lint ./src`
- `pnpm format` — `biome format --write .` (tabs, width 3, single quotes, no semicolons, line width 100)
- `pnpm precommit` — format + lint

There is no test suite.

## Architecture

Personal portfolio/blog (prvnbist.com). TanStack Start (file routes in `src/routes/`, generated `src/routeTree.gen.ts`) on Vite + Nitro, React 18, Tailwind CSS v4, Biome; `@/*` maps to `src/*`. (Migrated from Next.js; see `MIGRATION.md` for history.)

**Two content sources:**
- **GraphCMS (Hygraph) via GraphQL** — designs, timelines, code projects, and the blog article *index* (id, title, date, tags, path). Client in `src/lib/graphql.ts` reads `GRAPH_CMS_URL` from `.env`; all queries are string constants in `src/queries/index.ts`. Fetch server-side only (route loaders / server functions).
- **Local MDX files** in `src/articles/*.mdx` — the article *body* and frontmatter (`title`, `date`, `tags`, `description`, `ogImage`). MDX is compiled at build time by `@mdx-js/rollup` (custom wrapper in `vite.config.ts` that skips `?raw`/query imports so frontmatter can be read from source with `gray-matter`); `src/routes/blog/$slug.tsx` renders it, with `CodeBlock` using prism-react-renderer.

So a new article needs both an `.mdx` file and a matching CMS entry whose `path` equals the filename slug (the listing links to `/blog/${article.path}`), or it won't appear in the blog listing or will 404.

`.env` (with `GRAPH_CMS_URL`) is tracked in git; only `.env*.local` is ignored. Only `VITE_`-prefixed vars reach the browser (`VITE_GOOGLE_ANALYTICS`). Builds and dev need network access to the CMS.

**Blog listing** (`src/routes/blog`): search (`?s=`) and tag filter (`?tag=`) are URL search params validated by the route, passed to `getArticles` in `utils.ts`, which forwards them as GraphQL variables (filtering happens in the CMS, not client-side).

**Styling (Tailwind v4):** CSS-first config — there is no `tailwind.config.ts` or PostCSS config. Tailwind loads via `@tailwindcss/vite` in `vite.config.ts`; the entry is `src/app/globals.css` (`@import "tailwindcss"` plus an `@theme` block for the custom `dark-*`/`blue-*` colors). Gotcha: v4 utilities live in `@layer utilities`, so any *unlayered* global rule (e.g. `* { margin: 0 }`, `a { color }`) overrides them (this broke `mx-auto`/padding centering). Put global element rules inside `@layer base`. Also note v4 renames: `rounded` → `rounded-sm`, `outline-none` → `outline-hidden`, `bg-gradient-to-*` → `bg-linear-to-*`, `flex-shrink` → `shrink`.

**Other:** `src/routes/script.ts` proxies the self-hosted analytics script at `/script`; Google Analytics is injected in the root route `head()`. Home page sections live in `src/app/sections/`; shared UI in `src/components/`.
