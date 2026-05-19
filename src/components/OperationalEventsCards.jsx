import { Server, TrendingDown } from 'lucide-react'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, ResponsiveContainer, XAxis } from 'recharts'

export default function OperationalEventsCards({ events }) {
  const navigate = useNavigate()

  const severityConfig = {
    critical: { color: '#f87171', bgColor: 'bg-accent-red/10', dotColor: 'bg-accent-red' },
    high: { color: '#fb923c', bgColor: 'bg-accent-orange/10', dotColor: 'bg-accent-orange' },
    medium: { color: '#fbbf24', bgColor: 'bg-accent-yellow/10', dotColor: 'bg-accent-yellow' },
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {events.map((event) => {
        const config = severityConfig[event.severity]

        return (
          <Card
            key={event.id}
            className="p-0 cursor-pointer transition-all hover:border-accent-blue/50"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            <CardContent className="p-4">
              {/* Title */}
              <h3 className="mb-2 text-sm font-bold text-text-primary line-clamp-1">
                {event.title}
              </h3>

              {/* Badges */}
              <div className="mb-3 flex items-center gap-2">
                <Badge variant="default" className="text-xs">
                  <Server className="mr-1 h-3 w-3" />
                  {event.affectedServices.length} services
                </Badge>
                <Badge
                  variant={event.severity === 'critical' ? 'destructive' : 'warning'}
                  className="text-xs"
                >
                  {event.severity}
                </Badge>
              </div>

              {/* Main Metric */}
              <div className="mb-3">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Issues Suppressed
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold text-text-primary">
                    {event.consolidatedNotifications}
                  </div>
                  <TrendingDown className="h-4 w-4 text-accent-red" />
                </div>
              </div>

              {/* Weekly Trend Chart */}
              <div className="mb-3">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Weekly Trend
                </div>
                <ResponsiveContainer width="100%" height={60}>
                  <BarChart data={event.timeSeriesData}>
                    <XAxis
                      dataKey="time"
                      tick={{ fill: '#94a3b8', fontSize: 9 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Bar
                      dataKey="issues"
                      fill={config.color}
                      radius={[3, 3, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Top Affected Services */}
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Top Impacted Services
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {event.affectedServices.map((service) => (
                    <Badge key={service} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
