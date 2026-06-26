import { createContext } from 'react'

export interface Demo {
  color: 'dark' | 'light'
  toggle: () => void
}

export const DemoContext = createContext<Demo | null>(null)
