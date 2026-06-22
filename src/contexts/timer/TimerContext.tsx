import { useEffect, useReducer, useRef, useState, type ReactNode } from 'react'
import { TimerContext } from './context'

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

export function TimerProvider({ children }: { children: ReactNode }) {
  const [remainingSeconds, dispatchRemainingSeconds] = useReducer(
    remainingSecondsReducer,
    INITIAL_SECONDS,
  )
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

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

  function start() {
    setIsRunning(true)
  }

  function pause() {
    setIsRunning(false)
  }

  function reset() {
    dispatchRemainingSeconds({ type: 'reset' })
  }

  return (
    <TimerContext.Provider
      value={{
        formattedTime,
        isRunning,
        remainingSeconds,
        start,
        pause,
        reset,
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}
