import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Particle Field ───
function ParticleField({ count = 600 }) {
  const mesh = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25
      sz[i] = Math.random() * 2 + 0.5
    }
    return [pos, sz]
  }, [count])

  const [colors] = useMemo(() => {
    const cols = new Float32Array(count * 3)
    const neonGreen = new THREE.Color('#3CF28C')
    const neonPurple = new THREE.Color('#8B5CF6')
    const neon = new THREE.Color('#3B82F6')
    const palette = [neonGreen, neonPurple, neon]
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)]
      cols[i * 3] = c.r
      cols[i * 3 + 1] = c.g
      cols[i * 3 + 2] = c.b
    }
    return [cols]
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.elapsedTime
    const posArray = mesh.current.geometry.attributes.position.array

    // Subtle mouse influence
    mouseRef.current.x = state.pointer.x * 0.3
    mouseRef.current.y = state.pointer.y * 0.3

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      posArray[i3] += Math.sin(time * 0.1 + i * 0.01) * 0.002 + mouseRef.current.x * 0.001
      posArray[i3 + 1] += Math.cos(time * 0.15 + i * 0.01) * 0.002 + mouseRef.current.y * 0.001
      posArray[i3 + 2] += Math.sin(time * 0.08 + i * 0.02) * 0.001

      // Wrap around boundaries
      if (posArray[i3] > 12.5) posArray[i3] = -12.5
      if (posArray[i3] < -12.5) posArray[i3] = 12.5
      if (posArray[i3 + 1] > 12.5) posArray[i3 + 1] = -12.5
      if (posArray[i3 + 1] < -12.5) posArray[i3 + 1] = 12.5
      if (posArray[i3 + 2] > 12.5) posArray[i3 + 2] = -12.5
      if (posArray[i3 + 2] < -12.5) posArray[i3 + 2] = 12.5
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ─── Floating Hexagon ───
function FloatingHexagon({ position, color, speed = 0.5 }) {
  const mesh = useRef()

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime * speed
    mesh.current.rotation.x = t * 0.3
    mesh.current.rotation.z = t * 0.2
    mesh.current.position.y = position[1] + Math.sin(t) * 0.5
  })

  const shape = useMemo(() => {
    const s = new THREE.Shape()
    const sides = 6
    const radius = 0.5
    for (let i = 0; i <= sides; i++) {
      const angle = (i / sides) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      if (i === 0) s.moveTo(x, y)
      else s.lineTo(x, y)
    }
    return s
  }, [])

  return (
    <mesh ref={mesh} position={position}>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
  )
}

// ─── Floating Sphere ───
function FloatingSphere({ position, color, speed = 0.3 }) {
  const mesh = useRef()

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime * speed
    mesh.current.position.y = position[1] + Math.sin(t + position[0]) * 0.8
    mesh.current.position.x = position[0] + Math.cos(t * 0.5) * 0.3
  })

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.06} />
    </mesh>
  )
}

// ─── Scene Content ───
function SceneContent() {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    // Slow global rotation
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <group ref={groupRef}>
      <ParticleField count={500} />
      <FloatingHexagon position={[-4, 2, -5]} color="#3CF28C" speed={0.3} />
      <FloatingHexagon position={[5, -1, -6]} color="#8B5CF6" speed={0.4} />
      <FloatingHexagon position={[-2, -3, -4]} color="#3B82F6" speed={0.35} />
      <FloatingSphere position={[3, 3, -4]} color="#3CF28C" speed={0.25} />
      <FloatingSphere position={[-5, -2, -5]} color="#8B5CF6" speed={0.3} />
      <FloatingSphere position={[0, 4, -7]} color="#3B82F6" speed={0.2} />
      <FloatingSphere position={[-3, 0, -8]} color="#3CF28C" speed={0.35} />
    </group>
  )
}

// ─── Main Component (Desktop Only) ───
export default function Scene3D() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!isDesktop) return null

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
