import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Scripts' },
    { to: '/docs', label: 'Docs' },
    { to: '/about', label: 'About' },
  ]

  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="text-base font-bold text-white hover:text-slate-300">GMS2Lab</Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `rounded px-2.5 py-1 text-xs font-medium ${isActive ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}>{item.label}</NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

