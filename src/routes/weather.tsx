import { createFileRoute } from '@tanstack/react-router'
import {
  NewDashboard,
  WeatherRoutePending,
} from '../pages/newdashboard/newdashboard'

export const Route = createFileRoute('/weather')({
  pendingComponent: WeatherRoutePending,
  pendingMs: Infinity,
  component: NewDashboard,
})
