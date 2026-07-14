import { cn } from '@/utils/cn'

interface MarqueeProps {
  items: string[]
  reverse?: boolean
  className?: string
}

export function Marquee({ items, reverse, className }: MarqueeProps) {
  const doubled = [...items, ...items]

  return (
    <div className={cn('overflow-hidden border-y border-border bg-card py-5', className)}>
      <div
        className={cn(
          'flex w-max gap-12 animate-marquee',
          reverse && 'animate-marquee-reverse'
        )}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-12 whitespace-nowrap font-display text-lg font-semibold tracking-tight text-primary/80 md:text-xl"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}
