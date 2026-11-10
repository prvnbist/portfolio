# Migration Audit: Next.js 14 → TanStack Start

Audit only. No application files were modified, no dependencies installed or removed.

## 1. Existing architecture overview

- Next.js 14.1.0 App Router, React 18, Tailwind 3 (PostCSS), framer-motion 11, Biome, pnpm. Path alias `@/*` → `src/*`.
- Deployed on Vercel (footer text; no `vercel.json`). No tests. No `middleware`, no API routes, no `next/headers`, `next/server`, `next/image`, no `robots` file.
- **Content sources**
  - Blog article *bodies + metadata*: local MDX in `src/articles/*.mdx` (10 files, gray-matter frontmatter: `title`, `date`, `tags`, optional `description`, `ogImage`).
  - Blog *list/tags* and the *design* page: Hygraph GraphQL via `graphql-request` (`src/lib/graphql.ts`, `src/queries/index.ts`). Used queries: `ARTICLES`, `ARTICLE_TAGS`, `DESIGNS`. Unused: `TIMELINES`, `CODES`.
  - Home timelines and code projects: hardcoded arrays in `src/app/page.tsx` and `src/app/code/page.tsx`.
- **Rendering model**: Server components do all data fetching (`fs`, GraphQL). `blog/[slug]/Content.tsx` is marked `'use client'` yet imports `next-mdx-remote/rsc` (an RSC-only API), so MDX is effectively compiled on the server per request/build.
- **Static generation**: `generateStaticParams` over `src/articles`; `sitemap.ts` lists the same dir. `/blog` and `/design` are dynamic (CMS fetch; `/blog` reads `searchParams`).
- **Client components**: Navbar (`usePathname`), blog `Search`/`Tags` (`useRouter`/`useSearchParams`), `header`, `timeline_item`, `design/project`, `code/project` (framer-motion / interactivity).
- **Styling**: Tailwind utilities, two CSS modules (`design.module.css`, `header.module.css`), `globals.css`. Custom colors `dark.*`, `blue.*`. Fonts via `next/font/google`: Bricolage Grotesque (`--font-heading`), IBM Plex Mono (`--font-code`).
- **Analytics**: (a) self-hosted script `<Script src="/script">` with `data-host-url`/`data-website-id`, backed by a `next.config.mjs` rewrite `/script` → `https://analytics.prvnbist.com/script.js`; (b) `@next/third-parties/google` `GoogleAnalytics` in production only.

## 2. Route mapping

| Next.js (`src/app`) | URL | Data | TanStack Start file route |
|---|---|---|---|
| `page.tsx` | `/` | hardcoded `TIMELINES` | `routes/index.tsx` |
| `code/page.tsx` | `/code` | hardcoded `PROJECTS` | `routes/code.tsx` |
| `design/page.tsx` | `/design` | Hygraph `DESIGNS` | `routes/design.tsx` (loader → server fn) |
| `blog/page.tsx` | `/blog?s=&tag=` | Hygraph `ARTICLES` + `ARTICLE_TAGS` | `routes/blog/index.tsx` with `validateSearch` + `loaderDeps` |
| `blog/[slug]/{layout,page}.tsx` | `/blog/:slug` | local MDX | `routes/blog/$slug.tsx` (+ layout route `routes/blog/$slug` wrapper or pathless layout) |
| `layout.tsx` | all | fonts, analytics, Navbar, footer | `routes/__root.tsx` |
| `sitemap.ts` | `/sitemap.xml` | dir listing | server route `routes/sitemap[.]xml.ts` (or build-time generated static file) |
| `globals.css` | | | imported in root via `?url` link |
| `public/` | | | unchanged (`public/` is also served by Vite) |

Metadata: each page's `metadata` / `generateMetadata` → route `head()` returning `meta` and `links`.
Per-page SEO that must be preserved: title, description, keywords, applicationName, `metadataBase`, OpenGraph (`type`, `url`, `title`, `description`, `images`), Twitter (`card: summary_large_image`, `site: @prvnbist`, `title`, `description`, `images`). Note: `/blog/[slug]` sets OG `type: 'website'` (kept as-is unless you want `article`).

## 3. Dependency migration table

| Package | Role | Action |
|---|---|---|
| `next` 14.1.0 | framework | **Remove** → `@tanstack/react-start`, `@tanstack/react-router`, `vite`, `@vitejs/plugin-react` (+ `vite-tsconfig-paths` for `@/*`) |
| `@next/third-parties` | GA component | **Remove** → inline gtag `<script>` in root `head()` (prod only) |
| `next-mdx-remote` | MDX render | **Replace** → `@mdx-js/mdx` (`evaluate`/`compile`) or `@mdx-js/rollup` (see risks) |
| `remark-mdx-code-meta` | code meta | Keep (works with `@mdx-js/mdx`) |
| `gray-matter` | frontmatter | Keep (server-only; uses `fs`/`eval`-ish engines → keep off client bundle) |
| `prism-react-renderer` | highlighting | Keep |
| `graphql`, `graphql-request` | CMS client | Keep (server fn only) |
| `framer-motion` | animation | Keep (v11 works with React 18/19) |
| `react`/`react-dom` ^18 | | Keep, or bump to 19 (TanStack Start supports 18.3+/19) |
| `clsx`, `tailwind-merge`, `lodash.debounce` | utils | Keep |
| `tailwindcss` 3, `postcss`, `autoprefixer` | styling | Keep; Tailwind v3 works via PostCSS under Vite (v4 upgrade optional, out of scope) |
| `@biomejs/biome` | lint/format | Keep |
| `typescript`, `@types/*` | | Keep; `@types/node` still needed. Update `tsconfig` (drop `next` plugin, `jsx: react-jsx`) |
| `next-env.d.ts`, `next.config.mjs` | | Delete at cutover; replace with `vite.config.ts` |
| `@fontsource-variable/bricolage-grotesque`, `@fontsource/ibm-plex-mono` | fonts | **Add** (replaces `next/font/google`) |

Scripts: `dev` → `vite dev --port 3000`, `build` → `vite build`, `start` → per chosen deploy target.

## 4. Next.js API replacement map

| Next API | Where used | TanStack Start replacement |
|---|---|---|
| `next/link` | Navbar, header, code/project, blog Articles, blog [slug] | `Link` from `@tanstack/react-router` (`href` → `to`; search params via `search={{...}}`; external links stay `<a>`) |
| `next/navigation` `usePathname` | Navbar | `useLocation().pathname` / `useRouterState` |
| `useRouter().push`, `useSearchParams` | blog Search, Tags | `useNavigate({ from: '/blog' })` with `search`, and `Route.useSearch()` |
| `next/font/google` | root layout | `@fontsource*` imports + CSS variables `--font-heading`, `--font-code` (preserve names so Tailwind/CSS keep working) |
| `next/script` | root layout | `<script>` in `head()` `scripts` array |
| `@next/third-parties` GA | root layout | manual gtag snippet, gated by `import.meta.env.PROD` |
| `Metadata` / `generateMetadata` | all pages | route `head()` (`meta`, `links`) |
| `MetadataRoute.Sitemap` | sitemap.ts | server route returning XML |
| `generateStaticParams` | blog [slug] | Start prerender config (`prerender.crawlLinks`) or explicit `pages` list |
| `async` server components | all data fetching | route `loader` calling `createServerFn` for `fs`/GraphQL |
| `searchParams` prop | blog | `validateSearch` + `loaderDeps` |
| `process.env.NODE_ENV` | layout, Content | `import.meta.env.PROD/DEV` |
| `process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS` | layout | `import.meta.env.VITE_GOOGLE_ANALYTICS` (client-exposed → rename) |
| `process.env.GRAPH_CMS_URL` | graphql.ts | `process.env.GRAPH_CMS_URL` inside server fns only (never `VITE_`) |
| `process.cwd()` + `src/articles` | blog, sitemap | See MDX risk: `import.meta.glob` with `?raw` is preferred over runtime `fs` |
| `rewrites()` in next.config | `/script` proxy | Vite dev proxy + host-level rewrite in production (or a server route that proxies) |
| `'use client'` | 7 files | Delete directive (everything is isomorphic by default) |
| `next/image`, `next/headers`, `next/server` | **not used** | n/a |

## 5. Environment variables & deployment

- `GRAPH_CMS_URL` (server-only; required for `/blog`, `/design`).
- `NEXT_PUBLIC_GOOGLE_ANALYTICS` → rename to `VITE_GOOGLE_ANALYTICS`; update `.env`, Vercel project settings, CLAUDE.md.
- Hardcoded: Umami-style website ID `9ba1c9a6-…`, host `analytics.prvnbist.com`, base URL `https://www.prvnbist.com`.
- Deploy: currently Vercel. TanStack Start deploys via Nitro presets (`vercel`, `node-server`, etc.); pick preset at config time.

## 6. Risks

1. **MDX without RSC (highest).** `next-mdx-remote/rsc` has no equivalent in Start. Options: (a) `@mdx-js/mdx` `evaluate` in the loader on the server and ship compiled code / render client-side via `run`; (b) `@mdx-js/rollup` compiling `.mdx` imports at build time (best perf, needs frontmatter plugin `remark-frontmatter` + `remark-mdx-frontmatter`, replaces `gray-matter` for body parsing). Custom `components` map (including `Video`, `pre → CodeBlock`) must stay compatible. Verify all 10 articles compile (some may have MDX-invalid syntax that `next-mdx-remote` tolerated).
2. **Filesystem access in production.** `fs.readdirSync('src/articles')` relies on the source tree existing at runtime. In a Nitro/serverless bundle it often won't. Use `import.meta.glob` (bundled at build) for both article listing, prev/next, and sitemap.
3. **Prerender / SSG parity.** Next statically generates blog pages and the sitemap. Start needs explicit prerender setup; otherwise SEO pages become SSR-per-request. SSR is acceptable but sitemap + OG head tags must be in the SSR HTML (they are, via `head()`).
4. **Search params behavior.** `/blog` re-fetches on every `?s=`/`?tag=` change. Needs `loaderDeps`; the debounced input should use controlled/`defaultValue` from the route search, and avoid the stale `useSearchParams` closure bug in the current code.
5. **Analytics proxy.** The `/script` rewrite is host config in Next. Must be recreated (Vite `server.proxy` for dev; Vercel `rewrites` / Nitro `routeRules: { '/script': { proxy: ... } }` for prod). Ad-blocker-evasion purpose means it must remain same-origin.
6. **Fonts.** Switching to Fontsource changes loading mechanism (no automatic preload/size-adjust). Plex Mono weight 400 only; Bricolage is variable. Watch for layout shift.
7. **Env var rename** (`NEXT_PUBLIC_` → `VITE_`) will silently disable GA if missed in deploy settings.
8. **Styling gotchas.** CSS modules and Tailwind carry over. Pre-existing issues to be aware of (not migration blockers): `focus:(outline-none ...)` in `Search.tsx` is Windi syntax and does nothing in Tailwind; `tailwind.config` `content` glob is unchanged.
9. **Pre-existing quirks to decide on:** `Content.tsx` `'use client'` + RSC import; `getArticle` re-reads every MDX file per request; stray empty `app/` directory at repo root; footer text says "NextJs" (update copy); `CLAUDE.md` describes Next and needs updating post-migration.
10. **Hydration.** `new Date().getFullYear()` in the footer and `Intl.DateTimeFormat` use are SSR-safe, but verify no timezone-related mismatches on dates.
11. **Maturity.** TanStack Start is young; pin exact versions and expect API drift (file naming, `createServerFn` signature, vite plugin name). Check current docs at implementation time.

## 7. Recommended target architecture

```
vite.config.ts             tanstackStart() + react() + tsconfigPaths(), nitro preset, proxy for /script
src/
  router.tsx               createRouter
  routes/
    __root.tsx             html shell, head(): fonts css, tailwind css, analytics, GA; Navbar, footer
    index.tsx  code.tsx  design.tsx
    blog/index.tsx         validateSearch({ s, tag }), loaderDeps
    blog/$slug.tsx         loader → article (meta, compiled MDX, prev/next); head() from meta
    sitemap[.]xml.ts       server route
  server/
    cms.ts                 createServerFn wrappers: getArticles, getTags, getDesigns (graphql-request)
    articles.ts            import.meta.glob('../articles/*.mdx', { query: '?raw' }) + gray-matter + MDX
  components/ sections/ utils.ts   (moved as-is; swap Link/navigation imports)
  styles/globals.css
src/articles/*.mdx         unchanged
```

Principles: move code with minimal edits, keep Tailwind/CSS identical, keep server-only code (GraphQL client, `gray-matter`, env) out of the client bundle via server functions.

## 8. Phase-wise implementation plan

| Phase | Scope | Exit criteria |
|---|---|---|
| 0 | This audit | MIGRATION.md approved |
| 1 | Scaffold: install Start/Vite deps, `vite.config.ts`, `tsconfig`, `router.tsx`, `__root.tsx` (shell, CSS, fonts), dev server boots. Remove Next deps at the end of phase | `pnpm dev` renders empty shell with fonts/Tailwind |
| 2 | Static pages: Navbar, `/`, `/code`; replace `next/link`/`usePathname`; head() SEO | Visual parity on `/` and `/code` |
| 3 | CMS: server-fn GraphQL layer; `/design`; `/blog` list with search/tag via route search params | Search/tag filtering works, shareable URLs |
| 4 | MDX: article loading via `import.meta.glob`, MDX compile pipeline, `CodeBlock`, components map, `/blog/$slug`, prev/next, per-article `head()` | All 10 articles render identically; code highlighting + line highlight work |
| 5 | SEO & analytics: sitemap route, OG/Twitter parity, GA (prod), `/script` proxy, env rename | Meta tags diff-checked against current prod; analytics script loads same-origin |
| 6 | Prerender/deploy: Nitro preset, prerender blog pages, Vercel env vars, preview deploy | Preview deploy passes smoke test of all routes |
| 7 | Cleanup: delete `next.config.mjs`, `next-env.d.ts`, stray `app/`; update CLAUDE.md, README, footer copy, scripts; lint/format | `pnpm lint` clean, no `next` references |

## 9. Summary of top risks & decision points (need your approval)

1. MDX pipeline choice: `@mdx-js/rollup` build-time (recommended) vs. runtime `@mdx-js/mdx` evaluate.
2. Rendering mode: prerender blog articles (recommended) vs. SSR only.
3. Deploy target: stay on Vercel via Nitro preset (recommended) or move.
4. Whether to also bump React 18 → 19 (recommended: keep 18 for this migration, upgrade separately).
5. `NEXT_PUBLIC_GOOGLE_ANALYTICS` → `VITE_GOOGLE_ANALYTICS` rename requires updating deployment env.
