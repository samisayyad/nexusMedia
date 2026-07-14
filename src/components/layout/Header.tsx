import React from 'react'
import { Link } from 'react-router-dom'
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
import { ROUTES } from '@/constants/routes'

type LinkItem = {
  title: string
  href: string
  icon: LucideIcon
  description?: string
}

const serviceLinks: LinkItem[] = [
  { title: 'Digital Printing', href: ROUTES.services, description: 'Business cards, brochures, flyers & more', icon: Printer },
  { title: 'Large Format Printing', href: ROUTES.services, description: 'Banners, hoardings & building wraps', icon: Layers },
  { title: 'Sign Boards', href: ROUTES.services, description: 'ACP, LED & acrylic signage', icon: Signpost },
  { title: 'Vehicle Branding', href: ROUTES.services, description: 'Car wraps, fleet graphics & auto branding', icon: Car },
  { title: 'Corporate Branding', href: ROUTES.services, description: 'Complete identity & office branding', icon: Building2 },
  { title: 'Exhibition Branding', href: ROUTES.services, description: 'Trade show booths & event displays', icon: Tent },
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
  return (
    <Link to={ROUTES.home} className="flex flex-col leading-none hover:opacity-80 transition-opacity">
      <span className="font-display text-lg font-bold tracking-tight text-primary">
        Nexus<span className="text-accent">Media</span>
      </span>
      <span className="mt-0.5 text-[8px] uppercase tracking-[0.25em] text-muted-foreground">Belgaum</span>
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

type MobileMenuProps = React.ComponentProps<'div'> & { open: boolean }

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === 'undefined') return null

  return createPortal(
    <div
      id="mobile-menu"
      className="fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y border-border bg-background/95 backdrop-blur-lg md:hidden"
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

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={cn('sticky top-0 z-50 w-full border-b border-transparent', {
        'border-border bg-background/95 backdrop-blur-lg shadow-sm': scrolled,
      })}
    >
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-5">
          <Wordmark />
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Services</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1.5">
                  <ul className="grid w-lg grid-cols-2 gap-2 rounded-lg border border-border bg-popover p-2 shadow-lg">
                    {serviceLinks.map((item) => (
                      <li key={item.title}>
                        <ListItem {...item} />
                      </li>
                    ))}
                  </ul>
                  <div className="p-2">
                    <p className="text-sm text-muted-foreground">
                      Need a custom solution?{' '}
                      <Link to={ROUTES.quote} className="font-medium text-accent hover:underline">
                        Get a free quote
                      </Link>
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Company</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1.5">
                  <div className="grid w-lg grid-cols-2 gap-2">
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

        <div className="hidden items-center gap-2 md:flex">
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
          className="md:hidden size-9 p-0"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>

      <MobileMenu open={open} className="flex flex-col justify-between gap-4">
        <div className="flex w-full flex-col gap-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Services</span>
          {serviceLinks.map((link) => (
            <ListItem key={link.title} {...link} onClick={() => setOpen(false)} />
          ))}
          <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</span>
          {companyLinks.map((link) => (
            <ListItem key={link.title} {...link} onClick={() => setOpen(false)} />
          ))}
          {companyLinks2.map((link) => (
            <ListItem key={link.title} {...link} onClick={() => setOpen(false)} />
          ))}
        </div>
        <div className="flex flex-col gap-2 pb-4">
          <Button variant="outline" className="w-full" asChild>
            <a href="tel:9535289007">Call Us</a>
          </Button>
          <Button className="w-full" asChild>
            <Link to={ROUTES.quote} onClick={() => setOpen(false)}>Get Started</Link>
          </Button>
        </div>
      </MobileMenu>
    </header>
  )
}
