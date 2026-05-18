# Correlation V2 - Noise Reduction Platform

A complete reimagining of the correlation platform focused on **real-time noise reduction** as the primary value proposition.

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

## 🎨 Features

### Theme Support
- **Dark Mode** (default)
- **Light Mode** - Toggle via sun/moon icon in top bar
- Theme preference persisted in localStorage

### Responsive Design
- Built with Tailwind CSS v3.4.17
- CSS variables for easy theming
- Mobile-friendly layout

## 📊 Dashboard Structure

### 4-Section Layout:

#### 1. What Needs Attention
- **Scannable table view** showing operational events
- Key columns:
  - Severity indicators (colored dots)
  - Event title and description
  - **Noise Reduction** (prominently highlighted in green)
  - Services count
  - Confidence percentage
  - Time detected
- Clickable rows navigate to event detail

#### 2. Top Affected Entities
- Top 3 entities with highest suppression activity (7-day window)
- For each entity:
  - Total suppressions count
  - Weekly trend bar chart
  - Top impacted services
  - Severity level
  - Entity count

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
│   │   ├── OperationalEventsTable.jsx
│   │   ├── NoiseReductionPanel.jsx
│   │   ├── RecentChangesCard.jsx
│   │   ├── TopAffectedEntitiesPanel.jsx
│   │   └── ui/ (shadcn components)
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
