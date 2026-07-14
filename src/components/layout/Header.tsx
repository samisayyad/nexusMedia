import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { createPortal } from 'react-dom'
import type { LucideIcon } from 'lucide-react'
import {
  Printer,
  Layers,
  Signpost,
  Car,
  Building2,
  Tent,
  Users,
  Star,
  Image,
  Mail,
  FileText,
  Shield,
  HelpCircle,
  Phone,
  Palette,
  Package,
  Monitor,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { ROUTES, serviceUrl } from '@/constants/routes'

type LinkItem = {
  title: string
  href: string
  icon: LucideIcon
  description?: string
}

const serviceLinks: LinkItem[] = [
  { title: 'Digital Printing', href: serviceUrl('digital-printing'), description: 'Business cards, brochures, flyers & more', icon: Printer },
  { title: 'Large Format', href: serviceUrl('large-format'), description: 'Banners, hoardings & building wraps', icon: Layers },
  { title: 'ACP Sign Boards', href: serviceUrl('acp-signboards'), description: 'Aluminium composite panel signage', icon: Signpost },
  { title: 'LED Sign Boards', href: serviceUrl('led-signboards'), description: 'Glowing, energy-efficient signage', icon: Monitor },
  { title: 'Vehicle Branding', href: serviceUrl('vehicle-branding'), description: 'Car wraps, fleet graphics & auto branding', icon: Car },
  { title: 'Corporate Branding', href: serviceUrl('corporate-branding'), description: 'Complete identity & office branding', icon: Building2 },
  { title: 'Indoor Branding', href: serviceUrl('indoor-branding'), description: 'Wall graphics, office & retail interiors', icon: Palette },
  { title: 'Exhibition Branding', href: serviceUrl('exhibition-branding'), description: 'Trade show booths & event displays', icon: Tent },
  { title: 'Corporate Gifts', href: serviceUrl('corporate-gifts'), description: 'Branded merchandise & giveaways', icon: Package },
  { title: 'T-Shirt Printing', href: serviceUrl('tshirt-printing'), description: 'Custom tees for teams & events', icon: Printer },
  { title: 'Offset Printing', href: serviceUrl('offset-printing'), description: 'Catalogues, magazines & books', icon: FileText },
  { title: 'Fabrication', href: serviceUrl('fabrication'), description: 'In-house fabrication & installation', icon: Layers },
]

const companyLinks: LinkItem[] = [
  { title: 'About Us', href: ROUTES.about, description: 'Our story, mission & team in Belgaum', icon: Users },
  { title: 'Portfolio', href: ROUTES.portfolio, description: 'Featured print & branding projects', icon: Star },
  { title: 'Gallery', href: ROUTES.gallery, description: 'Visual showcase of our best work', icon: Image },
]

const companyLinks2: LinkItem[] = [
  { title: 'Contact Us', href: ROUTES.contact, icon: Mail },
  { title: 'Privacy Policy', href: ROUTES.privacy, icon: Shield },
  { title: 'Terms & Conditions', href: ROUTES.terms, icon: FileText },
  { title: 'FAQ & Support', href: ROUTES.contact, icon: HelpCircle },
]

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false)

  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold)
  }, [threshold])

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  React.useEffect(() => {
    onScroll()
  }, [onScroll])

  return scrolled
}

function Wordmark() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Link to={ROUTES.home} onClick={handleClick} className="flex flex-col leading-none hover:opacity-80 transition-opacity">
      <span className="font-display text-lg font-bold tracking-tight">
        <span className="text-primary">nexus</span><span className="text-accent">Media</span>
      </span>
      <span className="mt-0.5 text-[8px] uppercase tracking-[0.25em] text-muted-foreground">Belgaum · Print · Branding</span>
    </Link>
  )
}

function ListItem({ title, description, icon: Icon, className, href, ...props }: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
  return (
    <NavigationMenuLink
      className={cn(
        'flex w-full flex-row gap-x-3 rounded-lg p-2 hover:bg-muted hover:text-primary focus:bg-muted',
        className
      )}
      {...props}
      asChild
    >
      <Link to={href}>
        <div className="flex aspect-square size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background shadow-sm">
          <Icon className="size-5 text-primary" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="text-sm font-medium text-primary">{title}</span>
          {description && <span className="text-xs text-muted-foreground">{description}</span>}
        </div>
      </Link>
    </NavigationMenuLink>
  )
}

function MobileListItem({ title, description, icon: Icon, className, href, onClick }: LinkItem & { className?: string, onClick?: () => void }) {
  return (
    <Link 
      to={href} 
      onClick={onClick}
      className={cn(
        'flex w-full flex-row gap-x-3 rounded-lg p-2 hover:bg-muted hover:text-primary focus:bg-muted',
        className
      )}
    >
      <div className="flex aspect-square size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background shadow-sm">
        <Icon className="size-5 text-primary" />
      </div>
      <div className="flex flex-col items-start justify-center">
        <span className="text-sm font-medium text-primary">{title}</span>
        {description && <span className="text-xs text-muted-foreground">{description}</span>}
      </div>
    </Link>
  )
}

type MobileMenuProps = React.ComponentProps<'div'> & { open: boolean; headerHeight: number }

function MobileMenu({ open, children, className, headerHeight, ...props }: MobileMenuProps) {
  if (!open || typeof window === 'undefined') return null

  return createPortal(
    <div
      id="mobile-menu"
      className="fixed right-0 bottom-0 left-0 z-[80] flex flex-col overflow-hidden border-y border-border bg-background/98 backdrop-blur-xl lg:hidden"
      style={{ top: headerHeight }}
    >
      <div data-slot={open ? 'open' : 'closed'} className={cn('size-full overflow-y-auto p-4', className)} {...props}>
        {children}
      </div>
    </div>,
    document.body
  )
}

export function Header() {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(10)
  const location = useLocation()
  const headerRef = React.useRef<HTMLElement>(null)
  const [headerHeight, setHeaderHeight] = React.useState(56)

  // Measure actual header height for portal positioning
  React.useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      ref={headerRef}
      className={cn('sticky top-0 z-[70] w-full border-b border-transparent transition-all duration-300', {
        'border-border/50 bg-background/50 backdrop-blur-xl shadow-sm': scrolled,
        'bg-background': !scrolled,
      })}
    >
      <nav className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <div className="flex items-center gap-5">
          <Wordmark />
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Services</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1.5">
                  <div className="w-[640px] rounded-lg border border-border bg-popover p-3 shadow-lg">
                    <ul className="grid grid-cols-3 gap-1.5">
                      {serviceLinks.map((item) => (
                        <li key={item.title}>
                          <ListItem {...item} />
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 border-t border-border pt-3">
                      <p className="text-sm text-muted-foreground">
                        Need a custom solution?{' '}
                        <Link to={ROUTES.quote} className="font-medium text-accent hover:underline">
                          Get a free quote
                        </Link>
                      </p>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Company</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1.5">
                  <div className="grid w-[440px] grid-cols-2 gap-2">
                    <ul className="space-y-1 rounded-lg border border-border bg-popover p-2 shadow-lg">
                      {companyLinks.map((item) => (
                        <li key={item.title}>
                          <ListItem {...item} />
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-1 p-2">
                      {companyLinks2.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="flex flex-row items-center gap-x-2 rounded-lg p-2 hover:bg-muted"
                            >
                              <item.icon className="size-4 text-primary" />
                              <span className="text-sm font-medium">{item.title}</span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to={ROUTES.quote} className="rounded-md px-4 py-2 text-sm font-medium text-secondary hover:bg-muted hover:text-primary">
                    Get Quote
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outline" size="sm" asChild>
            <a href="tel:9535289007">
              <Phone className="size-3.5" />
              Call Us
            </a>
          </Button>
          <Button size="sm" asChild>
            <Link to={ROUTES.quote}>Get Started</Link>
          </Button>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="lg:hidden size-9 p-0"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>

      <MobileMenu open={open} headerHeight={headerHeight} className="flex flex-col justify-between gap-4">
        <div className="flex w-full flex-col gap-y-1">
          <span className="px-2 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Services</span>
          <div className="grid grid-cols-2 gap-1">
            {serviceLinks.map((link) => (
              <MobileListItem key={link.title} {...link} onClick={() => setOpen(false)} />
            ))}
          </div>
          <span className="mt-4 px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</span>
          {companyLinks.map((link) => (
            <MobileListItem key={link.title} {...link} onClick={() => setOpen(false)} />
          ))}
          {companyLinks2.map((link) => (
            <MobileListItem key={link.title} {...link} onClick={() => setOpen(false)} />
          ))}
        </div>
        <div className="flex flex-col gap-2 pb-6 pt-2 border-t border-border">
          <Button variant="outline" className="w-full" asChild>
            <a href="tel:9535289007"><Phone className="size-4" />Call Us</a>
          </Button>
          <Button className="w-full" asChild>
            <Link to={ROUTES.quote} onClick={() => setOpen(false)}>Get Started</Link>
          </Button>
        </div>
      </MobileMenu>
    </header>
  )
}
