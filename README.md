# Correlation V2 - Noise Reduction Platform

A complete reimagining of the correlation platform focused on **real-time noise reduction** as the primary value proposition.

## ✨ Recent Updates

### Signal Management & Issue Detail Modal - May 19, 2026 (Latest)

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
- **Standardized table structure**:
  - Consistent `px-6 py-4` padding on all cells
  - Proper header styling with `text-xs font-semibold uppercase`
  - Hover effects with `hover:bg-background-tertiary`
  - Proper dividers with `divide-y divide-border`
- **Current columns**: Service (with icon) → Affected Entity → Severity → Total Suppressions (7d)

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

#### 3. What Changed Recently
- 3 cards showing emerging patterns
- Baseline comparison (7-day rolling)
- Pattern types:
  - Pattern coverage increases
  - Velocity changes
  - Blast radius expansions

#### 4. Notification Reduction Summary ⭐ (THE HERO)
- **Hero Metric**: 99.6% noise reduction
- 2,847 signals → 12 operational events
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

#### Noise Reduction Impact (Unified Card)
**Top Section:**
- **Left**: Three key metrics (stacked vertically)
  - Issues Suppressed (e.g., 147)
  - Reduction Percentage (e.g., 99.3%)
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
- **Total Noise Reduction**: 99.6%
- **Notifications Consolidated**: 2,835 (out of 2,847 signals)
- **Operational Events Created**: 12
- **Avg Notifications Per Event**: 236

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
