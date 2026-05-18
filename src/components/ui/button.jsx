import React from 'react'
import { cn } from '../../lib/utils'

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue',
        'disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-accent-blue text-white hover:bg-accent-blue/90': variant === 'default',
          'bg-background-tertiary text-text-primary hover:bg-background-tertiary/80': variant === 'secondary',
          'border border-border hover:bg-background-secondary': variant === 'outline',
          'hover:bg-background-secondary': variant === 'ghost',
        },
        {
          'h-10 px-4 py-2': size === 'default',
          'h-9 px-3 text-sm': size === 'sm',
          'h-11 px-8': size === 'lg',
        },
        className
      )}
      {...props}
    />
  )
})
Button.displayName = 'Button'

export { Button }
