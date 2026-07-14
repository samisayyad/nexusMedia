export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  portfolio: '/portfolio',
  project: '/portfolio/:id',
  gallery: '/gallery',
  industries: '/industries',
  contact: '/contact',
  quote: '/quote',
  privacy: '/privacy',
  terms: '/terms',
} as const

export const NAV_LINKS = [
  { label: 'Home', path: ROUTES.home },
  { label: 'About', path: ROUTES.about },
  { label: 'Services', path: ROUTES.services },
  { label: 'Portfolio', path: ROUTES.portfolio },
  { label: 'Gallery', path: ROUTES.gallery },
  { label: 'Contact', path: ROUTES.contact },
]
