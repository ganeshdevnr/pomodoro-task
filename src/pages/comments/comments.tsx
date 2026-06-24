import { Link, Outlet, useParams } from '@tanstack/react-router'

const comments = [
  {
    id: '1',
    text: 'First dummy comment',
  },
  {
    id: '2',
    text: 'Second dummy comment',
  },
]

export function CommentsPage() {
  const { postId } = useParams({
    from: '/_layout/(post)/posts/$postId/comments',
  })

  return (
    <section>
      <h2>Comments</h2>
      <p>Dummy comments for post {postId}</p>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Link
              to="/posts/$postId/comments/$commentId"
              params={{ postId, commentId: comment.id }}
            >
              {comment.text}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </section>
  )
}
