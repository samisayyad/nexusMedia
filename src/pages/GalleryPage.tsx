import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import { GALLERY_CATS, GALLERY_ITEMS } from '@/constants/data'
import { ArcGalleryHero } from '@/components/gallery/ArcGalleryHero'
import { cn } from '@/utils/cn'

type GalleryItem = (typeof GALLERY_ITEMS)[number]

// Gallery images for the arc hero — use first 8 gallery items
const ARC_IMAGES = GALLERY_ITEMS.slice(0, 8).map(g => g.image)

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}
const item = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  show:   { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
}

export default function GalleryPage() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState<GalleryItem | null>(null)
  const [visibleCount, setVisibleCount] = useState(12)

  const filtered = active === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.cat === active)
  const visible = filtered.slice(0, visibleCount)

  const selectedIndex = selected ? filtered.findIndex(g => g.id === selected.id) : -1
  const navigateLight = useCallback((dir: 1 | -1) => {
    if (selectedIndex === -1) return
    setSelected(filtered[(selectedIndex + dir + filtered.length) % filtered.length])
  }, [selectedIndex, filtered])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') navigateLight(-1)
    if (e.key === 'ArrowRight') navigateLight(1)
  }, [navigateLight])

  return (
    <>
      {/* ── ARC HERO ──────────────────────────────────────────────────────── */}
      <ArcGalleryHero
        images={ARC_IMAGES}
        heading="Work That Speaks Volumes"
        subheading="A curated visual showcase — from premium flex printing and vivid signage to vehicle wraps and exhibition stands that define brands across Belgaum."
        ctaText="Start Your Project"
        ctaHref="/quote"
      />

      {/* ── FILTER PILLS ──────────────────────────────────────────────────── */}
      <div className="sticky top-14 z-30 border-b border-border/60 bg-background/95 backdrop-blur-xl">
        <div className="container-nx">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {GALLERY_CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActive(cat); setVisibleCount(12) }}
                className={cn(
                  'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300',
                  active === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'border border-border bg-card text-secondary hover:border-accent/60 hover:text-primary'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MASONRY GRID ──────────────────────────────────────────────────── */}
      <section className="section-nx pt-10">
        <div className="container-nx">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={stagger}
              initial="hidden"
              animate="show"
              className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4"
            >
              {visible.map((galleryItem) => (
                <motion.div key={galleryItem.id} variants={item} layout className="mb-4 break-inside-avoid">
                  <button
                    onClick={() => setSelected(galleryItem)}
                    className="group relative block w-full overflow-hidden rounded-2xl border border-border/60 bg-card text-left shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <div className={cn(
                      'relative overflow-hidden',
                      galleryItem.ratio === 'tall'   && 'aspect-[3/4]',
                      galleryItem.ratio === 'wide'   && 'aspect-[4/3]',
                      galleryItem.ratio === 'square' && 'aspect-square',
                    )}>
                      <img
                        src={galleryItem.image}
                        alt={galleryItem.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-sm">
                          <ZoomIn className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60">{galleryItem.cat}</span>
                        <p className="mt-0.5 font-display text-base font-bold text-white">{galleryItem.title}</p>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="rounded-full border border-white/20 bg-black/30 px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm">
                          {galleryItem.cat}
                        </span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {visibleCount < filtered.length && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => c + 8)}
                className="rounded-full border border-border bg-card px-8 py-3 text-sm font-semibold text-primary transition-all hover:border-accent hover:bg-accent hover:text-white"
              >
                Load More
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────────────────────────────── */}
      <Dialog.Root open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content
            onKeyDown={handleKeyDown}
            className="fixed left-1/2 top-1/2 z-[210] flex max-h-[92vh] w-[94vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl bg-card shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col"
                >
                  <div className="relative max-h-[70vh] overflow-hidden">
                    <img src={selected.image} alt={selected.title} className="max-h-[70vh] w-full object-contain" />
                    <button onClick={() => navigateLight(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/80" aria-label="Previous">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button onClick={() => navigateLight(1)} className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/80" aria-label="Next">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
                      {selectedIndex + 1} / {filtered.length}
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-border px-6 py-4">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">{selected.cat}</span>
                      <Dialog.Title className="mt-0.5 font-display text-xl font-bold text-primary">{selected.title}</Dialog.Title>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <Dialog.Close className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/80">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
