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
    <div className="space-y-4">
      {entities.map((entity) => (
        <Card key={entity.id} className="border-border">
          <CardContent className="p-5">
            <div className="grid grid-cols-[250px_1fr_auto] gap-6 items-center">
              {/* Left: Entity Info */}
              <div>
                <div className="text-base font-semibold text-text-primary mb-2">
                  {entity.name}
                </div>
                <div className="flex items-center gap-2 mb-3">
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
                <div className="flex flex-wrap gap-1.5">
                  {entity.topServices.map((service) => (
                    <Badge key={service} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Center: Weekly Trend Chart */}
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

              {/* Right: Suppression Count */}
              <div className="text-center">
                <div className="text-xs font-semibold uppercase text-text-muted mb-2">
                  Total Suppressions (7d)
                </div>
                <div className="flex items-baseline gap-2 justify-center">
                  <div className="text-3xl font-bold text-text-primary">
                    {entity.totalSuppressions.toLocaleString()}
                  </div>
                  <TrendingUp className="h-4 w-4 text-accent-red" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
