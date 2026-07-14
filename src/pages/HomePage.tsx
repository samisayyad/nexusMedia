import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { HeroBentoCard } from '@/components/home/ServiceBentoCard'
import { ServiceBentoCarousel } from '@/components/home/ServiceBentoCarousel'
import { HowWeWorkSection } from '@/components/home/HowWeWorkSection'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { TestimonialsMarquee } from '@/components/home/TestimonialsMarquee'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Marquee } from '@/components/ui/Marquee'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { CLIENTS, PROJECTS, FAQS, TECHNOLOGIES } from '@/constants/data'
import { ROUTES } from '@/constants/routes'
import { staggerContainer, fadeUp } from '@/animations/variants'
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
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden pt-14">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container-nx grid min-h-[calc(100vh-56px)] items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-secondary"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              Belgaum&apos;s Premier Printing & Branding Studio
            </motion.div>

            <h1 className="text-display-hero font-display font-bold text-primary">
              <SplitText text="Printing" />
              <br />
              <span className="text-accent">
                <SplitText text="that Moves" />
              </span>
              <br />
              <SplitText text="Brands" />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 max-w-lg text-lg leading-relaxed text-secondary"
            >
              From a business card to a building-sized sign board — NexusMedia delivers precision printing, bold branding, and powerful signage that makes your business unforgettable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <MagneticButton
                to={ROUTES.quote}
                className="inline-flex h-13 items-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-white"
              >
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <Button asChild variant="outline" size="lg">
                <Link to={ROUTES.portfolio}>View Portfolio</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <span className="text-xs uppercase tracking-widest text-secondary">Trusted by</span>
              <div className="flex flex-wrap gap-4">
                {CLIENTS.slice(0, 4).map((c) => (
                  <span key={c} className="text-sm font-medium text-primary/60">{c}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative flex justify-center lg:justify-end"
          >
            <HeroBentoCard />
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-secondary"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </section>

      <Marquee items={CLIENTS} />

      <ServiceBentoCarousel />

      <HowWeWorkSection />

      {/* FEATURED PORTFOLIO */}
      <section className="section-nx">
        <div className="container-nx">
          <SectionLabel>Featured Work</SectionLabel>
          <h2 className="mt-4 text-display-lg font-display font-bold text-primary">
            Where Creativity Meets <span className="text-accent-2">Technology</span>
          </h2>
          <p className="mt-4 max-w-lg text-secondary">
            Real projects. Real impact. A glimpse into what we build for our clients across Belgaum and beyond.
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {PROJECTS.map((project) => (
              <motion.div key={project.id} variants={fadeUp}>
                <Link
                  to={`/portfolio/${project.id}`}
                  className="group block overflow-hidden rounded-3xl border border-border bg-card"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="text-xs uppercase tracking-wider text-white/70">{project.category}</span>
                      <h3 className="mt-1 font-display text-xl font-bold text-white">{project.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section-nx bg-muted/50">
        <div className="container-nx grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionLabel>About Nexus</SectionLabel>
            <h2 className="mt-4 text-display-lg font-display font-bold text-primary">
              Small Agency. <span className="text-accent">Big Impact.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-secondary">
              Nexus Media is a professional design and advertising agency that offers clients design solutions tailored to their unique needs. We specialize in turning ideas into powerful brands.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-8">
              <Link to={ROUTES.about}>Learn Our Story</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl"
          >
            <img
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80"
              alt="NexusMedia studio"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <Marquee items={TECHNOLOGIES} reverse />

      <WhyChooseUs />

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
                <Button asChild variant="accent" size="xl">
                  <Link to={ROUTES.quote}>Get Free Quote</Link>
                </Button>
                <Button asChild variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10">
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
