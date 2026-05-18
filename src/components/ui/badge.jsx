import React from 'react'
import { cn } from '../../lib/utils'

const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        {
          'bg-background-tertiary text-text-secondary': variant === 'default',
          'bg-accent-blue/20 text-accent-blue': variant === 'info',
          'bg-accent-green/20 text-accent-green': variant === 'success',
          'bg-accent-yellow/20 text-accent-yellow': variant === 'warning',
          'bg-accent-red/20 text-accent-red': variant === 'destructive',
        },
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = 'Badge'

export { Badge }
