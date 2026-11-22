
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SiteLayout from './layouts/SiteLayout'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'
import FocusPage from './pages/FocusPage'
import SettingsPage from './pages/SettingsPage'

function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-slate-900">404</h1>
      <p className="text-slate-500 mt-4">Page not found.</p>
      <a href="/" className="text-teal-600 underline mt-4 inline-block">
        Return to Dashboard
      </a>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/focus" element={<FocusPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
