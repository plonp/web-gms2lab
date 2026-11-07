import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScriptsPage from './pages/ScriptsPage'
import BlogsPage from './pages/BlogsPage'
import BlogDetailPage from './pages/BlogDetailPage'
import DocsPage from './pages/DocsPage'
import AboutPage from './pages/AboutPage'
import Footer from './components/Footer'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onKey = (e) => {
      const el = document.activeElement, input = document.getElementById('search-input')
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(el?.tagName) && !el?.isContentEditable) {
        e.preventDefault()
        if (location.pathname !== '/') navigate('/')
        setTimeout(() => input?.select(), 0)
      } else if (e.key === 'Escape' && el === input) input?.blur()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [location.pathname, navigate])

  return (
    <div className="min-h-screen bg-gm-bg text-gm-text flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ScriptsPage />} />
          <Route path="/scripts" element={<Navigate to="/" replace />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}



