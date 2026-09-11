import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import GlassPanel from '../components/GlassPanel'
import SectionShell from '../components/SectionShell'
import { photos } from '../lib/resume'

/** Full-size view of a grid photo - the grid crops to aspect-[4/5], this shows
 * the uncropped original. Closes on Escape, backdrop click, or the close button. */
function Lightbox({
  photo,
  onClose,
}: {
  photo: { title: string; location: string; src: string }
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  // Portaled straight to <body>: the tab wrapper in App.tsx has
  // `will-change: transform` for its slide-in animation, which creates a new
  // containing block for any `position: fixed` descendant. Rendered inline,
  // this modal would center itself within that (page-length) section box
  // instead of the actual viewport - looking fine at the top of the page but
  // cropped/offset once scrolled. Portaling escapes it entirely, same reason
  // ChatWidget mounts outside that wrapper in App.tsx.
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title} - ${photo.location}`}
      onClick={onClose}
    >
      <button
        type="button"
        className="glass-control absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white sm:right-6 sm:top-6"
        onClick={onClose}
        aria-label="Close"
      >
        &#x2715;
      </button>
      <figure
        className="flex max-h-full max-w-full flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={`${photo.title} - ${photo.location}`}
          className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="text-center text-sm text-[var(--ink-dim)]">
          <span className="font-semibold text-white">{photo.title}</span>
          {' - '}
          {photo.location}
        </figcaption>
      </figure>
    </div>,
    document.body,
  )
}

export default function Photography() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <SectionShell eyebrow="Photography" title="Through the lens">
      <p className="mb-8 max-w-2xl text-[var(--ink-dim)]">
        Frames from places I&apos;ve traveled. Click any photo for the full,
        uncropped shot.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <GlassPanel
            key={photo.title}
            className="group cursor-pointer overflow-hidden p-0"
            hover
            onClick={() => setOpenIndex(i)}
          >
            <div
              className="aspect-[4/5] w-full overflow-hidden"
              style={{ background: photo.swatch }}
            >
              <img
                src={photo.src}
                alt={`${photo.title} - ${photo.location}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="font-semibold text-white">{photo.title}</p>
              <p className="text-sm text-[var(--ink-faint)]">{photo.location}</p>
            </div>
          </GlassPanel>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox photo={photos[openIndex]} onClose={() => setOpenIndex(null)} />
      )}
    </SectionShell>
  )
}
