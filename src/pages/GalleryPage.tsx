import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Masonry from 'react-masonry-css'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GALLERY_CATS, GALLERY_ITEMS } from '@/constants/data'
import { cn } from '@/utils/cn'

const breakpointColumns = { default: 3, 1024: 3, 768: 2, 320: 1 }

export default function GalleryPage() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState<(typeof GALLERY_ITEMS)[0] | null>(null)
  const [visibleCount, setVisibleCount] = useState(8)

  const filtered = active === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.cat === active)
  const visible = filtered.slice(0, visibleCount)

  return (
    <>
      <section className="relative min-h-[50vh] pt-[72px]">
        <div className="container-nx py-20 md:py-28">
          <SectionLabel>Visual Gallery</SectionLabel>
          <h1 className="mt-6 max-w-4xl text-display-xl font-display font-bold text-primary">
            Work That <span className="text-accent">Speaks Volumes</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-secondary">
            A collection of our best work — from premium flex printing to intricate fabrication and signage installations.
          </p>
        </div>
      </section>

      <section className="section-nx pt-0">
        <div className="container-nx">
          <div className="mb-10 flex flex-wrap gap-3">
            {GALLERY_CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActive(cat); setVisibleCount(8) }}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-medium transition-all',
                  active === cat ? 'bg-primary text-white' : 'border border-border bg-card text-secondary hover:border-accent'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-6 w-auto"
            columnClassName="pl-6 bg-clip-padding"
          >
            {visible.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(item)}
                className="group mb-6 w-full overflow-hidden rounded-2xl border border-border bg-card text-left"
              >
                <div className={cn(
                  'relative overflow-hidden',
                  item.ratio === 'tall' && 'aspect-[3/4]',
                  item.ratio === 'wide' && 'aspect-[4/3]',
                  item.ratio === 'square' && 'aspect-square',
                )}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/20" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform group-hover:translate-y-0">
                    <span className="text-xs text-white/70">{item.cat}</span>
                    <p className="font-display font-bold text-white">{item.title}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </Masonry>

          {visibleCount < filtered.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount((c) => c + 4)}
                className="rounded-full border border-border bg-card px-8 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      <Dialog.Root open={!!selected} onOpenChange={() => setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-card shadow-2xl">
            <AnimatePresence>
              {selected && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <img src={selected.image} alt={selected.title} className="max-h-[70vh] w-full object-cover" />
                  <div className="p-6">
                    <span className="text-xs uppercase tracking-wider text-accent">{selected.cat}</span>
                    <Dialog.Title className="mt-2 font-display text-2xl font-bold text-primary">{selected.title}</Dialog.Title>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <Dialog.Close className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
