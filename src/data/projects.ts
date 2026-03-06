import type { Project } from '../types'

export const projects: Project[] = [
  {
    slug: 'auritrack',
    title: 'Auritrack',
    description:
      'AI-powered personal finance platform with smart bank statement imports, spending predictions, and Telegram bot integration.',
    longDescription:
      'Founded and built a full-stack finance management app with AI chat, Telegram bot, smart bank statement imports, and spending predictions, serving thousands of users across 50+ countries with a 4.8/5 rating.',
    image: '/assets/afodak.webp',
    tools: ['React', 'TypeScript', 'Next.js', 'Supabase', 'Python'],
    url: '#',
    featured: true,
  },
  {
    slug: 'emmahux-portfolio',
    title: 'Emmanuel Adeleye Portfolio',
    description:
      'Portfolio website built with React, Tailwind, and GSAP with smooth animations.',
    image: '/assets/emmahux.webp',
    tools: ['React', 'Tailwind', 'GSAP'],
    url: 'https://emmahux-portfolio-v2.vercel.app/',
    featured: true,
  },
  {
    slug: 'aspect-ratio-calculator',
    title: 'Aspect Ratio Calculator',
    description:
      'A simple tool that calculates image dimensions with respect to a selected aspect ratio.',
    image: '/assets/aspectratio.webp',
    tools: ['HTML5', 'CSS', 'JavaScript'],
    url: 'https://calcaspectratio.netlify.app/',
    featured: true,
  },
  {
    slug: 'web-agency-template',
    title: 'Web Agency Template',
    description:
      'Designed as a template for a web development agency. Mobile responsive, fast, and accessible with a fancy pricing form.',
    image: '/assets/web-agency.webp',
    tools: ['HTML5', 'SCSS', 'JavaScript', 'Bootstrap', 'GSAP'],
    url: 'https://publikphigor-web-agency.netlify.app/',
    featured: true,
  },
  {
    slug: 'twfnft-clone',
    title: 'TWFNFT Website Clone',
    description:
      'Cloned NFT website using Sass and JavaScript with pixel-perfect design.',
    image: '/assets/twfnft.webp',
    tools: ['HTML5', 'SCSS', 'JavaScript'],
    url: 'https://twfnft.netlify.app/',
    featured: false,
  },
  {
    slug: 'big-hive',
    title: 'Big Hive',
    description:
      'Fashion website landing page with animations, slider and dark mode.',
    image: '/assets/big-hive.webp',
    tools: ['HTML5', 'CSS', 'JavaScript'],
    url: 'https://bighive.netlify.app/',
    featured: false,
  },
  {
    slug: 'nft-template',
    title: 'NFT Website Template',
    description:
      'NFT website template with Elementor animations built on WordPress.',
    image: '/assets/nft-template.webp',
    tools: ['WordPress', 'Elementor'],
    url: 'https://publikphigor.me/crypto',
    featured: false,
  },
  {
    slug: 'crypto-course',
    title: 'Crypto Course Website',
    description:
      'A crypto website for taking blockchain related courses, using CSS Grid and JavaScript dashboard interactions.',
    image: '/assets/csa.webp',
    tools: ['HTML5', 'CSS', 'JavaScript', 'Bootstrap'],
    url: 'https://publikphigor-csa.netlify.app/',
    featured: false,
  },
  {
    slug: 'bikey-logistics',
    title: 'Bikey Logistics',
    description:
      'Simple landing page for a logistics brand, built from scratch with dream-inspired design.',
    image: '/assets/bikeylog.webp',
    tools: ['HTML5', 'CSS', 'JavaScript'],
    url: 'https://bikeylogistics.com/',
    featured: false,
  },
]
