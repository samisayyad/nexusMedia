import { Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
import { useScroll } from 'framer-motion'
import { useRef } from 'react'
import { HERO_MACHINE_IMAGE } from '@/constants/data'

const MachineScene = lazy(() =>
  import('./MachineScene').then((m) => ({ default: m.MachineScene }))
)

function HeroFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-[70%] w-[80%] animate-pulse rounded-3xl bg-gradient-to-br from-muted to-border" />
    </div>
  )
}

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  return (
    <div ref={containerRef} className="relative h-full w-full min-h-[400px] lg:min-h-[600px]">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 via-transparent to-accent-2/5" />
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/10 to-transparent blur-3xl opacity-60" />
      <Suspense fallback={<HeroFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          className="!absolute inset-0 rounded-3xl"
        >
          <MachineScene scrollProgress={scrollYProgress} imageUrl={HERO_MACHINE_IMAGE} />
        </Canvas>
      </Suspense>
      {/* Floating shadow */}
      <div className="absolute -bottom-8 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-primary/10 blur-2xl" />
    </div>
  )
}
