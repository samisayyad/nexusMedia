import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface ArcGalleryHeroProps {
  images: string[]
  startAngle?: number
  endAngle?: number
  radiusLg?: number
  radiusMd?: number
  radiusSm?: number
  cardSizeLg?: number
  cardSizeMd?: number
  cardSizeSm?: number
  heading?: string
  subheading?: string
  ctaText?: string
  ctaHref?: string
}

export const ArcGalleryHero: React.FC<ArcGalleryHeroProps> = ({
  images,
  startAngle = 20,
  endAngle = 160,
  radiusLg = 460,
  radiusMd = 340,
  radiusSm = 240,
  cardSizeLg = 115,
  cardSizeMd = 95,
  cardSizeSm = 74,
  heading = 'Work That Speaks Volumes',
  subheading = 'A curated visual showcase of premium print, signage, and branding work across Belgaum and Karnataka.',
  ctaText = 'Explore All Work',
  ctaHref = '/gallery',
}) => {
  const [dim, setDim] = useState({ radius: radiusLg, cardSize: cardSizeLg })

  useEffect(() => {
    const handle = () => {
      const w = window.innerWidth
      if (w < 640) setDim({ radius: radiusSm, cardSize: cardSizeSm })
      else if (w < 1024) setDim({ radius: radiusMd, cardSize: cardSizeMd })
      else setDim({ radius: radiusLg, cardSize: cardSizeLg })
    }
    handle()
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm])

  const count = Math.max(images.length, 2)
  const step = (endAngle - startAngle) / (count - 1)

  return (
    <div className="relative overflow-hidden bg-background pt-32 pb-4">
      {/* Subtle gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/6 via-transparent to-transparent" />

      {/* Arc container */}
      <div
        className="relative mx-auto w-full"
        style={{ height: dim.radius * 1.15 }}
      >
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {images.map((src, i) => {
            const angle = startAngle + step * i
            const rad = (angle * Math.PI) / 180
            const x = Math.cos(rad) * dim.radius
            const y = Math.sin(rad) * dim.radius

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  width: dim.cardSize,
                  height: dim.cardSize,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: 'translate(-50%, 50%)',
                  zIndex: count - i,
                  animation: `arc-fade-up 0.8s ease-out forwards`,
                  animationDelay: `${i * 90}ms`,
                  opacity: 0,
                }}
              >
                <div
                  className="w-full h-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-border transition-transform duration-300 hover:scale-110 hover:z-50 cursor-pointer"
                  style={{ transform: `rotate(${angle / 4}deg)` }}
                >
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="block w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hero text content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-6 text-center pb-16 md:pb-20"
        style={{ marginTop: `-${Math.round(dim.radius * 0.42)}px` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Visual Gallery
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-3xl text-4xl font-display font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl"
        >
          {heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-4 max-w-xl text-base leading-relaxed text-secondary sm:text-lg"
        >
          {subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to={ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            {ctaText} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-semibold text-primary transition-all hover:border-accent hover:text-accent"
          >
            View Portfolio
          </Link>
        </motion.div>
      </div>

      {/* Keyframes injected locally */}
      <style>{`
        @keyframes arc-fade-up {
          from { opacity: 0; transform: translate(-50%, 64%); }
          to   { opacity: 1; transform: translate(-50%, 50%); }
        }
      `}</style>
    </div>
  )
}
