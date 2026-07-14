import { Link } from 'react-router-dom'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { SectionWithMockup } from '@/components/services/SectionWithMockup'
import { SERVICES } from '@/constants/data'
import { ROUTES } from '@/constants/routes'

export default function ServicesPage() {
  return (
    <>
      <section className="relative min-h-[50vh] pt-14">
        <div className="container-nx py-20 md:py-28">
          <SectionLabel>What We Offer</SectionLabel>
          <h1 className="mt-6 max-w-4xl text-display-xl font-display font-bold text-primary">
            30+ Services. <span className="text-accent">One Studio.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-secondary">
            From your first business card to a complete outdoor branding campaign, NexusMedia is the only partner you&apos;ll ever need for printing, signage, and branding in Belgaum.
          </p>
        </div>
      </section>

      {SERVICES.map((service, i) => (
        <SectionWithMockup
          key={service.id}
          title={service.title}
          description={service.desc}
          primaryImageSrc={service.image}
          secondaryImageSrc={service.image}
          reverseLayout={i % 2 !== 0}
        />
      ))}

      <section className="section-nx">
        <div className="container-nx">
          <div className="rounded-[2rem] bg-primary px-8 py-16 text-center md:px-16">
            <h2 className="text-display-lg font-display font-bold text-white">
              Need a Custom <span className="text-accent-2">Solution?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/70">
              Tell us about your project and we&apos;ll design a service package that fits your goals and budget perfectly.
            </p>
            <Button asChild variant="accent" size="xl" className="mt-8">
              <Link to={ROUTES.quote}>Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
