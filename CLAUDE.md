# CLAUDE.md - Danny Lin Portfolio

Context for future Claude Code sessions. Read this first.

## What this is

Personal portfolio for **Danny Lin** (Software Engineer) with an Apple-style
**"liquid glass"** aesthetic. Single-page app, tabbed navigation, dark theme with
an animated navy gradient behind frosted-glass surfaces.

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
.github/workflows/
  deploy.yml               # GitHub Pages: build on push to main, deploy dist/ (see "Deploy")
public/
  Danny_Lin_Resume.pdf     # copied from ~/Downloads on 2026-09-07; source of all resume content
  sprites/                 # pixel-art PNGs for the Home hero easter-egg (see "Home sprite easter-egg")
src/
  App.tsx                  # shell: <GlassFilter>, <Background>, <NavBar>, tab switch, <FloatingContact>, <ChatWidget>. #hash sync + swipe-to-switch.
  index.css                # theme tokens, .bg-stage animated gradient, .glass system + @supports warp, sprite easter-egg, animations
  lib/
    tabs.ts                # TABS tuple + labels + isTab() guard. Add/rename tabs here.
    resume.ts              # ALL portfolio content (profile, education, experience, projects, skills, photos)
    chat/                  # engine.ts (web-llm load + stream) + systemPrompt.ts for the local chat assistant
  components/
    Background.tsx          # renders .bg-stage: the animated "water" gradient (ported from ximluo; see index.css).
    NavBar.tsx              # the ONLY <LiquidGlass> instance (see note below)
    GlassFilter.tsx         # one hidden <svg> with the #glass-warp filter defs (see "Refraction ...")
    GlassPanel.tsx          # CSS frosted-glass <div> wrapper (.glass). Used for every content card.
    GlassButton.tsx         # CSS frosted-glass pill button/link
    FloatingContact.tsx     # two glass pills pinned to bottom corners (name left, social icons right)
    SectionShell.tsx        # shared section width + heading + top padding (clears fixed nav)
    TrainerCluster.tsx      # Home-hero easter-egg: the owner's Pokemon team, data-driven (see "Home sprite easter-egg")
    ChatWidget/             # browser-local chat assistant (lazy web-llm chunk; see 2026-09-08 history)
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
3. **Swipe the content area** left/right to move to the prev/next tab in `TABS`
   order (`App.tsx`, `SWIPE_DIST` / `SWIPE_RATIO`). **Touch/pen only** - the
   handler ignores `pointerType === 'mouse'`, because on a mouse a horizontal
   drag is text selection and hijacking it to change tabs is infuriating (this
   bit us twice). A non-empty `getSelection()` also aborts it as a backstop.

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
`.glass` panels ~22px · `.glass-frost` buttons ~36px · `.glass-input` /
`.glass-control` ~30px · `.chip` ~22px · nav `<LiquidGlass>`
`blurAmount={0.55}` which the library turns into `4 + 0.55*32 ≈ 21px` of
`backdrop-filter` blur, on top of its Chromium-only SVG displacement/refraction.

Every interactive surface is on this frosted system: `GlassButton` /
`FloatingContact` / the chat toggle use `.glass .glass-frost`; small icon
buttons (chat send / stop / header) use `.glass-control`; the chat composer
uses `.glass .glass-input`; tags and the chat example prompts use `.chip`
(also frosted - `button.chip` adds hover/active). So nothing on the page is a
flat `bg-white/x` control anymore.

### Refraction on the CSS-glass controls (`GlassFilter.tsx`)

The `<LiquidGlass>` library can't lay out inline (above), but its *refraction*
- an SVG `feDisplacementMap` warping the backdrop - can be fed into
`backdrop-filter`. `src/components/GlassFilter.tsx` renders one hidden inline
`<svg>` with two filter defs (`#glass-warp` for controls, `#glass-warp-panel`
softer + lower-frequency for the chat panel); it's mounted once at the top of
`App.tsx`.

`index.css` layers the warp onto every glass surface inside an
`@supports (backdrop-filter: url("#glass-warp"))` block:

- `.glass` (all `GlassPanel` content cards + the hero blurb) and
  `.glass-frost.glass-panel-warp` (the chat shell) -> the softer
  `#glass-warp-panel` map, so big surfaces don't shimmer.
- `.glass-frost` / `.glass-control` / `.glass-input` / `.chip` (the small
  controls, buttons, chips, chat composer) -> the stronger `#glass-warp` map.

The `.glass` rule is listed *first* in the block so the later, equally-specific
control rules still win for elements that carry both classes (e.g.
`class="glass glass-input"`). Chromium passes the `@supports` query and gets
real displacement; Safari/Firefox fail it and keep the plain `blur()` from the
base rules - same browser story as the nav pill. Blur radius is dialed *down*
inside the block so the warp shows under it. To tune strength, change each
filter's `feDisplacementMap` `scale` (currently 34 controls / 26 panels) or the
`feTurbulence` `baseFrequency`. No animation (static `seed`), so nothing to gate
on `prefers-reduced-motion`. Cost: one static `feDisplacementMap` per glass
element; fine in practice, but if a content-heavy page ever janks, drop `.glass`
back out of the `@supports` block (panels lose the warp, controls keep it).

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

### Home sprite easter-egg

Pixel-art PNGs in `public/sprites/` (all carry `.pixel-sprite` -> `image-rendering: pixelated`). Two pieces, both cosmetic (`aria-hidden`, `pointer-events: none`), CSS in the `.pixel-sprite` / `.blurb-runner` / `.trainer-cluster*` block at the end of `index.css`:

- **`.blurb-runner`** (inline `<img>` in `Home.tsx`, inside `.blurb-wrap`) - a
  tiny sprite that laps the bio panel forever via CSS Motion Path
  (`offset-path: inset(...)` + `offset-rotate: auto`), turning at each corner.
  `offset-path` is Chromium-ish; `@supports not (offset-path: ...)` hides it on
  engines without it - same "Chromium-only extra" story as the glass refraction.

- **`TrainerCluster.tsx`** - the owner's Pokemon team in a shallow "V" to the
  right of the bio card, `lg:` and up (needs the width). Between `lg` and `xl`
  the hero column is only as wide as the viewport, so `index.css` scales the
  `.trainer-cluster` box down (`scale(0.78)`) and pulls it in for that range;
  `xl+` keeps the full-size placement. Fully data-driven: every sprite (trainer
  included) is `width(px) = heightM * SCALE` off canonical Pokedex heights, so
  sizes are honest relative to each other. `TRAINER_HEIGHT_M` is inflated so the
  trainer leads rather than being the shortest; Dialga carries a fixed `px`
  override because its true scale (~420px) would blow out the box. `x`/`y` are
  sprite centres within the `.trainer-cluster` box; `z-index` runs by rendered
  size (smallest in front), trainer always on top. Retune knobs: `SCALE` (whole
  family), `TRAINER_HEIGHT_M` (trainer vs team), `dialga.px`, and the
  lg-to-xl `scale()` in `index.css`.

**Reduced motion:** the `@media (prefers-reduced-motion: reduce)` block does not
switch the easter-egg off - it calms it: the bob height drops (`--bob` var:
`-12% -> -5%` of the sprite's own size) and slows (`7s`), and `.blurb-runner`
slows to a `32s` drift instead of `display: none`. (It is still fully hidden
where `offset-path` is unsupported.)

**The sprites are APNGs, not static PNGs** - every file in `public/sprites/`
carries real walk-cycle animation frames (`acTL`/`fcTL`/`fdAT` chunks), which
Chromium/Firefox/Safari all play natively through a plain `<img>` tag, no JS or
`<canvas>` needed. **Do not run them through `sips`** (or any single-frame
image tool) - `sips` silently flattens an APNG to its first frame and there is
no warning, which is exactly what happened on 2026-09-08: it "optimized" them
from 2.2 MB to ~36 KB by deleting every frame but one, and the walk cycle
appeared to just be a static picture for the next day (see 2026-09-09 edits 4).
If a sprite ever needs recompressing, use an APNG-aware tool (e.g. `apngopt`)
and verify frame count survives (`python3 -c "from PIL import Image;
print(Image.open(p).n_frames)"` should be > 1) before committing.

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
- `profile.blurb` = "Software Engineer working on large-scale data, agent
  workflows, and creative solutions." (shown on Home + About). The hero shows
  only name / title / location - no tagline line. On Home the blurb is followed
  by " Off the clock, that usually means a basketball court, a trail run, or a
  half-built game project." (literal in `Home.tsx`, not in `resume.ts`).
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

`--bg-0/-1` fallback background colors (deep navy -> dark slate blue),
`--ink / --ink-dim / --ink-faint` text ramp, `--line` hairline border,
`--glass-tint` glass fill.

Background is an **animated "water" gradient ported from
[ximluo.github.io](https://github.com/ximluo/ximluo.github.io)** (its
`GradientBackground`). `Background.tsx` renders `.bg-stage`: a deep-navy base
(`--bg-0` = `#001f3f`) with five radial-gradient blobs (`.bg-blob.b1..b5`,
colours `--c1..--c5` on `.bg-stage`) drifting on 20-40s `bg-move-*` loops,
fused by the inline SVG `#bg-goo` filter (`feGaussianBlur` + alpha-crush
`feColorMatrix`) plus `blur(40px) brightness(0.86)` on `.bg-blobs`. A sixth blob
`.bg-blob.bi` follows the cursor (desktop, `pointer: fine`; JS in
`Background.tsx`). A `<canvas class="bg-noise">` lays ximluo's dot-matrix grain over everything: a
256px tile where ~80% of a 2px grid gets a random-brightness pixel at alpha 35,
tiled with `createPattern` and repainted on resize (`getNoiseTile` in
`Background.tsx`, their exact algorithm). Blobs are dimmer than the source
(`opacity: 0.3`, tuned down) so it stays subtle behind the glass. All blob
motion is killed under `prefers-reduced-motion`.

The goo filter is Chromium/Firefox; Safari renders it as a plain blur (still a
fine soft gradient). No image asset - the old `public/website-background.jpg`
photo background was removed.

## Deploy

GitHub Pages via `.github/workflows/deploy.yml` (`actions/deploy-pages`): every
push to `main` runs `npm ci && npm run build` and publishes `dist/`. One-time
setup in the repo: **Settings -> Pages -> Source: GitHub Actions**.

Target is a **user site** at `https://dannyglin.github.io/`, so `vite.config.ts`
keeps `base: '/'` and the repo must be named **`dannyglin.github.io`** (rename
`dannyglin/portfolio` on GitHub, or push this code to a repo with that name). If
it ever moves to a project site (`.../portfolio/`), set `base: '/portfolio/'`.
Routing is hash-based, so no SPA 404 fallback is needed.

## Known limitations / TODO ideas

- Real refraction is Chromium-only by design (see above).
- Photography is placeholder gradients until real images are added.
- No SEO/OpenGraph tags, no analytics, no 404 route, no favicon of Danny's own
  (still the Vite default `public/favicon.svg`).

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
- **2026-09-08** - Added the browser-local chat assistant (`ChatWidget/`,
  `lib/chat/`: web-llm + WebGPU, Llama-3.2-1B, lazy chunk; see
  `optimizeDeps.exclude` in `vite.config.ts`). Pushed the last flat controls
  onto the frosted-glass system: `.chip` is now real frosted glass with
  `button.chip` states, new `.glass-control` for the chat's small icon buttons
  (send / stop / header close+clear), which had been plain `bg-white/x`.
- **2026-09-08 (edits 2)** - Owner wanted the nav pill's *refraction* (not just
  frost) on the buttons / chips / text box. Added `GlassFilter.tsx` (inline SVG
  `feDisplacementMap` defs) + an `@supports` block in `index.css` that layers
  `url(#glass-warp)` onto the `.glass*` control classes. Chromium only; other
  engines keep the plain blur. See "Refraction on the CSS-glass controls".
- **2026-09-08 (edits 3)** - Extended the same refraction to every `.glass`
  content panel (hero blurb + all About / School / Projects / Photography /
  Resume cards), using the softer `#glass-warp-panel` map. `.glass` goes first
  in the `@supports` block so the control rules keep priority.
- **2026-09-08 (edits 4)** - Home hero pixel-sprite easter-egg: `.blurb-runner`
  (a sprite lapping the bio panel via CSS Motion Path) + `TrainerCluster.tsx`
  (the owner's Pokemon team in a data-driven shallow "V", sized to scale off
  canonical Pokedex heights, `xl:` only). Sprites in `public/sprites/`, re-encoded
  with `sips` (2.2 MB -> 36 KB). See "Home sprite easter-egg".
- **2026-09-08 (edits 5)** - First commit of the whole accumulated working tree
  (everything from 2026-09-07 on had been uncommitted). Added the "Deploy"
  section; GitHub Pages workflow already existed at `.github/workflows/deploy.yml`.
- **2026-09-09** - Chat assistant fixes. (1) Model download was failing with
  "Failed to execute 'add' on 'Cache': ... network error". web-llm's default
  Cache-API backend calls `Cache.add()`, which throws on a redirect/opaque
  response from the HF CDN or in storage-restricted contexts. `lib/chat/engine.ts`
  now passes `appConfig: { ...prebuiltAppConfig, cacheBackend: 'indexeddb' }` to
  `CreateMLCEngine` - IndexedDB has none of those edge cases. (2) Mobile: the
  open chat panel used to float as a large centred card over the page with no
  backdrop ("covering everything"). Below `sm` it is now a bottom sheet
  (`inset-x-2 bottom-2`, `h-[min(75dvh,560px)]`) behind a tap-to-close scrim
  (`bg-black/50 sm:hidden`), and `ChatWidget` locks `document.body` scroll while
  open on phones (`matchMedia('(max-width: 639px)')`). `>=sm` is unchanged - the
  small floating 400px card, no scrim, page stays scrollable. (3) Nudged
  `ferrothorn` up 12px in `TrainerCluster.tsx` (`y: 274 -> 262`).
  Note: the live chat model is `SmolLM2-360M-Instruct-q4f16_1-MLC` (set in
  `engine.ts` with a comment on the tradeoff), not the Llama-3.2-1B named in the
  2026-09-08 entry above.
- **2026-09-09 (edits 2)** - Sprite easter-egg reach + reduced motion. The
  "gifs aren't moving" report was `prefers-reduced-motion` (the old block set
  `animation: none` + `display: none`). Now it calms instead of kills: `--bob`
  var drops the bob to `-3px` / `7s`, `.blurb-runner` slows to a `32s` drift.
  Also lowered the team's gate from `xl:` to `lg:` (`TrainerCluster.tsx`) and
  added a `1024-1279.98px` media query that scales `.trainer-cluster` to `0.78`
  and pulls it in so it does not spill past the viewport in that range. Not yet
  eyeballed on a real 1024-1280 screen - tune the `scale()` / `translate()` in
  `index.css` if the wedge sits wrong there.
- **2026-09-09 (edits 3)** - Owner still saw the Pokemon + trainer sprites as
  not moving after edits 2. Verified with headless Chromium and WebKit
  (Playwright) that `sprite-bob` was in fact running and `prefers-reduced-motion`
  was off - the animation was real but too subtle to read as motion: `--bob`
  was a flat `-7px`, a clear bob on 78px Ferrothorn but only ~4% of 186px
  Dialga's height, easy to miss at a glance. Changed `--bob` to a percentage
  (`-12%`, reduced-motion `-5%`) in `index.css` so every sprite bobs by the same
  fraction of its own size regardless of literal px dimensions. Confirmed with
  a before/after screenshot diff that the visible motion increased
  substantially. `.blurb-runner` (the motion-path runner) was already moving
  correctly on both engines and was left alone.
- **2026-09-09 (edits 4)** - The real bug behind "still not moving": the owner
  meant the sprites should walk-cycle (frame animation), not just bob. Every
  sprite in `public/sprites/` is actually an APNG - the versions still sitting
  in `~/Downloads` (`male_charactor.png`, `male_running.png`, `dialga.png`,
  `metagross.png`, `empoleon.png`, `scizor.png`, `ferrothorn.png`,
  `skamory.png`) all carry `acTL`/`fcTL`/`fdAT` chunks and 4-520 frames each
  (confirmed with Pillow's `n_frames`). The 2026-09-08 "re-encoded through
  `sips` to strip junk metadata" pass (see old note just above) had silently
  flattened every one of them to their first frame only - `sips` doesn't know
  APNG exists, so it just re-saved frame 0 as a normal PNG, which is why the
  file size dropped from 2.2 MB to ~36 KB and why nothing ever animated.
  Fix: copied the original animated files from `~/Downloads` back over
  `public/sprites/*.png` unchanged (also fixed `skamory.png` -> `skarmory.png`,
  a typo in the Downloads filename that doesn't match `TrainerCluster.tsx`'s
  `name: 'skarmory'`). Verified real frame-by-frame playback with Playwright by
  disabling all CSS animation/transform and diffing screenshots of a sprite
  over time (pixels changed - confirms APNG decode, not just the CSS bob).
  Total sprite payload is back to ~2.2 MB (`scizor.png` alone is ~1.2 MB,
  520 frames) - no longer "keep new sprites lean" until there's an APNG-safe
  way to shrink them (see the note above this history section).
