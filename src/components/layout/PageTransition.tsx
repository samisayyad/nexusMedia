import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence, type Easing } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

// ─── Premium Skeleton ─────────────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="w-full min-h-screen bg-background px-6 pt-28 pb-20 max-w-[1440px] mx-auto">
      {/* Hero area */}
      <div className="space-y-5 mb-16">
        <div className="h-3 w-20 rounded-full bg-border/70 animate-[shimmer_1.4s_ease-in-out_infinite]" />
        <div className="h-14 w-3/4 max-w-xl rounded-2xl bg-border/70 animate-[shimmer_1.4s_ease-in-out_infinite_0.1s]" />
        <div className="h-14 w-1/2 max-w-sm rounded-2xl bg-border/70 animate-[shimmer_1.4s_ease-in-out_infinite_0.15s]" />
        <div className="h-4 w-full max-w-md rounded-full bg-border/50 animate-[shimmer_1.4s_ease-in-out_infinite_0.2s]" />
        <div className="h-4 w-2/3 max-w-sm rounded-full bg-border/50 animate-[shimmer_1.4s_ease-in-out_infinite_0.25s]" />
        <div className="flex gap-3 pt-2">
          <div className="h-11 w-36 rounded-full bg-border/70 animate-[shimmer_1.4s_ease-in-out_infinite_0.3s]" />
          <div className="h-11 w-28 rounded-full bg-border/50 animate-[shimmer_1.4s_ease-in-out_infinite_0.35s]" />
        </div>
      </div>
      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 0.08, 0.16, 0.24, 0.32, 0.4].map((delay, i) => (
          <div
            key={i}
            className="rounded-3xl bg-border/40 animate-[shimmer_1.4s_ease-in-out_infinite]"
            style={{
              height: i === 0 ? 280 : i === 1 ? 200 : 240,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Cinematic sweep curtain ──────────────────────────────────────────────────
const CURTAIN_VARIANTS = {
  initial: { scaleY: 0, transformOrigin: 'top' },
  animate: { scaleY: 1, transformOrigin: 'top',    transition: { duration: 0.42, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] } },
  exit:    { scaleY: 0, transformOrigin: 'bottom', transition: { duration: 0.42, ease: [0.76, 0, 0.24, 1] as [number,number,number,number], delay: 0.05 } },
}

const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
  exit:    { opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.25, ease: 'easeIn' as Easing } },
}

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [isSweeping, setIsSweeping] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(false)
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    setIsSweeping(true)

    // Show skeleton briefly after curtain covers screen
    const t1 = setTimeout(() => setShowSkeleton(true), 220)

    // Swap content just before curtain lifts
    const t2 = setTimeout(() => {
      setDisplayChildren(children)
      setShowSkeleton(false)
    }, 440)

    // Finish sweep
    const t3 = setTimeout(() => setIsSweeping(false), 920)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keep children fresh when not transitioning
  useEffect(() => {
    if (!isSweeping) setDisplayChildren(children)
  }, [children, isSweeping])

  return (
    <>
      {/* Cinematic curtain sweep */}
      <AnimatePresence>
        {isSweeping && (
          <motion.div
            key="curtain"
            variants={CURTAIN_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
          >
            {/* Main curtain */}
            <div className="absolute inset-0 bg-background" />

            {/* Shimmer strip at leading edge */}
            <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

            {/* Skeleton content inside curtain */}
            {showSkeleton && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0"
              >
                <PageSkeleton />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={PAGE_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

// ─── Scroll progress bar ──────────────────────────────────────────────────────
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
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-accent via-accent-2 to-accent"
        style={{ scaleX: progress }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      />
    </div>
  )
}

// ─── WhatsApp FAB ─────────────────────────────────────────────────────────────
export function WhatsAppFab() {
  return (
    <motion.a
      href="https://wa.me/919535289007"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <MessageCircle className="size-6" />
    </motion.a>
  )
}
