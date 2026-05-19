import { X, Clock, TrendingUp, ChevronDown } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { formatRelativeTime } from '../lib/utils'

export default function IssueDetailModal({ issue, onClose }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [alertEventsExpanded, setAlertEventsExpanded] = useState(true)
  const [timelineExpanded, setTimelineExpanded] = useState(false)
  const [impactedEntitiesExpanded, setImpactedEntitiesExpanded] = useState(false)

  if (!issue) return null

  const severityColors = {
    critical: '#f87171',
    high: '#fb923c',
    medium: '#fbbf24',
  }

  // Mock data for the issue detail
  const mockAlertEvents = [
    {
      id: 1,
      severity: 'critical',
      status: 'Closed',
      title: 'New Relic One - Production query result is > 5.0 for 15 minutes on \'Build Recommendations Error Rate {SLO}\'',
      opened: 'Today 8:34pm',
      duration: '6m',
      description: 'Add description',
      policy: 'Networking Demo',
      condition: 'Infra Host Memory',
      query: 'FROM SystemSample SELECT average(memoryUsedPercent) FACET entityName, entityGuid TIMESERIES 1 MINUTE SINCE \'2024-09-12 20:27:51 Z\' UNTIL \'2024-09-12 20:46:20 Z\''
    },
    {
      id: 2,
      severity: 'critical',
      status: 'Closed',
      title: 'host-tower-atlanta query result is > 95.0 for 5 minutes on \'Infra',
      opened: 'Today 8:32pm',
      duration: '8m'
    },
    {
      id: 3,
      severity: 'critical',
      status: 'Closed',
      title: 'host-proxy-west-1 query result is > 95.0 for 5 minutes on \'Infra',
      opened: 'Today 8:28pm',
      duration: '6m'
    }
  ]

  const mockTimeSeriesData = [
    { time: '8:00 pm', value: 0 },
    { time: '8:05pm', value: 0 },
    { time: '8:10pm', value: 0 },
    { time: '8:15pm', value: 85 },
    { time: '8:20pm', value: 95 },
    { time: '8:25pm', value: 100 },
    { time: '8:30pm', value: 85 },
    { time: '8:35pm', value: 10 },
    { time: '8:40pm', value: 0 }
  ]

  const mockTags = [
    'accountId: 15948394',
    'apmApplicationNames: Proxy-west-6',
    'account: demo-act1',
    'awsRegion: us-east-1a',
    'displayName: host-proxy-west-1',
    'ec2InstanceType: c4.large'
  ]

  const mockTimelineEvents = [
    {
      time: '3:25pm',
      type: 'High Issue Activated',
      service: 'Order-Processing',
      description: 'Order-Processing query result is > 0.95 for 2 minutes on \'[Pathpoint] Order Processing Apdex\''
    },
    {
      time: '3:24pm',
      type: 'Critical Issue Closed',
      service: 'Order-Processing',
      description: 'Order-Processing query result is > 0.95 for 2 minutes on \'[Pathpoint] Order Processing Apdex\''
    },
    {
      time: '2:30pm',
      type: 'High Issue Activated',
      service: 'Order-Processing',
      description: 'Order-Processing query result is > 0.95 for 2 minutes on \'[Pathpoint] Order Processing Apdex\''
    }
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-[80%] bg-background-primary shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background-primary border-b border-border px-8 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-text-primary">Active issue</h2>
          <div className="flex items-center gap-3">
            <Button variant="default" className="bg-accent-blue hover:bg-accent-blue/90">
              Declare an incident
            </Button>
            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-background-tertiary transition-colors"
            >
              <X className="h-5 w-5 text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-6">
          {/* Issue Header */}
          <div>
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="destructive" className="text-xs">
                  {issue.severity}
                </Badge>
                <span className="text-sm text-text-muted">
                  Created: Sep 12, 2024, 8:35pm
                </span>
                <span className="text-sm text-text-muted">Duration: 1m</span>
                <span className="text-sm text-text-muted">
                  Last updated: Sep 12, 2024, 8:35pm
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-text-muted">Current stage:</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-primary">Issue created</span>
                  <Button variant="default" size="sm" className="bg-accent-blue">
                    Acknowledge
                  </Button>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-text-primary mb-3">
              {issue.title}
            </h3>

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-text-muted">Source</span>
                <Badge variant="secondary" className="text-xs">New Relic</Badge>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-text-muted">Notified</span>
                <Badge variant="secondary" className="text-xs">Slack</Badge>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-text-muted">Issue payload</span>
                <Badge variant="secondary" className="text-xs">pd92839</Badge>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-text-muted">#channel_name</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-text-muted">SN-294923</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-text-muted">NR-39283948</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 text-sm font-semibold transition-colors ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-accent-blue text-accent-blue'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('rca')}
                className={`pb-3 text-sm font-semibold transition-colors ${
                  activeTab === 'rca'
                    ? 'border-b-2 border-accent-blue text-accent-blue'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                Root cause analysis
              </button>
            </div>
          </div>

          {/* Overview Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* AI Summary */}
              <div className="rounded-lg border border-border bg-background-secondary p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-text-primary">AI summary</span>
                  <Badge variant="default" className="text-xs">Beta</Badge>
                </div>
              </div>

              {/* Alert Events */}
              <div className="rounded-lg border border-border bg-background-secondary">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-background-tertiary transition-colors"
                  onClick={() => setAlertEventsExpanded(!alertEventsExpanded)}
                >
                  <div className="flex items-center gap-2">
                    <ChevronDown
                      className={`h-5 w-5 text-text-muted transition-transform ${
                        alertEventsExpanded ? 'rotate-180' : ''
                      }`}
                    />
                    <span className="font-semibold text-text-primary">
                      Alert events ({mockAlertEvents.length})
                    </span>
                  </div>
                  <div className="text-sm text-text-muted">
                    Sort by: <span className="text-text-primary">Newest to oldest</span>
                  </div>
                </div>

                {alertEventsExpanded && (
                  <div className="border-t border-border">
                    {/* Alert List */}
                    <div className="flex">
                      <div className="w-80 border-r border-border">
                        {mockAlertEvents.map((alert, idx) => (
                          <div
                            key={alert.id}
                            className={`p-4 border-b border-border cursor-pointer transition-colors ${
                              idx === 0 ? 'bg-accent-blue/5 border-l-4 border-l-accent-blue' : 'hover:bg-background-tertiary'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="destructive" className="text-xs">
                                {alert.severity}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {alert.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-text-primary mb-2 line-clamp-2">
                              {alert.title}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-text-muted">
                              <div className="flex items-center gap-1">
                                <span>Opened:</span>
                                <span>{alert.opened}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{alert.duration}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Alert Detail */}
                      <div className="flex-1 p-6">
                        <div className="mb-4">
                          <Badge variant="destructive" className="mb-2">Critical</Badge>
                          <div className="mb-2 text-sm">
                            Alert event <span className="font-semibold">closed</span> on Sep 12, 2024 8:40pm
                          </div>
                          <div className="text-sm font-semibold">Duration: 6m</div>
                        </div>

                        <h4 className="text-base font-semibold text-text-primary mb-4">
                          {mockAlertEvents[0].title}
                        </h4>

                        <div className="mb-4 space-y-2">
                          <div className="flex gap-4">
                            <span className="text-sm text-text-muted">Description:</span>
                            <span className="text-sm text-accent-blue cursor-pointer">
                              {mockAlertEvents[0].description}
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <span className="text-sm text-text-muted">Alert policy:</span>
                            <span className="text-sm text-accent-blue cursor-pointer">
                              {mockAlertEvents[0].policy}
                            </span>
                            <span className="text-sm text-text-muted">Alert condition:</span>
                            <span className="text-sm text-accent-blue cursor-pointer">
                              {mockAlertEvents[0].condition}
                            </span>
                          </div>
                        </div>

                        {/* Query */}
                        <div className="mb-6 rounded-lg bg-background-tertiary p-3 font-mono text-xs">
                          <div className="text-accent-red">FROM</div>
                          <div className="text-text-primary">{mockAlertEvents[0].query}</div>
                        </div>

                        {/* Chart */}
                        <div className="mb-4">
                          <div className="mb-2 flex items-center justify-end">
                            <button className="text-xs text-accent-blue flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Event time range
                            </button>
                          </div>
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={mockTimeSeriesData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                              <XAxis
                                dataKey="time"
                                tick={{ fill: '#94a3b8', fontSize: 11 }}
                                stroke="#475569"
                              />
                              <YAxis
                                tick={{ fill: '#94a3b8', fontSize: 11 }}
                                stroke="#475569"
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: '#1e293b',
                                  border: '1px solid #334155',
                                  borderRadius: '6px',
                                }}
                                labelStyle={{ color: '#e2e8f0' }}
                              />
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#f87171"
                                strokeWidth={2}
                                fill="#f87171"
                                fillOpacity={0.1}
                                dot={{ fill: '#f87171', r: 3 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Entity Info */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-2 w-2 rounded-full bg-accent-red" />
                            <span className="text-sm font-semibold text-text-primary">
                              host-proxy-west-1
                            </span>
                          </div>
                          <div className="text-sm text-text-muted mb-3">Entity type: INFRA</div>
                        </div>

                        {/* Tags */}
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-semibold text-text-primary">
                              Tags ({mockTags.length})
                            </span>
                            <button className="text-sm text-accent-blue">Show all</button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {mockTags.map((tag, idx) => (
                              <Badge key={idx} variant="default" className="text-xs bg-accent-blue/10 text-accent-blue">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Issue Timeline & Event Log */}
              <div className="rounded-lg border border-border bg-background-secondary">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-background-tertiary transition-colors"
                  onClick={() => setTimelineExpanded(!timelineExpanded)}
                >
                  <div className="flex items-center gap-2">
                    <ChevronDown
                      className={`h-5 w-5 text-text-muted transition-transform ${
                        timelineExpanded ? 'rotate-180' : ''
                      }`}
                    />
                    <span className="font-semibold text-text-primary">Issue timeline & event log</span>
                  </div>
                </div>

                {timelineExpanded && (
                  <div className="border-t border-border p-6">
                    <div className="mb-4 text-sm font-semibold text-text-primary">
                      4 incidents • 2 Active • 2 Resolved
                    </div>
                    {/* Timeline visualization would go here */}
                    <div className="space-y-3">
                      {mockTimelineEvents.map((event, idx) => (
                        <div key={idx} className="flex gap-4 text-sm">
                          <div className="text-text-muted whitespace-nowrap">{event.time}</div>
                          <div className="flex-1">
                            <div className="font-semibold text-accent-orange">{event.type}</div>
                            <div className="text-text-primary">{event.service}</div>
                            <div className="text-text-muted">{event.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Impacted Entities */}
              <div className="rounded-lg border border-border bg-background-secondary">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-background-tertiary transition-colors"
                  onClick={() => setImpactedEntitiesExpanded(!impactedEntitiesExpanded)}
                >
                  <div className="flex items-center gap-2">
                    <ChevronDown
                      className={`h-5 w-5 text-text-muted transition-transform ${
                        impactedEntitiesExpanded ? 'rotate-180' : ''
                      }`}
                    />
                    <span className="font-semibold text-text-primary">Impacted entities (1)</span>
                  </div>
                </div>

                {impactedEntitiesExpanded && (
                  <div className="border-t border-border p-6">
                    <div className="text-sm text-text-muted">
                      Service map and entity relationships would be displayed here
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Root Cause Analysis Tab */}
          {activeTab === 'rca' && (
            <div className="text-center py-12">
              <p className="text-text-muted">Root cause analysis content would appear here</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
