import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface CarouselItem {
  id: string
  title: string
  summary: string
  url: string
  image: string
  category: string
}

interface GalleryHoverCarouselProps {
  heading?: string
  items?: CarouselItem[]
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    id: 'retail-facade',
    title: 'Retail Store Facade Signage',
    summary: 'Complete ACP sign board installation for a Belgaum retail brand — boosted walk-in traffic by 40% in the first week.',
    url: '/portfolio/retail-facade',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    category: 'ACP Sign Board',
  },
  {
    id: 'fleet-wrap',
    title: 'Fleet Vehicle Wrap Campaign',
    summary: 'Full body 3M vinyl wrap for an 8-vehicle logistics fleet — designed, printed, and installed in 5 working days.',
    url: '/portfolio/fleet-wrap',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    category: 'Vehicle Branding',
  },
  {
    id: 'office-branding',
    title: 'Corporate Office Interior',
    summary: '2000 sq ft office transformation with wall graphics, acrylic signage, and frosted glass film for a Belgaum tech firm.',
    url: '/portfolio/office-branding',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    category: 'Corporate Branding',
  },
  {
    id: 'trade-show',
    title: 'Award-Winning Trade Show Booth',
    summary: 'Full exhibition stand with popup display, backlit backdrop, and branded standees — delivered on a 72-hour deadline.',
    url: '/portfolio/trade-show',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    category: 'Exhibition Branding',
  },
  {
    id: 'product-catalogue',
    title: '100-Page Product Catalogue',
    summary: 'Premium offset-printed B2B catalogue — 5000 copies, gloss lamination, perfect binding. Delivered in 7 working days.',
    url: '/portfolio/product-catalogue',
    image: 'https://images.unsplash.com/photo-1586953208448-b95f7f86628e?w=800&q=80',
    category: 'Offset Printing',
  },
]

export function GalleryHoverCarousel({
  heading = 'Featured Work',
  items = DEFAULT_ITEMS,
}: GalleryHoverCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateScrollState = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    updateScrollState()
    emblaApi.on('select', updateScrollState)
    emblaApi.on('reInit', updateScrollState)
    return () => {
      emblaApi.off('select', updateScrollState)
      emblaApi.off('reInit', updateScrollState)
    }
  }, [emblaApi, updateScrollState])

  return (
    <section className="section-nx overflow-hidden bg-background">
      <div className="container-nx">
        {/* Header row */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-3">Featured Work</p>
            <h2 className="font-display text-display-lg font-bold text-primary leading-tight">
              {heading}{' '}
            </h2>
            <p className="mt-3 text-secondary max-w-lg">
              Real projects. Real impact. A glimpse into what we build for our clients across Belgaum and beyond.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all',
                canScrollPrev
                  ? 'bg-card text-primary hover:border-accent hover:text-accent'
                  : 'bg-muted text-muted-foreground opacity-40 cursor-not-allowed'
              )}
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all',
                canScrollNext
                  ? 'bg-card text-primary hover:border-accent hover:text-accent'
                  : 'bg-muted text-muted-foreground opacity-40 cursor-not-allowed'
              )}
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 touch-pan-y">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative min-w-0 shrink-0 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[350px]"
              >
                <Link
                  to={item.url}
                  className="group relative block h-[320px] overflow-hidden rounded-3xl border border-border bg-card md:h-[380px]"
                >
                  {/* Image fills full card initially */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />

                  {/* Category pill — always visible */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Gradient overlay — always visible at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Title — always visible at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                    <h3 className="font-display text-lg font-bold text-white leading-tight">{item.title}</h3>
                    {/* Summary — slides in on hover */}
                    <p className="mt-2 text-sm text-white/80 line-clamp-2 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                      {item.summary}
                    </p>
                    {/* Arrow button */}
                    <div className="mt-3 flex items-center gap-2 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="text-xs font-medium text-white/70">View Project</span>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-all group-hover:rotate-[-45deg] group-hover:border-white/60 group-hover:bg-white/20">
                        <ArrowRight className="size-3 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-primary transition-all hover:border-accent hover:text-accent"
          >
            View All Projects <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
