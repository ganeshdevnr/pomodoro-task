import {
  Link,
  useLoaderData,
  useRouterState,
  useSearch,
} from '@tanstack/react-router'

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
    <main className="mx-auto min-h-[calc(100svh-73px)] max-w-4xl bg-slate-50 px-4 py-10 text-slate-700 sm:px-6 dark:bg-slate-950 dark:text-slate-300">
      <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
        Dashboard
      </h2>

      <div className="my-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-center font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          disabled={isLoading}
          to="/dashboard"
          search={{ ...search, page: Math.max((search.page ?? 1) - 1, 0) }}
        >
          Previous
        </Link>

        <Link
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-center font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          to="/dashboard"
          disabled={isLoading}
          search={{ ...search, page: (search.page ?? 0) + 1 }}
        >
          Next
        </Link>

        <Link
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-center font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          to="/admin"
        >
          Go to Admin
        </Link>
      </div>
      <ul className="space-y-2 text-left">
        {loaderData.products.map((product: { id: number; title: string }) => {
          return (
            <li
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
              key={product.id}
            >
              {product.title}
            </li>
          )
        })}
      </ul>
    </main>
  )
}
