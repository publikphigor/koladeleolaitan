import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollIndicator from '../ui/ScrollIndicator'
import Button from '../ui/Button'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameFirstRef = useRef<HTMLDivElement>(null)
  const nameLastRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    const firstNameLetters = nameFirstRef.current?.querySelectorAll('.letter')
    const lastNameLetters = nameLastRef.current?.querySelectorAll('.letter')

    tl.set([firstNameLetters, lastNameLetters], { y: 120, opacity: 0 })
      .set(subtitleRef.current, { y: 30, opacity: 0 })
      .set(ctaRef.current, { y: 30, opacity: 0 })
      .set(scrollRef.current, { opacity: 0 })
      .to(firstNameLetters!, { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 }, 0.3)
      .to(lastNameLetters!, { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 }, 0.6)
      .to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.6 }, 1.2)
      .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.6 }, 1.5)
      .to(scrollRef.current, { opacity: 1, duration: 0.6 }, 1.8)

    // Parallax fade on scroll
    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      opacity: 0,
      y: -100,
      scale: 0.95,
    })
  }, { scope: sectionRef })

  const renderLetters = (text: string) =>
    text.split('').map((letter, i) => (
      <span key={i} className="letter inline-block">
        {letter}
      </span>
    ))

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative px-6 bg-white dark:bg-black overflow-hidden"
    >
      {/* Background decorative element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05]">
        <span className="font-display text-[20vw] text-black dark:text-white whitespace-nowrap">
          FE
        </span>
      </div>

      <div className="relative z-10 text-center max-w-5xl">
        <div className="overflow-hidden mb-2">
          <div ref={nameFirstRef} className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-black dark:text-white leading-[0.9] tracking-tight">
            {renderLetters('KOLADELE')}
          </div>
        </div>
        <div className="overflow-hidden mb-8">
          <div ref={nameLastRef} className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-black dark:text-white leading-[0.9] tracking-tight">
            {renderLetters('OLAITAN')}
          </div>
        </div>

        <p
          ref={subtitleRef}
          className="text-sm sm:text-base md:text-lg uppercase tracking-[0.3em] text-gray-600 dark:text-gray-500 font-body mb-10"
        >
          Senior Frontend Engineer &middot; Technical Lead
        </p>

        <div ref={ctaRef}>
          <Button as="a" href="#projects" variant="outline" size="lg">
            Explore My Work
          </Button>
        </div>
      </div>

      <div ref={scrollRef}>
        <ScrollIndicator />
      </div>
    </section>
  )
}
