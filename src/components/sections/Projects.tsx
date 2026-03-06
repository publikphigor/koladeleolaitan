import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/projects'
import { useTheme } from '../../context/ThemeContext'
import SectionHeading from '../ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const { theme } = useTheme()

  useGSAP(() => {
    if (!sectionRef.current) return

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

    const cards = sectionRef.current.querySelectorAll('.project-card')
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, rotateX: 5 },
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
          delay: index * 0.15,
        }
      )
    })
  }, { scope: sectionRef })

  const project = projects[0]

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen py-32 px-6 bg-white dark:bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="projects-heading mb-16">
          <SectionHeading subtitle="Most of my work is under NDA with clients I can't disclose. Here's a personal project I built from the ground up.">
            Side Quests
          </SectionHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Auritrack */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card group block border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950 overflow-hidden hover:border-black dark:hover:border-white transition-colors"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={theme === 'dark' && project.imageDark ? project.imageDark : project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                loading="lazy"
                width={600}
                height={338}
              />
            </div>

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

          {/* CTA Card */}
          <a
            href="#contact"
            className="project-card group flex flex-col items-center justify-center p-12 border border-dashed border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors"
          >
            <span className="font-display text-7xl md:text-8xl text-gray-200 dark:text-gray-800 group-hover:text-black dark:group-hover:text-white transition-colors mb-6 leading-none">
              ?
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-black dark:text-white mb-3 text-center">
              Your Project, Next
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-500 font-body text-center max-w-xs leading-relaxed">
              Have an idea that needs building? Let&apos;s turn it into something real.
            </p>
          </a>
        </div>
      </div>
    </section>
  )
}
