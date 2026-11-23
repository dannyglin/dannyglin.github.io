import { education, experience, hobbies, profile, projects, skills } from '../resume'

export const NO_PORTFOLIO_ANSWER =
  'I can look up Danny’s work, projects, education, skills, or contact details. Try “What is Stilltide?” or “Where did Danny study?”'

const projectDetails = (project: (typeof projects)[number]) =>
  [project.name, project.summary, ...project.points].join('\n')

export function portfolioAnswer(question: string): string {
  const query = question.toLowerCase()
  const project = projects.find(({ name }) => query.includes(name.toLowerCase()))
    ?? (/pokémon|pokemon|randomiz/.test(query) ? projects[0] : undefined)

  if (project) return projectDetails(project)
  if (/contact|email|linkedin|github|reach/.test(query)) {
    return `Email Danny at ${profile.email}. You can also find him on LinkedIn (${profile.links.linkedin}) and GitHub (${profile.links.github}).`
  }
  if (/school|stud(y|ied)|educat|degree|college|universit|penn|stony/.test(query)) {
    return education.map(({ school, degree, end }) => `${school} · ${degree} (${end})`).join('\n')
  }
  if (/stack|skill|language|technolog|framework|tool/.test(query)) {
    return skills.map(({ group, items }) => `${group}: ${items.join(', ')}`).join('\n')
  }
  if (/at[& ]t|work|career|role|job|firewall|experience|milliman/.test(query)) {
    const jobs = experience.filter(({ company }) =>
      /milliman/.test(query) ? company === 'Milliman' : company === 'AT&T',
    )
    return jobs.map(({ role, team, company, points }) => `${role} · ${company}, ${team}\n${points[0]}`).join('\n\n')
  }
  if (/project|app|built|build/.test(query)) {
    return projects.map(({ name, summary }) => `${name} · ${summary}`).join('\n\n')
  }
  if (/hobb|interest|outside|free time/.test(query)) return hobbies.join(', ') + '.'
  if (/who is|about danny|introduce|describe danny|where.*(live|based)/.test(query)) {
    return `${profile.name} is a ${profile.title} based in ${profile.location}. ${profile.blurb}`
  }

  return NO_PORTFOLIO_ANSWER
}
