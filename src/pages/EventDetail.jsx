import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, AlertCircle, Server, Clock, TrendingDown, CheckCircle, AlertTriangle } from 'lucide-react'
import Layout from '../components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { getOperationalEvent } from '../data/mockData'
import { formatRelativeTime } from '../lib/utils'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = getOperationalEvent(id)
  const [activeTab, setActiveTab] = useState('overview')

  if (!event) {
    return (
      <Layout>
        <div className="text-center text-text-muted">Event not found</div>
      </Layout>
    )
  }

  const severityColors = {
    critical: '#f87171',
    high: '#fb923c',
    medium: '#fbbf24',
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-3">
            <Button variant="default" className="bg-accent-blue hover:bg-accent-blue/90">
              Investigate
            </Button>
            <Button variant="outline">
              Noise Reduction Settings
            </Button>
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
              Root Cause Analysis
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Header */}
            <div className="rounded-lg border border-border bg-background-secondary p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className="rounded-lg p-3"
                    style={{ backgroundColor: `${severityColors[event.severity]}20` }}
                  >
                    <AlertCircle className="h-6 w-6" style={{ color: severityColors[event.severity] }} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="destructive">{event.severity}</Badge>
                      <Badge variant={event.status === 'active' ? 'warning' : 'default'}>
                        {event.status}
                      </Badge>
                    </div>
                    <h1 className="text-2xl font-bold text-text-primary">{event.title}</h1>
                    <p className="mt-2 text-text-secondary">{event.description}</p>
                  </div>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(event.metrics).map(([key, value]) => (
                  <div key={key} className="rounded-lg bg-background-tertiary p-4">
                    <div className="text-xs font-semibold uppercase text-text-muted">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="mt-2 text-2xl font-bold text-text-primary">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Actions & Affected Services Side by Side */}
            <div className="grid grid-cols-2 gap-6">
              {/* Recommended Actions - Left */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent-blue" />
                    Recommended Investigation Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2.5">
                    {event.recommendedActions.map((action, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-lg border border-border bg-background-tertiary p-3"
                      >
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-blue/20 text-xs font-semibold text-accent-blue">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-text-primary">{action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Affected Services - Right */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-accent-cyan" />
                    Affected Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2.5">
                    {event.serviceBreakdown.map((service) => (
                      <div
                        key={service.name}
                        className="rounded-lg border border-border bg-background-tertiary p-3"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Server className="h-4 w-4 text-accent-cyan" />
                            <span className="font-semibold text-text-primary">{service.name}</span>
                            <Badge
                              variant={service.severity === 'critical' ? 'destructive' : service.severity === 'high' ? 'warning' : 'default'}
                              className="text-xs"
                            >
                              {service.severity}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-xs text-text-muted">Issues</div>
                              <div className="text-sm font-semibold text-text-primary">{service.issueCount}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-text-muted">Error Rate</div>
                              <div className="text-sm font-semibold text-accent-red">{service.errorRate}</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-text-muted">
                          {service.topIssue} • {service.entities.length} {service.entities.length === 1 ? 'entity' : 'entities'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Noise Reduction & Suppressed Issues */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-accent-green" />
                    Noise Reduction Impact
                  </CardTitle>
                  <Badge variant="success" className="text-sm">
                    {event.suppressedIssues.length} issues correlated into 1 notification
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Top Section: Metrics + Timeline */}
                <div className="grid grid-cols-[300px_1fr] gap-8">
                  {/* Left: Data Points */}
                  <div className="space-y-5">
                    <div>
                      <div className="text-xs font-semibold uppercase text-text-muted">Issues Suppressed</div>
                      <div className="text-2xl font-bold text-accent-green">
                        {event.consolidatedNotifications}
                      </div>
                      <div className="mt-0.5 text-xs text-text-muted">
                        individual alerts correlated
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase text-text-muted">Reduction Percentage</div>
                      <div className="text-2xl font-bold text-text-primary">
                        {((event.consolidatedNotifications / (event.consolidatedNotifications + 1)) * 100).toFixed(1)}%
                      </div>
                      <div className="mt-0.5 text-xs text-text-muted">
                        fewer notifications sent
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase text-text-muted">Stabilization Window</div>
                      <div className="text-2xl font-bold text-text-primary">
                        {event.stabilizationWindow}s
                      </div>
                      <div className="mt-0.5 text-xs text-text-muted">
                        before notification
                      </div>
                    </div>
                  </div>

                  {/* Right: Timeline Chart */}
                  <div>
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-text-primary">Issue Accumulation Timeline</div>
                      <div className="text-xs text-text-muted">
                        How issues accumulated over time before correlation
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={event.timeSeriesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis
                          dataKey="time"
                          tick={{ fill: '#94a3b8', fontSize: 12 }}
                          stroke="#475569"
                        />
                        <YAxis
                          label={{ value: 'Total Issues', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                          tick={{ fill: '#94a3b8', fontSize: 12 }}
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
                          dataKey="issues"
                          stroke={severityColors[event.severity]}
                          strokeWidth={2}
                          dot={{ fill: severityColors[event.severity], r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bottom Section: Suppressed Issues Table */}
                <div>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <AlertTriangle className="h-4 w-4 text-accent-orange" />
                      All Suppressed Issues ({event.suppressedIssues.length})
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-border">
                    {/* Table Header */}
                    <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 border-b border-border bg-background-tertiary px-4 py-3 text-xs font-semibold uppercase text-text-muted">
                      <div className="w-2"></div>
                      <div>Issue</div>
                      <div>Service</div>
                      <div>Entity</div>
                      <div>Source</div>
                      <div>Time</div>
                    </div>

                    {/* Table Body */}
                    <div className="max-h-[500px] divide-y divide-border overflow-y-auto">
                      {event.suppressedIssues.map((issue) => {
                        const issueColors = {
                          critical: { dot: 'bg-accent-red', bg: 'bg-accent-red/10' },
                          high: { dot: 'bg-accent-orange', bg: 'bg-accent-orange/10' },
                          medium: { dot: 'bg-accent-yellow', bg: 'bg-accent-yellow/10' },
                        }

                        const config = issueColors[issue.severity]

                        return (
                          <div
                            key={issue.id}
                            className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-4 py-3 text-sm hover:bg-background-tertiary"
                          >
                            {/* Severity Dot */}
                            <div className="flex items-center">
                              <div className={`h-2 w-2 rounded-full ${config.dot}`} />
                            </div>

                            {/* Issue Title */}
                            <div className="truncate text-text-primary">{issue.title}</div>

                            {/* Service */}
                            <div>
                              <Badge variant="default" className="text-xs">
                                {issue.service}
                              </Badge>
                            </div>

                            {/* Entity */}
                            <div className="truncate text-text-muted">{issue.entity}</div>

                            {/* Source */}
                            <div className="text-text-muted">{issue.source}</div>

                            {/* Time */}
                            <div className="text-text-muted">{formatRelativeTime(issue.timestamp)}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Root Cause Analysis Tab */}
        {activeTab === 'rca' && (
          <div className="rounded-lg border border-border bg-background-secondary p-8">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-text-muted" />
              <h3 className="mt-4 text-lg font-semibold text-text-primary">
                Root Cause Analysis
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                RCA functionality will be available here in a future update.
              </p>
            </div>
          </div>
        )}

      </div>
    </Layout>
  )
}
