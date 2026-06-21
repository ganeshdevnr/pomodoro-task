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
    <button disabled={disabled} onClick={onClick} type="button">
      {children}
    </button>
  )
}

export default Button
