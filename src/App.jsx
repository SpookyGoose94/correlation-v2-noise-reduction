import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard2 from './pages/Dashboard2'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import MilestoneVisualization from './pages/MilestoneVisualization'
import Settings from './pages/Settings'
import Onboarding from './pages/Onboarding'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard-2" element={<Dashboard2 />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/milestone-visualization" element={<MilestoneVisualization />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </Router>
  )
}

export default App
