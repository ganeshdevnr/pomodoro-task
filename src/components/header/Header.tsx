import type { PropsWithChildren } from 'react'
import './Header.css'

// interface HeaderProps {
//   title: string
//   children?: ReactNode
// }

interface HeaderProps {
  title: string
}

export function Header({ title, children }: PropsWithChildren<HeaderProps>) {
  const headerStyle = {
    color: '#333333',
    fontFamily: 'Arial, sans-serif',
  }

  return (
    <>
      <p className="timer-label">Pomodoro</p>
      <h1 className="header" style={headerStyle} id="timer-title">
        {title}
      </h1>

      {children}
    </>
  )
}
