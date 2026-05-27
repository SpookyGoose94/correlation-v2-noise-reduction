import { Server, TrendingUp } from 'lucide-react'
import { Badge } from './ui/badge'

export default function TopAffectedEntitiesTable2({ entities }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background-secondary p-4">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="pb-4 text-left text-xs text-text-secondary">
              Service
            </th>
            <th className="pb-4 text-left text-xs text-text-secondary">
              Severity
            </th>
            <th className="pb-4 text-left text-xs text-text-secondary">
              Total suppressions (7d)
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
              <td className="pt-4 pb-4">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-accent-cyan" />
                  <span className="font-semibold text-text-primary">{entity.service}</span>
                </div>
              </td>

              {/* Severity */}
              <td className="pt-4 pb-4">
                <Badge
                  variant={entity.avgSeverity === 'critical' ? 'destructive' : 'warning'}
                  className="text-xs"
                >
                  {entity.avgSeverity}
                </Badge>
              </td>

              {/* Total Suppressions */}
              <td className="pt-4 pb-4">
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
