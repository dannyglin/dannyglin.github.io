import GlassButton from '../components/GlassButton'
import GlassPanel from '../components/GlassPanel'
import SectionShell from '../components/SectionShell'
import { education, experience, profile } from '../lib/resume'

export default function Resume() {
  return (
    <SectionShell eyebrow="Resume" title="Resume">
      <div className="mb-8 flex flex-wrap gap-4">
        <GlassButton href={profile.resumePdf} download>
          Download PDF
        </GlassButton>
        <GlassButton href={profile.resumePdf} newTab>
          Open in new tab
        </GlassButton>
      </div>

      {/* Text mirror of the PDF - good for search, screen readers, and print. */}
      <div className="space-y-8">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--ink-faint)]">
            Experience
          </h2>
          <div className="space-y-5">
            {experience.map((j) => (
              <GlassPanel key={`${j.company}-${j.start}`} className="p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="font-semibold text-white">
                    {j.role}
                    {j.team ? ` - ${j.team}` : ''}
                  </p>
                  <span className="text-sm text-[var(--ink-faint)]">
                    {j.start} - {j.end}
                  </span>
                </div>
                <p className="text-sm text-[var(--ink-dim)]">
                  {j.company} · {j.location}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-[var(--ink-dim)]">
                  {j.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/50" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--ink-faint)]">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((e) => (
              <GlassPanel key={e.school} className="p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="font-semibold text-white">{e.school}</p>
                  <span className="text-sm text-[var(--ink-faint)]">
                    {e.start} - {e.end}
                  </span>
                </div>
                <p className="text-sm text-[var(--ink-dim)]">{e.degree}</p>
                <p className="text-sm text-[var(--ink-faint)]">
                  {e.location} · {e.detail}
                </p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
