import { AlertCircle, Clock, Server, TrendingUp } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { formatRelativeTime } from '../lib/utils'
import { useNavigate } from 'react-router-dom'

export default function OperationalEventCard({ event }) {
  const navigate = useNavigate()

  const severityConfig = {
    critical: { color: '#f87171', variant: 'destructive', icon: AlertCircle },
    high: { color: '#fb923c', variant: 'warning', icon: TrendingUp },
    medium: { color: '#fbbf24', variant: 'warning', icon: Clock },
  }

  const config = severityConfig[event.severity]
  const SeverityIcon = config.icon

  return (
    <Card
      className="cursor-pointer transition-all hover:border-accent-blue/50 hover:shadow-lg"
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div
              className="mt-1 rounded-lg p-2"
              style={{ backgroundColor: `${config.color}20` }}
            >
              <SeverityIcon className="h-5 w-5" style={{ color: config.color }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                {event.title}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {event.description}
              </p>
            </div>
          </div>
          <Badge variant={config.variant}>{event.severity}</Badge>
        </div>

        {/* Key Metric - Noise Reduction */}
        <div className="mb-4 rounded-lg border border-border bg-background-tertiary p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-text-primary">
                {event.consolidatedNotifications}
              </div>
              <div className="text-sm text-text-secondary">
                notifications consolidated
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-accent-green">
                {((event.consolidatedNotifications / (event.consolidatedNotifications + 1)) * 100).toFixed(1)}% reduction
              </div>
              <div className="text-xs text-text-muted">
                1 event surfaced
              </div>
            </div>
          </div>
        </div>

        {/* Affected Services */}
        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold text-text-muted">AFFECTED SERVICES</div>
          <div className="flex flex-wrap gap-2">
            {event.affectedServices.map((service) => (
              <Badge key={service} variant="default">
                <Server className="mr-1 h-3 w-3" />
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-4 text-sm text-text-muted">
            <span>{formatRelativeTime(event.timestamp)}</span>
            <span>•</span>
            <span>{event.confidence}% confidence</span>
          </div>
          <Button variant="outline" size="sm" onClick={(e) => {
            e.stopPropagation()
            navigate(`/events/${event.id}`)
          }}>
            Investigate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
