import { useState } from 'react'
import FocusTimer from '../components/FocusTimer'

function FocusPage() {
  const [mode, setMode] = useState('study')

  const duration = mode === 'study' ? 25 * 60 : 5 * 60

  return (
    <div>
      {/* Page Heading */}
      <div>
        <p className="text-teal-600 font-semibold">
          FOCUS AND PRODUCTIVITY
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
          Focus Timer
        </h1>

        <p className="text-slate-500 mt-2">
          Make time for focused learning.
        </p>
      </div>

      {/* Study and Break Modes */}
      <div className="flex justify-center gap-3 mt-8 flex-wrap">
        <button
          onClick={() => setMode('study')}
          className={`px-6 py-3 rounded-xl font-semibold ${
            mode === 'study'
              ? 'bg-teal-500 text-white'
              : 'bg-white text-slate-700'
          }`}
        >
          Study - 25 min
        </button>

        <button
          onClick={() => setMode('break')}
          className={`px-6 py-3 rounded-xl font-semibold ${
            mode === 'break'
              ? 'bg-teal-500 text-white'
              : 'bg-white text-slate-700'
          }`}
        >
          Break - 5 min
        </button>
      </div>

      {/* Focus Timer */}
      <FocusTimer
        key={mode}
        duration={duration}
        mode={mode}
      />

      {/* Study Tip */}
      <div className="bg-teal-50 p-6 rounded-2xl mt-8">
        <h2 className="font-bold text-slate-900 text-lg">
          Study Tip
        </h2>

        <p className="text-slate-600 mt-2">
          Focus on one task at a time. Take short breaks to refresh
          your mind and maintain productivity.
        </p>
      </div>
    </div>
  )
}

export default FocusPage