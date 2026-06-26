import {
  Link,
  useLoaderData,
  useRouterState,
  useSearch,
} from '@tanstack/react-router'
import './dashboard.css'

export default function DashboardPage() {
  // Load the loader data
  const loaderData = useLoaderData({
    from: '/dashboard',
  })
  console.log(loaderData)

  // Get the query parameters
  const search = useSearch({ strict: false })
  console.log('search:', search)

  // Check if the router is loading ( loader call is inline etc )
  const isLoading = useRouterState({
    select: (s) => s.isTransitioning || s.isLoading,
  })

  return (
    <>
      <h2>Dashboard</h2>

      <div className="dashboard-links">
        <Link
          disabled={isLoading}
          to="/dashboard"
          search={{ ...search, page: Math.max((search.page ?? 1) - 1, 0) }}
        >
          Previous
        </Link>

        <Link
          to="/dashboard"
          disabled={isLoading}
          search={{ ...search, page: (search.page ?? 0) + 1 }}
        >
          Next
        </Link>

        <Link to="/admin">Go to Admin</Link>
      </div>
      <ul>
        {loaderData.products.map((product: { id: number; title: string }) => {
          return <li key={product.id}>{product.title}</li>
        })}
      </ul>
    </>
  )
}
