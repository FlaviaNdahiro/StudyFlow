
import { Link } from 'react-router-dom'

function SummaryCard({ title, value, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center">
        <p className="text-slate-500">{title}</p>
        <span className="text-2xl">{icon}</span>
      </div>

      <h2 className="text-3xl font-bold mt-4 text-slate-900">
        {value}
      </h2>

      <p className="text-sm text-slate-500 mt-2">
        {description}
      </p>
    </div>
  )
}

function DashboardPage() {
  const totalTasks = 6
  const completedTasks = 2
  const pendingTasks = totalTasks - completedTasks

  const progress = totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100)

  const upcomingTasks = [
    'Study React Hooks',
    'Practice JavaScript',
    'Review Networking',
  ]

  return (
    <div>
      <div className="mb-8">
        <p className="text-teal-600 font-semibold">YOUR STUDY SPACE</p>

        <h1 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">
          Welcome to StudyFlow!
        </h1>

        <p className="text-slate-500 mt-2">
          Organize your learning and make every study session count.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <SummaryCard title="Total Tasks" value={totalTasks} description="Tasks in your study plan" icon="📚" />
        <SummaryCard title="Completed" value={completedTasks} description="Tasks finished" icon="✅" />
        <SummaryCard title="Pending" value={pendingTasks} description="Tasks remaining" icon="⏳" />
        <SummaryCard title="Study Progress" value={`${progress}%`} description="Keep going!" icon="📈" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Upcoming Tasks
          </h2>

          <div className="mt-5 space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <span className="w-3 h-3 rounded-full bg-teal-500" />
                <span className="text-slate-700">{task}</span>
              </div>
            ))}
          </div>

          <Link to="/tasks" className="inline-block mt-5 text-teal-600 font-semibold">
            View all tasks →
          </Link>
        </section>

        <section className="bg-slate-950 text-white p-6 rounded-2xl shadow-sm">
          <p className="text-teal-400 font-semibold">FOCUS TIME</p>

          <h2 className="text-2xl font-bold mt-3">
            Ready to concentrate?
          </h2>

          <p className="text-slate-400 mt-3">
            Take a break from distractions and focus on your goals.
          </p>

          <Link to="/focus" className="inline-block mt-6 bg-teal-500 hover:bg-teal-400 px-6 py-3 rounded-xl font-semibold">
            Start studying →
          </Link>
        </section>
      </div>
    </div>
  )
}

export default DashboardPage
