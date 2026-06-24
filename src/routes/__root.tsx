import { createRootRoute, Outlet } from '@tanstack/react-router'
import { NotFoundPage } from '../pages/root/root-layout'

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
})
