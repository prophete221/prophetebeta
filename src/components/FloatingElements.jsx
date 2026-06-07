import { motion } from 'framer-motion'
import { useParallaxMouse } from '../hooks/useParallax'

const shapes = [
  // Football/soccer ball
  { type: 'football', x: '8%', y: '15%', size: 32, delay: 0, duration: 6 },
  { type: 'football', x: '85%', y: '45%', size: 24, delay: 1.5, duration: 7 },
  // Hexagons
  { type: 'hexagon', x: '15%', y: '60%', size: 28, delay: 0.5, duration: 5.5 },
  { type: 'hexagon', x: '78%', y: '20%', size: 22, delay: 2, duration: 6.5 },
  { type: 'hexagon', x: '92%', y: '70%', size: 18, delay: 1, duration: 5 },
  // Diamonds
  { type: 'diamond', x: '5%', y: '80%', size: 20, delay: 0.8, duration: 6 },
  { type: 'diamond', x: '70%', y: '85%', size: 16, delay: 1.8, duration: 5.5 },
  // Circles
  { type: 'circle', x: '25%', y: '35%', size: 14, delay: 0.3, duration: 7 },
  { type: 'circle', x: '60%', y: '10%', size: 10, delay: 2.5, duration: 6 },
]

function ShapeIcon({ type, size }) {
  const s = size
  switch (type) {
    case 'football':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.12">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      )
    case 'hexagon':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.1">
          <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
        </svg>
      )
    case 'diamond':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.1">
          <polygon points="12,2 22,12 12,22 2,12" />
        </svg>
      )
    case 'circle':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.08">
          <circle cx="12" cy="12" r="10" />
        </svg>
      )
    default:
      return null
  }
}

export default function FloatingElements() {
  const { containerRef, style } = useParallaxMouse(10)

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div style={style} className="absolute inset-0">
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute text-neon-green"
            style={{ left: shape.x, top: shape.y }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ShapeIcon type={shape.type} size={shape.size} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
