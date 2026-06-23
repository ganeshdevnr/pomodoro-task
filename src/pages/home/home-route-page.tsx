import { useBlocker } from '@tanstack/react-router'
import { HomePage } from './home'

export function HomeRoutePage() {
  useBlocker({
    shouldBlockFn: () => {
      const answer = window.confirm('Timer is running. Leave and reset it?')
      return !answer
    },
  })

  return <HomePage />
}
