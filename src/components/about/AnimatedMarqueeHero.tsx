import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { ROUTES } from '@/constants/routes'

interface AnimatedMarqueeHeroProps {
  tagline: string
  title: React.ReactNode
  description: string
  ctaText: string
  ctaHref?: string
  images: string[]
  className?: string
}

const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 20 } },
}

export function AnimatedMarqueeHero({
  tagline,
  title,
  description,
  ctaText,
  ctaHref = ROUTES.contact,
  images,
  className,
}: AnimatedMarqueeHeroProps) {
  const duplicatedImages = [...images, ...images]

  return (
    <section
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 pt-14 text-center',
        className
      )}
    >
      <div className="z-10 flex flex-col items-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeVariants}
          className="mb-4 inline-block rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm"
        >
          {tagline}
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="font-display text-5xl font-bold tracking-tighter text-foreground md:text-7xl"
        >
          {typeof title === 'string'
            ? title.split(' ').map((word, i) => (
                <motion.span key={i} variants={fadeVariants} className="inline-block">
                  {word}&nbsp;
                </motion.span>
              ))
            : title}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeVariants}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-xl text-lg text-muted-foreground"
        >
          {description}
        </motion.p>

        <motion.div initial="hidden" animate="show" variants={fadeVariants} transition={{ delay: 0.6 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={ctaHref}
              className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-accent/90"
            >
              {ctaText}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 h-1/3 w-full [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] md:h-2/5">
        <motion.div
          className="flex gap-4"
          animate={{ x: ['-100%', '0%'] }}
          transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative h-48 flex-shrink-0 md:h-64"
              style={{ aspectRatio: '3/4', rotate: `${index % 2 === 0 ? -2 : 5}deg` }}
            >
              <img
                src={src}
                alt={`Showcase ${index + 1}`}
                loading="lazy"
                className="h-full w-full rounded-2xl object-cover shadow-md"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
