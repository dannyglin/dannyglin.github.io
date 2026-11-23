/**
 * Structured content for the portfolio, transcribed from
 * public/Danny_Lin_Resume.pdf (Downloads/Danny_Lin_Resume.pdf).
 * Edit here - every section reads from this file.
 */

export const profile = {
  name: 'Danny Lin',
  title: 'Senior Software Engineer',
  blurb:
    'I build data tools at AT&T and develop apps for macOS, iOS, and the web.',
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
    role: 'Senior Software Engineer',
    team: 'Cyber Security Office',
    company: 'AT&T',
    location: 'Middletown, NJ',
    start: 'June 2026',
    end: 'Present',
    points: [
      'Made 100B+ firewall records searchable by parsing raw logs into 70+ typed fields with PySpark on Databricks, enabling a $750K threat-detection program.',
      'Joined 12B+ traffic records with firewall inventories to assign alert ownership and eliminate manual lookup.',
      'Saved analysts 6 hours per week by building SQL reports that ranked hostnames and firewall rules by activity.',
      'Screened support chats for answer quality and abuse risk, routing high-risk cases to an Akamai WAF blocklist.',
      'Built a React app backed by Azure and PostgreSQL so analysts could review flagged chats and override model decisions.',
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
      'Built a React and PostgreSQL platform that matched 2M+ IPv4 allocations against billing records to find unused blocks, supporting $8M in sales and leasing.',
      'Replaced spreadsheets for five business units with scheduled Databricks ETL jobs using PySpark and Azure.',
      'Detected 300+ DNS anomalies in one month by using Prophet to forecast traffic across seven load balancers.',
      'Built a RAG-backed feed and interactive graph so engineers could explore live connections between IP addresses.',
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
      'Cut lookup time by 85% with a GPT-4 and Streamlit assistant that searched 1,000+ network manuals.',
      'Indexed manuals in Pinecone with Python, then tuned retrieval to score 90% accuracy on field engineers’ questions.',
    ],
  },
  {
    role: 'Data Analyst',
    team: 'Accountable Care Organization Interface',
    company: 'Milliman',
    location: 'Manhattan, NY',
    start: 'June 2022',
    end: 'June 2023',
    points: [
      'Rebuilt monthly usage reporting in VBA, cutting prep time by 80% and eliminating copy-and-paste errors.',
      'Combined six databases with PySpark so clients could benchmark portfolios against peer averages and percentiles.',
      'Cut CMS download time for client production runs by 35% with Selenium scripts.',
    ],
  },
]

export type Project = {
  name: string
  platform: string
  summary: string
  stack: string[]
  points: string[]
  links?: { label: string; href: string }[]
  demo?: {
    video: string
    poster: string
    caption: string
    href: string
    label: string
  }
}

export const projects: Project[] = [
  {
    name: 'Pocket Randomizer',
    platform: 'Web app',
    summary: 'Customize trainer teams and wild encounters in Pokémon games for Game Boy Advance, Nintendo DS, and Nintendo 3DS.',
    stack: ['Java', 'CheerpJ', 'Node.js'],
    points: [
      'Ported the Java randomizer to the browser with CheerpJ so game files are processed locally in the tab.',
      'Added rules such as evolving eligible trainer Pokémon at level 30 and above.',
    ],
    links: [
      { label: 'Open Pocket Randomizer', href: 'https://pocket-randomizer.pages.dev/' },
      { label: 'Source on GitHub', href: 'https://github.com/dannyglin/pokemon-rom-randomizer' },
    ],
    demo: {
      video: '/project-demos/pocket-demo.mp4',
      poster: '/project-demos/pocket-settings.png',
      caption: 'Live app walkthrough of game selection and trainer battle settings.',
      href: '/project-demos/pocket-overview.png',
      label: 'See the game selection screen',
    },
  },
  {
    name: 'Stilltide',
    platform: 'macOS app',
    summary: 'A native live wallpaper player that turns local photos and videos into desktop backgrounds.',
    stack: ['Swift', 'SwiftUI', 'AppKit', 'AVFoundation', 'Core Audio'],
    points: [
      'Renders wallpapers per display and keeps the previous wallpaper visible until the next video frame is ready.',
      'Uses system audio to drive a 12-band spectrum and independent stereo effects.',
    ],
    demo: {
      video: '/project-demos/stilltide-demo.mp4',
      poster: '/project-demos/stilltide-playlist.jpg',
      caption: 'Video walkthrough rendered from native SwiftUI views with sample wallpapers.',
      href: '/project-demos/stilltide-effects.jpg',
      label: 'See the effects controls',
    },
  },
  {
    name: 'Tomato',
    platform: 'iOS app · Private beta',
    summary: 'An accountability app for daily tasks where friends can react to unfinished work by throwing virtual tomatoes.',
    stack: ['Swift', 'SwiftUI', 'Supabase', 'PostgreSQL'],
    points: [
      'Reached 20 private beta users with daily prompts and a friends feed.',
      'Built friend requests, comments, reactions, and per-post visibility in Supabase so users could control what they shared.',
    ],
    demo: {
      video: '/project-demos/tomato-demo.mp4',
      poster: '/project-demos/tomato-preview.png',
      caption: 'Recorded walkthrough of the interactive browser preview with fictional tasks and friends.',
      href: '/project-demos/tomato/index.html',
      label: 'Try the Tomato preview',
    },
  },
]

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Languages',
    items: ['Python', 'SQL', 'Java', 'JavaScript', 'TypeScript', 'Swift', 'Go', 'C/C++', 'VBA'],
  },
  {
    group: 'Frameworks & Libraries',
    items: ['PySpark', 'Pandas', 'React', 'Node.js/Express', 'SwiftUI', 'Streamlit', 'Selenium', 'Prophet', 'BullMQ'],
  },
  {
    group: 'Data & Cloud',
    items: ['Databricks', 'Azure Data Lake', 'PostgreSQL', 'Snowflake', 'Redis', 'Supabase', 'Docker', 'Git'],
  },
  {
    group: 'AI / ML',
    items: ['LLM evaluation', 'RAG', 'LangChain', 'Pinecone', 'Hugging Face', 'Ollama'],
  },
]

export type Photo = {
  title: string
  location?: string
  /** File in /public/photos, shown cropped (aspect-[4/5]) in the grid and
   * uncropped in the click-to-expand lightbox. */
  src: string
  /** Tile color shown while `src` loads. */
  swatch: string
}

// Newest-first: add new photos at the top. The grid (Photography.tsx) just
// flows this order left-to-right, top-to-bottom with no positioning code, so
// the oldest photo naturally drifts rightward as new ones are added ahead of
// it, wrapping to the start of a new row once the current one fills up.
export const photos: Photo[] = [
  {
    title: 'BMWs After Dark',
    src: '/photos/bmws-after-dark.jpg',
    swatch: 'linear-gradient(135deg, #101318, #29323f)',
  },
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
