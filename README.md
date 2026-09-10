# dephelion.com

[![CI / Deploy](https://github.com/dephelion/website/actions/workflows/deploy.yml/badge.svg)](https://github.com/dephelion/website/actions/workflows/deploy.yml)

The one-page site for **Dephelion** — _Expand Your Digital Horizon_.

Dephelion is an independent software development and open-source lab founded by
[Julio Cesar Martin](https://depre.net), focused on high-performance web
applications, AI integrations, and developer tooling.

The whole page is a real-time WebGL black hole: a spinning accretion disk over a
deep field of streaming stars, a distant galaxy, and an emission nebula. Built
with Next.js (App Router) + TypeScript + Three.js, exported to plain static HTML
and served from GitHub Pages at **dephelion.com**.

## Stack

| Piece     | Choice                                                      |
| --------- | ----------------------------------------------------------- |
| Framework | Next.js 14 (App Router), static export (`output: 'export'`) |
| Language  | TypeScript (strict)                                         |
| 3D        | Three.js — scene code in [`src/lib/space/`](src/lib/space/) |
| Font      | JetBrains Mono (`next/font`)                                |
| Styling   | One hand-written stylesheet + Tailwind (Preflight off)      |
| Tests     | Jest + Testing Library                                      |
| Hosting   | GitHub Pages via GitHub Actions                             |

## Local development

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # static export to ./out
npm test               # Jest — contact CTA + site constants
npm run lint           # next lint
npm run format         # prettier --write .
```

Node version is pinned in [`.nvmrc`](.nvmrc).

## Project layout

| Path                           | What                                                                                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/`                     | App Router: `page.tsx`, `layout.tsx` (shell + SEO metadata + JSON-LD), `sitemap.ts`, `robots.ts`, `manifest.ts`, `not-found.tsx`, icon/OG image files |
| `src/components/`              | `BlackHoleScene` (owns the `<canvas>`), `ContactButton`, `Footer`                                                                                     |
| `src/lib/space/`               | Framework-agnostic Three.js scene. `index.ts` composes the bodies in `bodies/` (black hole, star field, galaxy, nebula, meteor field)                 |
| `src/lib/site.ts`              | Canonical URL, brand copy, SEO constants                                                                                                              |
| `src/lib/contact.ts`           | Contact address, obfuscated — assembled at runtime when the visitor opens the CTA                                                                     |
| `public/`                      | `CNAME`, `.nojekyll`, static assets                                                                                                                   |
| `.github/workflows/deploy.yml` | CI on every PR; deploy `out/` to Pages on `main`                                                                                                      |

The space scene is adapted from the background of
[depre.net](https://depre.net) and stays a standalone library: it takes a
`<canvas>` and returns a cleanup function, with no framework dependency.

## SEO

Every response ships a unique `<title>` and meta description, a canonical URL,
Open Graph + Twitter card tags, JSON-LD (`Organization` + `WebSite`), and a real
`<h1>` / text content behind the animation. The build emits `sitemap.xml` and
`robots.txt`.

## Deployment

GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)):

1. On every push / PR to `main`: `lint`, `format:check`, `test`, `build`.
2. On `main` only: `./out` is published to GitHub Pages.

One-time setup: repo **Settings → Pages → Source = GitHub Actions**, and point
the `dephelion.com` DNS at GitHub Pages ([`public/CNAME`](public/CNAME) already
declares the domain).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Issues and PRs are welcome.

## License

[MIT](LICENSE) © 2026 Julio Cesar Martin.
