import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Clock, Layers } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ShuffleHero } from '@/components/shared/ShuffleHero'
import { SERVICES } from '@/constants/data'
import { ROUTES } from '@/constants/routes'
import { fadeUp } from '@/animations/variants'

export default function ServicesPage() {
  const { id } = useParams<{ id?: string }>()

  // Scroll to the target service section on mount / id change
  useEffect(() => {
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    // Small delay to let page render first
    const timer = setTimeout(() => {
      const el = document.getElementById(`service-${id}`)
      if (el) {
        const headerOffset = 80
        const y = el.getBoundingClientRect().top + window.scrollY - headerOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [id])

  return (
    <>
      {/* ── SHUFFLE HERO ───────────────────────────────────────────────────── */}
      <ShuffleHero
        eyebrow="What We Offer · 30+ Services"
        heading="30+ Services. One Studio."
        description="From your first business card to a complete outdoor branding campaign, nexusMedia is the only partner you'll ever need for printing, signage, and branding in Belgaum."
        ctaText="Get a Free Quote"
        ctaHref={ROUTES.quote}
        ctaSecondaryText="View Portfolio"
        ctaSecondaryHref="/portfolio"
      />

      {/* Quick nav pills */}
      <div className="container-nx py-6">
        <div className="flex flex-wrap gap-2">
          {SERVICES.slice(0, 8).map((service) => (
            <a
              key={service.id}
              href={`#service-${service.id}`}
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              {service.title}
            </a>
          ))}
        </div>
      </div>

      {/* SERVICES LIST */}
      <div>
        {SERVICES.map((service, i) => (
          <motion.section
            key={service.id}
            id={`service-${service.id}`}
            variants={fadeUp}
            className={`section-nx scroll-mt-20 ${i % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
          >
            <div className={`container-nx grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${i % 2 !== 0 ? 'lg:[&>:first-child]:order-2' : ''}`}>
              {/* Text */}
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {service.tags.join(' · ')}
                </div>
                <h2 className="text-display-lg font-display font-bold text-primary">{service.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-secondary">{service.desc}</p>

                {/* Stats row */}
                <div className="mt-6 flex gap-6">
                  <div className="flex flex-col">
                    <span className="font-display text-2xl font-bold text-accent">{service.stats.projects}</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Projects</span>
                  </div>
                  <div className="w-px bg-border" />
                  <div className="flex flex-col">
                    <span className="font-display text-2xl font-bold text-primary">{service.stats.turnaround}</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Turnaround</span>
                  </div>
                </div>

                {/* Benefits */}
                <ul className="mt-6 grid grid-cols-2 gap-2">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-secondary">
                      <Check className="size-4 shrink-0 text-accent" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Applications */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.applications.map((app) => (
                    <span key={app} className="rounded-md border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                      {app}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="md">
                    <Link to={ROUTES.quote}>
                      Get a Quote <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="md">
                    <Link to={ROUTES.portfolio}>See Examples</Link>
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 lg:h-96"
                  />
                  {/* Floating badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-2xl border border-border/60 bg-background/90 px-4 py-2.5 backdrop-blur-md">
                    <Clock className="size-4 text-accent" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Turnaround</p>
                      <p className="text-sm font-semibold text-primary">{service.stats.turnaround}</p>
                    </div>
                    <div className="ml-3 border-l border-border pl-3">
                      <Layers className="size-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Projects</p>
                      <p className="text-sm font-semibold text-primary">{service.stats.projects}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* CTA */}
      <section className="section-nx bg-background">
        <div className="container-nx">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-primary px-8 py-16 text-center md:px-16 md:py-20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-2/20" />
            <div className="relative z-10">
              <h2 className="text-display-lg font-display font-bold text-white">
                Need a Custom <span className="text-accent-2">Solution?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-white/70">
                Tell us about your project and we&apos;ll design a service package that fits your goals and budget perfectly.
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
