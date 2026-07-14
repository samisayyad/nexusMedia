import React from 'react'
import { motion } from 'framer-motion'
import { TESTIMONIALS_MARQUEE } from '@/constants/data'

interface Testimonial {
  text: string
  image: string
  name: string
  role: string
}

function TestimonialsColumn({
  className,
  testimonials,
  duration = 15,
}: {
  className?: string
  testimonials: Testimonial[]
  duration?: number
}) {
  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="m-0 flex list-none flex-col gap-6 bg-transparent p-0 pb-6"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <motion.li
                key={`${index}-${i}`}
                aria-hidden={index === 1}
                tabIndex={index === 1 ? -1 : 0}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.8)',
                  transition: { type: 'spring', stiffness: 400, damping: 17 },
                }}
                className="group w-full max-w-xs cursor-default select-none rounded-3xl border border-border bg-card p-8 shadow-lg shadow-primary/5"
              >
                <blockquote className="m-0 p-0">
                  <p className="m-0 font-normal leading-relaxed text-secondary">{text}</p>
                  <footer className="mt-6 flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={`Avatar of ${name}`}
                      loading="lazy"
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-border transition-all group-hover:ring-accent/30"
                    />
                    <div className="flex flex-col">
                      <cite className="font-semibold not-italic leading-5 tracking-tight text-primary">{name}</cite>
                      <span className="mt-0.5 text-sm leading-5 text-muted-foreground">{role}</span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  )
}

export function TestimonialsMarquee() {
  const first = TESTIMONIALS_MARQUEE.slice(0, 3)
  const second = TESTIMONIALS_MARQUEE.slice(3, 6)
  const third = TESTIMONIALS_MARQUEE.slice(6, 9)

  return (
    <section aria-labelledby="testimonials-heading" className="section-nx relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="container-nx z-10"
      >
        <div className="mx-auto mb-16 flex max-w-[540px] flex-col items-center justify-center">
          <div className="rounded-full border border-border bg-muted/50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Testimonials
          </div>
          <h2 id="testimonials-heading" className="mt-6 text-center font-display text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
            What Clients Say
          </h2>
          <p className="mt-5 max-w-sm text-center text-lg leading-relaxed text-muted-foreground">
            Real reviews from businesses across Belgaum and North Karnataka who trust NexusMedia.
          </p>
        </div>

        <div
          className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={first} duration={15} />
          <TestimonialsColumn testimonials={second} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={third} className="hidden lg:block" duration={17} />
        </div>
      </motion.div>
    </section>
  )
}
