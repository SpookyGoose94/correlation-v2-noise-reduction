import { AlertCircle, TrendingUp, Search, AlertTriangle } from 'lucide-react'
import Layout from '../components/Layout'
import OperationalEventsTable from '../components/OperationalEventsTable'
import NoiseReductionPanel from '../components/NoiseReductionPanel'
import RecentChangesCard from '../components/RecentChangesCard'
import TopAffectedEntitiesPanel from '../components/TopAffectedEntitiesPanel'
import { operationalEvents, notificationReduction, recentChanges, topAffectedEntities } from '../data/mockData'

export default function Home() {
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
                {operationalEvents.length} active events
              </span>
            </div>
          </div>

          <OperationalEventsTable events={operationalEvents} />
        </section>

        {/* Section 2: Top Affected Entities */}
        <section>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-text-primary">
                  <AlertTriangle className="h-5 w-5 text-accent-orange" />
                  Top Affected Entities
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                  Entities with the highest suppression activity in the last 7 days
                </p>
              </div>
            </div>
          </div>

          <TopAffectedEntitiesPanel entities={topAffectedEntities} />
        </section>

        {/* Section 3: What Changed Recently */}
        <section>
          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-text-primary">
              <Search className="h-5 w-5 text-accent-cyan" />
              What Changed Recently
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              Emerging patterns and operational behavior shifts
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {recentChanges.map((change) => (
              <RecentChangesCard key={change.id} change={change} />
            ))}
          </div>
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
