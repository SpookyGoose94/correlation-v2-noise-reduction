import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Loader2, MessageSquare, Mail, Bell, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import Layout from '../components/Layout'

export default function Onboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0) // Start at 0 for landing page
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    accountIds: [],
    teams: [],
    tags: [],
    alertPolicies: [],
    configuredDestinations: [], // Array of {type, channel, message, id}
    suppressionEnabled: false,
    suppressedChannels: []
  })

  const [showDestinationModal, setShowDestinationModal] = useState(false)
  const [currentDestinationType, setCurrentDestinationType] = useState(null)
  const [tempDestination, setTempDestination] = useState({
    channel: '',
    message: ''
  })

  // Mock data for destinations
  const existingDestinations = [
    { id: 1, type: 'slack', icon: MessageSquare, channel: '#alerts', notifications: 2847 },
    { id: 2, type: 'slack', icon: MessageSquare, channel: '#critical-alerts', notifications: 1523 },
    { id: 3, type: 'slack', icon: MessageSquare, channel: '#payment-alerts', notifications: 892 },
    { id: 4, type: 'email', icon: Mail, channel: 'ops@company.com', notifications: 456 },
    { id: 5, type: 'pagerduty', icon: Bell, channel: 'On-Call Engineering', notifications: 234 },
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === 4) {
      // Trigger loading state
      setIsLoading(true)
      // Simulate setup time
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }

  const startOnboarding = () => {
    setCurrentStep(1) // Move from landing (0) to first step (1)
  }

  const openDestinationModal = (destinationType) => {
    setCurrentDestinationType(destinationType)
    setTempDestination({ channel: '', message: '' })
    setShowDestinationModal(true)
  }

  const saveDestination = () => {
    const newDestination = {
      id: Date.now(),
      type: currentDestinationType,
      channel: tempDestination.channel,
      message: tempDestination.message
    }
    setFormData(prev => ({
      ...prev,
      configuredDestinations: [...prev.configuredDestinations, newDestination]
    }))
    setShowDestinationModal(false)
    setCurrentDestinationType(null)
    setTempDestination({ channel: '', message: '' })
  }

  const removeDestination = (id) => {
    setFormData(prev => ({
      ...prev,
      configuredDestinations: prev.configuredDestinations.filter(d => d.id !== id)
    }))
  }

  const availableDestinations = [
    { type: 'slack', label: 'Slack', icon: MessageSquare },
    { type: 'email', label: 'Email', icon: Mail },
    { type: 'pagerduty', label: 'PagerDuty', icon: Bell },
    { type: 'webhook', label: 'Webhook', icon: Bell },
    { type: 'jira', label: 'Jira', icon: Bell },
    { type: 'teams', label: 'Microsoft Teams', icon: MessageSquare },
  ]

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleSuppressedChannel = (channelId) => {
    setFormData(prev => ({
      ...prev,
      suppressedChannels: prev.suppressedChannels.includes(channelId)
        ? prev.suppressedChannels.filter(id => id !== channelId)
        : [...prev.suppressedChannels, channelId]
    }))
  }

  const steps = [
    { number: 1, title: 'Data Source' },
    { number: 2, title: 'Notifications' },
    { number: 3, title: 'Review' }
  ]

  // Landing page (step 0)
  if (currentStep === 0) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="mx-auto max-w-6xl px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left side - Text content */}
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-text-primary">
                  See your correlated alerts in minutes
                </h1>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Get an end-to-end picture of your operational events. Reduce alert noise by 99%,
                  consolidate related issues into clusters, and troubleshoot faster.
                </p>
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="bg-accent-blue hover:bg-accent-blue/90 text-white px-6 py-3 text-base"
                    onClick={startOnboarding}
                  >
                    Set up correlation
                  </Button>
                  <div>
                    <a
                      href="#"
                      className="text-sm text-accent-blue hover:underline inline-flex items-center gap-1"
                    >
                      See our docs
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right side - Dashboard mockup */}
              <div className="relative">
                <div className="rounded-lg border-2 border-border bg-background-secondary p-8 shadow-2xl">
                  <div className="space-y-4">
                    {/* Mock dashboard elements */}
                    <div className="flex gap-4">
                      <div className="h-32 flex-1 rounded-lg bg-background-tertiary border border-border"></div>
                      <div className="h-32 flex-1 rounded-lg bg-background-tertiary border border-border"></div>
                    </div>
                    <div className="h-48 rounded-lg bg-background-tertiary border border-border"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 rounded-lg bg-background-tertiary border border-border"></div>
                      <div className="h-24 rounded-lg bg-background-tertiary border border-border"></div>
                      <div className="h-24 rounded-lg bg-background-tertiary border border-border"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex min-h-screen">
        {/* Vertical Stepper Column */}
        <div className="w-56 border-r border-border bg-background-secondary px-6 py-8">
          <div className="space-y-1">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-start gap-3">
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                      currentStep > step.number
                        ? 'bg-accent-green text-white'
                        : currentStep === step.number
                        ? 'bg-accent-green text-white'
                        : 'border-2 border-border bg-background-primary text-text-muted'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-semibold">{step.number}</span>
                    )}
                  </div>
                  {/* Connecting line */}
                  {idx < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-6 mt-1 ${
                        currentStep > step.number ? 'bg-accent-green' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
                {/* Step label */}
                <div className="pt-1">
                  <div
                    className={`text-sm ${
                      currentStep >= step.number ? 'text-text-primary font-medium' : 'text-text-muted'
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white">
          {/* Header */}
          <div className="border-b border-border px-8 py-6">
            <h1 className="text-2xl font-bold text-text-primary">
              Correlation Setup
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Configure your correlation and notification preferences
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-16 w-16 animate-spin text-accent-blue" />
            <h2 className="mt-6 text-xl font-semibold text-text-primary">
              Setting up your correlations configuration...
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              This may take up to 20 minutes. Please don't close this page.
            </p>
          </div>
        ) : (
          <>
            {/* Step 1: Data Source Config */}
            {currentStep === 1 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-text-primary">Select Data Sources</h2>
                  <p className="text-sm text-text-muted mt-1">
                    Choose which data you want to correlate
                  </p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Account IDs
                    </label>
                    <input
                      type="text"
                      placeholder="Enter account IDs (comma-separated)"
                      className="w-full rounded-md border border-border bg-background-primary px-3 py-2 text-sm text-text-primary focus:border-accent-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Teams
                    </label>
                    <input
                      type="text"
                      placeholder="Enter team names (comma-separated)"
                      className="w-full rounded-md border border-border bg-background-primary px-3 py-2 text-sm text-text-primary focus:border-accent-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      placeholder="Enter tags (comma-separated)"
                      className="w-full rounded-md border border-border bg-background-primary px-3 py-2 text-sm text-text-primary focus:border-accent-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Alert Policies
                    </label>
                    <div className="space-y-2">
                      {['Payment Service Policy', 'Checkout Service Policy', 'Auth Service Policy', 'Database Policy'].map((policy) => (
                        <label key={policy} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-border text-accent-blue focus:ring-accent-blue"
                          />
                          <span className="text-sm text-text-primary">{policy}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Correlation Notification Setup + Suppression */}
            {currentStep === 2 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-text-primary">Correlation Notifications</h2>
                  <p className="text-sm text-text-muted mt-1">
                    Configure where cluster notifications should be sent and which channels to suppress
                  </p>
                </div>
                <div className="space-y-8">
                  {/* Notify section - configured destinations */}
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Notify</h3>
                    {formData.configuredDestinations.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-border p-6 text-center">
                        <p className="text-sm text-text-muted">
                          No destinations configured. Add a channel below.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {formData.configuredDestinations.map((dest) => {
                          const destInfo = availableDestinations.find(d => d.type === dest.type)
                          const Icon = destInfo?.icon
                          return (
                            <div
                              key={dest.id}
                              className="flex items-center justify-between rounded-lg border border-border bg-background-tertiary p-4"
                            >
                              <div className="flex items-center gap-3">
                                {Icon && <Icon className="h-5 w-5 text-text-secondary" />}
                                <div>
                                  <div className="text-sm font-semibold text-text-primary capitalize">
                                    {dest.type}
                                  </div>
                                  <div className="text-xs text-text-muted">
                                    {dest.channel}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => removeDestination(dest.id)}
                                className="text-xs text-accent-red hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Add channel section */}
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Add channel</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {availableDestinations.map((dest) => {
                        const Icon = dest.icon
                        return (
                          <button
                            key={dest.type}
                            onClick={() => openDestinationModal(dest.type)}
                            className="flex items-center gap-3 rounded-lg border border-border bg-background-tertiary p-4 text-left hover:border-accent-blue hover:bg-background-secondary transition-colors"
                          >
                            <Icon className="h-5 w-5 text-text-secondary" />
                            <span className="text-sm font-medium text-text-primary">
                              {dest.label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border"></div>

                  {/* Suppress Noise Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="suppress-toggle"
                        className="h-5 w-5 rounded border-border text-accent-blue focus:ring-accent-blue"
                        checked={formData.suppressionEnabled}
                        onChange={(e) => setFormData({ ...formData, suppressionEnabled: e.target.checked })}
                      />
                      <label htmlFor="suppress-toggle" className="text-sm font-semibold text-text-primary cursor-pointer">
                        Suppress notification noise
                      </label>
                    </div>

                    {formData.suppressionEnabled && (
                      <>
                        <p className="text-sm text-text-muted">
                          Select which existing notification channels should be suppressed when alerts are part of a cluster
                        </p>
                        <div className="rounded-lg border border-border">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-border bg-background-tertiary">
                                <th className="px-6 py-3 text-left">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-border text-accent-blue focus:ring-accent-blue"
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFormData({ ...formData, suppressedChannels: existingDestinations.map(d => d.id) })
                                      } else {
                                        setFormData({ ...formData, suppressedChannels: [] })
                                      }
                                    }}
                                    checked={formData.suppressedChannels.length === existingDestinations.length}
                                  />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-text-secondary">
                                  Destination
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-text-secondary">
                                  Channel
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-text-secondary">
                                  Total Notifications (7d)
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {existingDestinations.map((dest) => {
                                const Icon = dest.icon
                                return (
                                  <tr
                                    key={dest.id}
                                    className="hover:bg-background-tertiary cursor-pointer"
                                    onClick={() => toggleSuppressedChannel(dest.id)}
                                  >
                                    <td className="px-6 py-4">
                                      <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-border text-accent-blue focus:ring-accent-blue"
                                        checked={formData.suppressedChannels.includes(dest.id)}
                                        onChange={() => toggleSuppressedChannel(dest.id)}
                                        onClick={(e) => e.stopPropagation()}
                                      />
                                    </td>
                                    <td className="px-6 py-4">
                                      <div className="flex items-center gap-2">
                                        <Icon className="h-4 w-4 text-text-secondary" />
                                        <span className="text-sm text-text-primary capitalize">{dest.type}</span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4">
                                      <span className="text-sm text-text-primary">{dest.channel}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                      <span className="text-sm font-semibold text-text-primary">
                                        {dest.notifications.toLocaleString()}
                                      </span>
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>

                        {formData.suppressedChannels.length > 0 && (
                          <div className="rounded-lg bg-accent-green/10 border border-accent-green/20 p-4">
                            <p className="text-sm text-text-primary">
                              <span className="font-semibold">{formData.suppressedChannels.length}</span> destination(s) selected.
                              Individual alerts from correlated issues will not be sent to these channels.
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-text-primary">Review Configuration</h2>
                  <p className="text-sm text-text-muted mt-1">
                    Confirm your correlation setup before proceeding
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border bg-background-tertiary p-4">
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Data Sources</h3>
                    <div className="space-y-2 text-sm text-text-secondary">
                      <p>• 4 Alert Policies selected</p>
                      <p>• Multiple teams and tags configured</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-background-tertiary p-4">
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Cluster Notifications</h3>
                    {formData.configuredDestinations.length === 0 ? (
                      <div className="text-sm text-text-secondary">
                        • No destinations configured
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm text-text-secondary">
                        <p>• {formData.configuredDestinations.length} destination(s) configured:</p>
                        <ul className="ml-4 space-y-1">
                          {formData.configuredDestinations.map((dest) => (
                            <li key={dest.id} className="capitalize">
                              - {dest.type}: {dest.channel}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg border border-border bg-background-tertiary p-4">
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Notification Suppression</h3>
                    <div className="space-y-2 text-sm text-text-secondary">
                      {formData.suppressionEnabled ? (
                        <>
                          <div>• Status: <Badge variant="secondary" className="ml-1">Enabled</Badge></div>
                          <div>• {formData.suppressedChannels.length} destination(s) will be suppressed</div>
                        </>
                      ) : (
                        <div>• Status: <Badge variant="secondary" className="ml-1">Disabled</Badge></div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg bg-accent-blue/10 border border-accent-blue/20 p-4">
                    <p className="text-sm text-text-primary">
                      By clicking "Complete Setup", correlation will begin analyzing your alerts and creating clusters.
                      This process may take up to 20 minutes.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Back
              </Button>

              <Button
                onClick={handleNext}
                className="bg-accent-blue hover:bg-accent-blue/90"
              >
                {currentStep === 3 ? 'Complete Setup' : 'Next'}
              </Button>
            </div>
          </>
        )}
          </div>
        </div>
      </div>

      {/* Destination Configuration Modal */}
      {showDestinationModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowDestinationModal(false)}
          />

          {/* Modal */}
          <div className="fixed right-0 top-0 h-full w-[600px] bg-background-secondary border-l border-border z-50 shadow-2xl overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-text-primary capitalize">
                  Configure {currentDestinationType}
                </h2>
                <button
                  onClick={() => setShowDestinationModal(false)}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Destination-specific fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    {currentDestinationType === 'slack' ? 'Slack Workspace' : `${currentDestinationType} destination`}
                  </label>
                  <select className="w-full rounded-md border border-border bg-background-primary px-3 py-2 text-sm text-text-primary focus:border-accent-blue focus:outline-none">
                    <option>Select destination...</option>
                    {currentDestinationType === 'slack' && (
                      <>
                        <option>Company Workspace</option>
                        <option>Engineering Workspace</option>
                        <option>DevOps Workspace</option>
                      </>
                    )}
                    {currentDestinationType === 'email' && (
                      <>
                        <option>ops@company.com</option>
                        <option>alerts@company.com</option>
                      </>
                    )}
                    {currentDestinationType === 'pagerduty' && (
                      <>
                        <option>Engineering Service</option>
                        <option>On-Call Team</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    {currentDestinationType === 'slack' ? 'Channel' :
                     currentDestinationType === 'email' ? 'Email Address' :
                     'Service/Channel'}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      currentDestinationType === 'slack' ? '#correlations' :
                      currentDestinationType === 'email' ? 'ops@company.com' :
                      'Enter channel or service name'
                    }
                    className="w-full rounded-md border border-border bg-background-primary px-3 py-2 text-sm text-text-primary focus:border-accent-blue focus:outline-none"
                    value={tempDestination.channel}
                    onChange={(e) => setTempDestination({ ...tempDestination, channel: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Message Template
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Enter notification message template..."
                    className="w-full rounded-md border border-border bg-background-primary px-3 py-2 text-sm text-text-primary focus:border-accent-blue focus:outline-none"
                    value={tempDestination.message}
                    onChange={(e) => setTempDestination({ ...tempDestination, message: e.target.value })}
                  />
                  <p className="mt-1 text-xs text-text-muted">
                    Use variables like {'{cluster_name}'}, {'{issue_count}'}, {'{severity}'}
                  </p>
                </div>

                {currentDestinationType === 'slack' && (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="thread-broadcast"
                      className="h-4 w-4 rounded border-border text-accent-blue focus:ring-accent-blue"
                    />
                    <label htmlFor="thread-broadcast" className="text-sm text-text-primary">
                      Send a new message to the channel that contains a link back to the thread
                    </label>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setShowDestinationModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveDestination}
                  className="flex-1 bg-accent-blue hover:bg-accent-blue/90"
                  disabled={!tempDestination.channel}
                >
                  Save
                </Button>
              </div>

              {/* Test Notification */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={!tempDestination.channel}
                >
                  Send test notification
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}
