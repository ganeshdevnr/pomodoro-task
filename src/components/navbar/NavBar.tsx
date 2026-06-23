import { Link, linkOptions } from '@tanstack/react-router'
import './NavBar.css'

const options = linkOptions([
  {
    to: '/',
    label: 'Home',
    className: 'nav-link',
    activeProps: { className: 'active' },
  },
  {
    to: '/analytics',
    label: 'Analytics',
    className: 'nav-link',
    activeProps: { className: 'active' },
  },
])

export function NavBar() {
  return (
    <nav className="navbar">
      {options.map((option) => {
        return (
          <Link {...option} key={option.to}>
            {option.label}
          </Link>
        )
      })}
    </nav>
  )
}
