import { useState } from 'react'
import { motion } from 'framer-motion'
import { GALLERY_ITEMS } from '@/constants/data'

export function HeroShowcaseCard() {
  const images = GALLERY_ITEMS.slice(2, 6) // pick some nice varied images
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="relative flex h-[400px] md:h-[480px] w-full max-w-[460px] items-center justify-center">
      {/* Decorative background glow */}
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-accent/10 to-accent-2/10 blur-2xl" />

      <div className="relative flex h-full w-full gap-2 p-2">
        {images.map((item, index) => {
          const isHovered = hoveredIndex === index
          // If nothing is hovered, all share equal space (flex-1).
          // If something is hovered, it gets flex-[3] and others get flex-[0.5].
          
          return (
            <motion.div
              key={item.id}
              className="relative overflow-hidden rounded-2xl bg-muted shadow-lg cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ flex: 1 }}
              animate={{ 
                flex: hoveredIndex === null ? 1 : isHovered ? 3.5 : 0.5 
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              
              {/* Gradient overlay */}
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
                  hoveredIndex === null || isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Text content */}
              <motion.div
                className="absolute bottom-0 left-0 flex w-full flex-col justify-end p-4 md:p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: isHovered || hoveredIndex === null ? 1 : 0,
                  y: isHovered || hoveredIndex === null ? 0 : 10
                }}
                transition={{ duration: 0.4, delay: isHovered ? 0.1 : 0 }}
              >
                {/* Vertical text when compressed, horizontal when expanded */}
                <div className="flex flex-col gap-1 overflow-hidden whitespace-nowrap">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                    {item.cat}
                  </span>
                  <motion.span 
                    className="font-display text-lg font-bold text-white drop-shadow-md"
                    animate={{
                      opacity: hoveredIndex !== null && !isHovered ? 0 : 1,
                      x: hoveredIndex !== null && !isHovered ? -20 : 0
                    }}
                  >
                    {item.title}
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
