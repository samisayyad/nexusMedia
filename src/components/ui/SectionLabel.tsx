import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  centered?: boolean
}

export function SectionLabel({ children, className, centered }: SectionLabelProps) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-accent',
        centered && 'justify-center w-full',
        className
      )}
    >
      <span className="h-px w-5 bg-accent" />
      {children}
    </motion.p>
  )
}
