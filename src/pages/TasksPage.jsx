import { useState, useRef } from 'react'

import useToggle from '../hooks/useToggle'
import useDebounce from '../hooks/useDebounce'
import useDocumentTitle from '../hooks/useDocumentTitle'

import TaskCard from '../components/TaskCard'
import TaskTitleInput from '../components/TaskTitleInput'
import EmptyState from '../components/EmptyState'

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

  // Clear the form
  function clearForm() {
    setTitle('')
    setCategory('Programming')
    setPriority('Medium')
    setDueDate('')
    setEditingId(null)
  }

  // Close the form
  function closeForm() {
    clearForm()
    toggleForm()
  }

  // Add or update a task
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

      setTasks((previousTasks) => [
        ...previousTasks,
        newTask,
      ])
    }

    clearForm()
    toggleForm()
  }

  // Edit a task
  function editTask(task) {
    setTitle(task.title)
    setCategory(task.category)
    setPriority(task.priority)
    setDueDate(task.dueDate || '')
    setEditingId(task.id)

    if (!showForm) {
      toggleForm()
    }

    setTimeout(() => {
      titleRef.current?.focus()
    }, 100)
  }

  // Mark a task as completed or pending
  function toggleComplete(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  // Delete a task
  function deleteTask(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    )

    if (!confirmed) return

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    )
  }

  // Search, filter and sort tasks
  const filteredTasks = tasks
    .filter((task) =>
      task.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    )
    .filter((task) => {
      if (filter === 'Pending') return !task.completed
      if (filter === 'Completed') return task.completed
      return true
    })
    .sort((a, b) => {
      if (sort === 'Priority') {
        const priorityOrder = {
          High: 1,
          Medium: 2,
          Low: 3,
        }

        return (
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
        )
      }

      if (sort === 'Due Date') {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1

        return new Date(a.dueDate) - new Date(b.dueDate)
      }

      return 0
    })

  return (
    <div>
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            My Tasks
          </h1>

          <p className="text-slate-500 mt-2">
            Organize your work and get things done.
          </p>
        </div>

        <button
          onClick={() => {
            clearForm()
            toggleForm()
            setTimeout(() => titleRef.current?.focus(), 100)
          }}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
        >
          {showForm ? 'Close Form' : '+ Add Task'}
        </button>
      </div>

      {/* Add or Edit Task Form */}
      {showForm && (
        <form
          onSubmit={addOrUpdateTask}
          className="bg-white p-6 rounded-2xl shadow-sm mt-6 space-y-4"
        >
          <h2 className="text-xl font-bold text-slate-800">
            {editingId !== null ? 'Edit Task' : 'Add New Task'}
          </h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Task Title
            </label>

            <TaskTitleInput
              ref={titleRef}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Category
            </label>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full border border-slate-200 p-3 rounded-xl"
            >
              <option value="Programming">Programming</option>
              <option value="Networking">Networking</option>
              <option value="Database">Database</option>
              <option value="School">School</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Priority
            </label>

            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="w-full border border-slate-200 p-3 rounded-xl"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full border border-slate-200 p-3 rounded-xl"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
            >
              {editingId !== null ? 'Update Task' : 'Save Task'}
            </button>

            <button
              type="button"
              onClick={closeForm}
              className="bg-slate-100 text-slate-700 px-5 py-3 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Search, Filter and Sort */}
      <div className="bg-white p-5 rounded-2xl shadow-sm mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Search Tasks
          </label>

          <input
            type="text"
            placeholder="Search by task title..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full border border-slate-200 p-3 rounded-xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Filter Tasks
          </label>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="w-full border border-slate-200 p-3 rounded-xl"
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Sort Tasks
          </label>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="w-full border border-slate-200 p-3 rounded-xl"
          >
            <option value="Default">Default</option>
            <option value="Priority">Priority</option>
            <option value="Due Date">Due Date</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="mt-6 space-y-3">
        {filteredTasks.length === 0 ? (
          <EmptyState
            title="No tasks found"
            message="Add a new task or try a different search."
          />
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={editTask}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TasksPage