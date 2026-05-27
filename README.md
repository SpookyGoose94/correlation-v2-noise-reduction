# Correlation V2 - Noise Reduction Platform

A complete reimagining of the correlation platform focused on **real-time noise reduction** as the primary value proposition.

## ✨ Recent Updates

### UI Polish & Correlation Rules Visibility - May 26, 2026 (Latest)

#### Contributing Correlation Rules Section
- **New section added to EventDetail drill-down page** showing which correlation rules contributed to each operational event
- **Stacked ranking display** from most contributing to least contributing rule
- **Rule details include**:
  - Rule name (e.g., "Deployment Correlation", "Service Dependency Chain", "Error Pattern Matching")
  - Description explaining what the rule does
  - Issue count badge showing how many issues each rule correlated
  - Percentage contribution with visual progress bar
- **Positioned between** "Impacted Services" and "Noise Reduction Impact" sections
- **Example rules**:
  - Deployment Correlation: 60.5% (89 issues) - Correlates issues occurring within 15 minutes of deployment
  - Service Dependency Chain: 25.9% (38 issues) - Groups issues across services with known dependencies
  - Error Pattern Matching: 13.6% (20 issues) - Matches issues with similar error signatures

#### Realistic Noise Reduction Metrics
- **Updated calculation formula** to show more relatable noise reduction percentage
- **New metrics**:
  - Total signals: 3,142
  - Notifications sent: 251 (instead of just 10 operational events)
  - Notifications consolidated: 2,891
  - **Reduction percentage: 92.0%** (was 99.7%)
  - Avg notifications per event: 25
- **Formula**: `(Total signals - Notifications sent) / Total signals × 100`
- More believable and relatable value proposition while still demonstrating significant impact

#### Clean UI Design - Icons Removed
- **Removed all decorative icons** from section headings and card titles throughout the application
- **Affected pages**:
  - EventDetail.jsx: Removed icons from "Recommended investigation avenues", "Impacted Services", "Contributing Correlation Rules", "Noise Reduction Impact"
  - Events.jsx: Removed Activity icon from "Operational Events" page heading
  - MilestoneVisualization.jsx: Removed Milestone icon from page heading
- **Cleaner, more professional appearance** with text-only headings
- **Functional icons preserved**: Dropdowns (ChevronDown), menus (MoreVertical), and content-specific icons (Server in service cards)
- **Removed unused icon imports**: CheckCircle, TrendingDown, Activity, Milestone

#### Technical Changes
- **Updated**: `src/pages/EventDetail.jsx`
  - Added Contributing Correlation Rules card with progress bars and badges
  - Removed icon components from CardTitle elements
  - Cleaned up unused icon imports
- **Updated**: `src/data/mockData.js`
  - Added `contributingRules` array to operational events (event-1, event-2)
  - Updated noise reduction metrics with realistic values (92% reduction, 251 notifications)
  - Added notificationsSent field for accurate calculations
- **Updated**: `src/pages/Events.jsx`, `src/pages/MilestoneVisualization.jsx`
  - Removed decorative icons from page headings
  - Cleaned up unused imports

### Onboarding Flow Implementation - May 25, 2026

#### Complete Onboarding System
A comprehensive multi-step onboarding flow has been implemented to guide users through correlation and notification suppression setup. This replaces the original "out-of-the-box" approach where the system would automatically configure correlation rules.

#### Onboarding Landing Page
- **Hero section** with value proposition messaging
  - Headline: "See your correlated alerts in minutes"
  - Description highlighting 99% noise reduction and faster troubleshooting
  - "Set up correlation" CTA button to start the flow
  - "See our docs" link for additional resources
- **Dashboard mockup preview** showing what users will see after setup
- **Sidebar navigation** remains accessible during onboarding
- **Located at**: `/onboarding` route with "Onboarding" menu item (Rocket icon)

#### Multi-Step Configuration Flow
**Step 1: Data Source Configuration**
- **Account IDs** - Text input for comma-separated account IDs to correlate
- **Teams** - Text input for team names
- **Tags** - Text input for tags to include in correlation
- **Alert Policies** - Checkbox list to select which policies to correlate:
  - Payment Service Policy
  - Checkout Service Policy
  - Auth Service Policy
  - Database Policy
- Users define the scope of data to be correlated

**Step 2: Correlation Notifications & Suppression**
- **"Notify" section** displays configured destinations:
  - Shows destination type icon (Slack, Email, PagerDuty, etc.)
  - Displays channel/recipient information
  - Remove button for each destination
- **"Add channel" section** with available destinations:
  - Slack, Email, PagerDuty, Webhook, Jira, Microsoft Teams
  - Grid layout with hover effects
  - Click to open destination-specific configuration modal
- **Side modal overlay** (600px width, slides in from right):
  - Destination/workspace dropdown selection
  - Channel/email input field
  - Message template textarea with variable support (`{cluster_name}`, `{issue_count}`, `{severity}`)
  - Platform-specific options (e.g., Slack thread broadcast checkbox)
  - Save/Cancel buttons
  - "Send test notification" button
- **Multi-destination workflow**:
  - Users can configure multiple destinations
  - Each destination gets its own notification when clusters are created
  - Configured destinations appear as cards in "Notify" section
- **Divider line** separates notification setup from suppression section
- **"Suppress notification noise" toggle** - Main control to enable/disable suppression
- **Destination suppression table** (when enabled):
  - Shows all active destination/channel combinations from existing notification workflows
  - Columns: Checkbox | Destination icon/name | Channel | Total Notifications (7d)
  - Multi-select functionality with "select all" header checkbox
  - Row click to toggle selection
  - Hover effects for better UX
- **Suppression summary card**:
  - Shows count of selected destinations
  - Explains that individual alerts from correlated issues won't be sent to selected channels
  - Green accent styling for positive reinforcement
- **Logic**: When an issue is correlated into a cluster, individual alert notifications are suppressed to selected destinations. Only the cluster notification (configured above in this step) is sent.

**Step 3: Review Configuration**
- **Data Sources summary card** - Shows count of selected policies, teams, and tags
- **Cluster Notifications summary card** - Lists all configured destinations with channels
- **Notification Suppression summary card** - Shows enabled/disabled status and suppression count
- **Final confirmation message** with 20-minute setup time warning
- **"Complete Setup" button** to finalize configuration

#### Loading State & Completion
- **Full-page loading screen** after clicking "Complete Setup"
- **Animated spinner** with brand colors
- **Status message**: "Setting up your correlations configuration..."
- **Time warning**: "This may take up to 20 minutes. Please don't close this page."
- **Auto-redirect** to main dashboard after 3 seconds (simulated)

#### Progress Indicator
- **Vertical stepper** positioned between sidebar menu and main content
- **Clean, compact design** with minimal spacing between steps
- **Active step highlighting** with green circular badge
- **Completed steps** marked with white checkmark on green background
- **Pending steps** shown as outlined circles with gray styling
- **Connecting lines** between steps (thin vertical lines)
- **Step labels**: Data Source, Notifications, Review
- **Stepper persists** throughout the multi-step flow (not on landing page)

#### Key Concepts Implemented

**Alert Policy Hierarchy**:
- Issues (Alerts) → belong to → Alert Policies → assigned to → Notification Workflows
- Each notification workflow defines destinations, channels, and message formatting
- When an issue fires, it follows the notification workflow assigned to its alert policy

**Correlation Logic**:
- 50 issues correlated into 1 cluster = send 1 notification (not 50)
- Cluster notification goes to destinations configured in Step 2
- Individual alert notifications are suppressed to selected destinations (Step 3)
- Clusters accumulate issues over time without spamming notifications
- Future: Milestones can trigger additional cluster notifications (severity upgrade, threshold crossed)

**Suppression vs. Cluster Notifications**:
- **Cluster notifications** (Step 2): Where the "1 consolidated notification" gets sent
- **Suppression** (Step 3): Which existing alert notification channels to silence when issues are part of a cluster
- Example: Cluster notification goes to `#correlations`, suppression prevents 50 individual alerts to `#alerts` channel

#### Technical Implementation
- **New page**: `src/pages/Onboarding.jsx`
- **Route added**: `/onboarding` in `src/App.jsx`
- **Sidebar item**: "Onboarding" with Rocket icon in `src/components/Sidebar.jsx`
- **Layout structure**:
  - Landing page: Wrapped in Layout component (shows sidebar menu)
  - Multi-step flow: Three-column layout
    - Left: Sidebar menu (from Layout component, 56px/14rem width)
    - Center: Vertical stepper (56px/14rem width, border-right)
    - Right: Main content area (flex-1, takes remaining space)
  - Stepper design: Compact circles (h-7 w-7), tight spacing (space-y-1), short connecting lines (h-6)
- **State management**:
  - `currentStep` - Tracks user progress (0 = landing, 1-3 = steps)
  - `formData.configuredDestinations` - Array of configured notification destinations
  - `formData.suppressedChannels` - Array of selected channels for suppression
  - `showDestinationModal` - Controls side modal visibility
  - `tempDestination` - Holds in-progress destination configuration
- **Components**:
  - Landing page with Layout wrapper
  - Multi-step form with conditional rendering
  - Vertical stepper with green active/completed states and gray pending states
  - Side modal overlay with backdrop (600px width)
  - Loading state screen
- **Navigation**: Back/Next buttons with proper step validation

#### Demo & Stakeholder Workflow
- **"Onboarding" menu item** in sidebar allows repeated access to flow
- Useful for demoing the complete setup experience to stakeholders
- Can trigger onboarding anytime without requiring first-time-user state
- All steps can be walked through independently

#### Files Changed
- **Created**: `src/pages/Onboarding.jsx` (complete onboarding flow)
- **Updated**: `src/App.jsx` (added `/onboarding` route)
- **Updated**: `src/components/Sidebar.jsx` (added Onboarding menu item with Rocket icon)

### Alert Preferences & Event Prioritization - May 21, 2026

#### Alert Preferences Side Panel
- **New "Preferences" button** added to "What Needs Attention" section header
- **Side panel modal** that slides in from the right with full page height
- **Service Prioritization**:
  - Checkbox list for priority services (payment, checkout, auth, inventory, shipping)
  - Events from selected services will appear first on the dashboard
- **Alarming Criteria Configuration**:
  - Granular control over which conditions trigger dashboard alerts
  - Options include:
    - More than 50 issues in 30 mins
    - All issues are for only one service
    - Deployment correlation detected
    - Error rate spike > 50%
    - Multiple services impacted
    - Critical severity events only
- **Smooth slide-in animation** from right edge of screen
- **Dark backdrop** with click-outside-to-close functionality

#### Event Card Stack Ranking
- **Expanded from 3 to 6 event cards** (2 rows of 3 columns)
- **Smart severity-based sorting**: All cards now ranked by severity across the entire grid
  - Critical events appear first (positions 1-4)
  - High severity events follow (positions 5-6)
  - Medium severity events excluded from dashboard
- **Badge updated** to show "Top 6 of X events"
- Eliminates confusing per-row ranking (previously had critical at positions 1 and 4)

#### EventDetail Page Enhancements
- **Recommended investigation avenues** (renamed from "Investigation Steps"):
  - Added parent CTA button: "Initiate with SRE agent"
  - Added three-dot menu to each investigation step
  - Dropdown option: "Check with SRE agent"
- **Impacted Services** card:
  - Added parent CTA button: "Investigate"
  - Added three-dot menu to each service card
  - Dropdown option: "Investigate" (per-service)
- **Improved dropdown positioning**: Dropdowns now appear directly next to their trigger buttons for better UX

#### Milestone Terminology Updates
- **Renamed** "Cluster Created" → **"Pattern Initiated"**
  - Better reflects the beginning of the correlation pattern detection
  - More user-friendly terminology aligned with operational language

#### Technical Changes
- **Updated `src/pages/Home.jsx`**:
  - Added useState for preferences modal
  - Implemented severity-based sorting with `.sort()` filtering critical first
  - Added Settings icon import from lucide-react
  - Modal positioned outside Layout to prevent z-index conflicts
- **Updated `src/pages/EventDetail.jsx`**:
  - Added MoreVertical icon for three-dot menus
  - Implemented dropdown state management for investigation and service menus
  - Added parent CTA buttons to both cards
  - Fixed dropdown positioning with `relative` class on parent containers
  - Updated milestone data with new "Pattern Initiated" label
  - Renamed card title to "Recommended investigation avenues"
- **Created comprehensive preferences UI**:
  - Service priority checkboxes with hover effects
  - Alarming criteria checkboxes with default selections
  - Cancel/Save buttons with proper styling

### Operational Events List Redesign - May 19, 2026

#### Simplified & Cleaner Event Cards
- **Removed weekly trend graphs** from list view for cleaner, more scannable UI
- **Highlighted actionable criteria** as the primary focus:
  - Blue background box with left accent border
  - Criteria text in blue for emphasis (e.g., "Deployment correlation detected")
  - Clear explanation: "A total of 147 issues occurred in the last 30 mins"
- **Streamlined metrics row**:
  - Shows Issues and Notifications side by side
  - Removed chart clutter for faster scanning
- **Better visual hierarchy**:
  - Title + severity + mute button on first line
  - Actionable criteria prominently highlighted on second line
  - Metrics and services on subsequent lines

#### Dashboard 2 Cleanup
- **Removed duplicate "What Needs Attention" section** from Dashboard 2
- Dashboard 2 now shows:
  1. Notification Reduction Summary (top)
  2. Recent Critical Events list (bottom)
- Eliminated redundancy between horizontal cards and vertical list

#### Technical Changes
- Updated `src/components/OperationalEventsList.jsx`:
  - Removed AreaChart/BarChart imports
  - Added highlighted blue box for actionable criteria
  - Simplified metrics display (no chart rendering)
  - Better spacing and alignment
- Updated `src/pages/Dashboard2.jsx`:
  - Removed OperationalEventsCards2 section
  - Kept only NoiseReductionPanel2 and OperationalEventsList

### Collapsible Dashboard Sections - May 19, 2026

#### What Changed Recently Section - Collapsible
- **Made "What Changed Recently" section collapsible** to reduce dashboard clutter
- **Collapsed by default** - users can expand when needed
- **Clickable heading** with hover effect (blue text on hover)
- **Chevron icon** indicates expand/collapse state:
  - ChevronDown when collapsed
  - ChevronUp when expanded
- **State management**: Uses React useState to track collapsed state
- **Smooth transitions** on expand/collapse

#### Technical Changes
- Updated `src/pages/Home.jsx`:
  - Added useState for collapsed state (default: true)
  - Added ChevronDown/ChevronUp icons from lucide-react
  - Made h2 heading clickable with cursor-pointer
  - Conditional rendering of content grid based on collapsed state

### Signal Management & Issue Detail Modal - May 19, 2026

#### Issue Detail Side Modal
- **New side modal overlay** that opens when clicking on any signal in the Contributing Signals table
- **Covers 80% of screen width** sliding in from the right
- **Dark backdrop** with click-outside-to-close functionality
- **Comprehensive issue drill-down** including:
  - Issue header with severity, status, created/updated timestamps
  - "Declare an incident" action button
  - AI summary section (Beta)
  - **Alert Events** expandable section with:
    - Left panel: List of all related alerts with severity, status, opened time, duration
    - Right panel: Detailed alert view with NRQL query, time series chart, entity info, tags
  - **Issue Timeline & Event Log** showing incident progression
  - **Impacted Entities** section with service relationships
- **Tab navigation** between Overview and Root Cause Analysis

#### Contributing Signals Redesign
- **Renamed** "Contributing Issues" → **"Contributing Signals"**
  - Better reflects the reality that table contains multiple signal types (issues, change events, etc.)
- **Added Type column** with badge showing either "Issue" or "Change Event"
- **Column order optimized**: Severity Dot → Signal → Type → Service → Entity → Time
- **Removed Source column** (unified to single source for now)
- **Proper HTML table structure** with consistent `px-6 py-4` padding matching Events page

#### Filter Bar Reorganization
- **Primary filter redesigned**:
  - Removed "Filter by rule:" label
  - Changed default to **"Golden signals"** with dropdown options:
    - Golden signals (default)
    - Components
    - Scope
- **Secondary pill filters updated**:
  - **Added "Rules = All"** pill with dropdown showing correlation rules
  - **Added "Service = All"** pill with service filtering
  - **Added "Severity = All"** pill with severity filtering
  - **Removed "Source"** pill (no longer needed with unified source)
- **All filters work together** to narrow down signals
- **Dropdown overlays** on each pill for selecting values
- **Active state styling** with blue highlight when filter is applied

#### Milestone Visualization Integration
- **Moved from standalone page** to EventDetail drill-down page
- **Integrated as collapsible widget** (collapsed by default)
- **Positioned as second widget** on EventDetail page
- **Renamed** to "Operational Event Maturity Milestones"
- **Chevron icon** indicates expand/collapse state
- **Removed** milestone navigation tab from sidebar menu
- **Hover interactions** on milestone icons show:
  - Issue count at that milestone point
  - Notification channels (Slack, PagerDuty) if notification was sent
  - Displayed as overlay popover beside icon

#### Dashboard Optimization
- **Limited "What Needs Attention"** to show **top 3 events only**
- **Updated badge text** from "{X} active events" to "Top 3 of {X} events"
- **Cleaner focus** on highest-priority operational events
- **Full event list** still accessible via Events page

#### Top Affected Services Table
- **Converted to proper HTML table** matching Events page styling
- **Removed "Top Services" column** for cleaner layout
- **Removed "Affected Entity" column** for further simplification
- **Standardized table structure**:
  - Consistent `px-6 py-4` padding on all cells
  - Proper header styling with `text-xs font-semibold uppercase`
  - Hover effects with `hover:bg-background-tertiary`
  - Proper dividers with `divide-y divide-border`
- **Current columns**: Service (with icon) → Severity → Total Suppressions (7d)

#### Technical Changes
- **New component**: `src/components/IssueDetailModal.jsx` (comprehensive issue drill-down)
- **Updated components**:
  - `src/pages/EventDetail.jsx` - Added modal integration, filter redesign, milestone widget
  - `src/components/TopAffectedEntitiesTable.jsx` - Converted to HTML table
  - `src/pages/Home.jsx` - Limited to top 3 events
  - `src/components/Sidebar.jsx` - Removed milestone navigation
- **Updated mock data**: Added `type` field to signals (Issue/Change Event)
- **Filter state management**: Added multi-filter support with dropdown components

### Operational Events & Milestone Visualization - May 19, 2026

#### New Events Page
- **Centralized operational events view**: Complete list/table of all correlated operational events
- **Stats dashboard** at the top showing:
  - Total events count
  - Active events count
  - Total issues correlated across all events
  - Total notifications sent
- **Comprehensive events table** with columns:
  - Event Name (title + description preview)
  - Severity badge (critical/high color-coded)
  - Total Issues correlated
  - Notifications sent count
  - Status (Active, Investigating, Resolved, Degrading, Closed)
  - Last Updated (relative time)
- **Clickable rows**: Navigate to event detail drill-down
- **Accessible via sidebar**: New "Events" menu item

#### Milestone Visualization System
- **New dedicated page** for exploring milestone visualization options
- **Operational Event Maturity Model**:
  - Milestones represent key evolution points in an event's lifecycle
  - Each milestone shows: issue count at that point, action taken, timestamp
  - Notifications are actions within milestones, not separate milestones
  - Multiple milestones can occur within the same saturation phase

- **Two Visualization Options**:

  **Option 3: Mountain Elevation (Issue Growth Chart)**
  - Area chart showing issue count climbing over time
  - Visual metaphor of "climbing" event maturity
  - Milestone cards below chart with full details

  **Option 4: Horizontal Progress Bar** ⭐ (Primary)
  - Color-coded bar representing issue saturation progression:
    - Blue (15%) - Low saturation
    - Yellow (25%) - Elevated
    - Orange (45%) - High (largest block)
    - Red (15%) - Critical
  - Milestones positioned below bar with vertical connecting lines
  - Generic icon styling (not color-coded)
  - Green notification badges on milestones where notifications were sent
  - Multiple milestones can appear in same color block
  - Example progression:
    1. Cluster Created (1 issue) → notification sent
    2. Event Renamed (45 issues) → no notification
    3. Issue Threshold Crossed (120 issues) → notification sent
    4. Severity → Critical (155 issues) → notification sent

#### Core Correlation Engine Logic
**Rules-Based Correlation**:
- System or user-defined rules determine correlation criteria
- Example rule: Correlate issues from ServiceNOW + NewRelic for accounts X,Y,Z where error rate >30% and tags match
- When issues match rules, they form a **cluster** (internal term) = **Operational Event** (user-facing term)

**Cluster Evolution & Maturity**:
- Clusters evolve over time as more issues correlate
- Evolution examples:
  - Renaming: "Database latency" → "Checkout service error spikes"
  - Severity upgrades: High → Critical (when thresholds crossed)
  - Issue saturation increases: 1 → 45 → 120 → 155 issues
- **Milestones** = key points in cluster maturity where actions are triggered

**Notification Configuration**:
- User-defined triggers for when to send notifications
- Examples:
  - "Send notification on cluster creation"
  - "Send notification if 10+ issues in 30min window"
  - "Send notification on severity upgrade"
- Destinations: Slack, PagerDuty, etc.

#### Technical Changes
- **New pages**: `src/pages/Events.jsx`, `src/pages/MilestoneVisualization.jsx`
- **Updated routing**: Added `/events` and `/milestone-visualization` routes
- **Sidebar navigation**: Added "Events" and "Milestone Visualization" menu items
- **Mock data updates**: Added `notificationsSent` field to operational events
- **Color palette**: Added `accent-purple` to Tailwind config
- **Card component fixes**: Reduced padding conflicts between Card and CardContent
- **Clasp-it integration**: Used for UI debugging and layout fixes

### Major UI/UX Overhaul - May 18, 2026

#### Dashboard Layout Improvements
- **Redesigned "What Needs Attention" section**:
  - Switched from scannable table to **compact horizontal card grid** (3-column layout on desktop)
  - Each card now displays:
    - Truncated event title for space efficiency
    - Service count and severity badges at the top
    - **Issues Suppressed** metric prominently displayed with trending icon
    - **Weekly Trend** bar chart showing 7 days of data (Mon-Sun)
    - **Top Impacted Services** as grey badge pills at the bottom
  - Reduced padding from `p-6` to `p-4` and minimized all margins for better viewport utilization
  - Cards now fit both sections in viewport simultaneously
  - Hover effects with blue border highlight
  - Click-through navigation to event detail page maintained

- **Simplified "Top Affected Entities"**:
  - Converted from horizontal card grid to **clean table format** for maximum scannability
  - Table displays: Entity name, Service badge, Severity badge, Top Services (3 badges), Total Suppressions
  - Hover effects on rows for better interactivity
  - Removed charts from this section to reduce visual clutter

#### Badge Accessibility & Visual Improvements
**The Challenge**: Light mode badges were nearly invisible with poor contrast

**The Solution**:
- **Service name badges** (`secondary` variant):
  - Light mode: `bg-gray-200 text-gray-700` - visible grey background with dark text
  - Dark mode: `bg-background-tertiary text-text-secondary` - maintained original styling

- **Severity badges** (warning/destructive variants):
  - **Critical** (red badge): `bg-red-100 text-red-900` in light mode - light pink background with dark red text
  - **High** (yellow badge): `bg-yellow-100 text-yellow-800` in light mode - light yellow background with dark yellow text
  - Dark mode: Maintained semi-transparent backgrounds with bright text
  - Added `!important` flag to override CSS specificity issues

- **Meets WCAG AA accessibility standards** in both light and dark modes
- All badge text now clearly readable with proper contrast ratios

#### Data & Chart Improvements
- **Weekly trend data**: Changed x-axis from timestamps (`22:30`, `22:35`) to days of week (`Mon`, `Tue`, `Wed`)
- **Realistic data patterns**: Replaced ascending-only values with varied patterns showing:
  - Mid-week spikes
  - Weekend dips
  - More authentic operational event patterns
- Bar charts use severity-based colors for visual consistency

#### Developer Experience Enhancements
- **Created automated deployment scripts**:
  1. `deploy.sh` - Quick deploy without README updates (existing)
  2. `deploy-with-readme.sh` - Interactive script that prompts for README documentation
  3. `auto-deploy.sh` - Fully automated script that generates README updates based on file changes

- **Added DEPLOYMENT.md**: Comprehensive guide explaining:
  - When to use each deployment script
  - Comparison table of all options
  - Recommended workflows
  - Safety features (backups, change detection, co-author attribution)

- **Smart README management**:
  - Scripts detect what changed (components, pages, styles, data)
  - Automatically insert updates into "Recent Updates" section with timestamps
  - Create backups before modifications
  - No manual README editing needed for routine updates

#### Technical Improvements
- Fixed Tailwind config to include standard color palette
- Removed problematic color imports that were causing badge rendering issues
- Cleared Vite cache to resolve CSS hot-reload problems
- Optimized component structure for better maintainability

#### Files Changed
- `src/components/OperationalEventsCards.jsx` - New horizontal card component
- `src/components/TopAffectedEntitiesTable.jsx` - New simple table component
- `src/components/ui/badge.jsx` - Complete accessibility overhaul
- `src/data/mockData.js` - Updated with realistic weekly patterns
- `src/pages/Home.jsx` - Switched to new card and table components
- `tailwind.config.js` - Fixed color palette configuration
- Added: `deploy-with-readme.sh`, `auto-deploy.sh`, `DEPLOYMENT.md`

## 🎯 Core Philosophy Shift

### From V1 to V2:
- **V1**: Insight-first correlation with sense-making layer
- **V2**: **Noise reduction first** - real-time operational orchestration

### Key Principles (from Addendum PDF):
1. **Correlation ≠ RCA** - Different problems at different stages
   - Correlation: Real-time noise reduction ("What belongs together?")
   - RCA: Investigation/resolution ("What caused what?")
2. **Real-time Constraint**: Must reduce noise BEFORE notifications reach customers
3. **Not "Duplicate Suppression"** - It's **"Operational Event Consolidation"**
4. **Adaptive Orchestration, Not Static Suppression**
5. **Operator-centric**, not engine-centric

## 🚀 Running the Application

```bash
npm install
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) (or the port shown in terminal)

## 🚀 Deploying to Vercel

The app is deployed at: **https://correlation-v2-noise-reduction.vercel.app**

### Deployment Options

We provide **3 deployment scripts** to fit different workflows:

#### 1. Quick Deploy (No README updates)
```bash
./deploy.sh "Your commit message"
```

Best for: Quick fixes, minor changes where README doesn't need updating

#### 2. Interactive Deploy with README Prompts
```bash
./deploy-with-readme.sh "Your commit message"
```

**Recommended for most changes!** This script:
- Detects what type of files changed (components, pages, styles, data)
- Prompts you if README should be updated
- Asks for your description of changes
- Automatically inserts update into README with timestamp
- Commits and pushes everything together

#### 3. Fully Automated Deploy
```bash
./auto-deploy.sh "Your commit message"
```

Best for: Rapid iterations. Automatically generates README updates based on file changes and pushes everything without prompts.

### What These Scripts Do

All scripts will:
1. Stage all changes
2. Create a commit with your message
3. Add co-author attribution (Claude Opus 4.6)
4. Push to GitHub
5. Trigger automatic Vercel deployment (~1-2 minutes)

### Detailed Documentation

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for:
- Complete guide for each script
- Comparison table
- Recommended workflows
- Safety features
- Troubleshooting

### Manual Deploy

```bash
git add .
git commit -m "Your message"
git push
```

Vercel automatically deploys on every push to the `main` branch.

## 🎨 Features

### Theme Support
- **Dark Mode** (default)
- **Light Mode** - Toggle via sun/moon icon in top bar
- Theme preference persisted in localStorage
- **Accessibility-first badges**:
  - High contrast text colors in both light and dark modes
  - Service name badges: grey background with dark text
  - Severity badges: colored backgrounds with optimized text contrast
    - Critical (red): light red background with dark red text
    - High (yellow): light yellow background with dark yellow text
  - Meets WCAG accessibility standards

### Responsive Design
- Built with Tailwind CSS v3.4.17
- CSS variables for easy theming
- Mobile-friendly layout
- Compact card designs optimized for viewport visibility

## 📊 Application Structure

### Navigation
The application has 3 main sections accessible via the sidebar:
1. **Dashboard** - Home page with 4-section summary view (shows top 3 events)
2. **Events** - Complete list of all operational events
3. **Settings** - (Future) Configuration and preferences

**Note**: Milestone Visualization is now integrated into the EventDetail drill-down page as a collapsible widget, not a separate navigation item.

### Dashboard (Home Page) - 4-Section Layout:

#### 1. What Needs Attention
- **Compact horizontal card grid** (3-column layout on desktop)
- Each card displays:
  - Event title (truncated if needed)
  - Service count and severity badges
  - **Issues Suppressed** - large metric showing noise reduction impact
  - **Weekly Trend** - bar chart with 7 days of data (Mon-Sun)
  - **Top Impacted Services** - grey badge pills for quick scanning
- Clickable cards navigate to event detail
- Hover effect with blue border highlight

#### 2. Top Affected Entities
- **Simple table format** for maximum scannability
- Displays top 3 entities with highest suppression activity (7-day window)
- Table columns:
  - Entity name with server icon
  - Service badge
  - Severity badge (critical/high)
  - Top Services (up to 3 badges)
  - Total Suppressions count with trending icon
- Hover effect on rows

#### 3. What Changed Recently (Collapsible)
- **Collapsed by default** to reduce dashboard clutter
- **Click heading to expand/collapse** with chevron icon indicator
- 3 cards showing emerging patterns
- Baseline comparison (7-day rolling)
- Pattern types:
  - Pattern coverage increases
  - Velocity changes
  - Blast radius expansions

#### 4. Notification Reduction Summary ⭐ (THE HERO)
- **Hero Metric**: 92.0% noise reduction
- 3,142 signals → 10 operational events → 251 notifications sent
- 2,891 notifications consolidated
- Weekly trend chart
- Orchestration metrics:
  - Avg stabilization window: 38s
  - Cluster activation rate: 94%
  - Orchestration confidence: 89%
  - False positive rate: 2.3%

### Events Page Structure

**Stats Bar** (Top):
- Total Events count
- Active Events count
- Total Issues Correlated
- Notifications Sent

**Events Table**:
- Event Name (title + description preview)
- Severity (critical/high badge)
- Total Issues correlated
- Notifications sent count
- Status (Active, Investigating, Resolved, Degrading, Closed)
- Last Updated (relative time)
- Clickable rows → navigate to event detail

### Milestone Visualization Page

**Purpose**: Visualize operational event maturity progression and cluster evolution

**Current Visualizations**:

**Option 3: Mountain Elevation Chart**
- Area chart showing issue count growth over time
- Milestone cards displayed below chart
- Shows cumulative issue progression

**Option 4: Horizontal Progress Bar** ⭐ (Primary)
- Color-coded saturation bar:
  - Blue (15%) - Low saturation
  - Yellow (25%) - Elevated
  - Orange (45%) - High (largest block, where most milestones occur)
  - Red (15%) - Critical
- Milestones positioned below bar with vertical connecting lines
- Generic icon styling (neutral colors)
- Green notification badge when notification was sent
- Shows exactly where in the saturation lifecycle each milestone occurred

**Milestone Data Structure**:
- Issue Count at milestone point
- Action taken (cluster created, renamed, threshold crossed, severity upgraded)
- Timestamp
- Notification sent (yes/no)

## 📋 Event Detail Page

### Top Actions
- **Back to Dashboard** button
- **Investigate** button (primary CTA)
- **Noise Reduction Settings** button

### Tab Navigation
- **Overview Tab** (default)
  - Full event details, metrics, and analysis
- **Root Cause Analysis Tab**
  - Placeholder for future RCA functionality
  - Separated from correlation per V2 principles

### Overview Tab Sections:

#### Event Header
- Severity and status badges
- Event title and description
- Key operational metrics grid:
  - Impacted users
  - Failed transactions
  - Revenue impact
  - Service downtime

#### Operational Event Maturity Milestones (Collapsible Widget)
- **Collapsed by default** with chevron indicator
- **Horizontal progress bar** showing issue saturation:
  - Blue (15%) - Low
  - Yellow (25%) - Elevated
  - Orange (45%) - High
  - Red (15%) - Critical
- **Milestones positioned below bar** with vertical connecting lines
- **Hover on milestone icons** shows:
  - Issue count at that milestone point
  - Notification channels if notification was sent
- **Example milestones**:
  - Cluster Created (1 issue) → notification sent
  - Event Renamed (45 issues) → no notification
  - Issue Threshold Crossed (120 issues) → notification sent
  - Severity → Critical (155 issues) → notification sent

#### Side-by-Side Cards
**Left: Recommended Investigation Steps**
- Non-executable suggestions
- 3 key steps with action + reason format
- Examples: "Check deployment logs" (reason: "Errors started immediately after deployment")

**Right: Impacted Services**
- Service breakdown with actionable data:
  - Issue count per service
  - Error rate percentage
  - Severity level
  - Top issue type
  - Entity count

#### Contributing Correlation Rules
- **Shows which rules identified and grouped issues** into this operational event
- **Stacked ranking** from most contributing to least contributing
- **Each rule displays**:
  - Rule name with description
  - Issue count badge
  - Percentage contribution (both numeric and visual progress bar)
- **Example rules**:
  - Deployment Correlation: 60.5% (89 issues)
  - Service Dependency Chain: 25.9% (38 issues)
  - Error Pattern Matching: 13.6% (20 issues)
- **Clean card design** without decorative icons

#### Noise Reduction Impact (Unified Card)
**Top Section:**
- **Left**: Three key metrics (stacked vertically)
  - Issues Suppressed (e.g., 147)
  - Reduction Percentage (calculated based on notifications sent vs. would-be notifications)
  - Stabilization Window (e.g., 45s)
- **Right**: Issue Accumulation Timeline
  - Line chart showing how issues accumulated over time
  - Y-axis: Total issues
  - X-axis: Time

**Bottom Section:**
- **Contributing Signals** (renamed from "All Suppressed Issues")
  - **Filter Bar**:
    - Primary dropdown: Golden signals / Components / Scope
    - Secondary pills: Rules, Service, Severity (with dropdown overlays)
  - **Scrollable table** (max-height 500px)
  - Shows all correlated signals (e.g., 147 signals)
  - Columns: Severity dot, Signal title, Type (Issue/Change Event), Service, Entity, Time
  - **Clickable rows** open Issue Detail Modal
  - Badge: "147 signals correlated into 1 notification"

#### Issue Detail Modal
- **80% width side modal** sliding from right
- **Dark backdrop** with click-outside-to-close
- **Comprehensive drill-down**:
  - Issue header with severity, status, timestamps, current stage
  - "Declare an incident" action button
  - AI summary (Beta)
  - Alert Events section with dual-panel view (list + detail)
  - NRQL query display with time series chart
  - Entity information and tags
  - Issue timeline & event log
  - Impacted entities section
- **Tab navigation**: Overview / Root Cause Analysis

## 📈 Key Metrics & Data

### Noise Reduction Metrics
- **Total Noise Reduction**: 92.0%
- **Total Signals**: 3,142
- **Notifications Sent**: 251
- **Notifications Consolidated**: 2,891 (out of 3,142 signals)
- **Operational Events Created**: 10
- **Avg Notifications Per Event**: 25
- **Calculation**: (3,142 - 251) / 3,142 × 100 = 92.0%

### Orchestration Performance
- **Avg Stabilization Window**: 38 seconds
- **Cluster Activation Rate**: 94%
- **Orchestration Confidence**: 89%
- **False Positive Rate**: 2.3%

### Sample Operational Events
1. **Deployment-related operational event**
   - 147 issues suppressed
   - Services: checkout, payment, auth
   - Confidence: 94%

2. **Infrastructure saturation**
   - 89 issues suppressed
   - Services: database, api-gateway, user-service, order-service
   - Confidence: 87%

3. **Payment degradation**
   - 62 issues suppressed
   - Services: payment, checkout, billing
   - Confidence: 91%

## 🛠 Technology Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v3.4.17
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build**: Vite 8.0.13

## 🎯 Design Principles

1. **Noise Reduction First**
   - Primary value proposition always visible
   - Green highlighting for suppression metrics

2. **Actionable Information**
   - Not just service names, but issue counts, error rates, severity
   - Context for user decisions

3. **Non-Executable Recommendations**
   - Suggestions, not automated actions
   - Respects operator expertise

4. **Separation of Concerns**
   - Correlation (Overview) ≠ RCA (separate tab)
   - Real-time consolidation vs. post-incident analysis

5. **Scannable UI**
   - Table views for "What Needs Attention"
   - Compact card layouts
   - Prominent metrics

## 📁 Project Structure

```
correlation-v2/
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx (Dashboard, Events, Settings)
│   │   ├── TopBar.jsx (with theme toggle)
│   │   ├── IssueDetailModal.jsx (side modal for signal drill-down)
│   │   ├── OperationalEventsCards.jsx (horizontal card grid)
│   │   ├── OperationalEventsTable.jsx (legacy)
│   │   ├── TopAffectedEntitiesTable.jsx (HTML table view)
│   │   ├── TopAffectedEntitiesPanel.jsx (legacy)
│   │   ├── NoiseReductionPanel.jsx
│   │   ├── RecentChangesCard.jsx
│   │   └── ui/ (shadcn components with accessibility improvements)
│   ├── pages/
│   │   ├── Home.jsx (Dashboard - shows top 3 events)
│   │   ├── Events.jsx (All operational events list)
│   │   ├── EventDetail.jsx (with tabs, milestone widget, signal filtering)
│   │   └── MilestoneVisualization.jsx (standalone page - kept for reference)
│   ├── data/
│   │   └── mockData.js (includes signal types and correlation rules)
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   ├── index.css (with light/dark theme variables)
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── tailwind.config.js (with accent-purple added)
└── vite.config.js
```

## 🔄 Workflow Examples

### Scenario 1: Responding to an Active Event (Dashboard)
1. **User receives 1 notification** instead of 147 separate alerts
2. **Opens dashboard** → sees "Deployment-related operational event detected" in card grid
3. **Clicks event** → navigates to detail page
4. **Reviews Overview tab**:
   - Sees 147 issues suppressed into 1 notification (99.3% reduction)
   - Checks affected services breakdown (payment: 67 issues, 42% error rate)
   - Reviews recommended investigation steps
   - Examines issue accumulation timeline
   - Scrolls through all 147 suppressed issues if needed
5. **Takes action**: Clicks "Investigate" or "Noise Reduction Settings"
6. **(Future)** Switches to RCA tab for post-incident analysis

### Scenario 2: Reviewing All Events (Events Page)
1. **User navigates to Events page** via sidebar
2. **Reviews stats bar** at top:
   - Total events: 3
   - Active events: 2
   - Total issues correlated: 298
   - Notifications sent: 6
3. **Scans events table**:
   - Sees all events with severity, issue count, status, and timestamps
   - Identifies high-priority events (critical severity, active status)
4. **Clicks any event row** → navigates to detailed drill-down

### Scenario 3: Understanding Event Evolution (Milestone Visualization)
1. **User views milestone visualization** to understand cluster maturity
2. **Sees horizontal progress bar** with color-coded issue saturation:
   - Blue → Yellow → Orange → Red (calm to critical)
3. **Reviews milestones below bar**:
   - Milestone 1: Cluster created (1 issue) → notification sent
   - Milestone 2: Event renamed (45 issues) → no notification
   - Milestone 3: Issue threshold crossed (120 issues) → notification sent
   - Milestone 4: Severity upgraded to critical (155 issues) → notification sent
4. **Understands cluster behavior**: Multiple milestones in orange block show most time spent in "High" saturation phase before becoming critical

## 📝 Notes

- **Mock Data**: All data is currently mocked in `src/data/mockData.js`
- **No Backend**: This is a frontend prototype
- **Stabilization Window**: 15-60 second observation period before notification
- **Cluster Activation**: Triggers when thresholds met (≥20 issues, >85% confidence, etc.)
- **Terminology**:
  - **Cluster** (internal) = **Operational Event** (user-facing)
  - **Milestones** = key evolution points in cluster maturity where actions are triggered
  - Notifications are **actions within milestones**, not separate milestones
- **Development Tools**:
  - **Clasp-it MCP**: Chrome extension integration for visual debugging and UI fixes
  - Allows clicking page elements to send context directly to Claude Code for precise fixes

---

**Built based on the Correlation V2 Addendum PDF**

*Focus: Noise Reduction First, Correlation ≠ RCA*
