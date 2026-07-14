import { Link } from 'react-router-dom'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ROUTES } from '@/constants/routes'
import { SITE } from '@/constants/data'

export default function PrivacyPage() {
  return (
    <div className="container-nx py-32 max-w-3xl">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="mt-4 text-display-lg font-display font-bold text-primary">Privacy Policy</h1>
      <p className="mt-2 text-sm text-secondary">Last updated: January 2024</p>
      <div className="mt-10 space-y-8 text-secondary leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold text-primary">Information We Collect</h2>
          <p className="mt-3">We collect information you provide directly to us, such as when you request a quote, fill out a contact form, or communicate with us via phone, email, or WhatsApp. This includes your name, phone number, email address, and project requirements.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-primary">How We Use Your Information</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>Process quote requests and project orders</li>
            <li>Send confirmation and status updates for your orders</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Send promotional communications (with your consent)</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-primary">Information Sharing</h2>
          <p className="mt-3">NexusMedia does not sell, trade, or transfer your personal information to outside parties except to trusted third parties who assist us in operating our business, so long as those parties agree to keep this information confidential.</p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-primary">Contact Us</h2>
          <p className="mt-3">
            If you have questions about this Privacy Policy, please contact us at{' '}
            <a href={`mailto:${SITE.emailAlt}`} className="text-accent hover:underline">{SITE.emailAlt}</a>{' '}
            or call <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="text-accent hover:underline">{SITE.phone}</a>.
          </p>
        </section>
      </div>
      <Link to={ROUTES.home} className="mt-12 inline-flex text-sm font-medium text-accent hover:underline">
        ← Back to Home
      </Link>
    </div>
  )
}
