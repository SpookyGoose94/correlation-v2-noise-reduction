import { Bell, Search, Sun, Moon } from 'lucide-react'
import { Button } from './ui/button'
import { useState, useEffect } from 'react'

export default function TopBar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background-primary px-6">
      {/* Search */}
      <div className="flex flex-1 items-center gap-2">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search operational events..."
            className="w-full rounded-lg border border-border bg-background-secondary py-2 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-blue focus:outline-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 rounded-lg bg-background-secondary px-3 py-2">
          <div className="h-6 w-6 rounded-full bg-accent-blue/20" />
          <span className="text-sm text-text-primary">Operator</span>
        </div>
      </div>
    </div>
  )
}
