import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/utils/cn'

// ─── Printing & branding specific image set ────────────────────────────────
const PRINT_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80' },
  { id: 2, src: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80' },
  { id: 3, src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80' },
  { id: 4, src: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80' },
  { id: 5, src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80' },
  { id: 6, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80' },
  { id: 7, src: 'https://images.unsplash.com/photo-1586953208448-b95f7f86628e?w=400&q=80' },
  { id: 8, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80' },
  { id: 9, src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80' },
  { id: 10, src: 'https://images.unsplash.com/photo-1505373877841-8d25f39d4686?w=400&q=80' },
  { id: 11, src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id: 12, src: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80' },
  { id: 13, src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80' },
  { id: 14, src: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&q=80' },
  { id: 15, src: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=400&q=80' },
  { id: 16, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
]

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function ShuffleGrid() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [squares, setSquares] = useState(() => shuffle(PRINT_IMAGES))

  const shuffleSquares = () => {
    setSquares((prev) => shuffle(prev))
    timerRef.current = setTimeout(shuffleSquares, 3000)
  }

  useEffect(() => {
    shuffleSquares()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[360px] sm:h-[420px] lg:h-[460px] gap-1.5 rounded-2xl overflow-hidden pointer-events-none">
      {squares.map((sq) => (
        <motion.div
          key={sq.id}
          layout
          transition={{ duration: 1.5, type: 'spring', bounce: 0.2 }}
          className="w-full h-full rounded-xl overflow-hidden bg-muted"
          style={{
            backgroundImage: `url(${sq.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
    </div>
  )
}

// ─── Portfolio variant content ─────────────────────────────────────────────
interface ShuffleHeroProps {
  eyebrow: string
  heading: string
  description: string
  ctaText: string
  ctaHref: string
  ctaSecondaryText?: string
  ctaSecondaryHref?: string
}

export function ShuffleHero({
  eyebrow,
  heading,
  description,
  ctaText,
  ctaHref,
  ctaSecondaryText,
  ctaSecondaryHref,
}: ShuffleHeroProps) {
  return (
    <section className="w-full overflow-hidden bg-background pt-32 pb-8">
      <div className="container-nx grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl"
          >
            {heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 text-base leading-relaxed text-secondary sm:text-lg"
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to={ctaHref}
              className={cn(
                'inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white',
                'shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5'
              )}
            >
              {ctaText} <ArrowRight className="h-4 w-4" />
            </Link>
            {ctaSecondaryText && ctaSecondaryHref && (
              <Link
                to={ctaSecondaryHref}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-semibold text-primary transition-all hover:border-accent hover:text-accent"
              >
                {ctaSecondaryText}
              </Link>
            )}
          </motion.div>
        </div>

        {/* Shuffle grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <ShuffleGrid />
        </motion.div>
      </div>
    </section>
  )
}
