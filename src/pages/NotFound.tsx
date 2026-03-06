import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SEOHead from '../components/ui/SEOHead'
import Header from '../components/layout/Header'
import { seoData } from '../data/seo'

export default function NotFound() {
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!pageRef.current) return

    // Floating 404 letters
    const letters = pageRef.current.querySelectorAll('.float-letter')
    letters.forEach((letter, i) => {
      gsap.to(letter, {
        y: -20 + Math.random() * 40,
        x: -10 + Math.random() * 20,
        rotation: -5 + Math.random() * 10,
        duration: 2 + Math.random() * 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
      })
    })

    // Content reveal
    const reveals = pageRef.current.querySelectorAll('.reveal-404')
    gsap.fromTo(
      reveals,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power2.out', delay: 0.5 }
    )
  }, { scope: pageRef })

  return (
    <>
      <SEOHead
        title={seoData.notFound.title}
        description={seoData.notFound.description}
        canonical={seoData.notFound.canonical}
      />
      <Header />

      <div
        ref={pageRef}
        className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-6 relative overflow-hidden"
      >
        {/* Giant floating 404 */}
        <div className="flex items-center gap-4 md:gap-8 mb-12 select-none">
          <span className="float-letter font-display text-[20vw] md:text-[15vw] text-gray-200 dark:text-gray-900 leading-none">
            4
          </span>
          <span className="float-letter font-display text-[20vw] md:text-[15vw] text-gray-200 dark:text-gray-900 leading-none">
            0
          </span>
          <span className="float-letter font-display text-[20vw] md:text-[15vw] text-gray-200 dark:text-gray-900 leading-none">
            4
          </span>
        </div>

        <h1 className="reveal-404 font-display text-3xl md:text-5xl text-black dark:text-white mb-4 text-center">
          Lost in the void
        </h1>
        <p className="reveal-404 text-base md:text-lg text-gray-500 dark:text-gray-600 font-body mb-10 text-center max-w-md">
          The page you&apos;re looking for has drifted into the digital abyss.
        </p>
        <Link
          to="/"
          className="reveal-404 font-display text-lg uppercase tracking-widest text-black dark:text-white border-b border-black dark:border-white pb-1 hover:opacity-60 transition-opacity"
        >
          Return Home
        </Link>
      </div>
    </>
  )
}
