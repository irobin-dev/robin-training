# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## What this is

**Robin — Hybrid Training** is a personal, installable Progressive Web App (PWA)
that presents a 2-year hybrid strength-and-running training plan. It is a
single-user reference tool: tabs for a "how to follow" guide, mobility protocol,
two training weeks, minor add-ons, evening runs, and a combined view. Tapping any
exercise opens a modal with form-demo images.

There is **no backend, no database, no user accounts, and no analytics.** All
content is static and hand-authored. The app works fully offline once installed.

## Tech stack — deliberately minimal

- **Vanilla HTML + CSS + JavaScript.** No framework, no bundler, no npm, no
  `package.json`, no build step, no transpilation.
- The JavaScript is written in **ES5-compatible style** (`var`, `function`,
  no arrow-free requirement but the core tab logic avoids modern syntax on
  purpose — see the iOS Safari note below). Only a couple of self-invoking IIFEs
  use modern syntax.
- **Google Fonts** (Lora + DM Sans) is the only external dependency, loaded via
  `<link>` and cached by the service worker.
- Exercise images are **self-hosted** under `images/exercises/` (public-domain
  source: `free-exercise-db` by yuhonas) so the app works offline. There is no
  live API call anywhere.

## File map

| Path | Role |
|------|------|
| `index.html` | **The entire application.** ~2200 lines: inline `<style>` (design system + all component CSS), the full static content markup, and an inline `<script>` (tab routing + exercise modal + SW registration). |
| `sw.js` | Service worker. Defines the cache name/version and a `PRECACHE` list, then implements cache-first (same-origin) and stale-while-revalidate (Google Fonts) fetch strategies. |
| `manifest.json` | PWA manifest — name, colors, icons, `display: standalone`. |
| `icon-192.png`, `icon-512.png` | App icons (maskable). |
| `images/exercises/<Exercise_Name>/{0,1}.jpg` | Per-exercise form demo images (0 = start, 1 = end). ~54 exercises, 108 files. |

## Architecture of `index.html`

Everything lives in one file, organized top-to-bottom as:

1. **`<head>`** — meta tags, manifest link, Apple PWA meta, font link.
2. **`<style>`** (lines ~15–610) — CSS custom properties in `:root` define the
   whole design system, followed by component styles.
3. **`<body>`** (lines ~612–1985) — header, nav tabs, and one `.pane` per tab of
   static content.
4. **`<script>`** (lines ~1987–2200) — tab routing, exercise modal, SW register.

### Navigation model

- **Main tabs**: `.nav-tab` elements call `showMain('<id>', this)`. Each maps to a
  `.pane` with `id="tab-<id>"`. The seven panes are: `guide`, `mob`, `w1`, `w2`,
  `minor`, `run`, `combo`. Exactly one pane has the `active` class at a time.
- **Sub tabs** (inside the `run` and `combo` panes): `.sub-tab` elements call
  `showSub('<group>', '<id>', this)`, toggling `.sub-pane` with
  `id="<group>-<id>"` and `active` on the matching `.sub-tab`.
- **Collapsible day cards**: `.day-head` elements call `tog('<bodyId>', this)`,
  toggling the `.open` class on the body and its chevron.

### The iOS Safari tap workaround (important — read before touching JS)

The nav/sub/day controls are authored with inline `onclick="..."` attributes, but
those are **not** how clicks actually fire at runtime. On DOM ready,
`parseAndAttach()` copies each `onclick` into a `data-action` attribute and
**removes the `onclick`**, then adds `role="button"` + `tabindex="0"`. A single
delegated `click` listener on `document` (`handleTap`) parses `data-action` with
regexes and dispatches to `showMain` / `showSub` / `tog`.

This exists because mixing `onclick` with a `touchend` + `preventDefault()` hack
previously caused double-firing or dead tabs on iOS inside the horizontally
scrolling nav. **Do not reintroduce `touchend` handlers or `preventDefault` on the
tabs.** If you add a new tab or interactive control, give it an
`onclick="showMain(...)"`-style attribute in one of the three recognized forms so
`parseAndAttach` + `handleTap` pick it up automatically, or extend the regex
dispatch in `handleTap`.

### Exercise modal

An IIFE at the bottom of the script:
- Holds `EX_IMAGES`, a map of **normalized exercise base-name → `[startImg, endImg]`**
  paths under `images/exercises/`.
- Attaches a click handler to every `.li-name` span that passes `isExercisable`
  (skips warm-ups/jogs/runs via `SKIP_PATTERNS` and names ≤3 chars).
- `baseName()` normalizes a displayed name (strips a leading `"A — "` superset
  prefix, cuts at `—`, `(`, `/`, `+`, or ` or `, lowercases) before lookup.
- If images are found they render; on `onerror` or no match it falls back to a
  "Watch on YouTube" search link.

**To make a new exercise tappable with images:** add its `0.jpg`/`1.jpg` under
`images/exercises/<Name>/`, add the files to `PRECACHE` in `sw.js`, and add a
lowercase base-name key to `EX_IMAGES` pointing at those paths.

## Design system

Colors, radii, and safe-area insets are CSS custom properties in `:root` (top of
the `<style>` block). The palette is a warm, editorial paper theme:

- Neutrals: `--bg`, `--bg2..4`, `--border`, `--border2`, `--text`, `--text2..4`.
- Accent families each come as a triple `--x` / `--x-l` (light) / `--x-b`
  (bright/border): `accent` (terracotta), `grn` (forest green), `blue` (ink),
  `run` (teal), `warn` (amber), `combo` (purple), `shin` (red-orange).
- `--radius`, `--radius-sm`; `--safe-top`, `--safe-bot` map to `env(safe-area-inset-*)`.

Fonts: **Lora** (serif, headings/emphasis) and **DM Sans** (sans, body). Prefer
existing custom properties and utility classes over new hard-coded values. Note
that much of the content markup uses **inline `style="..."`** attributes — match
that local style when editing a section rather than refactoring to classes.

## Service worker & caching

- `CACHE` constant in `sw.js` is a **versioned cache name** (currently
  `robin-training-v4`). **Bump this version whenever you change `index.html`,
  `sw.js`, or precached assets** — the `activate` handler deletes all caches whose
  name ≠ the current `CACHE`, which is how clients pick up new content. Without a
  bump, returning users keep the stale cache-first copy.
- `PRECACHE` lists the app shell + fonts + every exercise image. Keep it in sync
  when adding/removing images. Precache adds use `Promise.allSettled` so a single
  missing asset won't break install.
- Same-origin requests are **cache-first**; Google Fonts are
  **stale-while-revalidate**.

## Running & testing locally

No build. Serve the directory over HTTP (service workers require a secure/localhost
origin — opening `index.html` via `file://` won't register the SW):

```bash
python3 -m http.server 8000    # then open http://localhost:8000
```

There is **no test suite, linter, or CI config** in the repo. "Testing" means
loading the app in a browser (ideally mobile Safari / Chrome device emulation,
since it's a portrait phone PWA) and checking:
- Every nav tab and sub-tab switches panes.
- Day cards expand/collapse.
- Tapping an exercise name opens the modal with images (or the YouTube fallback).
- Hard-reload with DevTools "Update on reload" to confirm SW cache versioning.

## Deployment

The app is static and hosted via **GitHub Pages** (a `CNAME` file was added and
later removed in history — the site currently uses the default Pages domain).
Any push to the deployed branch publishes the files as-is.

## Conventions & guardrails

- **Keep it dependency-free and buildless.** Do not introduce a framework, npm,
  a bundler, or a build step unless explicitly asked.
- **Everything is one file (`index.html`).** New features go inline; don't split
  into modules or add script/style files without a good reason.
- **After any content or asset change, bump the `CACHE` version in `sw.js`** so
  users receive the update.
- **Preserve the iOS tab dispatch pattern** (`data-action` + delegated
  `handleTap`); don't fight it with touch handlers.
- **Match the surrounding style** — ES5-ish JS in the routing code, inline styles
  in content markup, CSS variables for design tokens.
- The content is a real personal training plan. Treat exercise names, day
  structure, and programming logic as intentional; don't "correct" the fitness
  content unless asked.

## Git workflow

Active development branch for this work: `claude/claude-md-docs-ufin5m`. Commit
with clear messages and push to the designated branch; do not open a PR unless
explicitly requested.
