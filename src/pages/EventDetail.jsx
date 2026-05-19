import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, AlertCircle, Server, Clock, TrendingDown, CheckCircle, AlertTriangle, Bell, TrendingUp, FileEdit, Milestone, ChevronDown } from 'lucide-react'
import Layout from '../components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { getOperationalEvent } from '../data/mockData'
import { formatRelativeTime } from '../lib/utils'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import IssueDetailModal from '../components/IssueDetailModal'

// Mock milestone data
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
    position: 5
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
  { color: '#60a5fa', width: 15, label: 'Low' },
  { color: '#fbbf24', width: 25, label: 'Elevated' },
  { color: '#fb923c', width: 45, label: 'High' },
  { color: '#f87171', width: 15, label: 'Critical' }
]

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = getOperationalEvent(id)
  const [activeTab, setActiveTab] = useState('overview')
  const [isMilestonesExpanded, setIsMilestonesExpanded] = useState(false)
  const [hoveredMilestone, setHoveredMilestone] = useState(null)
  const [selectedGroupBy, setSelectedGroupBy] = useState('golden-signals')
  const [selectedRule, setSelectedRule] = useState('all')
  const [selectedService, setSelectedService] = useState('all')
  const [selectedSeverity, setSelectedSeverity] = useState('all')
  const [openDropdown, setOpenDropdown] = useState(null)
  const [selectedIssue, setSelectedIssue] = useState(null)

  if (!event) {
    return (
      <Layout>
        <div className="text-center text-text-muted">Event not found</div>
      </Layout>
    )
  }

  // Extract unique values for filters
  const uniqueServices = ['all', ...new Set(event.suppressedIssues.map(i => i.service))]
  const uniqueSeverities = ['all', ...new Set(event.suppressedIssues.map(i => i.severity))]
  const uniqueRules = ['all', ...new Set(event.suppressedIssues.map(i => i.correlationRule))]

  // Filter logic - apply all filters together
  const getFilteredIssues = () => {
    return event.suppressedIssues.filter(issue => {
      const ruleMatch = selectedRule === 'all' || issue.correlationRule === selectedRule
      const serviceMatch = selectedService === 'all' || issue.service === selectedService
      const severityMatch = selectedSeverity === 'all' || issue.severity === selectedSeverity
      return ruleMatch && serviceMatch && severityMatch
    })
  }

  const filteredIssues = getFilteredIssues()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('.relative')) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openDropdown])

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

            {/* Operational Event Maturity Milestones */}
            <Card className="p-0">
              <CardHeader
                className="cursor-pointer hover:bg-background-tertiary transition-colors p-6"
                onClick={() => setIsMilestonesExpanded(!isMilestonesExpanded)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ChevronDown
                      className={`h-5 w-5 text-text-muted transition-transform ${
                        isMilestonesExpanded ? 'rotate-180' : ''
                      }`}
                    />
                    <Milestone className="h-5 w-5 text-accent-purple" />
                    Operational Event Maturity Milestones
                  </CardTitle>
                </div>
              </CardHeader>

              {isMilestonesExpanded && (
                <CardContent className="px-8 pt-8 pb-32">
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
              )}
            </Card>

            {/* Recommended Actions & Affected Services Side by Side */}
            <div className="grid grid-cols-2 gap-6">
              {/* Recommended Actions - Left */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent-blue" />
                    Recommended Investigation Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2.5">
                    {event.recommendedActions.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-lg border border-border bg-background-tertiary p-3 min-h-[85px]"
                      >
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-blue/20 text-xs font-semibold text-accent-blue">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-text-primary">{item.action}</p>
                          <p className="mt-1 text-xs text-text-muted">{item.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Affected Services - Right */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-accent-cyan" />
                    Impacted Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2.5">
                    {event.serviceBreakdown.map((service) => (
                      <div
                        key={service.name}
                        className="rounded-lg border border-border bg-background-tertiary p-3 min-h-[85px]"
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
                <div className="grid grid-cols-[220px_1fr] gap-8">
                  {/* Left: Data Points */}
                  <div className="flex flex-col justify-between" style={{ height: '250px' }}>
                    <div>
                      <div className="text-xs font-semibold uppercase text-text-muted">Issues Suppressed</div>
                      <div className="text-xl font-bold text-accent-green">
                        {event.consolidatedNotifications}
                      </div>
                      <div className="mt-0.5 text-xs text-text-muted">
                        individual alerts correlated
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase text-text-muted">Reduction Percentage</div>
                      <div className="text-xl font-bold text-text-primary">
                        {((event.consolidatedNotifications / (event.consolidatedNotifications + 1)) * 100).toFixed(1)}%
                      </div>
                      <div className="mt-0.5 text-xs text-text-muted">
                        fewer notifications sent
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase text-text-muted">Stabilization Window</div>
                      <div className="text-xl font-bold text-text-primary">
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
                  {/* Heading */}
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
                    <AlertTriangle className="h-4 w-4 text-accent-orange" />
                    Contributing Signals ({filteredIssues.length})
                  </div>

                  {/* Filter Bar */}
                  <div className="mb-4 flex items-center gap-4">
                    {/* Primary Filter (Dropdown) */}
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedGroupBy}
                        onChange={(e) => setSelectedGroupBy(e.target.value)}
                        className="rounded-md border border-border bg-background-secondary px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
                      >
                        <option value="golden-signals">Golden signals</option>
                        <option value="components">Components</option>
                        <option value="scope">Scope</option>
                      </select>
                    </div>

                    {/* Vertical Divider */}
                    <div className="h-6 w-px bg-border" />

                    {/* Secondary Filters (Pills with Dropdown) */}
                    <div className="flex items-center gap-2">
                      {/* Rules Filter */}
                      <div className="relative">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === 'rule' ? null : 'rule')}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                            selectedRule !== 'all'
                              ? 'border-accent-blue bg-accent-blue/10 text-accent-blue'
                              : 'border-border bg-background-tertiary text-text-secondary hover:border-accent-blue/50'
                          }`}
                        >
                          Rules = {selectedRule === 'all' ? 'All' : selectedRule}
                        </button>
                        {openDropdown === 'rule' && (
                          <div className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-border bg-background-secondary shadow-lg z-50">
                            <div className="max-h-60 overflow-y-auto p-1">
                              {uniqueRules.map((rule) => (
                                <button
                                  key={rule}
                                  onClick={() => {
                                    setSelectedRule(rule)
                                    setOpenDropdown(null)
                                  }}
                                  className={`w-full rounded px-3 py-2 text-left text-sm transition-colors ${
                                    selectedRule === rule
                                      ? 'bg-accent-blue/10 text-accent-blue font-medium'
                                      : 'text-text-primary hover:bg-background-tertiary'
                                  }`}
                                >
                                  {rule === 'all' ? 'All' : rule}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Service Filter */}
                      <div className="relative">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === 'service' ? null : 'service')}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                            selectedService !== 'all'
                              ? 'border-accent-blue bg-accent-blue/10 text-accent-blue'
                              : 'border-border bg-background-tertiary text-text-secondary hover:border-accent-blue/50'
                          }`}
                        >
                          Service = {selectedService === 'all' ? 'All' : selectedService}
                        </button>
                        {openDropdown === 'service' && (
                          <div className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-border bg-background-secondary shadow-lg z-50">
                            <div className="max-h-60 overflow-y-auto p-1">
                              {uniqueServices.map((service) => (
                                <button
                                  key={service}
                                  onClick={() => {
                                    setSelectedService(service)
                                    setOpenDropdown(null)
                                  }}
                                  className={`w-full rounded px-3 py-2 text-left text-sm transition-colors ${
                                    selectedService === service
                                      ? 'bg-accent-blue/10 text-accent-blue font-medium'
                                      : 'text-text-primary hover:bg-background-tertiary'
                                  }`}
                                >
                                  {service === 'all' ? 'All' : service}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Severity Filter */}
                      <div className="relative">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === 'severity' ? null : 'severity')}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                            selectedSeverity !== 'all'
                              ? 'border-accent-blue bg-accent-blue/10 text-accent-blue'
                              : 'border-border bg-background-tertiary text-text-secondary hover:border-accent-blue/50'
                          }`}
                        >
                          Severity = {selectedSeverity === 'all' ? 'All' : selectedSeverity}
                        </button>
                        {openDropdown === 'severity' && (
                          <div className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-border bg-background-secondary shadow-lg z-50">
                            <div className="max-h-60 overflow-y-auto p-1">
                              {uniqueSeverities.map((severity) => (
                                <button
                                  key={severity}
                                  onClick={() => {
                                    setSelectedSeverity(severity)
                                    setOpenDropdown(null)
                                  }}
                                  className={`w-full rounded px-3 py-2 text-left text-sm transition-colors ${
                                    selectedSeverity === severity
                                      ? 'bg-accent-blue/10 text-accent-blue font-medium'
                                      : 'text-text-primary hover:bg-background-tertiary'
                                  }`}
                                >
                                  {severity === 'all' ? 'All' : severity}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-border bg-background-secondary">
                    <div className="max-h-[500px] overflow-y-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border bg-background-tertiary">
                            <th className="w-8 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                              {/* Severity Dot Column */}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                              Signal
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                              Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                              Service
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                              Entity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                              Time
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {filteredIssues.map((issue) => {
                            const issueColors = {
                              critical: { dot: 'bg-accent-red', bg: 'bg-accent-red/10' },
                              high: { dot: 'bg-accent-orange', bg: 'bg-accent-orange/10' },
                              medium: { dot: 'bg-accent-yellow', bg: 'bg-accent-yellow/10' },
                            }

                            const config = issueColors[issue.severity]

                            return (
                              <tr
                                key={issue.id}
                                className="cursor-pointer transition-colors hover:bg-background-tertiary"
                                onClick={() => setSelectedIssue(issue)}
                              >
                                {/* Severity Dot */}
                                <td className="px-6 py-4">
                                  <div className={`h-2 w-2 rounded-full ${config.dot}`} />
                                </td>

                                {/* Signal Title */}
                                <td className="px-6 py-4">
                                  <div className="text-sm text-text-primary">{issue.title}</div>
                                </td>

                                {/* Type */}
                                <td className="px-6 py-4">
                                  <Badge variant="secondary" className="text-xs">
                                    {issue.type || 'Issue'}
                                  </Badge>
                                </td>

                                {/* Service */}
                                <td className="px-6 py-4">
                                  <Badge variant="default" className="text-xs">
                                    {issue.service}
                                  </Badge>
                                </td>

                                {/* Entity */}
                                <td className="px-6 py-4">
                                  <div className="text-sm text-text-muted">{issue.entity}</div>
                                </td>

                                {/* Time */}
                                <td className="px-6 py-4">
                                  <div className="text-sm text-text-muted">{formatRelativeTime(issue.timestamp)}</div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
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

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <IssueDetailModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}
    </Layout>
  )
}
