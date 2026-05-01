import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const dot = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const isMobile = () => window.matchMedia('(pointer: coarse)').matches
    if (isMobile()) return

    const cursor = cursorRef.current
    const dotEl = dotRef.current
    if (!cursor || !dotEl) return

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      dot.current.x += (pos.current.x - dot.current.x) * 0.12
      dot.current.y += (pos.current.y - dot.current.y) * 0.12

      if (cursor) {
        cursor.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      if (dotEl) {
        dotEl.style.transform = `translate(${dot.current.x - 20}px, ${dot.current.y - 20}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const handleEnter = () => {
      dotEl.style.width = '50px'
      dotEl.style.height = '50px'
      dotEl.style.opacity = '0.8'
    }

    const handleLeave = () => {
      dotEl.style.width = '40px'
      dotEl.style.height = '40px'
      dotEl.style.opacity = '0.5'
    }

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', move)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-brand-accent rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ transition: 'none' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          border: '1px solid rgba(59,130,246,0.45)',
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          opacity: 0.5,
        }}
      />
    </>
  )
}
