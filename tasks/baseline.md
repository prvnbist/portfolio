# Baseline (T2)

Captured 2026-11-15 on `redesign` at `3be894d`, before any audit fixes. Later checkpoints (3 and 5) compare against this.

## How it was measured
- **Server:** the production build (`pnpm build`), served with `PORT=4319 node .output/server/index.mjs` on 127.0.0.1.
  - Port 4173 was already taken by another project's `vite preview`, so 4319 was used.
- **Lighthouse:** 12.8.2 with headless Chrome. Mobile form factor, default simulated throttling (slow 4G, 4× CPU).
- **Screenshots and runtime checks:** puppeteer-core with the local Chrome. The script scrolls each page first so the `whileInView` reveals have fired before the screenshot.
- **Caveat: compression.** The local Nitro node server sends JS **uncompressed** (`index-*.js` comes back with `content-length: 268897` and no `content-encoding`). That makes local LCP/FCP much worse than production on Vercel, which compresses. Compare later runs only against this table, measured the same way, not against the live site.
- **Caveat: timezone.** The machine is in Asia/Kolkata (IST).

## Lighthouse (mobile)

| Page | Perf | A11y | Best practices | SEO | FCP | LCP | CLS | TBT | Total bytes |
|---|---|---|---|---|---|---|---|---|---|
| `/` | 72 | 95 | 100 | 100 | 2.7 s | 6.9 s | 0 | 0 ms | 1,040 KiB |
| `/blog` | 77 | 95 | 100 | 100 | 2.6 s | 5.3 s | 0 | 50 ms | 920 KiB |
| `/blog/css-grid-cards-layout-and-aspect-ratio` | 64 | 91 | 75 | 92 | 4.4 s | 36.3 s | 0.001 | 20 ms | 6,827 KiB |
| `/code` | 71 | 100 | 100 | 100 | 2.7 s | 10.7 s | 0 | 0 ms | 1,841 KiB |
| `/design` | 72 | 97 | 100 | 100 | 2.4 s | 8.0 s | 0 | 20 ms | 2,020 KiB |

Failing audits:
- `/`: `color-contrast` (gray-500 date text, 4.11:1).
- `/blog`: `color-contrast`.
- **Article:**
  - `color-contrast`: code-block line numbers are 2.28:1.
  - `link-in-text-block`.
  - `meta-description`: missing (F-19).
  - `errors-in-console`: React **#418 hydration mismatch** ×3 and **#422**, in IST. The probable cause is F-01, date formatting without UTC; T3 should make these go away.
  - `third-party-cookies` and `inspector-issues`, both from the CodePen embed.
  - The LCP element is an article `<img>`, and the page loads two 2.9 MB GIFs (F-25).
- `/design`: `heading-order`.
- On `/`, the LCP element is a hero word `<span>`. Its timing depends on the blur/fade-in animation.

Full reports are in the scratchpad at `lh/<page>.report.html` and `.json`.

## Client JS

From the `vite build` client output (raw / gzip):

| Chunk | Raw | Gzip | Loaded on |
|---|---|---|---|
| `index-*.js` (React, router, Start runtime) | 268.9 kB | 89.7 kB | every page |
| `components-*.js` (shared UI + **framer-motion**) | 218.0 kB | 70.7 kB | every page |
| `routes-*.js` (home) | 10.3 kB | 4.0 kB | `/` |
| `blog-*.js` | 6.0 kB | 2.6 kB | `/blog` |
| `code-*.js` | 5.4 kB | 2.2 kB | `/code` |
| `design-*.js` | 2.9 kB | 1.3 kB | `/design` |
| `_slug-*.js` (×2) + `Content-*.js` | 6.0 kB | 2.3 kB | articles |
| article MDX chunk | 4.4–24.5 kB | 1.4–6.9 kB | the one article (css-grid is 11.0 / 3.2) |
| `jsx-runtime-*.js` | 8.0 kB | 3.1 kB | every page |

First-party JS fetched per page (uncompressed bytes, measured in the browser):

| Page | First-party JS |
|---|---|
| `/` | 496 KiB |
| `/blog` | 493 KiB |
| css-grid article | 502 KiB |
| `/code` | 491 KiB |
| `/design` | 489 KiB |

Third-party scripts, on every page:
- `googletagmanager.com/gtag/js`: 163 KiB transfer, 469 KiB uncompressed.
- `/script` (self-hosted analytics proxy): 3 KiB.
- The article also loads the CodePen embed: about 69 KiB transfer.

For T25: framer-motion lives in the 70.7 kB-gzip `components` chunk that every page loads. That's a large share of first-party JS, so T25 is worth doing.

## Screenshots

These are in the session scratchpad (`baseline/`), not in the repo:
- `<page>-375.png` and `<page>-1440.png` are full-page captures.
- `<page>-320.png` is a viewport-only capture.
- `hero-bottom-1440.png` shows where the hero ends on the home page.
- Pages: `home`, `blog`, `article`, `code`, `design`.
- Raw numbers for all of the above are in `baseline/results.json`.

The full path is `/private/tmp/claude-501/-Users-prvnbist--claude-spares-spare-Nx3LuI/3a930710-ab88-440d-8229-53cd5ca1ffa8/scratchpad/baseline/`. The scratchpad can be cleared, so copy it somewhere permanent if it needs to outlive the session. The capture script is next to it, at `tools/capture.mjs`, and can be re-run.

## Runtime checks of [R] findings

### F-40 · Navbar overflow at 320 px: **confirmed**
- On every page at a 320 px viewport, the nav row is **332 px** wide.
  - "code." starts at x = −12 and is cut off on the left.
  - "articles." ends at x = 332 and is cut off on the right.
  - "Praveen Bisht" wraps onto two lines.
- `documentElement.scrollWidth` is 332 against a `clientWidth` of 320. So the page scrolls sideways by 12 px **even with** the global `body { overflow-x: hidden }`, and removing that rule gives the same 332.
- In other words, the rule hides nothing here. It only risks breaking sticky positioning, which supports removing it in T29.

### F-16 · Low-contrast, thin text: **confirmed**
- `text-gray-500` (#6a7282) on the page background (#09090b) is **4.11:1**, below the 4.5:1 AA minimum. It shows up as:
  - timeline dates on `/` (12 px, weight 200);
  - article dates on `/blog` (11 px uppercase);
  - the `~/prvnbist $ …` prompt lines on `/blog`, `/code` and articles (14 px, weight 200).
- Code-block line numbers (`opacity-[0.3]`) are **2.28:1**.
- Weight-200 text (from the global `a, span, p` rule) is common: 25 of 36 distinct text styles on the article page, and 6 of 14 on `/`.
- Pills are 11 px.
- The gradient headings fade to transparent (`to-transparent`). In the screenshots the bottoms of the glyphs in "Articles" visibly dim. They are still legible at this size, but this wasn't measured automatically, so T22 should check it by hand.
- The ratio-1.0 results the script reported for the "Get in touch", "Code" and "View Project" buttons are **false positives**: those buttons have gradient backgrounds, which a computed background colour can't capture.

### F-37 · Band at the bottom of the hero: **not reproduced**
- The underlying inconsistency is real:
  - `body` resolves to `bg-zinc-950` = rgb(9, 9, 11). The utility class beats the `@layer base` value of `#19191c`.
  - The hero's fade overlay ends at `dark-400` = rgb(25, 25, 28).
- But the overlay sits inside a parent masked with `linear-gradient(to bottom, black 55%, transparent)`, so it's masked out at the bottom edge.
- Pixel samples at x = 40, from 60 px above the hero's bottom to 60 px below, go smoothly from rgb(11, 11, 13) to rgb(9, 9, 11). `hero-bottom-1440.png` shows no visible band.
- T15 should still unify the two background values and point the fade at the real background. It's a cleanup, not a visible bug.

### Other [R] findings seen along the way
- **F-41 (touch targets):** pills are about 22 px tall. Not measured precisely; that's left to T29.
- **F-01 (dates):** the hydration errors in IST above are strong evidence for this finding.
