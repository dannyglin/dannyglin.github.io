/**
 * Structured content for the portfolio, transcribed from
 * public/Danny_Lin_Resume.pdf (Downloads/Danny_Lin_Resume.pdf).
 * Edit here - every section reads from this file.
 */

export const profile = {
  name: 'Danny Lin',
  title: 'Software Engineer',
  tagline: 'agentic workflow, llms, and data',
  blurb:
    'Software Engineer working large scale of data, agent workflows, and creative solutions.',
  location: 'New York City, New York',
  email: 'danny.lin.careers@gmail.com',
  phone: '850-490-7526',
  links: {
    github: 'https://github.com/dannyglin',
    linkedin: 'https://linkedin.com/in/dannygaolin',
  },
  resumePdf: '/Danny_Lin_Resume.pdf',
}

/** Personal interests - shown on the About tab. */
export const hobbies: string[] = [
  'Basketball',
  'Hiking',
  'Running',
  'Startups',
  'Stock investing',
  'Real estate',
  'Game development',
]

export type Education = {
  school: string
  location: string
  degree: string
  detail: string
  start: string
  end: string
}

export const education: Education[] = [
  {
    school: 'University of Pennsylvania',
    location: 'Philadelphia, PA',
    degree: 'M.S. in Computer Science',
    detail: 'GPA: 3.85 / 4.00',
    start: 'Sep. 2023',
    end: 'Dec. 2025',
  },
  {
    school: 'Stony Brook University',
    location: 'Stony Brook, NY',
    degree: 'B.S. in Applied Mathematics & Statistics; Business Management',
    detail: 'GPA: 3.65 / 4.00 - Magna Cum Laude',
    start: 'Aug. 2018',
    end: 'May 2022',
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
      'Told analysts which business unit owns the machine behind an alert by matching 12B+ network traffic records against firewall address inventories, removing a manual step from every investigation.',
      'Cut 6 hours a week of raw log reading with SQL reports ranking top hostnames and most-triggered firewall rules.',
      'Cut LLM spend 30% on a customer-facing support chatbot by building an evaluation pipeline that grades every conversation for answer quality and abuse risk, then feeds the worst offenders to an Akamai web application firewall block list.',
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
      'Cut documentation search time 85% for network engineers with a Streamlit tool over a Pinecone vector store.',
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

/** Placeholder gallery - swap `src` for real image files dropped in /public. */
export type Photo = {
  title: string
  location: string
  /** Any CSS background value; replace with `url('/photos/xyz.jpg')`. */
  swatch: string
}

export const photos: Photo[] = [
  {
    title: 'Blue Hour, Center City',
    location: 'Philadelphia, PA',
    swatch: 'linear-gradient(135deg, #1e3a8a, #0ea5e9)',
  },
  {
    title: 'Salt Marsh',
    location: 'Long Island, NY',
    swatch: 'linear-gradient(135deg, #065f46, #34d399)',
  },
  {
    title: 'Overpass',
    location: 'Middletown, NJ',
    swatch: 'linear-gradient(135deg, #7c2d12, #f59e0b)',
  },
  {
    title: 'Fog on the Schuylkill',
    location: 'Philadelphia, PA',
    swatch: 'linear-gradient(135deg, #334155, #94a3b8)',
  },
  {
    title: 'Late Train',
    location: 'Newark, NJ',
    swatch: 'linear-gradient(135deg, #4c1d95, #c084fc)',
  },
  {
    title: 'Low Tide',
    location: 'Montauk, NY',
    swatch: 'linear-gradient(135deg, #0f766e, #5eead4)',
  },
]
