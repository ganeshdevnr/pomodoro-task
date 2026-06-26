import type { PropsWithChildren } from 'react'

interface ButtonProps {
  disabled?: boolean
  onClick: () => void
}

const Button = ({
  disabled,
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className="min-w-24 rounded-lg border-2 border-transparent bg-rose-50 px-4 py-2 font-bold text-rose-700 transition-colors hover:border-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 disabled:cursor-not-allowed disabled:opacity-45 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:border-rose-400/60"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

export default Button
