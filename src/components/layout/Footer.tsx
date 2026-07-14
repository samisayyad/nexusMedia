import { Link } from 'react-router-dom'
import { Facebook, Instagram, Phone } from 'lucide-react'
import { SITE } from '@/constants/data'
import { ROUTES } from '@/constants/routes'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-nx py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to={ROUTES.home} className="font-display text-2xl font-bold">
              <span className="text-primary">nexus</span><span className="text-accent">Media</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-secondary">
              Professional design and advertising agency based in Belgaum, Karnataka. We turn ideas into powerful brands.
            </p>
            <p className="mt-3 text-xs uppercase tracking-widest text-secondary/70">
              {SITE.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-secondary transition-colors hover:border-accent hover:text-accent"
                aria-label="Facebook"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-secondary transition-colors hover:border-accent hover:text-accent"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-secondary transition-colors hover:border-accent hover:text-accent"
                aria-label="Phone"
              >
                <Phone className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Pages</h5>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', path: ROUTES.home },
                { label: 'About Us', path: ROUTES.about },
                { label: 'Services', path: ROUTES.services },
                { label: 'Portfolio', path: ROUTES.portfolio },
                { label: 'Gallery', path: ROUTES.gallery },
                { label: 'Contact', path: ROUTES.contact },
                { label: 'Get Quote', path: ROUTES.quote },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-secondary transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Services</h5>
            <ul className="space-y-2.5">
              {['Digital Printing', 'Flex / Vinyl Printing', 'Sign Boards', 'Vehicle Branding', 'Corporate Branding', 'Exhibition Branding', 'T-Shirt Printing'].map(
                (s) => (
                  <li key={s}>
                    <Link to={ROUTES.services} className="text-sm text-secondary transition-colors hover:text-accent">
                      {s}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h5 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Newsletter</h5>
            <p className="mb-4 text-sm text-secondary">
              Get updates on new services, offers, and printing tips.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="your@email.com" aria-label="Newsletter email" className="h-10" />
              <Button variant="accent" size="sm" className="shrink-0">→</Button>
            </div>
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-xs uppercase tracking-wider text-secondary/70">Contact</p>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="mt-2 block text-sm font-semibold text-primary">
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="mt-1 block text-sm text-secondary">
                {SITE.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-secondary">
            © {new Date().getFullYear()} <span className="font-medium text-accent">NexusMedia Belgaum</span>. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to={ROUTES.privacy} className="text-sm text-secondary hover:text-accent">Privacy Policy</Link>
            <Link to={ROUTES.terms} className="text-sm text-secondary hover:text-accent">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
