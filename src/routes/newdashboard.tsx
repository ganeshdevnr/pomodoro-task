import { createFileRoute } from '@tanstack/react-router'
import { NewDashboard } from '../pages/newdashboard/newdashboard'

export const Route = createFileRoute('/newdashboard')({
  component: NewDashboard,
})
