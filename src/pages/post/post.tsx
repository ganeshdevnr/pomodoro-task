import { Link, Outlet, useLoaderData, useParams } from '@tanstack/react-router'

export function PostPage() {
  const param = useParams({ strict: false })
  const { currentTimeMs } = useLoaderData({ from: '/posts/$postId' })
  const postId = param.postId ?? ''

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
