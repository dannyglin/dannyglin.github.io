import GlassPanel from '../components/GlassPanel'
import SectionShell from '../components/SectionShell'
import { education } from '../lib/resume'

export default function School() {
  return (
    <SectionShell eyebrow="School" title="Education">
      <div className="space-y-6">
        {education.map((e) => (
          <GlassPanel key={e.school} className="p-6 sm:p-8" hover>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-xl font-semibold text-white">{e.school}</h2>
              <span className="text-sm text-[var(--ink-faint)]">
                {e.start} - {e.end}
              </span>
            </div>
            <p className="mt-1 text-[var(--ink-dim)]">{e.degree}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="chip">{e.location}</span>
              <span className="chip">{e.detail}</span>
            </div>
          </GlassPanel>
        ))}
      </div>
    </SectionShell>
  )
}
