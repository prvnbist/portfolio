# Task list: Remove Hygraph

## Phase 1: Safety net
- [x] **T1: Snapshot Hygraph data and thumbnails** (S)
  - Acceptance: scratchpad JSON of `designs` and `articles` (id, title, date, tags, path) exists; design thumbnails downloaded to `public/images/design/`; list of CMS-only articles (no `.mdx`) reported.
  - Verify: counts printed; every thumbnail file opens; nothing committed except images.
  - Depends on: Open Q1. Files: `public/images/design/*`.

## Phase 2: Vertical slices
- [x] **T2: Blog index from MDX frontmatter** (M)
  - Acceptance: `/blog` lists all `.mdx` articles by date desc; tags = sorted unique frontmatter tags; `?s=` and `?tag=` work and combine; `getBlogIndex` no longer imports `cms.server`; no error branch in `blog/index.tsx`.
  - Verify: `pnpm lint`; `pnpm dev` smoke `/blog`, `/blog?s=react`, `/blog?tag=hasura`, combined; diff titles/dates/tags/order against T1 snapshot.
  - Depends on: T1. Files: `src/lib/articles.server.ts`, `articles.ts`, `articles.types.ts`, `src/routes/blog/index.tsx`, `src/app/blog/components` (types only).
- [x] **T3: Designs from `src/data/designs.ts`** (S)
  - Acceptance: `/design` renders same count, order, text as snapshot with local thumbnails; no `getDesigns`; error branch removed.
  - Verify: `pnpm lint`; visual check of `/design`; Network tab shows no external image requests.
  - Depends on: T1. Files: `src/data/designs.ts`, `src/lib/design.types.ts` (or reuse type), `src/routes/design.tsx`, `src/app/design/project.tsx` if needed.
- [x] **T4: Move MDX images to `public/`** (M)
  - Acceptance: all 14 `media.graphcms.com` refs in 7 articles rewritten to `/images/articles/<slug>/...`; files downloaded unmodified; old-id -> new-path map recorded.
  - Verify: `grep -r "graphcms" src/articles` empty; open each of the 7 articles, all images load.
  - Depends on: none. Files: 7 `src/articles/*.mdx`, `public/images/articles/**` (split into two commits if >5 files).

### Checkpoint: slices done
- [ ] `pnpm build` passes; `/design`, `/blog` (all filter combos), every article render correctly
- [ ] Parity report from T1/T2 reviewed by human before deletion

## Phase 3: Removal
- [ ] **T5: Delete Hygraph client and config** (S)
  - Acceptance: removed `src/lib/cms*.ts`, `graphql.server.ts`, `src/queries/`, unused `src/type.ts` types, `graphql` + `graphql-request` deps, `GRAPH_CMS_URL` from `.env`, `.env.example`, `vite-env.d.ts`.
  - Verify: leftover grep from SPEC empty; `.env` moved aside and `pnpm build` succeeds offline; `pnpm precommit` clean.
  - Depends on: T2, T3, T4. Files: ~8 deletions, `package.json`, `pnpm-lock.yaml`, env files.

## Phase 4: Docs
- [ ] **T6: Update CLAUDE.md and README.md** (XS)
  - Acceptance: CLAUDE.md describes a single content source (MDX frontmatter + local data), correct file paths, no `GRAPH_CMS_URL`; README fixes "Tailwind 3" and the env step.
  - Verify: re-read both; commands still accurate.
  - Depends on: T5. Files: `CLAUDE.md`, `README.md`.

### Checkpoint: complete
- [ ] All SPEC acceptance criteria met; zero `graphcms.com` network requests; ready for review
