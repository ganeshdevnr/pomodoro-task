import { Link, Outlet, useLoaderData, useParams } from '@tanstack/react-router'

export function PostPage() {
  // Get the route parameters
  const param = useParams({ strict: false })
  const postId = param.postId ?? ''

  // Get the loader data
  const { currentTimeMs } = useLoaderData({
    from: '/_layout/(post)/posts/$postId',
  })

  return (
    <>
      <div>
        Post Page {param.postId}
        {` - ${currentTimeMs}`}
      </div>
      <Link to="/posts/$postId/comments" params={{ postId }}>
        View comments
      </Link>
      <Outlet />
    </>
  )
}
