import { createFileRoute } from '@tanstack/react-router'
import { PostsPage } from '../pages/posts/posts'

export const Route = createFileRoute('/posts')({
  component: PostsPage,
})
