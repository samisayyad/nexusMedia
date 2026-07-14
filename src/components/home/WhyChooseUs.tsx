import { motion } from 'framer-motion'
import { Clock, Shield, Sparkles, Truck, MessageCircle, Award } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { WHY_CHOOSE } from '@/constants/data'

const icons: LucideIcon[] = [Award, Sparkles, Shield, Clock, MessageCircle, Truck]

export function WhyChooseUs() {
  return (
    <section className="section-nx relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent-2/5 pointer-events-none" />
      <div className="container-nx relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Why NexusMedia</p>
          <h2 className="mt-4 font-display text-display-lg font-bold text-primary">
            The Belgaum Standard for <span className="text-accent">Print Excellence</span>
          </h2>
          <p className="mt-4 text-lg text-secondary">
            We don&apos;t just print — we craft brand experiences that leave a lasting impression.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((item, i) => {
            const Icon = icons[i] ?? Sparkles
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10"
              >
                <div className="absolute -right-8 -top-8 size-32 rounded-full bg-accent/5 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">{item.desc}</p>
                  <div className="mt-5 h-0.5 w-0 bg-accent transition-all duration-500 group-hover:w-12" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
