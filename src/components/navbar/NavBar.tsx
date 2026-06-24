import { Link, linkOptions } from '@tanstack/react-router'
import './NavBar.css'

const options = [
  {
    label: 'Home',
    link: linkOptions({
      to: '/home',
      className: 'nav-link',
      activeProps: { className: 'active' },
    }),
  },
  {
    label: 'Analytics',
    link: linkOptions({
      to: '/analytics',
      className: 'nav-link',
      activeProps: { className: 'active' },
    }),
  },
  {
    label: 'Posts',
    link: linkOptions({
      to: '/posts',
      className: 'nav-link',
      activeProps: { className: 'active' },
      search: {
        pageIndex: 3,
        categories: [],
        something: {
          else: 123,
        },
      },
    }),
  },
]

export function NavBar() {
  return (
    <nav className="navbar">
      {options.map((option) => {
        return (
          <Link {...option.link} key={option.link.to}>
            {option.label}
          </Link>
        )
      })}
    </nav>
  )
}
