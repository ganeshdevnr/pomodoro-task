import { createContext } from 'react'

export interface TimerContextValue {
  formattedTime: string
  isRunning: boolean
  remainingSeconds: number
  start: () => void
  pause: () => void
  reset: () => void
}

export const TimerContext = createContext<TimerContextValue | null>(null)
