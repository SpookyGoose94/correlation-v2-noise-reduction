import { Server, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function TopAffectedEntitiesPanel({ entities }) {
  const severityColors = {
    critical: '#f87171',
    high: '#fb923c',
    medium: '#fbbf24',
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {entities.map((entity) => (
        <Card key={entity.id} className="border-border">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-base font-semibold text-text-primary">
                  {entity.name}
                </CardTitle>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="default" className="text-xs">
                    <Server className="mr-1 h-3 w-3" />
                    {entity.service}
                  </Badge>
                  <Badge
                    variant={entity.avgSeverity === 'critical' ? 'destructive' : 'warning'}
                    className="text-xs"
                  >
                    {entity.avgSeverity}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Suppression Count */}
            <div>
              <div className="text-xs font-semibold uppercase text-text-muted">
                Total Suppressions (7d)
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <div className="text-3xl font-bold text-text-primary">
                  {entity.totalSuppressions.toLocaleString()}
                </div>
                <TrendingUp className="h-4 w-4 text-accent-red" />
              </div>
            </div>

            {/* Weekly Trend Chart */}
            <div>
              <div className="text-xs font-semibold uppercase text-text-muted mb-2">
                Weekly Trend
              </div>
              <ResponsiveContainer width="100%" height={80}>
                <BarChart data={entity.weeklyTrend}>
                  <XAxis
                    dataKey="day"
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '6px',
                      fontSize: '12px',
                    }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Bar
                    dataKey="suppressions"
                    fill={severityColors[entity.avgSeverity]}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Services */}
            <div>
              <div className="text-xs font-semibold uppercase text-text-muted mb-2">
                Top Impacted Services
              </div>
              <div className="flex flex-wrap gap-1.5">
                {entity.topServices.map((service) => (
                  <Badge key={service} variant="secondary" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
