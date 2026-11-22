
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import SiteLayout from './layouts/SiteLayout'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'
import FocusPage from './pages/FocusPage'
import SettingsPage from './pages/SettingsPage'

import useLocalStorage from './hooks/useLocalStorage'
import initialTasks from './data/initialTasks'

function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-slate-900">404</h1>

      <p className="text-slate-500 mt-4">
        Page not found.
      </p>

      <Link
        to="/"
        className="text-teal-600 underline mt-4 inline-block"
      >
        Return to Dashboard
      </Link>
    </div>
  )
}

function App() {
  const [tasks, setTasks] = useLocalStorage(
    'studyflow-tasks',
    initialTasks
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route
            path="/"
            element={
              <DashboardPage
                tasks={tasks}
              />
            }
          />

          <Route
            path="/tasks"
            element={
              <TasksPage
                tasks={tasks}
                setTasks={setTasks}
              />
            }
          />

          <Route path="/focus" element={<FocusPage />} />

          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
