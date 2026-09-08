import GlassPanel from '../components/GlassPanel'
import SectionShell from '../components/SectionShell'
import { experience, projects } from '../lib/resume'

export default function Projects() {
  // Pull the strongest shipped work out of the experience list too.
  const workHighlights = experience
    .filter((j) => j.team)
    .map((j) => ({
      name: `${j.company} · ${j.team}`,
      period: `${j.start} - ${j.end}`,
      point: j.points[0],
    }))

  return (
    <SectionShell
      eyebrow="Projects"
      title="Things I've built"
      note="Work in progress"
    >
      <div className="space-y-6">
        {projects.map((p) => (
          <GlassPanel key={p.name} className="p-6 sm:p-8" hover>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-xl font-semibold text-white">{p.name}</h2>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[var(--ink-dim)] underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  Visit ↗
                </a>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
            <ul className="mt-4 space-y-2 text-[var(--ink-dim)]">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/50" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        ))}
      </div>

      <h2 className="mb-4 mt-12 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--ink-faint)]">
        Shipped at work
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {workHighlights.map((w) => (
          <GlassPanel key={w.name} className="p-6" hover>
            <p className="font-semibold text-white">{w.name}</p>
            <p className="mt-1 text-xs text-[var(--ink-faint)]">{w.period}</p>
            <p className="mt-3 text-sm text-[var(--ink-dim)]">{w.point}</p>
          </GlassPanel>
        ))}
      </div>
    </SectionShell>
  )
}
