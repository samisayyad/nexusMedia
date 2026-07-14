import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { useMagnetic } from '@/hooks/useReveal'

interface MagneticButtonProps extends LinkProps {
  className?: string
  children: React.ReactNode
}

export function MagneticButton({ className, children, ...props }: MagneticButtonProps) {
  const ref = useMagnetic<HTMLAnchorElement>()

  return (
    <Link
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center transition-transform duration-200 ease-out',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

interface MagneticDivProps {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export function MagneticDiv({ className, children, onClick }: MagneticDivProps) {
  const ref = useMagnetic<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn('transition-transform duration-200 ease-out', className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}
