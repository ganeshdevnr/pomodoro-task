import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import DashboardPage from '../pages/dashboard/dashboard'

const dashboardSearchSchema = z.object({
  page: z.number().int().min(0).optional().default(0),
})

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
  validateSearch: dashboardSearchSchema,
  beforeLoad: () => {
    return { user: { name: 'test' } }
  },
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ deps: { page }, abortController }) => {
    const limit = 10
    const _page = page
    const skip = _page * limit
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
        { signal: abortController.signal },
      )
      return response.json()
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        console.log('Abort error')
        return { products: [] }
      }

      throw err
    }
  },
  staleTime: Infinity,
})
