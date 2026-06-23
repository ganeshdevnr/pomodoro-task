import { useEffect, useReducer, type ReactNode } from 'react'
import { TimerContext } from './context'

const INITIAL_SECONDS = 25 * 60

type TimerState = {
  remainingSeconds: number
  isRunning: boolean
}

type TimerAction =
  | { type: 'start' }
  | { type: 'pause' }
  | { type: 'reset' }
  | { type: 'tick' }

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'start':
      return {
        ...state,
        isRunning: state.remainingSeconds > 0,
      }

    case 'pause':
      return {
        ...state,
        isRunning: false,
      }

    case 'reset':
      return {
        remainingSeconds: INITIAL_SECONDS,
        isRunning: false,
      }

    case 'tick': {
      const remainingSeconds = Math.max(state.remainingSeconds - 1, 0)

      return {
        remainingSeconds,
        isRunning: remainingSeconds > 0,
      }
    }
  }
}

export function TimerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(timerReducer, {
    remainingSeconds: INITIAL_SECONDS,
    isRunning: false,
  })

  useEffect(() => {
    if (!state.isRunning) {
      return
    }

    const intervalId = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [state.isRunning])

  function start() {
    dispatch({ type: 'start' })
  }

  function pause() {
    dispatch({ type: 'pause' })
  }

  function reset() {
    dispatch({ type: 'reset' })
  }

  return (
    <TimerContext.Provider
      value={{
        isRunning: state.isRunning,
        remainingSeconds: state.remainingSeconds,
        start,
        pause,
        reset,
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}
