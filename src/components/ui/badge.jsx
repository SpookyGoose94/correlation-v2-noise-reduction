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
          'bg-gray-200 text-gray-700 dark:bg-background-tertiary dark:text-text-secondary': variant === 'secondary',
          'bg-blue-100 text-blue-700 dark:bg-accent-blue/20 dark:text-accent-blue': variant === 'info',
          'bg-green-100 text-green-700 dark:bg-accent-green/20 dark:text-accent-green': variant === 'success',
          'bg-yellow-100 !text-yellow-800 dark:bg-accent-yellow/20 dark:text-accent-yellow': variant === 'warning',
          'bg-red-100 text-red-900 dark:bg-accent-red/20 dark:text-accent-red': variant === 'destructive',
        },
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = 'Badge'

export { Badge }
