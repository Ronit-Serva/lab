# Ronit’s research laboratory

A static Astro + TypeScript website. Source content is Markdown; the site ships minimal JavaScript for navigation, local search and filters. Fonts and optimized photographs are served locally.

## Run it

Run these commands from `lab/` or the workspace root. Use Node 22.19+ (or a supported newer LTS).

```sh
npm ci
npm run dev
```

Open the local address printed by Astro. `npm run verify` checks TypeScript/content, builds the site, and verifies generated links, anchors, metadata and draft exclusion. `npm run preview` serves the production build. Output is in `lab/dist/` (or `dist/` when running from `lab/`).

## Publish content

Create a `.md` file in `src/content/investigations`, `projects` or `articles`. Its filename is the URL slug. Schemas live in `src/content.config.ts`; collections and relationship validation live in `src/lib/content.ts`.

Common frontmatter:

```yaml
title: A precise title
summary: A short description grounded in the actual work.
topics: [AI & Agents]
visibility: public
draft: false
featured: true
order: 1
related:
  - collection: investigations
    id: agentic-payments-and-trust
    reason: Explain the connection honestly.
references:
  - title: Primary-source title
    url: https://example.org/actual-source
```

Default visibility is private and default draft is true. Both must be changed deliberately to publish.

- `public` + `draft: false`: route generated, included in lists, global search and sitemap.
- `unlisted` + `draft: false`: route generated with noindex; excluded from lists, search and sitemap. This is **not access control**—anyone with the URL can read it.
- `private` or `draft: true`: no route generated, absent from search and sitemap. Markdown source still exists in the source repository; do not store secrets there.

A visible entry cannot reference a private or draft entry. Missing relationships fail the build. Use the filename slug, without the `.md` suffix.

### Investigations

Also require `question`, `status` and `openQuestions` (a nonempty list). Allowed statuses: Exploring, Researching, Prototyping, Published, Paused. Write the body with level-two headings; the reading layout generates a table of contents. Findings need supporting sources. Hypotheses and proposals should be labeled clearly.

### Projects

Also require `status`: Built · self-reported, Prototype, In development, Concept, Learning reimplementation, or Live app. Use `stack` only for confirmed technologies or an explicitly labeled planned approach. Optional `repoUrl` and `demoUrl` display only when real URLs are supplied. Interactive local demonstrations can be added as an Astro component to the relevant project detail template; keep actual model inference separate from illustrative diagrams.

### Writing

Copy the private `src/content/articles/writing-template.md` to a new slug, replace its content, select `type` (Research article, Essay, Field note or Build log), then set visibility and draft deliberately. Optional `publishedAt` and `updatedAt` use real `YYYY-MM-DD` dates. No publication dates are invented. The `/writing/[slug]/` template renders Markdown, headings, tables, code, citations as links, and related work automatically. The index and homepage populate when public articles exist. Use `externalUrl` for a published article hosted elsewhere; listing links open that original article, while the local page retains a short project connection and source link. Omit publication dates when unknown.

## Edit the personal information and design

- `src/lib/site.ts`: LinkedIn, shared description and the “Still curious” questions.
- `src/pages/story.astro`: grounded narrative and education.
- `src/styles/design.css` and `src/styles/inner.css`: shared visual system and responsive layouts; `DESIGN.md` documents reuse.
- `src/portrait.jpg`: the supplied original image. Astro generates responsive WebP variants without cropping.
- `astro.config.mjs`: canonical origin for SEO and sitemap. Set it to your domain when hosting elsewhere.
- `.openai/hosting.json`: Sites identity and static output configuration.

## Initial content and editorial decisions

The portfolio leads with projects. The A2A/x402 entry documents a public learning reimplementation of arXiv:2507.19550, credits its authors, and links the GitHub repository and Ronit’s published Medium article. Repository-documented checks are described without claiming independent reproduction. The Serva personal finance app links to its live site. The article listing links to the original Medium publication rather than reproducing its text. No publication date is invented. Handwriting entries remain private drafts. Email and exact location are omitted.

Hosted on ChatGPT Sites at https://ronit-research-lab.heartyrook128.chatgpt.site. The canonical origin defaults to this URL; `PUBLIC_SITE_URL` can override it for another host. This website needs no runtime secrets, database or external API.
