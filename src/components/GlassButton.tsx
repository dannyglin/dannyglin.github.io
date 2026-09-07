import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  download?: boolean
  newTab?: boolean
}

/**
 * Frosted-glass pill button / link.
 *
 * Uses the CSS `.glass` system rather than <LiquidGlass>: that component only
 * lays out as a fixed/absolute floating element (see NavBar), which is wrong for
 * inline call-to-action buttons sitting in normal flow.
 */
export default function GlassButton({
  children,
  href,
  onClick,
  download,
  newTab,
}: Props) {
  const cls =
    'glass glass-frost glass-hover inline-flex items-center gap-2 rounded-full ' +
    'px-5 py-2.5 text-sm font-semibold text-white no-underline cursor-pointer select-none'

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={cls}
        {...(download ? { download: '' } : {})}
        {...(newTab ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
