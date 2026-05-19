import { useState } from 'react'
import { AlertCircle, TrendingUp, Search, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'
import Layout from '../components/Layout'
import OperationalEventsCards from '../components/OperationalEventsCards'
import NoiseReductionPanel from '../components/NoiseReductionPanel'
import RecentChangesCard from '../components/RecentChangesCard'
import TopAffectedEntitiesTable from '../components/TopAffectedEntitiesTable'
import { operationalEvents, notificationReduction, recentChanges, topAffectedEntities } from '../data/mockData'

export default function Home() {
  const [isChangesCollapsed, setIsChangesCollapsed] = useState(true)

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            Correlation Insights & Orchestration
          </h1>
          <p className="mt-2 text-text-secondary">
            Real-time operational consolidation and noise reduction platform
          </p>
        </div>

        {/* Section 1: What Needs Attention */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-text-primary">
                <AlertCircle className="h-5 w-5 text-accent-red" />
                What Needs Attention
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                Meaningful operational events requiring investigation
              </p>
            </div>
            <div className="rounded-lg bg-accent-red/10 px-3 py-1">
              <span className="text-sm font-semibold text-accent-red">
                Top {Math.min(3, operationalEvents.length)} of {operationalEvents.length} events
              </span>
            </div>
          </div>

          <OperationalEventsCards events={operationalEvents.slice(0, 3)} />
        </section>

        {/* Section 2: Top Affected Services */}
        <section>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-text-primary">
                  <AlertTriangle className="h-5 w-5 text-accent-orange" />
                  Top Affected Services
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                  Services with the highest suppression activity in the last 7 days
                </p>
              </div>
            </div>
          </div>

          <TopAffectedEntitiesTable entities={topAffectedEntities} />
        </section>

        {/* Section 3: What Changed Recently */}
        <section>
          <div className="mb-4">
            <h2
              className="flex items-center gap-2 text-xl font-semibold text-text-primary cursor-pointer hover:text-accent-cyan transition-colors"
              onClick={() => setIsChangesCollapsed(!isChangesCollapsed)}
            >
              <Search className="h-5 w-5 text-accent-cyan" />
              What Changed Recently
              {isChangesCollapsed ? (
                <ChevronDown className="h-5 w-5 text-text-muted" />
              ) : (
                <ChevronUp className="h-5 w-5 text-text-muted" />
              )}
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              Emerging patterns and operational behavior shifts
            </p>
          </div>

          {!isChangesCollapsed && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {recentChanges.map((change) => (
                <RecentChangesCard key={change.id} change={change} />
              ))}
            </div>
          )}
        </section>

        {/* Section 3: Notification Reduction Summary */}
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

          <NoiseReductionPanel data={notificationReduction} />
        </section>
      </div>
    </Layout>
  )
}
