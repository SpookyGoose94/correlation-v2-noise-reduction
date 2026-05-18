import { TrendingUp, AlertTriangle, Info } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { formatRelativeTime } from '../lib/utils'

export default function RecentChangesCard({ change }) {
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
    <Card>
      <CardContent className="p-5">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
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

        {/* Title */}
        <h4 className="mb-2 text-base font-semibold text-text-primary">
          {change.title}
        </h4>

        {/* Description */}
        <p className="mb-3 text-sm text-text-secondary">
          {change.description}
        </p>

        {/* Baseline Comparison */}
        <div className="rounded-lg bg-background-tertiary p-3">
          <div className="mb-2 text-xs font-semibold text-text-muted">
            BASELINE COMPARISON ({change.baseline.period})
          </div>
          <div className="flex items-center gap-4">
            <div>
              <div className="text-xs text-text-muted">Before</div>
              <div className="text-lg font-semibold text-text-primary">
                {change.baseline.previousValue}
                {change.type === 'pattern_increase' && '%'}
                {change.type === 'velocity_increase' && 's'}
              </div>
            </div>
            <TrendingUp className="h-4 w-4 text-accent-orange" />
            <div>
              <div className="text-xs text-text-muted">Now</div>
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
