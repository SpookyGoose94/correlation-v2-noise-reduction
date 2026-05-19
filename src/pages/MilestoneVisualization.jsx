import { Milestone, Bell, TrendingUp, AlertTriangle, FileEdit } from 'lucide-react'
import { useState } from 'react'
import Layout from '../components/Layout'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock milestone data - notifications are actions within milestones
const milestones = [
  {
    id: 1,
    issueCount: 1,
    action: 'Cluster Created',
    actionType: 'creation',
    details: 'Initial operational event created',
    timestamp: '10:23 AM',
    notificationSent: true,
    notificationChannels: ['Slack', 'PagerDuty'],
    icon: AlertTriangle,
    position: 5 // % position on the bar (0-100)
  },
  {
    id: 2,
    issueCount: 45,
    action: 'Event Renamed',
    actionType: 'rename',
    details: 'Database latency → Checkout service error',
    timestamp: '10:47 AM',
    notificationSent: false,
    notificationChannels: [],
    icon: FileEdit,
    position: 50
  },
  {
    id: 3,
    issueCount: 120,
    action: 'Issue Threshold Crossed',
    actionType: 'threshold',
    details: '120 issues correlated in 30min window',
    timestamp: '11:15 AM',
    notificationSent: true,
    notificationChannels: ['Slack'],
    icon: TrendingUp,
    position: 65
  },
  {
    id: 4,
    issueCount: 155,
    action: 'Severity → Critical',
    actionType: 'severity',
    details: 'Issue rate threshold crossed (+70% spike)',
    timestamp: '11:28 AM',
    notificationSent: true,
    notificationChannels: ['Slack', 'PagerDuty'],
    icon: AlertTriangle,
    position: 90
  }
]

// Color blocks with varying lengths
const colorBlocks = [
  { color: '#60a5fa', width: 15, label: 'Low' },      // Blue - 15% (smaller)
  { color: '#fbbf24', width: 25, label: 'Elevated' }, // Yellow - 25% (smaller)
  { color: '#fb923c', width: 45, label: 'High' },     // Orange - 45% (largest)
  { color: '#f87171', width: 15, label: 'Critical' }  // Red - 15% (smaller)
]

// Data for charts
const issueProgressionData = milestones.map(m => ({
  issueCount: m.issueCount,
  milestone: m.id
}))

export default function MilestoneVisualization() {
  const [hoveredMilestone, setHoveredMilestone] = useState(null)

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <Milestone className="h-8 w-8 text-accent-purple" />
            Milestone Visualization Options
          </h1>
          <p className="mt-2 text-text-secondary">
            Explore different ways to visualize operational event maturity progression
          </p>
        </div>

        {/* Option 3: Mountain Chart */}
        <Card className="p-0">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              Option 3: Mountain Elevation (Issue Growth Chart)
            </h2>
            <div style={{ height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={issueProgressionData}>
                  <defs>
                    <linearGradient id="issueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="milestone"
                    stroke="#9ca3af"
                    label={{ value: 'Milestone', position: 'insideBottom', offset: -5, fill: '#9ca3af' }}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    label={{ value: 'Issues', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #262626',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="issueCount"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#issueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 grid grid-cols-6 gap-3">
              {milestones.map((milestone) => {
                const Icon = milestone.icon
                return (
                  <div key={milestone.id} className="bg-background-tertiary border border-border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-4 w-4 text-accent-blue" />
                      <span className="text-xs font-semibold text-text-primary">M{milestone.id}</span>
                    </div>
                    <div className="text-xs text-text-muted mb-1">{milestone.action}</div>
                    <div className="text-sm font-bold text-accent-green">{milestone.issueCount}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Option 4: Horizontal Progress Bar */}
        <Card className="p-0">
          <CardContent className="px-8 pt-8 pb-32">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              Option 4: Horizontal Progress Bar
            </h2>
            <div className="relative mt-8">
                {/* Bar with varying block colors */}
                <div className="h-4 rounded-full border border-border overflow-hidden flex">
                  {colorBlocks.map((block, index) => (
                    <div
                      key={index}
                      className="h-full"
                      style={{ width: `${block.width}%`, backgroundColor: block.color }}
                    />
                  ))}
                </div>

                {/* Markers Container - Below the bar */}
                <div className="relative pt-4">
                  {milestones.map((milestone) => {
                    const Icon = milestone.icon
                    const isHovered = hoveredMilestone === milestone.id
                    return (
                      <div
                        key={milestone.id}
                        className="absolute flex flex-col items-center"
                        style={{ left: `${milestone.position}%`, transform: 'translateX(-50%)' }}
                        onMouseEnter={() => setHoveredMilestone(milestone.id)}
                        onMouseLeave={() => setHoveredMilestone(null)}
                      >
                        {/* Vertical line pointing up to bar */}
                        <div
                          className="absolute bottom-full w-0.5 bg-border"
                          style={{ height: '16px', left: '50%', transform: 'translateX(-50%)' }}
                        />

                        {/* Icon - generic color */}
                        <div className="w-12 h-12 rounded-full border-2 border-border bg-background-secondary flex items-center justify-center shadow-md relative">
                          <Icon className="h-5 w-5 text-text-primary" />
                          {/* Notification indicator */}
                          {milestone.notificationSent && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-green border-2 border-background-secondary rounded-full flex items-center justify-center">
                              <Bell className="h-3 w-3 text-white" />
                            </div>
                          )}

                          {/* Hover overlay popover - positioned beside the icon */}
                          {isHovered && (
                            <div
                              className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-background-secondary border border-border rounded-lg shadow-lg p-3 w-44 z-50"
                              style={{ pointerEvents: 'none' }}
                            >
                              <Badge variant="secondary" className="mb-2 text-xs w-full justify-center">{milestone.issueCount} issues</Badge>
                              {milestone.notificationSent && (
                                <div className="text-xs text-accent-green flex items-center gap-1">
                                  <Bell className="h-3 w-3" />
                                  <span>Sent to {milestone.notificationChannels.join(', ')}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Text centered below icon */}
                        <div className="mt-3 flex flex-col items-center w-32">
                          <div className="text-xs font-semibold text-text-primary text-center">{milestone.action}</div>
                          <div className="text-xs text-text-muted mt-1">{milestone.timestamp}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
