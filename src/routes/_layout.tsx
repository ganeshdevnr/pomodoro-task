import { createFileRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { NavBar } from '../components/navbar/NavBar'
import { TimerProvider } from '../contexts/timer/TimerContext'

export const Route = createFileRoute('/_layout')({
  component: () => (
    <>
      <TimerProvider>
        <NavBar />
        <Outlet />
        <TanStackRouterDevtools />
      </TimerProvider>
    </>
  ),
})
