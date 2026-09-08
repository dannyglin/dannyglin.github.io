import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: string
  /** Optional status badge shown next to the title, e.g. "Work in progress". */
  note?: string
  children: ReactNode
}

/** Consistent width, top padding (clears the fixed nav), and heading block. */
export default function SectionShell({ eyebrow, title, note, children }: Props) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-28 pt-28 sm:px-6 sm:pt-36">
      <p className="text-on-photo mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--ink-faint)]">
        {eyebrow}
      </p>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <h1 className="text-on-photo text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {note && (
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300/90" />
            {note}
          </span>
        )}
      </div>
      {children}
    </section>
  )
}
