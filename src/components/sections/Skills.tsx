import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '../../data/skills'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return

    // Scroll-driven horizontal movement
    gsap.to(row1Ref.current, {
      x: -200,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    })

    gsap.to(row2Ref.current, {
      x: 200,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    })

    // Section heading reveal
    const heading = sectionRef.current.querySelector('.skills-heading')
    if (heading) {
      gsap.fromTo(
        heading,
        { y: 50, opacity: 0 },
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
  }, { scope: sectionRef })

  const firstHalf = skills.slice(0, Math.ceil(skills.length / 2))
  const secondHalf = skills.slice(Math.ceil(skills.length / 2))

  // Duplicate for seamless loop appearance
  const row1Skills = [...firstHalf, ...firstHalf, ...firstHalf]
  const row2Skills = [...secondHalf, ...secondHalf, ...secondHalf]

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-32 bg-white dark:bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="skills-heading font-display text-5xl md:text-7xl lg:text-8xl text-black dark:text-white">
          Skills &amp; Tools
        </h2>
      </div>

      {/* Row 1 - scrolls left */}
      <div className="mb-4 overflow-hidden">
        <div ref={row1Ref} className="flex gap-3 w-max">
          {row1Skills.map((skill, i) => (
            <div
              key={`${skill.name}-${i}`}
              className="flex-shrink-0 px-6 py-3 border border-gray-300 dark:border-gray-700 text-sm uppercase tracking-widest text-gray-800 dark:text-gray-300 font-body whitespace-nowrap hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - scrolls right */}
      <div className="overflow-hidden">
        <div ref={row2Ref} className="flex gap-3 w-max -translate-x-48">
          {row2Skills.map((skill, i) => (
            <div
              key={`${skill.name}-${i}`}
              className="flex-shrink-0 px-6 py-3 border border-gray-300 dark:border-gray-700 text-sm uppercase tracking-widest text-gray-800 dark:text-gray-300 font-body whitespace-nowrap hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
