# Correlation V2 - Noise Reduction Platform

A complete reimagining of the correlation platform focused on **real-time noise reduction** as the primary value proposition.

## ✨ Recent Updates

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

## 📊 Dashboard Structure

### 4-Section Layout:

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

#### Side-by-Side Cards
**Left: Recommended Investigation Steps**
- Non-executable suggestions
- Numbered list format
- Examples: "Check deployment logs", "Review configuration changes"

**Right: Affected Services**
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
- **All Suppressed Issues Table**
  - Scrollable table (max-height 500px)
  - Shows all correlated alerts (e.g., 147 issues)
  - Columns: Severity dot, Issue title, Service, Entity, Source, Time
  - Badge: "147 issues correlated into 1 notification"

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
│   │   ├── Sidebar.jsx
│   │   ├── TopBar.jsx (with theme toggle)
│   │   ├── OperationalEventsCards.jsx (horizontal card grid)
│   │   ├── OperationalEventsTable.jsx (legacy)
│   │   ├── TopAffectedEntitiesTable.jsx (simple table view)
│   │   ├── TopAffectedEntitiesPanel.jsx (legacy)
│   │   ├── NoiseReductionPanel.jsx
│   │   ├── RecentChangesCard.jsx
│   │   └── ui/ (shadcn components with accessibility improvements)
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── EventDetail.jsx (with tabs)
│   ├── data/
│   │   └── mockData.js
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   ├── index.css (with light/dark theme variables)
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🔄 Workflow Example

1. **User receives 1 notification** instead of 147 separate alerts
2. **Opens dashboard** → sees "Deployment-related operational event detected" in table
3. **Clicks event** → navigates to detail page
4. **Reviews Overview tab**:
   - Sees 147 issues suppressed into 1 notification (99.3% reduction)
   - Checks affected services breakdown (payment: 67 issues, 42% error rate)
   - Reviews recommended investigation steps
   - Examines issue accumulation timeline
   - Scrolls through all 147 suppressed issues if needed
5. **Takes action**: Clicks "Investigate" or "Noise Reduction Settings"
6. **(Future)** Switches to RCA tab for post-incident analysis

## 📝 Notes

- **Mock Data**: All data is currently mocked in `src/data/mockData.js`
- **No Backend**: This is a frontend prototype
- **Stabilization Window**: 15-60 second observation period before notification
- **Cluster Activation**: Triggers when thresholds met (≥20 issues, >85% confidence, etc.)

---

**Built based on the Correlation V2 Addendum PDF**

*Focus: Noise Reduction First, Correlation ≠ RCA*
