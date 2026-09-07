# portfolio

Danny Lin's personal portfolio - a tabbed single-page site with an Apple-style
"liquid glass" aesthetic. Vite + React + TypeScript + Tailwind CSS v4, using
[`liquid-glass-react`](https://www.npmjs.com/package/liquid-glass-react) for the
navigation glass.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/ (static)
```

Tabs: Home · About · School · Projects · Photography · Resume.
All content lives in `src/lib/resume.ts`. See [`CLAUDE.md`](./CLAUDE.md) for the
full architecture notes.
