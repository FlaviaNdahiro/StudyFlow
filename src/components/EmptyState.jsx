function EmptyState({ title, message }) {
  return (
    <div className="bg-white p-8 rounded-2xl text-center shadow-sm">
      <div className="text-4xl mb-3">📚</div>

      <h3 className="text-lg font-bold text-slate-800">
        {title}
      </h3>

      <p className="text-slate-500 mt-2">
        {message}
      </p>
    </div>
  )
}

export default EmptyState