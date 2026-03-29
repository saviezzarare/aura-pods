import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none transition-all duration-200 overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-white text-black [a&]:hover:bg-white/90',
        secondary:
          'border-transparent bg-white/10 text-white [a&]:hover:bg-white/15',
        destructive:
          'border-transparent bg-red-600/90 text-white [a&]:hover:bg-red-600',
        outline:
          'border-white/20 text-white bg-transparent [a&]:hover:bg-white/5 [a&]:hover:border-white/30',
        success:
          'border-transparent bg-emerald-500/90 text-white [a&]:hover:bg-emerald-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
