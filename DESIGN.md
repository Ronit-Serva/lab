# Research lab design system

Use this reference when adding pages or reusing the visual design. The Astro project is the executable reference; keep the existing framework and content collections.

## Visual direction

Deep charcoal surfaces, grainy moving color, sharp diagonal edges, fine horizontal and vertical rules, and generous space. Use the gradient to introduce a page; keep the reading surface quiet. Avoid rounded cards, shadows, dotted backgrounds, serif type, and competing primary actions.

## Shared source

- `src/layouts/PageLayout.astro` loads the local fonts, shared styles, header, footer, search, and accessible skip link. It adds `lab-theme` to every page and `home-page` or `inner-page` for layout differences.
- `src/styles/global.css` provides base layout and functional components.
- `src/styles/design.css` owns the visual tokens, shared chrome, homepage composition, and gradient animation.
- `src/styles/inner.css` applies the same system to collections, reading pages, story, contact, search, and the 404 page.
- `src/components/GradientField.astro` provides the reusable decorative grain and gradient markup. Put it inside an isolated, relatively positioned introduction.

## Tokens

| Purpose | Value |
| --- | --- |
| Page | `#101413` |
| Raised surface | `#181e1c` |
| Soft surface | `#202824` |
| Primary text | `#edf2ef` |
| Supporting text | `#adb9b2` |
| Rules | `#35413b` |
| Accent and focus | `#c9e5d5` |
| Typeface | Locally served Inter, weights 400, 500, 600 |
| Body | 18px / 28px; long prose uses 1.75 line height |
| Introductory copy | 20px / 28px desktop, 18px / 28px mobile |
| Labels | 14px / 20px, sentence case |
| Links and controls | 16px / 24px |
| Main headings | 72–96px desktop, 36–48px mobile |
| Section headings | 36–48px |
| Content titles | 24–36px |
| Outer width | 1280px; do not widen without a new request |
| Page gutters | 48px desktop, 32px tablet, 24px mobile |
| Spacing | 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96px |
| Motion curve | `cubic-bezier(0.22, 1, 0.36, 1)` |

## Composition and behavior

- Align the navigation, hero, content frame, and footer to the same outer rails.
- Give each section a fine horizontal boundary. On desktop, divide metadata from reading content with a vertical rule and 32px of inset. Stack these regions on mobile and remove the vertical rule.
- Keep paragraph measures below roughly 65 characters even when the surrounding layout is wider.
- Use the shared muted copper, violet, and teal gradient with its SVG grain overlay. Animate transforms slowly over 24 seconds, and stop the animation under `prefers-reduced-motion`.
- Reading introductions use the same gradient at lower opacity. Prose itself stays on the dark background.
- Keep clear hover, pressed, keyboard focus, current navigation, search, filter, and empty states. Retain semantic headings and real links.
- Homepage sections reveal once using IntersectionObserver. Content stays visible if JavaScript or the observer is unavailable.
- Preserve documented project statuses, draft exclusions, citations, and content relationships. Do not invent project results or demos.

## Reuse

For another page in this site, use `PageLayout`, existing content components, and these shared styles. For a new site, copy the layout and styles and replace personal content and branding. Run `npm run verify` after integration and inspect responsive layouts when a browser connection is available.
