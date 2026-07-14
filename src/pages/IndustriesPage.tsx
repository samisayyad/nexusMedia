import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { INDUSTRIES } from '@/constants/data'
import { cn } from '@/utils/cn'

function HexagonIcon({ icon, active }: { icon: string; active: boolean }) {
  return (
    <div className={cn(
      'relative flex h-20 w-20 items-center justify-center transition-all duration-300',
      active && 'scale-110'
    )}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <polygon
          points="50,2 95,27 95,73 50,98 5,73 5,27"
          className={cn(
            'fill-card stroke-2 transition-colors',
            active ? 'stroke-accent' : 'stroke-border'
          )}
        />
      </svg>
      <span className="relative text-2xl">{icon}</span>
    </div>
  )
}

export default function IndustriesPage() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <>
      <section className="relative min-h-[50vh] overflow-hidden pt-[72px]">
        <div className="absolute inset-0 opacity-30">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hex" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30 0 L60 15 L60 37 L30 52 L0 37 L0 15 Z" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex)" />
          </svg>
        </div>
        <div className="container-nx relative py-20 md:py-28">
          <SectionLabel>Sectors</SectionLabel>
          <h1 className="mt-6 max-w-4xl text-display-xl font-display font-bold text-primary">
            Every Industry. <span className="text-accent">Every Need.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-secondary">
            NexusMedia serves businesses across every major sector. Wherever there&apos;s a need to communicate, brand, or advertise, we deliver.
          </p>
        </div>
      </section>

      <section className="section-nx bg-muted/30">
        <div className="container-nx">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {INDUSTRIES.map((ind, i) => (
              <motion.button
                key={ind.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelected(selected === i ? null : i)}
                className={cn(
                  'group flex flex-col items-center rounded-3xl border bg-card p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl',
                  selected === i ? 'border-accent shadow-lg shadow-accent/10' : 'border-border'
                )}
              >
                <HexagonIcon icon={ind.icon} active={selected === i} />
                <h3 className="mt-4 font-display text-lg font-bold text-primary">{ind.name}</h3>
                <p className="mt-2 text-sm text-secondary line-clamp-2">{ind.desc}</p>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 overflow-hidden"
              >
                <div className="rounded-3xl border border-accent/20 bg-card p-8 md:p-12">
                  <div className="flex items-start gap-6">
                    <span className="text-5xl">{INDUSTRIES[selected].icon}</span>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-primary">{INDUSTRIES[selected].name}</h2>
                      <p className="mt-3 text-secondary leading-relaxed">{INDUSTRIES[selected].desc}</p>
                      <div className="mt-6 rounded-xl bg-accent/5 border border-accent/10 p-4">
                        <p className="text-sm font-medium text-accent">Case Study</p>
                        <p className="mt-2 text-secondary">{INDUSTRIES[selected].case}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
