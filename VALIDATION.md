# Validation record

Validated on 13 October 2026.

- Astro check: 29 source files, zero errors, warnings or hints.
- Static production build: 12 HTML pages plus sitemap and robots file.
- Generated-site tests: all four passed. Internal links and reading anchors resolve; private drafts stay out of routes, search and sitemap; metadata and skip links exist; documented project statuses are retained.
- Chrome: 55 page/viewport checks across 11 populated routes at 1440, 1024, 800, 390 and 320 pixels. No horizontal overflow, missing images or page errors.
- Interaction checks: theme/status/query filters, combined-filter empty state, reset, global search, no-result search, Ctrl/Cmd+K, Escape, search navigation, mobile menu, skip link and no-JavaScript navigation passed.
- Original photo: full aspect ratio preserved; responsive WebP variants generated from the supplied JPG.
- Dependencies: patched Astro 7.3.8 and Sharp 0.35.5; installation audit reports zero vulnerabilities.

Local screenshots and detailed browser results are in ignored `qa/`. `scripts/browser-qa.mjs` uses the locally installed Chrome; adjust the executable path on other machines. The repeatable build checks are available through `npm run verify`.

No article bodies, training artifacts, finance app screenshots or project repositories were supplied. Those are editorial gaps, not fabricated content. The initial website deliberately retains the documented statuses and an empty writing library.
