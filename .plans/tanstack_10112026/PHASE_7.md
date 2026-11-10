# Phase 7: Migrate SEO, Analytics and Infrastructure

Migrate the remaining Next.js-specific infrastructure.

## SEO

1. Migrate page titles and descriptions.
2. Migrate OpenGraph metadata.
3. Migrate Twitter card metadata.
4. Implement canonical URLs.
5. Implement dynamic article metadata.
6. Migrate sitemap generation.
7. Migrate robots.txt.

## Sitemap

Preserve existing behavior:

- Include all static portfolio routes.
- Discover articles by listing local MDX files.
- Generate /blog/{slug} URLs.
- Preserve existing canonical URL conventions.

## Analytics

Migrate:

- Google Analytics.
- Existing self-hosted analytics script.
- /script → https://analytics.prvnbist.com/script.js.

Implement /script using a server-side proxy or deployment-level reverse proxy.

Do not rely on Vite's development proxy for production.

## Environment variables

Ensure:

- GRAPH_CMS_URL remains server-only.
- Public analytics configuration is exposed safely.
- Production and development environments are supported.

## Acceptance Criteria

- All metadata is correct.
- Social previews work.
- Sitemap is valid XML.
- All articles appear in sitemap.
- Robots.txt works.
- Google Analytics works.
- Self-hosted analytics script loads.
- No secrets leak into client bundles.