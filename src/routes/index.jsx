import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '../pages/home/home'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <HomePage />
}
