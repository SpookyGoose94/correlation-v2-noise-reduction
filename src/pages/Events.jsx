import { Activity, Clock } from 'lucide-react'
import Layout from '../components/Layout'
import { Badge } from '../components/ui/badge'
import { operationalEvents } from '../data/mockData'
import { useNavigate } from 'react-router-dom'
import { formatRelativeTime } from '../lib/utils'

export default function Events() {
  const navigate = useNavigate()

  const statusConfig = {
    active: { label: 'Active', variant: 'destructive' },
    investigating: { label: 'Investigating', variant: 'warning' },
    resolved: { label: 'Resolved', variant: 'success' },
    degrading: { label: 'Degrading', variant: 'warning' },
    closed: { label: 'Closed', variant: 'secondary' },
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <Activity className="h-8 w-8 text-accent-blue" />
            Operational Events
          </h1>
          <p className="mt-2 text-text-secondary">
            All correlated operational events and their current status
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-lg border border-border bg-background-secondary p-4">
            <div className="text-sm text-text-muted">Total Events</div>
            <div className="text-2xl font-bold text-text-primary">
              {operationalEvents.length}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background-secondary p-4">
            <div className="text-sm text-text-muted">Active</div>
            <div className="text-2xl font-bold text-accent-red">
              {operationalEvents.filter(e => e.status === 'active').length}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background-secondary p-4">
            <div className="text-sm text-text-muted">Total Issues Correlated</div>
            <div className="text-2xl font-bold text-accent-green">
              {operationalEvents.reduce((sum, e) => sum + e.consolidatedNotifications, 0)}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background-secondary p-4">
            <div className="text-sm text-text-muted">Notifications Sent</div>
            <div className="text-2xl font-bold text-accent-blue">
              {operationalEvents.reduce((sum, e) => sum + e.notificationsSent, 0)}
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="rounded-lg border border-border bg-background-secondary">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Event Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Severity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Total Issues
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Notifications
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {operationalEvents.map((event) => (
                <tr
                  key={event.id}
                  onClick={() => navigate(`/events/${event.id}`)}
                  className="cursor-pointer transition-colors hover:bg-background-tertiary"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="font-medium text-text-primary">
                        {event.title}
                      </div>
                      <div className="mt-1 text-sm text-text-muted line-clamp-1">
                        {event.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={event.severity === 'critical' ? 'destructive' : 'warning'}
                      className="text-xs"
                    >
                      {event.severity}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-lg font-semibold text-text-primary">
                      {event.consolidatedNotifications}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-lg font-semibold text-accent-blue">
                      {event.notificationsSent}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={statusConfig[event.status]?.variant || 'secondary'}
                      className="text-xs"
                    >
                      {statusConfig[event.status]?.label || event.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Clock className="h-4 w-4" />
                      {formatRelativeTime(event.timestamp)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
