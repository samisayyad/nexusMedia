import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface CounterProps {
  value: number
  suffix?: string
  label: string
  className?: string
}

export function Counter({ value, suffix = '', label, className }: CounterProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn('text-center', className)}
    >
      <div className="font-display text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
        {inView ? (
          <CountUp end={value} duration={2.5} separator="," />
        ) : (
          '0'
        )}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="mt-2 text-sm uppercase tracking-wider text-secondary">{label}</p>
    </motion.div>
  )
}
