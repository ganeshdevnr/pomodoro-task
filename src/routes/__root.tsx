import { createRootRoute } from '@tanstack/react-router'
import { NotFoundPage, RootLayout } from '../pages/root/root-layout'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})
