import { useContext } from 'react'
import { DemoContext } from './context'

export function useDemo() {
  const ctx = useContext(DemoContext)

  if (ctx === null)
    throw new Error('useDemo must be used within a DemoProvider')
  return ctx
}
