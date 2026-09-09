import GlassPanel from '../components/GlassPanel'
import SectionShell from '../components/SectionShell'
import { photos } from '../lib/resume'

export default function Photography() {
  return (
    <SectionShell
      eyebrow="Photography"
      title="Through the lens"
      note="Work in progress"
    >
      <p className="mb-8 max-w-2xl text-[var(--ink-dim)]">
        A few real frames from places I&apos;ve traveled, plus placeholder
        cards still waiting on scans.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <GlassPanel
            key={photo.title}
            className="group overflow-hidden p-0"
            hover
          >
            {photo.src ? (
              <img
                src={photo.src}
                alt={`${photo.title} - ${photo.location}`}
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div
                className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-105"
                style={{ background: photo.swatch }}
              />
            )}
            <div className="p-4">
              <p className="font-semibold text-white">{photo.title}</p>
              <p className="text-sm text-[var(--ink-faint)]">{photo.location}</p>
            </div>
          </GlassPanel>
        ))}
      </div>
    </SectionShell>
  )
}
