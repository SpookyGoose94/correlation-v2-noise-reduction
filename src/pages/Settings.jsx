import Layout from '../components/Layout'
import { Settings as SettingsIcon, Bell, Shield, User } from 'lucide-react'

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-8 p-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            Settings
          </h1>
          <p className="mt-2 text-text-secondary">
            Configure your correlation and notification preferences
          </p>
        </div>

        {/* Notification Settings */}
        <section>
          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-text-primary">
              <Bell className="h-5 w-5 text-accent-blue" />
              Notification Settings
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              Control how and when you receive notifications
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background-secondary p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-text-primary">
                    Email Notifications
                  </div>
                  <div className="text-xs text-text-secondary">
                    Receive event notifications via email
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" defaultChecked />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-accent-blue peer-checked:after:translate-x-full"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-text-primary">
                    Slack Notifications
                  </div>
                  <div className="text-xs text-text-secondary">
                    Send consolidated events to Slack
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" defaultChecked />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-accent-blue peer-checked:after:translate-x-full"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-text-primary">
                    Critical Alerts Only
                  </div>
                  <div className="text-xs text-text-secondary">
                    Only notify for critical severity events
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-accent-blue peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Correlation Rules */}
        <section>
          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-text-primary">
              <Shield className="h-5 w-5 text-accent-green" />
              Correlation Rules
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              Configure how events are correlated and grouped
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background-secondary p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-text-primary">
                  Time Window (seconds)
                </label>
                <input
                  type="number"
                  defaultValue={45}
                  className="mt-2 w-full rounded-md border border-border bg-background-primary px-3 py-2 text-sm text-text-primary focus:border-accent-blue focus:outline-none"
                />
                <p className="mt-1 text-xs text-text-secondary">
                  Events within this window will be correlated
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-text-primary">
                  Confidence Threshold (%)
                </label>
                <input
                  type="number"
                  defaultValue={85}
                  min={0}
                  max={100}
                  className="mt-2 w-full rounded-md border border-border bg-background-primary px-3 py-2 text-sm text-text-primary focus:border-accent-blue focus:outline-none"
                />
                <p className="mt-1 text-xs text-text-secondary">
                  Minimum confidence to create a correlation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* User Preferences */}
        <section>
          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-text-primary">
              <User className="h-5 w-5 text-accent-cyan" />
              User Preferences
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              Customize your experience
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background-secondary p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-text-primary">
                  Default Dashboard View
                </label>
                <select className="mt-2 w-full rounded-md border border-border bg-background-primary px-3 py-2 text-sm text-text-primary focus:border-accent-blue focus:outline-none">
                  <option value="/">Dashboard (Original)</option>
                  <option value="/dashboard-2">Dashboard 2</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-text-primary">
                  Timezone
                </label>
                <select className="mt-2 w-full rounded-md border border-border bg-background-primary px-3 py-2 text-sm text-text-primary focus:border-accent-blue focus:outline-none">
                  <option>UTC</option>
                  <option>America/New_York</option>
                  <option>America/Los_Angeles</option>
                  <option>Europe/London</option>
                  <option>Asia/Tokyo</option>
                </select>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
