import { useState, useMemo } from 'react'
import Navbar from './components/Navbar'
import HeroSearch from './components/HeroSearch'
import DirectoryGrid from './components/DirectoryGrid'
import Footer from './components/Footer'
import { DIRECTORY_ITEMS } from './data/directoryData'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleHomeClick = () => {
    setSearchQuery('')
    window.scrollTo({ top: 0 })
  }

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return DIRECTORY_ITEMS

    return DIRECTORY_ITEMS.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.categoryLabel.toLowerCase().includes(q)
      )
    })
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar onHomeClick={handleHomeClick} />

      <main className="flex-1">
        <HeroSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          resultsCount={filteredItems.length}
          totalCount={DIRECTORY_ITEMS.length}
        />

        <DirectoryGrid
          items={filteredItems}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />
      </main>

      <Footer />
    </div>
  )
}