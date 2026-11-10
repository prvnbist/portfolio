# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is pnpm.

- `pnpm dev` — Vite dev server on http://localhost:3000
- `pnpm build` — production build into `.output/` (Nitro `node-server`)
- `pnpm start` — `node .output/server/index.mjs` (reads env from the process; it does not load `.env`)
- `pnpm lint` — `biome lint ./src`
- `pnpm format` — `biome format --write .`
- `pnpm precommit` — format + lint
- Type check: `npx tsc --noEmit`

There is no test suite.

## Environment

- `GRAPH_CMS_URL` — server-only GraphQL endpoint, read in `src/lib/graphql.server.ts`. Needed by `/blog` and `/design`. Never prefix with `VITE_`.
- `VITE_GOOGLE_ANALYTICS` — client-exposed GA measurement ID (was `NEXT_PUBLIC_GOOGLE_ANALYTICS`). GA is injected in `__root.tsx` only in production builds and only when set.

See `.env.example`. Both must be set in the hosting provider's environment; `VITE_*` is inlined at build time.

## Architecture

Personal portfolio on TanStack Start (Vite + Nitro), React 18, Tailwind 3, framer-motion. Path alias `@/*` → `src/*`. SSR on every request; no `'use client'` directives (everything is isomorphic).

### Routing conventions

File-based routes in `src/routes/` (`src/routeTree.gen.ts` is generated — don't edit):

- `__root.tsx` — HTML shell, fonts (Fontsource, `--font-heading` / `--font-code`), global CSS, Navbar, footer, GA, self-hosted analytics script.
- `index.tsx`, `code.tsx`, `design.tsx`, `blog/index.tsx`, `blog/$slug.tsx`.
- Server routes: `sitemap[.]xml.ts`, `robots[.]txt.ts`, `script.ts` (proxies `/script` → `https://analytics.prvnbist.com/script.js`, replacing the old Next rewrite).
- Each route defines its own SEO (title, description, OpenGraph, Twitter, canonical) in `head()`, built with helpers in `src/lib/seo.ts`.
- `/blog` search state lives in the URL (`?s=`, `?tag=`) via `validateSearch` + `loaderDeps`.

Page components still live under `src/app/` (`sections/`, `blog/components/`, `code/`, `design/`, `globals.css`) and are imported by routes; shared UI is in `src/components/`, navbar in `src/sections/Navbar/`.

### Server-side data fetching

Route `loader`s call `createServerFn` wrappers (`src/lib/cms.ts`, `src/lib/articles.ts`). The implementations are in `*.server.ts` files (`cms.server.ts`, `articles.server.ts`, `graphql.server.ts`) and must only be imported from server-fn handlers so they stay out of the client bundle. GraphQL queries are plain strings in `src/queries/index.ts` (only `ARTICLES`, `ARTICLE_TAGS`, `DESIGNS` are used; `TIMELINES`/`CODES` are unused). Hardcoded data: `src/data/projects.ts`, timelines in `src/routes/index.tsx`.

### MDX content

- Blog articles are local MDX in `src/articles/<slug>.mdx` with frontmatter (`title`, `date`, `tags`, optional `description`, `ogImage`).
- `vite.config.ts` compiles `.mdx` imports at build time with `@mdx-js/rollup` (`remark-frontmatter`, `remark-mdx-code-meta`); `?raw` imports are left untouched.
- `articles.server.ts` reads frontmatter from `import.meta.glob('../articles/*.mdx', { query: '?raw' })` with gray-matter (bundled — no runtime `fs`), and computes prev/next. Sitemap and slug validity use the same glob, so adding an `.mdx` file adds the route and sitemap entry. Unknown slugs 404.
- Rendering: `src/app/blog/components/Content.tsx`, with `pre → CodeBlock` (`src/components/CodeBlock.tsx`, prism-react-renderer).
- The blog list comes from Hygraph; each CMS article's `path` must match the MDX filename slug, so a new post needs both the CMS entry and the MDX file.

## Deployment

`nitro()` in `vite.config.ts` uses the default `node-server` preset: `pnpm build` then run `node .output/server/index.mjs` (honors `PORT`) with `GRAPH_CMS_URL` set in the process environment. Build with `VITE_GOOGLE_ANALYTICS` set. Hashed assets under `/assets` are served with `immutable` 1-year cache. To deploy on Vercel or elsewhere, set the matching Nitro preset (e.g. `NITRO_PRESET=vercel`) at build time.

## Style

Biome enforces formatting: tabs (width 3), single quotes, double JSX quotes, no semicolons, ES5 trailing commas, 100-column lines. `noExplicitAny` and `noNonNullAssertion` are off.
