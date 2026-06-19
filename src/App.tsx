import { useEffect, useRef, useState } from 'react'
import './App.css'

const INITIAL_SECONDS = 25 * 60

function App() {
  // useState stores the countdown value so the display updates every second.
  const [remainingSeconds, setRemainingSeconds] = useState(INITIAL_SECONDS)
  // useState tracks whether the timer should currently be ticking.
  const [isRunning, setIsRunning] = useState(false)
  // useRef keeps the interval id between renders without causing re-renders.
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {

    // When the remaining seconds reaches zero, stop the timer and reset.
    if (remainingSeconds === 0) {
      setIsRunning(false)
      setRemainingSeconds(INITIAL_SECONDS)
    }

  }, [remainingSeconds]);

  useEffect(() => {

    if (isRunning) {
      // Start the interval to update the remaining seconds every second.
      intervalRef.current = setInterval(() => {

        // update the remaining seconds.
        setRemainingSeconds((prev) => {
          // If the timer has reached zero, stop the timer and reset.
          if (prev <= 1) {
            return 0
          }
          // Otherwise, decrement the remaining seconds.
          return prev - 1
        })

      }, 1000);
    }

    return () => {
      // Clear the interval when the component unmounts or when isRunning changes.
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

  }, [isRunning]);

  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}`

  function handleReset() {
    setRemainingSeconds(INITIAL_SECONDS)
    // setIsRunning(false)
  }

  return (
    <main className="timer-shell">
      <section className="timer-card" aria-labelledby="timer-title">
        <p className="timer-label">Pomodoro</p>
        <h1 id="timer-title">Focus Timer</h1>
        <div className="timer-display" role="timer" aria-live="polite">
          {formattedTime}
        </div>
        <div className="timer-controls" aria-label="Timer controls">
          <button
            type="button"
            onClick={() => setIsRunning(true)}
            disabled={isRunning || remainingSeconds === 0}
          >
            Start
          </button>
          <button
            type="button"
            onClick={() => setIsRunning(false)}
            disabled={!isRunning}
          >
            Pause
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
