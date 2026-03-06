import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const moveCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, [data-cursor="hover"]')) {
        cursor.classList.add('scale-150', 'opacity-50')
      }
    }

    const handleMouseOut = () => {
      cursor.classList.remove('scale-150', 'opacity-50')
    }

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-black dark:border-white pointer-events-none z-[9999] transition-[transform,opacity] duration-100 ease-out hidden md:block mix-blend-difference"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-black dark:bg-white pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      />
    </>
  )
}
