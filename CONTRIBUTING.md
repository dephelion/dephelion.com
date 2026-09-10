# Contributing

Thanks for taking an interest in dephelion.com.

## Ground rules

- **`main` is protected.** Branch, push the branch, open a PR. CI must be green
  before merge.
- Keep the site a **pure static export** — no server, no runtime env vars, no
  API routes. It must build with `next build` and deploy as plain files.
- No secrets in the repo. Everything here is public.
- Run `npm run format` and `npm run lint` before pushing. CI runs
  `format:check`, `lint`, `test`, and `build`.

## Getting set up

```bash
npm install
npm run dev
```

## Making a change

1. Create a branch off `main`.
2. Make the change. If you touch the contact CTA or `src/lib/site.ts`, keep the
   tests in `src/**/*.test.tsx` passing (`npm test`).
3. For scene work, all Three.js code lives in `src/lib/space/`. Each celestial
   body is its own file under `bodies/` implementing the `SceneBody` contract in
   `types.ts`; `index.ts` only composes them.
4. Open a PR with a short description of what and why.

## Scope

This is a single-page brand site. Proposals that add routes, a CMS, analytics,
or trackers are generally out of scope — open an issue first to discuss.

## License

By contributing you agree that your contributions are licensed under the
[MIT License](LICENSE).
