# CLAUDE.md - Danny Lin Portfolio

Context for future Claude Code sessions. Read this first.

## What this is

Personal portfolio for **Danny Lin** (Software Engineer) with an Apple-style
**"liquid glass"** aesthetic. Single-page app, tabbed navigation, dark theme with
an animated gradient field behind frosted-glass surfaces.

## Stack

| Piece            | Choice                                             |
| ---------------- | -------------------------------------------------- |
| Build            | Vite 8 + React 19 + TypeScript                     |
| Styling          | Tailwind CSS v4 (via `@tailwindcss/vite`) + custom CSS in `src/index.css` |
| Liquid glass     | [`liquid-glass-react`](https://www.npmjs.com/package/liquid-glass-react) v1.1.1 |
| Lint             | `oxlint` (`npm run lint`)                          |
| Routing          | none - tab state in `App.tsx`, synced to `location.hash` |

### Commands

```bash
npm install      # first time
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build -> dist/
npm run preview  # serve dist/
npm run lint
```

## Layout of the code

```
public/
  Danny_Lin_Resume.pdf     # copied from ~/Downloads on 2026-09-07; source of all resume content
src/
  App.tsx                  # shell: <Background>, <NavBar>, tab switch, <FloatingContact>. #hash sync + swipe-to-switch.
  index.css                # theme tokens, animated background, .glass system, animations
  lib/
    tabs.ts                # TABS tuple + labels + isTab() guard. Add/rename tabs here.
    resume.ts              # ALL portfolio content (profile, education, experience, projects, skills, photos)
  components/
    Background.tsx          # fixed animated gradient blobs + grid. Pure CSS (classes in index.css).
    NavBar.tsx              # the ONLY <LiquidGlass> instance (see note below)
    GlassPanel.tsx          # CSS frosted-glass <div> wrapper (.glass). Used for every content card.
    GlassButton.tsx         # CSS frosted-glass pill button/link
    FloatingContact.tsx     # two glass pills pinned to bottom corners (name left, social icons right)
    SectionShell.tsx        # shared section width + heading + top padding (clears fixed nav)
  sections/
    Home.tsx  About.tsx  School.tsx  Projects.tsx  Photography.tsx  Resume.tsx
```

## Tabs

`home · about · school · projects · photography · resume` - defined in
`src/lib/tabs.ts`. `App.tsx` renders one section at a time based on `tab` state;
`#about` etc. deep-links work, back/forward works, `#` / empty = home.

Three ways to change tab:
1. **Click** a nav pill tab (also keyboard: focus + Enter/Space).
2. **Drag across the nav pill** - press on any tab, drag, release over another;
   the highlight follows the pointer (`hoverTab`) and the tab under release is
   selected. `NavBar.tsx`, via `document.elementFromPoint` + `[data-tab]`. If the
   strip overflows its max width it also scrolls under the drag.
3. **Swipe/drag the content area** left/right to move to the prev/next tab in
   `TABS` order (`App.tsx`, `SWIPE_DIST` / `SWIPE_RATIO`; trailing click
   swallowed via `justSwiped`).

### Tab-change motion

- **Nav highlight** is one element, `.nav-indicator` (a child of the `<ul>`, which
  is `position: relative`). `NavBar` measures the target button's
  `offsetLeft/Top/Width/Height` in a `useLayoutEffect` keyed on
  `hoverTab ?? active` and sets the indicator's inline `transform`/`width`; CSS
  eases it (`transform`/`width` transition, ~0.36s). So it glides between tabs on
  click and chases the pointer during a drag. Re-measures on resize and
  `document.fonts.ready`.
- **Section entrance** `.tab-enter` on the `<div key={tab}>` wrapping the section
  in `App.tsx`: slides in from `--enter-x` (28px forward / -28px back, set from
  `dir` state) + fades. `dir` is recomputed on every tab change, including
  back/forward (`tabRef` holds the committed tab).
- Both are disabled under `prefers-reduced-motion`.

## Typography

No em/en dashes anywhere - plain hyphens only ("looks less AI", per the owner).
If you add copy, keep it that way.

## The liquid glass decision (important)

`liquid-glass-react` gives a real SVG-displacement refraction, but it has two hard
constraints:

1. **Displacement only renders in Chromium.** Safari/Firefox fall back to a plain
   `backdrop-filter` blur (the library detects Firefox and drops the SVG filter).
2. **It only lays out as a free-floating element.** Internally it hard-codes
   `top/left: 50%` + `translate(-50%,-50%)` and emits several absolutely-stacked
   sibling layers. Dropped inline into normal flow (nav items, buttons, cards) it
   overflows and mis-positions badly. It works only when given
   `style={{ position: 'fixed' | 'absolute', ... }}`.

**So:** `<LiquidGlass>` is used in exactly one place - the fixed nav pill in
`NavBar.tsx` (`position: fixed`, centered). Its `top` is `2.75rem` to visually
compensate for the component's built-in `translateY(-50%)`.

Everything else (cards, buttons, footer, hero panel) uses the **`.glass` CSS
system** in `index.css`: `backdrop-filter: blur() saturate()`, a 1px gradient
border via `::after` mask, layered inset highlights. This looks consistent in all
browsers and is cheap to repeat. `GlassPanel` wraps `.glass`; `GlassButton` adds
`.glass-frost` (heavier blur + a bit more tint) so small controls read frostier
than large panels, the way Apple's Liquid Glass runs its controls.

Blur radii (raise these together if the frost ever needs tuning):
`.glass` panels ~22px · `.glass-frost` buttons ~36px · nav `<LiquidGlass>`
`blurAmount={0.55}` which the library turns into `4 + 0.55*32 ≈ 21px` of
`backdrop-filter` blur, on top of its Chromium-only SVG displacement/refraction.

If you want more "real" glass on a surface, it must become a fixed/absolute
floating element first, or the layout breaks.

**Gotcha:** `.glass` declares `position: relative`, and because `index.css`
defines it *after* `@import 'tailwindcss'`, it beats Tailwind's `.fixed`
utility (equal specificity, later wins). So to pin a `.glass` element, put the
`fixed` positioning on a plain wrapper `<div>` and `.glass` on the child - see
`FloatingContact.tsx`. Don't put `fixed` and `glass` on the same element.

### Floating contact pills

`FloatingContact.tsx` renders two `.glass` pills in `fixed` wrappers: the name
(bottom-left, click = go home) and a `<nav>` of GitHub / LinkedIn / Email icon
links (bottom-right). Icons are inline SVGs (`z-40`, below the `z-50` nav). They
intentionally hover over content; `SectionShell`/`Home` carry extra bottom
padding so nothing important sits under them at scroll-end.

### Mobile nav

The pill's `<ul>` is `overflow-x: auto` with `max-width: calc(100vw - 40px)` so it
never forces page-wide horizontal scroll; on narrow phones the last 1-2 tabs are
reached by swiping the pill. `#root` has `max-width:100vw; overflow-x:clip` as a
belt-and-braces guard. Verified with CDP: `document.scrollWidth === innerWidth` at
360/390px.

## Content & data

Most text comes from **`public/Danny_Lin_Resume.pdf`**, transcribed into
`src/lib/resume.ts`. Edit that file to change any copy - every section reads from
it. School section shows only resume facts (degrees, GPAs, Magna Cum Laude,
dates, locations).

Some fields are user-provided, not from the PDF:
- `profile.location` = "New York City, New York" (the resume PDF still says
  Middletown, NJ; `experience[].location` also still says Middletown, NJ - those
  are the job locations and were left as-is).
- `profile.tagline` = "agentic workflow, llms, and data" (hero subtitle, lowercase on purpose).
- `profile.blurb` = "Software Engineer working large scale of data, agent
  workflows, and creative solutions." (shown on Home + About).
- `hobbies[]` - Basketball, Hiking, Running, Startups, Stock investing, Real
  estate, Game development. Shown on About under "Off the clock".

- **About** - bio paragraphs + "Currently" card (experience[0]) + skills grid +
  hobbies ("Off the clock").
- **School** - education cards only (the GPA/honors "Snapshot" panel was removed).
- **Projects** - `projects[]` (ROM Randomizer) + "Shipped at work" cards derived
  from `experience[]` entries that have a `team`.
- **Photography** - `photos[]` are **placeholders**: each has a CSS gradient
  `swatch`, not a real image. To use real photos, drop files in `public/photos/`
  and set `swatch: "url('/photos/x.jpg')"` (or refactor `Photography.tsx` to use
  `<img>`).
- **Resume** - Download PDF / Open in new tab buttons + a text version of
  experience + education. (The inline `<object>`/`<iframe>` PDF preview was
  removed at the owner's request.)

Contact info used publicly: `danny.lin.careers@gmail.com`,
`github.com/dannyglin`, `linkedin.com/in/dannygaolin` (the career email from the
resume, not the personal one). Phone is in the PDF only.

## Design tokens (`src/index.css` `:root`)

`--bg-0/-1` page background (deep navy -> dark slate blue), `--ink / --ink-dim /
--ink-faint` text ramp, `--line` hairline border, `--glass-tint` glass fill.

Background (`Background.tsx` + `.bg-stage` / `.bg-blob` in `index.css`) is a calm
pastel dark-blue field: a soft top-to-bottom navy gradient + two low-opacity
blue-family glows on a very slow (48-60s), small drift. No multi-hue gradients,
no grid overlay - deliberately understated. Still just uneven enough for the
glass to refract. Respects `prefers-reduced-motion`.

## Known limitations / TODO ideas

- Real refraction is Chromium-only by design (see above).
- Photography is placeholder gradients until real images are added.
- No SEO/OpenGraph tags, no analytics, no 404 route, no favicon of Danny's own
  (still the Vite default `public/favicon.svg`).
- No deploy config yet. It's a static SPA - `dist/` drops onto any static host
  (Netlify/Vercel/GH Pages). For GH Pages set `base` in `vite.config.ts`.
- `git init` is done; nothing committed yet. Remote:
  `https://github.com/dannyglin/portfolio`.

## History

- **2026-09-07** - Initial build from an empty repo. Scaffolded Vite, added
  Tailwind v4 + `liquid-glass-react`, built all 6 sections from the resume PDF,
  verified desktop + mobile via headless Chrome / CDP screenshots.
- **2026-09-07 (edits 1)** - Hero: dropped the top location eyebrow, moved
  location below the title line, added `tagline`, location to NYC, chips to the
  two degrees. "resume" spelling everywhere. Removed School "Snapshot". New
  shorter `blurb`. Added `hobbies` + About "Off the clock". Replaced the in-flow
  `<footer>` with `FloatingContact` (bottom-corner glass pills, icon links).
- **2026-09-07 (edits 2)** - All em/en dashes to hyphens (owner: "less AI").
  Tagline lowercased. Added swipe / click-drag between tabs (`App.tsx`) plus
  mouse-drag-scroll on the nav strip (`NavBar.tsx`). Removed the Resume PDF
  preview.
