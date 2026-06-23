import { Link, Outlet } from '@tanstack/react-router'

export function PostsPage() {
  return (
    <>
      <div>Post List Page</div>

      <Link to="/posts/$postId" params={{ postId: '1234' }}>
        Go to Post
      </Link>

      <Outlet />
    </>
  )
}
