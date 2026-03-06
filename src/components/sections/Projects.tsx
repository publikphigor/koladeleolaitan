import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/projects'
import SectionHeading from '../ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // Heading animation
    const heading = sectionRef.current.querySelector('.projects-heading')
    if (heading) {
      gsap.fromTo(
        heading,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }

    // Project cards staggered reveal
    const cards = sectionRef.current.querySelectorAll('.project-card')
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 80,
          opacity: 0,
          rotateX: 5,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: (index % 2) * 0.15,
        }
      )
    })
  }, { scope: sectionRef })

  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen py-32 px-6 bg-white dark:bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="projects-heading mb-16">
          <SectionHeading subtitle="Selected work from my journey building for the web.">
            Projects
          </SectionHeading>
        </div>

        {/* Featured Projects — larger cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featuredProjects.map((project) => (
            <a
              key={project.slug}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="project-card group block border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 overflow-hidden hover:border-black dark:hover:border-white transition-colors"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                  width={600}
                  height={338}
                />
              </div>

              {/* Details */}
              <div className="p-6">
                <h3 className="font-display text-2xl md:text-3xl text-black dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-body leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs uppercase tracking-wider px-3 py-1 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-body"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Other Projects — compact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project) => (
            <a
              key={project.slug}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="project-card group block p-6 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors"
            >
              <h3 className="font-display text-xl text-black dark:text-white mb-2 group-hover:opacity-70 transition-opacity">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-500 font-body leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-gray-300 dark:border-gray-700 text-gray-500 font-body"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
