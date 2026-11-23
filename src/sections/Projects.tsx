import GlassPanel from '../components/GlassPanel'
import SectionShell from '../components/SectionShell'
import { experience, projects } from '../lib/resume'

export default function Projects() {
  const workHighlights = experience.filter((job) => job.company === 'AT&T')

  return (
    <SectionShell eyebrow="Projects" title="Things I’ve built">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <GlassPanel
            key={project.name}
            className={`p-6 sm:p-8 ${index === 0 ? 'md:col-span-2' : ''}`}
          >
            <article className={index === 0 ? 'grid gap-6 md:grid-cols-2 md:items-start' : undefined}>
              <div>
                <p className="text-sm font-medium text-[var(--ink-faint)]">{project.platform}</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">{project.name}</h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-white">{project.summary}</p>
                <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-[var(--ink-dim)]">
                  {project.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((technology) => (
                    <span key={technology} className="chip">{technology}</span>
                  ))}
                </div>
                {project.links && (
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {project.links.map(({ href, label }) => (
                      <a key={href} href={href} className="font-medium text-white underline underline-offset-4">
                        {label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {project.demo && (
                <figure className={index === 0 ? undefined : 'mt-6'}>
                  <video
                    className="aspect-[8/5] w-full rounded-xl border border-white/20 bg-black object-contain"
                    src={project.demo.video}
                    poster={project.demo.poster}
                    aria-label={`${project.name} video demo`}
                    controls
                    playsInline
                    preload="none"
                  />
                  <figcaption className="mt-3 text-sm text-[var(--ink-dim)]">
                    <p>{project.demo.caption}</p>
                    <a href={project.demo.href} className="mt-2 inline-block font-medium text-white underline underline-offset-4">
                      {project.demo.label}
                    </a>
                  </figcaption>
                </figure>
              )}
            </article>
          </GlassPanel>
        ))}
      </div>

      <h2 className="mb-4 mt-12 text-xl font-semibold text-white">Selected work at AT&amp;T</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {workHighlights.map((job) => (
          <GlassPanel key={job.team} className="p-6">
            <h3 className="font-semibold text-white">{job.team}</h3>
            <p className="mt-1 text-sm text-[var(--ink-faint)]">{job.start} – {job.end}</p>
            <p className="mt-3 text-[var(--ink-dim)]">{job.points[0]}</p>
          </GlassPanel>
        ))}
      </div>
    </SectionShell>
  )
}
