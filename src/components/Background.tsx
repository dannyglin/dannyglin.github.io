import { useEffect, useRef } from 'react'

/**
 * Animated "water" gradient field, ported from ximluo.github.io:
 * five slow-moving radial-gradient blobs merged by an SVG "goo" filter over a
 * deep-navy base, a fine dot-matrix grain painted from a canvas, and a
 * cursor-following glow. Blob geometry / colours / timings and the grain tile
 * mirror that site's GradientBackground.
 */

// A 256x256 grain tile: for ~80% of a 2px grid, a random-brightness pixel at
// alpha 35. Generated once, then tiled across the canvas. (ximluo's algorithm.)
const NOISE_TILE_SIZE = 256
let noiseTile: HTMLCanvasElement | null = null

function getNoiseTile(): HTMLCanvasElement | null {
  if (noiseTile) return noiseTile
  const tile = document.createElement('canvas')
  tile.width = NOISE_TILE_SIZE
  tile.height = NOISE_TILE_SIZE
  const ctx = tile.getContext('2d')
  if (!ctx) return null

  const img = ctx.createImageData(NOISE_TILE_SIZE, NOISE_TILE_SIZE)
  const buf = img.data
  for (let y = 0; y < NOISE_TILE_SIZE; y += 2) {
    for (let x = 0; x < NOISE_TILE_SIZE; x += 2) {
      if (Math.random() > 0.2) {
        const i = (y * NOISE_TILE_SIZE + x) * 4
        const shade = (Math.random() * 256) | 0
        buf[i] = shade
        buf[i + 1] = shade
        buf[i + 2] = shade
        buf[i + 3] = 35
      }
    }
  }
  ctx.putImageData(img, 0, 0)
  noiseTile = tile
  return tile
}

export default function Background() {
  const noiseRef = useRef<HTMLCanvasElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)

  // Paint / repaint the tiled grain to fill the viewport.
  useEffect(() => {
    const canvas = noiseRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const paint = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      if (w <= 0 || h <= 0) return
      canvas.width = w
      canvas.height = h
      const tile = getNoiseTile()
      const pattern = tile && ctx.createPattern(tile, 'repeat')
      if (!pattern) return
      ctx.fillStyle = pattern
      ctx.fillRect(0, 0, w, h)
    }

    paint()
    window.addEventListener('resize', paint)
    return () => window.removeEventListener('resize', paint)
  }, [])

  // Cursor-following glow (desktop, pointer:fine only).
  useEffect(() => {
    const el = bubbleRef.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return

    let curX = 0
    let curY = 0
    let tgX = window.innerWidth / 2
    let tgY = window.innerHeight / 2
    let raf = 0

    const tick = () => {
      curX += (tgX - curX) / 20
      curY += (tgY - curY) / 20
      el.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
      raf = requestAnimationFrame(tick)
    }
    const onMove = (e: MouseEvent) => {
      tgX = e.clientX
      tgY = e.clientY
    }
    window.addEventListener('mousemove', onMove)
    tick()
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="bg-stage" aria-hidden="true">
      <svg className="bg-goo-defs">
        <defs>
          <filter id="bg-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="bg-blobs">
        <div className="bg-blob b1" />
        <div className="bg-blob b2" />
        <div className="bg-blob b3" />
        <div className="bg-blob b4" />
        <div className="bg-blob b5" />
        <div ref={bubbleRef} className="bg-blob bi" />
      </div>

      <canvas ref={noiseRef} className="bg-noise" />
    </div>
  )
}
