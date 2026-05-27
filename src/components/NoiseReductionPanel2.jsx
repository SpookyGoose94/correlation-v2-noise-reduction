import { TrendingDown } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function NoiseReductionPanel2({ data }) {
  const { currentPeriod, weeklyTrend } = data

  return (
    <Card className="p-4">
      <CardContent className="p-0">
        <div className="flex gap-6">
          {/* Left: Metrics stacked vertically */}
          <div className="flex flex-col gap-4 min-w-[300px]">
            {/* Total Noise Reduction */}
            <div>
              <div className="pb-2 text-xs text-text-secondary">
                Total noise reduction
              </div>
              <div className="flex items-baseline gap-3">
                <div className="text-xl font-bold text-accent-green">
                  {currentPeriod.reductionPercentage}%
                </div>
                <div className="text-xs text-text-secondary">
                  ({currentPeriod.notificationsConsolidated.toLocaleString()} notifications)
                </div>
              </div>
            </div>

            {/* Signals to Events */}
            <div>
              <div className="pb-2 text-xs text-text-secondary">
                Signal consolidation
              </div>
              <div className="text-xs text-text-primary">
                <span className="font-semibold">{currentPeriod.totalSignals.toLocaleString()}</span> signals →{' '}
                <span className="font-semibold text-accent-green">{currentPeriod.operationalEvents}</span> operational events
              </div>
            </div>

            {/* Avg per Event */}
            <div>
              <div className="pb-2 text-xs text-text-secondary">
                Avg per event
              </div>
              <div className="text-lg font-bold text-text-primary">
                {currentPeriod.avgNotificationsPerEvent}
              </div>
              <div className="pt-1 text-xs text-text-secondary">
                notifications consolidated
              </div>
            </div>
          </div>

          {/* Right: Weekly Trend Mini Chart */}
          <div className="flex-1 min-w-0">
            <div className="pb-2 text-xs text-text-secondary">
              7-day trend
            </div>
            <div style={{ width: '100%', height: '140px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrend}>
                  <defs>
                    <linearGradient id="issuesGradientMini" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="notificationsGradientMini" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="issues"
                    stroke="#f87171"
                    strokeWidth={1.5}
                    fill="url(#issuesGradientMini)"
                  />
                  <Area
                    type="monotone"
                    dataKey="notifications"
                    stroke="#34d399"
                    strokeWidth={1.5}
                    fill="url(#notificationsGradientMini)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
