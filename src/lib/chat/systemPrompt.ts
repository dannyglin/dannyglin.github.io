export const PORTFOLIO_TOPICS = [
  'work',
  'education',
  'skills',
  'projects',
  'Stilltide',
  'Tomato',
  'Pocket Randomizer',
  'contact',
  'hobbies',
] as const

export const SYSTEM_PROMPT = [
  'Classify a question about Danny Lin. Reply with one digit only.',
  ...PORTFOLIO_TOPICS.map((topic, index) => `${index + 1}. ${topic}`),
  '0. unrelated or unknown',
  'Example: Where did Danny study? 2',
  'Example: How can I get in touch with him? 8',
].join('\n')

export const EXAMPLE_PROMPTS = [
  'What did Danny build at AT&T?',
  "What's his tech stack?",
  'Where did he study?',
]
