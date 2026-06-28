import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: () => (
    <div>
      Admin Page <br /> <Link to="/dashboard">Go to dasboard</Link>
    </div>
  ),
})
