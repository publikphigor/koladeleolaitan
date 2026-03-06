export interface Project {
  slug: string
  title: string
  description: string
  longDescription?: string
  image: string
  imageDark?: string
  tools: string[]
  url: string
  github?: string
  featured: boolean
}

export interface Experience {
  company: string
  role: string
  type: string
  location: string
  period: string
  highlights: string[]
}

export interface Skill {
  name: string
  category: 'languages' | 'frameworks' | 'styling' | 'testing' | 'tools' | 'ai'
}

export interface SEOData {
  title: string
  description: string
  canonical: string
  ogImage: string
}
