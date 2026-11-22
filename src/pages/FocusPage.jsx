
import { useState, useEffect } from 'react'

function FocusTimer({ duration, mode }) {
  const [secondsLeft, setSecondsLeft] = useState(duration)
  const [isPlaying, setIsPlaying] = useState(false)

  // Countdown timer with interval cleanup
  useEffect(() => {
    if (!isPlaying || secondsLeft === 0) {
      return
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((previousSeconds) =>
        Math.max(previousSeconds - 1, 0)
      )
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isPlaying, secondsLeft])

  // Stop when the timer reaches zero
  useEffect(() => {
    if (secondsLeft === 0) {
      setIsPlaying(false)
    }
  }, [secondsLeft])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  function handleReset() {
    setIsPlaying(false)
    setSecondsLeft(duration)
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl mt-8 shadow-sm text-center">

      <p className="text-teal-600 font-semibold text-lg">
        {mode === 'study' ? 'STUDY SESSION' : 'BREAK TIME'}
      </p>

      <div className="my-8">
        <p className="text-6xl md:text-8xl font-bold text-slate-900 tabular-nums">
          {String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </p>
      </div>

      <p className="text-slate-500 mb-8">
        {secondsLeft === 0
          ? 'Session completed! Well done!'
          : isPlaying
            ? 'Stay focused. You are doing great!'
            : 'Ready to focus?'}
      </p>

      <div className="flex justify-center gap-3 flex-wrap">

        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            disabled={secondsLeft === 0}
            className="bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => setIsPlaying(false)}
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Pause
          </button>
        )}

        <button
          onClick={handleReset}
          className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-8 py-3 rounded-xl font-semibold"
        >
          Reset
        </button>

      </div>
    </div>
  )
}

function FocusPage() {
  const [mode, setMode] = useState('study')

  const duration = mode === 'study' ? 25 * 60 : 5 * 60

  return (
    <div>
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

      {/* Study and Break modes */}
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

      {/* The key resets FocusTimer when the mode changes */}
      <FocusTimer
        key={mode}
        duration={duration}
        mode={mode}
      />

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
