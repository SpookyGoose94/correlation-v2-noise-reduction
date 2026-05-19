import { TrendingDown, Zap, Target, Activity } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function NoiseReductionPanel({ data }) {
  const { currentPeriod, weeklyTrend, orchestrationMetrics } = data

  return (
    <Card>
      <CardContent>
        {/* Hero Metric */}
        <div className="mb-6 rounded-lg border border-border bg-background-tertiary p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Main Reduction */}
            <div className="col-span-2">
              <div className="mb-2 text-xs font-semibold uppercase text-text-muted">
                Total Noise Reduction
              </div>
              <div className="flex items-baseline gap-3">
                <div className="text-3xl font-bold text-accent-green">
                  {currentPeriod.reductionPercentage}%
                </div>
                <div className="text-sm text-text-secondary">
                  ({currentPeriod.notificationsConsolidated.toLocaleString()} notifications)
                </div>
              </div>
              <div className="mt-2 text-sm text-text-secondary">
                <span className="font-semibold">{currentPeriod.totalSignals.toLocaleString()}</span> signals →{' '}
                <span className="font-semibold text-accent-green">{currentPeriod.operationalEvents}</span> operational events
              </div>
            </div>

            {/* Avg per Event */}
            <div className="flex flex-col justify-center border-l border-border pl-6">
              <div className="mb-2 text-xs font-semibold uppercase text-text-muted">
                Avg Per Event
              </div>
              <div className="text-2xl font-bold text-text-primary">
                {currentPeriod.avgNotificationsPerEvent}
              </div>
              <div className="mt-1 text-xs text-text-muted">
                notifications consolidated
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Trend Chart */}
        <div className="mb-6">
          <div className="mb-3 text-sm font-semibold text-text-muted">
            7-DAY NOISE REDUCTION TREND
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrend}>
                <defs>
                  <linearGradient id="consolidatedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="day"
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #262626',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Area
                  type="monotone"
                  dataKey="consolidated"
                  stroke="#34d399"
                  strokeWidth={2}
                  fill="url(#consolidatedGradient)"
                  name="Consolidated"
                />
                <Area
                  type="monotone"
                  dataKey="signals"
                  stroke="#9ca3af"
                  strokeWidth={2}
                  fill="none"
                  name="Total Signals"
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orchestration Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-lg bg-background-tertiary p-4">
            <div className="mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent-blue" />
              <div className="text-xs font-semibold text-text-muted">
                AVG STABILIZATION
              </div>
            </div>
            <div className="text-2xl font-bold text-text-primary">
              {orchestrationMetrics.avgStabilizationWindow}s
            </div>
          </div>

          <div className="rounded-lg bg-background-tertiary p-4">
            <div className="mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-accent-green" />
              <div className="text-xs font-semibold text-text-muted">
                ACTIVATION RATE
              </div>
            </div>
            <div className="text-2xl font-bold text-text-primary">
              {orchestrationMetrics.clusterActivationRate}%
            </div>
          </div>

          <div className="rounded-lg bg-background-tertiary p-4">
            <div className="mb-2 flex items-center gap-2">
              <Activity className="h-4 w-4 text-accent-cyan" />
              <div className="text-xs font-semibold text-text-muted">
                CONFIDENCE
              </div>
            </div>
            <div className="text-2xl font-bold text-text-primary">
              {orchestrationMetrics.orchestrationConfidence}%
            </div>
          </div>

          <div className="rounded-lg bg-background-tertiary p-4">
            <div className="mb-2 flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-accent-green" />
              <div className="text-xs font-semibold text-text-muted">
                FALSE POSITIVES
              </div>
            </div>
            <div className="text-2xl font-bold text-text-primary">
              {orchestrationMetrics.falsePositiveRate}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
