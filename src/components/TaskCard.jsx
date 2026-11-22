
function TaskCard({ task, onEdit, onToggleComplete, onDelete }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-wrap justify-between items-center gap-4">
      <div className="flex-1">
        <h3
          className={`font-semibold text-lg ${
            task.completed
              ? 'line-through text-slate-400'
              : 'text-slate-800'
          }`}
        >
          {task.title}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          {task.category} · {task.priority} Priority
        </p>

        <p className="text-sm text-slate-400">
          Due: {task.dueDate || 'No date'}
        </p>

        <span
          className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
            task.completed
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onToggleComplete(task.id)}
          className="bg-teal-100 text-teal-700 px-3 py-2 rounded-lg"
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-100 text-red-600 px-3 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard

