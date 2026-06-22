import { useContext } from 'react'
import { TimerContext } from './context'

export function useTimer() {
  const ctx = useContext(TimerContext)

  if (ctx === null) {
    throw new Error('useTimer must be used within a TimerProvider')
  }

  return ctx
}
