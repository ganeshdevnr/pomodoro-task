import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: () => (
    <div>
      <h1>Admin Layout</h1>
      <Outlet />
    </div>
  ),
})
