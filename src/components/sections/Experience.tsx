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
    const sticky = stickyRef.current
    const visibleWidth = sticky.offsetWidth
    const totalScroll = track.scrollWidth - visibleWidth

    // Wrapper needs enough height so the user can scroll through all cards.
    // totalScroll = horizontal distance to animate
    // Add a small buffer so the last card sits fully visible before the section ends.
    const buffer = visibleWidth * 0.15
    gsap.set(wrapperRef.current, { height: totalScroll + sticky.offsetHeight + buffer })

    // Translate the track horizontally as user scrolls through the wrapper
    // end offset ensures animation completes with the buffer to spare
    gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: () => `+=${totalScroll + buffer}`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
  }, { scope: wrapperRef })

  return (
    <div ref={wrapperRef} id="experience" className="relative bg-gray-100 dark:bg-gray-950">
      <div
        ref={stickyRef}
        className="sticky top-20 h-[calc(100vh-5rem)] overflow-hidden flex flex-col"
      >
        {/* Section label — in flow, always visible */}
        <div className="flex-shrink-0 pt-8 pb-4 px-6">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-black dark:text-white">
            Experience
          </h2>
        </div>

        {/* Horizontal scrolling track — fills remaining height */}
        <div ref={trackRef} className="flex items-stretch flex-1 will-change-transform">
          {/* Spacer for the intro — wider on mobile for breathing room */}
          <div className="flex-shrink-0 w-[150vw] md:w-screen h-full flex items-center justify-center">
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
              className="exp-card flex-shrink-0 w-screen h-full flex items-start px-6 md:px-16 lg:px-24 overflow-y-auto py-4 md:items-center md:py-0"
            >
              <div className="max-w-4xl w-full">
                {/* Card number */}
                <div className="mb-2 md:mb-6">
                  <span className="font-display text-6xl md:text-9xl text-gray-200 dark:text-gray-800 select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Company & Role */}
                <div className="mb-2 md:mb-4">
                  <h3 className="font-display text-3xl md:text-6xl text-black dark:text-white leading-tight">
                    {exp.company}
                  </h3>
                </div>

                <div className="mb-1 md:mb-2">
                  <p className="text-base md:text-xl text-black dark:text-white font-body font-medium">
                    {exp.role}
                  </p>
                </div>

                <div className="mb-4 md:mb-8 flex flex-wrap items-center gap-x-3 md:gap-x-4 gap-y-1">
                  <span className="text-xs md:text-sm text-gray-500 dark:text-gray-600 font-body">{exp.type}</span>
                  <span className="text-gray-400 dark:text-gray-700">&middot;</span>
                  <span className="text-xs md:text-sm text-gray-500 dark:text-gray-600 font-body">{exp.location}</span>
                  <span className="text-gray-400 dark:text-gray-700">&middot;</span>
                  <span className="text-xs md:text-sm text-gray-500 dark:text-gray-600 font-body">{exp.period}</span>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 md:space-y-3 max-w-2xl">
                  {exp.highlights.slice(0, 4).map((highlight, hIndex) => (
                    <li key={hIndex} className="flex items-start gap-2 md:gap-3">
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-black dark:bg-white mt-1.5 md:mt-2 flex-shrink-0" />
                      <span className="text-xs md:text-base text-gray-600 dark:text-gray-400 font-body leading-relaxed">
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
