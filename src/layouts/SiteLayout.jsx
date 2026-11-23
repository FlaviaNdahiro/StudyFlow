import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function SiteLayout() {
  useEffect(() => {
    try {
      const savedSettings = JSON.parse(
        localStorage.getItem('studyflow-settings')
      )

      document.documentElement.classList.toggle(
        'dark',
        savedSettings?.theme === 'dark'
      )
    } catch {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <div className="min-h-screen md:flex bg-slate-100">
      <Navbar />

      <main className="flex-1 min-w-0 p-5 md:p-10">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default SiteLayout