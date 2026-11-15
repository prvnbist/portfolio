# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is pnpm (version pinned in `package.json` `packageManager`).

- `pnpm dev` / `pnpm build` / `pnpm start` — Vite + TanStack Start (`vite dev`, `vite build`, `node .output/server/index.mjs`)
- `pnpm test` — Vitest unit tests (`src/**/*.test.{ts,tsx}`), run with the Vite config so `import.meta.glob` and MDX work; `pnpm test:watch` to watch
- `pnpm test:e2e` — Playwright smoke + axe tests in `e2e/` against the production build (run `pnpm build` first). Locally it uses the installed Google Chrome; CI installs Playwright's Chromium.
- `pnpm lint` — `biome lint ./src`
- `pnpm exec tsc --noEmit` — type-check
- `pnpm format` — `biome format --write .` (tabs, width 3, single quotes, no semicolons, line width 100)
- `pnpm precommit` — format + lint

CI (`.github/workflows/ci.yml`) runs install, lint, tsc, `pnpm test`, build and `pnpm test:e2e` on pull requests and pushes to `master`.

## Architecture

Personal portfolio/blog (prvnbist.com). TanStack Start (file routes in `src/routes/`, generated `src/routeTree.gen.ts`) on Vite + Nitro, React 18, Tailwind CSS v4, Biome; `@/*` maps to `src/*`.

**Site config:** `src/config/site.ts` is the single source of truth for `SITE_URL`, `NAME`, `ROLE`, `BIO`, `TWITTER`, `DEFAULT_OG`, `NAV` and `pageTitle()`. The navbar renders `NAV`, and the sitemap lists `/` plus every `NAV` path, so adding a page to the nav adds it to the sitemap. `src/config/security-headers.ts` holds the response headers applied to every route via Nitro `routeRules` in `vite.config.ts` (the full CSP is report-only for now).

**Content is entirely local — there is no CMS or external content API.**
- **Articles:** `src/articles/*.mdx` hold body and frontmatter. Required: `title`, `date`, `description` (at most 160 characters); optional: `tags`, `ogImage`. `pnpm build` fails, naming the article, if a required field is missing (`src/lib/frontmatter.ts`, run by a Vite plugin), or if a markdown image points at a file missing from `public/`. MDX is compiled at build time by `@mdx-js/rollup` (custom wrapper in `vite.config.ts` that skips `?raw`/query imports so frontmatter can be read from source with `gray-matter`). Rehype plugins: `rehype-mdx-code-props` turns fence meta such as ```` ```js highlight={[3]} ```` into props on `<pre>`, and `src/lib/rehype-image-size.ts` adds `width`/`height` to local images. `src/lib/articles.server.ts` derives the blog index, tag list and prev/next links from frontmatter; `src/routes/blog/$slug.tsx` renders the article through the typed MDX component map in `src/app/blog/components/Content.tsx`. Adding an article is just adding an `.mdx` file; the filename is the URL slug (`/blog/<slug>`). Article images live in `public/images/articles/<slug>/`; use WebP (animated WebP instead of GIF).
- **Designs and projects:** typed static data in `src/data/designs.ts` and `src/data/projects.ts`, including each thumbnail's `width`/`height` (images under `public/images/`); home-page timelines are constants in `src/routes/index.tsx`.

Only `VITE_`-prefixed env vars reach the browser (`VITE_GOOGLE_ANALYTICS`). `.env` and `.env*.local` are git-ignored. No network access is needed to build or run.

**Blog listing** (`src/routes/blog`): search (`?s=`, case-insensitive title substring) and tag filter (`?tag=`) are URL search params, parsed by `parseBlogSearch` (`src/lib/blog-search.ts`, also the `getBlogIndex` server-function validator) and filtered on the server via `filterArticles`. Tags are real links; the search box stays in sync with the URL on back/forward.

**SEO:** every route builds its head with `seo({ path, title, description, image?, type?, extra? })` from `src/lib/seo.ts` (title, description, canonical, Open Graph, Twitter, absolute image falling back to `DEFAULT_OG`). JSON-LD comes from `jsonLd()` with `personSchema`/`websiteSchema` (home) and `blogPostingSchema` (articles). The router keeps only one meta tag per `name`/`property`, so repeated tags such as `article:tag` are dropped; that's why it is a single comma-separated value.

**Components:**
- `src/components/ui/` — primitives: `Reveal` (fade-and-rise entrance), `Pill`/`pillClass`, `Icon` (decorative stroke icons), `CardGlow`. Card accents rotate via `src/lib/accents.ts`.
- `src/components/layout/` — `PageHero` (glows, terminal prompt, gradient h1) and `PageContainer` (the 920px column).
- `src/components/` — `Button` (link for `href`, `<button>` for `onClick`), `ProjectCard` (shared by `/code` and `/design`), `CodeBlock`, `LinkPreview`, `StatusPage` (`NotFound`, `ErrorPage`).
- Page-specific pieces are in `src/app/` (`blog`, `sections`), and the Navbar in `src/sections/`.

The root route renders a skip link, the navbar and the single `<main id="content">`; the document itself is the root's `shellComponent`, so a root-level error still has its `<head>`. The router's default error and not-found components render inside that layout.

**Motion:** framer-motion via `<LazyMotion strict>` with lazily loaded `domAnimation` features, so components must use `m.*`, never `motion.*` (strict mode throws). `src/lib/motion.ts` turns on `MotionGlobalConfig.skipAnimations` when `prefers-reduced-motion: reduce`, so reveals show at once and loops stay still; CSS loops use `motion-safe:`.

**Styling (Tailwind v4):** CSS-first config — there is no `tailwind.config.ts` or PostCSS config. Tailwind loads via `@tailwindcss/vite` in `vite.config.ts`; the entry is `src/app/globals.css` (`@import "tailwindcss"` plus an `@theme` block). Use the theme tokens rather than hex values: `bg-bg` (page background), `accent-from`/`accent-to` (the warm gradient), `--color-accent-glow`, and `font-code`. Fonts are the variable Inter and Stack Sans Notch packages; the heading font is preloaded in the root route. Gotcha: v4 utilities live in `@layer utilities`, so any *unlayered* global rule (e.g. `* { margin: 0 }`, `a { color }`) overrides them (this broke `mx-auto`/padding centering). Put global element rules inside `@layer base`. Also note v4 renames: `rounded` → `rounded-sm`, `outline-none` → `outline-hidden`, `bg-gradient-to-*` → `bg-linear-to-*`, `flex-shrink` → `shrink`.

**Other:** `src/routes/script.ts` proxies the self-hosted analytics script at `/script` (3 s timeout → 504; see `src/lib/script-proxy.ts`); Google Analytics is injected in the root route `head()`. `sitemap[.]xml.ts` and `robots[.]txt.ts` in `src/routes/` are generated server routes.

**Setup:** `cp .env.example .env` (optional; only sets `VITE_GOOGLE_ANALYTICS`). `package.json` pins Node 26.x. `src/routeTree.gen.ts` is generated by the TanStack router plugin; don't edit it by hand.
