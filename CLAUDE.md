# slidev-theme-swiss-print

A Slidev theme published to npm as `slidev-theme-swiss-print`. The theme lives at the repo root; `example/` holds the
demo deck, which uses the theme through `theme: ../`.

## Commands

- `npm run dev`: demo deck on http://localhost:3030
- `npm test`: unit tests (Vitest, `tests/unit`)
- `npm run test:e2e`: end-to-end tests (Playwright, `tests/e2e`, projects `light` and `dark`; starts the dev server)
- `npm run build:demo`: static build of the demo deck into `dist/demo`
- `npm run build:pages`: the same build for GitHub Pages (base `/slidev-templates/`) into `dist/pages`
- `npm run export:light` / `npm run export:dark`: PDF exports into `dist/`
- `npm run screenshots`: recapture the README screenshots into `docs/screenshots` (starts its own dev server)
- `npm run smoke`: pack the theme and build a throwaway deck that installs the tarball
- `npm run check`: all of the above

## Rules

- No personal information in the theme, its defaults or the demo deck: use the fake speaker Alex Martin, `.example`
  domains, and Slidev cover photos pinned by id. Attribution lives only in `package.json`, `LICENSE` and the README.
- Never install Slidev globally; it comes from mise. The local `@slidev/cli` dev dependency is for this repo only.
- CSS custom properties use the `--sp-` prefix. The highlight class is `hot` everywhere.
- Conventional commits, no attribution lines. Never push or publish without asking.
- CI (`.github/workflows`): `ci.yml` runs `npm run check`, `pages.yml` deploys the demo, `release.yml` runs
  release-please and publishes to npm through trusted publishing (no token). Never run `npm version` by hand.
