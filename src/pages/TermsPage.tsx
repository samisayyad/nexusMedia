import { Link } from 'react-router-dom'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ROUTES } from '@/constants/routes'
import { SITE } from '@/constants/data'

export default function TermsPage() {
  return (
    <div className="container-nx py-32 max-w-3xl">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="mt-4 text-display-lg font-display font-bold text-primary">Terms & Conditions</h1>
      <p className="mt-2 text-sm text-secondary">Last updated: January 2024</p>
      <div className="mt-10 space-y-8 text-secondary leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold text-primary">Acceptance of Terms</h2>
          <p className="mt-3">By using NexusMedia&apos;s services, you agree to these Terms and Conditions. If you do not agree, please do not use our services.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-primary">Payment Terms</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>50% advance payment required before production begins</li>
            <li>Balance due upon delivery or before dispatch</li>
            <li>Prices are subject to change without prior notice</li>
            <li>Rush orders may attract additional charges</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-primary">Artwork & Copyright</h2>
          <p className="mt-3">Customers are responsible for ensuring they have rights to all artwork submitted. NexusMedia is not liable for copyright infringement arising from customer-supplied artwork.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-primary">Contact</h2>
          <p className="mt-3">
            For any questions about these terms, email{' '}
            <a href={`mailto:${SITE.emailAlt}`} className="text-accent hover:underline">{SITE.emailAlt}</a>{' '}
            or visit our office at {SITE.address}.
          </p>
        </section>
      </div>
      <Link to={ROUTES.home} className="mt-12 inline-flex text-sm font-medium text-accent hover:underline">
        ← Back to Home
      </Link>
    </div>
  )
}
