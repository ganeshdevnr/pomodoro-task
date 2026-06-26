import type { PropsWithChildren } from 'react'

interface HeaderProps {
  title: string
}

export function Header({ title, children }: PropsWithChildren<HeaderProps>) {
  return (
    <>
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-slate-800 dark:text-slate-100">
        Pomodoro
      </p>
      <h1
        className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-slate-50"
        id="timer-title"
      >
        {title}
      </h1>

      {children}
    </>
  )
}
