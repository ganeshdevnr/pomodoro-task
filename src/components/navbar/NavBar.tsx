import { Link, linkOptions } from '@tanstack/react-router'
import { useDemo } from '../../contexts/demo/useDemo'

const navLinkClass =
  'font-semibold text-slate-600 transition-colors hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-300'

const activeNavLinkClass = 'font-extrabold text-rose-700 dark:text-rose-200'

const options = [
  {
    label: 'Home',
    link: linkOptions({
      to: '/home',
      className: navLinkClass,
      activeProps: { className: activeNavLinkClass },
    }),
  },
  {
    label: 'Analytics',
    link: linkOptions({
      to: '/analytics',
      className: navLinkClass,
      activeProps: { className: activeNavLinkClass },
    }),
  },
  {
    label: 'Posts',
    link: linkOptions({
      to: '/posts',
      className: navLinkClass,
      activeProps: { className: activeNavLinkClass },
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
  const { color, toggle } = useDemo()

  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center gap-4 border-b border-slate-200 px-4 py-4 text-sm sm:gap-6 sm:px-6 dark:border-slate-800">
      {options.map((option) => {
        return (
          <Link {...option.link} key={option.link.to}>
            {option.label}
          </Link>
        )
      })}
      <button
        type="button"
        aria-label={`Switch to ${color === 'dark' ? 'light' : 'dark'} mode`}
        className="ml-auto rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-rose-500/60 dark:hover:bg-rose-500/10 dark:hover:text-rose-200"
        onClick={toggle}
      >
        {color === 'dark' ? 'Light' : 'Dark'} mode
      </button>
    </nav>
  )
}
