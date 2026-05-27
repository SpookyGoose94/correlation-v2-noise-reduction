import { useState, useEffect } from 'react'
import { MoreVertical } from 'lucide-react'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, ResponsiveContainer, XAxis } from 'recharts'

export default function OperationalEventsCards2({ events }) {
  const navigate = useNavigate()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [mutedEvents, setMutedEvents] = useState([])
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    const handleClickOutside = () => {
      if (openDropdown) setOpenDropdown(null)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [openDropdown])

  const handleMute = (eventId, duration, e) => {
    e.stopPropagation()
    setMutedEvents([...mutedEvents, eventId])
    setOpenDropdown(null)
  }

  const toggleDropdown = (eventId, e) => {
    e.stopPropagation()
    setOpenDropdown(openDropdown === eventId ? null : eventId)
  }

  const visibleEvents = events.filter(event => !mutedEvents.includes(event.id))

  const severityConfig = {
    critical: { color: '#f87171', bgColor: 'bg-accent-red/10', dotColor: 'bg-accent-red' },
    high: { color: '#fb923c', bgColor: 'bg-accent-orange/10', dotColor: 'bg-accent-orange' },
    medium: { color: '#fbbf24', bgColor: 'bg-accent-yellow/10', dotColor: 'bg-accent-yellow' },
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {visibleEvents.map((event) => {
        const config = severityConfig[event.severity]

        return (
          <Card
            key={event.id}
            className="p-4 cursor-pointer transition-all hover:border-accent-blue/50"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            <CardContent className="p-0">
              {/* Title with mute button */}
              <div className="pb-2 flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-text-primary line-clamp-1 flex-1">
                  {event.title}
                </h3>

                {/* Three-dot mute menu */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={(e) => toggleDropdown(event.id, e)}
                    className="p-1 rounded-md hover:bg-background-tertiary transition-colors"
                  >
                    <MoreVertical className="h-4 w-4 text-text-secondary" />
                  </button>

                  {openDropdown === event.id && (
                    <div className="absolute right-0 top-full mt-1 z-50 rounded-lg border border-border bg-background-secondary shadow-lg min-w-[200px]">
                      <div className="py-1">
                        <button
                          onClick={(e) => handleMute(event.id, '1week', e)}
                          className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background-tertiary transition-colors"
                        >
                          Hide for 1 week
                        </button>
                        <button
                          onClick={(e) => handleMute(event.id, 'nextCriteria', e)}
                          className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background-tertiary transition-colors"
                        >
                          Hide till next alarming criteria
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Severity and Actionable Criteria with bottom spacing */}
              <div className="pb-3 flex items-center gap-2">
                <Badge
                  variant={event.severity === 'critical' ? 'destructive' : 'warning'}
                  className="text-xs"
                >
                  {event.severity}
                </Badge>
                <span className="text-xs text-text-secondary">
                  {event.actionableCriteria}
                </span>
              </div>

              {/* Metrics Grid with bottom spacing */}
              <div className="pb-3 grid grid-cols-2 gap-4">
                {/* Issues */}
                <div>
                  <div className="pb-1 text-xs text-text-secondary">
                    Issues
                  </div>
                  <div className="text-2xl font-bold text-text-primary">
                    {event.consolidatedNotifications}
                  </div>
                </div>

                {/* Notifications Sent */}
                <div>
                  <div className="pb-1 text-xs text-text-secondary">
                    Notifications sent
                  </div>
                  <div className="text-2xl font-bold text-text-primary">
                    {event.notificationsSent}
                  </div>
                </div>
              </div>

              {/* Weekly Trend Chart with bottom spacing */}
              <div className="pb-3">
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

              {/* Top Affected Services - no bottom spacing (last element) */}
              <div>
                <div className="pb-2 text-xs text-text-secondary">
                  Top impacted services
                </div>
                <div className="flex items-center gap-1.5">
                  {event.affectedServices.slice(0, 2).map((service) => (
                    <Badge key={service} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {event.affectedServices.length > 2 && (
                    <div className="relative">
                      <Badge
                        variant="secondary"
                        className="text-xs cursor-pointer"
                        onMouseEnter={() => setHoveredCard(event.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        +{event.affectedServices.length - 2}
                      </Badge>
                      {hoveredCard === event.id && (
                        <div className="absolute left-0 top-full mt-1 z-50 rounded-lg border border-border bg-background-secondary p-3 shadow-lg">
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {event.affectedServices.slice(2).map((service) => (
                              <Badge key={service} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
