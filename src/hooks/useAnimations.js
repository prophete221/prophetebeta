import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * useScrollAnimation — IntersectionObserver pour animations au scroll.
 * Utilise une seule observer partagée pour toutes les instances.
 */
const visibleElements = new WeakSet()

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Déjà visible (scroll ancien)
    if (visibleElements.has(el)) {
      setIsVisible(true)
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visibleElements.add(el)
          el.classList.add('is-visible')
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}

/**
 * useMousePosition — Hook pour effet tilt 3D au hover.
 */
export function useMousePosition() {
  const positionRef = useRef({ x: 0.5, y: 0.5 })

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    positionRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    positionRef.current = { x: 0.5, y: 0.5 }
  }, [])

  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${(positionRef.current.y - 0.5) * -6}deg) rotateY(${(positionRef.current.x - 0.5) * 6}deg)`,
    transition: 'transform 0.5s ease-out',
  }

  return { handleMouseMove, handleMouseLeave, tiltStyle }
}

/**
 * use3DEntrance — Variants framer-motion pour animations d'entrée 3D.
 */
export function use3DEntrance() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }
  return { containerVariants, itemVariants }
}

/**
 * use3DScrollEntrance — Props motion pour entrée au scroll.
 */
export function use3DScrollEntrance(delay = 0) {
  return {
    initial: { opacity: 0, y: 20, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: '-30px' },
    transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    style: { transformOrigin: 'center bottom' },
  }
}
