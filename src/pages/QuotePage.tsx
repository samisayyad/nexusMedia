import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { QUOTE_BENEFITS, SERVICE_OPTIONS, SITE } from '@/constants/data'

const STEPS = ['Contact Info', 'Project Details', 'Review & Submit']

export default function QuotePage() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const next = () => setStep((s) => Math.min(s + 1, 2))
  const prev = () => setStep((s) => Math.max(s - 1, 0))
  const submit = () => setSubmitted(true)

  return (
    <>
      <section className="relative min-h-[40vh] pt-[72px]">
        <div className="container-nx py-16 md:py-20">
          <SectionLabel>Free Estimate</SectionLabel>
          <h1 className="mt-6 max-w-4xl text-display-xl font-display font-bold text-primary">
            Get Your <span className="text-accent">Free Quote</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-secondary">
            Fill in the details below and our team will respond with a tailored estimate within 4 working hours.
          </p>
        </div>
      </section>

      <section className="section-nx pt-0">
        <div className="container-nx">
          {/* Progress */}
          <div className="mb-12 max-w-2xl">
            <div className="flex items-center justify-between">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    i <= step ? 'bg-accent text-white' : 'bg-muted text-secondary'
                  }`}>
                    {i < step ? <Check className="h-5 w-5" /> : i + 1}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`mx-2 h-0.5 w-12 sm:w-24 md:w-32 ${i < step ? 'bg-accent' : 'bg-border'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between text-xs text-secondary">
              {STEPS.map((s) => <span key={s}>{s}</span>)}
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <SectionLabel>Why Choose Us</SectionLabel>
              <h2 className="mt-4 font-display text-2xl font-bold text-primary">
                Quick. <span className="text-accent">Precise. Affordable.</span>
              </h2>
              <ul className="mt-6 space-y-3">
                {QUOTE_BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-6">
                <p className="text-xs uppercase tracking-wider text-accent">Direct Contact</p>
                <p className="mt-2 text-sm font-medium text-primary">Prefer to call?</p>
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="mt-1 block font-display text-xl font-bold text-accent">
                  {SITE.phone}
                </a>
                <p className="mt-1 text-xs text-secondary">{SITE.hours}</p>
              </div>
            </div>

            <div className="lg:col-span-3 rounded-3xl border border-border bg-card p-8 md:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-4xl text-white"
                    >
                      ✓
                    </motion.div>
                    <h3 className="mt-6 font-display text-2xl font-bold text-primary">Quote Request Submitted!</h3>
                    <p className="mt-2 text-secondary">We&apos;ll respond within 4 business hours with your tailored estimate.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {step === 0 && (
                      <div className="space-y-5">
                        <h3 className="font-display text-xl font-bold text-primary">Your Contact Information</h3>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Input label="Full Name" placeholder="Your name" required />
                          <Input label="Phone" type="tel" placeholder="+91 _____ _____" required />
                        </div>
                        <Input label="Email" type="email" placeholder="you@company.com" />
                      </div>
                    )}
                    {step === 1 && (
                      <div className="space-y-5">
                        <h3 className="font-display text-xl font-bold text-primary">Project Details</h3>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-primary">Service Required</label>
                          <select className="flex h-12 w-full rounded-xl border border-border bg-card px-4 text-sm">
                            <option value="">Select service…</option>
                            {SERVICE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                          </select>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Input label="Quantity" placeholder="e.g. 500 pieces" />
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-primary">Budget Range</label>
                            <select className="flex h-12 w-full rounded-xl border border-border bg-card px-4 text-sm">
                              <option value="">Select budget…</option>
                              <option>Under ₹5,000</option>
                              <option>₹5,000 – ₹15,000</option>
                              <option>₹15,000 – ₹50,000</option>
                              <option>₹50,000 – ₹1,00,000</option>
                              <option>₹1,00,000+</option>
                            </select>
                          </div>
                        </div>
                        <Textarea label="Project Notes" placeholder="Size, color preferences, material, finish…" />
                      </div>
                    )}
                    {step === 2 && (
                      <div className="space-y-5">
                        <h3 className="font-display text-xl font-bold text-primary">Review & Submit</h3>
                        <p className="text-secondary">
                          Please review your information and submit your quote request. Our team will respond within 4 business hours.
                        </p>
                        <div className="rounded-xl bg-muted p-6 space-y-2 text-sm">
                          <p><span className="text-secondary">Response time:</span> <span className="font-medium">Within 4 hours</span></p>
                          <p><span className="text-secondary">Consultation:</span> <span className="font-medium">Free design consultation included</span></p>
                          <p><span className="text-secondary">Pricing:</span> <span className="font-medium">Transparent, no hidden charges</span></p>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex justify-between">
                      {step > 0 ? (
                        <Button variant="outline" onClick={prev}>
                          <ArrowLeft className="h-4 w-4" /> Back
                        </Button>
                      ) : <div />}
                      {step < 2 ? (
                        <Button variant="accent" onClick={next}>
                          Continue <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="accent" onClick={submit}>
                          Submit Quote Request <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
