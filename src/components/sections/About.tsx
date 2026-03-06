import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 6, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Enterprise Clients' },
  { value: 50, suffix: '+', label: 'Countries Reached' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // Image parallax
    gsap.fromTo(
      imageRef.current,
      { y: 80 },
      {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )

    // Content reveal
    const textElements = contentRef.current?.querySelectorAll('.reveal-text')
    if (textElements) {
      gsap.fromTo(
        textElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            end: 'top 25%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }

    // Stats counter animation
    const statElements = sectionRef.current.querySelectorAll('.stat-value')
    statElements.forEach((el) => {
      const target = parseInt(el.getAttribute('data-value') || '0', 10)
      gsap.fromTo(
        el,
        { innerText: '0' },
        {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex items-center py-24 px-6 bg-gray-100 dark:bg-gray-950 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <div ref={imageRef} className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden rounded-3xl">
          <img
            src="/assets/koladele-olaitan.webp"
            alt="Koladele Olaitan — Senior Frontend Engineer"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            loading="lazy"
            width={400}
            height={533}
          />
          <div className="absolute inset-0 border border-black/10 dark:border-white/10 rounded-3xl" />
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex flex-col gap-6">
          <div className="reveal-text">
            <SectionHeading>About</SectionHeading>
          </div>

          <p className="reveal-text text-base md:text-lg text-gray-700 dark:text-gray-400 font-body leading-relaxed">
            Senior Frontend Engineer and Technical Lead with 6+ years of experience
            architecting high-performance web applications using React, Vue.js, and TypeScript.
          </p>

          <p className="reveal-text text-base md:text-lg text-gray-700 dark:text-gray-400 font-body leading-relaxed">
            Proven track record leading frontend teams, driving performance optimization,
            and shipping scalable products used by thousands of users. Experienced in leveraging
            AI-powered tools to automate development workflows and accelerate delivery.
          </p>

          <p className="reveal-text text-base md:text-lg text-gray-700 dark:text-gray-400 font-body leading-relaxed">
            Strong full-stack capabilities with Python and Node.js backend experience.
            Currently building the future of AI-powered data analytics at GetDot.ai.
          </p>

          {/* Stats */}
          <div className="reveal-text grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-300 dark:border-gray-800">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="font-display text-4xl md:text-5xl text-black dark:text-white mb-2">
                  <span className="stat-value" data-value={stat.value}>0</span>
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-xs md:text-sm uppercase tracking-widest text-gray-500 dark:text-gray-600 font-body">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
