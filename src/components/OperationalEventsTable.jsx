import { AlertCircle, Server, TrendingDown, ChevronRight } from 'lucide-react'
import { Badge } from './ui/badge'
import { formatRelativeTime } from '../lib/utils'
import { useNavigate } from 'react-router-dom'

export default function OperationalEventsTable({ events }) {
  const navigate = useNavigate()

  const severityConfig = {
    critical: { color: '#f87171', bgColor: 'bg-accent-red/10', dotColor: 'bg-accent-red' },
    high: { color: '#fb923c', bgColor: 'bg-accent-orange/10', dotColor: 'bg-accent-orange' },
    medium: { color: '#fbbf24', bgColor: 'bg-accent-yellow/10', dotColor: 'bg-accent-yellow' },
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background-secondary">
      {/* Table Header */}
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 border-b border-border bg-background-tertiary px-6 py-3 text-xs font-semibold uppercase text-text-muted">
        <div className="w-8"></div>
        <div>Event</div>
        <div className="text-right">Noise Reduction</div>
        <div className="text-center">Services</div>
        <div className="text-center">Confidence</div>
        <div>Detected</div>
        <div className="w-8"></div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-border">
        {events.map((event) => {
          const config = severityConfig[event.severity]
          const reductionPercentage = ((event.consolidatedNotifications / (event.consolidatedNotifications + 1)) * 100).toFixed(1)

          return (
            <div
              key={event.id}
              className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 px-6 py-4 transition-all hover:bg-background-tertiary cursor-pointer"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              {/* Severity Indicator */}
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full ${config.dotColor}`} />
              </div>

              {/* Event Details */}
              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <Badge
                    variant={event.severity === 'critical' ? 'destructive' : 'warning'}
                    className="text-xs"
                  >
                    {event.severity}
                  </Badge>
                  <h3 className="truncate font-semibold text-text-primary">
                    {event.title}
                  </h3>
                </div>
                <p className="truncate text-sm text-text-secondary">
                  {event.description}
                </p>
              </div>

              {/* Noise Reduction - PROMINENT */}
              <div className="flex flex-col items-end justify-center">
                <div className="flex items-center gap-2 rounded-lg bg-accent-green/10 px-3 py-1">
                  <TrendingDown className="h-4 w-4 text-accent-green" />
                  <div className="text-right">
                    <div className="text-lg font-bold text-accent-green">
                      {event.consolidatedNotifications}
                    </div>
                    <div className="text-xs text-text-muted">
                      {reductionPercentage}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Count */}
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-1 rounded-lg bg-background-tertiary px-3 py-1">
                  <Server className="h-4 w-4 text-text-muted" />
                  <span className="font-semibold text-text-primary">
                    {event.affectedServices.length}
                  </span>
                </div>
              </div>

              {/* Confidence */}
              <div className="flex items-center justify-center">
                <div className="rounded-lg bg-background-tertiary px-3 py-1">
                  <span className="font-semibold text-text-primary">
                    {event.confidence}%
                  </span>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center">
                <span className="text-sm text-text-muted">
                  {formatRelativeTime(event.timestamp)}
                </span>
              </div>

              {/* Action Arrow */}
              <div className="flex items-center justify-end">
                <ChevronRight className="h-5 w-5 text-text-muted" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
