import { Link } from 'react-router-dom'
import SummaryCard from '../components/SummaryCard'

function DashboardPage({ tasks }) {
  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length

  const pendingTasks = totalTasks - completedTasks

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100)

  const upcomingTasks = tasks
    .filter((task) => !task.completed && task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3)

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <p className="text-teal-600 font-semibold">
          YOUR STUDY SPACE
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">
          Welcome to StudyFlow!
        </h1>

        <p className="text-slate-500 mt-2">
          Organize your learning and make every study session count.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <SummaryCard
          title="Total Tasks"
          value={totalTasks}
          description="Tasks in your study plan"
          icon="📚"
        />

        <SummaryCard
          title="Completed"
          value={completedTasks}
          description="Tasks finished"
          icon="✅"
        />

        <SummaryCard
          title="Pending"
          value={pendingTasks}
          description="Tasks remaining"
          icon="⏳"
        />

        <SummaryCard
          title="Study Progress"
          value={`${progress}%`}
          description="Keep going!"
          icon="📈"
        />
      </div>

      {/* Upcoming Tasks and Focus Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Upcoming Tasks */}
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Upcoming Tasks
          </h2>

          <div className="mt-5 space-y-4">
            {upcomingTasks.length === 0 ? (
              <p className="text-slate-500">
                No pending tasks. Great job!
              </p>
            ) : (
              upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                >
                  <span className="w-3 h-3 rounded-full bg-teal-500" />

                  <div>
                    <p className="text-slate-700 font-medium">
                      {task.title}
                    </p>

                    <p className="text-sm text-slate-500">
                      Due: {task.dueDate}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <Link
            to="/tasks"
            className="inline-block mt-5 text-teal-600 font-semibold"
          >
            View all tasks →
          </Link>
        </section>

        {/* Focus Time */}
        <section className="bg-slate-950 text-white p-6 rounded-2xl shadow-sm">
          <p className="text-teal-400 font-semibold">
            FOCUS TIME
          </p>

          <h2 className="text-2xl font-bold mt-3">
            Ready to concentrate?
          </h2>

          <p className="text-slate-400 mt-3">
            Take a break from distractions and focus on your goals.
          </p>

          <Link
            to="/focus"
            className="inline-block mt-6 bg-teal-500 hover:bg-teal-400 px-6 py-3 rounded-xl font-semibold"
          >
            Start studying →
          </Link>
        </section>
      </div>
    </div>
  )
}

export default DashboardPage