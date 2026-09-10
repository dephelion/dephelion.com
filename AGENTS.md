# AGENTS.md

Guidance for AI coding agents (and humans) working in this repo.

## What this is

The one-page site for **Dephelion**. Next.js 14 (App Router) + TypeScript +
Three.js, static-exported to plain HTML and deployed to GitHub Pages at
**dephelion.com**. The whole viewport is a WebGL black hole; a small amount of
real text (h1, tagline, about, contact) sits over it for SEO and accessibility.

## Golden rules

- **`main` is protected. Never commit or push to `main` directly.** Branch → PR →
  green CI → merge.
- Keep it a pure static export: no server, no runtime env, no API routes.
- No secrets. Everything here is public and MIT-licensed.
- Match the existing style; run `npm run format` and `npm run lint` before
  committing.
- Don't regress SEO: unique `<title>` + description, canonical, OG/Twitter tags,
  `Organization` + `WebSite` JSON-LD, a real `<h1>` and text content, plus
  `sitemap.xml` / `robots.txt` from the build.

## Layout

| Path                           | What                                                                                                                                                                                          |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/`                     | `page.tsx`, `layout.tsx` (shell + metadata + JSON-LD), `sitemap.ts`, `robots.ts`, `manifest.ts`, `not-found.tsx`, `icon.png` / `apple-icon.png` / `opengraph-image.jpg` / `twitter-image.jpg` |
| `src/components/`              | `BlackHoleScene.tsx` (owns the `<canvas>`), `ContactButton.tsx`, `Footer.tsx`                                                                                                                 |
| `src/lib/space/`               | Framework-agnostic Three.js scene. `index.ts` = `initBlackHoleScene(canvas)` → cleanup fn; `bodies/*` each implement `SceneBody` (`types.ts`)                                                 |
| `src/lib/site.ts`              | Canonical URL, brand copy, SEO constants                                                                                                                                                      |
| `src/lib/contact.ts`           | Contact address stored as char codes, assembled at runtime on user intent — never a scrapeable literal in the source or bundle                                                                |
| `src/lib/fps.ts`               | Optional allocation-free FPS meter for the render loop                                                                                                                                        |
| `public/`                      | `CNAME` (dephelion.com), `.nojekyll`, `dephelion-logo.jpg`                                                                                                                                    |
| `.github/workflows/deploy.yml` | CI: lint + format:check + test + build on every PR; deploy `out/` on `main`                                                                                                                   |
| `.local/`                      | Git-ignored source assets (the logo the icons/OG images were cut from)                                                                                                                        |

## Commands

```bash
npm install
npm run dev            # localhost:3000
npm run build          # static export to out/
npm test               # jest — ContactButton + site constants only
npm run lint
npm run format
npm run format:check   # CI gate
```

## Tests

Deliberately narrow — core functionality only: the contact CTA reveal + copy,
the email obfuscation, and the shape of `src/lib/site.ts`. The WebGL scene is
not unit-tested.

## Scene notes

- `initBlackHoleScene` reads `prefers-reduced-motion`: it stops star drift, slows
  the black hole, and drops the meteor field.
- No WebGL → `initBlackHoleScene` returns a no-op and the CSS `.starry` fallback
  on `<body>` stays visible.
- Bodies talk to the orchestrator only through the `SceneBody` shape. Add a new
  body as its own file under `bodies/` and compose it in `buildLayers`.
