# Implementation Plan: Remove the Hygraph dependency

Source: `SPEC.md`. Tasks tracked in `tasks/todo.md`.

## Overview
Replace every Hygraph touchpoint (designs, blog index/tags, hosted images) with local data so the
site builds and runs with no `.env` and no network. Work proceeds in vertical slices; the GraphQL
client is deleted only after a parity check against live Hygraph data.

## Dependency graph
```
T1 snapshot Hygraph (designs, article index, thumbnails)   <- needs Open Question 1 answered
 ├── T2 blog index from frontmatter (parity vs snapshot)
 ├── T3 designs from src/data/designs.ts (uses snapshot + thumbnails)
 └── T4 MDX images -> public/ (independent of T1, can run in parallel)
        T2 + T3 + T4 -> T5 delete client, queries, deps, env var -> T6 docs
```

## Architecture decisions
- Blog filtering is a pure `filterArticles(all, { s, tag })` over frontmatter-derived `ArticleMeta[]`, run inside the existing `getBlogIndex` server fn (keeps loader/search-param wiring unchanged).
- Designs are static data imported directly by the route; no server fn, no error branch.
- The `CmsResult`/`safely` wrapper disappears with `cms.ts`; routes use plain data.
- Snapshot JSON lives in the scratchpad (not committed); only `designs.ts` and images are committed.

## Tasks
See `tasks/todo.md` for the checklist with acceptance criteria and verification. Phases:
1. **Safety net** (T1) — capture the source of truth before touching anything.
2. **Vertical slices** (T2, T3, T4) — each leaves the site working.
3. **Removal** (T5) — only after checkpoint passes.
4. **Docs** (T6).

## Risks and mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| Design data exists only in Hygraph; API unreachable or content changed | High | T1 first; fail fast. If blocked, owner supplies data. |
| Frontmatter differs from CMS (tags, dates, titles) so listing changes | Med | T2 diffs against snapshot; mismatches reported, not silently fixed. |
| CMS-only articles (no `.mdx`) disappear from listing | Med | Listed in T1/T2 report; owner confirms (Open Q3). |
| Downloaded images lose format/quality or filename traceability | Low | Byte-for-byte download, old media id -> new path map recorded in PR. |
| `search` semantics differ from `title_contains` | Low | Verify during T2 against live API. |

## Open questions (block T1/T2 until answered)
1. OK to run a one-off read-only query against the `.env` URL? (T1)
2. Search = case-insensitive substring acceptable? (T2)
3. Drop CMS entries that have no `.mdx`? (T2)
4. Branch: stay on `redesign` or create a new one? (before first commit)
