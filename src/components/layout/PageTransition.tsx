import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function PageSkeleton() {
  return (
    <div className="container-nx pt-32 pb-20 space-y-8 animate-pulse">
      <div className="h-4 w-24 rounded bg-border" />
      <div className="h-16 w-2/3 max-w-lg rounded-xl bg-border" />
      <div className="h-4 w-full max-w-md rounded bg-border" />
      <div className="grid gap-6 mt-12 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-2xl bg-border" />
        ))}
      </div>
    </div>
  )
}

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const [phase, setPhase] = useState<'idle' | 'fade' | 'overlay' | 'skeleton' | 'reveal'>('idle')
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    setPhase('fade')
    const t1 = setTimeout(() => setPhase('overlay'), 150)
    const t2 = setTimeout(() => setPhase('skeleton'), 300)
    const t3 = setTimeout(() => {
      setDisplayChildren(children)
      setPhase('reveal')
    }, 550)
    const t4 = setTimeout(() => setPhase('idle'), 900)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [location.pathname])

  useEffect(() => {
    if (phase === 'idle') setDisplayChildren(children)
  }, [children, phase])

  return (
    <>
      <AnimatePresence>
        {(phase === 'fade' || phase === 'overlay' || phase === 'skeleton') && (
          <motion.div
            key="transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'overlay' || phase === 'skeleton' ? 1 : 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] pointer-events-none"
          >
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
            {phase === 'skeleton' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-background"
              >
                <PageSkeleton />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: phase === 'reveal' ? 0.1 : 0 }}
      >
        {displayChildren}
      </motion.div>
    </>
  )
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? window.scrollY / docHeight : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-border/50">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-accent to-accent-2"
        style={{ scaleX: progress }}
      />
    </div>
  )
}

import { MessageCircle } from 'lucide-react'

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/919535289007"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="size-6" />
    </a>
  )
}
