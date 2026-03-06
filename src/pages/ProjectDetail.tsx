import { useParams, Link } from 'react-router-dom'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { projects } from '../data/projects'
import { seoData } from '../data/seo'
import SEOHead from '../components/ui/SEOHead'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CustomCursor from '../components/layout/CustomCursor'
import Button from '../components/ui/Button'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find(p => p.slug === slug)
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!pageRef.current) return
    const elements = pageRef.current.querySelectorAll('.reveal')
    gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out', delay: 0.2 }
    )
  }, { scope: pageRef })

  if (!project) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
          <div className="text-center">
            <h1 className="font-display text-6xl text-black dark:text-white mb-4">Project Not Found</h1>
            <Link to="/" className="font-body text-gray-500 hover:text-black dark:hover:text-white transition-colors">
              &larr; Back Home
            </Link>
          </div>
        </div>
      </>
    )
  }

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: project.url,
    author: {
      '@type': 'Person',
      name: 'Koladele Olaitan',
    },
    image: `https://koladeleolaitan.com${project.image}`,
  }

  return (
    <>
      <SEOHead
        title={`${project.title} — Koladele Olaitan`}
        description={project.description}
        canonical={`https://koladeleolaitan.com/projects/${project.slug}`}
        ogImage={seoData.home.ogImage}
        schema={projectSchema}
      />
      <CustomCursor />
      <Header />

      <div ref={pageRef} className="pt-20 min-h-screen bg-white dark:bg-black">
        {/* Back link */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link
            to="/#projects"
            className="reveal inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors font-body"
          >
            &larr; Back to Projects
          </Link>
        </div>

        {/* Hero image */}
        <div className="reveal max-w-7xl mx-auto px-6 mb-12">
          <div className="aspect-video overflow-hidden border border-gray-200 dark:border-gray-800">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              width={1200}
              height={675}
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 pb-32">
          <h1 className="reveal font-display text-5xl md:text-7xl lg:text-8xl text-black dark:text-white mb-6">
            {project.title}
          </h1>

          <p className="reveal text-lg md:text-xl text-gray-600 dark:text-gray-400 font-body leading-relaxed mb-8">
            {project.longDescription || project.description}
          </p>

          {/* Tech stack */}
          <div className="reveal mb-12">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-body mb-4">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.tools.map(tool => (
                <span
                  key={tool}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm uppercase tracking-wider text-gray-700 dark:text-gray-300 font-body"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="reveal flex flex-wrap gap-4">
            <Button as="a" href={project.url} target="_blank" rel="noopener noreferrer" size="lg">
              View Live
            </Button>
            {project.github && (
              <Button as="a" href={project.github} target="_blank" rel="noopener noreferrer" variant="outline" size="lg">
                View Source
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
