import { createFileRoute, useBlocker, Block } from '@tanstack/react-router'
import { HomePage } from '../pages/home/home'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  useBlocker({
    shouldBlockFn: () => {
      const answer = window.confirm('Timer is running. Leave and reset it?')
      return !answer
    },
  })

  return (
    <>
      <HomePage />
    </>
  )
}
