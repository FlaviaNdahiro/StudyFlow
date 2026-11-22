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

export default SummaryCard