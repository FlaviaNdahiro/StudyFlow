
function TaskTitleInput({ ref, value, onChange }) {
  return (
    <input
      ref={ref}
      type="text"
      placeholder="Enter task title"
      value={value}
      onChange={onChange}
      className="w-full border border-slate-200 p-3 rounded-xl"
    />
  )
}

export default TaskTitleInput
