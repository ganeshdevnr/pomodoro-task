import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { NavBar } from '../../components/navbar/NavBar'
import { TimerProvider } from '../../contexts/timer/TimerContext'

export function RootLayout() {
  return (
    <TimerProvider>
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools />
    </TimerProvider>
  )
}

export function NotFoundPage() {
  return <div>Page not found</div>
}
