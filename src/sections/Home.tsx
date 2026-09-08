import GlassButton from '../components/GlassButton'
import GlassPanel from '../components/GlassPanel'
import { profile } from '../lib/resume'
import type { Tab } from '../lib/tabs'

const highlights = [
  'M.S. Computer Science, University of Pennsylvania',
  'B.S. Applied Mathematics + Business Management, Stony Brook University',
]

export default function Home({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-4 pb-32 pt-32 sm:px-6">
      <h1 className="text-on-photo text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl">
        {profile.name}
      </h1>
      <p className="text-on-photo mt-4 text-xl text-[var(--ink-dim)] sm:text-2xl">
        {profile.title}
      </p>
      <p className="text-on-photo mt-2 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--ink-faint)]">
        {profile.location}
      </p>

      <GlassPanel className="mt-10 max-w-2xl p-6 sm:p-8">
        <p className="text-base leading-relaxed text-[var(--ink-dim)] sm:text-lg">
          {profile.blurb}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {highlights.map((h) => (
            <span key={h} className="chip">
              {h}
            </span>
          ))}
        </div>
      </GlassPanel>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <GlassButton onClick={() => onNavigate('resume')}>
          View resume
        </GlassButton>
        <GlassButton href={`mailto:${profile.email}`}>Email me</GlassButton>
        <GlassButton href={profile.links.github} newTab>
          GitHub
        </GlassButton>
        <GlassButton href={profile.links.linkedin} newTab>
          LinkedIn
        </GlassButton>
      </div>
    </section>
  )
}
