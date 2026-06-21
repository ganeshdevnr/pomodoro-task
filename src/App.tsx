import { useEffect, useReducer, useRef, useState } from 'react'
import './App.css'

import { Header } from './components/header/Header'
import Button from './components/button/Button'

const INITIAL_SECONDS = 25 * 60

type RemainingSecondsAction = { type: 'tick' } | { type: 'reset' }

function remainingSecondsReducer(
  remainingSeconds: number,
  action: RemainingSecondsAction,
) {
  switch (action.type) {
    case 'tick':
      return Math.max(remainingSeconds - 1, 0)
    case 'reset':
      return INITIAL_SECONDS
  }
}

function App() {
  // useReducer centralizes the countdown updates for ticking and resetting.
  const [remainingSeconds, dispatchRemainingSeconds] = useReducer(
    remainingSecondsReducer,
    INITIAL_SECONDS,
  )
  // useState tracks whether the timer should currently be ticking.
  const [isRunning, setIsRunning] = useState(false)
  // useRef keeps the interval id between renders without causing re-renders.
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // useEffect starts the interval while running and cleans it up to avoid duplicate timers.
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (remainingSeconds <= 1) {
          setIsRunning(false)
        }

        dispatchRemainingSeconds({ type: 'tick' })
      }, 1000)
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, remainingSeconds])

  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}`

  function handleReset() {
    dispatchRemainingSeconds({ type: 'reset' })
  }

  const header = {
    title: 'Focus Timer',
  }

  return (
    <main className="timer-shell">
      <section className="timer-card" aria-labelledby="timer-title">
        <Header {...header} />
        <div className="timer-display" role="timer" aria-live="polite">
          {formattedTime}
        </div>
        <div className="timer-controls" aria-label="Timer controls">
          <Button
            onClick={() => setIsRunning(true)}
            disabled={isRunning || remainingSeconds === 0}
          >
            Start
          </Button>

          <Button onClick={() => setIsRunning(false)} disabled={!isRunning}>
            Pause
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </section>
    </main>
  )
}

export default App
