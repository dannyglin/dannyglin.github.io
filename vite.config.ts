import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// `base` stays '/' - deployed as a GitHub *user* site at
// https://dannyglin.github.io/ , which serves from the domain root. This
// requires the repo to be named `dannyglin.github.io`. If it ever becomes a
// project site (served from /portfolio/), change `base` to '/portfolio/'.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Large ESM package with its own dynamic-import + wasm graph; let it stay a
  // lazy chunk instead of esbuild trying to pre-bundle it in `npm run dev`.
  optimizeDeps: { exclude: ['@mlc-ai/web-llm'] },
  // The @mlc-ai/web-llm chunk is ~6 MB but it is lazy-loaded only when the user
  // opens the chat and clicks "Load", so the size warning is expected noise.
  build: { chunkSizeWarningLimit: 7000 },
})
