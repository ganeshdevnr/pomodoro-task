import { createFileRoute } from '@tanstack/react-router'
import { PostPage } from '../../pages/post/post'

export const Route = createFileRoute('/(post)/posts/$postId')({
  loader: async ({ params }) => {
    console.log(params)
    return { currentTimeMs: Date.now() }
  },
  component: PostPage,
})
