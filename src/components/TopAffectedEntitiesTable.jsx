import { Server, TrendingUp } from 'lucide-react'
import { Badge } from './ui/badge'

export default function TopAffectedEntitiesTable({ entities }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background-secondary">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
              Service
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
              Affected Entity
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
              Severity
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
              Total Suppressions (7d)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {entities.map((entity) => (
            <tr
              key={entity.id}
              className="transition-colors hover:bg-background-tertiary"
            >
              {/* Service Name */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-accent-cyan" />
                  <span className="font-semibold text-text-primary">{entity.service}</span>
                </div>
              </td>

              {/* Affected Entity */}
              <td className="px-6 py-4">
                <Badge variant="default" className="text-xs">
                  {entity.name}
                </Badge>
              </td>

              {/* Severity */}
              <td className="px-6 py-4">
                <Badge
                  variant={entity.avgSeverity === 'critical' ? 'destructive' : 'warning'}
                  className="text-xs"
                >
                  {entity.avgSeverity}
                </Badge>
              </td>

              {/* Total Suppressions */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-text-primary">
                    {entity.totalSuppressions.toLocaleString()}
                  </div>
                  <TrendingUp className="h-4 w-4 text-accent-red" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
