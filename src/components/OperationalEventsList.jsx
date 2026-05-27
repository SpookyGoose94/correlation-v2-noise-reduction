import { useState, useEffect } from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { BellOff, ChevronDown } from 'lucide-react'

export default function OperationalEventsList({ events }) {
  const navigate = useNavigate()
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

  const formatTimestamp = (timestamp) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return `${minutes}m ago`
  }

  const severityConfig = {
    critical: { color: '#f87171', bgColor: 'bg-accent-red/10', dotColor: 'bg-accent-red' },
    high: { color: '#fb923c', bgColor: 'bg-accent-orange/10', dotColor: 'bg-accent-orange' },
    medium: { color: '#fbbf24', bgColor: 'bg-accent-yellow/10', dotColor: 'bg-accent-yellow' },
  }

  return (
    <div className="space-y-3">
      {visibleEvents.map((event) => {
        const config = severityConfig[event.severity]
        return (
          <div
            key={event.id}
            className="rounded-lg border border-border bg-background-secondary p-3 cursor-pointer transition-all hover:border-accent-blue/50"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            {/* Header Row: Title + Severity + Mute */}
            <div className="flex items-start justify-between gap-4 pb-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <h3 className="text-sm font-bold text-text-primary truncate">
                  {event.title}
                </h3>
                <Badge
                  variant={event.severity === 'critical' ? 'destructive' : 'warning'}
                  className="text-xs flex-shrink-0"
                >
                  {event.severity}
                </Badge>
              </div>

              {/* Mute Button */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={(e) => toggleDropdown(event.id, e)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-background-tertiary hover:bg-border transition-colors text-xs text-text-secondary"
                >
                  <BellOff className="h-3 w-3" />
                  <span>Mute</span>
                  <ChevronDown className="h-3 w-3" />
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

            {/* Actionable Criteria - Highlighted */}
            <div className="pb-3">
              <div className="rounded-md bg-accent-blue/10 px-3 py-2 border-l-2 border-accent-blue">
                <span className="text-sm font-semibold text-accent-blue">
                  {event.actionableCriteria}
                </span>
                <span className="text-sm text-text-primary">
                  : A total of {event.consolidatedNotifications} issues occurred in the last 30 mins.
                </span>
              </div>
            </div>

            {/* Metrics Row: Issues + Notifications */}
            <div className="flex items-center gap-8 pb-3">
              <div>
                <div className="text-xs text-text-secondary pb-1">Issues</div>
                <div className="text-lg font-bold text-text-primary">
                  {event.consolidatedNotifications}
                </div>
              </div>

              <div>
                <div className="text-xs text-text-secondary pb-1">Notifications</div>
                <div className="text-lg font-bold text-text-primary">
                  {event.notificationsSent}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="flex items-center gap-1.5">
              {event.affectedServices.slice(0, 4).map((service) => (
                <Badge key={service} variant="secondary" className="text-xs">
                  {service}
                </Badge>
              ))}
              {event.affectedServices.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{event.affectedServices.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
