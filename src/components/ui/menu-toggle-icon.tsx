import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface MenuToggleIconProps {
  open: boolean
  className?: string
  duration?: number
}

export function MenuToggleIcon({ open, className, duration = 300 }: MenuToggleIconProps) {
  return (
    <div className={cn('relative h-5 w-5', className)}>
      <motion.span
        className="absolute left-0 top-1 block h-0.5 w-5 bg-current"
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: duration / 1000 }}
      />
      <motion.span
        className="absolute left-0 top-2.5 block h-0.5 w-5 bg-current"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: duration / 1000 }}
      />
      <motion.span
        className="absolute left-0 top-4 block h-0.5 w-5 bg-current"
        animate={open ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
        transition={{ duration: duration / 1000 }}
      />
    </div>
  )
}
