/**
 * Structured content for the portfolio, transcribed from
 * public/Danny_Lin_Resume.pdf (Downloads/Danny_Lin_Resume.pdf).
 * Edit here - every section reads from this file.
 */

export const profile = {
  name: 'Danny Lin',
  title: 'Software Engineer',
  blurb:
    'Software Engineer working on large-scale data, agent workflows, and creative solutions.',
  location: 'New York City, New York',
  email: 'danny.lin.careers@gmail.com',
  phone: '850-490-7526',
  links: {
    github: 'https://github.com/dannyglin',
    linkedin: 'https://linkedin.com/in/dannygaolin',
  },
  resumePdf: '/Danny_Lin_Resume.pdf',
}

/** Personal interests - shown on the About tab ("Off the clock" chips). Keep in
 * sync with the "Outside of work" line in the About bio. */
export const hobbies: string[] = [
  'Running',
  'Basketball',
  'Stock investing',
  'Real estate',
  'Restaurants + cafes',
  'iOS development',
  'Game development',
]

export type Education = {
  school: string
  location: string
  degree: string
  detail: string
  start: string
  end: string
  /** Relevant coursework, grouped for display (School tab). Optional - only
   * schools with a curated list render a "Relevant coursework" block. */
  courses?: { group: string; items: string[] }[]
}

export const education: Education[] = [
  {
    school: 'University of Pennsylvania',
    location: 'Philadelphia, PA',
    degree: 'M.S. in Computer Science',
    detail: 'GPA: 3.85 / 4.00',
    start: 'Sep. 2023',
    end: 'Dec. 2025',
    courses: [
      {
        group: 'Core',
        items: [
          'Introduction to Software Development',
          'Mathematical Foundations of Computer Science',
          'Introduction to Computer Systems',
          'Data Structures & Software Design',
          'Computer Systems Programming',
          'Algorithms',
        ],
      },
      {
        group: 'Electives',
        items: [
          'Artificial Intelligence',
          'Natural Language Processing',
          'Machine Learning for Data Science',
          'Statistics for Data Science',
        ],
      },
    ],
  },
  {
    school: 'Stony Brook University',
    location: 'Stony Brook, NY',
    degree: 'B.S. in Applied Mathematics & Statistics; Business Management',
    detail: 'GPA: 3.65 / 4.00 - Magna Cum Laude',
    start: 'Aug. 2018',
    end: 'May 2022',
    courses: [
      {
        group: 'Mathematics & Statistics',
        items: [
          'Calculus A, B & C',
          'Applied Calculus III',
          'Applied Calculus IV: Differential Equations',
          'Applied Linear Algebra',
          'Survey of Probability & Statistics',
          'Finite Mathematical Structures',
          'Data Analysis',
          'Financial Mathematics',
          'Operations Research I: Deterministic Models',
          'Graph Theory',
        ],
      },
      {
        group: 'Business Management',
        items: [
          'Introduction to Business',
          'Introduction to Economics',
          'Financial Accounting',
          'Intro to Business Statistics',
          'Intro to Decision Sciences',
          'Organizational Behavior',
          'Principles of Finance',
          'Principles of Marketing',
          'Business Communications',
          'International Finance',
          'Operations Management',
          'Financial Management',
          'Financial Analysis with Excel',
          'Business Strategy',
          'Business Ethics',
          'Data Mining',
          'Risk Management & Insurance',
          'Information Systems in Management',
          'Principles of Project Management',
        ],
      },
    ],
  },
]

export type Job = {
  role: string
  team: string
  company: string
  location: string
  start: string
  end: string
  points: string[]
}

export const experience: Job[] = [
  {
    role: 'Software Engineer',
    team: 'Cyber Security Office',
    company: 'AT&T',
    location: 'Middletown, NJ',
    start: 'June 2026',
    end: 'Present',
    points: [
      'Made 100B+ rows of firewall logs searchable for the first time by building a PySpark pipeline on Databricks that splits each raw log message into 70+ typed columns, unblocking an $850K threat-detection program.',
      'Created a React web app that cut LLM spend 30% on a customer-facing support chatbot by building an evaluation pipeline that grades every conversation for answer quality and abuse risk, then feeds the worst offenders (bots, spammers, and so on) to an Akamai web application firewall block list.',
      'Cut 6 hours a week of raw log reading with SQL reports ranking top hostnames and most-triggered firewall rules.',
      'Built the internal React / Azure / PostgreSQL app where analysts read flagged chats and override the model on 2% of them.',
      'Shortened feature turnaround by running Claude Code and Copilot agents against a checked-in CLAUDE.md, custom slash commands, and pre-commit hooks, with MCP servers connecting the agents to internal data sources.',
    ],
  },
  {
    role: 'Software Engineer',
    team: 'Network Chief Technology Office',
    company: 'AT&T',
    location: 'Middletown, NJ',
    start: 'July 2025',
    end: 'May 2026',
    points: [
      'Generated $8M in IPv4 address sales and leasing by writing Python jobs that cross-reference usage against billing records to find address blocks the company pays to hold but nobody uses.',
      'Replaced hand-kept spreadsheets for 5 business units with scheduled PySpark ETL jobs landing clean data in Azure.',
      'Traced 2M+ IP allocations to their owning team by reconciling three inventory systems that disagreed, including ARIN.',
      'Gave 4 React dashboards one number to agree on by structuring a bronze/silver/gold Databricks pipeline that validates raw GitHub, Excel, and CSV inputs before reporting reads them.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    team: 'Optical Network Team',
    company: 'AT&T',
    location: 'Middletown, NJ',
    start: 'June 2024',
    end: 'Aug. 2024',
    points: [
      'Built a RAG web app in Streamlit over a Pinecone vector store that cut documentation search time 85% for network engineers.',
      'Reached 90% retrieval accuracy on real engineer questions by tuning chunking and retrieval in a GPT-4 RAG system.',
      'Indexed 1,000 PDF manuals into embeddings with a Python pipeline, cutting manual research effort 30%.',
    ],
  },
  {
    role: 'Data Analyst',
    team: '',
    company: 'Milliman',
    location: 'Manhattan, NY',
    start: 'June 2022',
    end: 'June 2023',
    points: [
      'Cut monthly client usage report production 80% and removed copy-paste errors by rebuilding it in VBA.',
      'Let clients compare their portfolio to peer averages and percentiles with a PySpark ETL pipeline over 6 source databases.',
    ],
  },
]

export type Project = {
  name: string
  stack: string[]
  points: string[]
  link?: string
}

export const projects: Project[] = [
  {
    name: 'ROM Randomizer Web App',
    stack: ['React', 'TypeScript', 'Java', 'BullMQ', 'Redis', 'Docker'],
    points: [
      'Kept the site responsive during randomization jobs too long for a web request by handing work from React/Express to a background worker over BullMQ and Redis.',
      'Stopped the web form and the Java CLI from drifting apart by generating both from one JSON schema of 150+ settings.',
      'Fit web, API, worker, and Redis onto a free-tier 1GB-RAM VM by tuning Docker memory limits, concurrency, and JVM heap.',
    ],
  },
]

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Languages',
    items: [
      'Python',
      'SQL',
      'Java',
      'JavaScript',
      'TypeScript',
      'Go',
      'Swift',
      'Assembly',
      'VBA',
      'R',
      'C/C++',
      'HTML/CSS',
    ],
  },
  {
    group: 'Frameworks & Libraries',
    items: [
      'PySpark',
      'Pandas',
      'React',
      'Node/Express',
      'Streamlit',
      'Selenium',
      'Prophet',
      'DeepAR',
      'SwiftUI',
      'BullMQ',
    ],
  },
  {
    group: 'Data / Cloud / DevOps',
    items: [
      'Databricks',
      'Azure Data Lake',
      'Snowflake',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'SQLite',
      'Supabase',
      'Docker',
      'Git',
    ],
  },
  {
    group: 'AI / ML',
    items: [
      'Claude Code',
      'Copilot',
      'MCP servers',
      'Agent workflows',
      'LLM evaluation',
      'RAG',
      'LangChain',
      'Hugging Face',
      'Pinecone',
      'Ollama',
    ],
  },
]

export type Photo = {
  title: string
  location: string
  /** File in /public/photos, shown cropped (aspect-[4/5]) in the grid and
   * uncropped in the click-to-expand lightbox. */
  src: string
  /** Tile color shown while `src` loads. */
  swatch: string
}

// Order: Tromso (most recent) -> Bergen -> Rosendal -> Copenhagen -> Mount
// Putuo (2018, the oldest) last.
export const photos: Photo[] = [
  {
    title: 'Fjord Valley',
    location: 'Tromso, Norway',
    src: '/photos/tromso-norway.jpg',
    swatch: 'linear-gradient(135deg, #1e3a8a, #60a5fa)',
  },
  {
    title: 'Highland Sheep',
    location: 'Bergen, Norway',
    src: '/photos/bergen-sheep-norway.jpg',
    swatch: 'linear-gradient(135deg, #164e63, #a5f3fc)',
  },
  {
    title: 'Rose Garden',
    location: 'Rosendal, Norway',
    src: '/photos/rosendal-roses-norway.jpg',
    swatch: 'linear-gradient(135deg, #7f1d1d, #f472b6)',
  },
  {
    title: 'Starlings Over the Valley',
    location: 'Rosendal, Norway',
    src: '/photos/rosendal-starlings-norway.jpg',
    swatch: 'linear-gradient(135deg, #14532d, #a3e635)',
  },
  {
    title: 'Mossy Branch, Foggy Peak',
    location: 'Rosendal, Norway',
    src: '/photos/rosendal-mossy-branch-norway.jpg',
    swatch: 'linear-gradient(135deg, #365314, #84cc16)',
  },
  {
    title: 'Nyhavn Harbor',
    location: 'Copenhagen, Denmark',
    src: '/photos/copenhagen-denmark.jpg',
    swatch: 'linear-gradient(135deg, #7c2d12, #fbbf24)',
  },
  {
    title: 'Ivy-Covered Temple Wall',
    location: 'Mount Putuo, China',
    src: '/photos/putuoshan-china.jpg',
    swatch: 'linear-gradient(135deg, #14532d, #4ade80)',
  },
]
