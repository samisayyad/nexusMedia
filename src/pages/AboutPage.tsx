import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Target, Eye, Zap } from 'lucide-react'
import { AnimatedMarqueeHero } from '@/components/about/AnimatedMarqueeHero'
import { AboutFeatureSection } from '@/components/about/AboutFeatureSection'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { COMPANY_TIMELINE, ABOUT_HERO_IMAGES, SITE } from '@/constants/data'
import { ROUTES } from '@/constants/routes'

const VALUES = [
  { title: 'Mission', icon: Target, text: 'To deliver world-class printing, branding, and advertising solutions that help businesses in Belgaum and beyond stand out, grow, and succeed.' },
  { title: 'Vision', icon: Eye, text: "To become Karnataka's most trusted end-to-end branding and printing partner, known for quality, innovation, and powerful brand statements." },
  { title: 'Values', icon: Zap, text: 'Precision in every print. Creativity in every concept. Integrity in every client relationship. Speed without compromise.' },
]

export default function AboutPage() {
  return (
    <>
      <AnimatedMarqueeHero
        tagline="Our Story · Est. 2009"
        title={
          <>
            The Studio Behind{' '}
            <span className="text-accent">Belgaum&apos;s Brands</span>
          </>
        }
        description="NexusMedia is a professional design and advertising agency based in Belgaum, Karnataka. We turn ideas into powerful brands and create advertising campaigns that deliver real business results."
        ctaText="Get in Touch"
        ctaHref={ROUTES.contact}
        images={ABOUT_HERO_IMAGES}
      />

      <section className="section-nx">
        <div className="container-nx">
          <div className="grid gap-16 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="sticky top-32">
                <img
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80"
                  alt="NexusMedia printing studio"
                  loading="lazy"
                  className="aspect-[3/4] w-full rounded-3xl object-cover"
                />
              </div>
            </motion.div>
            <div className="space-y-16 lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <SectionLabel>Who We Are</SectionLabel>
                <h2 className="mt-4 text-display-lg font-display font-bold text-primary">
                  Small Agency. <span className="text-accent">Big Impact.</span>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-secondary">
                  Nexus Media is a small, professional design and advertising agency that offers clients design solutions and packages tailored to their unique needs. We specialize in turning ideas into powerful brands and creating effective advertising campaigns from the most basic of briefs.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-secondary">
                  We offer a comprehensive service where strategy and research are always part of any solution. This has enabled us to serve clients across Corporate Branding & Design, Outdoor Marketing, and Printing Solutions.
                </p>
                <div className="mt-8 flex gap-4">
                  <Button asChild variant="accent" size="lg">
                    <Link to={ROUTES.contact}>Get in Touch</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to={ROUTES.quote}>Request Quote</Link>
                  </Button>
                </div>
              </motion.div>

              <blockquote className="border-l-4 border-accent pl-6">
                <p className="font-display text-2xl font-medium leading-snug text-primary md:text-3xl">
                  &ldquo;Design helps us stand out. It tells a story about us and what we stand for.&rdquo;
                </p>
                <footer className="mt-4 text-secondary">— NexusMedia, {SITE.address}</footer>
              </blockquote>

              <div className="grid gap-6 md:grid-cols-3">
                {VALUES.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl border border-border bg-card p-6"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <item.icon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-primary">{item.title}</h3>
                    <p className="mt-2 text-sm text-secondary">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutFeatureSection />

      <section className="section-nx bg-muted/30">
        <div className="container-nx max-w-4xl">
          <SectionLabel>Journey</SectionLabel>
          <h2 className="mt-4 text-display-lg font-display font-bold text-primary">
            Our <span className="text-accent">Timeline</span>
          </h2>
          <div className="mt-16">
            {COMPANY_TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex gap-8 pb-16 last:pb-0"
              >
                <div className="w-20 shrink-0">
                  <span className="font-display text-2xl font-bold text-accent">{item.year}</span>
                </div>
                <div className="flex-1 border-l border-border pl-8 pb-2">
                  <h3 className="font-display text-xl font-bold text-primary">{item.title}</h3>
                  <p className="mt-2 text-secondary">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
