import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { PostsPage } from '../../../pages/posts/posts'

interface Something {
  else: number
}

interface QueryParam {
  pageIndex?: number
  categories?: Array<string>
  something?: Something
}

const queryParamSchema = z.object({
  pageIndex: z.number().optional(),
  categories: z.array(z.string()).optional(),
  something: z
    .object({
      else: z.number(),
    })
    .optional(),
})

export const Route = createFileRoute('/_layout/(post)/posts')({
  component: PostsPage,
  validateSearch: (search: Record<string, unknown>): QueryParam => {
    return queryParamSchema.parse(search)
  },
})
