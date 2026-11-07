import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScriptsPage from './pages/ScriptsPage'
import DocsPage from './pages/DocsPage'
import AboutPage from './pages/AboutPage'
import Footer from './components/Footer'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()

  // Press "/" to focus and activate the search bar on the landing page
  useEffect(() => {
    const handleKeyDown = (e) => {
      const active = document.activeElement
      const isEditing = active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA' || active?.isContentEditable
      const searchInput = document.getElementById('search-input')

      if (e.key === '/' && !isEditing) {
        e.preventDefault()
        if (location.pathname !== '/') navigate('/')
        setTimeout(() => {
          const input = document.getElementById('search-input')
          input?.focus()
          input?.select()
        }, 0)
      } else if (e.key === 'Escape' && active === searchInput) {
        searchInput?.blur()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [location.pathname, navigate])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ScriptsPage />} />
          <Route path="/scripts" element={<Navigate to="/" replace />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}


