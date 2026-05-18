import { Server, TrendingUp } from 'lucide-react'
import { Badge } from './ui/badge'

export default function TopAffectedEntitiesTable({ entities }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background-secondary">
      {/* Table Header */}
      <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-border bg-background-tertiary px-6 py-3 text-xs font-semibold uppercase text-text-muted">
        <div>Entity</div>
        <div className="text-center">Service</div>
        <div className="text-center">Severity</div>
        <div className="text-center">Top Services</div>
        <div className="text-right">Total Suppressions (7d)</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-border">
        {entities.map((entity) => (
          <div
            key={entity.id}
            className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-4 transition-all hover:bg-background-tertiary"
          >
            {/* Entity Name */}
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-accent-cyan" />
              <span className="font-semibold text-text-primary">{entity.name}</span>
            </div>

            {/* Service */}
            <div className="flex items-center justify-center">
              <Badge variant="default" className="text-xs">
                {entity.service}
              </Badge>
            </div>

            {/* Severity */}
            <div className="flex items-center justify-center">
              <Badge
                variant={entity.avgSeverity === 'critical' ? 'destructive' : 'warning'}
                className="text-xs"
              >
                {entity.avgSeverity}
              </Badge>
            </div>

            {/* Top Services */}
            <div className="flex items-center gap-1.5">
              {entity.topServices.slice(0, 3).map((service) => (
                <Badge key={service} variant="secondary" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>

            {/* Total Suppressions */}
            <div className="flex items-center justify-end gap-2">
              <div className="text-right">
                <div className="text-lg font-bold text-text-primary">
                  {entity.totalSuppressions.toLocaleString()}
                </div>
              </div>
              <TrendingUp className="h-4 w-4 text-accent-red" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
