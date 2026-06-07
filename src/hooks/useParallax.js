import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * useParallax — Hook for parallax scrolling effect.
 * Returns a ref to attach to the element, and a style object with translateY.
 * @param {number} speed - Parallax speed factor (0 = none, 1 = full scroll, default 0.3)
 * @param {object} options - { direction: 'up' | 'down' }
 */
export function useParallax(speed = 0.3, options = {}) {
  const { direction = 'up' } = options
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)
  const rafId = useRef(null)

  const handleScroll = useCallback(() => {
    if (rafId.current) return
    rafId.current = requestAnimationFrame(() => {
      if (!ref.current) {
        rafId.current = null
        return
      }
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      // Only calculate when element is in or near viewport
      if (rect.bottom >= -200 && rect.top <= windowHeight + 200) {
        const scrollY = window.scrollY
        const elementTop = rect.top + scrollY
        const relativeScroll = scrollY - elementTop
        const translateY = relativeScroll * speed * (direction === 'up' ? -1 : 1)
        setOffset(translateY)
      }
      rafId.current = null
    })
  }, [speed, direction])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [handleScroll])

  const style = {
    transform: `translateY(${offset}px)`,
    willChange: 'transform',
  }

  return [ref, style]
}

/**
 * useParallaxMouse — Hook for mouse-based parallax effect.
 * Returns { containerRef, style } for a subtle mouse-tracking parallax.
 * @param {number} intensity - Movement intensity in px (default 20)
 */
export function useParallaxMouse(intensity = 20) {
  const containerRef = useRef(null)
  const [style, setStyle] = useState({ transform: 'translate(0px, 0px)' })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = (e.clientX - centerX) / window.innerWidth * intensity
      const y = (e.clientY - centerY) / window.innerHeight * intensity
      setStyle({
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 0.3s ease-out',
        willChange: 'transform',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [intensity])

  return { containerRef, style }
}
