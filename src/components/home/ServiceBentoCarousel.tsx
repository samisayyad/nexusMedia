import { HOME_SERVICES } from '@/constants/data'
import { ServiceBentoCard, createServiceBentoProps } from './ServiceBentoCard'

export function ServiceBentoCarousel() {
  const cards = HOME_SERVICES.map((s) => createServiceBentoProps(s.id, s.title, s.desc))
  const doubled = [...cards, ...cards]

  return (
    <section className="section-nx overflow-hidden">
      <div className="container-nx mb-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">What We Do</p>
        <h2 className="mt-4 text-display-lg font-display font-bold text-primary">
          Services That <span className="text-accent">Move Business</span>
        </h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max gap-8 animate-marquee-slow hover:[animation-play-state:paused] px-8">
          {doubled.map((card, i) => (
            <ServiceBentoCard key={`${card.title}-${i}`} id={`carousel-${i}`} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
