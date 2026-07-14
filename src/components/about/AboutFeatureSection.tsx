import { motion } from 'framer-motion'
import {
  Printer, Clock, Award, Users, Sparkles, Layers,
  TrendingUp, Package, Zap, Settings,
} from 'lucide-react'
import { WHY_CHOOSE } from '@/constants/data'

// Timeline items adapted from NexusMedia's service capabilities
const WORKFLOW_ITEMS = [
  { title: 'Design Consultation', subtitle: 'Free strategy & concept session', icon: <Sparkles className="w-4 h-4" /> },
  { title: 'Print Production', subtitle: '300 DPI quality on any substrate', icon: <Printer className="w-4 h-4" /> },
  { title: 'Quality Assurance', subtitle: 'Strict checks before dispatch', icon: <Award className="w-4 h-4" /> },
  { title: 'Fast Delivery', subtitle: 'Most orders in 24–48 hours', icon: <Clock className="w-4 h-4" /> },
  { title: 'Installation Team', subtitle: 'Professional on-site install', icon: <Settings className="w-4 h-4" /> },
  { title: 'Client Support', subtitle: 'Dedicated after-sales service', icon: <Users className="w-4 h-4" /> },
  { title: 'Fleet Branding', subtitle: 'Full vehicle wrap campaigns', icon: <TrendingUp className="w-4 h-4" /> },
  { title: 'Corporate Gifts', subtitle: 'Branded merchandise & merch', icon: <Package className="w-4 h-4" /> },
  { title: 'Exhibition Stands', subtitle: 'Trade show & event displays', icon: <Layers className="w-4 h-4" /> },
  { title: 'LED Signage', subtitle: '24/7 illuminated brand presence', icon: <Zap className="w-4 h-4" /> },
]

const BADGES = WHY_CHOOSE.map(w => w.title.split(' ').slice(-2).join(' '))

export function AboutFeatureSection() {
  return (
    <section className="relative w-full py-16 px-4 bg-muted/20">
      <div className="mx-auto max-w-5xl grid grid-cols-1 items-center gap-12 md:grid-cols-2">

        {/* LEFT — Animated workflow card */}
        <div className="relative w-full max-w-sm mx-auto md:mx-0">
          {/* Glow */}
          <div className="absolute -inset-4 rounded-3xl bg-accent/6 blur-xl pointer-events-none" />

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">NexusMedia Workflow</span>
              <div />
            </div>

            {/* Scrolling items */}
            <div className="relative h-[320px] overflow-hidden">
              <motion.div
                className="flex flex-col gap-0 absolute w-full"
                animate={{ y: ['0%', '-50%'] }}
                transition={{ repeat: Infinity, repeatType: 'loop', duration: 16, ease: 'linear' }}
              >
                {[...WORKFLOW_ITEMS, ...WORKFLOW_ITEMS].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-accent shadow-sm">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-primary truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                    </div>
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  </div>
                ))}
              </motion.div>

              {/* Fade masks */}
              <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-card to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-card to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </div>

        {/* RIGHT — Content */}
        <div className="space-y-5">
          <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/8 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            Our Process
          </span>
          <h3 className="text-2xl font-display font-bold text-primary leading-tight sm:text-3xl lg:text-4xl">
            From Concept{' '}
            <span className="text-accent">to Completion</span>
          </h3>
          <p className="text-base leading-relaxed text-secondary">
            At nexusMedia, every project follows a rigorous workflow — from initial design consultation and material selection through precision printing, quality checks, and professional installation. We handle everything so you don&apos;t have to.
          </p>
          <p className="text-base leading-relaxed text-secondary">
            Our 15+ years of experience means we know exactly how to turn your brief — no matter how basic — into a powerful brand statement that gets noticed.
          </p>

          {/* Capability badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {BADGES.map((badge) => (
              <span key={badge} className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-secondary">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
