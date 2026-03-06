import { useRef, useState, useCallback, type FormEvent } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../ui/Button'
import Toast from '../ui/Toast'

gsap.registerPlugin(ScrollTrigger)

interface FieldErrors {
  name?: string
  email?: string
  message?: string
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<'idle' | 'sending'>('idle')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  })
  const hideToast = useCallback(() => setToast(prev => ({ ...prev, visible: false })), [])

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

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

  const validateField = (field: keyof typeof formState, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required.'
        if (value.trim().length < 2) return 'Name must be at least 2 characters.'
        return undefined
      case 'email':
        if (!value.trim()) return 'Email is required.'
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address.'
        return undefined
      case 'message':
        if (!value.trim()) return 'Message is required.'
        if (value.trim().length < 10) return 'Message must be at least 10 characters.'
        return undefined
    }
  }

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }))
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }

  const handleBlur = (field: keyof typeof formState) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, formState[field])
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: FieldErrors = {
      name: validateField('name', formState.name),
      email: validateField('email', formState.email),
      message: validateField('message', formState.message),
    }
    setErrors(newErrors)
    setTouched({ name: true, email: true, message: true })

    if (newErrors.name || newErrors.email || newErrors.message) return

    setStatus('sending')

    try {
      const response = await fetch('https://formspree.io/f/xnjgqjol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: formState.name, email: formState.email, message: formState.message }),
      })

      if (response.ok) {
        setStatus('idle')
        setFormState({ name: '', email: '', message: '' })
        setErrors({})
        setTouched({})
        setToast({ message: 'Message sent successfully!', type: 'success', visible: true })
      }
    } catch {
      setStatus('idle')
      setToast({ message: 'Something went wrong. Please try again.', type: 'error', visible: true })
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

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="contact-reveal">
            <input
              type="text"
              placeholder="Your Name"
              value={formState.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              className={`w-full bg-transparent border-b py-4 text-black dark:text-white font-body text-lg placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none transition-colors ${
                errors.name ? 'border-gray-800 dark:border-gray-300' : 'border-gray-400 dark:border-gray-600 focus:border-black dark:focus:border-white'
              }`}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-400 font-body">{errors.name}</p>
            )}
          </div>

          <div className="contact-reveal">
            <input
              type="email"
              placeholder="Your Email"
              value={formState.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={`w-full bg-transparent border-b py-4 text-black dark:text-white font-body text-lg placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none transition-colors ${
                errors.email ? 'border-gray-800 dark:border-gray-300' : 'border-gray-400 dark:border-gray-600 focus:border-black dark:focus:border-white'
              }`}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-400 font-body">{errors.email}</p>
            )}
          </div>

          <div className="contact-reveal">
            <textarea
              placeholder="Your Message"
              rows={4}
              value={formState.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
              className={`w-full bg-transparent border-b py-4 text-black dark:text-white font-body text-lg placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none transition-colors resize-none ${
                errors.message ? 'border-gray-800 dark:border-gray-300' : 'border-gray-400 dark:border-gray-600 focus:border-black dark:focus:border-white'
              }`}
            />
            {errors.message && (
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-400 font-body">{errors.message}</p>
            )}
          </div>

          <div className="contact-reveal">
            <Button type="submit" size="lg" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </Button>
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

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={hideToast}
      />
    </section>
  )
}
