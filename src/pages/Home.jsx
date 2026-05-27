import { useState } from 'react'
import { AlertCircle, TrendingUp, Settings, X } from 'lucide-react'
import Layout from '../components/Layout'
import OperationalEventsCards2 from '../components/OperationalEventsCards2'
import NoiseReductionPanel2 from '../components/NoiseReductionPanel2'
import { operationalEvents, notificationReduction } from '../data/mockData'
import { Button } from '../components/ui/button'

export default function Home() {
  const [showPreferences, setShowPreferences] = useState(false)

  // Filter events to only show critical and high severity, then sort by severity
  const filteredEvents = operationalEvents
    .filter(event => event.severity === 'critical' || event.severity === 'high')
    .sort((a, b) => {
      // Critical comes before high
      if (a.severity === 'critical' && b.severity === 'high') return -1
      if (a.severity === 'high' && b.severity === 'critical') return 1
      return 0
    })

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

        {/* Section 2: What Needs Attention */}
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
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent-red/10 px-3 py-1">
                <span className="text-sm font-semibold text-accent-red">
                  Top {Math.min(6, filteredEvents.length)} of {filteredEvents.length} events
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreferences(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Preferences
              </Button>
            </div>
          </div>

          <OperationalEventsCards2 events={filteredEvents.slice(0, 6)} />
        </section>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <div className="bg-background-secondary border-l border-border shadow-xl w-full max-w-2xl h-full overflow-hidden animate-in slide-in-from-right">
            <div className="flex items-center justify-between border-b border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary">Alert Preferences</h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="p-1 rounded-md hover:bg-background-tertiary transition-colors"
              >
                <X className="h-5 w-5 text-text-secondary" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-140px)]">
              {/* Service Priority */}
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-3">Prioritize Services</h4>
                <p className="text-xs text-text-muted mb-3">
                  Events from these services will appear first
                </p>
                <div className="space-y-2">
                  {['payment', 'checkout', 'auth', 'inventory', 'shipping'].map((service) => (
                    <label key={service} className="flex items-center gap-2 p-2 rounded-md hover:bg-background-tertiary cursor-pointer">
                      <input type="checkbox" className="rounded border-border" />
                      <span className="text-sm text-text-primary capitalize">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Alarming Criteria */}
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-3">Alarming Criteria</h4>
                <p className="text-xs text-text-muted mb-3">
                  Choose which conditions should trigger alerts on this dashboard
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2 rounded-md hover:bg-background-tertiary cursor-pointer">
                    <input type="checkbox" className="rounded border-border" defaultChecked />
                    <span className="text-sm text-text-primary">More than 50 issues in 30 mins</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-md hover:bg-background-tertiary cursor-pointer">
                    <input type="checkbox" className="rounded border-border" defaultChecked />
                    <span className="text-sm text-text-primary">All issues are for only one service</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-md hover:bg-background-tertiary cursor-pointer">
                    <input type="checkbox" className="rounded border-border" defaultChecked />
                    <span className="text-sm text-text-primary">Deployment correlation detected</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-md hover:bg-background-tertiary cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm text-text-primary">Error rate spike &gt; 50%</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-md hover:bg-background-tertiary cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm text-text-primary">Multiple services impacted</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-md hover:bg-background-tertiary cursor-pointer">
                    <input type="checkbox" className="rounded border-border" defaultChecked />
                    <span className="text-sm text-text-primary">Critical severity events only</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border px-6 pt-6 pb-4">
              <Button variant="outline" onClick={() => setShowPreferences(false)}>
                Cancel
              </Button>
              <Button variant="default" className="bg-accent-blue hover:bg-accent-blue/90" onClick={() => setShowPreferences(false)}>
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
