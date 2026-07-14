import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '@/utils/cn'
import { NAV_LINKS, ROUTES } from '@/constants/routes'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm shadow-primary/5'
            : 'bg-transparent'
        )}
      >
        <nav className="container-nx flex h-[72px] items-center justify-between">
          <Link to={ROUTES.home} className="group flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-tight text-primary md:text-2xl">
              Nexus<span className="text-accent">Media</span>
            </span>
            <span className="mt-0.5 text-[9px] uppercase tracking-[0.25em] text-secondary">
              Belgaum
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium text-secondary transition-colors hover:text-primary rounded-lg',
                    location.pathname === link.path && 'text-primary'
                  )}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-accent"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <MagneticButton
              to={ROUTES.quote}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Get Quote
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden"
            style={{ paddingTop: 72 }}
          >
            <nav className="flex flex-col items-center justify-center gap-6 p-8 min-h-[calc(100vh-72px)]">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="font-display text-3xl font-bold text-primary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Button asChild variant="accent" size="lg">
                  <Link to={ROUTES.quote}>Get Free Quote</Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
