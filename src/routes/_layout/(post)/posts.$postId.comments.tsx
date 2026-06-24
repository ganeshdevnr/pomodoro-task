import { createFileRoute } from '@tanstack/react-router'
import { CommentsPage } from '../../../pages/comments/comments'

export const Route = createFileRoute('/_layout/(post)/posts/$postId/comments')({
  component: CommentsPage,
})
