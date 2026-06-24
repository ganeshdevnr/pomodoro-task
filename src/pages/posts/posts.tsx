import { Link, Outlet, useSearch } from '@tanstack/react-router'

export function PostsPage() {
  // get query parameters
  const queryParams = useSearch({ strict: false })
  console.log(queryParams)

  return (
    <>
      <div>Post List Page</div>

      <Link
        to="/posts/$postId"
        search={queryParams}
        params={{ postId: '1234' }}
      >
        Go to Post
      </Link>

      <Outlet />
    </>
  )
}
