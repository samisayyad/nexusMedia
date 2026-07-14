import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'
import { ABOUT_HERO_IMAGES } from '@/constants/data'
import { SectionLabel } from '@/components/ui/SectionLabel'

const SHOWCASE_IMAGES = ABOUT_HERO_IMAGES.map((src, i) => ({
  src,
  alt: [
    'Digital printing precision work',
    'Large format banner printing',
    'ACP sign board fabrication',
    'Vehicle branding wrap',
    'Corporate office branding',
    'Exhibition trade show booth',
  ][i] ?? 'NexusMedia print work',
}))

const HIGHLIGHTS = [
  { value: '15+', label: 'Years in Business' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '200+', label: 'Happy Clients' },
  { value: '30+', label: 'Services Offered' },
]

export function PrintShowcaseHero() {
  const [currentIndex, setCurrentIndex] = React.useState(
    Math.floor(SHOWCASE_IMAGES.length / 2)
  )

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_IMAGES.length)
  }, [])

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SHOWCASE_IMAGES.length) % SHOWCASE_IMAGES.length)
  }, [])

  // Auto-advance every 4s
  React.useEffect(() => {
    const timer = setInterval(handleNext, 4000)
    return () => clearInterval(timer)
  }, [handleNext])

  return (
    <section className="relative overflow-hidden bg-muted/30 py-24 lg:py-32">
      {/* Subtle background gradients */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute bottom-0 left-[-20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(37,99,235,0.08),rgba(255,255,255,0))]" />
        <div className="absolute bottom-0 right-[-20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(249,115,22,0.06),rgba(255,255,255,0))]" />
      </div>

      <div className="container-nx relative z-10">
        {/* Text content */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <SectionLabel centered>Our Studio Work</SectionLabel>
          <h2 className="mt-4 text-display-lg font-display font-bold text-primary">
            Printing · Advertising ·{' '}
            <span className="text-accent">Creativity</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-secondary">
            From a single business card to a building-sized sign board — NexusMedia delivers precision printing, bold branding, and powerful signage that makes your business unforgettable in Belgaum and beyond.
          </p>
        </div>

        {/* 3D Perspective Carousel */}
        <div className="relative flex h-[360px] items-center justify-center [perspective:1200px] md:h-[450px]">
          {SHOWCASE_IMAGES.map((image, index) => {
            const total = SHOWCASE_IMAGES.length
            const offset = ((index - currentIndex + total) % total)
            let pos = offset > Math.floor(total / 2) ? offset - total : offset

            const isCenter = pos === 0
            const isAdjacent = Math.abs(pos) === 1

            return (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'absolute w-44 cursor-pointer transition-all duration-500 ease-in-out md:w-60',
                  'rounded-3xl overflow-hidden',
                  isCenter && 'cursor-default',
                  Math.abs(pos) > 1 && 'pointer-events-none'
                )}
                style={{
                  height: isCenter ? 320 : isAdjacent ? 260 : 200,
                  transform: [
                    `translateX(${pos * 42}%)`,
                    `scale(${isCenter ? 1 : isAdjacent ? 0.82 : 0.65})`,
                    `rotateY(${pos * -12}deg)`,
                  ].join(' '),
                  zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                  opacity: isCenter ? 1 : isAdjacent ? 0.55 : 0,
                  filter: isCenter ? 'blur(0px)' : 'blur(2px)',
                  visibility: Math.abs(pos) > 2 ? 'hidden' : 'visible',
                  transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {/* Label on center card */}
                {isCenter && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
                  >
                    <p className="text-xs font-medium uppercase tracking-widest text-white/70">
                      {index + 1} / {SHOWCASE_IMAGES.length}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">{image.alt}</p>
                  </motion.div>
                )}
              </div>
            )
          })}

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-primary shadow-sm backdrop-blur-sm transition-all hover:border-accent hover:text-accent sm:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-primary shadow-sm backdrop-blur-sm transition-all hover:border-accent hover:text-accent sm:right-8"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex justify-center gap-1.5">
          {SHOWCASE_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === currentIndex
                  ? 'w-6 bg-accent'
                  : 'w-1.5 bg-border hover:bg-secondary'
              )}
            />
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4"
        >
          {HIGHLIGHTS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center bg-card px-6 py-8 text-center"
            >
              <span className="font-display text-3xl font-bold text-accent md:text-4xl">{stat.value}</span>
              <span className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
