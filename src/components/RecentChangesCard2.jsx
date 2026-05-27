import { TrendingUp, AlertTriangle, Info } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { formatRelativeTime } from '../lib/utils'

export default function RecentChangesCard2({ change }) {
  const severityConfig = {
    critical: { color: '#f87171', variant: 'destructive' },
    high: { color: '#fb923c', variant: 'warning' },
    medium: { color: '#fbbf24', variant: 'warning' },
  }

  const config = severityConfig[change.severity]

  const typeLabels = {
    pattern_increase: 'Pattern Coverage Increase',
    velocity_increase: 'Velocity Increase',
    blast_radius_expansion: 'Blast Radius Expansion',
  }

  return (
    <Card className="p-4">
      <CardContent className="p-0">
        {/* Header with bottom spacing */}
        <div className="pb-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs">
              {typeLabels[change.type]}
            </Badge>
            <Badge variant={config.variant} className="text-xs">
              {change.change}
            </Badge>
          </div>
          <div className="text-xs text-text-muted">
            {formatRelativeTime(change.detectedAt)}
          </div>
        </div>

        {/* Title with bottom spacing */}
        <div className="pb-2">
          <h4 className="text-base font-semibold text-text-primary">
            {change.title}
          </h4>
        </div>

        {/* Description with bottom spacing */}
        <div className="pb-3">
          <p className="text-sm text-text-secondary">
            {change.description}
          </p>
        </div>

        {/* Baseline Comparison - no bottom spacing (last element) */}
        <div className="rounded-lg bg-background-tertiary p-3">
          <div className="pb-2 text-xs font-semibold text-text-muted">
            BASELINE COMPARISON ({change.baseline.period})
          </div>
          <div className="flex items-center gap-4">
            <div className="pr-4">
              <div className="pb-1 text-xs text-text-muted">Before</div>
              <div className="text-lg font-semibold text-text-primary">
                {change.baseline.previousValue}
                {change.type === 'pattern_increase' && '%'}
                {change.type === 'velocity_increase' && 's'}
              </div>
            </div>
            <TrendingUp className="h-4 w-4 text-accent-orange" />
            <div>
              <div className="pb-1 text-xs text-text-muted">Now</div>
              <div className="text-lg font-semibold text-text-primary">
                {change.baseline.currentValue}
                {change.type === 'pattern_increase' && '%'}
                {change.type === 'velocity_increase' && 's'}
                {change.type === 'blast_radius_expansion' && ' services'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
