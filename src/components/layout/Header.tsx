import { useState, useEffect } from 'react'
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsOpen(false)

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
                className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-1' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-1' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white dark:bg-black transition-all duration-500 flex flex-col items-center justify-center ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="font-display text-4xl text-black dark:text-white hover:opacity-60 transition-opacity"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://koladele-resume.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="font-display text-4xl text-black dark:text-white hover:opacity-60 transition-opacity"
          >
            Resume
          </a>
        </nav>
      </div>
    </>
  )
}
