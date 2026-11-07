import { Link, NavLink } from 'react-router-dom'

const NAV_ITEMS = [{ to: '/', label: 'Scripts' }, { to: '/docs', label: 'Docs' }, { to: '/about', label: 'About' }]

export default function Navbar() {
  return (
    <header className="border-b border-gm-border bg-gm-header">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-base font-bold text-white hover:text-gm-green">
          <svg className="h-6 w-6 shrink-0" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" fill="#161616"/><g transform="translate(6.2, 6.2) scale(2.15)"><path fill="#04de80" d="M.012 11.994 12.006 0l11.982 12.006h-6.831l-5.163-5.151-5.151 5.151 5.163 5.151v-5.151h5.151v6.903L12.006 24z"/></g><circle cx="54" cy="10" r="3.5" fill="#04de80"/></svg>
          <span>GMS2Lab</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `rounded px-2.5 py-1 text-xs font-medium ${isActive ? 'bg-gm-card text-gm-green border border-gm-border font-semibold' : 'text-gm-muted hover:text-white hover:bg-gm-card'}`}>{item.label}</NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}


