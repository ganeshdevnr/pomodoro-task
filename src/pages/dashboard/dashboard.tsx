import { Link, useLoaderData, useSearch } from '@tanstack/react-router'

export default function DashboardPage() {
  // Load the loader data
  const loaderData = useLoaderData({
    from: '/dashboard',
  })
  console.log(loaderData)

  // Get the query parameters
  const search = useSearch({ strict: false })
  console.log('search:', search)

  return (
    <>
      <h2>Dashboard</h2>
      <ul>
        {loaderData.products.map((product: { id: number; title: string }) => {
          return <li key={product.id}>{product.title}</li>
        })}
      </ul>

      <Link
        to="/dashboard"
        search={{ ...search, page: Math.max((search.page ?? 1) - 1, 0) }}
      >
        Previous
      </Link>

      <Link
        to="/dashboard"
        search={{ ...search, page: (search.page ?? 0) + 1 }}
      >
        Next
      </Link>

      <Link to="/admin">Go to Admin</Link>
    </>
  )
}
