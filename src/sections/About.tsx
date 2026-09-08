import GlassPanel from '../components/GlassPanel'
import SectionShell from '../components/SectionShell'
import { experience, hobbies, skills } from '../lib/resume'

export default function About() {
  const current = experience[0]

  return (
    <SectionShell eyebrow="About" title="Who I am">
      <div className="grid gap-6 lg:grid-cols-5">
        <GlassPanel className="p-6 sm:p-8 lg:col-span-3">
          <p className="text-base leading-relaxed text-[var(--ink-dim)] sm:text-lg">
            Hi, I&apos;m Danny.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-dim)]">
            I&apos;m a software engineer at AT&amp;T working on 100 billion rows
            of data - cleaning, parsing, and transforming them into a story.
            I&apos;ve worked on full-stack development, RAG pipelines, and
            time-series machine learning concepts across the Cyber Security
            Office, Network Chief Technology Office, and Optical Network team.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-dim)]">
            I earned my M.S. in Computer Science from the University of
            Pennsylvania after studying Applied Mathematics, Statistics, and
            Business at Stony Brook University.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-dim)]">
            Outside of work, I love running, basketball, stock investing, real
            estate, trying new restaurants + cafes and iOS and game development.
          </p>
        </GlassPanel>

        <GlassPanel className="p-6 sm:p-8 lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--ink-faint)]">
            Currently
          </h2>
          <p className="mt-3 text-lg font-semibold text-white">
            {current.role}
          </p>
          <p className="text-[var(--ink-dim)]">
            {current.team} · {current.company}
          </p>
          <p className="mt-1 text-sm text-[var(--ink-faint)]">
            {current.start} - {current.end} · {current.location}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--ink-dim)]">
            {current.points.slice(0, 3).map((p) => (
              <li key={p} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/50" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </GlassPanel>
      </div>

      <h2 className="mb-4 mt-12 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--ink-faint)]">
        Toolbox
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((s) => (
          <GlassPanel key={s.group} className="p-6" hover>
            <h3 className="mb-3 font-semibold text-white">{s.group}</h3>
            <div className="flex flex-wrap gap-2">
              {s.items.map((i) => (
                <span key={i} className="chip">
                  {i}
                </span>
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>

      <h2 className="mb-4 mt-12 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--ink-faint)]">
        Off the clock
      </h2>
      <GlassPanel className="p-6 sm:p-8">
        <div className="flex flex-wrap gap-2">
          {hobbies.map((h) => (
            <span key={h} className="chip">
              {h}
            </span>
          ))}
        </div>
      </GlassPanel>
    </SectionShell>
  )
}
