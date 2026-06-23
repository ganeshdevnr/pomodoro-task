import { useLoaderData, useParams } from '@tanstack/react-router'

export function PostPage() {
  const param = useParams({ strict: false })
  const { currentTimeMs } = useLoaderData({ from: '/posts/$postId' })

  return (
    <>
      <div>
        Post Page {param.postId}
        {` - ${currentTimeMs}`}
      </div>
    </>
  )
}
