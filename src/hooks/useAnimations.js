import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}

/**
 * useMousePosition — Hook for 3D tilt effect on hover.
 * Usage: const { handleMouseMove, handleMouseLeave, tiltStyle } = useMousePosition()
 * Apply tiltStyle to the element, handleMouseMove/handleMouseLeave to the parent container.
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0.5, y: 0.5 })
  }

  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${(position.y - 0.5) * -8}deg) rotateY(${(position.x - 0.5) * 8}deg)`,
    transition: position.x === 0.5 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out',
  }

  return { handleMouseMove, handleMouseLeave, tiltStyle }
}

/**
 * use3DEntrance — Returns framer-motion variants for 3D entrance animations.
 * Elements scale up from 0.95 with a subtle rotateX as they enter the viewport.
 */
export function use3DEntrance() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      rotateX: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return { containerVariants, itemVariants }
}

/**
 * use3DScrollEntrance — Returns motion props for a 3D scroll-triggered entrance.
 * Use with motion.div or motion.section.
 */
export function use3DScrollEntrance(delay = 0) {
  return {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      rotateX: 6,
    },
    whileInView: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
    },
    viewport: { once: true, margin: '-50px' },
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
    style: {
      transformOrigin: 'center bottom',
    },
  }
}
