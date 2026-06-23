import { useParams } from '@tanstack/react-router'

const commentDetails = {
  '1': {
    author: 'Asha Kumar',
    postedAt: '2026-06-23 10:30 AM',
  },
  '2': {
    author: 'Ravi Patel',
    postedAt: '2026-06-23 11:15 AM',
  },
}

export function CommentDetailPage() {
  const { postId, commentId } = useParams({
    from: '/posts/$postId/comments/$commentId',
  })
  const detail = commentDetails[commentId as keyof typeof commentDetails]

  return (
    <section>
      <h3>Comment details</h3>
      <p>Post ID: {postId}</p>
      <p>Comment ID: {commentId}</p>
      <p>Author: {detail?.author ?? 'Unknown author'}</p>
      <p>Posted at: {detail?.postedAt ?? 'Unknown time'}</p>
    </section>
  )
}
