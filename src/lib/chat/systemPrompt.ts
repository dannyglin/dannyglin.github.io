import {
  education,
  experience,
  hobbies,
  profile,
  projects,
  skills,
} from '../resume'

/**
 * The grounding context for the portfolio assistant, built once from the same
 * resume data the pages render. The model is told to answer only from this and
 * to decline anything else, which is about all a sub-1B model can be trusted
 * with.
 */

const flat = (s: string) => s.replace(/\s+/g, ' ').trim()

function buildPrompt(): string {
  const exp = experience
    .map((j) => {
      const head = `${j.role}${j.team ? `, ${j.team}` : ''} at ${j.company} (${j.location}), ${j.start} to ${j.end}`
      const pts = j.points
        .slice(0, 4)
        .map((p) => `  - ${flat(p)}`)
        .join('\n')
      return `- ${head}\n${pts}`
    })
    .join('\n')

  const proj = projects
    .map((p) => {
      const pts = p.points.map((x) => `  - ${flat(x)}`).join('\n')
      return `- ${p.name} (${p.stack.join(', ')})\n${pts}`
    })
    .join('\n')

  const edu = education
    .map(
      (e) =>
        `- ${e.degree}, ${e.school} (${e.location}), ${e.start} to ${e.end}. ${flat(e.detail)}`,
    )
    .join('\n')

  const sk = skills.map((s) => `- ${s.group}: ${s.items.join(', ')}`).join('\n')

  return [
    `You are the assistant on ${profile.name}'s portfolio website. ${profile.name} is a ${profile.title} based in ${profile.location}.`,
    `Answer only using the facts below. If a question is not covered by them, say you can only help with questions about ${profile.name} and his work, and name a few things you can cover (experience, projects, education, skills). Never invent employers, dates, numbers, or projects. Keep answers short, plain, and specific. Use plain hyphens, never long dashes.`,
    ``,
    `SUMMARY: ${flat(profile.blurb)}`,
    `CONTACT: ${profile.email}; GitHub ${profile.links.github}; LinkedIn ${profile.links.linkedin}.`,
    ``,
    `EXPERIENCE:`,
    exp,
    ``,
    `PROJECTS:`,
    proj,
    ``,
    `EDUCATION:`,
    edu,
    ``,
    `SKILLS:`,
    sk,
    ``,
    `INTERESTS: ${hobbies.join(', ')}.`,
  ].join('\n')
}

export const SYSTEM_PROMPT = buildPrompt()

/** A few starter questions for the empty chat. */
export const EXAMPLE_PROMPTS = [
  'What did Danny build at AT&T?',
  "What's his tech stack?",
  'Where did he study?',
]
