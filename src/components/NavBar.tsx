import LiquidGlass from 'liquid-glass-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { TABS, TAB_LABELS, isTab, type Tab } from '../lib/tabs'

type Props = {
  active: Tab
  onSelect: (tab: Tab) => void
}

type Box = { x: number; y: number; w: number; h: number }

/**
 * Fixed top navigation rendered as a real <LiquidGlass> surface.
 *
 * liquid-glass-react is built to be a single free-floating element: it hard-codes
 * `top/left: 50%` + a `translate(-50%, -50%)` and emits several sibling layers,
 * so it only lays out correctly when given `position: fixed | absolute`. That is
 * exactly what a floating nav pill wants, so this is the one spot it's used.
 *
 * Ways to change tab from the pill:
 *   - click a tab (also keyboard: focus + Enter/Space -> the button's onClick)
 *   - press anywhere on the strip and drag; the highlight follows the pointer and
 *     the tab you release over is selected. If the strip overflows its max width
 *     it also scrolls under the drag.
 *
 * The highlight is a single element (`.nav-indicator`) whose position + size are
 * measured from the target button and eased in CSS, so it glides between tabs.
 */
export default function NavBar({ active, onSelect }: Props) {
  const scrollerRef = useRef<HTMLUListElement>(null)
  const btnRefs = useRef(new Map<Tab, HTMLButtonElement>())
  const drag = useRef({ down: false, startX: 0, startLeft: 0 })
  const [hoverTab, setHoverTab] = useState<Tab | null>(null)
  const [box, setBox] = useState<Box | null>(null)

  // Where the highlight should sit: the tab under the pointer while dragging,
  // otherwise the active tab.
  const target = hoverTab ?? active

  useLayoutEffect(() => {
    const measure = () => {
      const b = btnRefs.current.get(target)
      if (b) setBox({ x: b.offsetLeft, y: b.offsetTop, w: b.offsetWidth, h: b.offsetHeight })
    }
    measure()
    window.addEventListener('resize', measure)
    // Fonts settling can shift button widths after first paint.
    document.fonts?.ready.then(measure).catch(() => {})
    return () => window.removeEventListener('resize', measure)
  }, [target])

  const tabAtPoint = (x: number, y: number): Tab | null => {
    const host = document
      .elementFromPoint(x, y)
      ?.closest<HTMLElement>('[data-tab]')
    const t = host?.dataset.tab
    return t && isTab(t) ? t : null
  }

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const el = scrollerRef.current
    if (!el) return
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!drag.current.down) return
    const el = scrollerRef.current
    if (!el) return
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX)
    setHoverTab(tabAtPoint(e.clientX, e.clientY))
  }

  const endDrag = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!drag.current.down) return
    drag.current.down = false
    setHoverTab(null)
    const t = tabAtPoint(e.clientX, e.clientY)
    if (t) onSelect(t)
  }

  const abandon = () => {
    drag.current.down = false
    setHoverTab(null)
  }

  return (
    <nav aria-label="Primary">
      <LiquidGlass
        cornerRadius={999}
        padding="6px"
        blurAmount={0.55}
        displacementScale={44}
        saturation={140}
        aberrationIntensity={2}
        elasticity={0.25}
        mode="standard"
        style={{
          position: 'fixed',
          top: '2.75rem',
          left: '50%',
          zIndex: 50,
          maxWidth: 'calc(100vw - 20px)',
        }}
      >
        <ul
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={abandon}
          onPointerLeave={abandon}
          style={{ maxWidth: 'calc(100vw - 40px)', touchAction: 'pan-y' }}
          className="relative flex flex-nowrap cursor-grab select-none items-center gap-0.5 overflow-x-auto [scrollbar-width:none] active:cursor-grabbing sm:gap-1 [&::-webkit-scrollbar]:hidden"
        >
          {box && (
            <span
              aria-hidden="true"
              className="nav-indicator pointer-events-none absolute left-0 top-0 rounded-full bg-white/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
              style={{
                transform: `translate(${box.x}px, ${box.y}px)`,
                width: box.w,
                height: box.h,
              }}
            />
          )}

          {TABS.map((tab) => {
            const lit = target === tab
            return (
              <li key={tab}>
                <button
                  ref={(el) => {
                    if (el) btnRefs.current.set(tab, el)
                    else btnRefs.current.delete(tab)
                  }}
                  type="button"
                  data-tab={tab}
                  onClick={() => onSelect(tab)}
                  aria-current={active === tab ? 'page' : undefined}
                  className={`relative whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold transition-colors sm:px-4 sm:text-sm ${
                    lit ? 'text-white' : 'text-white/55 hover:text-white/85'
                  }`}
                >
                  {TAB_LABELS[tab as Tab]}
                </button>
              </li>
            )
          })}
        </ul>
      </LiquidGlass>
    </nav>
  )
}
