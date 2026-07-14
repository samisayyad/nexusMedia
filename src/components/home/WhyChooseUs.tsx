import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award, Sparkles, Shield, Clock, MessageCircle, Truck, ArrowRight, type LucideIcon } from 'lucide-react'
import { WHY_CHOOSE } from '@/constants/data'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'

const ICONS: LucideIcon[] = [Award, Sparkles, Shield, Clock, MessageCircle, Truck]

// Map WHY_CHOOSE data to tab format
const TABS = WHY_CHOOSE.map((item, i) => ({
  value: `tab-${i}`,
  icon: ICONS[i] ?? Sparkles,
  label: item.title.replace(/\d+\+\s*/g, '').trim(),    // short label
  fullTitle: item.title,
  desc: item.desc,
  image: [
    'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80', // experience
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', // end-to-end
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80', // quality
    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80', // turnaround
    'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80', // pricing
    'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80', // consultation
  ][i] ?? 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
  badge: ['15+ Years', 'One Partner', '300 DPI', '24-48h', 'No Surprises', 'Free Design'][i] ?? 'Premium',
}))

export function WhyChooseUs() {
  const [active, setActive] = useState(TABS[0].value)
  const activeTab = TABS.find(t => t.value === active) ?? TABS[0]

  return (
    <section className="section-nx relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent-2/5" />
      <div className="container-nx relative">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Why nexusMedia</p>
          <h2 className="mt-4 font-display text-display-lg font-bold text-primary">
            The Belgaum Standard for{' '}
            <span className="text-accent">Print Excellence</span>
          </h2>
          <p className="mt-4 text-lg text-secondary">
            We don&apos;t just print — we craft brand experiences that leave a lasting impression.
          </p>
        </div>

        {/* Tab pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.value}
                onClick={() => setActive(tab.value)}
                className={cn(
                  'flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium transition-all duration-300',
                  active === tab.value
                    ? 'border-accent bg-accent text-white shadow-md shadow-accent/25'
                    : 'border-border bg-card text-secondary hover:border-accent/50 hover:text-primary'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content panel */}
        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-border bg-card/70 p-6 shadow-xl backdrop-blur-sm lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* Text side */}
              <div className="flex flex-col gap-5 order-2 lg:order-1">
                <span className="w-fit rounded-full border border-accent/20 bg-accent/8 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  {activeTab.badge}
                </span>
                <h3 className="font-display text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                  {activeTab.fullTitle}
                </h3>
                <p className="text-base leading-relaxed text-secondary lg:text-lg">
                  {activeTab.desc}
                </p>
                <Link
                  to={ROUTES.quote}
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  Get a Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Image side */}
              <div className="relative order-1 lg:order-2">
                <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
                  <img
                    src={activeTab.image}
                    alt={activeTab.fullTitle}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Badge overlay */}
                <div className="absolute -bottom-4 -right-4 rounded-2xl border border-border bg-background px-4 py-3 shadow-lg">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">NexusMedia</p>
                  <p className="mt-0.5 text-sm font-bold text-primary">{activeTab.badge}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
