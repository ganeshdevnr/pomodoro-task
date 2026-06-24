import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/(admin)/admin')({
  component: () => <div>Admin Page</div>,
})
