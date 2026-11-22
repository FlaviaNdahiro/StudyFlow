
import { NavLink } from 'react-router-dom'

const links = [
  { name: 'Dashboard', path: '/', icon: '⌂' },
  { name: 'Tasks', path: '/tasks', icon: '✓' },
  { name: 'Focus', path: '/focus', icon: '◷' },
  { name: 'Settings', path: '/settings', icon: '⚙' },
]

function Navbar() {
  return (
    <aside className="w-full md:w-64 bg-slate-950 text-white min-h-screen p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-teal-400">
          StudyFlow.
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Your study companion
        </p>
      </div>

      <nav className="flex flex-row md:flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? 'bg-teal-500 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`
            }
          >
            <span>{link.icon}</span>
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="hidden md:block mt-16 p-4 bg-slate-900 rounded-xl">
        <p className="text-teal-400 font-semibold">
          Stay focused!
        </p>
        <p className="text-slate-400 text-sm mt-2">
          Small steps every day lead to big results.
        </p>
      </div>
    </aside>
  )
}

export default Navbar
