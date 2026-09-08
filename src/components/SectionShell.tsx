import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: string
  children: ReactNode
}

/** Consistent width, top padding (clears the fixed nav), and heading block. */
export default function SectionShell({ eyebrow, title, children }: Props) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-28 pt-28 sm:px-6 sm:pt-36">
      <p className="text-on-photo mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--ink-faint)]">
        {eyebrow}
      </p>
      <h1 className="text-on-photo mb-8 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      {children}
    </section>
  )
}
