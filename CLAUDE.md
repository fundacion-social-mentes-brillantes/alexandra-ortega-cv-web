# CLAUDE.md

Guidance for AI assistants working in this repository.

## What this is

A single-page **personal-brand landing page / web CV** for **Alexandra Ortega** —
psychologist, ontological coach, speaker and trainer in mental health, founder of
the *Gimnasio Emocional Mentes Brillantes (GEMB)* technique, and project director
at the *Fundación Social Mentes Brillantes*.

It is a **100% static site**: plain HTML5, hand-written CSS3, and one vanilla
JavaScript file. There is **no build step, no framework, no package manager, and
no dependencies to install**. All content is in **Spanish (`lang="es"`)** and the
site targets a Colombian audience.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The entire page — every section lives here. ~440 lines. |
| `styles.css` | Complete design system and all responsive styles. ~1000 lines. |
| `script.js` | All interactivity: scroll-aware nav, mobile menu, scroll-reveal, animated counters, dynamic year. One IIFE. |
| `assets/alexandra-sq.jpg` | Square hero photo (referenced by the page + Open Graph image). |
| `assets/alexandra-wide.jpg` | Alternate horizontal photo (currently unused in markup). |
| `README.md` | Human-facing project description (Spanish). |
| `.gitignore` | Ignores OS/editor cruft, `node_modules/`, `dist/`, `.vercel`. |

There are no other source directories.

## Running locally

No install needed. Either:

```bash
# Just open it
open index.html          # or double-click in a file browser

# Or serve statically (better for testing relative paths / OG tags)
npx serve .
```

There are **no tests, no linters, and no CI build** configured. "Verifying a
change" means opening the page in a browser and visually checking the affected
section at both desktop and mobile widths.

## Deployment

The site is deployed on **Vercel** (note the `.vercel` entry in `.gitignore`).
Pushing to the default branch triggers a Vercel deploy. Since there is no build
command, Vercel serves the files as-is.

## Architecture & conventions

### HTML (`index.html`)
- The page is one `<header>` nav + one `<main>` containing a sequence of
  `<section>` blocks, then a `<footer>`. Each section is delimited by a banner
  comment in box-drawing characters, e.g.
  `<!-- ╭─────────── HERO ───────────╮ -->`. Keep this style when adding sections.
- **Section `id`s double as nav anchors.** Current order:
  `inicio` (hero) → `perfil` → `trayectoria` → `cumbre` → `servicios` →
  `biblioteca` → `incidencia` → `experiencia` → `reconocimientos` →
  `formacion` → `contacto`. The nav (`#navLinks`) links a curated subset of
  these; if you add a section meant to be navigable, add a matching `<a href="#...">`.
- **Accessibility is intentional**: `aria-label`, `aria-hidden` on decorative
  elements, `aria-expanded` on the menu toggle, descriptive `alt` text. Preserve
  these when editing. Decorative glows/rings/SVGs are always `aria-hidden="true"`.
- SEO/meta lives in `<head>`: `title`, `description`, `author`, and Open Graph
  tags. Update these when the headline messaging or photo changes.

### CSS (`styles.css`)
- **Design tokens are CSS custom properties in `:root`** (top of file): brand
  colors (`--ink`, `--plum`, `--lavender`, `--gold`, `--cream`, …), fonts
  (`--font-display` = Fraunces for headings, `--font-body` = Outfit for text),
  plus `--radius`, `--shadow`, `--transition`. **Change the palette here, not
  inline.** Use these tokens instead of hard-coded values in new rules.
- **Naming is BEM-ish**: `block`, `block__element`, `block--modifier`
  (e.g. `hero__name`, `btn--gold`, `section__title--light`). Match the existing
  block name when extending a component.
- The file is organized into clearly commented sections (`/* ── Hero ── */`,
  `/* ── Servicios ── */`, …) that mirror the HTML sections, ending with a single
  `/* ── Responsive ── */` block of media queries. **Put new component styles in
  the matching section and keep responsive overrides in the responsive block.**
- Layout uses `clamp()` for fluid type/spacing and CSS grid/flex. Dark sections
  (Cumbre, Reconocimientos) use light text modifiers (`--light`).

### JavaScript (`script.js`)
- A single IIFE in `"use strict"` mode, organized into four numbered concerns:
  (1) nav scroll state + mobile menu, (2) `IntersectionObserver` scroll-reveal,
  (3) animated counters, (4) dynamic footer year.
- **`prefers-reduced-motion` is respected** and there are graceful fallbacks when
  `IntersectionObserver` is unavailable — keep both when touching animations.
- **The `.reveal` class is the scroll-in animation hook.** Any element with
  `reveal` fades/slides in when scrolled into view (with a small per-sibling
  stagger). Add `reveal` to new content that should animate in. CSS for it lives
  under `/* ── Animaciones al hacer scroll ── */`.
- **Animated counters** use `<span class="counter" data-target="N">`. The visible
  starting text should be `0` (or the target for year-like values that shouldn't
  count up from zero — see the `2016`/`2025` cards in the Impacto section).
- No external JS libraries; keep it dependency-free and vanilla.

## Editing guidance

- **Content/copy lives in `index.html`.** It's in Spanish — preserve tone
  (warm, professional, mental-health/community focus) and accents.
- When adding a card to a grid (services, areas, honors, model, timeline),
  copy an existing sibling `<article>`/`<li>`, keep its classes incl. `reveal`,
  and the grid handles layout automatically.
- Contact details are real and appear in multiple places (footer NIT, `mailto:`,
  `tel:`, Instagram/Facebook links). Update **all** occurrences together.
- Keep the page a single self-contained static site. **Do not introduce a build
  system, framework, or npm dependencies** unless the user explicitly asks —
  doing so would change the entire deployment model.

## Git workflow

- Work on the designated feature branch; commit with clear messages and push with
  `git push -u origin <branch>`. Do **not** open a pull request unless explicitly
  asked.
- Default branch is `main`.
