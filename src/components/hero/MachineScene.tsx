import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Float, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import type { MotionValue } from 'framer-motion'
import { useMotionValueEvent } from 'framer-motion'

interface MachineSceneProps {
  scrollProgress: MotionValue<number>
  imageUrl: string
}

export function MachineScene({ scrollProgress, imageUrl }: MachineSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const progressRef = useRef(0)

  useMotionValueEvent(scrollProgress, 'change', (v) => {
    progressRef.current = v
  })

  const texture = useTexture(imageUrl)

  const layers = useMemo(() => {
    return [
      { z: -0.3, scale: 1.15, opacity: 0.3 },
      { z: -0.15, scale: 1.08, opacity: 0.5 },
      { z: 0, scale: 1, opacity: 1 },
    ]
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    const scroll = progressRef.current

    groupRef.current.rotation.y = t * 0.15 + scroll * Math.PI * 0.5
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05 + scroll * 0.3
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.08 - scroll * 0.5
    groupRef.current.position.z = scroll * -1.5
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#2563EB" />
      <pointLight position={[0, 2, 3]} intensity={0.8} color="#F97316" />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <group ref={groupRef}>
          {layers.map((layer, i) => (
            <mesh key={i} position={[0, 0, layer.z]} scale={layer.scale}>
              <planeGeometry args={[3.2, 2.4]} />
              <meshStandardMaterial
                map={texture}
                transparent
                opacity={layer.opacity}
                side={THREE.DoubleSide}
                metalness={0.3}
                roughness={0.4}
              />
            </mesh>
          ))}
          {/* Machine frame edges for depth */}
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[3.25, 2.45, 0.05]} />
            <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.2} transparent opacity={0.15} />
          </mesh>
        </group>
      </Float>

      <Sparkles count={40} scale={6} size={2} speed={0.3} opacity={0.4} color="#2563EB" />
      <Environment preset="city" />
    </>
  )
}
