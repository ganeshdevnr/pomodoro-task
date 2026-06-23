import { createFileRoute } from '@tanstack/react-router'
import { CommentsPage } from '../../pages/comments/comments'

export const Route = createFileRoute('/(post)/posts/$postId/comments')({
  component: CommentsPage,
})
