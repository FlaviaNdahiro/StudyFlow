
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function SiteLayout() {
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
