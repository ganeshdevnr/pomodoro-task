import { createFileRoute } from '@tanstack/react-router'
import { CommentDetailPage } from '../../../pages/comment-detail/comment-detail'

export const Route = createFileRoute(
  '/_layout/(post)/posts/$postId/comments/$commentId',
)({
  component: CommentDetailPage,
})
