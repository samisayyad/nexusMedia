import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { HeroShowcaseCard } from '@/components/home/HeroShowcaseCard'
import { ServiceBentoCarousel } from '@/components/home/ServiceBentoCarousel'
import { HowWeWorkSection } from '@/components/home/HowWeWorkSection'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { TestimonialsMarquee } from '@/components/home/TestimonialsMarquee'
import { GalleryHoverCarousel } from '@/components/home/GalleryHoverCarousel'
import { PrintShowcaseHero } from '@/components/home/PrintShowcaseHero'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Marquee } from '@/components/ui/Marquee'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { CLIENTS, FAQS, TECHNOLOGIES } from '@/constants/data'
import { ROUTES } from '@/constants/routes'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronRight } from 'lucide-react'

function SplitText({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export default function HomePage() {
  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] overflow-hidden pt-0">
        {/* Orbital gradient rings */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-accent/8 blur-[120px]" />
          <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-accent-2/6 blur-[100px]" />
          {/* Faint grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="container-nx relative z-10 grid pt-10 lg:pt-16 pb-12 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* ── Left column ── */}
          <div className="relative z-10 flex flex-col">
            {/* Badge pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Belgaum&apos;s Premier Print &amp; Branding Studio
            </motion.div>

            {/* Headline */}
            <h1 className="text-display-hero font-display font-bold text-primary">
              <SplitText text="Printing" />
              <br />
              <span className="relative">
                <span className="text-accent">
                  <SplitText text="that Moves" />
                </span>
              </span>
              <br />
              <SplitText text="Brands" />
            </h1>

            {/* Sub copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.6 }}
              className="mt-5 max-w-[480px] text-lg leading-relaxed text-secondary"
            >
              From a single business card to a building-sized sign board —{' '}
              <strong className="font-semibold text-primary">nexusMedia</strong> delivers
              precision printing, bold branding, and powerful signage that makes your
              business unforgettable across Belgaum.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MagneticButton
                to={ROUTES.quote}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
              >
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to={ROUTES.portfolio}>View Portfolio</Link>
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-8 flex flex-wrap items-center gap-6 border-t border-border/60 pt-5"
            >
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop',
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Client"
                    className="h-9 w-9 rounded-full border-2 border-background object-cover shadow-sm"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-3.5 w-3.5 fill-accent-2 text-accent-2" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-xs font-semibold text-primary">5.0</span>
                </div>
                <p className="mt-0.5 text-xs text-secondary">Trusted by 200+ clients in Belgaum</p>
              </div>
            </motion.div>
          </div>

          {/* ── Right column — Bento card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 rounded-3xl bg-accent/10 blur-3xl scale-90" />
            <HeroShowcaseCard />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-secondary"
        >
          <span className="text-[9px] font-medium uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </section>

      {/* CLIENTS MARQUEE */}
      <Marquee items={CLIENTS} />

      {/* SERVICES BENTO CAROUSEL */}
      <ServiceBentoCarousel />

      {/* HOW WE WORK */}
      <HowWeWorkSection />

      {/* FEATURED WORK — Gallery Hover Carousel */}
      <GalleryHoverCarousel heading="Where Creativity Meets Technology" />

      {/* PRINT SHOWCASE — 3D perspective carousel */}
      <PrintShowcaseHero />

      {/* TECHNOLOGIES MARQUEE */}
      <Marquee items={TECHNOLOGIES} reverse />

      {/* WHY CHOOSE US */}
      <WhyChooseUs />

      {/* TESTIMONIALS */}
      <TestimonialsMarquee />

      {/* FAQ */}
      <section className="section-nx bg-card">
        <div className="container-nx max-w-3xl">
          <div className="text-center">
            <SectionLabel centered>FAQ</SectionLabel>
            <h2 className="mt-4 text-display-lg font-display font-bold text-primary">
              Frequently Asked <span className="text-accent">Questions</span>
            </h2>
          </div>
          <Accordion.Root type="single" collapsible className="mt-12 space-y-3">
            {FAQS.map((faq, i) => (
              <Accordion.Item
                key={i}
                value={`faq-${i}`}
                className="overflow-hidden rounded-2xl border border-border bg-background"
              >
                <Accordion.Trigger className="group flex w-full items-center justify-between p-6 text-left font-display font-semibold text-primary transition-colors hover:bg-muted/50">
                  {faq.q}
                  <ChevronRight className="h-5 w-5 shrink-0 text-secondary transition-transform group-data-[state=open]:rotate-90" />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden">
                  <p className="px-6 pb-6 leading-relaxed text-secondary">{faq.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* CTA */}
      <section className="section-nx">
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
                Let&apos;s Build Something <span className="text-accent-2">Incredible</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-white/70">
                From concept to completion, NexusMedia handles every detail. Contact us today for a free consultation and quote.
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
