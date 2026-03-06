import type { Project } from '../types'

export const projects: Project[] = [
  {
    slug: 'auritrack',
    title: 'Auritrack',
    description:
      'AI-powered personal finance platform with smart bank statement imports, spending predictions, and Telegram bot integration.',
    longDescription:
      'Founded and built a full-stack finance management app with AI chat, Telegram bot, smart bank statement imports, and spending predictions, serving thousands of users across 50+ countries with a 4.8/5 rating.',
    image: '/assets/auritrack-light.webp',
    imageDark: '/assets/auritrack-dark.webp',
    tools: ['React', 'TypeScript', 'Next.js', 'Supabase', 'Python'],
    url: 'https://www.auritrack.com/',
    featured: true,
  },
]
