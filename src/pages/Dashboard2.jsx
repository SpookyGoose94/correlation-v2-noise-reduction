import { useState } from 'react'
import { AlertCircle, TrendingUp, List } from 'lucide-react'
import Layout from '../components/Layout'
import OperationalEventsCards2 from '../components/OperationalEventsCards2'
import OperationalEventsList from '../components/OperationalEventsList'
import NoiseReductionPanel2 from '../components/NoiseReductionPanel2'
import { operationalEvents, notificationReduction } from '../data/mockData'

export default function Dashboard2() {

  return (
    <Layout>
      <div className="space-y-8 p-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            Correlation Insights & Orchestration
          </h1>
          <p className="mt-2 text-text-secondary">
            Real-time operational consolidation and noise reduction platform
          </p>
        </div>

        {/* Section 1: Notification Reduction Summary */}
        <section>
          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-text-primary">
              <TrendingUp className="h-5 w-5 text-accent-green" />
              Notification Reduction Summary
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              Real-time orchestration impact and noise reduction metrics
            </p>
          </div>

          <NoiseReductionPanel2 data={notificationReduction} />
        </section>

        {/* Section 2: Recent Critical Events - Vertical List */}
        <section>
          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-text-primary">
              <AlertCircle className="h-5 w-5 text-accent-red" />
              Recent Critical Events
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              Latest high-priority events requiring attention
            </p>
          </div>

          <OperationalEventsList
            events={operationalEvents
              .filter(event => event.severity === 'critical' || event.severity === 'high')
              .sort((a, b) => {
                const severityOrder = { critical: 0, high: 1 }
                return severityOrder[a.severity] - severityOrder[b.severity]
              })
              .slice(0, 5)
            }
          />
        </section>
      </div>
    </Layout>
  )
}
