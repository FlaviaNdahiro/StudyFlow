
import { useState, useRef } from 'react'
import useToggle from '../hooks/useToggle'
import useDebounce from '../hooks/useDebounce'
import useDocumentTitle from '../hooks/useDocumentTitle'

function TasksPage({ tasks, setTasks }) {

  const [showForm, toggleForm] = useToggle(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('Default')

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Programming')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')

  const [editingId, setEditingId] = useState(null)

  const titleRef = useRef(null)

  const debouncedSearch = useDebounce(search)

  useDocumentTitle('My Tasks')

  function resetForm() {
    setTitle('')
    setCategory('Programming')
    setPriority('Medium')
    setDueDate('')
    setEditingId(null)
    toggleForm()
  }

  function addOrUpdateTask(event) {
    event.preventDefault()

    if (!title.trim()) {
      alert('Please enter a task title.')
      titleRef.current?.focus()
      return
    }

    if (editingId !== null) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingId
            ? {
                ...task,
                title: title.trim(),
                category,
                priority,
                dueDate,
              }
            : task
        )
      )
    } else {
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        category,
        priority,
        dueDate,
        completed: false,
      }

      setTasks((previousTasks) => [...previousTasks, newTask])
    }

    setTitle('')
    setCategory('Programming')
    setPriority('Medium')
    setDueDate('')
    setEditingId(null)
    toggleForm()
  }

  function editTask(task) {
    setTitle(task.title)
    setCategory(task.category)
    setPriority(task.priority)
    setDueDate(task.dueDate || '')
    setEditingId(task.id)

    if (!showForm) {
      toggleForm()
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
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
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    )

    if (confirmed) {
      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== id)
      )
    }
  }

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())

      const matchesFilter =
        filter === 'All' ||
        (filter === 'Completed' && task.completed) ||
        (filter === 'Pending' && !task.completed)

      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      if (sort === 'Priority') {
        const priorityOrder = {
          High: 1,
          Medium: 2,
          Low: 3,
        }

        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }

      if (sort === 'Due Date') {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1

        return a.dueDate.localeCompare(b.dueDate)
      }

      return 0
    })

  return (
    <div>
      {/* Page heading */}
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
          onClick={() => {
            if (showForm) {
              setTitle('')
              setEditingId(null)
              setCategory('Programming')
              setPriority('Medium')
              setDueDate('')
              toggleForm()
            } else {
              toggleForm()
              setTimeout(() => titleRef.current?.focus(), 0)
            }
          }}
          className="bg-teal-600 text-white px-5 py-3 rounded-xl hover:bg-teal-700"
        >
          {showForm ? 'Close Form' : '+ Add Task'}
        </button>
      </div>

      {/* Add and Edit Form */}
      {showForm && (
        <form
          onSubmit={addOrUpdateTask}
          className="bg-white p-6 rounded-2xl shadow-sm mt-6 space-y-4"
        >
          <h2 className="text-xl font-bold text-slate-800">
            {editingId !== null ? 'Edit Task' : 'Add a New Task'}
          </h2>

          <input
            ref={titleRef}
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full border border-slate-200 p-3 rounded-xl"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full border border-slate-200 p-3 rounded-xl"
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
            className="w-full border border-slate-200 p-3 rounded-xl"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="w-full border border-slate-200 p-3 rounded-xl"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-teal-600 text-white px-5 py-3 rounded-xl hover:bg-teal-700"
            >
              {editingId !== null ? 'Update Task' : 'Save Task'}
            </button>

            <button
              type="button"
              onClick={() => {
                setTitle('')
                setCategory('Programming')
                setPriority('Medium')
                setDueDate('')
                setEditingId(null)
                toggleForm()
              }}
              className="bg-slate-100 text-slate-700 px-5 py-3 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Search, Filter and Sort */}
      <div className="bg-white p-5 rounded-2xl shadow-sm mt-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full border border-slate-200 p-3 rounded-xl"
        />

        <div className="mt-4">
          <p className="text-sm font-semibold text-slate-700 mb-2">
            Filter tasks
          </p>

          <div className="flex flex-wrap gap-2">
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

        <div className="mt-4">
          <label className="text-sm font-semibold text-slate-700">
            Sort tasks
          </label>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="w-full border border-slate-200 p-3 rounded-xl mt-2"
          >
            <option>Default</option>
            <option>Priority</option>
            <option>Due Date</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="mt-6 space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl text-center text-slate-500">
            No tasks found. Add a new task to get started!
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-5 rounded-2xl shadow-sm flex flex-wrap justify-between items-center gap-4"
            >
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
                  onClick={() => editTask(task)}
                  className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg"
                >
                  Edit
                </button>

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
