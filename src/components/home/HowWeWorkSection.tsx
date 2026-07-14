import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { PROCESS_STEPS } from '@/constants/data'
import { ROUTES } from '@/constants/routes'

export function HowWeWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} className="section-nx bg-card">
      <div className="container-nx grid gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel>Our Process</SectionLabel>
          <h2 className="mt-4 text-display-lg font-display font-bold text-primary">
            How We <span className="text-accent">Work</span>
          </h2>
          <p className="mt-6 text-lg text-secondary">
            A clear, collaborative process that ensures your project is delivered on time, on brand, and beyond expectations.
          </p>
          <Button asChild variant="accent" size="lg" className="mt-8">
            <Link to={ROUTES.quote}>Start a Project</Link>
          </Button>
        </div>

        <div className="relative">
          {/* Progress track */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border">
            <motion.div
              className="w-full origin-top rounded-full bg-gradient-to-b from-accent via-accent-2 to-accent"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative flex gap-8 pb-16 last:pb-0"
              >
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    className="flex size-12 items-center justify-center rounded-full border-2 border-accent bg-card font-display text-sm font-bold text-accent shadow-lg shadow-accent/20"
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                  >
                    {step.n}
                  </motion.div>
                </div>
                <motion.div
                  className="flex-1 rounded-2xl border border-border bg-background p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                  whileInView={{ y: [20, 0], opacity: [0, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  <h3 className="font-display text-xl font-bold text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">{step.desc}</p>
                  <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${((i + 1) / PROCESS_STEPS.length) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
