import { useRef, useState, type FormEvent } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../ui/Button'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useGSAP(() => {
    if (!sectionRef.current) return

    const elements = sectionRef.current.querySelectorAll('.contact-reveal')
    gsap.fromTo(
      elements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Watermark parallax
    const watermark = sectionRef.current.querySelector('.watermark')
    if (watermark) {
      gsap.to(watermark, {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
  }, { scope: sectionRef })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (!emailRegex.test(formState.email) || !formState.name || !formState.message) {
      setStatus('error')
      return
    }

    setStatus('sending')

    try {
      const sendDetails = `<h2>New Email From ${formState.name}, ${formState.email}</h2><br><p>Message: ${formState.message}</p>`
      const response = await fetch('https://koladele.vickyabiodun.com/MailServer/mail_key.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteName: 'Koladele Olaitan', siteSend: sendDetails }),
      })

      const data = await response.text()
      if (data) {
        setStatus('sent')
        setFormState({ name: '', email: '', message: '' })
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen flex items-center py-32 px-6 bg-gray-100 dark:bg-gray-950 relative overflow-hidden"
    >
      {/* Watermark */}
      <div className="watermark absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[15vw] md:text-[12vw] text-gray-200 dark:text-gray-900 whitespace-nowrap">
          SAY HELLO
        </span>
      </div>

      <div className="max-w-3xl mx-auto w-full relative z-10">
        <div className="contact-reveal mb-4">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-black dark:text-white">
            Let&apos;s Work
          </h2>
        </div>
        <div className="contact-reveal mb-8">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-black dark:text-white">
            Together
          </h2>
        </div>

        <p className="contact-reveal text-base md:text-lg text-gray-600 dark:text-gray-400 font-body mb-12 max-w-xl">
          For jobs, gigs, contracts, collaborations, or enquiries — I&apos;d love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="contact-reveal">
            <input
              type="text"
              placeholder="Your Name"
              value={formState.name}
              onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-transparent border-b border-gray-400 dark:border-gray-600 py-4 text-black dark:text-white font-body text-lg placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
          </div>

          <div className="contact-reveal">
            <input
              type="email"
              placeholder="Your Email"
              value={formState.email}
              onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-transparent border-b border-gray-400 dark:border-gray-600 py-4 text-black dark:text-white font-body text-lg placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
          </div>

          <div className="contact-reveal">
            <textarea
              placeholder="Your Message"
              rows={4}
              value={formState.message}
              onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
              className="w-full bg-transparent border-b border-gray-400 dark:border-gray-600 py-4 text-black dark:text-white font-body text-lg placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
            />
          </div>

          <div className="contact-reveal flex items-center gap-6">
            <Button type="submit" size="lg" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent!' : 'Send Message'}
            </Button>

            {status === 'error' && (
              <p className="text-sm text-gray-600 dark:text-gray-400 font-body">
                Please fill in all fields with a valid email.
              </p>
            )}
          </div>
        </form>

        {/* Direct email link */}
        <div className="contact-reveal mt-16 pt-8 border-t border-gray-300 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-600 font-body mb-2">
            Or reach me directly at
          </p>
          <a
            href="mailto:koladeleolaitan@gmail.com"
            className="font-display text-2xl md:text-3xl text-black dark:text-white hover:opacity-60 transition-opacity"
          >
            koladeleolaitan@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}
