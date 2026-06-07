import { useState, useEffect, useCallback } from 'react'

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isVisible, setIsVisible] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY })
    if (!isVisible) setIsVisible(true)
  }, [isVisible])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    if (!isDesktop) return
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isDesktop, handleMouseMove, handleMouseLeave])

  if (!isDesktop) return null

  return (
    <div
      className="cursor-glow"
      style={{
        position: 'fixed',
        left: position.x - 150,
        top: position.y - 150,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(60, 242, 140, 0.07) 0%, rgba(60, 242, 140, 0.02) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        transform: 'translate3d(0, 0, 0)',
      }}
      aria-hidden="true"
    />
  )
}
