# Portfolio

Personal portfolio and blog (prvnbist.com), built with TanStack Start (Vite + Nitro), React 18 and Tailwind 4. All content is local: articles are MDX files in `src/articles/`.

```bash
pnpm install
cp .env.example .env   # optional: VITE_GOOGLE_ANALYTICS
pnpm dev               # http://localhost:3000
```

Checks (the same ones CI runs):

```bash
pnpm lint && pnpm exec tsc --noEmit && pnpm test
pnpm build && pnpm test:e2e
```

Production: `pnpm build && pnpm start`.

To add an article, add `src/articles/<slug>.mdx` with `title`, `date` and `description` (at most 160 characters) in its frontmatter; the build fails if any are missing.

See `CLAUDE.md` for architecture and conventions.
