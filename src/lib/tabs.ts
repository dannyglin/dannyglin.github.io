export const TABS = [
  'home',
  'about',
  'school',
  'projects',
  'photography',
  'resume',
] as const

export type Tab = (typeof TABS)[number]

export const TAB_LABELS: Record<Tab, string> = {
  home: 'Home',
  about: 'About',
  school: 'School',
  projects: 'Projects',
  photography: 'Photography',
  resume: 'Resume',
}

export function isTab(value: string): value is Tab {
  return (TABS as readonly string[]).includes(value)
}
