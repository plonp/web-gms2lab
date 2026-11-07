import { Link, NavLink } from 'react-router-dom'

const NAV_ITEMS = [{ to: '/', label: 'Scripts' }, { to: '/docs', label: 'Docs' }, { to: '/about', label: 'About' }]

export default function Navbar() {
  return (
    <header className="border-b border-gm-border bg-gm-header">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="text-base font-bold text-white hover:text-gm-green">GMS2Lab</Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `rounded px-2.5 py-1 text-xs font-medium ${isActive ? 'bg-gm-card text-gm-green border border-gm-border font-semibold' : 'text-gm-muted hover:text-white hover:bg-gm-card'}`}>{item.label}</NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}


