// Helper functions for timestamps
const minutesAgo = (mins) => Date.now() - mins * 60 * 1000
const hoursAgo = (hours) => Date.now() - hours * 60 * 60 * 1000
const daysAgo = (days) => Date.now() - days * 24 * 60 * 60 * 1000

// Helper function to generate suppressed issues
const generateSuppressedIssues = (count, services, baseSeverity) => {
  const issueTypes = [
    'High error rate',
    'Service timeout',
    'Connection failed',
    'Response time exceeded',
    'Memory threshold exceeded',
    'CPU usage spike',
    '5xx error rate increased',
    'Database query timeout',
    'API endpoint failure',
    'Health check failed'
  ]

  const severities = ['critical', 'high', 'medium']
  const issues = []

  for (let i = 0; i < count; i++) {
    const service = services[Math.floor(Math.random() * services.length)]
    const issueType = issueTypes[Math.floor(Math.random() * issueTypes.length)]
    const severity = i < count * 0.3 ? baseSeverity : severities[Math.floor(Math.random() * severities.length)]
    const minutesAgoRandom = Math.floor(Math.random() * 30) + 1

    issues.push({
      id: `issue-${i + 1}`,
      title: `${issueType} in ${service}`,
      service: service,
      severity: severity,
      timestamp: minutesAgo(minutesAgoRandom),
      source: 'New Relic Alerts',
      condition: `${issueType}`,
      entity: `${service}-prod-${Math.floor(Math.random() * 5) + 1}`
    })
  }

  // Sort by timestamp (most recent first)
  return issues.sort((a, b) => b.timestamp - a.timestamp)
}

// ============================================
// OPERATIONAL EVENTS (What Needs Attention)
// ============================================
export const operationalEvents = [
  {
    id: 'event-1',
    title: 'Deployment-related operational event detected',
    description: 'Checkout and payment services experiencing failures following v2.4.1 deployment',
    severity: 'critical',
    affectedServices: ['checkout', 'payment', 'auth'],
    consolidatedNotifications: 147,
    timestamp: minutesAgo(23),
    status: 'active',
    confidence: 94,
    stabilizationWindow: 45, // seconds
    metrics: {
      impactedUsers: '12.3K',
      failedTransactions: 3420,
      revenueImpact: '$45K/hr',
      serviceDowntime: '23m'
    },
    serviceBreakdown: [
      {
        name: 'payment',
        issueCount: 67,
        errorRate: '42%',
        severity: 'critical',
        topIssue: 'High error rate in payment',
        entities: ['payment-prod-1', 'payment-prod-3', 'payment-prod-5']
      },
      {
        name: 'checkout',
        issueCount: 52,
        errorRate: '38%',
        severity: 'critical',
        topIssue: 'Service timeout in checkout',
        entities: ['checkout-prod-1', 'checkout-prod-2']
      },
      {
        name: 'auth',
        issueCount: 28,
        errorRate: '15%',
        severity: 'high',
        topIssue: 'Connection failed in auth',
        entities: ['auth-prod-1', 'auth-prod-4']
      }
    ],
    recommendedActions: [
      'Check recent deployment logs for payment-service v2.4.1',
      'Review configuration changes in the latest deployment',
      'Compare current deployment manifest with previous stable version',
      'Check for any database migration failures or schema issues'
    ],
    suppressedIssues: generateSuppressedIssues(147, ['checkout', 'payment', 'auth'], 'critical'),
    timeSeriesData: [
      { time: 'Mon', issues: 18 },
      { time: 'Tue', issues: 42 },
      { time: 'Wed', issues: 23 },
      { time: 'Thu', issues: 67 },
      { time: 'Fri', issues: 89 },
      { time: 'Sat', issues: 54 },
      { time: 'Sun', issues: 147 }
    ]
  },
  {
    id: 'event-2',
    title: 'Infrastructure saturation affecting customer latency',
    description: 'Database connection pool exhaustion causing cascading latency across multiple services',
    severity: 'high',
    affectedServices: ['database', 'api-gateway', 'user-service', 'order-service'],
    consolidatedNotifications: 89,
    timestamp: hoursAgo(1.5),
    status: 'active',
    confidence: 87,
    stabilizationWindow: 30,
    metrics: {
      avgLatency: '2.4s',
      p95Latency: '8.7s',
      affectedRequests: '28.5K',
      serviceCount: 4
    },
    serviceBreakdown: [
      {
        name: 'database',
        issueCount: 34,
        errorRate: '12%',
        severity: 'high',
        topIssue: 'Database query timeout',
        entities: ['database-primary-prod', 'database-replica-2']
      },
      {
        name: 'api-gateway',
        issueCount: 28,
        errorRate: '8%',
        severity: 'high',
        topIssue: 'Response time exceeded in api-gateway',
        entities: ['api-gateway-prod-1', 'api-gateway-prod-3']
      },
      {
        name: 'user-service',
        issueCount: 15,
        errorRate: '5%',
        severity: 'medium',
        topIssue: 'Service timeout in user-service',
        entities: ['user-service-prod-2']
      },
      {
        name: 'order-service',
        issueCount: 12,
        errorRate: '4%',
        severity: 'medium',
        topIssue: 'Connection failed in order-service',
        entities: ['order-service-prod-1']
      }
    ],
    recommendedActions: [
      'Review database connection pool configuration and current usage',
      'Check for slow queries or long-running transactions',
      'Monitor database CPU and memory utilization',
      'Consider scaling database connection pool size if needed'
    ],
    suppressedIssues: generateSuppressedIssues(89, ['database', 'api-gateway', 'user-service', 'order-service'], 'high'),
    timeSeriesData: [
      { time: 'Mon', issues: 15 },
      { time: 'Tue', issues: 23 },
      { time: 'Wed', issues: 34 },
      { time: 'Thu', issues: 28 },
      { time: 'Fri', issues: 61 },
      { time: 'Sat', issues: 48 },
      { time: 'Sun', issues: 89 }
    ]
  },
  {
    id: 'event-3',
    title: 'Payment degradation spreading across services',
    description: 'External payment provider timeout causing cascading failures',
    severity: 'high',
    affectedServices: ['payment', 'checkout', 'billing'],
    consolidatedNotifications: 62,
    timestamp: hoursAgo(0.5),
    status: 'investigating',
    confidence: 91,
    stabilizationWindow: 60,
    metrics: {
      failureRate: '42%',
      affectedOrders: '1.2K',
      avgResponseTime: '15s',
      timeoutCount: 1847
    },
    serviceBreakdown: [
      {
        name: 'payment',
        issueCount: 31,
        errorRate: '42%',
        severity: 'high',
        topIssue: 'Service timeout in payment',
        entities: ['payment-prod-2', 'payment-prod-4']
      },
      {
        name: 'checkout',
        issueCount: 20,
        errorRate: '28%',
        severity: 'high',
        topIssue: 'API endpoint failure in checkout',
        entities: ['checkout-prod-3']
      },
      {
        name: 'billing',
        issueCount: 11,
        errorRate: '18%',
        severity: 'medium',
        topIssue: 'Response time exceeded in billing',
        entities: ['billing-prod-1']
      }
    ],
    recommendedActions: [
      'Check external payment provider status page for outages',
      'Review payment service timeout configurations',
      'Verify network connectivity to payment provider endpoints',
      'Check payment API rate limits and current usage'
    ],
    suppressedIssues: generateSuppressedIssues(62, ['payment', 'checkout', 'billing'], 'high'),
    timeSeriesData: [
      { time: 'Mon', issues: 11 },
      { time: 'Tue', issues: 19 },
      { time: 'Wed', issues: 8 },
      { time: 'Thu', issues: 28 },
      { time: 'Fri', issues: 39 },
      { time: 'Sat', issues: 22 },
      { time: 'Sun', issues: 62 }
    ]
  }
]

// ============================================
// NOTIFICATION REDUCTION SUMMARY
// ============================================
export const notificationReduction = {
  currentPeriod: {
    label: 'Last 24 Hours',
    totalSignals: 2847,
    operationalEvents: 12,
    notificationsConsolidated: 2835,
    reductionPercentage: 99.6,
    avgNotificationsPerEvent: 236
  },
  comparisonPeriod: {
    label: 'Previous 24 Hours',
    totalSignals: 3142,
    notificationsIssued: 3089
  },
  weeklyTrend: [
    { day: 'Mon', signals: 2940, consolidated: 2918 },
    { day: 'Tue', signals: 3142, consolidated: 3089 },
    { day: 'Wed', signals: 2756, consolidated: 2723 },
    { day: 'Thu', signals: 2889, consolidated: 2854 },
    { day: 'Fri', signals: 3201, consolidated: 3168 },
    { day: 'Sat', signals: 2544, consolidated: 2511 },
    { day: 'Sun', signals: 2847, consolidated: 2835 }
  ],
  orchestrationMetrics: {
    avgStabilizationWindow: 38, // seconds
    clusterActivationRate: 94, // percentage
    orchestrationConfidence: 89, // percentage
    falsePositiveRate: 2.3 // percentage
  }
}

// ============================================
// TOP AFFECTED ENTITIES
// ============================================
export const topAffectedEntities = [
  {
    id: 'entity-1',
    name: 'payment-service-prod-3',
    service: 'payment',
    totalSuppressions: 1847,
    weeklyTrend: [
      { day: 'Mon', suppressions: 234 },
      { day: 'Tue', suppressions: 289 },
      { day: 'Wed', suppressions: 312 },
      { day: 'Thu', suppressions: 276 },
      { day: 'Fri', suppressions: 298 },
      { day: 'Sat', suppressions: 201 },
      { day: 'Sun', suppressions: 237 }
    ],
    topServices: ['payment', 'checkout', 'billing'],
    avgSeverity: 'high',
    lastIncident: hoursAgo(0.5)
  },
  {
    id: 'entity-2',
    name: 'checkout-service-prod-1',
    service: 'checkout',
    totalSuppressions: 1423,
    weeklyTrend: [
      { day: 'Mon', suppressions: 198 },
      { day: 'Tue', suppressions: 215 },
      { day: 'Wed', suppressions: 187 },
      { day: 'Thu', suppressions: 223 },
      { day: 'Fri', suppressions: 241 },
      { day: 'Sat', suppressions: 176 },
      { day: 'Sun', suppressions: 183 }
    ],
    topServices: ['checkout', 'payment', 'auth'],
    avgSeverity: 'critical',
    lastIncident: minutesAgo(23)
  },
  {
    id: 'entity-3',
    name: 'database-primary-prod',
    service: 'database',
    totalSuppressions: 1156,
    weeklyTrend: [
      { day: 'Mon', suppressions: 156 },
      { day: 'Tue', suppressions: 171 },
      { day: 'Wed', suppressions: 189 },
      { day: 'Thu', suppressions: 168 },
      { day: 'Fri', suppressions: 142 },
      { day: 'Sat', suppressions: 165 },
      { day: 'Sun', suppressions: 165 }
    ],
    topServices: ['database', 'api-gateway', 'user-service', 'order-service'],
    avgSeverity: 'high',
    lastIncident: hoursAgo(1.5)
  }
]

// ============================================
// WHAT CHANGED RECENTLY
// ============================================
export const recentChanges = [
  {
    id: 'change-1',
    type: 'pattern_increase',
    title: 'Deployment-related failures increased',
    change: '+180%',
    description: 'Deployment correlation pattern coverage increased from 12% to 34%',
    severity: 'critical',
    trend: 'up',
    detectedAt: hoursAgo(2),
    baseline: {
      period: '7-day rolling',
      previousValue: 12,
      currentValue: 34,
      threshold: 20 // ±20% change threshold
    }
  },
  {
    id: 'change-2',
    type: 'velocity_increase',
    title: 'Database latency propagation velocity increased',
    change: '+65%',
    description: 'Latency issues now propagating to downstream services 65% faster',
    severity: 'high',
    trend: 'up',
    detectedAt: hoursAgo(4),
    baseline: {
      period: '7-day rolling',
      previousValue: 45, // seconds to propagate
      currentValue: 15.75,
      threshold: 20
    }
  },
  {
    id: 'change-3',
    type: 'blast_radius_expansion',
    title: 'Payment failures expanded to 3 additional services',
    change: '+3 services',
    description: 'Payment failure operational blast radius expanded beyond initial scope',
    severity: 'medium',
    trend: 'up',
    detectedAt: hoursAgo(6),
    baseline: {
      period: 'Current incident',
      previousValue: 1,
      currentValue: 4,
      threshold: 2
    }
  }
]


// ============================================
// ORCHESTRATION RULES (User-defined intent)
// ============================================
export const orchestrationRules = [
  {
    id: 'rule-1',
    name: 'Deployment + Service Failures',
    description: 'Treat deployment events with service failures as same operational context',
    enabled: true,
    conditions: {
      timeWindow: '5 minutes',
      signals: ['deployment', 'service_failure', 'error_rate_spike'],
      threshold: 'any combination'
    },
    performance: {
      matchCount: 147,
      accuracy: 94,
      falsePositives: 3,
      avgStabilizationTime: 42 // seconds
    }
  },
  {
    id: 'rule-2',
    name: 'Database Latency Cascade',
    description: 'Latency + downstream service impact = operational context',
    enabled: true,
    conditions: {
      timeWindow: '3 minutes',
      signals: ['database_latency', 'service_latency', 'timeout'],
      threshold: '≥3 services'
    },
    performance: {
      matchCount: 89,
      accuracy: 87,
      falsePositives: 2,
      avgStabilizationTime: 38
    }
  }
]

// ============================================
// CLUSTER ACTIVATION EVENTS (Internal tracking)
// ============================================
export const clusterActivations = [
  {
    clusterId: 'cluster-abc123',
    activatedAt: minutesAgo(23),
    activationReason: 'Threshold reached: 147 correlated issues, confidence 94%',
    thresholdsMet: {
      issueCount: { threshold: 20, actual: 147 },
      confidence: { threshold: 85, actual: 94 },
      serviceCount: { threshold: 3, actual: 3 },
      severity: { threshold: 'high', actual: 'critical' }
    },
    stabilizationWindow: 45,
    notificationEmitted: true
  }
]

// Helper functions
export function getOperationalEvent(id) {
  return operationalEvents.find(e => e.id === id)
}
