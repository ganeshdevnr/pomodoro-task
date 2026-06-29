import { createFileRoute } from '@tanstack/react-router'
import { Store } from '../pages/store/store'

export const Route = createFileRoute('/store')({
  component: Store,
})
