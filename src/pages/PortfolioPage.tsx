import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '@/constants/data'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components/ui/Button'
import { ShuffleHero } from '@/components/shared/ShuffleHero'
import { cn } from '@/utils/cn'

const CATEGORIES = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))]

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const card = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
}

export default function PortfolioPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active)

  return (
    <>
      {/* ── SHUFFLE HERO ───────────────────────────────────────────────────── */}
      <ShuffleHero
        eyebrow="Our Portfolio · 500+ Projects"
        heading="Portfolio of Excellence"
        description="A curated collection of print, branding, signage, and advertising projects delivered to clients across Belgaum and Karnataka — each one a story of craft and precision."
        ctaText="Get a Free Quote"
        ctaHref={ROUTES.quote}
        ctaSecondaryText="View Gallery"
        ctaSecondaryHref="/gallery"
      />

      {/* ── FILTER + GRID ─────────────────────────────────────────────────── */}
      <section className="section-nx pt-8">
        <div className="container-nx">
          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-medium transition-all duration-300',
                  active === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'border border-border bg-card text-secondary hover:border-accent/60 hover:text-primary hover:shadow-sm'
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={grid}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {filtered.map((project, i) => (
                <motion.div key={project.id} variants={card}>
                  <Link
                    to={`/portfolio/${project.id}`}
                    className="group relative flex overflow-hidden rounded-[2rem] border border-border bg-card transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/8"
                  >
                    <div className={cn('grid w-full', 'lg:grid-cols-[55%_45%]', i % 2 !== 0 && 'lg:grid-cols-[45%_55%]')}>
                      {/* Image side */}
                      <div className={cn('relative overflow-hidden', 'aspect-[16/10] lg:aspect-auto lg:min-h-[420px]', i % 2 !== 0 && 'lg:order-2')}>
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-primary/10" />
                        {/* Category pill on image */}
                        <div className="absolute top-5 left-5">
                          <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-md">
                            {project.category}
                          </span>
                        </div>
                        {/* Result badge */}
                        <div className="absolute bottom-5 left-5 right-5 lg:hidden">
                          <p className="font-display text-xl font-bold text-white drop-shadow">{project.title}</p>
                        </div>
                      </div>

                      {/* Text side */}
                      <div className={cn('flex flex-col justify-center p-8 md:p-12 lg:p-14', i % 2 !== 0 && 'lg:order-1')}>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{project.category}</span>

                        <h2 className="mt-3 font-display text-2xl font-bold text-primary transition-colors duration-300 group-hover:text-accent md:text-3xl lg:text-4xl">
                          {project.title}
                        </h2>

                        <p className="mt-4 leading-relaxed text-secondary">{project.desc}</p>

                        {/* Tech tags */}
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {project.technologies.map((t) => (
                            <span key={t} className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-secondary">
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                          View Case Study
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:border-accent">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 overflow-hidden rounded-[2rem] bg-primary px-8 py-14 text-center md:px-16"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/15 to-accent-2/15" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                Ready to Join Our <span className="text-accent-2">Portfolio?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-white/70">
                Let's create something remarkable together. Get a free consultation and quote within 4 hours.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild variant="accent" size="xl" className="shadow-lg hover:shadow-xl hover:shadow-accent/20">
                  <Link to={ROUTES.quote}>Get Free Quote</Link>
                </Button>
                <Button asChild variant="outline" size="xl" className="border-white/20 bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 hover:shadow-lg hover:shadow-white/10 transition-all duration-300">
                  <Link to={ROUTES.contact}>Contact Us</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
