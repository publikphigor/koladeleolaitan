import type { SEOData } from '../types'

const BASE_URL = 'https://koladeleolaitan.com'

export const seoData: Record<string, SEOData> = {
  home: {
    title: 'Koladele Olaitan — Senior Frontend Engineer & Technical Lead',
    description:
      'Senior Frontend Engineer and Technical Lead with 6+ years of experience architecting high-performance web applications using React, Vue.js, and TypeScript. Explore my portfolio for innovative digital solutions.',
    canonical: BASE_URL,
    ogImage: `${BASE_URL}/assets/meta-image.png`,
  },
  projects: {
    title: 'Projects — Koladele Olaitan',
    description:
      'Explore projects built by Koladele Olaitan, including AI-powered finance platforms, blockchain analytics dashboards, and creative web applications.',
    canonical: `${BASE_URL}/projects`,
    ogImage: `${BASE_URL}/assets/meta-image.png`,
  },
  notFound: {
    title: '404 — Page Not Found | Koladele Olaitan',
    description: 'The page you are looking for does not exist.',
    canonical: BASE_URL,
    ogImage: `${BASE_URL}/assets/meta-image.png`,
  },
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Koladele Olaitan',
  jobTitle: 'Senior Frontend Engineer',
  url: BASE_URL,
  email: 'koladeleolaitan@gmail.com',
  telephone: '+2348101555748',
  image: `${BASE_URL}/assets/Koladele-Olaitan.webp`,
  sameAs: [
    'https://twitter.com/publikphigor',
    'https://www.linkedin.com/in/koladeleolaitan/',
    'https://github.com/publikphigor/',
  ],
  knowsAbout: [
    'React',
    'Vue.js',
    'TypeScript',
    'JavaScript',
    'Next.js',
    'Node.js',
    'Frontend Development',
    'Web Performance',
    'UI Architecture',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'GetDot.ai',
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Koladele Olaitan Portfolio',
  url: BASE_URL,
  description:
    'Portfolio of Koladele Olaitan, Senior Frontend Engineer and Technical Lead.',
  author: {
    '@type': 'Person',
    name: 'Koladele Olaitan',
  },
}
