import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import ThemeToggle from '../ui/ThemeToggle'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate mobile menu open/close
  useEffect(() => {
    if (!overlayRef.current || !navItemsRef.current) return

    const overlay = overlayRef.current
    const links = navItemsRef.current.querySelectorAll('.mobile-nav-link')

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden'

      gsap.to(overlay, {
        clipPath: 'circle(150% at calc(100% - 3rem) 2.5rem)',
        duration: 0.6,
        ease: 'power3.inOut',
      })
      gsap.fromTo(
        links,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out', delay: 0.3 }
      )
    } else {
      document.body.style.overflow = ''

      const linksDuration = 0.2
      const linksStagger = 0.04
      const totalLinksTime = linksDuration + linksStagger * (links.length - 1)

      gsap.to(links, {
        y: -20, opacity: 0, stagger: linksStagger, duration: linksDuration, ease: 'power2.in',
      })
      gsap.to(overlay, {
        clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)',
        duration: 0.5,
        ease: 'power3.inOut',
        delay: totalLinksTime,
      })
    }

    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="font-display text-3xl text-black dark:text-white tracking-tight">
            KO
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-body uppercase tracking-widest text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-50"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 origin-center ${
                  isOpen ? 'rotate-45 translate-y-[4px]' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 origin-center ${
                  isOpen ? '-rotate-45 -translate-y-[4px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-white dark:bg-black flex flex-col items-center justify-center"
        style={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
      >
        <nav ref={navItemsRef} className="flex flex-col items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="mobile-nav-link font-display text-4xl text-black dark:text-white hover:opacity-60 transition-opacity opacity-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://koladele-resume.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mobile-nav-link font-display text-4xl text-black dark:text-white hover:opacity-60 transition-opacity opacity-0"
          >
            Resume
          </a>
        </nav>
      </div>
    </>
  )
}
