import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { NavBar } from '../components/navbar/NavBar'
import { TimerProvider } from '../contexts/timer/TimerContext'

const RootLayout = () => (
  <TimerProvider>
    <NavBar />
    <Outlet />
    <TanStackRouterDevtools />
  </TimerProvider>
)

export const Route = createRootRoute({ component: RootLayout })
