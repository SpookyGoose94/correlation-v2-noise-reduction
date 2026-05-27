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

  const correlationRules = [
    'Same Service',
    'Time-based',
    'Error Pattern',
    'Deployment Correlation'
  ]

  const types = ['Issue', 'Change Event']
  const severities = ['critical', 'high', 'medium']
  const issues = []

  for (let i = 0; i < count; i++) {
    const service = services[Math.floor(Math.random() * services.length)]
    const issueType = issueTypes[Math.floor(Math.random() * issueTypes.length)]
    const severity = i < count * 0.3 ? baseSeverity : severities[Math.floor(Math.random() * severities.length)]
    const minutesAgoRandom = Math.floor(Math.random() * 30) + 1
    const rule = correlationRules[Math.floor(Math.random() * correlationRules.length)]
    const type = types[Math.floor(Math.random() * types.length)]

    issues.push({
      id: `issue-${i + 1}`,
      title: `${issueType} in ${service}`,
      service: service,
      severity: severity,
      timestamp: minutesAgo(minutesAgoRandom),
      source: 'New Relic Alerts',
      condition: `${issueType}`,
      entity: `${service}-prod-${Math.floor(Math.random() * 5) + 1}`,
      correlationRule: rule,
      type: type
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
    notificationsSent: 3,
    actionableCriteria: 'Deployment correlation detected',
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
      {
        action: 'Check recent deployment logs for payment-service v2.4.1',
        reason: 'Errors started immediately after deployment indicating potential deployment issue'
      },
      {
        action: 'Review configuration changes in the latest deployment',
        reason: 'Configuration mismatches often cause service failures across multiple services'
      },
      {
        action: 'Compare current deployment manifest with previous stable version',
        reason: 'Manifest changes may reveal unexpected dependencies or resource constraints'
      }
    ],
    contributingRules: [
      {
        name: 'Deployment Correlation',
        description: 'Correlates issues that occur within 15 minutes of a deployment event',
        issueCount: 89,
        percentage: 60.5
      },
      {
        name: 'Service Dependency Chain',
        description: 'Groups issues across services with known dependencies',
        issueCount: 38,
        percentage: 25.9
      },
      {
        name: 'Error Pattern Matching',
        description: 'Matches issues with similar error signatures and stack traces',
        issueCount: 20,
        percentage: 13.6
      }
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
    notificationsSent: 2,
    actionableCriteria: 'Average latency: 2.4s',
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
    contributingRules: [
      {
        name: 'Resource Saturation Pattern',
        description: 'Identifies cascading failures due to resource exhaustion',
        issueCount: 52,
        percentage: 58.4
      },
      {
        name: 'Latency Spike Detection',
        description: 'Groups issues with abnormal response time increases',
        issueCount: 24,
        percentage: 27.0
      },
      {
        name: 'Service Dependency Chain',
        description: 'Groups issues across services with known dependencies',
        issueCount: 13,
        percentage: 14.6
      }
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
    notificationsSent: 1,
    actionableCriteria: 'Failure rate: 42%',
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
  },
  {
    id: 'event-4',
    title: 'Cache layer failure impacting read operations',
    description: 'Redis cluster connection failures causing increased database load and latency',
    severity: 'critical',
    affectedServices: ['cache', 'api', 'user-service'],
    consolidatedNotifications: 134,
    timestamp: hoursAgo(3),
    status: 'resolved',
    confidence: 96,
    stabilizationWindow: 40,
    notificationsSent: 2,
    actionableCriteria: 'DB query spike: +340%',
    metrics: {
      cacheHitRate: '12%',
      dbQueryIncrease: '340%',
      affectedAPIs: 47,
      avgLatency: '3.2s'
    },
    serviceBreakdown: [
      {
        name: 'cache',
        issueCount: 78,
        errorRate: '89%',
        severity: 'critical',
        topIssue: 'Connection failed in cache',
        entities: ['redis-cluster-1', 'redis-cluster-2', 'redis-cluster-3']
      },
      {
        name: 'api',
        issueCount: 38,
        errorRate: '22%',
        severity: 'high',
        topIssue: 'Response time exceeded in api',
        entities: ['api-prod-2', 'api-prod-5']
      },
      {
        name: 'user-service',
        issueCount: 18,
        errorRate: '14%',
        severity: 'medium',
        topIssue: 'Service timeout in user-service',
        entities: ['user-service-prod-1']
      }
    ],
    recommendedActions: [
      {
        action: 'Check Redis cluster health and connectivity',
        reason: 'High connection failure rate indicates cluster instability'
      },
      {
        action: 'Review Redis memory usage and eviction policies',
        reason: 'Memory pressure can cause connection issues and performance degradation'
      },
      {
        action: 'Verify network connectivity between services and Redis',
        reason: 'Network issues can cause intermittent connection failures'
      }
    ],
    suppressedIssues: generateSuppressedIssues(134, ['cache', 'api', 'user-service'], 'critical'),
    timeSeriesData: [
      { time: 'Mon', issues: 22 },
      { time: 'Tue', issues: 31 },
      { time: 'Wed', issues: 45 },
      { time: 'Thu', issues: 38 },
      { time: 'Fri', issues: 67 },
      { time: 'Sat', issues: 94 },
      { time: 'Sun', issues: 134 }
    ]
  },
  {
    id: 'event-5',
    title: 'Authentication service degradation',
    description: 'SSO provider latency causing login failures and session timeout issues',
    severity: 'high',
    affectedServices: ['auth', 'user-service', 'frontend'],
    consolidatedNotifications: 76,
    timestamp: hoursAgo(5),
    status: 'resolved',
    confidence: 89,
    stabilizationWindow: 35,
    notificationsSent: 2,
    actionableCriteria: 'Login failure rate: 34%',
    metrics: {
      loginFailureRate: '34%',
      affectedUsers: '8.7K',
      avgLoginTime: '12s',
      sessionTimeouts: 2341
    },
    serviceBreakdown: [
      {
        name: 'auth',
        issueCount: 45,
        errorRate: '34%',
        severity: 'high',
        topIssue: 'Service timeout in auth',
        entities: ['auth-prod-1', 'auth-prod-2']
      },
      {
        name: 'user-service',
        issueCount: 21,
        errorRate: '18%',
        severity: 'medium',
        topIssue: 'API endpoint failure in user-service',
        entities: ['user-service-prod-3']
      },
      {
        name: 'frontend',
        issueCount: 10,
        errorRate: '7%',
        severity: 'medium',
        topIssue: 'Response time exceeded in frontend',
        entities: ['frontend-prod-1', 'frontend-prod-2']
      }
    ],
    recommendedActions: [
      {
        action: 'Check SSO provider status and response times',
        reason: 'External SSO latency is causing downstream authentication failures'
      },
      {
        action: 'Review auth service timeout configurations',
        reason: 'Timeout values may need adjustment to handle provider latency'
      },
      {
        action: 'Verify session management and token refresh logic',
        reason: 'Session timeouts may be compounding the authentication issues'
      }
    ],
    suppressedIssues: generateSuppressedIssues(76, ['auth', 'user-service', 'frontend'], 'high'),
    timeSeriesData: [
      { time: 'Mon', issues: 12 },
      { time: 'Tue', issues: 18 },
      { time: 'Wed', issues: 24 },
      { time: 'Thu', issues: 31 },
      { time: 'Fri', issues: 45 },
      { time: 'Sat', issues: 58 },
      { time: 'Sun', issues: 76 }
    ]
  },
  {
    id: 'event-6',
    title: 'API rate limit threshold exceeded',
    description: 'Multiple services hitting rate limits causing cascading failures',
    severity: 'medium',
    affectedServices: ['api-gateway', 'search-service', 'recommendation-engine'],
    consolidatedNotifications: 43,
    timestamp: hoursAgo(8),
    status: 'active',
    confidence: 82,
    stabilizationWindow: 25,
    notificationsSent: 1,
    actionableCriteria: 'Issue spike: +67% in last 2 hours',
    metrics: {
      requestsThrottled: '15.2K',
      affectedEndpoints: 23,
      avgRetryAttempts: 4.2,
      successRate: '72%'
    },
    serviceBreakdown: [
      {
        name: 'api-gateway',
        issueCount: 22,
        errorRate: '28%',
        severity: 'medium',
        topIssue: 'API endpoint failure in api-gateway',
        entities: ['api-gateway-prod-1', 'api-gateway-prod-2']
      },
      {
        name: 'search-service',
        issueCount: 13,
        errorRate: '19%',
        severity: 'medium',
        topIssue: 'Service timeout in search-service',
        entities: ['search-prod-1']
      },
      {
        name: 'recommendation-engine',
        issueCount: 8,
        errorRate: '12%',
        severity: 'medium',
        topIssue: 'Response time exceeded in recommendation-engine',
        entities: ['recommendation-prod-2']
      }
    ],
    recommendedActions: [
      'Review API rate limit configurations and current usage patterns',
      'Check for any automated scripts or bots causing excessive requests',
      'Implement request queuing or backoff strategies',
      'Consider scaling rate limit thresholds based on demand'
    ],
    suppressedIssues: generateSuppressedIssues(43, ['api-gateway', 'search-service', 'recommendation-engine'], 'medium'),
    timeSeriesData: [
      { time: 'Mon', issues: 5 },
      { time: 'Tue', issues: 8 },
      { time: 'Wed', issues: 12 },
      { time: 'Thu', issues: 15 },
      { time: 'Fri', issues: 21 },
      { time: 'Sat', issues: 32 },
      { time: 'Sun', issues: 43 }
    ]
  },
  {
    id: 'event-7',
    title: 'Memory leak detected in order processing',
    description: 'Order service memory usage trending upward causing performance degradation',
    severity: 'high',
    affectedServices: ['order-service', 'inventory', 'notification-service'],
    consolidatedNotifications: 58,
    timestamp: hoursAgo(12),
    status: 'investigating',
    confidence: 91,
    stabilizationWindow: 50,
    notificationsSent: 2,
    actionableCriteria: 'Memory usage: 94%',
    metrics: {
      memoryUsage: '94%',
      avgResponseTime: '4.8s',
      failedOrders: 847,
      gcPausesPerMin: 34
    },
    serviceBreakdown: [
      {
        name: 'order-service',
        issueCount: 35,
        errorRate: '31%',
        severity: 'high',
        topIssue: 'Memory threshold exceeded in order-service',
        entities: ['order-prod-1', 'order-prod-3']
      },
      {
        name: 'inventory',
        issueCount: 15,
        errorRate: '16%',
        severity: 'medium',
        topIssue: 'Service timeout in inventory',
        entities: ['inventory-prod-2']
      },
      {
        name: 'notification-service',
        issueCount: 8,
        errorRate: '9%',
        severity: 'medium',
        topIssue: 'Response time exceeded in notification-service',
        entities: ['notification-prod-1']
      }
    ],
    recommendedActions: [
      'Analyze heap dumps to identify memory leak sources',
      'Review recent code changes for potential memory leaks',
      'Monitor garbage collection patterns and frequency',
      'Consider restarting affected instances with increased memory limits'
    ],
    suppressedIssues: generateSuppressedIssues(58, ['order-service', 'inventory', 'notification-service'], 'high'),
    timeSeriesData: [
      { time: 'Mon', issues: 8 },
      { time: 'Tue', issues: 12 },
      { time: 'Wed', issues: 18 },
      { time: 'Thu', issues: 24 },
      { time: 'Fri', issues: 35 },
      { time: 'Sat', issues: 47 },
      { time: 'Sun', issues: 58 }
    ]
  },
  {
    id: 'event-8',
    title: 'Network connectivity issues in us-east region',
    description: 'Intermittent network packet loss causing service disruptions',
    severity: 'critical',
    affectedServices: ['all-services-us-east'],
    consolidatedNotifications: 203,
    timestamp: hoursAgo(18),
    status: 'resolved',
    confidence: 98,
    stabilizationWindow: 55,
    notificationsSent: 4,
    actionableCriteria: 'Issue spike: +450% in last hour',
    metrics: {
      packetLoss: '8.3%',
      affectedRequests: '127K',
      avgLatency: '1.2s',
      impactedRegions: 1
    },
    serviceBreakdown: [
      {
        name: 'payment',
        issueCount: 68,
        errorRate: '52%',
        severity: 'critical',
        topIssue: 'Connection failed in payment',
        entities: ['payment-us-east-1', 'payment-us-east-2']
      },
      {
        name: 'database',
        issueCount: 54,
        errorRate: '41%',
        severity: 'critical',
        topIssue: 'Connection failed in database',
        entities: ['database-us-east-1']
      },
      {
        name: 'api-gateway',
        issueCount: 81,
        errorRate: '63%',
        severity: 'critical',
        topIssue: 'Service timeout in api-gateway',
        entities: ['api-us-east-1', 'api-us-east-3']
      }
    ],
    recommendedActions: [
      'Contact cloud provider about network connectivity issues',
      'Review network topology and routing configurations',
      'Consider failover to alternate region if issues persist',
      'Monitor network metrics and packet loss rates'
    ],
    suppressedIssues: generateSuppressedIssues(203, ['payment', 'database', 'api-gateway'], 'critical'),
    timeSeriesData: [
      { time: 'Mon', issues: 12 },
      { time: 'Tue', issues: 15 },
      { time: 'Wed', issues: 18 },
      { time: 'Thu', issues: 23 },
      { time: 'Fri', issues: 67 },
      { time: 'Sat', issues: 152 },
      { time: 'Sun', issues: 203 }
    ]
  },
  {
    id: 'event-9',
    title: 'Third-party API degradation impacting checkout',
    description: 'Shipping calculation API timeouts causing checkout failures',
    severity: 'high',
    affectedServices: ['checkout', 'shipping-service', 'cart'],
    consolidatedNotifications: 71,
    timestamp: daysAgo(1),
    status: 'active',
    confidence: 88,
    stabilizationWindow: 45,
    notificationsSent: 2,
    actionableCriteria: 'Timeout rate: 38%',
    metrics: {
      apiTimeoutRate: '38%',
      abandonedCarts: '3.4K',
      avgCheckoutTime: '28s',
      affectedOrders: 2145
    },
    serviceBreakdown: [
      {
        name: 'checkout',
        issueCount: 38,
        errorRate: '38%',
        severity: 'high',
        topIssue: 'Service timeout in checkout',
        entities: ['checkout-prod-1', 'checkout-prod-2']
      },
      {
        name: 'shipping-service',
        issueCount: 23,
        errorRate: '29%',
        severity: 'high',
        topIssue: 'API endpoint failure in shipping-service',
        entities: ['shipping-prod-1']
      },
      {
        name: 'cart',
        issueCount: 10,
        errorRate: '12%',
        severity: 'medium',
        topIssue: 'Response time exceeded in cart',
        entities: ['cart-prod-3']
      }
    ],
    recommendedActions: [
      'Check third-party shipping API status and response times',
      'Implement fallback shipping calculation logic',
      'Review timeout configurations for external API calls',
      'Consider caching shipping rate responses when possible'
    ],
    suppressedIssues: generateSuppressedIssues(71, ['checkout', 'shipping-service', 'cart'], 'high'),
    timeSeriesData: [
      { time: 'Mon', issues: 9 },
      { time: 'Tue', issues: 14 },
      { time: 'Wed', issues: 18 },
      { time: 'Thu', issues: 27 },
      { time: 'Fri', issues: 42 },
      { time: 'Sat', issues: 58 },
      { time: 'Sun', issues: 71 }
    ]
  },
  {
    id: 'event-10',
    title: 'Database replica lag causing stale data reads',
    description: 'Replication delay between primary and replica databases',
    severity: 'medium',
    affectedServices: ['database', 'reporting', 'analytics'],
    consolidatedNotifications: 39,
    timestamp: daysAgo(2),
    status: 'resolved',
    confidence: 84,
    stabilizationWindow: 30,
    notificationsSent: 1,
    actionableCriteria: 'Replication lag: 12.4s',
    metrics: {
      replicationLag: '12.4s',
      staleReadCount: '8.2K',
      dataInconsistencies: 234,
      queryFailures: 89
    },
    serviceBreakdown: [
      {
        name: 'database',
        issueCount: 21,
        errorRate: '22%',
        severity: 'medium',
        topIssue: 'Database query timeout',
        entities: ['database-replica-2', 'database-replica-3']
      },
      {
        name: 'reporting',
        issueCount: 12,
        errorRate: '14%',
        severity: 'medium',
        topIssue: 'Response time exceeded in reporting',
        entities: ['reporting-prod-1']
      },
      {
        name: 'analytics',
        issueCount: 6,
        errorRate: '8%',
        severity: 'medium',
        topIssue: 'API endpoint failure in analytics',
        entities: ['analytics-prod-2']
      }
    ],
    recommendedActions: [
      'Check replication configuration and network latency',
      'Review database load and query patterns on primary',
      'Monitor replica lag metrics and set up alerting',
      'Consider adding more replicas to distribute read load'
    ],
    suppressedIssues: generateSuppressedIssues(39, ['database', 'reporting', 'analytics'], 'medium'),
    timeSeriesData: [
      { time: 'Mon', issues: 4 },
      { time: 'Tue', issues: 7 },
      { time: 'Wed', issues: 11 },
      { time: 'Thu', issues: 15 },
      { time: 'Fri', issues: 22 },
      { time: 'Sat', issues: 31 },
      { time: 'Sun', issues: 39 }
    ]
  }
]

// ============================================
// NOTIFICATION REDUCTION SUMMARY
// ============================================
export const notificationReduction = {
  currentPeriod: {
    label: 'Last 24 Hours',
    totalSignals: 3142,
    operationalEvents: 10,
    notificationsSent: 251,
    notificationsConsolidated: 2891,
    reductionPercentage: ((3142 - 251) / 3142 * 100).toFixed(1),
    avgNotificationsPerEvent: Math.floor(251 / 10)
  },
  comparisonPeriod: {
    label: 'Previous 24 Hours',
    totalSignals: 3142,
    notificationsIssued: 3089
  },
  weeklyTrend: [
    { day: 'Mon', issues: 142, notifications: 28 },
    { day: 'Tue', issues: 167, notifications: 22 },
    { day: 'Wed', issues: 128, notifications: 32 },
    { day: 'Thu', issues: 153, notifications: 25 },
    { day: 'Fri', issues: 189, notifications: 20 },
    { day: 'Sat', issues: 98, notifications: 35 },
    { day: 'Sun', issues: 134, notifications: 18 }
  ]
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
