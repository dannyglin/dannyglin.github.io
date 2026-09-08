/**
 * Inline SVG displacement filters for the "liquid glass" refraction - the thing
 * that makes the nav pill *warp* what's behind it instead of only blurring it.
 *
 * Referenced from the `.glass*` classes in `index.css` as
 * `backdrop-filter: blur() saturate() url(#glass-warp)`. `feDisplacementMap`
 * pushes the backdrop pixels around per a turbulence field, so small controls
 * (buttons, chips, the chat composer) get real refraction, not just frost.
 *
 * Chromium only: other engines don't resolve an SVG `url()` inside
 * `backdrop-filter`, so `index.css` keeps a plain `blur()` as the base and only
 * layers the `url()` on inside an `@supports (backdrop-filter: url("#glass-warp"))`
 * guard. Same browser story as the `<LiquidGlass>` nav (see CLAUDE.md).
 *
 * One copy for the whole app - render it once near the root (App.tsx).
 */
export default function GlassFilter() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
    >
      <defs>
        {/* Controls / chips / inputs: gentle wobble, small edge lensing. */}
        <filter
          id="glass-warp"
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.013 0.013"
            numOctaves="2"
            seed="17"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.3" result="soft" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="soft"
            scale="34"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Bigger surfaces (chat panel): lower frequency, a touch more scale. */}
        <filter
          id="glass-warp-panel"
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.006"
            numOctaves="2"
            seed="42"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.6" result="soft" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="soft"
            scale="26"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
