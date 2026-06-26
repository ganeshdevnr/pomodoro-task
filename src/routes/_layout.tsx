import { createFileRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { NavBar } from '../components/navbar/NavBar'
import { TimerProvider } from '../contexts/timer/TimerContext'
import { DemoProvider } from '../contexts/demo/DemoContext'

export const Route = createFileRoute('/_layout')({
  component: () => (
    <TimerProvider>
      <DemoProvider>
        <div className="min-h-svh bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300">
          <NavBar />
          <Outlet />
          <TanStackRouterDevtools />
        </div>
      </DemoProvider>
    </TimerProvider>
  ),
})
