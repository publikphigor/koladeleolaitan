import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface ToastProps {
  message: string
  type?: 'success' | 'error'
  visible: boolean
  onClose: () => void
}

export default function Toast({ message, type = 'success', visible, onClose }: ToastProps) {
  const toastRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!toastRef.current) return

    if (visible) {
      gsap.fromTo(
        toastRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )

      const timer = setTimeout(() => {
        gsap.to(toastRef.current, {
          y: 100,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: onClose,
        })
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div
      ref={toastRef}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 font-body text-sm tracking-wide"
      style={{
        backgroundColor: type === 'success' ? '#000' : '#000',
        color: '#fff',
        border: type === 'error' ? '1px solid #555' : '1px solid #333',
      }}
    >
      {message}
    </div>
  )
}
