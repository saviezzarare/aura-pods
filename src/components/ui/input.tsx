import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-white placeholder:text-white/40 selection:bg-white/20 selection:text-white bg-white/5 border-white/10 h-10 w-full min-w-0 rounded-md border px-4 py-2 text-base text-white transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 md:text-sm',
        'focus-visible:border-white/30 focus-visible:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-white/10',
        'hover:border-white/20 hover:bg-white/[0.07]',
        'aria-invalid:ring-red-500/20 aria-invalid:border-red-500/50',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
