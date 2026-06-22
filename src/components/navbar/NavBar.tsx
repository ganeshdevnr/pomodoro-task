import { Link } from '@tanstack/react-router'
import './NavBar.css'

export function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/analytics" className="nav-link">Analytics</Link>
    </nav>
  )
}
