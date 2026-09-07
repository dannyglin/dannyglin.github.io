import GlassPanel from '../components/GlassPanel'
import SectionShell from '../components/SectionShell'
import { experience, hobbies, profile, skills } from '../lib/resume'

export default function About() {
  const current = experience[0]

  return (
    <SectionShell eyebrow="About" title="Who I am">
      <div className="grid gap-6 lg:grid-cols-5">
        <GlassPanel className="p-6 sm:p-8 lg:col-span-3">
          <p className="text-base leading-relaxed text-[var(--ink-dim)] sm:text-lg">
            {profile.blurb}
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-dim)]">
            I finished an M.S. in Computer Science at the University of
            Pennsylvania in December 2025, after a B.S. in Applied Mathematics
            &amp; Statistics and Business Management at Stony Brook University
            (Magna Cum Laude). Since then I&apos;ve been at AT&amp;T, moving from
            the Network CTO into the Cyber Security Office.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-dim)]">
            My work runs from PySpark pipelines over hundreds of billions of log
            rows on Databricks, to LLM evaluation pipelines and RAG systems, to
            the internal React / Azure / PostgreSQL apps analysts use every day.
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
