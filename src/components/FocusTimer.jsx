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

export default FocusTimer