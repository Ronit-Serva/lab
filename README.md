# Ronit Serva — Projects, research & experiments

A personal portfolio and research notebook built with Astro and TypeScript. It showcases Ronit’s projects, ongoing investigations, writing, background, and contact links, including an A2A/x402 agentic payments learning prototype and a live personal finance app.

The website uses a dark theme, locally served Inter fonts, optimized photographs, responsive layouts, accessible navigation, local search, and collection filters. Markdown content is validated at build time and rendered as static pages. No database, runtime secrets, or external API is required.

## Run locally

Use Node.js 22.19+ (or a newer supported LTS) and npm. From the workspace root, which contains `vercel.json` and the `lab/` directory:

```sh
npm ci
npm run dev
```

Open the address printed by Astro, normally http://127.0.0.1:4321. Stop the server with Ctrl+C. If a server was already running before installing dependencies, restart it.

```sh
npm run verify   # Type/content checks, production build, and generated-site tests
npm run preview  # Serve the completed production build locally
```

Application source lives in `lab/src/`, public assets in `lab/public/`, and production output in `lab/dist/`. The root scripts select `lab/` automatically.

If your checkout contains only the Astro application (this README sits beside `astro.config.mjs` and `src/`), run the same commands there. Its production output is `dist/`. Both package manifests declare the Inter font imported by the layout; use `npm ci` in the directory from which you run the app.

## Deploy on Vercel

Push the project to GitHub, GitLab, or Bitbucket, then import the repository as a new Vercel project. For the full workspace layout, keep **Root Directory** at the repository root (`.`), select the **Astro** framework preset, and use the settings already supplied by `vercel.json`:

| Setting | Value |
| --- | --- |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `lab/dist` |
| Node.js version | 22.x (22.19 or later), or a newer supported LTS |

If the imported repository contains only the Astro application, or you explicitly set Root Directory to `lab`, use **Output Directory** `dist` instead. The workspace’s root `vercel.json` applies only when deploying from the workspace root.

Optionally set `PUBLIC_SITE_URL` to your final public origin, including `https://` (for example, `https://your-domain.com`). This controls canonical links, social URLs, and the sitemap. Without it, builds use Vercel’s `VERCEL_PROJECT_PRODUCTION_URL` when available, and `http://localhost:4321` during local development. Redeploy after changing the domain or environment variable. If Vercel system environment variables are disabled, set `PUBLIC_SITE_URL` explicitly for production builds.

Click **Deploy**. Connected Git branches receive preview deployments, and pushes to the production branch update production. For a CLI deployment, run these commands from the directory whose build/output settings you selected:

```sh
npx vercel         # Link the project and create a preview deployment
npx vercel --prod  # Deploy to production
```

This is a static Astro site, so no server adapter is required. See the [Astro deployment guide](https://docs.astro.build/en/guides/deploy/vercel/) and [Vercel build settings](https://vercel.com/docs/builds/configure-a-build).

## Publish content

Create a `.md` file in `lab/src/content/investigations`, `lab/src/content/projects` or `lab/src/content/articles` (omit `lab/` in an application-only checkout). Its filename is the URL slug. Schemas live in `src/content.config.ts`; collections and relationship validation live in `src/lib/content.ts`.

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

The following paths are relative to `lab/` in the full workspace:

- `src/lib/site.ts`: LinkedIn, shared description and the “Still curious” questions.
- `src/pages/story.astro`: grounded narrative and education.
- `src/styles/design.css` and `src/styles/inner.css`: shared visual system and responsive layouts; `DESIGN.md` documents reuse.
- `src/portrait.jpg`: the supplied original image. Astro generates responsive WebP variants without cropping.
- `astro.config.mjs`: canonical origin for SEO and sitemap. Set it to your domain when hosting elsewhere.

## Initial content and editorial decisions

The portfolio leads with projects. The A2A/x402 entry documents a public learning reimplementation of arXiv:2507.19550, credits its authors, and links the GitHub repository and Ronit’s published Medium article. Repository-documented checks are described without claiming independent reproduction. The Serva personal finance app links to its live site. The article listing links to the original Medium publication rather than reproducing its text. No publication date is invented. Handwriting entries remain private drafts. Email and exact location are omitted.
