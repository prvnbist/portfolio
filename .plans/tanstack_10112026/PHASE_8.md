# Phase 8: Production Deployment and Cleanup

Prepare the TanStack Start application for production.

## Deployment

1. Inspect existing hosting and deployment configuration.
2. Configure the appropriate TanStack Start production adapter.
3. Configure production build output.
4. Configure production environment variables.
5. Verify SSR in the production environment.
6. Verify analytics proxy behavior.
7. Verify static assets and caching.
8. Verify error handling and 404 behavior.

## Cleanup

After confirming all migrations are complete:

1. Remove Next.js dependencies.
2. Remove next.config.mjs.
3. Remove obsolete Next.js-specific configuration.
4. Remove unused packages.
5. Remove dead code.
6. Update package.json scripts.
7. Update project documentation.
8. Update CLAUDE.md to reflect the new architecture and commands.

## Regression checklist

### Routes
- [ ] /
- [ ] /blog
- [ ] /blog/:slug
- [ ] /code
- [ ] /design

### Blog
- [ ] Article listing
- [ ] Search
- [ ] Tag filtering
- [ ] Article rendering
- [ ] MDX components
- [ ] Code highlighting
- [ ] Missing article handling

### SEO
- [ ] Metadata
- [ ] OpenGraph
- [ ] Twitter cards
- [ ] Canonical URLs
- [ ] Sitemap
- [ ] Robots.txt

### Infrastructure
- [ ] SSR
- [ ] Production build
- [ ] GraphQL integration
- [ ] Google Analytics
- [ ] Self-hosted analytics
- [ ] Environment variables

### Quality
- [ ] pnpm build
- [ ] pnpm lint
- [ ] pnpm format
- [ ] No TypeScript errors
- [ ] No hydration errors
- [ ] No broken links
- [ ] No remaining Next.js imports

## Final deliverable

Update CLAUDE.md with:

- New architecture.
- Routing conventions.
- Server-side data fetching conventions.
- MDX content architecture.
- Environment variables.
- Commands.
- Deployment instructions.

Provide a summary of all removed and added dependencies and any outstanding technical debt.