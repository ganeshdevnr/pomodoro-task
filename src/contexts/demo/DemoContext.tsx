import { useEffect, useState, type ReactNode } from 'react'
import { DemoContext, type Demo } from './context'

export function DemoProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<Demo['color']>('light')

  useEffect(() => {
    // get the html element of the page
    const root = document.documentElement

    // add class = "dark"
    root.classList.toggle('dark', color === 'dark')

    // set style color-scheme = "dark"
    root.style.colorScheme = color
  }, [color])

  const toggle = function () {
    setColor((currentColor) => (currentColor === 'dark' ? 'light' : 'dark'))
  }

  return (
    <DemoContext.Provider value={{ color, toggle }}>
      {children}
    </DemoContext.Provider>
  )
}
