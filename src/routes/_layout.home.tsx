import { createFileRoute } from '@tanstack/react-router'
import { HomeRoutePage } from '../pages/home/home-route-page'

export const Route = createFileRoute('/_layout/home')({
  component: HomeRoutePage,
})
