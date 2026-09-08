# Danny Lin's Portfolio

Hi! This is the source for my personal site, live at
**[dannyglin.github.io](https://dannyglin.github.io/)**.

It is a small single-page app with an Apple-style "liquid glass" look: frosted
panels floating over a slow, animated navy gradient. Everything is one page with
tabbed navigation (no router), and a few playful touches hiding in the corners.

## Running it locally

You will need Node 20+.

```bash
npm install
npm run dev       # http://localhost:5173
```

Other scripts:

```bash
npm run build     # type-check + bundle to dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## What is in here

| Piece            | Notes                                                              |
| ---------------- | ----------------------------------------------------------------- |
| Framework        | Vite 8 + React 19 + TypeScript                                    |
| Styling          | Tailwind CSS v4 + hand-written CSS in `src/index.css`             |
| Liquid glass     | [`liquid-glass-react`](https://www.npmjs.com/package/liquid-glass-react) for the nav pill; a CSS `.glass` system everywhere else |
| Content          | one file, `src/lib/resume.ts` (profile, education, experience, projects, ...) |
| Hosting          | GitHub Pages, built and deployed by GitHub Actions on every push to `main` |

Tabs: **Home - About - School - Projects - Photography - Resume**. Deep links
(`#about`, `#projects`, ...) and browser back/forward both work. You can also
swipe between tabs on touch devices, or drag across the nav pill.

## The fun parts

- **Real glass refraction.** The nav pill and, where the browser supports it,
  every frosted surface bend the background through an SVG displacement filter,
  not just a blur. Chromium gets the full effect; Safari and Firefox fall back
  to a clean `backdrop-filter` blur.
- **A chat assistant that runs in your browser.** Open it from the bottom-right
  bubble on the Home tab. It downloads a small Llama model with WebGPU and
  answers questions about me entirely on your machine - nothing is sent to a
  server. The model chunk is lazy-loaded, so it only downloads if you ask.
- **A hero easter-egg.** On wide screens, my Pokemon team stands to the right of
  the intro card, drawn to scale off their real Pokedex heights. A tiny sprite
  also jogs a lap around the bio panel forever.

All motion respects `prefers-reduced-motion`.

## Layout

```
src/
  App.tsx            # shell: background, nav, tab switching, chat widget
  index.css          # theme tokens, animated gradient, the .glass system, animations
  lib/
    resume.ts        # all site copy lives here
    tabs.ts          # the tab list
    chat/            # the local chat assistant engine + prompt
  components/         # Background, NavBar, GlassPanel/Button, TrainerCluster, ChatWidget, ...
  sections/          # one file per tab
public/
  Danny_Lin_Resume.pdf
  sprites/           # pixel art for the hero easter-egg
```

For the deeper architecture notes (why the glass is built the way it is, how the
background works, deployment details), see [`CLAUDE.md`](./CLAUDE.md).

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. The repo is named `dannyglin.github.io`
so it serves from the domain root, which is why `base` stays `'/'` in
`vite.config.ts`.
