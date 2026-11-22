
import { useState, useRef } from 'react'
import useToggle from '../hooks/useToggle'
import useDebounce from '../hooks/useDebounce'
import useDocumentTitle from '../hooks/useDocumentTitle'

function TasksPage({ tasks, setTasks }) {
  const [showForm, toggleForm] = useToggle(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Programming')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')
  const searchRef = useRef(null)

  const debouncedSearch = useDebounce(search)

  useDocumentTitle('My Tasks')

  function addTask(event) {
    event.preventDefault()

    if (!title.trim()) {
      alert('Please enter a task title.')
      return
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      category,
      priority,
      dueDate,
      completed: false,
    }

    setTasks((previousTasks) => [...previousTasks, newTask])

    setTitle('')
    setCategory('Programming')
    setPriority('Medium')
    setDueDate('')
    toggleForm()
  }

  function toggleComplete(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  function deleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    )
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())

    const matchesFilter =
      filter === 'All' ||
      (filter === 'Completed' && task.completed) ||
      (filter === 'Pending' && !task.completed)

    return matchesSearch && matchesFilter
  })

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            My Tasks
          </h1>
          <p className="text-slate-500 mt-2">
            Organize and manage your study activities.
          </p>
        </div>

        <button
          onClick={toggleForm}
          className="bg-teal-600 text-white px-5 py-3 rounded-xl hover:bg-teal-700"
        >
          {showForm ? 'Close Form' : '+ Add Task'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={addTask}
          className="bg-white p-6 rounded-2xl shadow-sm mt-6 space-y-4"
        >
          <h2 className="text-xl font-bold">Add a New Task</h2>

          <input
            ref={searchRef}
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full border p-3 rounded-xl"
          >
            <option>Programming</option>
            <option>Networking</option>
            <option>Database</option>
            <option>Languages</option>
            <option>Other</option>
          </select>

          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="w-full border p-3 rounded-xl"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <button
            type="submit"
            className="bg-teal-600 text-white px-5 py-3 rounded-xl"
          >
            Save Task
          </button>
        </form>
      )}

      <div className="bg-white p-5 rounded-2xl shadow-sm mt-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full border p-3 rounded-xl"
          onFocus={() => searchRef.current?.blur()}
        />

        <div className="flex flex-wrap gap-2 mt-4">
          {['All', 'Pending', 'Completed'].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-lg ${
                filter === option
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl text-center text-slate-500">
            No tasks found.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-5 rounded-2xl shadow-sm flex flex-wrap justify-between items-center gap-4"
            >
              <div>
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
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className="bg-teal-100 text-teal-700 px-3 py-2 rounded-lg"
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-100 text-red-600 px-3 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TasksPage
