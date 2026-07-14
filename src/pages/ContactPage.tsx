import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { SITE } from '@/constants/data'

const CONTACT_CARDS = [
  { icon: MapPin, label: 'Address', value: SITE.address },
  { icon: Phone, label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}`, sub: SITE.phoneAlt },
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, sub: SITE.emailAlt },
  { icon: Clock, label: 'Working Hours', value: SITE.hours, sub: SITE.hoursNote },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="relative min-h-[40vh] pt-[72px]">
        <div className="container-nx py-16 md:py-20">
          <SectionLabel>Let&apos;s Talk</SectionLabel>
          <h1 className="mt-6 max-w-3xl text-display-xl font-display font-bold text-primary">
            Get in <span className="text-accent">Touch</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-secondary">
            Walk into our studio, call us, or drop a message. We&apos;re here Monday to Saturday and always ready to help you create something outstanding.
          </p>
        </div>
      </section>

      <section className="section-nx pt-0">
        <div className="container-nx">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left - Contact info + map */}
            <div className="space-y-6">
              {CONTACT_CARDS.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <card.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-secondary">{card.label}</p>
                    {card.href ? (
                      <a href={card.href} className="mt-1 block font-medium text-primary hover:text-accent transition-colors">
                        {card.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium text-primary">{card.value}</p>
                    )}
                    {card.sub && (
                      card.href ? (
                        <a href={card.href.includes('tel') ? `tel:${card.sub.replace(/-/g, '')}` : `mailto:${card.sub}`} className="text-sm text-secondary hover:text-accent">
                          {card.sub}
                        </a>
                      ) : (
                        <p className="text-sm text-secondary">{card.sub}</p>
                      )
                    )}
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl border border-border"
              >
                <iframe
                  src={SITE.mapEmbed}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="NexusMedia Office Location"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="NexusMedia office"
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
              </motion.div>
            </div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-border bg-card p-8 md:p-10"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-3xl"
                  >
                    ✓
                  </motion.div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-primary">Message Sent!</h3>
                  <p className="mt-2 text-secondary">We&apos;ll get back to you within 4 business hours.</p>
                </div>
              ) : (
                <>
                  <SectionLabel>Send Message</SectionLabel>
                  <h2 className="mt-4 font-display text-2xl font-bold text-primary">
                    We&apos;d Love to <span className="text-accent">Hear From You</span>
                  </h2>
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input label="Your Name" placeholder="Rahul Kulkarni" required />
                      <Input label="Phone Number" type="tel" placeholder="+91 98765 43210" />
                    </div>
                    <Input label="Email Address" type="email" placeholder="rahul@company.com" required />
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary">Subject</label>
                      <select className="flex h-12 w-full rounded-xl border border-border bg-card px-4 text-sm text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                        <option value="">Select a topic…</option>
                        <option>Digital Printing</option>
                        <option>Sign Board</option>
                        <option>Corporate Branding</option>
                        <option>Vehicle Branding</option>
                        <option>General Inquiry</option>
                      </select>
                    </div>
                    <Textarea label="Your Message" placeholder="Tell us about your project…" required />
                    <Button type="submit" variant="accent" size="lg" className="w-full">
                      Send Message <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
