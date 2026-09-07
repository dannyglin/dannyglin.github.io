import type { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean
}

/**
 * CSS-only frosted glass panel (backdrop-filter). Used for large content
 * surfaces where stacking many <LiquidGlass> SVG filters would be costly,
 * and so the look degrades cleanly in Safari / Firefox.
 */
export default function GlassPanel({
  hover = false,
  className = '',
  children,
  ...rest
}: Props) {
  return (
    <div
      className={`glass ${hover ? 'glass-hover' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
