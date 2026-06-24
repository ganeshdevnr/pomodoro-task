import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import DashboardPage from '../pages/dashboard/dashboard'

const dashboardSearchSchema = z.object({
  page: z.number().int().min(0).optional().default(0),
})

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
  validateSearch: dashboardSearchSchema,
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ deps: { page } }) => {
    const limit = 10
    const _page = page
    const skip = _page * limit
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    )
    return response.json()
  },
  staleTime: 10_000,
})
