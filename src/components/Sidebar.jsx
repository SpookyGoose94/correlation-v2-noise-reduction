import { Home, Activity, Settings, LayoutDashboard, Rocket } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../lib/utils'

export default function Sidebar() {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/dashboard-2', icon: LayoutDashboard, label: 'Dashboard 2' },
    { path: '/events', icon: Activity, label: 'Events' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/onboarding', icon: Rocket, label: 'Onboarding' },
  ]

  return (
    <div className="fixed left-0 top-0 h-screen w-56 border-r border-border bg-background-secondary">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <h1 className="text-xl font-bold text-text-primary">
          Correlation<span className="text-accent-blue">V2</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-accent-blue/10 text-accent-blue'
                  : 'text-text-secondary hover:bg-background-tertiary hover:text-text-primary'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
        <div className="text-xs text-text-muted">
          <div className="font-semibold text-text-secondary">Noise Reduction Focus</div>
          <div className="mt-1">Real-time orchestration platform</div>
        </div>
      </div>
    </div>
  )
}
