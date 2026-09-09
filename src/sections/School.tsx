import { useState } from 'react'
import GlassPanel from '../components/GlassPanel'
import SectionShell from '../components/SectionShell'
import { education, type Education } from '../lib/resume'

function EducationCard({ e }: { e: Education }) {
  const [showCourses, setShowCourses] = useState(false)

  return (
    <GlassPanel className="p-6 sm:p-8" hover>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-xl font-semibold text-white">{e.school}</h2>
        <span className="text-sm text-[var(--ink-faint)]">
          {e.start} - {e.end}
        </span>
      </div>
      <p className="mt-1 text-[var(--ink-dim)]">{e.degree}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="chip">{e.location}</span>
        <span className="chip">{e.detail}</span>
        {e.courses && (
          <button
            type="button"
            className="chip"
            aria-expanded={showCourses}
            onClick={() => setShowCourses((v) => !v)}
          >
            {showCourses ? 'Hide coursework' : 'Relevant coursework'}
            <span aria-hidden="true">{showCourses ? '−' : '+'}</span>
          </button>
        )}
      </div>
      {e.courses && showCourses && (
        <div className="mt-5 space-y-4 border-t border-[var(--line)] pt-5">
          {e.courses.map((c) => (
            <div key={c.group}>
              <p className="mb-2 text-sm font-medium text-[var(--ink-dim)]">
                {c.group}
              </p>
              <div className="flex flex-wrap gap-2">
                {c.items.map((i) => (
                  <span key={i} className="chip">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassPanel>
  )
}

export default function School() {
  return (
    <SectionShell eyebrow="School" title="Education">
      <div className="space-y-6">
        {education.map((e) => (
          <EducationCard key={e.school} e={e} />
        ))}
      </div>
    </SectionShell>
  )
}
