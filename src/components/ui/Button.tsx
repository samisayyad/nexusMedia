import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5',
        accent:
          'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5',
        outline:
          'border border-border bg-card text-primary hover:bg-muted hover:border-primary/20',
        ghost: 'text-secondary hover:text-primary hover:bg-muted',
        orange:
          'bg-accent-2 text-white hover:bg-accent-2/90 shadow-lg shadow-accent-2/20 hover:-translate-y-0.5',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-full',
        md: 'h-11 px-6 text-sm rounded-full',
        lg: 'h-13 px-8 text-base rounded-full',
        xl: 'h-14 px-10 text-base rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
