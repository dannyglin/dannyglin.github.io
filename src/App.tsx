import { useEffect, useRef, useState, type ReactNode } from 'react'
import Background from './components/Background'
import FloatingContact from './components/FloatingContact'
import NavBar from './components/NavBar'
import { TABS, isTab, type Tab } from './lib/tabs'
import About from './sections/About'
import Home from './sections/Home'
import Photography from './sections/Photography'
import Projects from './sections/Projects'
import Resume from './sections/Resume'
import School from './sections/School'

function readHash(): Tab {
  const raw = window.location.hash.replace('#', '').trim()
  return isTab(raw) ? raw : 'home'
}

// A horizontal drag/swipe must clear this many px, and be this much more
// horizontal than vertical, before it counts as "go to the next tab".
const SWIPE_DIST = 70
const SWIPE_RATIO = 1.4

export default function App() {
  const [tab, setTab] = useState<Tab>(readHash)
  // Direction of the last tab change: 1 = moved forward in TABS, -1 = back.
  // Drives which way the incoming section slides in.
  const [dir, setDir] = useState<1 | -1>(1)

  // Committed current tab, for use inside stable event handlers.
  const tabRef = useRef(tab)
  useEffect(() => {
    tabRef.current = tab
  }, [tab])

  const changeTab = (next: Tab) => {
    setDir(TABS.indexOf(next) >= TABS.indexOf(tabRef.current) ? 1 : -1)
    setTab(next)
  }

  // Keep tab state and the URL hash in sync (deep links + back button).
  useEffect(() => {
    const onHashChange = () => changeTab(readHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const go = (next: Tab) => {
    if (next !== tabRef.current) window.scrollTo({ top: 0, behavior: 'auto' })
    window.location.hash = next === 'home' ? '' : next
    changeTab(next)
  }

  const goByOffset = (delta: 1 | -1) => {
    const next = TABS[TABS.indexOf(tabRef.current) + delta]
    if (next) go(next)
  }

  // --- swipe between tabs (touch only) -----------------------------------
  // Deliberately touch/pen only: on a mouse, a horizontal drag is how you
  // select text to copy, and hijacking that to change tabs is maddening.
  // Desktop users switch tabs by clicking or dragging across the nav pill.
  const gesture = useRef({ x: 0, y: 0, t: 0, active: false })

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return
    gesture.current = { x: e.clientX, y: e.clientY, t: Date.now(), active: true }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const g = gesture.current
    if (!g.active || e.pointerType === 'mouse') return
    g.active = false

    // A real text selection (even on touch) means the user was highlighting.
    if (window.getSelection?.()?.toString().trim()) return

    const dx = e.clientX - g.x
    const dy = e.clientY - g.y
    if (Date.now() - g.t > 2000) return
    // Must be a clear, mostly-horizontal drag.
    if (Math.abs(dx) < SWIPE_DIST || Math.abs(dx) < Math.abs(dy) * SWIPE_RATIO)
      return

    goByOffset(dx < 0 ? 1 : -1)
  }

  const sections: Record<Tab, ReactNode> = {
    home: <Home onNavigate={go} />,
    about: <About />,
    school: <School />,
    projects: <Projects />,
    photography: <Photography />,
    resume: <Resume />,
  }

  return (
    <>
      <Background />
      <NavBar active={tab} onSelect={go} />

      <div
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (gesture.current.active = false)}
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        <main>
          <div
            key={tab}
            className="tab-enter"
            style={
              { '--enter-x': dir === 1 ? '28px' : '-28px' } as React.CSSProperties
            }
          >
            {sections[tab]}
          </div>
        </main>
      </div>

      <FloatingContact onHome={() => go('home')} />
    </>
  )
}
