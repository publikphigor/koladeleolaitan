import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experiences } from '../../data/experience'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!wrapperRef.current || !trackRef.current || !stickyRef.current) return

    const track = trackRef.current
    const totalScroll = track.scrollWidth - window.innerWidth

    // Set the wrapper height to create the scroll distance
    // This avoids GSAP pin entirely — we use CSS sticky instead
    gsap.set(wrapperRef.current, { height: totalScroll + window.innerHeight })

    // Translate the track horizontally as user scrolls through the wrapper
    gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
  }, { scope: wrapperRef })

  return (
    <div ref={wrapperRef} id="experience" className="relative bg-gray-100 dark:bg-gray-950">
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden"
      >
        {/* Section label */}
        <div className="absolute top-8 left-6 z-10">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-black dark:text-white">
            Experience
          </h2>
        </div>

        {/* Horizontal scrolling track */}
        <div ref={trackRef} className="flex items-center h-screen will-change-transform">
          {/* Spacer for the title */}
          <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center">
            <div className="text-center px-6">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-600 font-body mb-4">
                Where I&apos;ve worked
              </p>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-body max-w-lg">
                6+ years building products at the intersection of AI, data, and web technologies.
              </p>
            </div>
          </div>

          {/* Experience cards */}
          {experiences.map((exp, index) => (
            <div
              key={`${exp.company}-${exp.period}`}
              className="exp-card flex-shrink-0 w-screen h-screen flex items-center px-6 md:px-16 lg:px-24"
            >
              <div className="max-w-4xl w-full">
                {/* Card number */}
                <div className="mb-6">
                  <span className="font-display text-8xl md:text-9xl text-gray-200 dark:text-gray-800 select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Company & Role */}
                <div className="mb-4">
                  <h3 className="font-display text-4xl md:text-6xl text-black dark:text-white leading-tight">
                    {exp.company}
                  </h3>
                </div>

                <div className="mb-2">
                  <p className="text-lg md:text-xl text-black dark:text-white font-body font-medium">
                    {exp.role}
                  </p>
                </div>

                <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-sm text-gray-500 dark:text-gray-600 font-body">{exp.type}</span>
                  <span className="text-gray-400 dark:text-gray-700">&middot;</span>
                  <span className="text-sm text-gray-500 dark:text-gray-600 font-body">{exp.location}</span>
                  <span className="text-gray-400 dark:text-gray-700">&middot;</span>
                  <span className="text-sm text-gray-500 dark:text-gray-600 font-body">{exp.period}</span>
                </div>

                {/* Highlights */}
                <ul className="space-y-3 max-w-2xl">
                  {exp.highlights.slice(0, 4).map((highlight, hIndex) => (
                    <li key={hIndex} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-2 flex-shrink-0" />
                      <span className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-body leading-relaxed">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
